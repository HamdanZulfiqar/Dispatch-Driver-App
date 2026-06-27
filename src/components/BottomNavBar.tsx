import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, ClipboardList, History, User } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { currentScreen, setScreen, driver } = useApp();

  if (!driver || currentScreen === 'login' || currentScreen === 'signup' || currentScreen === 'navigation') {
    return null; // Don't show inside landing pages or full navigation map HUD
  }

  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'jobs' as const, label: 'Jobs', icon: ClipboardList },
    { id: 'history' as const, label: 'History', icon: History },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-panel-bg border-t border-zinc-800/80 pb-safe shadow-lg transition-colors">
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-4">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id || (tab.id === 'jobs' && currentScreen === 'active-job');
          return (
            <button
              key={tab.id}
              onClick={() => setScreen(tab.id)}
              className={`flex flex-col items-center justify-center w-20 py-1 transition-all rounded-xl focus:outline-none ${
                isActive
                  ? 'text-emerald-500 bg-emerald-600/10 font-bold scale-105'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] font-medium tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
