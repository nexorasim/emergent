import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SeasonalBanner from './components/SeasonalBanner';
import SeasonalSanta from './components/SeasonalSanta';
import ChristmasMusic from './components/ChristmasMusic';
import NexoraAIChat from './components/NexoraAIChat';
import initCopyProtection from './utils/copyProtection';
import './styles/design-system.css';
import './App.css';

// Core Pages
import HomePage from './pages/Home';
import PlansPage from './pages/Plans';
import FeaturesPage from './pages/Features';
import CoveragePage from './pages/Coverage';
import SupportPage from './pages/Support';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import DashboardPage from './pages/customer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import PartnerDashboard from './pages/partner/Dashboard';
import ESIMRegistration from './pages/ESIMRegistration';
import Partners from './pages/Partners';

// Enterprise Dashboard - Lazy loaded
const EnterpriseAuditDashboard = lazy(() => import('./components/EnterpriseAuditDashboard'));
const IoTDashboard = lazy(() => import('./components/IoTDashboard'));

// New Pages - Lazy loaded for performance
const About = lazy(() => import('./pages/About'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const SupportedDevices = lazy(() => import('./pages/SupportedDevices'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

// Legal Pages - Lazy loaded
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const AcceptableUsePolicy = lazy(() => import('./pages/legal/AcceptableUsePolicy'));

// Microsoft Entra ID Auth - Lazy loaded
const EntraAuth = lazy(() => import('./pages/auth/EntraAuth'));

// Sitemap Page
const HTMLSitemap = lazy(() => import('./pages/HTMLSitemap'));

// Help Desk Page
const HelpDesk = lazy(() => import('./pages/HelpDesk'));

// Downloads Page
const Downloads = lazy(() => import('./pages/Downloads'));

// 404 Page
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for Suspense
const PageLoader = () => (
  <div 
    className="min-h-screen flex items-center justify-center"
    style={{ background: '#1e2f3c' }}
  >
    <div 
      className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
      style={{ borderColor: '#00FFFF', borderTopColor: 'transparent' }}
      role="status"
      aria-label="Loading"
    />
  </div>
);

function App() {
  // Initialize copy protection on mount
  useEffect(() => {
    initCopyProtection();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <SeasonalBanner />
          <div className="App min-h-screen bg-gradient-to-br from-background via-background-light to-background-dark text-white">
            <Navigation />
            <main className="pt-20" id="main-content" role="main">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Core Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/plans" element={<PlansPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/coverage" element={<CoveragePage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/esim-register" element={<ESIMRegistration />} />
                  <Route path="/partners" element={<Partners />} />
                  
                  {/* Auth Pages */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/auth" element={<EntraAuth />} />
                  
                  {/* Dashboard Pages */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />
                  <Route path="/partner/*" element={<PartnerDashboard />} />
                  
                  {/* Informational Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/supported-devices" element={<SupportedDevices />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Legal Pages */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
                  
                  {/* Sitemap */}
                  <Route path="/sitemap" element={<HTMLSitemap />} />
                  
                  {/* Help Desk */}
                  <Route path="/helpdesk" element={<HelpDesk />} />
                  
                  {/* Downloads */}
                  <Route path="/downloads" element={<Downloads />} />
                  
                  {/* Enterprise Pages */}
                  <Route path="/audit-dashboard" element={<EnterpriseAuditDashboard />} />
                  <Route path="/iot-dashboard" element={<IoTDashboard />} />
                  
                  {/* 404 Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <SeasonalSanta />
          <ChristmasMusic />
          <NexoraAIChat />
        </Router>
        <Analytics />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
