/**
 * Privacy Policy Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const lastUpdated = 'December 22, 2025';

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20" style={{ background: '#1e2f3c' }}>
      <div className="container max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          role="main"
          aria-labelledby="privacy-title"
        >
          <header className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <h1 
              id="privacy-title"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 sm:mb-4"
              style={{ color: '#F8F9FA' }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'rgba(248, 249, 250, 0.7)' }}>
              ESIM MYANMAR COMPANY LIMITED
            </p>
            <p className="text-xs sm:text-sm mt-2" style={{ color: 'rgba(248, 249, 250, 0.6)' }}>
              Last Updated: {lastUpdated}
            </p>
          </header>

          <div 
            className="prose prose-lg max-w-none"
            style={{ 
              color: 'rgba(248, 249, 250, 0.9)',
              fontSize: '18px',
              lineHeight: '1.75'
            }}
          >
            <section className="mb-10" aria-labelledby="section-intro">
              <h2 
                id="section-intro"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                1. Introduction
              </h2>
              <p className="mb-4">
                ESIM MYANMAR COMPANY LIMITED ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our eSIM services and visit our website at www.esim.com.mm.
              </p>
              <p>
                By using our services, you consent to the data practices described in this policy. 
                If you do not agree with the terms of this privacy policy, please do not access our services.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-collection">
              <h2 
                id="section-collection"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                2. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.1 Personal Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Full name and contact information</li>
                <li>Email address and phone number</li>
                <li>National ID or passport number (for KYC verification)</li>
                <li>Device information (IMEI, EID, device model)</li>
                <li>Payment information (processed securely via payment gateways)</li>
                <li>eSIM profile data (ICCID, IMSI)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address and browser type</li>
                <li>Device identifiers and operating system</li>
                <li>Usage data and interaction patterns</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-use">
              <h2 
                id="section-use"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                3. How We Use Your Information
              </h2>
              <p className="mb-4">We use the collected information for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and managing eSIM services</li>
                <li>Processing transactions and payments</li>
                <li>Verifying identity for regulatory compliance (KYC)</li>
                <li>Communicating service updates and support</li>
                <li>Improving our services and user experience</li>
                <li>Complying with legal obligations</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-sharing">
              <h2 
                id="section-sharing"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                4. Information Sharing
              </h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mobile network operators (MPT, ATOM, U9, MYTEL) for eSIM provisioning</li>
                <li>Payment processors (KBZ Pay, Wave Money, AYA Pay)</li>
                <li>Regulatory authorities as required by law</li>
                <li>Service providers who assist in our operations</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-security">
              <h2 
                id="section-security"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                5. Data Security
              </h2>
              <p className="mb-4">
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>TLS 1.3 encryption for data in transit</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>GSMA-compliant eSIM profile management</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-rights">
              <h2 
                id="section-rights"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                6. Your Rights
              </h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-retention">
              <h2 
                id="section-retention"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                7. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to provide our services 
                and comply with legal obligations. Typically, account data is retained for 7 years 
                after account closure as required by telecommunications regulations.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-contact">
              <h2 
                id="section-contact"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                8. Contact Us
              </h2>
              <p className="mb-4">
                For privacy-related inquiries, please contact our Data Protection Officer:
              </p>
              <address style={{ fontStyle: 'normal' }}>
                <p>ESIM MYANMAR COMPANY LIMITED</p>
                <p>Email: privacy@esim.com.mm</p>
                <p>Phone: +95 9650000172</p>
                <p>Address: Yangon, Myanmar</p>
              </address>
            </section>
          </div>

          <nav className="mt-12 pt-8 border-t border-white/10" aria-label="Legal pages">
            <p style={{ color: 'rgba(248, 249, 250, 0.6)', marginBottom: '16px' }}>
              Related Policies:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/terms" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Terms and Conditions
              </Link>
              <Link 
                to="/cookie-policy" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Cookie Policy
              </Link>
              <Link 
                to="/data-protection" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Data Protection
              </Link>
            </div>
          </nav>
        </motion.article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
