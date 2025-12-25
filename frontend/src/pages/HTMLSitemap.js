/**
 * HTMLSitemap.js - Human-readable sitemap
 * ESIM MYANMAR COMPANY LIMITED
 * SEO and accessibility compliant
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HTMLSitemap = () => {
  const sitemapData = [
    {
      category: 'Main Pages',
      links: [
        { path: '/', label: 'Home', description: 'Enterprise eSIM platform homepage' },
        { path: '/about', label: 'About Us', description: 'Company information and mission' },
        { path: '/features', label: 'Features', description: 'Platform capabilities and technology' },
        { path: '/how-it-works', label: 'How It Works', description: 'eSIM activation guide' }
      ]
    },
    {
      category: 'Products and Services',
      links: [
        { path: '/plans', label: 'Plans and Pricing', description: 'eSIM subscription plans' },
        { path: '/esim-register', label: 'Get eSIM', description: 'Purchase and activate eSIM' },
        { path: '/coverage', label: 'Coverage Map', description: 'Network coverage information' },
        { path: '/supported-devices', label: 'Supported Devices', description: 'Compatible devices list' }
      ]
    },
    {
      category: 'Support and Resources',
      links: [
        { path: '/support', label: 'Support Center', description: 'Help and customer service' },
        { path: '/helpdesk', label: 'Help Desk', description: 'Submit and track support tickets' },
        { path: '/faq', label: 'FAQ', description: 'Frequently asked questions' },
        { path: '/contact', label: 'Contact Us', description: 'Get in touch with our team' },
        { path: '/partners', label: 'Partners', description: 'Partnership opportunities' }
      ]
    },
    {
      category: 'Account',
      links: [
        { path: '/login', label: 'Login', description: 'Access your account' },
        { path: '/register', label: 'Register', description: 'Create a new account' },
        { path: '/dashboard', label: 'Dashboard', description: 'Customer dashboard' }
      ]
    },
    {
      category: 'Legal',
      links: [
        { path: '/privacy-policy', label: 'Privacy Policy', description: 'How we handle your data' },
        { path: '/terms', label: 'Terms of Service', description: 'Service agreement' },
        { path: '/refund-policy', label: 'Refund Policy', description: 'Refund and cancellation terms' },
        { path: '/cookie-policy', label: 'Cookie Policy', description: 'Cookie usage information' },
        { path: '/acceptable-use-policy', label: 'Acceptable Use Policy', description: 'Usage guidelines' },
        { path: '/data-protection-policy', label: 'Data Protection Policy', description: 'Data security practices' }
      ]
    },
    {
      category: 'Enterprise',
      links: [
        { path: '/audit-dashboard', label: 'Audit Dashboard', description: 'Enterprise analytics' },
        { path: '/iot-dashboard', label: 'IoT Dashboard', description: 'IoT metrics and monitoring' },
        { path: '/downloads', label: 'Downloads', description: 'Downloadable resources and assets' }
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen py-16 sm:py-20 lg:py-24"
      style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)' }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Sitemap
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Complete directory of all pages on esim.com.mm
            </p>
          </div>

          {/* Sitemap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitemapData.map((section, index) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
                  border: '1px solid rgba(0, 255, 255, 0.15)'
                }}
              >
                <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-white/10">
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path}
                        className="block group"
                      >
                        <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors font-medium">
                          {link.label}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {link.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* XML Sitemap Link */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">
              For search engines, view our XML sitemap:
            </p>
            <a 
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
              style={{
                background: 'rgba(0, 255, 255, 0.1)',
                color: '#00FFFF',
                border: '1px solid rgba(0, 255, 255, 0.25)'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              sitemap.xml
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HTMLSitemap;
