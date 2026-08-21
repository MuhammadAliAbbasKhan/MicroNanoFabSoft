import React, { useState } from 'react';
import { Search, User, LogOut, Menu, X, ShieldCheck, Cpu, Lock, FlaskConical, ChevronDown, Layers, Zap, Eye, Download, Globe, FileText, PlayCircle, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Header = ({ currentPage, setCurrentPage, onOpenSearch, onOpenAuth, currentUser, onLogout }) => {
  const { lang, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full font-sans select-none sticky top-0 z-40 bg-[#3f444a] shadow-md overflow-x-hidden">
      
      {/* ── MAIN GENISYS-STYLE HEADER CONTAINER WITH ANGLED LOGO BADGE ── */}
      <div className="max-w-7xl mx-auto flex items-stretch h-16 sm:h-20 relative">
        
        {/* Left Side: Angled White Logo Badge Container */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer bg-white px-3 sm:px-6 flex items-center gap-2 sm:gap-3 z-20 relative pr-8 sm:pr-12 flex-shrink-0 transition-transform hover:opacity-95"
          style={{ clipPath: 'polygon(0 0, 88% 0, 100% 100%, 0 100%)' }}
        >
          {/* Eyeball / Rainbow Lens Logo Icon */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 relative flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
              <ellipse cx="50" cy="50" rx="46" ry="26" fill="none" stroke="#0066b2" strokeWidth="9" />
              <circle cx="50" cy="50" r="18" fill="#f37021" />
              <path d="M 10 50 Q 50 15 90 50 Q 50 85 10 50 Z" fill="url(#rainbowGradHeader)" opacity="0.85" />
              <defs>
                <linearGradient id="rainbowGradHeader" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e81c24" />
                  <stop offset="25%" stopColor="#f37021" />
                  <stop offset="50%" stopColor="#ffc20e" />
                  <stop offset="75%" stopColor="#23b14d" />
                  <stop offset="100%" stopColor="#0066b2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Brand Name: MicroNanoFabSoft */}
          <div className="flex flex-col justify-center leading-none">
            <span className="text-lg sm:text-xl font-black text-[#2d3136] tracking-tight font-sans">
              Micro<span className="text-[#0066b2]">Nano</span><span className="text-[#f37021]">Fab</span>Soft
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 tracking-wider uppercase mt-0.5 hidden xs:block">
              Micro &amp; Nano Simulation
            </span>
          </div>
        </div>

        {/* Right Side: Dark Charcoal Nav Links (#3f444a) */}
        <div className="flex-1 bg-[#3f444a] flex items-center justify-between px-2 sm:px-4 text-white overflow-hidden">
          
          {/* Desktop Navigation Links with Rich Dropdowns */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-4 text-[11px] 2xl:text-xs font-bold tracking-wider uppercase flex-shrink">
            
            {/* 1. PRODUCTS Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('products')} onMouseLeave={() => setOpenDropdown(null)}>
              <button 
                onClick={() => handleNavClick('home')}
                className={`py-5 px-1.5 flex items-center gap-1 hover:text-[#00a3e0] transition-colors ${['home','beamer','lab','tracer','prosem','beamer-3d'].includes(currentPage) ? 'text-[#00a3e0]' : 'text-slate-200'}`}
              >
                <span>PRODUCTS</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'products' && (
                <div className="absolute top-full left-0 w-72 bg-[#2d3136] shadow-2xl border border-slate-700 rounded-b-xl py-2 z-50 animate-fadeIn text-normal normal-case">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60">Software Product Suite</div>
                  <button onClick={() => handleNavClick('beamer')} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00a3e0]" />
                    <div><div>BEAMER</div><span className="text-[10px] text-slate-400 font-normal">E-Beam Data Prep &amp; 3D PEC</span></div>
                  </button>
                  <button onClick={() => handleNavClick('lab')} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#f37021] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#f37021]" />
                    <div><div>LAB 3D</div><span className="text-[10px] text-slate-400 font-normal">3D Micro &amp; Nano Simulator</span></div>
                  </button>
                  <button onClick={() => handleNavClick('tracer')} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#23b14d] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#23b14d]" />
                    <div><div>TRACER</div><span className="text-[10px] text-slate-400 font-normal">Monte Carlo PSF Physics</span></div>
                  </button>
                  <button onClick={() => handleNavClick('prosem')} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#ffc20e] flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#ffc20e]" />
                    <div><div>ProSEM</div><span className="text-[10px] text-slate-400 font-normal">Automated SEM CD Metrology</span></div>
                  </button>
                  <button onClick={() => handleNavClick('beamer-3d')} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#92278f] flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#92278f]" />
                    <div><div>BEAMER 3D</div><span className="text-[10px] text-slate-400 font-normal">Greyscale Surface Profiling</span></div>
                  </button>
                </div>
              )}
            </div>

            {/* 2. APPLICATIONS Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('applications')} onMouseLeave={() => setOpenDropdown(null)}>
              <button 
                onClick={() => handleNavClick('applications')}
                className={`py-5 px-1.5 flex items-center gap-1 hover:text-[#00a3e0] transition-colors ${currentPage === 'applications' ? 'text-[#00a3e0]' : 'text-slate-200'}`}
              >
                <span>APPLICATIONS</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'applications' && (
                <div className="absolute top-full left-0 w-72 bg-[#2d3136] shadow-2xl border border-slate-700 rounded-b-xl py-2 z-50 animate-fadeIn text-normal normal-case">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60">Nanofabrication Fields</div>
                  <button onClick={() => handleNavClick('applications')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    Quantum &amp; Qubit Fabrication
                  </button>
                  <button onClick={() => handleNavClick('applications')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    Silicon Photonic Waveguides
                  </button>
                  <button onClick={() => handleNavClick('applications')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    Greyscale Micro-Optics (DOE)
                  </button>
                  <button onClick={() => handleNavClick('applications')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    Semiconductor Photomask MPC
                  </button>
                </div>
              )}
            </div>

            {/* 3. IN-ACTION Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('inaction')} onMouseLeave={() => setOpenDropdown(null)}>
              <button 
                onClick={() => handleNavClick('in-action')}
                className={`py-5 px-1.5 flex items-center gap-1 hover:text-[#00a3e0] transition-colors ${currentPage === 'in-action' ? 'text-[#00a3e0]' : 'text-slate-200'}`}
              >
                <span>IN-ACTION</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'inaction' && (
                <div className="absolute top-full left-0 w-64 bg-[#2d3136] shadow-2xl border border-slate-700 rounded-b-xl py-2 z-50 animate-fadeIn text-normal normal-case">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60">Demos &amp; Tutorials</div>
                  <button onClick={() => handleNavClick('in-action')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0] flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-[#00a3e0]" />
                    <span>Video Demonstrations</span>
                  </button>
                  <button onClick={() => handleNavClick('in-action')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#23b14d]" />
                    <span>Case Studies &amp; Papers</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4. DOWNLOAD Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('download')} onMouseLeave={() => setOpenDropdown(null)}>
              <button 
                onClick={() => handleNavClick('download')}
                className={`py-5 px-1.5 flex items-center gap-1 hover:text-[#00a3e0] transition-colors ${currentPage === 'download' ? 'text-[#00a3e0]' : 'text-slate-200'}`}
              >
                <span>DOWNLOAD</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'download' && (
                <div className="absolute top-full left-0 w-64 bg-[#2d3136] shadow-2xl border border-slate-700 rounded-b-xl py-2 z-50 animate-fadeIn text-normal normal-case">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60">Installers &amp; Packages</div>
                  <button onClick={() => handleNavClick('download')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    Windows 11/10 Installer (v2026.1)
                  </button>
                  <button onClick={() => handleNavClick('download')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#23b14d]">
                    Linux HPC Cluster Package (.tar.gz)
                  </button>
                  <button onClick={() => handleNavClick('download')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#ffc20e]">
                    Python Automation API Bindings
                  </button>
                </div>
              )}
            </div>

            {/* 5. CORPORATE Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('corporate')} onMouseLeave={() => setOpenDropdown(null)}>
              <button 
                onClick={() => handleNavClick('corporate')}
                className={`py-5 px-1.5 flex items-center gap-1 hover:text-[#00a3e0] transition-colors ${currentPage === 'corporate' ? 'text-[#00a3e0]' : 'text-slate-200'}`}
              >
                <span>CORPORATE</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'corporate' && (
                <div className="absolute top-full left-0 w-64 bg-[#2d3136] shadow-2xl border border-slate-700 rounded-b-xl py-2 z-50 animate-fadeIn text-normal normal-case">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60">MicroNanoFabSoft GmbH</div>
                  <button onClick={() => handleNavClick('corporate')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    Munich HQ &amp; US Tech Centers
                  </button>
                  <button onClick={() => handleNavClick('corporate')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    Company History &amp; Vision
                  </button>
                  <button onClick={() => handleNavClick('corporate')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#23b14d]">
                    Career Openings &amp; Jobs
                  </button>
                </div>
              )}
            </div>

            {/* 6. SOFTWARE PORTAL (PROTECTED) */}
            <button 
              onClick={() => handleNavClick('software-portal')}
              className={`hover:text-amber-400 transition-colors flex items-center gap-1 px-1.5 ${currentPage === 'software-portal' ? 'text-amber-400 font-bold' : 'text-slate-200'}`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>PORTAL</span>
            </button>

            {/* 7. SUPPORT Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('support')} onMouseLeave={() => setOpenDropdown(null)}>
              <button 
                onClick={() => handleNavClick('support')}
                className={`py-5 px-1.5 flex items-center gap-1 hover:text-[#00a3e0] transition-colors ${currentPage === 'support' ? 'text-[#00a3e0]' : 'text-slate-200'}`}
              >
                <span>SUPPORT</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'support' && (
                <div className="absolute top-full left-0 w-64 bg-[#2d3136] shadow-2xl border border-slate-700 rounded-b-xl py-2 z-50 animate-fadeIn text-normal normal-case">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60">Knowledge &amp; Tickets</div>
                  <button onClick={() => handleNavClick('support')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#00a3e0]">
                    User Handbooks &amp; PDF Manuals
                  </button>
                  <button onClick={() => handleNavClick('support')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#f37021]">
                    Submit 24/7 Support Ticket
                  </button>
                  <button onClick={() => handleNavClick('support')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-200 hover:bg-[#3f444a] hover:text-[#23b14d]">
                    Lithography Optimization Workshops
                  </button>
                </div>
              )}
            </div>

            {/* 8. CONTACT */}
            <button 
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#00a3e0] transition-colors px-1.5 ${currentPage === 'contact' ? 'text-[#00a3e0]' : 'text-slate-200'}`}
            >
              CONTACT
            </button>

          </nav>

          {/* Right Action Utilities (Search, Auth, Lang) - Always visible & flex-shrink-0 */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-shrink-0 z-30">
            
            {/* Quick Search */}
            <button 
              onClick={onOpenSearch}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
              title="Search Products & Documentation"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher EN | DE */}
            <div className="flex items-center bg-black/20 rounded px-1.5 py-1 text-[10px] sm:text-[11px] font-bold">
              <button 
                onClick={() => toggleLanguage('EN')}
                className={`px-1 rounded ${lang === 'EN' ? 'bg-[#0066b2] text-white' : 'text-slate-300'}`}
              >
                EN
              </button>
              <span className="px-0.5 text-slate-500">|</span>
              <button 
                onClick={() => toggleLanguage('DE')}
                className={`px-1 rounded ${lang === 'DE' ? 'bg-[#0066b2] text-white' : 'text-slate-300'}`}
              >
                DE
              </button>
            </div>

            {/* Admin Console Shortcut */}
            {currentUser?.is_admin && (
              <button 
                onClick={() => handleNavClick('admin')}
                className="bg-amber-400 text-slate-900 font-bold px-2 py-1 rounded text-[10px] flex items-center gap-1 hover:bg-amber-300"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}

            {/* Login / User Widget - Always visible */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-[#2d3136] border border-slate-600 rounded-full px-2.5 py-1 text-xs">
                <User className="w-3.5 h-3.5 text-[#00a3e0]" />
                <span className="font-bold max-w-[70px] sm:max-w-[100px] truncate text-[11px] sm:text-xs">{currentUser.username}</span>
                <button 
                  onClick={onLogout}
                  className="text-red-400 hover:text-red-300 p-0.5"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold text-xs px-3 sm:px-4 py-1.5 rounded-full transition-colors shadow uppercase tracking-wider flex-shrink-0"
              >
                LOGIN
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-200 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

      </div>

      {/* ── RAINBOW GRADIENT STRIPE LINE ── */}
      <div className="w-full rainbow-stripe"></div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#2d3136] text-white border-b border-slate-700 px-6 py-4 space-y-3 font-semibold text-xs uppercase tracking-wider">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left py-1 hover:text-[#00a3e0]">PRODUCTS (Home)</button>
          <button onClick={() => handleNavClick('beamer')} className="block w-full text-left py-1 text-slate-300 hover:text-[#00a3e0] pl-3">— BEAMER (E-Beam PEC)</button>
          <button onClick={() => handleNavClick('lab')} className="block w-full text-left py-1 text-slate-300 hover:text-[#00a3e0] pl-3">— LAB (3D Litho Sim)</button>
          <button onClick={() => handleNavClick('tracer')} className="block w-full text-left py-1 text-slate-300 hover:text-[#00a3e0] pl-3">— TRACER (Monte Carlo)</button>
          <button onClick={() => handleNavClick('prosem')} className="block w-full text-left py-1 text-slate-300 hover:text-[#00a3e0] pl-3">— ProSEM (SEM Analysis)</button>
          <button onClick={() => handleNavClick('beamer-3d')} className="block w-full text-left py-1 text-slate-300 hover:text-[#00a3e0] pl-3">— BEAMER 3D (Greyscale)</button>
          <button onClick={() => handleNavClick('applications')} className="block w-full text-left py-1 hover:text-[#00a3e0]">APPLICATIONS</button>
          <button onClick={() => handleNavClick('in-action')} className="block w-full text-left py-1 hover:text-[#00a3e0]">IN-ACTION</button>
          <button onClick={() => handleNavClick('download')} className="block w-full text-left py-1 hover:text-[#00a3e0]">DOWNLOAD</button>
          <button onClick={() => handleNavClick('corporate')} className="block w-full text-left py-1 hover:text-[#00a3e0]">CORPORATE</button>
          <button onClick={() => handleNavClick('software-portal')} className="block w-full text-left py-1 text-amber-400 font-bold">🔒 PORTAL &amp; SPECS</button>
          <button onClick={() => handleNavClick('support')} className="block w-full text-left py-1 hover:text-[#00a3e0]">SUPPORT</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left py-1 hover:text-[#00a3e0]">CONTACT</button>
        </div>
      )}

    </header>
  );
};
