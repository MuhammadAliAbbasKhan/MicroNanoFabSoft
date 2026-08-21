import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ContactPageComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addToast('Thank you for contacting MicroNanoFabSoft! Our technical team will reach out shortly.', 'success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0066b2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Global Technical Support &amp; Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Contact MicroNanoFabSoft</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Reach out to our semiconductor application engineers in Munich, Boston, or Tokyo for technical support, evaluation licenses, or cleanroom process consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Send an Inquiry</h2>
            <p className="text-xs text-slate-500 mt-1">Direct channel to technical support and sales engineers.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Alexander Vance" 
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0066b2]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="avance@cleanroom.org" 
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0066b2]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / Company</label>
                <input 
                  type="text" 
                  required 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Munich Quantum Institute" 
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0066b2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project &amp; Cleanroom Specification</label>
              <textarea 
                rows="4" 
                required 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Details regarding your EBL machine (JEOL, Raith, Elionix), resist thickness, or 3D PEC requirements..." 
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0066b2]"
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0066b2] hover:bg-[#0055a0] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider shadow">
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending Request...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Global Office Locations */}
        <div className="space-y-6">
          <div className="genisys-card p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <MapPin className="w-6 h-6 text-[#0066b2]" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Munich Headquarters (Europe)</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase">MicroNanoFabSoft GmbH</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eschenschlag 2, D-81375 Munich, Germany<br />
              <strong>Phone:</strong> +49 89 356477-0 &bull; <strong>Fax:</strong> +49 89 356477-29<br />
              <strong>Email:</strong> info@micronanofabsoft.com
            </p>
          </div>

          <div className="genisys-card p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <Globe className="w-6 h-6 text-[#f37021]" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">North America Technical Center</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase">MicroNanoFabSoft Inc. USA</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wellesley Hills, MA 02481, USA<br />
              <strong>Phone:</strong> +1 978 362 0510<br />
              <strong>Email:</strong> usa-sales@micronanofabsoft.com
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export const ContactPage = ContactPageComponent;
export default ContactPageComponent;
