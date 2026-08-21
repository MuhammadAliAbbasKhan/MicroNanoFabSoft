import React, { useState } from 'react';
import { HelpCircle, FileText, Send, CheckCircle2, BookOpen, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const SupportPageComponent = () => {
  const [activeTab, setActiveTab] = useState('manuals');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDetails, setTicketDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addToast('Support ticket #MNF-9482 created successfully! Our application engineers will contact you shortly.', 'success');
      setTicketSubject('');
      setTicketDetails('');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0066b2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Global Customer Support &amp; Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Technical Support &amp; Ticket Portal</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Access PDF user handbooks, Python script examples, submit 24/7 technical tickets, and register for lithography workshops.
        </p>
      </div>

      {/* Sub-page Navigation Tabs */}
      <div className="flex flex-wrap justify-center bg-slate-200 p-1.5 rounded-2xl gap-2 max-w-xl mx-auto">
        <button 
          onClick={() => setActiveTab('manuals')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'manuals' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <BookOpen className="w-4 h-4 text-[#00a3e0]" />
          <span>User Manuals</span>
        </button>

        <button 
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'tickets' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <MessageSquare className="w-4 h-4 text-[#f37021]" />
          <span>Submit Ticket</span>
        </button>

        <button 
          onClick={() => setActiveTab('workshops')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'workshops' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          <CheckCircle2 className="w-4 h-4 text-[#23b14d]" />
          <span>Workshops</span>
        </button>
      </div>

      {/* Sub-page Content */}
      {activeTab === 'manuals' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          <div className="genisys-card p-6 space-y-3">
            <FileText className="w-6 h-6 text-[#0066b2]" />
            <h3 className="text-base font-bold text-slate-900">BEAMER User Handbook</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete guide covering 3D PEC math, GDSII/OASIS import, and JEOL/Elionix/Raith machine format exports.
            </p>
          </div>

          <div className="genisys-card p-6 space-y-3">
            <FileText className="w-6 h-6 text-[#f37021]" />
            <h3 className="text-base font-bold text-slate-900">LAB 3D Simulation Manual</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Covers optical aerial image calculation, Post Exposure Bake (PEB) thermal kinetics, and resist dissolution models.
            </p>
          </div>

          <div className="genisys-card p-6 space-y-3">
            <FileText className="w-6 h-6 text-[#ffc20e]" />
            <h3 className="text-base font-bold text-slate-900">ProSEM Image Metrology Guide</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instructions for automated SEM edge detection, scale calibration, and Line Edge Roughness (LER) extraction.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-2xl mx-auto animate-fadeIn">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Submit 24/7 Technical Ticket</h2>
            <p className="text-xs text-slate-500 mt-1">Our cleanroom applications engineers respond within 24 hours.</p>
          </div>

          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ticket Subject</label>
              <input 
                type="text" 
                required 
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="BEAMER 3D PEC Stitching Error on JEOL 9500"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Technical Issue &amp; Machine Log</label>
              <textarea 
                rows="4" 
                required 
                value={ticketDetails}
                onChange={(e) => setTicketDetails(e.target.value)}
                placeholder="Describe your machine model, resist material, energy voltage, or attach log outputs..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider shadow">
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Ticket...' : 'Submit Support Ticket'}</span>
            </button>
          </form>
        </div>
      )}

      {activeTab === 'workshops' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
          <span className="text-xs font-bold text-[#23b14d] uppercase">MONTHLY ONLINE WORKSHOPS</span>
          <h2 className="text-2xl font-bold text-slate-900">Hands-On PEC &amp; Lithography Optimization Training</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Join cleanroom engineers from MIT, Harvard, ETH Zurich, and TSMC in live interactive training workshops. Learn how to calibrate TRACER PSF curves and optimize 3D resist profiles in LAB 3D.
          </p>
        </div>
      )}

    </div>
  );
};

export const SupportPage = SupportPageComponent;
export default SupportPageComponent;
