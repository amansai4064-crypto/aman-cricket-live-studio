import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CricketProvider } from './context/CricketContext';
import { BusinessProvider } from './context/BusinessContext';
import { CreatorProvider } from './context/CreatorContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { SupportModal } from './components/SupportModal';
import { LegalModal } from './components/LegalModal';
import { AIChatWidget } from './components/AIChatWidget';
import { Home } from './pages/Home';
import { LiveCenter } from './pages/LiveCenter';
import { OBSOverlay } from './pages/OBSOverlay';
import { BroadcastStudio } from './pages/BroadcastStudio';
import { OverlayViewer } from './pages/OverlayViewer';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { CreatorDirectory } from './pages/CreatorDirectory';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [legalPolicyType, setLegalPolicyType] = useState<string | null>(null);

  const pathname = window.location.pathname;
  const overlayMatch = pathname.match(/^\/overlay\/([^/]+)\/([^/]+)$/);
  const creatorProfileMatch = pathname.match(/^\/creator\/([^/]+)$/);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setLoginModalOpen(true);
    }
  }, []);

  if (overlayMatch) {
    const [, matchId, overlayType] = overlayMatch;
    return (
      <CricketProvider>
        <OverlayViewer matchId={matchId} overlayType={overlayType} />
      </CricketProvider>
    );
  }

  if (creatorProfileMatch) {
    const [, username] = creatorProfileMatch;
    return (
      <CreatorProvider>
        <CreatorDirectory viewUsername={username} />
      </CreatorProvider>
    );
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} onOpenSupport={() => setSupportModalOpen(true)} />;
      case 'live':
        return <LiveCenter />;
      case 'broadcast-studio':
        return <BroadcastStudio />;
      case 'obs':
        return <OBSOverlay />;
      case 'creator':
        return <CreatorDashboard />;
      case 'creators':
        return <CreatorDirectory />;
      case 'services':
        return <ServicesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'dashboard':
        return <UserDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home setCurrentTab={setCurrentTab} onOpenSupport={() => setSupportModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Outfit',sans-serif]">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenSupport={() => setSupportModalOpen(true)}
      />

      <main className="flex-1">
        {renderTabContent()}
      </main>

      <Footer
        onOpenLegal={(type) => setLegalPolicyType(type)}
        onOpenSupport={() => setSupportModalOpen(true)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

      <LegalModal
        policyType={legalPolicyType}
        onClose={() => setLegalPolicyType(null)}
      />

      <AIChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CricketProvider>
        <BusinessProvider>
          <CreatorProvider>
            <AppContent />
          </CreatorProvider>
        </BusinessProvider>
      </CricketProvider>
    </AuthProvider>
  );
}
