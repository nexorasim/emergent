/**
 * Footer.js - Premium Enterprise Footer
 * 2026 UI/UX Design with glassmorphism
 * Zero emoji - Professional enterprise design
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { isSeasonalActive, isNewYearPeriod } from '../utils/seasonalConfig';

const Footer = () => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME || 'eSIM Myanmar Entertainment Server';
  const DOMAIN = process.env.REACT_APP_DOMAIN || 'esim.com.mm';
  const EMAIL = process.env.REACT_APP_CONTACT_EMAIL || 'info@esim.com.mm';
  const PHONE = process.env.REACT_APP_CONTACT_PHONE || '09650000172';
  const SOCIAL = process.env.REACT_APP_SOCIAL_HANDLE || '@eSIMMyanmar';

  const showSeasonal = isSeasonalActive();
  const isNewYear = isNewYearPeriod();

  const footerLinks = {
    products: [
      { label: 'Plans and Pricing', path: '/plans' },
      { label: 'eSIM Store', path: '/esim-register' },
      { label: 'Supported Devices', path: '/supported-devices' },
      { label: 'Coverage Map', path: '/coverage' },
      { label: 'Enterprise Solutions', path: '/partners' }
    ],
    resources: [
      { label: 'How It Works', path: '/how-it-works' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Support Center', path: '/support' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Refund Policy', path: '/refund-policy' },
      { label: 'Cookie Policy', path: '/cookie-policy' },
      { label: 'Acceptable Use', path: '/acceptable-use-policy' },
      { label: 'Data Protection', path: '/data-protection-policy' }
    ],
    enterprise: [
      { label: 'Audit Dashboard', path: '/audit-dashboard' },
      { label: 'IoT Dashboard', path: '/iot-dashboard' },
      { label: 'Partner Portal', path: '/partner' },
      { label: 'Admin Console', path: '/admin' }
    ]
  };

  return (
    <footer 
      className="relative mt-12 sm:mt-16 lg:mt-20" 
      role="contentinfo"
      style={{
        background: 'linear-gradient(180deg, rgba(30, 47, 60, 0.95) 0%, rgba(20, 31, 40, 0.98) 100%)',
        borderTop: '1px solid rgba(0, 255, 255, 0.1)'
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent)'
        }}
      />

      <div className="container mx-auto px-4 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                  boxShadow: '0 4px 16px rgba(0, 255, 255, 0.3)'
                }}
              >
                <span className="text-xl font-bold" style={{ color: '#1e2f3c' }}>e</span>
              </div>
              <span 
                className="text-lg font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                eSIM Myanmar
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed max-w-xs">
              Enterprise eSIM Management Platform serving 50M+ users across ASEAN with carrier-grade reliability.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {[
                { icon: 'W', value: DOMAIN },
                { icon: 'E', value: EMAIL },
                { icon: 'P', value: PHONE },
                { icon: 'S', value: SOCIAL }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span 
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00FFFF' }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm text-gray-400">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Seasonal Message */}
            {showSeasonal && (
              <div 
                className="mt-6 p-4 rounded-xl"
                style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.15)'
                }}
              >
                <p className="text-sm font-semibold" style={{ color: '#00FFFF' }}>
                  {isNewYear ? 'Celebrating 4th Anniversary' : 'Season Greetings'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isNewYear ? 'Wishing you seamless connectivity' : 'From the eSIM Myanmar team'}
                </p>
              </div>
            )}
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Enterprise</h4>
            <ul className="space-y-3">
              {footerLinks.enterprise.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center lg:text-left">
              2025-2026 {SITE_NAME}. All rights reserved.
            </p>

            {/* Certifications / Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              {['GSMA', 'SM-DP+', '5G Ready', 'ISO 27001'].map((badge, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#9CA3AF'
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms</Link>
              <Link to="/cookie-policy" className="hover:text-cyan-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
