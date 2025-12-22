/**
 * Terms and Conditions Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Terms = () => {
  const lastUpdated = 'December 22, 2025';
  const effectiveDate = 'December 22, 2025';

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20" style={{ background: '#1e2f3c' }}>
      <div className="container max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          role="main"
          aria-labelledby="terms-title"
        >
          <header className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <h1 
              id="terms-title"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 sm:mb-4"
              style={{ color: '#F8F9FA' }}
            >
              Terms and Conditions
            </h1>
            <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'rgba(248, 249, 250, 0.7)' }}>
              ESIM MYANMAR COMPANY LIMITED
            </p>
            <p className="text-xs sm:text-sm mt-2" style={{ color: 'rgba(248, 249, 250, 0.6)' }}>
              Effective Date: {effectiveDate} | Last Updated: {lastUpdated}
            </p>
          </header>

          <div 
            style={{ 
              color: 'rgba(248, 249, 250, 0.9)',
              fontSize: '18px',
              lineHeight: '1.75'
            }}
          >
            <section className="mb-10" aria-labelledby="section-acceptance">
              <h2 
                id="section-acceptance"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing or using the eSIM services provided by ESIM MYANMAR COMPANY LIMITED 
                ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, you may not use our services.
              </p>
              <p>
                These terms apply to all users of our services, including customers, partners, 
                and visitors to our website at www.esim.com.mm.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-services">
              <h2 
                id="section-services"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                2. Services Description
              </h2>
              <p className="mb-4">
                ESIM MYANMAR COMPANY LIMITED provides:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>eSIM profile provisioning and management</li>
                <li>Mobile connectivity services via MPT, ATOM, U9, and MYTEL networks</li>
                <li>5G and VoLTE enabled services</li>
                <li>Cross-device eSIM transfer capabilities</li>
                <li>International roaming services</li>
                <li>Entertainment streaming services</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-eligibility">
              <h2 
                id="section-eligibility"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                3. Eligibility
              </h2>
              <p className="mb-4">To use our services, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Have a compatible eSIM-enabled device</li>
                <li>Provide valid identification for KYC verification</li>
                <li>Have a valid Myanmar phone number or international number</li>
                <li>Agree to comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-account">
              <h2 
                id="section-account"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                4. Account Registration
              </h2>
              <p className="mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate and complete registration information</li>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-pricing">
              <h2 
                id="section-pricing"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                5. Pricing and Payment
              </h2>
              <p className="mb-4">
                eSIM activation fee: 120,000 MMK per profile.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in Myanmar Kyat (MMK) unless otherwise stated</li>
                <li>Payment methods: KBZ Pay, Wave Money, AYA Pay, MMQR</li>
                <li>Prices are subject to change with prior notice</li>
                <li>All fees are non-refundable unless otherwise specified</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-esim">
              <h2 
                id="section-esim"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                6. eSIM Terms
              </h2>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                6.1 Activation
              </h3>
              <p className="mb-4">
                eSIM profiles are activated via QR code scan or manual configuration. 
                Activation is typically instant but may take up to 24 hours in some cases.
              </p>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                6.2 Transfer
              </h3>
              <p className="mb-4">
                eSIM profiles can be transferred between compatible devices. 
                Transfer from Android to Apple and iOS Quick Transfer are supported.
              </p>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                6.3 Limitations
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>One eSIM profile per device at a time</li>
                <li>Profile cannot be cloned or duplicated</li>
                <li>Network coverage depends on carrier infrastructure</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-prohibited">
              <h2 
                id="section-prohibited"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                7. Prohibited Uses
              </h2>
              <p className="mb-4">You may not use our services to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Engage in fraudulent activities</li>
                <li>Interfere with network operations</li>
                <li>Resell services without authorization</li>
                <li>Transmit malicious content or spam</li>
                <li>Attempt to bypass security measures</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-liability">
              <h2 
                id="section-liability"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                8. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the maximum extent permitted by law, ESIM MYANMAR COMPANY LIMITED shall not be 
                liable for any indirect, incidental, special, consequential, or punitive damages, 
                including but not limited to loss of profits, data, or business opportunities.
              </p>
              <p>
                Our total liability shall not exceed the amount paid by you for the services 
                in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-termination">
              <h2 
                id="section-termination"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                9. Termination
              </h2>
              <p className="mb-4">
                We may suspend or terminate your account if you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate these Terms and Conditions</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Fail to pay for services</li>
                <li>Provide false information</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-governing">
              <h2 
                id="section-governing"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                10. Governing Law
              </h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with 
                the laws of the Republic of the Union of Myanmar. Any disputes shall be subject 
                to the exclusive jurisdiction of the courts of Yangon, Myanmar.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-contact">
              <h2 
                id="section-contact"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                11. Contact Information
              </h2>
              <address style={{ fontStyle: 'normal' }}>
                <p>ESIM MYANMAR COMPANY LIMITED</p>
                <p>Email: legal@esim.com.mm</p>
                <p>Phone: +95 9650000172</p>
                <p>Website: www.esim.com.mm</p>
              </address>
            </section>
          </div>

          <nav className="mt-12 pt-8 border-t border-white/10" aria-label="Legal pages">
            <p style={{ color: 'rgba(248, 249, 250, 0.6)', marginBottom: '16px' }}>
              Related Policies:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/privacy-policy" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/refund-policy" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Refund Policy
              </Link>
              <Link 
                to="/acceptable-use" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Acceptable Use Policy
              </Link>
            </div>
          </nav>
        </motion.article>
      </div>
    </div>
  );
};

export default Terms;
