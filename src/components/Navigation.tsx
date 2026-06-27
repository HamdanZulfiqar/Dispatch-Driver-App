import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Compass, AlertCircle, HelpCircle, Layers, CheckCircle, Navigation as NavIcon, MoreVertical } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { 
    activeJob, 
    setScreen, 
    simulatedDistance, 
    simulatedETA, 
    simulatedProgress,
    markArrived
  } = useApp();

  const [layersOpen, setLayersOpen] = useState(false);
  const [hudToast, setHudToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setHudToast(message);
    setTimeout(() => {
      setHudToast(null);
    }, 3000);
  };

  if (!activeJob) return null;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-white overflow-hidden select-none font-sans flex flex-col">
      
      {/* Background Live SVG Map Simulator */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative bg-zinc-900">
          <img 
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale brightness-50" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnpTHNgOMqcFoyawX9j9RgwLGVQcjszLowEX0QtETMw1nw181cVseYcZMFP0UE_epSgSHoGIaj7F52L0BT7l-iSZDgS0zJhul3rKs2og-XPvWu33iVlRhMQd_lvUIcn_fST1iE9-XYNeLCzn04TF4kw23SBURgzoFkCD43Tze0PKRrqHDg-eRn1d2dPYUQWLhCyOx2Ojnvg8bua16EtVG8yuhW9zYoPWzm_l7e6ochINYkO_6HAvNnp0rI9w0GGAUFlmw0Una73KY" 
            alt="Live GPS vector city layout"
            referrerPolicy="no-referrer"
          />

          {/* SVG route coordinates drawn dynamically depending on progress ticker */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 800" preserveAspectRatio="none">
            {/* Draw a pulsing neon emerald route */}
            <path 
              d="M 200 650 Q 150 450, 320 400 T 280 150" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="6" 
              strokeLinecap="round"
              strokeDasharray="12, 6"
              className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            />
            {/* Completed route section */}
            <path 
              d="M 200 650 Q 150 450, 320 400 T 280 150" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="6" 
              strokeLinecap="round"
              strokeDasharray="none"
              strokeDashoffset={100 - simulatedProgress}
              className="opacity-20"
            />

            {/* Pulse emerald current driver coordinate marker */}
            <g transform={`translate(${200 + (simulatedProgress * 0.8)}, ${650 - (simulatedProgress * 5)})`}>
              <circle r="18" fill="#10b981" className="animate-ping opacity-25" />
              <circle r="10" fill="#ffffff" />
              <circle r="6" fill="#10b981" />
            </g>

            {/* Destination Flag marker */}
            <g transform="translate(280, 150)">
              <circle r="12" fill="#ef4444" className="animate-pulse" />
              <text x="-5" y="4" fill="#ffffff" className="text-[10px] font-bold">🏁</text>
            </g>
          </svg>
          
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950/90 pointer-events-none" />
        </div>
      </div>

      {/* HUD Notification Toast */}
      {hudToast && (
        <div className="fixed top-40 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a] border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {hudToast}
        </div>
      )}

      {/* Top HUD HUD (LTE Status & Signal Strength) */}
      <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-start z-20">
        <button 
          onClick={() => setScreen('active-job')}
          className="bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl shadow-lg transition-all outline-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-emerald-400" />
        </button>

        {/* High accuracy indicator badge */}
        <div className="bg-zinc-900/95 border border-zinc-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2.5">
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-1 h-2 bg-emerald-500 rounded-sm"></span>
            <span className="w-1 h-3 bg-emerald-500 rounded-sm"></span>
            <span className="w-1 h-4 bg-emerald-500 rounded-sm"></span>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-300">
            LTE · HIGH GPS DUAL-ACCURACY
          </span>
        </div>
      </header>

      {/* Primary Turn Instruction HUD Banner */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md z-20">
        <div className="bg-card-bg border border-zinc-800 text-white p-5 rounded-2xl shadow-2xl flex items-center gap-5">
          <div className="bg-emerald-600/10 p-3.5 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <Compass className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <h1 className="text-2xl font-black font-mono text-emerald-400">450</h1>
              <span className="text-xs font-bold uppercase opacity-80 text-zinc-400">METERS</span>
            </div>
            <p className="text-sm font-semibold tracking-tight text-zinc-200">
              Turn right onto Market St. (Speed: 32mph)
            </p>
          </div>
        </div>
      </div>

      {/* Floating map layer buttons */}
      <div className="absolute right-4 bottom-48 flex flex-col gap-3 z-20">
        <button 
          onClick={() => setLayersOpen(!layersOpen)}
          className="w-12 h-12 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl shadow-lg flex items-center justify-center text-zinc-300 transition-colors cursor-pointer"
        >
          <Layers className="w-5 h-5" />
        </button>
        <button 
          onClick={() => showToast('Recalibrating GPS telemetry, locked on driver.')}
          className="w-12 h-12 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl shadow-lg flex items-center justify-center text-zinc-300 transition-colors cursor-pointer"
        >
          <NavIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Floating layers overlay */}
      {layersOpen && (
        <div className="absolute right-18 bottom-48 bg-card-bg border border-zinc-800 p-4 rounded-2xl shadow-2xl w-48 z-30 animate-fade-in text-xs">
          <p className="font-bold mb-2 text-zinc-100">Map Layers</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input type="checkbox" defaultChecked className="rounded accent-emerald-500 bg-zinc-800 border-zinc-750" />
              <span>Traffic density</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input type="checkbox" defaultChecked className="rounded accent-emerald-500 bg-zinc-800 border-zinc-750" />
              <span>Satellite Overlay</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input type="checkbox" className="rounded accent-emerald-500 bg-zinc-800 border-zinc-750" />
              <span>Hazard Alerts</span>
            </label>
          </div>
        </div>
      )}

      {/* Bottom Dashboard Panel: Stats & Primary action */}
      <div className="mt-auto p-4 pb-8 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent">
        <div className="max-w-md mx-auto space-y-4">
          
          {/* Trip Statistics panel */}
          <div className="bg-card-bg border border-zinc-800 p-5 rounded-2xl shadow-2xl flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                ETA ARRIVAL
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                {simulatedDistance === 0 ? 'ARRIVED' : '14:42'}
              </span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <div className="flex flex-col text-center">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                REMAINING TIME
              </span>
              <span className="text-xl font-bold font-mono text-zinc-50 mt-0.5">
                {simulatedDistance === 0 ? '0' : simulatedETA} <span className="text-xs font-semibold text-zinc-400">min</span>
              </span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                DISTANCE
              </span>
              <span className="text-xl font-bold font-mono text-zinc-50 mt-0.5">
                {simulatedDistance} <span className="text-xs font-semibold text-zinc-400">miles</span>
              </span>
            </div>
          </div>

          {/* Primary GPS button */}
          <div className="flex gap-4">
            <button 
              onClick={() => {
                // Instantly complete active segment, redirecting back
                markArrived();
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-black h-14 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all outline-none cursor-pointer"
            >
              <CheckCircle className="w-5 h-5 text-black" />
              End Navigation & Scan Cargo
            </button>
            <button 
              onClick={() => showToast('Opening GPS system utilities menu.')}
              className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 h-14 px-5 rounded-2xl font-bold flex items-center justify-center active:scale-95 transition-all outline-none cursor-pointer"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
