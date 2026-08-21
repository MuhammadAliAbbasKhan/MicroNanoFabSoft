import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastNotification = ({ message, level = 'info', onClose }) => {
  const getStyle = () => {
    switch (level) {
      case 'success':
        return {
          bg: 'bg-emerald-900/90 border-emerald-500 text-emerald-100',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-rose-900/90 border-rose-500 text-rose-100',
          icon: <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
        };
      case 'warning':
        return {
          bg: 'bg-amber-900/90 border-amber-500 text-amber-100',
          icon: <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        };
      default:
        return {
          bg: 'bg-cyan-900/90 border-cyan-500 text-cyan-100',
          icon: <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border backdrop-blur-md shadow-2xl animate-slideIn ${style.bg}`}>
      <div className="flex items-center gap-3 pr-2">
        {style.icon}
        <span className="text-xs font-semibold leading-snug">{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="text-white/60 hover:text-white p-1 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
