/**
 * EnterpriseHome.js - Premium Enterprise Landing Page
 * 2026 UI/UX Audit Dashboard Entry Point
 * Glassmorphism design with IoT-style metrics
 * Zero emoji - Professional enterprise design
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnterpriseAuditDashboard from '../components/EnterpriseAuditDashboard';

const EnterpriseHome = () => {
  return (
    <div className="min-h-screen" style={{ background: '#1e2f3c' }}>
      <EnterpriseAuditDashboard />
    </div>
  );
};

export default EnterpriseHome;
