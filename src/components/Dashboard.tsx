import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Navigation, AlertTriangle, CheckSquare, Sparkles, TrendingUp, DollarSign, ListTodo, ArrowRight, Clock, ShieldAlert } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    driver, 
    online, 
    setOnline, 
    setScreen, 
    activeJob, 
    alerts, 
    addAlert 
  } = useApp();

  if (!driver) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      
      {/* Shift Status & Availability Toggle Header Card */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-lg flex items-center justify-between ${
        online 
          ? 'bg-emerald-950/20 border-emerald-800/40' 
          : 'bg-card-bg border-zinc-800'
      }`}>
        <div className="flex flex-col">
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
            online ? 'text-emerald-400' : 'text-zinc-500'
          }`}>
            {online ? 'Online Status' : 'Shift Status'}
          </span>
          <h2 className="text-2xl font-black tracking-tight text-zinc-100 mt-1">
            {online ? 'Accepting Jobs' : 'Shift Paused'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {online ? 'Your location is active. Dispatch is matching orders.' : 'Toggle online to start receiving cargo matches.'}
          </p>
        </div>
        
        {/* iOS style toggle switch */}
        <button 
          onClick={() => setOnline(!online)}
          className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            online ? 'bg-emerald-500' : 'bg-zinc-800'
          }`}
        >
          <span 
            className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              online ? 'translate-x-8' : 'translate-x-0'
            }`} 
          />
        </button>
      </div>

      {/* Bento Grid: Earnings, Job Counts & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Earnings Summary Card */}
        <div className="md:col-span-8 p-6 bg-card-bg text-white rounded-2xl border border-zinc-800 relative overflow-hidden group shadow-lg">
          <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-56 h-56" />
          </div>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                Weekly Earnings Summary
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <h1 className="text-4xl font-black tracking-tight text-white font-mono">
                  ${driver.stats.weeklyEarnings.toFixed(2)}
                </h1>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12% vs last week
                </span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-850 p-2 rounded-xl text-zinc-300 text-xs font-mono font-bold">
              TODAY: ${driver.stats.todayEarnings.toFixed(2)}
            </div>
          </div>

          {/* Glowing Sparkline Chart mockup */}
          <div className="mt-6 h-28 flex items-end gap-1.5 pt-4">
            <div className="flex-1 bg-emerald-500/10 h-[35%] rounded-t-lg transition-all hover:bg-emerald-500/20 cursor-pointer"></div>
            <div className="flex-1 bg-emerald-500/10 h-[50%] rounded-t-lg transition-all hover:bg-emerald-500/20 cursor-pointer"></div>
            <div className="flex-1 bg-emerald-500/10 h-[45%] rounded-t-lg transition-all hover:bg-emerald-500/20 cursor-pointer"></div>
            <div className="flex-1 bg-emerald-500/10 h-[70%] rounded-t-lg transition-all hover:bg-emerald-500/20 cursor-pointer"></div>
            <div className="flex-1 bg-emerald-500/10 h-[60%] rounded-t-lg transition-all hover:bg-emerald-500/20 cursor-pointer"></div>
            <div className="flex-1 bg-emerald-500 h-[95%] rounded-t-lg shadow-[0_-4px_12px_rgba(16,185,129,0.5)] transition-all"></div>
          </div>
        </div>

        {/* Today's Jobs Counter Card */}
        <div className="md:col-span-4 p-6 bg-card-bg text-white rounded-2xl border border-zinc-800 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckSquare className="w-32 h-32" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Today's Completed
            </span>
            <h2 className="text-6xl font-black tracking-tight mt-2 font-mono text-emerald-400">
              {driver.stats.todayJobsCount}
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Deliveries safely managed during current shift
            </p>
          </div>
          <button 
            onClick={() => setScreen('jobs')}
            className="mt-6 h-12 w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm shadow-md"
          >
            View Manifest Feed
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Alerts / Recent Notifications Widget */}
        <div className="md:col-span-6 bg-card-bg rounded-2xl border border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-panel-bg">
            <span className="font-bold text-zinc-100 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-500" />
              Recent Alert Logs
            </span>
            <span className="text-[11px] font-mono font-bold bg-amber-950/40 text-amber-400 border border-amber-900/30 px-2.5 py-0.5 rounded-full uppercase">
              Operational Safety
            </span>
          </div>
          <div className="divide-y divide-zinc-800">
            {alerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-zinc-900/40 transition-colors flex gap-4">
                <div className="p-2 rounded-xl bg-amber-950/30 text-amber-400 h-fit mt-0.5 border border-amber-900/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-100">
                    {alert.title}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {alert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Route Map Preview */}
        <div className="md:col-span-6 relative rounded-2xl overflow-hidden min-h-[220px] border border-zinc-800 shadow-sm flex flex-col justify-end">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover grayscale contrast-125 brightness-50" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJG2tBpI9jOMKVAp7UHxQau0nZRtfgGQPQ03XJZJK02Pt6YCy80T0Pn-PjGF5RbNh_TMbSusuIAUPkcLTVkyAn4-ReZwzy0FUgk570lb2SR25vaOMerLKa6W8Fs699SwB0Q5GgkS7tG87oEZdojjPXPnFxaB6pLzBETYGbIgFqLEhhnTMyCWAI_9IDzF6yAv_xyygvS1iWm9btrhJhSpjLT-tsiIxMlpWx6KhH7iuJ5e4bdnPe5J8zFcwF9Hl1MOHex7pBz6N67jE" 
              alt="Metropolitan highway traffic trails at dusk"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-6">
            <h3 className="text-lg font-black text-white">
              {activeJob ? 'Active Route GPS' : 'No Current Voyage'}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 font-sans line-clamp-1">
              {activeJob 
                ? `Destination: ${activeJob.pickupAddress}` 
                : 'Awaiting your shift deployment. Accept a job in Jobs tab.'}
            </p>
            
            <button 
              onClick={() => {
                if (activeJob) {
                  setScreen('active-job');
                } else {
                  setScreen('jobs');
                }
              }}
              className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-black h-10 px-5 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 w-fit shadow-lg outline-none"
            >
              <Navigation className="w-3.5 h-3.5" />
              {activeJob ? 'Open Active Pilot' : 'Explore Open Contracts'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
