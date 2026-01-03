/**
 * DataProtectionPolicy.js - Data Protection Policy Page
 * ESIM MYANMAR COMPANY LIMITED
 * GDPR and PDPA Compliant Data Protection Information
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const DataProtectionPolicy = () => {
  const lastUpdated = 'January 3, 2026';

  const sections = [
    {
      title: '1. Introduction',
      content: `ESIM MYANMAR COMPANY LIMITED ("we", "us", "our") is committed to protecting your personal data and respecting your privacy. This Data Protection Policy explains how we collect, use, store, and protect your personal information in compliance with applicable data protection laws, including the Myanmar Personal Data Protection Law and international standards such as GDPR.`
    },
    {
      title: '2. Data Controller',
      content: `ESIM MYANMAR COMPANY LIMITED acts as the data controller for personal data collected through our eSIM services. Our registered address is in Yangon, Myanmar. For data protection inquiries, contact our Data Protection Officer at dpo@esim.com.mm.`
    },
    {
      title: '3. Personal Data We Collect',
      content: `We collect the following categories of personal data:
      
- Identity Data: Full name, date of birth, national ID number, passport details
- Contact Data: Email address, phone number, postal address
- Technical Data: IP address, device identifiers, IMEI, browser type, operating system
- Transaction Data: Payment details, purchase history, subscription information
- Usage Data: Service usage patterns, network usage, call records
- KYC Data: Identity verification documents, selfie photos for verification`
    },
    {
      title: '4. Legal Basis for Processing',
      content: `We process your personal data based on the following legal grounds:

- Contract Performance: To provide eSIM services you have requested
- Legal Obligation: To comply with telecommunications regulations and KYC requirements
- Legitimate Interests: To improve our services, prevent fraud, and ensure network security
- Consent: For marketing communications and optional services`
    },
    {
      title: '5. Data Retention',
      content: `We retain your personal data for the following periods:

- Account Data: Duration of your account plus 7 years for legal compliance
- Transaction Records: 7 years as required by financial regulations
- KYC Documents: 5 years after account closure
- Usage Data: 2 years for service improvement purposes
- Marketing Preferences: Until you withdraw consent`
    },
    {
      title: '6. Data Security Measures',
      content: `We implement robust security measures to protect your data:

- Encryption: AES-256 encryption for data at rest, TLS 1.3 for data in transit
- Access Controls: Role-based access with multi-factor authentication
- Monitoring: 24/7 security monitoring and intrusion detection
- Audits: Regular security audits and penetration testing
- Incident Response: Documented breach notification procedures within 72 hours`
    },
    {
      title: '7. Your Data Protection Rights',
      content: `You have the following rights regarding your personal data:

- Right of Access: Request a copy of your personal data
- Right to Rectification: Correct inaccurate or incomplete data
- Right to Erasure: Request deletion of your data (subject to legal retention requirements)
- Right to Restrict Processing: Limit how we use your data
- Right to Data Portability: Receive your data in a machine-readable format
- Right to Object: Object to processing based on legitimate interests
- Right to Withdraw Consent: Withdraw consent for marketing at any time`
    },
    {
      title: '8. International Data Transfers',
      content: `Your data may be transferred to and processed in countries outside Myanmar for service delivery and support purposes. We ensure appropriate safeguards are in place, including:

- Standard Contractual Clauses approved by relevant authorities
- Data processing agreements with all third-party processors
- Adequacy assessments for recipient countries`
    },
    {
      title: '9. Third-Party Data Sharing',
      content: `We may share your data with:

- Network Partners: Mobile network operators for eSIM provisioning
- Payment Processors: For secure payment processing
- Regulatory Authorities: As required by law
- Service Providers: Cloud hosting, customer support, analytics

We do not sell your personal data to third parties.`
    },
    {
      title: '10. Automated Decision Making',
      content: `We use automated systems for:

- Fraud Detection: Analyzing transaction patterns to prevent fraud
- Credit Assessment: Evaluating eligibility for postpaid services
- Network Optimization: Managing network resources based on usage patterns

You have the right to request human review of automated decisions that significantly affect you.`
    },
    {
      title: '11. Children\'s Data',
      content: `Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If you believe we have collected data from a minor, please contact us immediately.`
    },
    {
      title: '12. Data Breach Notification',
      content: `In the event of a data breach that poses a risk to your rights and freedoms, we will:

- Notify the relevant supervisory authority within 72 hours
- Inform affected individuals without undue delay
- Document the breach and remediation actions taken`
    },
    {
      title: '13. Contact Information',
      content: `For data protection inquiries or to exercise your rights:

Data Protection Officer
ESIM MYANMAR COMPANY LIMITED
Email: dpo@esim.com.mm
Phone: +95 9650000172
Address: Yangon, Myanmar

You also have the right to lodge a complaint with the relevant data protection authority.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Data Protection Policy - eSIM Myanmar</title>
        <meta name="description" content="Learn how ESIM MYANMAR COMPANY LIMITED protects your personal data. Our comprehensive data protection policy covers collection, storage, security, and your rights." />
        <link rel="canonical" href="https://esim.com.mm/data-protection-policy" />
      </Helmet>

      <div 
        className="min-h-screen py-12 sm:py-16 lg:py-20"
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
                Legal
              </span>
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                style={{ 
                  background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Data Protection Policy
              </h1>
              <p className="text-gray-400 text-sm">
                Last Updated: {lastUpdated}
              </p>
            </div>

            {/* Content */}
            <div 
              className="rounded-2xl p-6 sm:p-8 lg:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 255, 255, 0.15)'
              }}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={index !== sections.length - 1 ? 'mb-8 pb-8 border-b border-white/10' : ''}
                >
                  <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                  <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}

              {/* Related Links */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Related Policies</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { path: '/privacy-policy', label: 'Privacy Policy' },
                    { path: '/terms', label: 'Terms of Service' },
                    { path: '/cookie-policy', label: 'Cookie Policy' },
                    { path: '/acceptable-use-policy', label: 'Acceptable Use Policy' }
                  ].map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        background: 'rgba(0, 255, 255, 0.1)',
                        color: '#00FFFF',
                        border: '1px solid rgba(0, 255, 255, 0.2)'
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                2025-2026 ESIM MYANMAR COMPANY LIMITED. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DataProtectionPolicy;
