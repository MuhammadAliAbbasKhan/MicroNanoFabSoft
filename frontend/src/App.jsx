import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/common/AuthModal';
import { CheckoutModal } from './components/common/CheckoutModal';
import { TrialModal } from './components/common/TrialModal';
import { SearchModal } from './components/common/SearchModal';

import { HomePage } from './pages/HomePage';
import { BeamerPage } from './pages/BeamerPage';
import { LabPage } from './pages/LabPage';
import { TracerPage } from './pages/TracerPage';
import { ProSemPage } from './pages/ProSemPage';
import { Beamer3DPage } from './pages/Beamer3DPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { InActionPage } from './pages/InActionPage';
import { DownloadPage } from './pages/DownloadPage';
import { CorporatePage } from './pages/CorporatePage';
import { ContactPage } from './pages/ContactPage';
import { SupportPage } from './pages/SupportPage';
import { SoftwarePortalPage } from './pages/SoftwarePortalPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ImprintPage } from './pages/ImprintPage';

import { healthCheck } from './services/api';

export const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('standard');

  useEffect(() => {
    // Backend Connectivity Check
    healthCheck().catch(err => console.warn("Backend connectivity check warning:", err));
  }, []);

  const handleOpenCheckout = (planTier = 'standard') => {
    setSelectedPlan(planTier);
    setIsCheckoutOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('adminPasscode');
    setCurrentPage('home');
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} onOpenTrial={() => setIsTrialOpen(true)} onOpenCheckout={handleOpenCheckout} />;
      case 'beamer':
        return <BeamerPage setCurrentPage={setCurrentPage} onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'lab':
        return <LabPage setCurrentPage={setCurrentPage} onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'tracer':
        return <TracerPage setCurrentPage={setCurrentPage} onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'prosem':
        return <ProSemPage setCurrentPage={setCurrentPage} onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'beamer-3d':
        return <Beamer3DPage setCurrentPage={setCurrentPage} onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'applications':
        return <ApplicationsPage setCurrentPage={setCurrentPage} />;
      case 'in-action':
        return <InActionPage onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'download':
        return <DownloadPage onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'corporate':
        return <CorporatePage />;
      case 'contact':
        return <ContactPage />;
      case 'support':
        return <SupportPage />;
      case 'software-portal':
        return <SoftwarePortalPage currentUser={currentUser} onOpenAuth={() => setIsAuthOpen(true)} onOpenCheckout={handleOpenCheckout} />;
      case 'admin':
        return <AdminDashboardPage currentUser={currentUser} />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'imprint':
        return <ImprintPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} onOpenTrial={() => setIsTrialOpen(true)} onOpenCheckout={handleOpenCheckout} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f4f5f7] text-[#2d3136] selection:bg-[#0066b2] selection:text-white">
      
      {/* Unified Single Header Component */}
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 w-full">
        {renderPageContent()}
      </main>

      {/* Unified Single Footer Component */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Interactive Global Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        setCurrentUser={setCurrentUser}
        setCurrentPage={setCurrentPage}
        onOpenCheckout={handleOpenCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <TrialModal 
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
      />

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
};

export default App;
