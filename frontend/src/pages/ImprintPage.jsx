import React from 'react';

const ImprintPageComponent = () => {
  return (
    <div className="w-full font-sans py-10 max-w-5xl mx-auto px-4 sm:px-8 space-y-6">
      <h1 className="text-3xl font-black text-slate-900 border-b border-slate-200 pb-4">Imprint / Legal Notice</h1>
      
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h3 className="text-base font-bold text-slate-900">MicroNanoFabSoft GmbH</h3>
        <p>
          Eschenschlag 2<br />
          D-81375 Munich, Germany
        </p>

        <p>
          <strong>Managing Directors:</strong> Dr. Alexander Vance, Dr. Markus Weber<br />
          <strong>Commercial Register:</strong> District Court Munich, HRB 248912<br />
          <strong>VAT Identification Number:</strong> DE 319 824 501
        </p>

        <h3 className="text-base font-bold text-slate-900 mt-4">Contact</h3>
        <p>
          Phone: +49 89 356477-0<br />
          Fax: +49 89 356477-29<br />
          Email: info@micronanofabsoft.com<br />
          Website: www.micronanofabsoft.com
        </p>
      </div>
    </div>
  );
};

export const ImprintPage = ImprintPageComponent;
export default ImprintPageComponent;
