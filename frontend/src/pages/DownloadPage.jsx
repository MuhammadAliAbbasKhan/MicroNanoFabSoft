import React, { useState } from 'react';
import { Download, CheckCircle2, ShieldCheck, Terminal, FileCode } from 'lucide-react';

const DownloadPageComponent = ({ onOpenTrial }) => {
  const [activeTab, setActiveTab] = useState('windows');

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0066b2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Official Installation Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Downloads &amp; Software Packages</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Download full desktop installers, Linux HPC cluster packages, Python API bindings, and license manager utilities.
        </p>
      </div>

      {/* Sub-page Navigation Tabs */}
      <div className="flex flex-wrap justify-center bg-slate-200 p-1.5 rounded-2xl gap-2 max-w-xl mx-auto">
        <button 
          onClick={() => setActiveTab('windows')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'windows' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <Download className="w-4 h-4 text-[#00a3e0]" />
          <span>Windows Installers</span>
        </button>

        <button 
          onClick={() => setActiveTab('linux')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'linux' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <Terminal className="w-4 h-4 text-[#23b14d]" />
          <span>Linux HPC Tarballs</span>
        </button>

        <button 
          onClick={() => setActiveTab('python')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'python' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <FileCode className="w-4 h-4 text-[#ffc20e]" />
          <span>Python API Bindings</span>
        </button>
      </div>

      {/* Sub-page Content */}
      {activeTab === 'windows' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="genisys-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">MicroNanoFabSoft Suite v2026.1</h3>
                <span className="text-[10px] text-slate-400">Release Date: June 2026 &bull; Build 4891</span>
              </div>
              <span className="text-xs font-bold text-[#0066b2] bg-blue-50 px-3 py-1 rounded-full">Windows 11 / 10 64-bit</span>
            </div>
            <p className="text-xs text-slate-600">
              Includes full installers for BEAMER, LAB 3D, TRACER, and ProSEM. Requires evaluation or production license key.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600">
              SHA256: 8f9b4c2e1a5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f
            </div>
            <button onClick={onOpenTrial} className="w-full bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider shadow">
              <Download className="w-4 h-4" />
              <span>Download Windows Installer (.exe - 450 MB)</span>
            </button>
          </div>

          <div className="genisys-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Floating License Server Manager</h3>
                <span className="text-[10px] text-slate-400">FlexLM / Sentinel HASP Driver</span>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">Admin Utility</span>
            </div>
            <p className="text-xs text-slate-600">
              License daemon for cleanroom core facilities managing concurrent network licenses across workstations.
            </p>
            <button onClick={onOpenTrial} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider shadow">
              <Download className="w-4 h-4" />
              <span>Download License Manager (.msi - 85 MB)</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'linux' && (
        <div className="genisys-card p-6 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">Linux HPC Cluster Package (RHEL / Ubuntu / Rocky Linux)</h3>
          <p className="text-xs text-slate-600">
            Headless batch processing engine for computing large-scale GDSII/OASIS 3D PEC jobs across multi-node cleanroom clusters.
          </p>
          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs space-y-1">
            <p># Install MicroNanoFabSoft CLI on Linux HPC:</p>
            <p className="text-white">tar -xzf micronanofabsoft_v2026.1_linux64.tar.gz</p>
            <p className="text-white">cd micronanofabsoft_v2026.1 &amp;&amp; ./install.sh --lic-server 10.0.0.5</p>
          </div>
          <button onClick={onOpenTrial} className="bg-[#23b14d] hover:bg-[#1e9942] text-white font-bold text-xs px-6 py-3 rounded-lg flex items-center gap-2 uppercase tracking-wider">
            <Download className="w-4 h-4" />
            <span>Download Linux Tarball (.tar.gz - 380 MB)</span>
          </button>
        </div>
      )}

      {activeTab === 'python' && (
        <div className="genisys-card p-6 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">Python Automation API (`pip install micronanofab`)</h3>
          <p className="text-xs text-slate-600">
            Script GDSII layout loading, dose matrix generation, and ProSEM automated image measurement in Python.
          </p>
          <div className="bg-slate-900 text-blue-300 p-4 rounded-xl font-mono text-xs space-y-1">
            <p className="text-slate-400"># Sample Python Script:</p>
            <p><span className="text-pink-400">import</span> micronanofab.beamer <span className="text-pink-400">as</span> mnf</p>
            <p>flow = mnf.Flow(<span className="text-amber-300">"sub10nm_pec.flow"</span>)</p>
            <p>flow.load_gds(<span className="text-amber-300">"chip_pattern.gds"</span>)</p>
            <p>flow.apply_pec(voltage=<span className="text-emerald-300">100</span>, base_dose=<span className="text-emerald-300">180</span>)</p>
            <p>flow.export_jeol(<span className="text-amber-300">"output_job.v30"</span>)</p>
          </div>
        </div>
      )}

    </div>
  );
};

export const DownloadPage = DownloadPageComponent;
export default DownloadPageComponent;
