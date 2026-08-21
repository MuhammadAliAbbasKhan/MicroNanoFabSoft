import React from 'react';

export const Footer = ({ setCurrentPage }) => {
  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full font-sans bg-[#3f444a] text-slate-300 border-t border-slate-700 py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Company Title & Address */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full border-2 border-[#0066b2] bg-[#f37021]"></div>
            <span className="text-lg font-black text-white tracking-tight">
              Micro<span className="text-[#00a3e0]">Nano</span><span className="text-[#f37021]">Fab</span>Soft
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Advanced Micro- &amp; Nano- Lithography Simulation, E-Beam Data Preparation, PEC, and 3D Metrology Software.
          </p>
        </div>

        {/* Uppercase Navigation Links (GenISys Style from Screenshot) */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
          <button onClick={() => handleNav('privacy')} className="hover:text-[#00a3e0] transition-colors">
            PRIVACY POLICY
          </button>
          <span className="text-slate-600">|</span>
          <button onClick={() => handleNav('imprint')} className="hover:text-[#00a3e0] transition-colors">
            IMPRINT
          </button>
          <span className="text-slate-600">|</span>
          <button onClick={() => handleNav('contact')} className="hover:text-[#00a3e0] transition-colors">
            CONTACT
          </button>
          <span className="text-slate-600">|</span>
          <button onClick={() => handleNav('support')} className="hover:text-[#00a3e0] transition-colors">
            SUPPORT
          </button>
          <span className="text-slate-600">|</span>
          <button onClick={() => handleNav('download')} className="hover:text-[#00a3e0] transition-colors">
            DOWNLOADS
          </button>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
        <span>&copy; 2026 MicroNanoFabSoft GmbH. All rights reserved.</span>
        <span>Munich, Germany &bull; Semiconductor Nanofabrication Software Solutions</span>
      </div>
    </footer>
  );
};
