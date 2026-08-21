import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Send, Cpu, Layers, FileText, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { submitServiceRequest, getUserServiceRequests } from '../services/api';
import { useToast } from '../context/ToastContext';

const SoftwarePortalPageComponent = ({ currentUser, onOpenAuth, onOpenCheckout }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [serviceType, setServiceType] = useState('beamer_data_prep');
  const [companyName, setCompanyName] = useState('');
  const [voltage, setVoltage] = useState('100 kV Acceleration Voltage');
  const [resists, setResists] = useState('PMMA 950k A4, 100nm Thickness');
  const [cadFile, setCadFile] = useState('GDSII Layout (gdsii_chip_v1.gds)');
  const [specifications, setSpecifications] = useState('');
  const [loading, setLoading] = useState(false);
  const [myRequests, setMyRequests] = useState([]);

  const { addToast } = useToast();

  useEffect(() => {
    if (currentUser?.email) {
      fetchMyRequests();
    }
  }, [currentUser]);

  const fetchMyRequests = async () => {
    try {
      const res = await getUserServiceRequests(currentUser.email);
      if (res.status === 'success') {
        setMyRequests(res.requests || []);
      }
    } catch (err) {
      console.warn("Failed to load user service requests:", err);
    }
  };

  // ── PROTECTED ROUTE ACCESS GATE ──
  if (!currentUser) {
    return (
      <div className="w-full font-sans py-16 max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <div className="bg-[#2d3136] text-white p-8 sm:p-12 rounded-3xl border border-slate-700 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto text-amber-400 border border-amber-400/30">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Protected Software License &amp; CAD Specification Portal
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Access to our core BEAMER 3D PEC layout engine, LAB 3D resist simulator, and CAD parameter brief portal requires an active account &amp; subscription.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenAuth}
              className="bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold px-6 py-3 rounded-full text-xs transition-colors shadow uppercase tracking-wider"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => onOpenCheckout('standard')}
              className="bg-[#23b14d] hover:bg-[#1e9942] text-white font-bold px-6 py-3 rounded-full text-xs transition-colors shadow uppercase tracking-wider"
            >
              Get License Plan ($499/mo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED USER PORTAL VIEW ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitServiceRequest({
        user_name: currentUser.username || currentUser.email,
        user_email: currentUser.email,
        company_name: companyName || 'Academic Fab Core',
        plan_tier: currentUser.plan_tier || 'standard',
        project_title: projectTitle,
        service_type: serviceType,
        industry: 'semiconductor',
        wavelength_range: voltage,
        analysis_tools: resists,
        system_specifications: specifications,
        cad_file_attached: cadFile
      });

      if (res.status === 'success') {
        if (res.messages && res.messages.length > 0) {
          res.messages.forEach(m => addToast(m.message, m.level));
        } else {
          addToast('Service request brief submitted!', 'success');
        }
        setProjectTitle('');
        setSpecifications('');
        fetchMyRequests();
      }
    } catch (err) {
      addToast('Failed to submit process brief.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Portal Welcome Banner */}
      <div className="bg-[#2d3136] text-white p-8 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/40 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticated License Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">MicroNanoFab Technical Service Portal</h1>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as: <strong>{currentUser.email}</strong> &bull; License Tier: <span className="uppercase text-[#00a3e0] font-bold">{currentUser.plan_tier || 'standard'}</span>
          </p>
        </div>

        <button 
          onClick={() => onOpenCheckout(currentUser.plan_tier || 'standard')}
          className="bg-[#23b14d] hover:bg-[#1e9942] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow flex items-center gap-1.5 uppercase"
        >
          <Sparkles className="w-4 h-4" />
          <span>Upgrade Tier</span>
        </button>
      </div>

      {/* Main Spec Brief Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 genisys-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Submit GDSII / OASIS PEC Process Brief</h2>
            <p className="text-xs text-slate-500 mt-1">
              Submit your lithography pattern parameters for 3D Proximity Effect Correction or LAB 3D simulation analysis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
              <input 
                type="text" 
                required 
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Sub-10nm Quantum Josephson Junction Array"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Software Engine</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white font-medium focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
                >
                  <option value="beamer_data_prep">BEAMER — E-Beam Data Prep &amp; PEC</option>
                  <option value="lab_3d_litho">LAB — 3D Lithography Simulator</option>
                  <option value="tracer_monte_carlo">TRACER — Monte Carlo Energy Deposition</option>
                  <option value="prosem_metrology">ProSEM — SEM Image CD Metrology</option>
                  <option value="beamer_3d_greyscale">BEAMER 3D — Greyscale Surface Profiling</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / Cleanroom Facility</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Harvard CNRE Cleanroom"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Acceleration Voltage</label>
                <select 
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white font-medium focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
                >
                  <option value="100 kV Acceleration Voltage">100 kV (JEOL / Elionix)</option>
                  <option value="50 kV Acceleration Voltage">50 kV (Vistec / Raith)</option>
                  <option value="30 kV Acceleration Voltage">30 kV (SEM Conversion)</option>
                  <option value="10 kV Low Voltage PEC">10 kV (Low Voltage PEC)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resist &amp; Substrate Specs</label>
                <input 
                  type="text" 
                  value={resists}
                  onChange={(e) => setResists(e.target.value)}
                  placeholder="PMMA 950k A4, 100nm on 300mm Si"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">CAD Layout Parameter File</label>
              <input 
                type="text" 
                value={cadFile}
                onChange={(e) => setCadFile(e.target.value)}
                placeholder="GDSII / OASIS File (chip_layout_v2.gds)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Technical Brief &amp; Tolerances</label>
              <textarea 
                rows="4"
                value={specifications}
                onChange={(e) => setSpecifications(e.target.value)}
                placeholder="Specify target critical dimensions (CD), maximum allowed stitch error (<5nm), dose assignment grid, or 3D etch bias parameters..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0066b2] focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold py-3 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Brief...' : 'Transmit Process Brief to Engineers'}</span>
            </button>
          </form>
        </div>

        {/* User's Previous Service Requests History */}
        <div className="genisys-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">My Submitted Briefs</h3>
          
          {myRequests.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No process briefs submitted yet.</p>
          ) : (
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {myRequests.map((req) => (
                <div key={req.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="truncate max-w-[150px]">{req.project_title}</span>
                    <span className="text-[10px] bg-blue-100 text-[#0066b2] px-2 py-0.5 rounded-full font-bold">{req.status}</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">{req.service_type} &bull; {req.wavelength_range}</p>
                  <p className="text-[10px] text-slate-400">{new Date(req.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export const SoftwarePortalPage = SoftwarePortalPageComponent;
export default SoftwarePortalPageComponent;
