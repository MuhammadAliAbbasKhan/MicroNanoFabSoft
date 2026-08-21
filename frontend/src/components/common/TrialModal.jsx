import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { requestTrial } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const TrialModal = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [softwareChoice, setSoftwareChoice] = useState('BEAMER - E-Beam Data Prep & PEC');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await requestTrial({
        full_name: fullName,
        email,
        company,
        software_choice: softwareChoice,
        comments
      });

      if (res.status === 'success') {
        if (res.messages && res.messages.length > 0) {
          res.messages.forEach(m => addToast(m.message, m.level));
        } else {
          addToast('Evaluation trial request submitted successfully!', 'success');
        }
        onClose();
      }
    } catch (err) {
      addToast('Failed to submit evaluation request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-fadeIn">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#0066b2]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#0066b2]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Request 30-Day Evaluation License</h3>
          <p className="text-xs text-slate-500 mt-1">
            Test full BEAMER, LAB 3D, TRACER, and ProSEM software suites in your cleanroom environment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Prof. Alexander Vance"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Work / Institutional Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vance@mit.edu"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Cleanroom Facility</label>
            <input 
              type="text" 
              required 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="MIT Nanofabrication Core Facility"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Software Suite</label>
            <select 
              value={softwareChoice}
              onChange={(e) => setSoftwareChoice(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none bg-white font-medium"
            >
              <option value="BEAMER - E-Beam Data Prep & PEC">BEAMER - E-Beam Data Prep &amp; PEC</option>
              <option value="LAB - 3D Lithography Simulator">LAB - 3D Lithography Simulator</option>
              <option value="TRACER - Monte Carlo PSF Engine">TRACER - Monte Carlo PSF Engine</option>
              <option value="ProSEM - SEM Image CD Metrology">ProSEM - SEM Image CD Metrology</option>
              <option value="BEAMER 3D - Greyscale Surface Profile">BEAMER 3D - Greyscale Surface Profile</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Application Brief &amp; CAD Specs</label>
            <textarea 
              rows="3"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Describe your E-Beam voltage (10-100kV), resist tone (PMMA/HSQ), or target line width..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting...' : 'Request Evaluation Key'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
