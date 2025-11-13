import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import all page components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Public Pages (30)
import Home from './pages/public/Home';
import About from './pages/public/About';
import Coverage from './pages/public/Coverage';
import SpeedTest from './pages/public/SpeedTest';
import TV from './pages/public/TV';
import Movies from './pages/public/Movies';
import Games from './pages/public/Games';
import Music from './pages/public/Music';
import Plans from './pages/public/Plans';
import Devices from './pages/public/Devices';
import ESIMStore from './pages/public/ESIMStore';
import Support from './pages/public/Support';
import FAQ from './pages/public/FAQ';
import Contact from './pages/public/Contact';
import Guide from './pages/public/Guide';
import Tutorial from './pages/public/Tutorial';
import Features from './pages/public/Features';
import Technology from './pages/public/Technology';
import Roaming from './pages/public/Roaming';
import Enterprise from './pages/public/Enterprise';
import Partners from './pages/public/Partners';
import Careers from './pages/public/Careers';
import Press from './pages/public/Press';
import Blog from './pages/public/Blog';
import News from './pages/public/News';
import Events from './pages/public/Events';
import Community from './pages/public/Community';
import Download from './pages/public/Download';
import Pricing from './pages/public/Pricing';
import Comparison from './pages/public/Comparison';

// Customer Portal (30)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/customer/Dashboard';
import Profile from './pages/customer/Profile';
import MyDevices from './pages/customer/MyDevices';
import ESIMActivation from './pages/customer/ESIMActivation';
import QRGenerator from './pages/customer/QRGenerator';
import Usage from './pages/customer/Usage';
import TopUp from './pages/customer/TopUp';
import History from './pages/customer/History';
import Transfer from './pages/customer/Transfer';
import DeviceSwap from './pages/customer/DeviceSwap';
import MyPlans from './pages/customer/MyPlans';
import AddOns from './pages/customer/AddOns';
import RoamingSettings from './pages/customer/RoamingSettings';
import Notifications from './pages/customer/Notifications';
import Security from './pages/customer/Security';
import Billing from './pages/customer/Billing';
import Invoices from './pages/customer/Invoices';
import PaymentMethods from './pages/customer/PaymentMethods';
import Rewards from './pages/customer/Rewards';
import Referrals from './pages/customer/Referrals';
import Settings from './pages/customer/Settings';
import HelpCenter from './pages/customer/HelpCenter';
import Tickets from './pages/customer/Tickets';
import AccountActivity from './pages/customer/AccountActivity';
import DataUsage from './pages/customer/DataUsage';
import NetworkStatus from './pages/customer/NetworkStatus';
import SimSwap from './pages/customer/SimSwap';
import FamilyPlan from './pages/customer/FamilyPlan';

// Partner Portal (20)
import PartnerLogin from './pages/partner/PartnerLogin';
import PartnerDashboard from './pages/partner/PartnerDashboard';
import PartnerRegister from './pages/partner/PartnerRegister';
import AffiliateProgram from './pages/partner/AffiliateProgram';
import Commissions from './pages/partner/Commissions';
import ResellerManagement from './pages/partner/ResellerManagement';
import Inventory from './pages/partner/Inventory';
import EnterpriseSolutions from './pages/partner/EnterpriseSolutions';
import APIDocumentation from './pages/partner/APIDocumentation';
import PartnerReports from './pages/partner/PartnerReports';
import PartnerAnalytics from './pages/partner/PartnerAnalytics';
import SalesTools from './pages/partner/SalesTools';
import MarketingMaterials from './pages/partner/MarketingMaterials';
import Training from './pages/partner/Training';
import Certification from './pages/partner/Certification';
import PartnerSupport from './pages/partner/PartnerSupport';
import LeadManagement from './pages/partner/LeadManagement';
import QuoteGeneration from './pages/partner/QuoteGeneration';
import PartnerSettings from './pages/partner/PartnerSettings';
import PerformanceMetrics from './pages/partner/PerformanceMetrics';

// Admin Portal (15)
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ESIMInventory from './pages/admin/ESIMInventory';
import PaymentManagement from './pages/admin/PaymentManagement';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import SystemConfig from './pages/admin/SystemConfig';
import SecuritySettings from './pages/admin/SecuritySettings';
import AuditLogs from './pages/admin/AuditLogs';
import NetworkManagement from './pages/admin/NetworkManagement';
import PlanManagement from './pages/admin/PlanManagement';
import PartnerManagement from './pages/admin/PartnerManagement';
import ReportGeneration from './pages/admin/ReportGeneration';
import SystemMonitoring from './pages/admin/SystemMonitoring';
import BackupRestore from './pages/admin/BackupRestore';

// Compliance (5)
import PrivacyPolicy from './pages/compliance/PrivacyPolicy';
import TermsOfService from './pages/compliance/TermsOfService';
import GDPRPortal from './pages/compliance/GDPRPortal';
import DataRequest from './pages/compliance/DataRequest';
import ComplianceLogs from './pages/compliance/ComplianceLogs';

// Context and Auth
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/coverage" element={<Coverage />} />
              <Route path="/speed-test" element={<SpeedTest />} />
              <Route path="/tv" element={<TV />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/games" element={<Games />} />
              <Route path="/music" element={<Music />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/esim-store" element={<ESIMStore />} />
              <Route path="/support" element={<Support />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/features" element={<Features />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/roaming" element={<Roaming />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<Events />} />
              <Route path="/community" element={<Community />} />
              <Route path="/download" element={<Download />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/comparison" element={<Comparison />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Customer Portal Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/my-devices" element={<ProtectedRoute><MyDevices /></ProtectedRoute>} />
              <Route path="/activate" element={<ProtectedRoute><ESIMActivation /></ProtectedRoute>} />
              <Route path="/qr-generator" element={<ProtectedRoute><QRGenerator /></ProtectedRoute>} />
              <Route path="/usage" element={<ProtectedRoute><Usage /></ProtectedRoute>} />
              <Route path="/top-up" element={<ProtectedRoute><TopUp /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/transfer" element={<ProtectedRoute><Transfer /></ProtectedRoute>} />
              <Route path="/device-swap" element={<ProtectedRoute><DeviceSwap /></ProtectedRoute>} />
              <Route path="/my-plans" element={<ProtectedRoute><MyPlans /></ProtectedRoute>} />
              <Route path="/addons" element={<ProtectedRoute><AddOns /></ProtectedRoute>} />
              <Route path="/roaming-settings" element={<ProtectedRoute><RoamingSettings /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
              <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
              <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
              <Route path="/referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/help-center" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
              <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
              <Route path="/account-activity" element={<ProtectedRoute><AccountActivity /></ProtectedRoute>} />
              <Route path="/data-usage" element={<ProtectedRoute><DataUsage /></ProtectedRoute>} />
              <Route path="/network-status" element={<ProtectedRoute><NetworkStatus /></ProtectedRoute>} />
              <Route path="/sim-swap" element={<ProtectedRoute><SimSwap /></ProtectedRoute>} />
              <Route path="/family-plan" element={<ProtectedRoute><FamilyPlan /></ProtectedRoute>} />
              
              {/* Partner Portal Routes */}
              <Route path="/partner/login" element={<PartnerLogin />} />
              <Route path="/partner/register" element={<PartnerRegister />} />
              <Route path="/partner/dashboard" element={<ProtectedRoute><PartnerDashboard /></ProtectedRoute>} />
              <Route path="/partner/affiliate" element={<ProtectedRoute><AffiliateProgram /></ProtectedRoute>} />
              <Route path="/partner/commissions" element={<ProtectedRoute><Commissions /></ProtectedRoute>} />
              <Route path="/partner/reseller" element={<ProtectedRoute><ResellerManagement /></ProtectedRoute>} />
              <Route path="/partner/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
              <Route path="/partner/enterprise" element={<ProtectedRoute><EnterpriseSolutions /></ProtectedRoute>} />
              <Route path="/partner/api" element={<ProtectedRoute><APIDocumentation /></ProtectedRoute>} />
              <Route path="/partner/reports" element={<ProtectedRoute><PartnerReports /></ProtectedRoute>} />
              <Route path="/partner/analytics" element={<ProtectedRoute><PartnerAnalytics /></ProtectedRoute>} />
              <Route path="/partner/sales-tools" element={<ProtectedRoute><SalesTools /></ProtectedRoute>} />
              <Route path="/partner/marketing" element={<ProtectedRoute><MarketingMaterials /></ProtectedRoute>} />
              <Route path="/partner/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
              <Route path="/partner/certification" element={<ProtectedRoute><Certification /></ProtectedRoute>} />
              <Route path="/partner/support" element={<ProtectedRoute><PartnerSupport /></ProtectedRoute>} />
              <Route path="/partner/leads" element={<ProtectedRoute><LeadManagement /></ProtectedRoute>} />
              <Route path="/partner/quotes" element={<ProtectedRoute><QuoteGeneration /></ProtectedRoute>} />
              <Route path="/partner/settings" element={<ProtectedRoute><PartnerSettings /></ProtectedRoute>} />
              <Route path="/partner/metrics" element={<ProtectedRoute><PerformanceMetrics /></ProtectedRoute>} />
              
              {/* Admin Portal Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
              <Route path="/admin/esim-inventory" element={<ProtectedRoute requiredRole="admin"><ESIMInventory /></ProtectedRoute>} />
              <Route path="/admin/payments" element={<ProtectedRoute requiredRole="admin"><PaymentManagement /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminAnalytics /></ProtectedRoute>} />
              <Route path="/admin/system-config" element={<ProtectedRoute requiredRole="admin"><SystemConfig /></ProtectedRoute>} />
              <Route path="/admin/security" element={<ProtectedRoute requiredRole="admin"><SecuritySettings /></ProtectedRoute>} />
              <Route path="/admin/audit-logs" element={<ProtectedRoute requiredRole="admin"><AuditLogs /></ProtectedRoute>} />
              <Route path="/admin/network" element={<ProtectedRoute requiredRole="admin"><NetworkManagement /></ProtectedRoute>} />
              <Route path="/admin/plans" element={<ProtectedRoute requiredRole="admin"><PlanManagement /></ProtectedRoute>} />
              <Route path="/admin/partners" element={<ProtectedRoute requiredRole="admin"><PartnerManagement /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><ReportGeneration /></ProtectedRoute>} />
              <Route path="/admin/monitoring" element={<ProtectedRoute requiredRole="admin"><SystemMonitoring /></ProtectedRoute>} />
              <Route path="/admin/backup" element={<ProtectedRoute requiredRole="admin"><BackupRestore /></ProtectedRoute>} />
              
              {/* Compliance Routes */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/gdpr" element={<GDPRPortal />} />
              <Route path="/data-request" element={<DataRequest />} />
              <Route path="/compliance-logs" element={<ProtectedRoute requiredRole="admin"><ComplianceLogs /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;