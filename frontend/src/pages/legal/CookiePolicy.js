/**
 * Cookie Policy Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  const lastUpdated = 'December 22, 2025';

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20" style={{ background: '#1e2f3c' }}>
      <div className="container max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          role="main"
          aria-labelledby="cookie-title"
        >
          <header className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <h1 
              id="cookie-title"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 sm:mb-4"
              style={{ color: '#F8F9FA' }}
            >
              Cookie Policy
            </h1>
            <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'rgba(248, 249, 250, 0.7)' }}>
              ESIM MYANMAR COMPANY LIMITED
            </p>
            <p className="text-xs sm:text-sm mt-2" style={{ color: 'rgba(248, 249, 250, 0.6)' }}>
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
            <section className="mb-10" aria-labelledby="section-what">
              <h2 
                id="section-what"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                1. What Are Cookies
              </h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                keeping you logged in, and understanding how you use our services.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-types">
              <h2 
                id="section-types"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                2. Types of Cookies We Use
              </h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.1 Essential Cookies
              </h3>
              <p className="mb-4">
                Required for the website to function properly. These cannot be disabled.
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Authentication and session management</li>
                <li>Security tokens (CSRF protection)</li>
                <li>Load balancing</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.2 Functional Cookies
              </h3>
              <p className="mb-4">
                Remember your preferences and settings.
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Language preferences (English/Myanmar)</li>
                <li>Theme settings</li>
                <li>Seasonal feature preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.3 Analytics Cookies
              </h3>
              <p className="mb-4">
                Help us understand how visitors interact with our website.
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Page views and navigation patterns</li>
                <li>Time spent on pages</li>
                <li>Error tracking</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F8F9FA' }}>
                2.4 Marketing Cookies
              </h3>
              <p className="mb-4">
                Used to deliver relevant advertisements (with your consent).
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ad targeting and measurement</li>
                <li>Social media integration</li>
              </ul>
            </section>

            <section className="mb-10" aria-labelledby="section-cookies-list">
              <h2 
                id="section-cookies-list"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                3. Specific Cookies We Use
              </h2>
              <div className="overflow-x-auto" role="region" aria-label="Cookie details table">
                <table className="w-full border-collapse" style={{ minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(0, 255, 255, 0.3)' }}>
                      <th className="text-left py-3 px-4" style={{ color: '#00FFFF' }}>Cookie Name</th>
                      <th className="text-left py-3 px-4" style={{ color: '#00FFFF' }}>Purpose</th>
                      <th className="text-left py-3 px-4" style={{ color: '#00FFFF' }}>Duration</th>
                      <th className="text-left py-3 px-4" style={{ color: '#00FFFF' }}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td className="py-3 px-4">esim_session</td>
                      <td className="py-3 px-4">User session management</td>
                      <td className="py-3 px-4">Session</td>
                      <td className="py-3 px-4">Essential</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td className="py-3 px-4">auth_token</td>
                      <td className="py-3 px-4">Authentication</td>
                      <td className="py-3 px-4">24 hours</td>
                      <td className="py-3 px-4">Essential</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td className="py-3 px-4">lang_pref</td>
                      <td className="py-3 px-4">Language preference</td>
                      <td className="py-3 px-4">1 year</td>
                      <td className="py-3 px-4">Functional</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td className="py-3 px-4">seasonal_music</td>
                      <td className="py-3 px-4">Music player preference</td>
                      <td className="py-3 px-4">30 days</td>
                      <td className="py-3 px-4">Functional</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">_ga</td>
                      <td className="py-3 px-4">Google Analytics</td>
                      <td className="py-3 px-4">2 years</td>
                      <td className="py-3 px-4">Analytics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10" aria-labelledby="section-manage">
              <h2 
                id="section-manage"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                4. Managing Cookies
              </h2>
              <p className="mb-4">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
                <li>Firefox: Options &gt; Privacy &amp; Security &gt; Cookies</li>
                <li>Safari: Preferences &gt; Privacy &gt; Cookies</li>
                <li>Edge: Settings &gt; Privacy &gt; Cookies</li>
              </ul>
              <p className="mt-4">
                Note: Disabling essential cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-consent">
              <h2 
                id="section-consent"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                5. Your Consent
              </h2>
              <p>
                By continuing to use our website, you consent to our use of cookies as described 
                in this policy. You can withdraw your consent at any time by clearing your cookies 
                and adjusting your browser settings.
              </p>
            </section>

            <section className="mb-10" aria-labelledby="section-contact">
              <h2 
                id="section-contact"
                className="text-2xl font-bold mb-4"
                style={{ color: '#00FFFF' }}
              >
                6. Contact Us
              </h2>
              <address style={{ fontStyle: 'normal' }}>
                <p>For questions about our cookie policy:</p>
                <p>Email: privacy@esim.com.mm</p>
                <p>Phone: +95 9650000172</p>
              </address>
            </section>
          </div>

          <nav className="mt-12 pt-8 border-t border-white/10" aria-label="Legal pages">
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/privacy-policy" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-cyan-400 hover:text-cyan-300 underline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Terms and Conditions
              </Link>
            </div>
          </nav>
        </motion.article>
      </div>
    </div>
  );
};

export default CookiePolicy;
