/**
 * Refund Policy Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  const lastUpdated = 'December 22, 2025';

  return (
    <div className="min-h-screen py-20" style={{ background: '#1e2f3c' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          role="main"
          aria-labelledby="refund-title"
        >
          <header className="mb-12 text-center">
            <h1 
              id="refund-title"
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: '#F8F9FA' }}
            >
              Refund Policy
            </h1>
            <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '18px' }}>
              ESIM MYANMAR COMPANY LIMITED
            </p>
            <p style={{ color: 'rgba(248, 249, 250, 0.6)', fontSize: '14px', marginTop: '8px' }}>
              Last Updated: {lastUpdated}
            </p>
          </header>

          <div 
            style={{ 
              color: 'rgba(248, 249, 250, 0.9)',
              fontSize: '18px',
              lineHeight: '1.75'
            }}
          >
            <section className="mb-10" aria-labelledby="section-overview">
              <h2 
                id="section-overview"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                1. Overview
              </h2>
              <p>
                This Refund Policy outlines the conditions under which ESIM MYANMAR COMPANY LIMITED 
                may provide refunds for eSIM services. Due to the digital nature of eSIM profiles, 
                refunds are limited to specific circumstances as described below.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-eligible">
              <h2 
                id="section-eligible"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                2. Eligible Refund Scenarios
              </h2>
              <p className="mb-4">Refunds may be granted in the following cases:</p>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.1 Technical Failure (100% Refund)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>eSIM profile fails to download due to system error</li>
                <li>QR code is invalid or corrupted</li>
                <li>Profile cannot be activated due to our technical issues</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.2 Duplicate Purchase (100% Refund)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Accidental duplicate payment for the same profile</li>
                <li>System error causing multiple charges</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.3 Service Not Available (100% Refund)
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Network coverage not available in your area (verified)</li>
                <li>Device incompatibility confirmed after purchase</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-ineligible">
              <h2 
                id="section-ineligible"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                3. Non-Refundable Scenarios
              </h2>
              <p className="mb-4">Refunds will NOT be provided for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Successfully activated eSIM profiles</li>
                <li>Change of mind after activation</li>
                <li>User error during installation</li>
                <li>Device issues not related to our service</li>
                <li>Partial data usage claims</li>
                <li>Roaming charges incurred</li>
                <li>Profiles older than 30 days from purchase</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-process">
              <h2 
                id="section-process"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                4. Refund Process
              </h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Submit Request:</strong> Contact our support team at refunds@esim.com.mm 
                  with your order ID and reason for refund.
                </li>
                <li>
                  <strong>Verification:</strong> Our team will verify your claim within 2-3 business days.
                </li>
                <li>
                  <strong>Approval:</strong> If approved, you will receive confirmation via email.
                </li>
                <li>
                  <strong>Processing:</strong> Refunds are processed within 7-14 business days.
                </li>
                <li>
                  <strong>Payment:</strong> Refund will be credited to the original payment method.
                </li>
              </ol>
            </section>

            <section className="mb-10" aria-labelledby="section-timeframe">
              <h2 
                id="section-timeframe"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                5. Refund Timeframe
              </h2>
              <div 
                className="overflow-x-auto"
                role="region"
                aria-labelledby="section-timeframe"
              >
                <table className="w-full border-collapse" style={{ minWidth: '400px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(0, 255, 255, 0.3)' }}>
                      <th className="text-left py-3 px-4" style={{ color: '#00FFFF' }}>Payment Method</th>
                      <th className="text-left py-3 px-4" style={{ color: '#00FFFF' }}>Processing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td className="py-3 px-4">KBZ Pay</td>
                      <td className="py-3 px-4">3-5 business days</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td className="py-3 px-4">Wave Money</td>
                      <td className="py-3 px-4">3-5 business days</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td className="py-3 px-4">AYA Pay</td>
                      <td className="py-3 px-4">5-7 business days</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Bank Transfer</td>
                      <td className="py-3 px-4">7-14 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10" aria-labelledby="section-contact">
              <h2 
                id="section-contact"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                6. Contact for Refunds
              </h2>
              <address style={{ fontStyle: 'normal' }}>
                <p>Email: refunds@esim.com.mm</p>
                <p>Phone: +95 9650000172</p>
                <p>Support Hours: Monday - Friday, 9:00 AM - 6:00 PM (Myanmar Time)</p>
              </address>
            </section>
          </div>

          <nav className="mt-12 pt-8 border-t border-white/10" aria-label="Legal pages">
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/terms" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Terms and Conditions
              </Link>
              <Link 
                to="/privacy-policy" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/support" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Contact Support
              </Link>
            </div>
          </nav>
        </motion.article>
      </div>
    </div>
  );
};

export default RefundPolicy;
