import React, { useState, useEffect } from "react";
import { MicroNanoCanvas } from "../components/simulator/MicroNanoCanvas";
import { Cpu, Layers, Zap, Eye, Lock, ArrowRight, CheckCircle2, Download, ChevronLeft, ChevronRight, Calendar, Briefcase, Newspaper, Image as ImageIcon } from "lucide-react";

// ======================== SLIDER COMPONENT WITH BACKGROUND IMAGES ========================
const Slider = ({ onOpenTrial }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "MicroNanoFabSoft — Precision Nanofabrication Software",
      subtitle: "Industry-leading software solutions for E-Beam Lithography, 3D Process Simulation, PEC, and SEM Metrology.",
      tag: "OVERVIEW",
      color: "text-[#00a3e0]",
      image: "https://www.genisys-gmbh.com/files/daten/bilder/slider/slider1.jpg",
      fallbackGradient: "from-slate-900 via-blue-950 to-slate-900"
    },
    {
      title: "BEAMER — Superior E-Beam Data Prep & 3D PEC",
      subtitle: "Sub-10nm Proximity Effect Correction, 3D fracturing, field stitching control, and high-speed GDSII / OASIS conversion.",
      tag: "BEAMER SUITE",
      color: "text-[#00a3e0]",
      image: "https://www.genisys-gmbh.com/files/daten/bilder/slider/Slider2-2.png",
      fallbackGradient: "from-blue-950 via-slate-900 to-slate-950"
    },
    {
      title: "ProSEM — Automated SEM CD Metrology & LER",
      subtitle: "Extract Critical Dimensions (CD), Line Edge Roughness (LER/LWR), and 3D sidewall angles from SEM images.",
      tag: "ProSEM METROLOGY",
      color: "text-[#ffc20e]",
      image: "https://www.genisys-gmbh.com/files/daten/bilder/slider/slider3.jpg",
      fallbackGradient: "from-amber-950 via-slate-900 to-slate-950"
    },
    {
      title: "LAB 3D — Full 3D Lithography Process Simulation",
      subtitle: "Model optical projection, EUV, laser direct writing, resist bake diffusion, and 3D solvent development profiles.",
      tag: "LAB 3D SIMULATOR",
      color: "text-[#f37021]",
      image: "https://www.genisys-gmbh.com/files/daten/bilder/slider/slider4.jpg",
      fallbackGradient: "from-amber-950 via-slate-900 to-slate-950"
    },
    {
      title: "TRACER — Monte Carlo Energy Deposition Engine",
      subtitle: "Simulate electron-material interactions (10-100kV) and calculate exact Point Spread Functions (PSFs).",
      tag: "TRACER PHYSICS",
      color: "text-[#23b14d]",
      image: "https://www.genisys-gmbh.com/files/daten/bilder/slider/slider4.jpg",
      fallbackGradient: "from-emerald-950 via-slate-900 to-slate-950"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#2d3136] text-white border border-slate-700 shadow-2xl h-[420px] sm:h-[480px]">
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className="min-w-full h-full relative flex flex-col justify-end p-8 sm:p-12"
          >
            {/* Background Image with Dark Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0  z-10"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-20 space-y-3 max-w-3xl">
              <span className={`text-xs font-black uppercase tracking-widest ${slide.color} bg-black/60 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/20 inline-flex items-center gap-1.5`}>
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{slide.tag}</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-black leading-tight text-white drop-shadow-md">
                {slide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl drop-shadow-sm">
                {slide.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button 
                  onClick={onOpenTrial}
                  className="bg-[#23b14d] hover:bg-[#1e9942] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  Request 30-Day Free Trial Key
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-colors z-30 border border-white/20 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-colors z-30 border border-white/20 shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-4 right-8 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-[#00a3e0] w-6' : 'bg-white/40 hover:bg-white/80'}`}
          ></button>
        ))}
      </div>

    </div>
  );
};

// ======================== MAIN HOMEPAGE COMPONENT ========================
const HomePageComponent = ({ setCurrentPage, onOpenTrial, onOpenCheckout }) => {
  const products = [
    { name: "BEAMER", code: "beamer", tag: "E-Beam Data Prep & PEC", desc: "Proximity effect correction, 3D fracturing, and fast GDSII / OASIS conversion.", color: "text-[#00a3e0]" },
    { name: "LAB 3D", code: "lab", tag: "3D Process Simulator", desc: "Comprehensive 3D resist exposure, PEB thermal diffusion, and development modeling.", color: "text-[#f37021]" },
    { name: "TRACER", code: "tracer", tag: "Monte Carlo Physics", desc: "Electron-material energy deposition and Point Spread Function (PSF) calculations.", color: "text-[#23b14d]" },
    { name: "ProSEM", code: "prosem", tag: "SEM CD Metrology", desc: "Automated SEM edge detection, Line Edge Roughness (LER), and 3D sidewall reconstruction.", color: "text-[#ffc20e]" },
    { name: "BEAMER 3D", code: "beamer-3d", tag: "Greyscale Surface Profile", desc: "Translates STL/STEP 3D models into dose-modulated greyscale lithography profiles.", color: "text-[#92278f]" },
  ];

  const newsItems = [
    { date: "2026-06-05", title: "MicroNanoFabSoft Global Lithography Workshop 2026 Munich" },
    { date: "2025-10-26", title: "BEAMer 3D PEC Update v2026.1 Released" },
    { date: "2025-05-27", title: "EIPBN MicroNanoFab User Group Meeting & Technical Session" },
  ];

  const events = [
    { date: "2026-08-19 – 08-21", title: "nanoFabUK International Nanofabrication Symposium 2026" },
    { date: "2026-09-17 – 09-19", title: "SEMICON Europe & India Semiconductor Conference 2026" },
    { date: "2026-09-21 – 09-24", title: "MNE Micro & Nano Engineering Conference Interlaken" },
  ];

  const careerItems = [
    { date: "2026-05-31", title: "Technical Applications Engineer Europe (m/f/d) - Munich HQ" },
    { date: "2026-04-20", title: "Lithography Software Developer - E-Beam Physics (m/f/d)" },
  ];

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* ── HERO CAROUSEL SLIDER WITH IMAGES ── */}
      <Slider onOpenTrial={onOpenTrial} />

      {/* ── HERO INTRODUCTORY SECTION ── */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0b1a2b] tracking-tight">
          MicroNanoFabSoft — Advancing the Standard in Nanofabrication
        </h1>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>MicroNanoFabSoft</strong> provides flexible, high-performance software solutions for the optimization of micro- and nano- fabrication as well as metrology and inspection, giving cleanrooms, semiconductor foundries, and research labs unparalleled efficiency in sub-10nm technology development.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Our flagship module <strong>BEAMER</strong> is the industry standard for Electron Beam Lithography (EBL) pattern processing. By combining 3D Proximity Effect Correction (PEC), 3D fracturing, field positioning, and write sequence control, BEAMER enables demanding quantum, photonics, and MEMS applications worldwide.
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button 
            onClick={() => setCurrentPage('software-portal')}
            className="bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors shadow flex items-center gap-2 uppercase tracking-wider"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>🔒 Software Portal &amp; Specs</span>
          </button>
        </div>
      </section>

      {/* ── INTERACTIVE LITHOGRAPHY SIMULATOR ENGINE ── */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900">Interactive 2D Lithography &amp; PEC Simulator</h2>
          <p className="text-xs text-slate-600 mt-1">
            Test voltage scatter parameters (10-100kV), dose profiles, and BEAMER proximity effect correction live in your browser.
          </p>
        </div>
        <MicroNanoCanvas />
      </section>

      {/* ── PRODUCT SUITE CARDS GRID ── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 text-center">Nanofabrication Software Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentPage(prod.code)}
              className="genisys-card p-6 flex flex-col justify-between cursor-pointer group hover:border-[#0066b2]"
            >
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${prod.color}`}>{prod.tag}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-[#0066b2] transition-colors">{prod.name}</h3>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{prod.desc}</p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#0066b2]">
                <span>Explore {prod.name} Module</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWS, EVENTS, & CAREERS ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* News Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Newspaper className="w-5 h-5 text-[#0066b2]" />
            <h3 className="text-lg font-bold text-slate-900">Latest News</h3>
          </div>
          <div className="space-y-3 text-xs">
            {newsItems.map((n, i) => (
              <div key={i} className="border-b border-slate-100 pb-2">
                <span className="text-[10px] font-bold text-slate-400 block">{n.date}</span>
                <span className="font-semibold text-slate-800 hover:text-[#0066b2] cursor-pointer">{n.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Calendar className="w-5 h-5 text-[#f37021]" />
            <h3 className="text-lg font-bold text-slate-900">Upcoming Events</h3>
          </div>
          <div className="space-y-3 text-xs">
            {events.map((ev, i) => (
              <div key={i} className="border-b border-slate-100 pb-2">
                <span className="text-[10px] font-bold text-slate-400 block">{ev.date}</span>
                <span className="font-semibold text-slate-800 hover:text-[#f37021] cursor-pointer">{ev.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Briefcase className="w-5 h-5 text-[#23b14d]" />
            <h3 className="text-lg font-bold text-slate-900">Careers</h3>
          </div>
          <div className="space-y-3 text-xs">
            {careerItems.map((c, i) => (
              <div key={i} className="border-b border-slate-100 pb-2">
                <span className="text-[10px] font-bold text-slate-400 block">{c.date}</span>
                <span className="font-semibold text-slate-800 hover:text-[#23b14d] cursor-pointer">{c.title}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};

export const HomePage = HomePageComponent;
export default HomePageComponent;