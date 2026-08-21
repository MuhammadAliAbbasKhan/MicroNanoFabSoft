import React, { useState } from 'react';
import { Cpu, Layers, Zap, Eye, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Binary, Radio, Disc, Filter } from 'lucide-react';

const ApplicationsPageComponent = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const applicationCards = [
    {
      id: 'ebl-1',
      category: 'ebl',
      categoryTag: 'E-BEAM LITHOGRAPHY',
      title: 'Bulk & Sleeving of Patterns for Time Writing Optimization',
      description: 'Superconducting quantum processors require zero field-stitching error and sub-10nm line width control across dense qubit grids. BEAMER 3D Proximity Effect Correction (PEC) compensates for electron backscattering fogging.',
      softwareUsed: 'BEAMER & TRACER',
      image: '/images/slide2.png',
      accentColor: 'border-[#0066b2]',
      tagBg: 'bg-blue-50 text-[#0066b2]'
    },
    {
      id: 'photonics-1',
      category: 'photonics',
      categoryTag: 'SILICON PHOTONICS',
      title: 'Fracturing of Periodic Layouts for Photonic Crystals',
      description: 'Scattering losses in silicon photonic waveguides are dominated by sidewall roughness. ProSEM automatically extracts Line Edge Roughness (LER/LWR) from SEM inspection images to tune cleanroom etch recipes down to sub-0.5 dB/cm loss.',
      softwareUsed: 'ProSEM & LAB 3D',
      image: '/images/app_photonics.png',
      accentColor: 'border-[#f37021]',
      tagBg: 'bg-amber-50 text-[#f37021]'
    },
    {
      id: 'greyscale-1',
      category: 'greyscale',
      categoryTag: '3D GREYSCALE OPTICS',
      title: 'Designing Fresnel Zone Plates & Blazed Micro-Lenses',
      description: 'BEAMER 3D translates STL 3D topography models into continuous dose-modulated exposure files for E-Beam and Laser Direct Write lithography systems, enabling 3D height-profile micro-lenses.',
      softwareUsed: 'BEAMER 3D',
      image: '/images/slide1.png',
      accentColor: 'border-[#23b14d]',
      tagBg: 'bg-green-50 text-[#23b14d]'
    },
    {
      id: 'photomask-1',
      category: 'photomask',
      categoryTag: 'SEMICONDUCTOR MASK MPC',
      title: 'Laser & E-Beam Photomask Mask Process Correction',
      description: 'High-throughput photomask pattern preparation for stepper and proximity aligner reticles. Model-based Mask Process Correction (MPC) ensures distortion-free features for 300mm waferFoundry production lines.',
      softwareUsed: 'BEAMER & LAB',
      image: '/images/app_mask.png',
      accentColor: 'border-[#ffc20e]',
      tagBg: 'bg-yellow-50 text-amber-800'
    },
    {
      id: 'mems-1',
      category: 'mems',
      categoryTag: 'MEMS & NANO-SENSORS',
      title: '3D Micro-Cavity & Cantilever Etch Modeling',
      description: 'Simulate 3D photoresist wall profiles under extreme aspect ratio wet and dry etching. LAB 3D predicts multi-layer resist erosion and sidewall slope angles before cleanroom execution.',
      softwareUsed: 'LAB 3D',
      image: '/images/app_mems.png',
      accentColor: 'border-[#92278f]',
      tagBg: 'bg-purple-50 text-[#92278f]'
    },
    {
      id: 'metrology-1',
      category: 'metrology',
      categoryTag: 'SEM METROLOGY',
      title: 'Automated Cleanroom SEM CD Inspection & Contour Extraction',
      description: 'Connect directly to SEM tools for offline automated contour extraction, line width metrology, and scale calibration, improving SEM machine utilization in R&D cleanrooms.',
      softwareUsed: 'ProSEM',
      image: '/images/slide3.png',
      accentColor: 'border-[#00a3e0]',
      tagBg: 'bg-[#00a3e0]/10 text-[#00a3e0]'
    },
    {
      id: 'ebl-2',
      category: 'ebl',
      categoryTag: 'E-BEAM LITHOGRAPHY',
      title: '3D Proximity Effect Correction for Dolan Technique',
      description: 'Calibrate dose assignment grids for PMMA/ZEP bilayer resists to create overhanging undercut resist profiles for angle evaporation and Josephson junction gates.',
      softwareUsed: 'BEAMER 3D PEC',
      image: '/images/slide2.png',
      accentColor: 'border-[#0066b2]',
      tagBg: 'bg-blue-50 text-[#0066b2]'
    },
    {
      id: 'photonics-2',
      category: 'photonics',
      categoryTag: 'SILICON PHOTONICS',
      title: 'Filling Arbitrary Shapes with Tilted Gratings',
      description: 'Automatically fill non-rectangular photonic layout boundaries with curved grating couplers and angled waveguides using BEAMER geometry engine.',
      softwareUsed: 'BEAMER',
      image: '/images/app_photonics.png',
      accentColor: 'border-[#f37021]',
      tagBg: 'bg-amber-50 text-[#f37021]'
    },
    {
      id: 'photomask-2',
      category: 'photomask',
      categoryTag: 'SEMICONDUCTOR MASK MPC',
      title: 'SÜSS-MicroOptics Source Mask Optimization',
      description: 'Simulate illumination source shapes and mask absorber diffraction in LAB 3D for high-NA mask aligners and stepper projection systems.',
      softwareUsed: 'LAB 3D',
      image: '/images/app_mask.png',
      accentColor: 'border-[#ffc20e]',
      tagBg: 'bg-yellow-50 text-amber-800'
    }
  ];

  const filteredCards = activeCategory === 'all'
    ? applicationCards
    : applicationCards.filter(card => card.category === activeCategory);

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Header Hero Banner with Generated Background Image */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-14 border border-slate-700 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: 'url(/images/slide1.png)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10"></div>

        <div className="relative z-20 space-y-4 max-w-3xl">
          <span className="text-xs font-bold text-[#00a3e0] uppercase tracking-wider bg-[#0066b2]/30 backdrop-blur-md px-3 py-1 rounded-full border border-[#0066b2]/50 inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#00a3e0]" />
            <span>Sub-10nm Lithography Field Guide</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Micro &amp; Nano Lithography Applications
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover how <strong>MicroNanoFabSoft</strong> tools (BEAMER, LAB 3D, TRACER, and ProSEM) power cutting-edge research and industrial foundries in quantum computing, silicon photonics, 3D micro-optics, and photomask MPC.
          </p>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center bg-slate-200 p-1.5 rounded-2xl gap-2 max-w-4xl mx-auto text-xs font-bold">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeCategory === 'all' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>All Applications ({applicationCards.length})</span>
        </button>
        <button
          onClick={() => setActiveCategory('ebl')}
          className={`px-4 py-2 rounded-xl transition-all ${activeCategory === 'ebl' ? 'bg-white shadow text-[#0066b2]' : 'text-slate-600 hover:text-slate-900'}`}
        >
          E-Beam Lithography (PEC)
        </button>
        <button
          onClick={() => setActiveCategory('photonics')}
          className={`px-4 py-2 rounded-xl transition-all ${activeCategory === 'photonics' ? 'bg-white shadow text-[#f37021]' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Silicon Photonics
        </button>
        <button
          onClick={() => setActiveCategory('greyscale')}
          className={`px-4 py-2 rounded-xl transition-all ${activeCategory === 'greyscale' ? 'bg-white shadow text-[#23b14d]' : 'text-slate-600 hover:text-slate-900'}`}
        >
          3D Greyscale Optics
        </button>
        <button
          onClick={() => setActiveCategory('photomask')}
          className={`px-4 py-2 rounded-xl transition-all ${activeCategory === 'photomask' ? 'bg-white shadow text-amber-600' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Photomask MPC
        </button>
        <button
          onClick={() => setActiveCategory('metrology')}
          className={`px-4 py-2 rounded-xl transition-all ${activeCategory === 'metrology' ? 'bg-white shadow text-[#00a3e0]' : 'text-slate-600 hover:text-slate-900'}`}
        >
          SEM Metrology
        </button>
      </div>

      {/* Application Cards Grid with Visual Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <div 
            key={card.id}
            className={`genisys-card flex flex-col justify-between overflow-hidden border-t-4 ${card.accentColor} animate-fadeIn group`}
          >
            {/* Card Image Header */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 ${card.tagBg}`}>
                {card.categoryTag}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Software: {card.softwareUsed}</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0066b2] transition-colors">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{card.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 text-[11px]">Sub-10nm Precision</span>
                <button 
                  onClick={() => setCurrentPage && setCurrentPage('software-portal')}
                  className="font-bold text-[#0066b2] hover:text-[#0055a0] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Request Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export const ApplicationsPage = ApplicationsPageComponent;
export const Applications = ApplicationsPageComponent;
export default ApplicationsPageComponent;