import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, AlertTriangle, Map, HelpCircle, Flame, HeartPulse, ChevronRight, Filter, Navigation, Compass, Sparkles } from 'lucide-react';

export const JobsList: React.FC = () => {
  const { availableJobs, acceptJob, rejectJob, online, activeJob, setScreen } = useApp();
  const [filter, setFilter] = useState<'all' | 'urgent' | 'scheduled'>('all');

  const filteredJobs = availableJobs.filter(job => {
    if (filter === 'urgent') return job.type === 'URGENT';
    if (filter === 'scheduled') return job.type === 'SCHEDULED';
    return true;
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in pb-20">
      
      {/* Alert Header if offline */}
      {!online && (
        <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-xl flex gap-3 text-amber-400">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold">You are currently OFFLINE</p>
            <p className="mt-0.5 text-zinc-400">Toggle online in the Dashboard to begin receiving hot location updates instantly.</p>
          </div>
        </div>
      )}

      {/* Active assigned job shortcut banner */}
      {activeJob && (
        <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl flex justify-between items-center text-emerald-400">
          <div className="flex gap-3 items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="text-xs">
              <p className="font-bold">You have an Active Assigned Trip</p>
              <p className="mt-0.5 text-zinc-400">Order ID: {activeJob.id} is pending dispatch.</p>
            </div>
          </div>
          <button 
            onClick={() => setScreen('active-job')}
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 bg-[#050505] px-3 py-1.5 rounded-lg border border-zinc-800"
          >
            Navigate Active
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Title & Filter Header */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-zinc-100 tracking-tight">
              Manifest Jobs Feed
            </h1>
            <p className="text-sm text-zinc-400">
              {filteredJobs.length} matches currently available for your vehicle class
            </p>
          </div>
          <div className="flex gap-1.5 bg-card-bg border border-zinc-800 p-1 rounded-lg text-xs font-bold">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-all ${filter === 'all' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('urgent')}
              className={`px-3 py-1.5 rounded-md transition-all ${filter === 'urgent' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Urgent
            </button>
            <button 
              onClick={() => setFilter('scheduled')}
              className={`px-3 py-1.5 rounded-md transition-all ${filter === 'scheduled' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Scheduled
            </button>
          </div>
        </div>
      </div>

      {/* Available Jobs list */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-card-bg border border-zinc-800 rounded-2xl">
            <HelpCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="font-bold text-zinc-150">No Dispatch Matching Your Filter</p>
            <p className="text-xs text-zinc-500 mt-1">
              {online ? 'Wait a few seconds for dispatch to match or adjust filters.' : 'Turn on shifts in the home dashboard.'}
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isUrgent = job.type === 'URGENT';
            const isScheduled = job.type === 'SCHEDULED';
            return (
              <div 
                key={job.id} 
                className="bg-card-bg border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 shadow-sm transition-all hover:shadow-lg hover:border-zinc-700 relative overflow-hidden"
              >
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase">
                      ID: {job.id}
                    </span>
                    <h2 className="text-lg font-bold tracking-tight text-zinc-100 mt-1">
                      {job.title}
                    </h2>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border ${
                    isUrgent 
                      ? 'bg-amber-950/50 text-amber-400 border-amber-900/30' 
                      : isScheduled 
                      ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/30'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700/50'
                  }`}>
                    {job.type}
                  </span>
                </div>

                {/* Locations section */}
                <div className="flex items-center gap-4 py-2 border-y border-zinc-800/60">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-950/50"></div>
                    <div className="w-0.5 h-10 border-l-2 border-dashed border-zinc-800"></div>
                    <Compass className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div>
                      <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        PICKUP LOCATION
                      </p>
                      <p className="text-xs font-semibold text-zinc-250">
                        {job.pickupAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        ESTIMATED RANGE
                      </p>
                      <p className="text-xs font-medium text-zinc-400">
                        {job.distance} • {job.eta} ETA
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-center px-4 bg-[#050505] rounded-xl h-16 border border-zinc-800">
                    <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                      PAYOUT
                    </p>
                    <p className="text-lg font-black text-emerald-400 font-mono">
                      ${job.payout.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Cargo indicators / tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-850 px-2.5 py-1 rounded-md border border-zinc-800/50">
                    <span>📦 {job.itemsCount} Parcels</span>
                  </div>
                  {job.fragile && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/20 border border-amber-900/30 px-2.5 py-1 rounded-md font-bold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>FRAGILE Cargo</span>
                    </div>
                  )}
                  {job.medical && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2.5 py-1 rounded-md font-bold">
                      <HeartPulse className="w-3.5 h-3.5" />
                      <span>MEDICAL Supply</span>
                    </div>
                  )}
                </div>

                {/* Primary Action Button Bar */}
                <div className="flex gap-3 mt-2">
                  <button 
                    disabled={!!activeJob}
                    onClick={() => acceptJob(job.id)}
                    className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl transition-all active:scale-95 text-xs shadow-lg shadow-emerald-950/20 disabled:opacity-50 disabled:cursor-not-allowed outline-none flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-black" />
                    Accept Dispatch
                  </button>
                  <button 
                    onClick={() => rejectJob(job.id)}
                    className="flex-1 h-12 border border-zinc-800 hover:bg-zinc-850 text-zinc-400 font-bold rounded-xl transition-all active:scale-95 text-xs outline-none"
                  >
                    Reject Match
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bento Map View section */}
      <section className="mt-8">
        <div className="relative h-48 rounded-2xl overflow-hidden border border-zinc-800 group shadow-lg flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-50" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlLHrkkg2dTNE466l7-ilChM86UnALbYCoQUTc6tEQFCBH4hY_Y2YolLFeWanH1cMcSHv2qakAo-ySkA_96xoCYXFDTczr_OLtxtqpXkka57-PL67Uz37vEobFld0ojxVIkgn3rTd-a27LYLnNvpPZV-o3A8FWiGHoacbaX0LQb9N5_4C0GtRVmnQNDHLydCqy51fuBk5YcPJA2JfY69vKuK4N6g6uaC1yagmsMycOcfJPrxbeilwE01vVLB3DHBiXcLjpDJtJ57k')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent flex items-end p-4">
            <div className="flex justify-between items-center w-full z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Radar Feed
                </span>
                <p className="text-white text-sm font-bold tracking-tight">Active SF Traffic Density Overlay</p>
              </div>
              <button className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white px-4 h-9 rounded-full text-xs font-bold flex items-center gap-2 shadow-md transition-colors outline-none cursor-pointer">
                <Map className="w-4 h-4 text-emerald-500" />
                EXPAND RADAR
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
