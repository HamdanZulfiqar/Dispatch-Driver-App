import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Badge, Truck, Mail, Lock, CheckSquare, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export const SignUp: React.FC = () => {
  const { signup, setScreen } = useApp();
  
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupToast, setSignupToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setSignupToast(message);
    setTimeout(() => {
      setSignupToast(null);
    }, 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Security Access Passwords do not match. Review confirm PIN.');
      return;
    }
    if (!vehicleType) {
      showToast('Select your assigned logistics vehicle class.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signup(name, license || 'LIC-9999-SMT', email, vehicleType);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-y-auto scrollbar-none select-none">
      <div className="min-h-full flex flex-col justify-center px-4 py-12 animate-fade-in max-w-md mx-auto relative">
      
      {/* Toast alert overlay */}
      {signupToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a] border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in w-11/12 max-w-xs justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {signupToast}
        </div>
      )}

      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3.5 bg-emerald-600 text-black rounded-2xl shadow-lg shadow-emerald-950/40 mb-4">
          <Truck className="w-8 h-8 fill-current text-black" />
        </div>
        <h1 className="text-3xl font-black text-zinc-100 tracking-tight font-sans">
          Smart Dispatch
        </h1>
        <p className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest uppercase mt-1">
          LOGISTICS MANAGEMENT SYSTEM
        </p>
      </div>

      {/* Form Card Box */}
      <div className="bg-card-bg border border-zinc-800 p-6 md:p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center mb-4 relative">
          <button 
            onClick={() => setScreen('login')}
            className="absolute left-0 top-1 text-zinc-500 hover:text-white cursor-pointer outline-none"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-zinc-100">
            Driver Registration
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Configure your terminal coordinates securely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name field */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="fullName">
              FULL NAME
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                id="fullName"
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full h-14 pl-12 pr-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-zinc-600 font-sans"
              />
            </div>
          </div>

          {/* License Number field */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="licenseNumber">
              DRIVER LICENSE NUMBER
            </label>
            <div className="relative">
              <Badge className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                id="licenseNumber"
                type="text" 
                required
                value={license}
                onChange={(e) => setLicense(e.target.value.toUpperCase())}
                placeholder="ABC1234567"
                className="w-full h-14 pl-12 pr-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-zinc-600 uppercase font-mono font-bold"
              />
            </div>
          </div>

          {/* Vehicle type Selection field */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="vehicleType">
              ASSIGNED VEHICLE TYPE
            </label>
            <div className="relative">
              <Truck className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <select 
                id="vehicleType"
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Vehicle Class</option>
                <option value="box_truck">Box Truck (Freight / Cargo)</option>
                <option value="cargo_van">Cargo Van (Local Courier)</option>
                <option value="flatbed">Flatbed (Heavy Equipment)</option>
                <option value="semi">Semi-Trailer HeavyDuty (Commercial)</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500">
                ▼
              </div>
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="email">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@dispatch.com"
                className="w-full h-14 pl-12 pr-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-zinc-600 font-sans"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="password">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                id="password"
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 pl-12 pr-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
              />
            </div>
          </div>

          {/* Confirm password field */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider" htmlFor="confirmPassword">
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <CheckSquare className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                id="confirmPassword"
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 pl-12 pr-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
              />
            </div>
          </div>

          {/* Submit register button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-lg shadow-emerald-950/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-6 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2 text-black">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                PROVISIONING DEPLOYMENT...
              </span>
            ) : (
              <>
                Complete Registration
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>

        <div className="h-px bg-zinc-800 my-6"></div>

        {/* Existing account login redirect */}
        <div className="text-center">
          <p className="text-xs text-zinc-550 mb-2">
            Already registered on dispatch network?
          </p>
          <button 
            onClick={() => setScreen('login')}
            className="w-full h-12 border border-emerald-600/30 hover:bg-emerald-950/20 text-emerald-400 font-bold rounded-xl text-xs transition-colors outline-none cursor-pointer"
          >
            Back to Driver Login Portal
          </button>
        </div>
      </div>

      </div>
    </div>
  );
};
