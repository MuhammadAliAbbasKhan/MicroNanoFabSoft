import React, { useState } from 'react';
import { X, User, Lock, Mail } from 'lucide-react';
import { loginUser, signupUser } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AuthModal = ({ isOpen, onClose, setCurrentUser, setCurrentPage, onOpenCheckout }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [planTier, setPlanTier] = useState('standard');
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await loginUser({ email, password });
        if (res.status === 'success') {
          setCurrentUser(res.user);
          if (res.messages && res.messages.length > 0) {
            res.messages.forEach(m => addToast(m.message, m.level));
          }
          if (res.user.is_admin) {
            localStorage.setItem('adminPasscode', 'aliabbas1234578!');
            setCurrentPage('admin');
          }
          onClose();
        }
      } else {
        const res = await signupUser({ username, email, password, plan_tier: planTier });
        if (res.status === 'success') {
          setCurrentUser(res.user);
          if (res.messages && res.messages.length > 0) {
            res.messages.forEach(m => addToast(m.message, m.level));
          }
          onClose();
          if (onOpenCheckout) {
            onOpenCheckout(planTier);
          }
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.detail || 'Authentication failed.';
      addToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-fadeIn">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#0066b2]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#0066b2]">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {isLogin ? 'Sign In to MicroNanoFabSoft' : 'Create Workspace Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access BEAMER, LAB 3D, TRACER, and ProSEM lithography simulation suites.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name / Organization</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Dr. Alexander Vance"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.edu"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select License Tier</label>
              <select 
                value={planTier} 
                onChange={(e) => setPlanTier(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none bg-white font-medium"
              >
                <option value="basic">Academic Litho License ($149/mo)</option>
                <option value="standard">Commercial Fab Suite ($499/mo)</option>
                <option value="premium">Enterprise Litho Foundry ($999/mo)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow uppercase tracking-wider"
          >
            {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-slate-600 hover:text-[#0066b2] font-medium"
          >
            {isLogin ? "Don't have an account? Register here" : "Already have an account? Sign in"}
          </button>
        </div>

      </div>
    </div>
  );
};
