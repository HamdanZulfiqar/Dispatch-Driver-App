import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, ShieldAlert, Sparkles, X, Check, Eye } from 'lucide-react';

interface HeaderBarProps {
  onNotificationToggle?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = () => {
  const { driver, alerts, markAlertsAsRead, currentScreen } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!driver) return null;

  // Screen-specific header names
  const screenTitleMap: Record<string, string> = {
    home: 'Smart Dispatch',
    jobs: 'Available Jobs',
    'active-job': 'Active Job Details',
    history: 'Job History',
    profile: 'Driver Profile',
    navigation: 'Live GPS HUD'
  };

  const unreadAlerts = alerts.filter(a => !a.read);

  return (
    <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 h-16 bg-panel-bg border-b border-zinc-800/80 transition-colors shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md shadow-emerald-950/20">
          <img 
            className="w-full h-full object-cover" 
            src={driver.avatar} 
            alt={driver.name}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-bold text-lg text-emerald-500">
            {screenTitleMap[currentScreen] || 'Smart Dispatch'}
          </span>
          {driver.online && (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono tracking-wider flex items-center gap-1 uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Online & Dispatchable
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        <button 
          onClick={() => {
            setShowDropdown(!showDropdown);
            markAlertsAsRead();
          }}
          className="relative w-12 h-12 flex items-center justify-center text-zinc-350 hover:bg-zinc-900 transition-all rounded-full outline-none"
        >
          <Bell className="w-6 h-6" />
          {unreadAlerts.length > 0 && (
            <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-950 animate-bounce">
              {unreadAlerts.length}
            </span>
          )}
        </button>

        {/* Alerts Notification Drawer/Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 top-14 w-80 bg-card-bg border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden transform origin-top-right transition-all">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-panel-bg">
              <span className="font-bold text-zinc-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                Dispatch Alerts
              </span>
              <button 
                onClick={() => setShowDropdown(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-72 overflow-y-auto divide-y divide-zinc-800">
              {alerts.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-sm">
                  No active dispatch warnings. All clear!
                </div>
              ) : (
                alerts.map(alert => (
                  <div 
                    key={alert.id} 
                    className="p-4 hover:bg-zinc-900/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm text-zinc-100">
                        {alert.title}
                      </p>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {alert.description}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-[#050505] text-center border-t border-zinc-800">
              <button 
                onClick={() => {
                  markAlertsAsRead();
                  setShowDropdown(false);
                }}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                Clear all from notification bar
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
