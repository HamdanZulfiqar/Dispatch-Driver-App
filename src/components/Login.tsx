import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Eye, EyeOff, Truck, Headset, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, setScreen } = useApp();
  const [email, setEmail] = useState('driver@dispatch.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginToast, setLoginToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setLoginToast(message);
    setTimeout(() => {
      setLoginToast(null);
    }, 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate slight dispatch handshake delay
    setTimeout(() => {
      login(email);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-y-auto scrollbar-none select-none">
      <div className="min-h-full flex flex-col justify-center px-4 py-12 animate-fade-in max-w-md mx-auto relative">
      
      {/* Toast alert overlay */}
      {loginToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a] border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in w-11/12 max-w-xs justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {loginToast}
        </div>
      )}

      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3.5 bg-emerald-600 text-black rounded-2xl shadow-lg shadow-emerald-950/40 mb-4 animate-bounce">
          <Truck className="w-8 h-8 fill-current text-black" />
        </div>
        <h1 className="text-3xl font-black text-zinc-100 tracking-tight font-sans">
          Smart Dispatch
        </h1>
        <p className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest uppercase mt-1">
          LOGISTICS MANAGEMENT SYSTEM
        </p>
      </div>

      {/* Main card box */}
      <div className="bg-card-bg border border-zinc-800 p-6 md:p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-zinc-100">
            Authorized Driver Login
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Access your assigned terminal manifests securely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email address field */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="email">
              DRIVER TERMINAL EMAIL
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@logistics.com"
                className="w-full h-14 pl-12 pr-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:ring-0 focus:outline-none transition-all placeholder:text-zinc-600 font-sans"
              />
            </div>
          </div>

          {/* Secure Password field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="password">
                SECURE ACCESS PIN / PASSWORD
              </label>
              <button 
                type="button" 
                onClick={() => showToast('Dispatch coordinator security reset pin sent to phone.')}
                className="text-[10px] font-mono font-bold text-emerald-400 hover:underline outline-none cursor-pointer"
              >
                FORGOT?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 pl-12 pr-12 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:ring-0 focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Stay logged in checkbox */}
          <div className="flex items-center gap-2 pt-1 select-none cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={() => {}} // Controlled by outer div click
              className="rounded accent-emerald-500 text-emerald-500 bg-zinc-950 border-zinc-800 focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-zinc-400 font-medium">
              Stay logged in for this shift session
            </span>
          </div>

          {/* Primary Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2 text-black">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                HANDSHAKING WITH SERVER...
              </span>
            ) : (
              <>
                Login to Dispatch Feed
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-6"></div>

        {/* Contact support button */}
        <div className="space-y-3">
          <p className="text-[10px] text-center text-zinc-500 font-mono font-bold uppercase tracking-wider">
            Need assistance accessing your route?
          </p>
          <button 
            onClick={() => showToast('Opening satellite channel to central dispatch...')}
            className="w-full h-12 border-2 border-dashed border-zinc-800 text-zinc-400 font-bold rounded-xl flex items-center justify-center gap-2 active:bg-zinc-950 hover:border-zinc-700 transition-colors text-xs outline-none cursor-pointer"
          >
            <Headset className="w-4 h-4 text-emerald-400" />
            CONTACT DISPATCH OPERATIONS
          </button>
        </div>
      </div>

      {/* Redirect registration link */}
      <div className="text-center mt-6">
        <button 
          onClick={() => setScreen('signup')}
          className="text-xs font-bold text-emerald-400 hover:underline outline-none cursor-pointer"
        >
          New driver contract? Register to Dispatch Network
        </button>
      </div>

      {/* Footer credits */}
      <footer className="text-center mt-8 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest space-y-1">
        <div className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Authorized Driver Access Only</span>
        </div>
        <div>
          <span>PRIVACY POLICY</span>
          <span className="mx-2">·</span>
          <span>TERMS OF SERVICE</span>
        </div>
      </footer>

      </div>
    </div>
  );
};
