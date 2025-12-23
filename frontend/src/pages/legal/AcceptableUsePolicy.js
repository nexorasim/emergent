/**
 * AcceptableUsePolicy.js - Enterprise Acceptable Use Policy
 * ESIM MYANMAR COMPANY LIMITED
 * Telecom-grade compliance document
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AcceptableUsePolicy = () => {
  const sections = [
    {
      title: '1. Purpose and Scope',
      content: `This Acceptable Use Policy ("AUP") governs the use of eSIM services, network resources, and digital platforms provided by ESIM MYANMAR COMPANY LIMITED ("Company", "we", "us"). This policy applies to all users, including customers, partners, and enterprise clients accessing our eSIM management platform and telecommunications services.`
    },
    {
      title: '2. Permitted Use',
      content: `Users may use our eSIM services for lawful purposes including: personal and business communications, mobile data access, international roaming, device connectivity (smartphones, tablets, wearables), IoT applications with proper authorization, and enterprise mobility solutions. All usage must comply with Myanmar telecommunications regulations and international roaming agreements.`
    },
    {
      title: '3. Prohibited Activities',
      content: `The following activities are strictly prohibited: unauthorized network access or hacking attempts, distribution of malware or malicious code, spam or unsolicited bulk communications, fraudulent activities or identity theft, circumvention of security measures, illegal content transmission, network abuse or denial of service attacks, unauthorized resale of services, SIM cloning or eSIM profile manipulation, and any activity violating Myanmar Telecommunications Law.`
    },
    {
      title: '4. Network Fair Usage',
      content: `To ensure quality service for all users, we implement fair usage policies: data throttling may apply after exceeding plan limits, network management during peak congestion periods, priority given to emergency communications, bandwidth allocation based on service tier, and monitoring for abnormal usage patterns. Enterprise customers may have customized fair usage terms.`
    },
    {
      title: '5. Security Requirements',
      content: `Users must: maintain confidentiality of account credentials, report suspected security breaches immediately, use secure devices and updated software, not share eSIM profiles or QR codes, comply with two-factor authentication requirements, and follow device security best practices. We reserve the right to suspend accounts showing suspicious activity.`
    },
    {
      title: '6. Content Responsibility',
      content: `Users are solely responsible for content transmitted through our network. We do not monitor content but may take action upon receiving valid complaints or legal requests. Users must not transmit content that is illegal, defamatory, infringing intellectual property, harmful to minors, or violates privacy rights.`
    },
    {
      title: '7. International Roaming',
      content: `When using international roaming services: users must comply with destination country regulations, additional charges may apply per roaming agreements, some services may be restricted in certain regions, users should verify coverage before travel, and emergency services access varies by location.`
    },
    {
      title: '8. Enterprise and Partner Obligations',
      content: `Enterprise customers and partners have additional obligations: maintain accurate business registration, ensure end-user compliance with this AUP, report violations by their users, maintain adequate security measures, comply with API usage limits, and provide accurate billing information.`
    },
    {
      title: '9. Enforcement and Violations',
      content: `Violations may result in: warning notifications, temporary service suspension, permanent account termination, reporting to law enforcement, civil or criminal liability, and forfeiture of prepaid balances. We investigate all reported violations and take appropriate action based on severity.`
    },
    {
      title: '10. Reporting Violations',
      content: `To report AUP violations, contact us at: abuse@esim.com.mm or through our support portal. Include detailed information about the violation, evidence if available, and your contact information. We treat all reports confidentially and investigate promptly.`
    },
    {
      title: '11. Policy Updates',
      content: `We may update this AUP to reflect regulatory changes, service modifications, or security requirements. Users will be notified of material changes via email or platform notification. Continued use after changes constitutes acceptance of the updated policy.`
    },
    {
      title: '12. Contact Information',
      content: `For questions about this Acceptable Use Policy:\n\nESIM MYANMAR COMPANY LIMITED\nEmail: legal@esim.com.mm\nPhone: 09650000172\nWebsite: esim.com.mm`
    }
  ];

  return (
    <div 
      className="min-h-screen py-16 sm:py-20 lg:py-24"
      style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00FFFF', border: '1px solid rgba(0, 255, 255, 0.25)' }}
            >
              Legal Document
            </span>
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Acceptable Use Policy
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Last updated: December 23, 2025
            </p>
          </div>

          {/* Content */}
          <div 
            className="rounded-2xl p-6 sm:p-8 lg:p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
              border: '1px solid rgba(0, 255, 255, 0.15)'
            }}
          >
            {sections.map((section, index) => (
              <div key={index} className={index > 0 ? 'mt-8 pt-8 border-t border-white/10' : ''}>
                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;
