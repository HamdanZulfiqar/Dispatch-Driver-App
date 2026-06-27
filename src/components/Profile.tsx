import React from 'react';
import { useApp } from '../context/AppContext';
import { BadgeAlert, ShieldCheck, Mail, LogOut, Sun, Moon, ToggleLeft, ToggleRight, ArrowUpRight, Award, Compass, Truck, Globe, BellRing } from 'lucide-react';

export const Profile: React.FC = () => {
  const { 
    driver, 
    theme, 
    toggleTheme, 
    logout, 
    online 
  } = useApp();

  const [profileToast, setProfileToast] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setProfileToast(message);
    setTimeout(() => {
      setProfileToast(null);
    }, 3000);
  };

  if (!driver) return null;

  return (
    <div className="space-y-6 max-w-lg mx-auto animate-fade-in pb-24">
      
      {/* Toast Alert overlay */}
      {profileToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a] border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {profileToast}
        </div>
      )}

      {/* Profile Avatar Header card */}
      <section className="flex flex-col items-center text-center space-y-3 py-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-emerald-500 p-1 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-800">
              <img 
                className="w-full h-full object-cover" 
                src={driver.avatar} 
                alt={driver.name}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          {online && (
            <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-zinc-950 rounded-full animate-pulse shadow-md" />
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-zinc-100">
            Alex "Ace" Harrison
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-zinc-900 rounded-full border border-zinc-850">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-zinc-400">
              LIC: {driver.licenseNumber}
            </span>
          </div>
        </div>
      </section>

      {/* Bento Stats & Vehicle details */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Vehicle detail card */}
        <div className="col-span-2 bg-card-bg border border-zinc-800 p-5 rounded-2xl space-y-3 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              Assigned Fleet Vehicle
            </span>
            <Truck className="w-4 h-4 text-emerald-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-zinc-850 overflow-hidden border border-zinc-800 flex-shrink-0">
              <img 
                className="w-full h-full object-cover grayscale brightness-90 contrast-125 hover:scale-105 transition-transform" 
                src={driver.vehicle.image} 
                alt="Rivian Electric Delivery Van"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-base text-zinc-100 leading-tight">
                {driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}
              </p>
              <span className="text-[10px] font-mono font-black text-amber-400 bg-amber-950/40 border border-amber-900/30 px-2.5 py-1 rounded inline-block">
                PLATE: {driver.vehicle.plate}
              </span>
            </div>
          </div>
        </div>

        {/* Reliability card */}
        <div className="bg-card-bg border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between h-32 shadow-lg">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Dispatch Reliability
          </span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {driver.stats.reliability}%
            </span>
            <ArrowUpRight className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        {/* Total miles card */}
        <div className="bg-card-bg border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between h-32 shadow-lg">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Total Voyage Miles
          </span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-black text-zinc-100 font-mono">
              {driver.stats.totalMiles.toLocaleString()}
            </span>
            <Compass className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

      </div>

      {/* Settings Options list */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 px-2">
          App Settings Configuration
        </h3>
        <div className="bg-card-bg border border-zinc-800 divide-y divide-zinc-800/80 rounded-2xl overflow-hidden shadow-lg">
          
          {/* Display Mode Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-4 hover:bg-zinc-850/30 transition-colors text-left outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-emerald-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <span className="text-sm font-semibold text-zinc-250">
                Display Theme Mode
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-500 font-bold uppercase">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
              {theme === 'dark' ? (
                <ToggleRight className="w-8 h-8 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-zinc-500" />
              )}
            </div>
          </button>

          {/* Job Alerts setting */}
          <button 
            onClick={() => showToast('Acoustic dispatcher job tones are globally active.')}
            className="w-full flex items-center justify-between p-4 hover:bg-zinc-850/30 transition-colors text-left outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <BellRing className="w-5 h-5 text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-250">
                Acoustic Job Alerts
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-black">
              ACTIVE
            </span>
          </button>

          {/* Language selection */}
          <button 
            onClick={() => showToast('English (US) is the designated region system locale.')}
            className="w-full flex items-center justify-between p-4 hover:bg-zinc-850/30 transition-colors text-left outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-250">
                System Language
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              English (US)
            </span>
          </button>

        </div>

        {/* Logout Action Bar */}
        <div className="pt-4">
          <button 
            onClick={logout}
            className="w-full h-14 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/30 transition-colors rounded-2xl flex items-center justify-center gap-2 font-bold text-sm outline-none cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out of Shift Session
          </button>
          
          <p className="text-center mt-4 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Smart Dispatch Fleet Mobile · v4.12.0 (STABLE)
          </p>
        </div>
      </section>

    </div>
  );
};
