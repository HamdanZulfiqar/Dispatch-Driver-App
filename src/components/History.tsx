import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, Calendar, DollarSign, RefreshCw, ChevronRight, AlertTriangle, Sparkles, Trophy } from 'lucide-react';

export const History: React.FC = () => {
  const { historyJobs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high-payout' | 'hazmat'>('all');
  const [historyToast, setHistoryToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setHistoryToast(message);
    setTimeout(() => {
      setHistoryToast(null);
    }, 3000);
  };

  const filteredHistory = historyJobs.filter(job => {
    // Search query matching Address or ID or customer name
    const matchSearch = 
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.dropoffAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter toggle
    if (selectedFilter === 'high-payout') {
      return matchSearch && job.payout >= 100;
    }
    if (selectedFilter === 'hazmat') {
      return matchSearch && job.type === 'HAZMAT';
    }

    return matchSearch;
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in pb-20">
      
      {/* Toast Alert for Signatures */}
      {historyToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a] border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {historyToast}
        </div>
      )}

      {/* Search & Filter bar HUD */}
      <section className="space-y-4">
        <div className="relative group">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Job ID or Address..."
            className="w-full h-14 pl-12 pr-4 bg-card-bg border border-zinc-800 rounded-2xl font-sans text-sm text-zinc-150 focus:border-emerald-500 focus:ring-0 transition-all outline-none"
          />
        </div>

        {/* Filter Scroll buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button 
            onClick={() => setSelectedFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap outline-none cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-emerald-600 text-black shadow-lg shadow-emerald-950/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800/80'
            }`}
          >
            <Calendar className="w-4 h-4" />
            All Completions
          </button>
          <button 
            onClick={() => setSelectedFilter('high-payout')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap outline-none cursor-pointer ${
              selectedFilter === 'high-payout'
                ? 'bg-emerald-600 text-black shadow-lg shadow-emerald-950/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800/80'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            High Earnings ($100+)
          </button>
          <button 
            onClick={() => setSelectedFilter('hazmat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap outline-none cursor-pointer ${
              selectedFilter === 'hazmat'
                ? 'bg-emerald-600 text-black shadow-lg shadow-emerald-950/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800/80'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Hazmat Class
          </button>
        </div>
      </section>

      {/* Overview Stats summary */}
      <section className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-card-bg border border-zinc-800 rounded-2xl shadow-sm">
          <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Total Completed
          </p>
          <p className="text-3xl font-black text-emerald-400 mt-1 font-mono">
            {128 + (historyJobs.length - 3)}
          </p>
        </div>
        <div className="p-4 bg-card-bg border border-zinc-800 rounded-2xl shadow-sm">
          <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Weekly Total Revenue
          </p>
          <p className="text-3xl font-black text-emerald-400 mt-1 font-mono">
            $3,420.50
          </p>
        </div>
      </section>

      {/* History manifest card items */}
      <div className="space-y-4">
        <h2 className="text-[11px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-1">
          Recent Shift Completions
        </h2>

        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center bg-card-bg border border-zinc-800 rounded-2xl">
            <AlertTriangle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="font-bold text-zinc-100">No Completions Matched Search</p>
            <p className="text-xs text-zinc-500 mt-1">
              Adjust search query or filter tags to reveal completed manifests.
            </p>
          </div>
        ) : (
          filteredHistory.map((job) => {
            const isHazmat = job.type === 'HAZMAT';
            return (
              <div 
                key={job.id} 
                className="group relative bg-card-bg border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all shadow-sm"
              >
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        DELIVERED SECURELY
                      </span>
                      <h3 className="font-bold text-base text-zinc-150 mt-0.5">
                        {job.startedAt || 'Today'}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-500 font-bold uppercase tracking-tight">
                        ID: {job.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-emerald-400 font-mono">
                        +${job.payout.toFixed(2)}
                      </p>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase font-bold">
                        Deposited Paid
                      </p>
                    </div>
                  </div>

                  {/* Route segment details */}
                  <div className="flex flex-col gap-3 py-3 border-t border-b border-zinc-800/60">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-2 h-2 rounded-full bg-zinc-700 mt-1.5 flex-shrink-0"></span>
                      <div className="flex flex-col text-xs">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                          PICKUP ADDRESS
                        </span>
                        <span className="text-zinc-300 font-medium">
                          {job.pickupAddress}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                      <div className="flex flex-col text-xs">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                          DELIVERED DROPOFF
                        </span>
                        <span className="text-zinc-300 font-medium">
                          {job.dropoffAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => showToast(`Opening digital manifest: Order ID ${job.id} is verified and signed.`)}
                    className="flex items-center justify-between w-full py-1 text-xs text-zinc-500 hover:text-emerald-400 transition-colors font-medium outline-none cursor-pointer"
                  >
                    <span>View Shipment Signatures</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* HAZMAT special alert banner */}
                {isHazmat && (
                  <div className="absolute top-4 right-20 flex gap-1">
                    <span className="px-2 py-0.5 bg-amber-500 text-black rounded text-[9px] font-mono font-black uppercase tracking-wider animate-pulse">
                      Hazmat
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Loading indicator simulation */}
        <div className="py-6 flex flex-col items-center justify-center text-zinc-500">
          <RefreshCw className="w-5 h-5 animate-spin mb-2 text-emerald-500" />
          <p className="text-xs font-mono font-bold">Querying older dispatcher records...</p>
        </div>

      </div>

    </div>
  );
};
