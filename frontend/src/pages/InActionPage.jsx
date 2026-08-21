import React, { useState } from 'react';
import { PlayCircle, FileText, Calendar, Download, CheckCircle2, Video, Sparkles, ArrowRight } from 'lucide-react';

const InActionPageComponent = ({ onOpenTrial }) => {
  const [activeTab, setActiveTab] = useState('videos');

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-700 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: 'url(/images/slide2.png)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10"></div>

        <div className="relative z-20 space-y-3 max-w-3xl">
          <span className="text-xs font-bold text-[#00a3e0] uppercase tracking-wider bg-[#0066b2]/30 backdrop-blur-md px-3 py-1 rounded-full border border-[#0066b2]/50 inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#00a3e0]" />
            <span>Interactive Demonstrations &amp; Webinars</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">MicroNanoFabSoft In-Action</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Watch live software demonstration videos, PEC workflow tutorials, Monte Carlo PSF simulations, and read technical benchmark whitepapers.
          </p>
        </div>
      </div>

      {/* Sub-page Navigation Tabs */}
      <div className="flex flex-wrap justify-center bg-slate-200 p-1.5 rounded-2xl gap-2 max-w-xl mx-auto">
        <button 
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'videos' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <PlayCircle className="w-4 h-4 text-[#00a3e0]" />
          <span>Video Tutorials</span>
        </button>

        <button 
          onClick={() => setActiveTab('casestudies')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'casestudies' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <FileText className="w-4 h-4 text-[#23b14d]" />
          <span>Case Studies</span>
        </button>

        <button 
          onClick={() => setActiveTab('webinars')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'webinars' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <Calendar className="w-4 h-4 text-[#f37021]" />
          <span>Webinars</span>
        </button>
      </div>

      {/* Video Content with High Quality Thumbnail Images */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
          <div className="genisys-card p-5 space-y-4 group">
            <div className="bg-slate-900 rounded-xl h-52 flex items-center justify-center relative border border-slate-700 overflow-hidden">
              <img src="/images/slide2.png" alt="BEAMER Demo" className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/40"></div>
              <PlayCircle className="w-16 h-16 text-[#00a3e0] z-10 drop-shadow-2xl group-hover:scale-110 transition-transform cursor-pointer" />
            </div>
            <span className="text-[10px] font-bold text-[#00a3e0] uppercase bg-blue-50 px-2.5 py-1 rounded-full">TUTORIAL &bull; 12 MIN</span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">BEAMER — 3D PEC Proximity Effect Correction Workflow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete walkthrough of GDSII layout loading, PSF selection from TRACER, dose matrix calculation, and JEOL/Elionix export.
            </p>
          </div>

          <div className="genisys-card p-5 space-y-4 group">
            <div className="bg-slate-900 rounded-xl h-52 flex items-center justify-center relative border border-slate-700 overflow-hidden">
              <img src="/images/slide1.png" alt="LAB 3D Demo" className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/40"></div>
              <PlayCircle className="w-16 h-16 text-[#f37021] z-10 drop-shadow-2xl group-hover:scale-110 transition-transform cursor-pointer" />
            </div>
            <span className="text-[10px] font-bold text-[#f37021] uppercase bg-amber-50 px-2.5 py-1 rounded-full">DEMO &bull; 18 MIN</span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">LAB 3D — EUV &amp; Optical Lithography Simulation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modeling 3D aerial image light propagation through mask absorbers, Post Exposure Bake (PEB) diffusion, and 3D resist development.
            </p>
          </div>

          <div className="genisys-card p-5 space-y-4 group">
            <div className="bg-slate-900 rounded-xl h-52 flex items-center justify-center relative border border-slate-700 overflow-hidden">
              <img src="/images/app_photonics.png" alt="Photonics Demo" className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/40"></div>
              <PlayCircle className="w-16 h-16 text-[#23b14d] z-10 drop-shadow-2xl group-hover:scale-110 transition-transform cursor-pointer" />
            </div>
            <span className="text-[10px] font-bold text-[#23b14d] uppercase bg-green-50 px-2.5 py-1 rounded-full">TECHNICAL &bull; 15 MIN</span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">ProSEM — Silicon Photonic Waveguide LER Metrology</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extract Line Edge Roughness (LER) and sidewall angles from high-resolution SEM inspection images in under 60 seconds.
            </p>
          </div>
        </div>
      )}

      {/* Case Studies */}
      {activeTab === 'casestudies' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="genisys-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <img src="/images/slide2.png" alt="Paper Thumbnail" className="w-full md:w-48 h-32 object-cover rounded-xl border border-slate-200" />
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-bold text-[#23b14d] uppercase bg-green-50 px-2.5 py-1 rounded-full">WHITEPAPER PDF</span>
              <h3 className="text-lg font-bold text-slate-900">Benchmarking 100kV EBL Proximity Correction on PMMA Resists</h3>
              <p className="text-xs text-slate-600">Joint research study with Munich Cleanroom Core Facility &bull; Published May 2026</p>
            </div>
            <button onClick={onOpenTrial} className="bg-[#0066b2] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 flex-shrink-0 shadow">
              <Download className="w-4 h-4" />
              <span>Download Whitepaper</span>
            </button>
          </div>

          <div className="genisys-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <img src="/images/app_mask.png" alt="Mask Paper Thumbnail" className="w-full md:w-48 h-32 object-cover rounded-xl border border-slate-200" />
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded-full">BENCHMARK PDF</span>
              <h3 className="text-lg font-bold text-slate-900">High-Throughput Photomask MPC for 300mm Wafer Foundries</h3>
              <p className="text-xs text-slate-600">Model-based Mask Process Correction optimization for extreme UV steppers.</p>
            </div>
            <button onClick={onOpenTrial} className="bg-[#0066b2] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 flex-shrink-0 shadow">
              <Download className="w-4 h-4" />
              <span>Download Whitepaper</span>
            </button>
          </div>
        </div>
      )}

      {/* Webinars */}
      {activeTab === 'webinars' && (
        <div className="relative overflow-hidden bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/images/app_mems.png" alt="Webinar Teaser" className="w-full md:w-72 h-44 object-cover rounded-2xl border border-slate-200" />
            <div className="space-y-3 flex-1">
              <span className="text-xs font-bold text-[#f37021] uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                UPCOMING LIVE WEBINAR &bull; SEPT 15, 2026
              </span>
              <h2 className="text-2xl font-bold text-slate-900">Advanced Greyscale Lithography for Diffractive Optics</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Join Dr. Markus Weber for a hands-on technical session on converting 3D STL CAD models into continuous dose-modulated profiles in BEAMER 3D.
              </p>
              <button onClick={onOpenTrial} className="bg-[#f37021] hover:bg-[#e05f10] text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Register for Free Webinar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const InActionPage = InActionPageComponent;
export default InActionPageComponent;
