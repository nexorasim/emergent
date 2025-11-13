import React from 'react';
import { motion } from 'framer-motion';

const FeaturesPage = () => {
  const features = [
    {
      title: 'eSIM Transfer Android to Apple',
      description: 'Seamlessly transfer your eSIM between Android and Apple devices with zero downtime. Our advanced transfer protocol ensures your connectivity never drops.',
      benefits: ['Zero downtime', 'Cross-platform support', 'Secure transfer', 'Instant activation']
    },
    {
      title: 'Phone Number Registration',
      description: 'Register and manage multiple phone numbers on a single eSIM. Perfect for business and personal use.',
      benefits: ['Multiple numbers', 'Easy management', 'Instant provisioning', 'Number portability']
    },
    {
      title: '5G Network Support',
      description: 'Experience blazing-fast 5G speeds across Myanmar and ASEAN region with full backward compatibility.',
      benefits: ['Ultra-fast speeds', 'Low latency', 'Wide coverage', '4G/5G dual mode']
    },
    {
      title: 'SIM to eSIM Migration',
      description: 'Easily migrate from physical SIM to eSIM without changing your number or plan.',
      benefits: ['Keep your number', 'Online migration', 'Instant activation', 'No store visit']
    },
    {
      title: 'VoLTE Enabled',
      description: 'Crystal-clear voice calls over LTE network with HD quality and faster call setup.',
      benefits: ['HD voice quality', 'Fast call setup', 'Better battery life', 'Simultaneous voice & data']
    },
    {
      title: 'Advanced Roaming',
      description: 'Stay connected worldwide with our advanced international roaming solutions covering 150+ countries.',
      benefits: ['150+ countries', 'Competitive rates', 'Auto-connect', 'Usage alerts']
    },
    {
      title: 'iPad & Tablet Support',
      description: 'Full support for iPads, tablets, and secondary devices with dedicated data plans.',
      benefits: ['Dedicated plans', 'Easy setup', 'Data sharing', 'Multi-device management']
    },
    {
      title: 'eSIM Quick Transfer',
      description: 'Quick Transfer feature for iOS allows instant eSIM migration between Apple devices.',
      benefits: ['One-tap transfer', 'No QR code needed', 'Bluetooth proximity', 'iOS 17+ optimized']
    },
    {
      title: 'Apple Watch & Wearables',
      description: 'Connect your smartwatch and wearables with cellular connectivity.',
      benefits: ['Independent connectivity', 'Shared number', 'Low power mode', 'Emergency SOS']
    },
    {
      title: 'Cloud-native Architecture',
      description: 'Built on modern cloud-native microservices for 99.9% uptime and instant scalability.',
      benefits: ['99.9% uptime', 'Auto-scaling', 'Global CDN', 'Real-time sync']
    },
    {
      title: 'Network Authentication',
      description: 'Enterprise-grade security with OpenID authentication and two-factor verification.',
      benefits: ['OpenID support', '2FA authentication', 'Biometric login', 'Zero-trust security']
    },
    {
      title: 'SM-DP+ Integration',
      description: 'Full GSMA-compliant SM-DP+ integration for secure eSIM profile management.',
      benefits: ['GSMA compliant', 'Secure provisioning', 'Profile management', 'Remote updates']
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Enterprise eSIM Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive eSIM management platform with advanced features for individuals, businesses, and enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;