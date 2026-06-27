import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageSquare, Star, Compass, Play, CheckCircle, ShieldAlert, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';

export const ActiveJob: React.FC = () => {
  const { 
    activeJob, 
    startJourney, 
    markArrived, 
    completeJob, 
    setScreen, 
    simulatedDistance, 
    simulatedETA 
  } = useApp();

  const [issueReported, setIssueReported] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActionToast(message);
    setTimeout(() => {
      setActionToast(null);
    }, 3000);
  };

  if (!activeJob) {
    return (
      <div className="p-12 text-center bg-card-bg border border-zinc-800 rounded-2xl max-w-md mx-auto my-12 shadow-xl animate-fade-in">
        <AlertTriangle className="w-12 h-12 text-zinc-500 mx-auto mb-4 animate-bounce" />
        <h3 className="font-bold text-zinc-100">No Active Mission assigned</h3>
        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
          You must accept a cargo contract first. Proceed to the Jobs list to acquire your cargo deployment.
        </p>
        <button 
          onClick={() => setScreen('jobs')}
          className="mt-6 h-10 px-6 bg-emerald-600 text-black font-black rounded-xl text-xs hover:bg-emerald-500 transition-all outline-none cursor-pointer"
        >
          Browse Open Cargo contracts
        </button>
      </div>
    );
  }

  const isAccepted = activeJob.status === 'accepted';
  const isTransit = activeJob.status === 'transit';
  const isArrived = activeJob.status === 'arrived';
  const isDelivering = activeJob.status === 'delivering';

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in pb-24">
      
      {/* Toast Overlay notification instead of standard JS alert */}
      {actionToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a] border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {actionToast}
        </div>
      )}

      {/* Title ID Header */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
            Dispatch Order ID
          </span>
          <span className="text-[10px] font-mono font-bold px-3 py-1 bg-emerald-500 text-black rounded-full uppercase tracking-wider animate-pulse">
            {activeJob.status.replace('_', ' ')}
          </span>
        </div>
        <h1 className="text-3xl font-black text-zinc-100 tracking-tight">
          {activeJob.id}
        </h1>
      </div>

      {/* Customer Contact & Call Card */}
      <div className="bg-card-bg border border-zinc-800 p-5 rounded-2xl flex flex-col gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-zinc-100 text-sm">
              {activeJob.customerName}
            </h3>
            <div className="flex items-center text-amber-500 text-xs font-bold mt-0.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-mono">{activeJob.customerRating}</span>
              <span className="text-zinc-500 font-normal ml-1">· Verified Receiver</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => showToast(`Dialing client: ${activeJob.customerName}...`)}
              className="p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-emerald-400 rounded-xl transition-all shadow-sm outline-none cursor-pointer"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button 
              onClick={() => showToast(`Establishing secure chat terminal with ${activeJob.customerName}...`)}
              className="p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-emerald-400 rounded-xl transition-all shadow-sm outline-none cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pickup & Dropoff coordinates */}
      <div className="bg-card-bg border border-zinc-800 p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-950/40"></div>
            <div className="w-0.5 h-12 border-l border-zinc-800"></div>
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              PICKUP LOCATION
            </span>
            <p className="text-xs font-bold text-zinc-200 mt-0.5 leading-relaxed">
              {activeJob.pickupAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-950/40 mt-1"></div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              DROPOFF DESTINATION
            </span>
            <p className="text-xs font-bold text-zinc-200 mt-0.5 leading-relaxed">
              {activeJob.dropoffAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Static Map View card with Pulsing location indicator */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-zinc-800 group shadow-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale brightness-50" 
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnpTHNgOMqcFoyawX9j9RgwLGVQcjszLowEX0QtETMw1nw181cVseYcZMFP0UE_epSgSHoGIaj7F52L0BT7l-iSZDgS0zJhul3rKs2og-XPvWu33iVlRhMQd_lvUIcn_fST1iE9-XYNeLCzn04TF4kw23SBURgzoFkCD43Tze0PKRrqHDg-eRn1d2dPYUQWLhCyOx2Ojnvg8bua16EtVG8yuhW9zYoPWzm_l7e6ochINYkO_6HAvNnp0rI9w0GGAUFlmw0Una73KY')` }}
        ></div>
        
        {/* Floating route overlay badge */}
        <div className="absolute top-4 left-4 bg-zinc-900/95 backdrop-blur-md p-3 rounded-xl border border-zinc-800 shadow-xl">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
            <span className="text-xs font-black text-zinc-100 font-mono">
              {simulatedDistance} miles remaining ({simulatedETA} mins)
            </span>
          </div>
        </div>

        {/* Pulse center coordinate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-8 w-8">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-emerald-500 border-4 border-zinc-950 shadow-md"></span>
          </span>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-black text-zinc-100 tracking-tight">
          Shipment Progress Timeline
        </h2>
        <div className="bg-card-bg border border-zinc-800 p-5 rounded-2xl shadow-lg space-y-6">
          {activeJob.timeline.map((event, index) => {
            const isCompleted = event.status === 'completed';
            const isCurrent = event.status === 'current';
            const isPending = event.status === 'pending';

            return (
              <div 
                key={index} 
                className={`flex gap-4 items-start transition-opacity duration-300 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                    isCompleted 
                      ? 'bg-emerald-500 text-black' 
                      : isCurrent 
                      ? 'bg-emerald-600 text-black ring-4 ring-emerald-950/50'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  {index < activeJob.timeline.length - 1 && (
                    <div className={`w-0.5 h-10 my-1 ${
                      isCompleted ? 'bg-emerald-500' : 'border-l-2 border-dashed border-zinc-800'
                    }`} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-100">
                    {event.label}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                    {event.time || (isCurrent ? 'Current Phase' : 'Awaiting completion')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Actions Bar */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        
        {/* Urgent Issue Alerts toast notification */}
        {issueReported && (
          <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-xl text-amber-400 text-xs flex gap-3">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Dispatch Operations Notified</p>
              <p className="mt-0.5 text-zinc-400">Your issue ticket has been broadcast to port coordinators. Drive safely.</p>
            </div>
          </div>
        )}

        {/* Dynamic Buttons based on Active Job workflow status */}
        {isAccepted && (
          <button 
            onClick={startJourney}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-black rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all outline-none cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current text-black" />
            Begin Route Navigation
          </button>
        )}

        {isTransit && (
          <button 
            onClick={() => setScreen('navigation')}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-black rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all outline-none cursor-pointer"
          >
            <Compass className="w-5 h-5 animate-spin text-black" />
            Open Active Live Navigation HUD
          </button>
        )}

        {isArrived && (
          <button 
            onClick={completeJob}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-black rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all outline-none cursor-pointer"
          >
            <CheckCircle className="w-5 h-5 text-black" />
            Swipe to Confirm Final Delivery
          </button>
        )}

        {/* Secondary controls */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => {
              setIssueReported(true);
              setTimeout(() => setIssueReported(false), 5000);
            }}
            className="h-12 border border-zinc-800 text-zinc-400 hover:bg-zinc-850 font-bold rounded-xl active:opacity-80 transition-all text-xs cursor-pointer"
          >
            Report Alert
          </button>
          
          {/* Complete Job button available if arrived or transit range drops */}
          <button 
            onClick={() => {
              if (activeJob.status === 'arrived') {
                completeJob();
              } else {
                markArrived();
              }
            }}
            className="h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl active:opacity-80 transition-all text-xs cursor-pointer"
          >
            {activeJob.status === 'arrived' ? 'Complete Cargo Drop' : 'Mark Arrived at Base'}
          </button>
        </div>

      </div>

    </div>
  );
};
