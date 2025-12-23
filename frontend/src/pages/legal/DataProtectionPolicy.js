/**
 * DataProtectionPolicy.js - Enterprise Data Protection Policy
 * ESIM MYANMAR COMPANY LIMITED
 * GDPR and Myanmar PDPA compliant
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DataProtectionPolicy = () => {
  const sections = [
    {
      title: '1. Introduction and Commitment',
      content: `ESIM MYANMAR COMPANY LIMITED ("Company") is committed to protecting personal data in accordance with Myanmar's Personal Data Protection Act, ASEAN Framework on Personal Data Protection, and international best practices including GDPR principles. This Data Protection Policy outlines how we collect, process, store, and protect personal data across our eSIM management platform and telecommunications services.`
    },
    {
      title: '2. Data Controller Information',
      content: `Data Controller: ESIM MYANMAR COMPANY LIMITED\nRegistered Address: Yangon, Myanmar\nData Protection Officer: dpo@esim.com.mm\nContact: 09650000172\n\nWe are responsible for determining the purposes and means of processing personal data collected through our services.`
    },
    {
      title: '3. Categories of Personal Data',
      content: `We process the following categories of personal data:\n\nIdentity Data: Full name, date of birth, national ID, passport details\nContact Data: Email address, phone number, physical address\nTechnical Data: Device identifiers, IMEI, EID, IP addresses, browser data\nUsage Data: Service usage, call records, data consumption, location data\nFinancial Data: Payment information, transaction history, billing records\nKYC Data: Identity verification documents, biometric data where required\nCommunication Data: Support tickets, correspondence, feedback`
    },
    {
      title: '4. Legal Basis for Processing',
      content: `We process personal data based on:\n\nContractual Necessity: To provide eSIM services and fulfill our service agreement\nLegal Obligation: Compliance with telecommunications regulations, KYC requirements, and law enforcement requests\nLegitimate Interests: Network security, fraud prevention, service improvement\nConsent: Marketing communications, optional features, analytics\n\nYou may withdraw consent at any time without affecting the lawfulness of prior processing.`
    },
    {
      title: '5. Data Processing Purposes',
      content: `Personal data is processed for:\n\nService Delivery: eSIM provisioning, activation, and management\nAccount Management: Registration, authentication, billing\nCustomer Support: Responding to inquiries and resolving issues\nNetwork Operations: Quality assurance, capacity planning, troubleshooting\nSecurity: Fraud detection, abuse prevention, access control\nCompliance: Regulatory reporting, audit requirements, legal obligations\nImprovement: Service enhancement, analytics, research (anonymized)`
    },
    {
      title: '6. Data Retention',
      content: `We retain personal data for:\n\nActive Accounts: Duration of service relationship plus 7 years\nTransaction Records: 10 years per financial regulations\nCommunication Records: 5 years per telecommunications requirements\nKYC Documents: 7 years after account closure\nUsage Logs: 2 years for operational purposes\nMarketing Data: Until consent withdrawal\n\nData is securely deleted or anonymized after retention periods expire.`
    },
    {
      title: '7. Data Security Measures',
      content: `We implement comprehensive security measures:\n\nTechnical: TLS 1.3 encryption, AES-256 data encryption, secure key management, intrusion detection, regular security audits\nOrganizational: Access controls, employee training, confidentiality agreements, incident response procedures\nPhysical: Secure data centers, access logging, environmental controls\nCompliance: ISO 27001 alignment, regular penetration testing, vulnerability assessments`
    },
    {
      title: '8. Data Sharing and Transfers',
      content: `We may share data with:\n\nNetwork Partners: Mobile operators (MPT, ATOM, MYTEL, U9) for service delivery\nPayment Processors: KBZ Pay, Wave Money, AYA Pay for transactions\nService Providers: Cloud hosting, analytics, customer support tools\nRegulatory Bodies: As required by law\nLaw Enforcement: Upon valid legal requests\n\nInternational transfers are protected by appropriate safeguards including standard contractual clauses.`
    },
    {
      title: '9. Your Data Rights',
      content: `You have the right to:\n\nAccess: Request copies of your personal data\nRectification: Correct inaccurate or incomplete data\nErasure: Request deletion of your data (subject to legal retention requirements)\nRestriction: Limit processing in certain circumstances\nPortability: Receive your data in a structured, machine-readable format\nObjection: Object to processing based on legitimate interests\nWithdraw Consent: Revoke consent for optional processing\n\nTo exercise these rights, contact dpo@esim.com.mm`
    },
    {
      title: '10. Automated Decision-Making',
      content: `We use automated processing for:\n\nFraud Detection: Automated screening of transactions and usage patterns\nCredit Assessment: Automated eligibility checks for postpaid services\nNetwork Management: Automated traffic optimization\n\nYou have the right to request human review of automated decisions that significantly affect you.`
    },
    {
      title: '11. Children\'s Data',
      content: `Our services are not directed at children under 18. We do not knowingly collect personal data from minors without parental consent. If we discover such data has been collected, we will delete it promptly. Parents or guardians may contact us regarding their children's data.`
    },
    {
      title: '12. Data Breach Notification',
      content: `In the event of a personal data breach:\n\nWe will notify the relevant supervisory authority within 72 hours\nAffected individuals will be notified without undue delay if the breach poses high risk\nWe maintain detailed breach records and conduct post-incident reviews\nOur incident response team is available 24/7`
    },
    {
      title: '13. Policy Updates',
      content: `This policy may be updated to reflect regulatory changes, service modifications, or improved practices. Material changes will be communicated via email and platform notification. The effective date will be updated accordingly.`
    },
    {
      title: '14. Contact and Complaints',
      content: `For data protection inquiries or complaints:\n\nData Protection Officer: dpo@esim.com.mm\nGeneral Contact: info@esim.com.mm\nPhone: 09650000172\n\nYou also have the right to lodge a complaint with the relevant data protection authority.`
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
              style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.25)' }}
            >
              Data Protection
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

export default DataProtectionPolicy;
