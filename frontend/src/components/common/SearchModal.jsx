import React, { useState } from 'react';
import { Search, X, ChevronRight, Cpu, FileText } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, setCurrentPage }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchItems = [
    { title: "BEAMER — E-Beam Data Prep & PEC", category: "Software Product", page: "beamer", desc: "Proximity effect correction, 3D fracturing, and CAD conversion." },
    { title: "LAB — 3D Micro & Nano Lithography Simulator", category: "Simulation Engine", page: "lab", desc: "Optical, EUV, and E-Beam 3D resist development modeling." },
    { title: "TRACER — Monte Carlo PSF Simulation", category: "Physics Simulator", page: "tracer", desc: "Electron-material energy deposition and point spread functions." },
    { title: "ProSEM — Automated SEM CD Metrology", category: "Metrology Suite", page: "prosem", desc: "Line edge roughness (LER/LWR) and critical dimension measurement." },
    { title: "BEAMER 3D — Greyscale Lithography Profiling", category: "3D Fabrication", page: "beamer-3d", desc: "3D height map surface generation and dose assignment." },
    { title: "Software License & Specification Portal", category: "Protected Portal", page: "software-portal", desc: "Custom fab configuration, GDSII layout prep, and license keys." },
  ];

  const filtered = query.trim() === '' 
    ? searchItems 
    : searchItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.desc.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (page) => {
    setCurrentPage(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-fadeIn">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1">
          <X className="w-5 h-5" />
        </button>

        <div className="relative mb-6">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          <input 
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search BEAMER, LAB 3D, TRACER, ProSEM, or documentation..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
          />
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filtered.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => handleSelect(item.page)}
              className="p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066b2] bg-blue-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0066b2] transition-colors">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0066b2] transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
