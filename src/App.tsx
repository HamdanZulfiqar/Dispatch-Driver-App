import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderBar } from './components/HeaderBar';
import { BottomNavBar } from './components/BottomNavBar';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Dashboard } from './components/Dashboard';
import { JobsList } from './components/JobsList';
import { ActiveJob } from './components/ActiveJob';
import { Navigation } from './components/Navigation';
import { History } from './components/History';
import { Profile } from './components/Profile';

function AppContent() {
  const { currentScreen, driver } = useApp();

  // If driver is not authenticated, show Auth screens
  if (!driver) {
    if (currentScreen === 'signup') {
      return <SignUp />;
    }
    return <Login />;
  }

  // If active navigation map is active, show full screen map overlays with no headers/footers
  if (currentScreen === 'navigation') {
    return <Navigation />;
  }

  return (
    <div className="min-h-screen bg-app-bg dark:bg-app-bg text-zinc-350 dark:text-zinc-100 transition-colors pb-24 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Universal Top App Header */}
      <HeaderBar />

      {/* Main Container Stage */}
      <main className="pt-20 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        {currentScreen === 'home' && <Dashboard />}
        {currentScreen === 'jobs' && <JobsList />}
        {currentScreen === 'active-job' && <ActiveJob />}
        {currentScreen === 'history' && <History />}
        {currentScreen === 'profile' && <Profile />}
      </main>

      {/* Universal Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
