/**
 * FAQ Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant with FAQ Schema Markup
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'activation', label: 'Activation' },
    { id: 'technical', label: 'Technical' },
    { id: 'billing', label: 'Billing' },
    { id: 'transfer', label: 'Transfer' }
  ];

  const faqs = {
    general: [
      {
        question: 'What is an eSIM?',
        answer: 'An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without using a physical SIM card. It is built into your device and can store multiple carrier profiles, making it easy to switch between plans or carriers without swapping physical cards.'
      },
      {
        question: 'What are the benefits of using eSIM?',
        answer: 'eSIM offers several advantages: instant activation without waiting for physical delivery, ability to store multiple profiles on one device, easier switching between carriers, no risk of losing or damaging a physical SIM, and support for dual SIM functionality on compatible devices.'
      },
      {
        question: 'Which network providers are supported?',
        answer: 'We support all major Myanmar network operators: MPT, ATOM, U9, and MYTEL. All providers offer 5G and VoLTE capabilities where available.'
      },
      {
        question: 'Is eSIM secure?',
        answer: 'Yes, eSIM technology follows GSMA security standards. Your profile is encrypted and securely stored in the eUICC chip. Each profile has a unique identifier and cannot be cloned or duplicated.'
      }
    ],
    activation: [
      {
        question: 'How do I activate my eSIM?',
        answer: 'After purchase, you will receive a QR code. Go to your device Settings, select "Add eSIM" or "Add Cellular Plan," scan the QR code, and follow the on-screen instructions. Activation is typically instant.'
      },
      {
        question: 'How long does activation take?',
        answer: 'eSIM activation is usually instant. Once you scan the QR code, your profile will be downloaded and activated within seconds. In rare cases, it may take up to 15 minutes during peak times.'
      },
      {
        question: 'Can I activate eSIM without internet?',
        answer: 'You need an internet connection (Wi-Fi or existing mobile data) to download the eSIM profile. Once downloaded, the eSIM works independently without needing the original internet connection.'
      },
      {
        question: 'What if my QR code does not work?',
        answer: 'If your QR code fails to scan, try: ensuring good lighting, holding your camera steady, checking your internet connection, or using manual activation with the SM-DP+ address and activation code provided. Contact support if issues persist.'
      }
    ],
    technical: [
      {
        question: 'How do I check if my device supports eSIM?',
        answer: 'On iPhone: Go to Settings > General > About and look for "EID" number. On Android: Go to Settings > About Phone > SIM Status and look for "EID." If you see a 32-digit EID number, your device supports eSIM.'
      },
      {
        question: 'Can I use eSIM and physical SIM together?',
        answer: 'Yes, most modern devices support Dual SIM functionality, allowing you to use both an eSIM and a physical SIM simultaneously. This is useful for separating work and personal numbers or using local data while traveling.'
      },
      {
        question: 'What is an EID?',
        answer: 'EID (eUICC Identifier) is a unique 32-digit number that identifies your device eSIM chip. It is used to securely bind eSIM profiles to your specific device.'
      },
      {
        question: 'Does eSIM support 5G?',
        answer: 'Yes, all our eSIM plans support 5G networks where available. Your device must also be 5G-capable to access 5G speeds. VoLTE (Voice over LTE) is also supported for HD voice calls.'
      }
    ],
    billing: [
      {
        question: 'How much does eSIM activation cost?',
        answer: 'eSIM activation costs 120,000 MMK for all providers (MPT, ATOM, U9, MYTEL). This includes the eSIM profile and initial data package. Additional data packages can be purchased separately.'
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept KBZ Pay, Wave Money, AYA Pay, and MMQR payments. All payments are processed securely with instant confirmation.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'Refunds are available for technical failures, duplicate purchases, or if service is unavailable in your area. Successfully activated eSIMs are non-refundable. See our Refund Policy for details.'
      },
      {
        question: 'How do I check my data balance?',
        answer: 'You can check your data balance in the eSIM Myanmar app dashboard, by dialing the carrier USSD code, or through your device cellular settings.'
      }
    ],
    transfer: [
      {
        question: 'Can I transfer my eSIM to a new device?',
        answer: 'Yes, eSIM profiles can be transferred between compatible devices. Use our transfer feature in the dashboard to generate a new QR code for your new device. The profile will be deactivated on the old device.'
      },
      {
        question: 'How do I transfer eSIM from Android to iPhone?',
        answer: 'Log into your eSIM Myanmar account, go to Profile Management, select "Transfer to New Device," choose your new device type (iPhone), and scan the generated QR code on your iPhone.'
      },
      {
        question: 'What is iOS Quick Transfer?',
        answer: 'iOS Quick Transfer allows you to transfer your eSIM between Apple devices using Bluetooth proximity. Both devices must be signed into the same Apple ID and be near each other. This feature is available on iOS 16 and later.'
      },
      {
        question: 'Can I use the same eSIM on multiple devices?',
        answer: 'No, an eSIM profile can only be active on one device at a time. To use it on a different device, you must transfer the profile, which deactivates it on the original device.'
      }
    ]
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': Object.values(faqs).flat().map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen py-20" style={{ background: '#1e2f3c' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 
              className="text-4xl md:text-5xl font-extrabold mb-6"
              style={{ color: '#F8F9FA' }}
            >
              Frequently Asked <span style={{ color: '#00FFFF' }}>Questions</span>
            </h1>
            <p 
              className="text-xl max-w-2xl mx-auto"
              style={{ color: 'rgba(248, 249, 250, 0.8)', lineHeight: '1.75' }}
            >
              Find answers to common questions about eSIM technology, activation, and our services.
            </p>
          </motion.header>

          {/* Category Tabs */}
          <div 
            className="flex flex-wrap gap-2 mb-8 justify-center"
            role="tablist"
            aria-label="FAQ categories"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls={`panel-${category.id}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenIndex(null);
                }}
                className="px-5 py-3 rounded-lg font-semibold transition-all"
                style={{
                  background: activeCategory === category.id 
                    ? 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)' 
                    : 'rgba(248, 249, 250, 0.1)',
                  color: activeCategory === category.id ? '#1e2f3c' : '#F8F9FA',
                  minHeight: '48px'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <motion.section
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            id={`panel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={activeCategory}
          >
            <div className="space-y-4">
              {faqs[activeCategory].map((faq, index) => (
                <div 
                  key={index}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(248, 249, 250, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex justify-between items-center"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    style={{ minHeight: '72px' }}
                  >
                    <span 
                      className="font-semibold text-lg pr-4"
                      style={{ color: '#F8F9FA' }}
                    >
                      {faq.question}
                    </span>
                    <span 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                      style={{ 
                        background: 'rgba(0, 255, 255, 0.2)',
                        color: '#00FFFF',
                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                      aria-hidden="true"
                    >
                      V
                    </span>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className="px-6 pb-6"
                          style={{ 
                            color: 'rgba(248, 249, 250, 0.8)',
                            fontSize: '16px',
                            lineHeight: '1.75'
                          }}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Still Need Help Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 255, 255, 0.1)',
                border: '1px solid rgba(0, 255, 255, 0.3)'
              }}
            >
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: '#F8F9FA' }}
              >
                Still Have Questions?
              </h2>
              <p 
                className="mb-6"
                style={{ color: 'rgba(248, 249, 250, 0.7)' }}
              >
                Our support team is available 24/7 to help you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/support"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)',
                    color: '#1e2f3c',
                    minHeight: '48px'
                  }}
                >
                  Contact Support
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold"
                  style={{
                    background: 'transparent',
                    color: '#00FFFF',
                    border: '2px solid #00FFFF',
                    minHeight: '48px'
                  }}
                >
                  Send Us a Message
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default FAQ;
