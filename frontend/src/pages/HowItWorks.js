/**
 * How eSIM Works Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant with GSMA Terminology
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Plan',
      description: 'Select from MPT, ATOM, U9, or MYTEL networks. All plans include 5G, VoLTE, and international roaming.',
      details: ['Compare data packages', 'Select validity period', 'Review pricing (120,000 MMK)']
    },
    {
      number: '02',
      title: 'Verify Your Identity',
      description: 'Complete KYC verification with your National ID or Passport. This is required by telecommunications regulations.',
      details: ['Upload ID document', 'Verify phone number', 'Nexora AI verification']
    },
    {
      number: '03',
      title: 'Make Payment',
      description: 'Pay securely using KBZ Pay, Wave Money, AYA Pay, or MMQR. Instant confirmation upon successful payment.',
      details: ['Scan MMQR code', 'Confirm payment', 'Receive confirmation']
    },
    {
      number: '04',
      title: 'Receive QR Code',
      description: 'Your unique eSIM QR code is generated instantly. This contains your profile data for activation.',
      details: ['QR code via email', 'QR code in dashboard', 'Download for offline use']
    },
    {
      number: '05',
      title: 'Scan and Activate',
      description: 'Use your device LPA (Local Profile Assistant) to scan the QR code and download your eSIM profile.',
      details: ['Open device settings', 'Add eSIM / Cellular Plan', 'Scan QR code']
    },
    {
      number: '06',
      title: 'Start Using',
      description: 'Your eSIM is now active. Enjoy 5G speeds, VoLTE calls, and seamless connectivity.',
      details: ['Enable mobile data', 'Make your first call', 'Monitor usage in app']
    }
  ];

  const technicalFlow = [
    { component: 'Your Device', description: 'eUICC (Embedded Universal Integrated Circuit Card)' },
    { component: 'LPA', description: 'Local Profile Assistant manages profile download' },
    { component: 'SM-DP+', description: 'Subscription Manager Data Preparation Plus server' },
    { component: 'SM-DS', description: 'Subscription Manager Discovery Server' },
    { component: 'MNO', description: 'Mobile Network Operator (MPT/ATOM/U9/MYTEL)' }
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20" style={{ background: '#1e2f3c' }}>
      <div className="container">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h1 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 sm:mb-6"
            style={{ color: '#F8F9FA' }}
          >
            How <span style={{ color: '#00FFFF' }}>eSIM</span> Works
          </h1>
          <p 
            className="text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto"
            style={{ color: 'rgba(248, 249, 250, 0.8)', lineHeight: '1.75' }}
          >
            Get connected in minutes with our simple 6-step activation process. 
            No physical SIM card needed - everything is digital and instant.
          </p>
        </motion.header>

        {/* Steps Section */}
        <section className="mb-20" aria-labelledby="steps-title">
          <h2 id="steps-title" className="sr-only">Activation Steps</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 items-start"
              >
                <div 
                  className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 139, 156, 0.2))',
                    border: '2px solid rgba(0, 255, 255, 0.3)'
                  }}
                >
                  <span 
                    className="text-3xl font-extrabold"
                    style={{ color: '#00FFFF' }}
                  >
                    {step.number}
                  </span>
                </div>
                <div 
                  className="flex-1 rounded-xl p-6"
                  style={{
                    background: 'rgba(248, 249, 250, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{ color: '#F8F9FA' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ color: 'rgba(248, 249, 250, 0.8)', fontSize: '18px', lineHeight: '1.6' }}
                  >
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li 
                        key={idx}
                        className="flex items-center gap-3"
                        style={{ color: 'rgba(248, 249, 250, 0.7)' }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: '#00FFFF' }}
                          aria-hidden="true"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Architecture Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
          aria-labelledby="technical-title"
        >
          <h2 
            id="technical-title"
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: '#F8F9FA' }}
          >
            GSMA RSP Architecture
          </h2>
          <p 
            className="text-center mb-10 max-w-3xl mx-auto"
            style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '18px' }}
          >
            Our platform follows GSMA Remote SIM Provisioning (RSP) standards for secure eSIM profile management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {technicalFlow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="rounded-xl p-6 mb-3"
                  style={{
                    background: 'rgba(0, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 255, 255, 0.3)'
                  }}
                >
                  <h3 
                    className="font-bold mb-2"
                    style={{ color: '#00FFFF' }}
                  >
                    {item.component}
                  </h3>
                  <p 
                    style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '14px' }}
                  >
                    {item.description}
                  </p>
                </div>
                {index < technicalFlow.length - 1 && (
                  <div 
                    className="hidden md:block text-2xl"
                    style={{ color: 'rgba(0, 255, 255, 0.5)' }}
                    aria-hidden="true"
                  >
                    &rarr;
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Terms Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
          aria-labelledby="terms-title"
        >
          <h2 
            id="terms-title"
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: '#F8F9FA' }}
          >
            Key eSIM Terms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { term: 'eUICC', definition: 'Embedded Universal Integrated Circuit Card - the hardware chip in your device that stores eSIM profiles' },
              { term: 'EID', definition: 'eUICC Identifier - a unique 32-digit number identifying your device eSIM chip' },
              { term: 'ICCID', definition: 'Integrated Circuit Card Identifier - unique identifier for each eSIM profile' },
              { term: 'LPA', definition: 'Local Profile Assistant - software on your device that manages eSIM profile downloads' },
              { term: 'SM-DP+', definition: 'Subscription Manager Data Preparation Plus - server that prepares and delivers eSIM profiles' },
              { term: 'Profile', definition: 'Digital credentials containing your mobile subscription data' }
            ].map((item, index) => (
              <div 
                key={index}
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <dt 
                  className="font-bold mb-2"
                  style={{ color: '#00FFFF' }}
                >
                  {item.term}
                </dt>
                <dd style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '16px', lineHeight: '1.6' }}>
                  {item.definition}
                </dd>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div 
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}
          >
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ color: '#F8F9FA' }}
            >
              Ready to Activate Your eSIM?
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: 'rgba(248, 249, 250, 0.8)' }}
            >
              Get started in minutes with our simple activation process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/esim-register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)',
                  color: '#1e2f3c',
                  minHeight: '48px'
                }}
              >
                Start Activation
              </Link>
              <Link
                to="/supported-devices"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all"
                style={{
                  background: 'transparent',
                  color: '#00FFFF',
                  border: '2px solid #00FFFF',
                  minHeight: '48px'
                }}
              >
                Check Device Compatibility
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HowItWorks;
