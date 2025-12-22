import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SeasonalBanner from './components/SeasonalBanner';
import SeasonalSanta from './components/SeasonalSanta';

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

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <SeasonalBanner />
          <div className="App min-h-screen bg-gradient-to-br from-background via-background-light to-background-dark text-white">
            <Navigation />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/coverage" element={<CoveragePage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/partner/*" element={<PartnerDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <SeasonalSanta />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;