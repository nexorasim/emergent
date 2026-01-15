import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SeasonalBanner from './components/SeasonalBanner';
import SeasonalAnniversary from './components/SeasonalAnniversary';
import AnniversaryMusic from './components/AnniversaryMusic';
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
import ForgotPassword from './pages/auth/ForgotPassword';
import DashboardPage from './pages/customer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import PartnerDashboard from './pages/partner/Dashboard';
import ESIMRegistration from './pages/ESIMRegistration';
import Partners from './pages/Partners';
import Anniversary from './pages/Anniversary';

// Enterprise Dashboard - Lazy loaded
const EnterpriseAuditDashboard = lazy(() => import('./components/EnterpriseAuditDashboard'));
const IoTDashboard = lazy(() => import('./components/IoTDashboard'));
const NexoraAuditDashboard = lazy(() => import('./pages/NexoraAuditDashboard'));

// New Pages - Lazy loaded for performance
const About = lazy(() => import('./pages/About'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const SupportedDevices = lazy(() => import('./pages/SupportedDevices'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

// Payment Pages - Lazy loaded
const PaymentPage = lazy(() => import('./pages/payment/PaymentPage'));
const PaymentSuccess = lazy(() => import('./pages/payment/PaymentSuccess'));
const PaymentCancel = lazy(() => import('./pages/payment/PaymentCancel'));

// Legal Pages - Lazy loaded
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const AcceptableUsePolicy = lazy(() => import('./pages/legal/AcceptableUsePolicy'));
const DataProtectionPolicy = lazy(() => import('./pages/legal/DataProtectionPolicy'));

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
    <HelmetProvider>
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
                  <Route path="/plans" element={<Navigate to="/anniversary" replace />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/coverage" element={<CoveragePage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/esim-register" element={<Navigate to="/anniversary" replace />} />
                  <Route path="/partners" element={<Partners />} />
                  
                  {/* Anniversary Campaign */}
                  <Route path="/anniversary" element={<Anniversary />} />
                  <Route path="/anniversary/*" element={<Anniversary />} />
                  
                  {/* Auth Pages */}
                  <Route path="/login" element={<Navigate to="/anniversary" replace />} />
                  <Route path="/register" element={<Navigate to="/anniversary" replace />} />
                  <Route path="/forgot-password" element={<Navigate to="/anniversary" replace />} />
                  <Route path="/auth" element={<EntraAuth />} />
                  
                  {/* Payment Pages */}
                  <Route path="/payment" element={<Navigate to="/anniversary" replace />} />
                  <Route path="/payment/success" element={<Navigate to="/anniversary" replace />} />
                  <Route path="/payment/cancel" element={<Navigate to="/anniversary" replace />} />
                  
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
                  <Route path="/data-protection-policy" element={<DataProtectionPolicy />} />
                  
                  {/* Sitemap */}
                  <Route path="/sitemap" element={<HTMLSitemap />} />
                  
                  {/* Help Desk */}
                  <Route path="/helpdesk" element={<HelpDesk />} />
                  
                  {/* Downloads */}
                  <Route path="/downloads" element={<Downloads />} />
                  
                  {/* Enterprise Pages */}
                  <Route path="/audit-dashboard" element={<EnterpriseAuditDashboard />} />
                  <Route path="/iot-dashboard" element={<IoTDashboard />} />
                  <Route path="/nexora-audit" element={<NexoraAuditDashboard />} />
                  
                  {/* 404 Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <SeasonalAnniversary />
          <AnniversaryMusic />
          <NexoraAIChat />
        </Router>
        <Analytics />
      </AuthProvider>
    </LanguageProvider>
  </HelmetProvider>
  );
}

export default App;
