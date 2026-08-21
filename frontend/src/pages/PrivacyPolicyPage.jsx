import React from 'react';

const PrivacyPolicyPageComponent = () => {
  return (
    <div className="w-full font-sans py-10 max-w-5xl mx-auto px-4 sm:px-8 space-y-6">
      <h1 className="text-3xl font-black text-slate-900 border-b border-slate-200 pb-4">Privacy Policy</h1>
      
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          MicroNanoFabSoft GmbH ("we", "our", or "us") respects your privacy and is committed to protecting your personal data in accordance with the EU General Data Protection Regulation (GDPR) and international data privacy laws.
        </p>

        <h3 className="text-base font-bold text-slate-900 mt-4">1. Data Collection &amp; Software Licensing</h3>
        <p>
          When requesting trial licenses, creating accounts, or submitting CAD process specifications through our portal, we collect essential identifying details (name, email address, academic/industrial affiliation).
        </p>

        <h3 className="text-base font-bold text-slate-900 mt-4">2. CAD Layout Confidentiality</h3>
        <p>
          All GDSII, OASIS, and Monte Carlo PSF parameter files submitted to MicroNanoFabSoft are strictly confidential. Files are processed on encrypted servers and are never shared with third parties.
        </p>

        <h3 className="text-base font-bold text-slate-900 mt-4">3. Contact &amp; Data Rights</h3>
        <p>
          You retain full rights to inspect, amend, or delete your personal records from our databases by contacting our data protection officer at privacy@micronanofabsoft.com.
        </p>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage = PrivacyPolicyPageComponent;
export default PrivacyPolicyPageComponent;
