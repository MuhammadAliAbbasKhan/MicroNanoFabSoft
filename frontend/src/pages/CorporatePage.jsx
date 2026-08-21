import React, { useState } from 'react';
import { MapPin, Globe, Users, History, Award, Briefcase } from 'lucide-react';

const CorporatePageComponent = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0066b2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Global Organization &amp; Management
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Corporate — MicroNanoFabSoft GmbH</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Headquartered in Munich, Germany, MicroNanoFabSoft is a global leader in specialized nanofabrication software for semiconductors, micro-optics, and quantum devices.
        </p>
      </div>

      {/* Sub-page Navigation Tabs */}
      <div className="flex flex-wrap justify-center bg-slate-200 p-1.5 rounded-2xl gap-2 max-w-xl mx-auto">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'profile' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <Globe className="w-4 h-4 text-[#00a3e0]" />
          <span>Profile &amp; Offices</span>
        </button>

        <button 
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <History className="w-4 h-4 text-[#23b14d]" />
          <span>History &amp; Vision</span>
        </button>

        <button 
          onClick={() => setActiveTab('careers')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'careers' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <Briefcase className="w-4 h-4 text-[#f37021]" />
          <span>Careers &amp; Jobs</span>
        </button>
      </div>

      {/* Sub-page Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="genisys-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#0066b2]">
              <MapPin className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900">Munich Headquarters, Germany</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              MicroNanoFabSoft GmbH<br />
              Eschenschlag 2, D-81375 Munich, Germany<br />
              Phone: +49 89 356477-0 &bull; Fax: +49 89 356477-29<br />
              Email: info@micronanofabsoft.com
            </p>
          </div>

          <div className="genisys-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#f37021]">
              <Globe className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900">USA &amp; Asia Technical Centers</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              MicroNanoFabSoft Inc. USA<br />
              Wellesley Hills, MA 02481, USA<br />
              Phone: +1 978 362 0510<br />
              Email: usa-sales@micronanofabsoft.com
            </p>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
          <h2 className="text-2xl font-bold text-slate-900">Over 20 Years of Lithography Software Innovation</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Founded in Munich by semiconductor lithography research physicists, MicroNanoFabSoft pioneered automated E-Beam proximity effect correction (PEC) and 3D resist development simulation. Today, over 500 cleanroom core facilities and foundries globally rely on our tools.
          </p>
        </div>
      )}

      {activeTab === 'careers' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="genisys-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#23b14d] uppercase bg-green-50 px-2 py-0.5 rounded">MUNICH HQ</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Technical Applications Engineer Europe (m/f/d)</h3>
              <p className="text-xs text-slate-500">Support cleanroom clients with E-Beam PEC &amp; 3D LAB simulation setups.</p>
            </div>
            <button className="bg-[#0066b2] text-white font-bold text-xs px-4 py-2 rounded-lg">Apply Now</button>
          </div>

          <div className="genisys-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#00a3e0] uppercase bg-blue-50 px-2 py-0.5 rounded">BOSTON / REMOTE</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Lithography Software Developer - C++ / Python (m/f/d)</h3>
              <p className="text-xs text-slate-500">Develop high-speed GDSII / OASIS GPU acceleration algorithms.</p>
            </div>
            <button className="bg-[#0066b2] text-white font-bold text-xs px-4 py-2 rounded-lg">Apply Now</button>
          </div>
        </div>
      )}

    </div>
  );
};

export const CorporatePage = CorporatePageComponent;
export default CorporatePageComponent;
