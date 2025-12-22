/**
 * FeaturesPage.js - Premium Enterprise Features
 * ESIM MYANMAR COMPANY LIMITED
 * Zero emoji - Professional enterprise design
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  const features = [
    {
      title: 'eSIM Transfer Android to Apple',
      subtitle: 'Cross-Platform Migration',
      description: 'Seamlessly transfer your eSIM between Android and Apple devices with zero downtime. Our advanced transfer protocol ensures your connectivity never drops.',
      benefits: ['Zero downtime transfer', 'Cross-platform support', 'Secure migration', 'Instant activation'],
      icon: 'T',
      color: '#00FFFF'
    },
    {
      title: 'Phone Number Registration',
      subtitle: 'Multi-Number Management',
      description: 'Register and manage multiple phone numbers on a single eSIM. Perfect for business and personal use separation.',
      benefits: ['Multiple numbers', 'Easy management', 'Instant provisioning', 'Number portability'],
      icon: 'N',
      color: '#10B981'
    },
    {
      title: '5G Network Support',
      subtitle: 'Next-Gen Connectivity',
      description: 'Experience blazing-fast 5G speeds across Myanmar and ASEAN region with full backward compatibility to 4G LTE.',
      benefits: ['Ultra-fast speeds', 'Low latency', 'Wide coverage', '4G/5G dual mode'],
      icon: '5G',
      color: '#8B5CF6'
    },
    {
      title: 'SIM to eSIM Migration',
      subtitle: 'Seamless Transition',
      description: 'Easily migrate from physical SIM to eSIM without changing your number, plan, or visiting any store.',
      benefits: ['Keep your number', 'Online migration', 'Instant activation', 'No store visit required'],
      icon: 'M',
      color: '#F59E0B'
    },
    {
      title: 'VoLTE Enabled',
      subtitle: 'HD Voice Quality',
      description: 'Crystal-clear voice calls over LTE network with HD quality audio and faster call setup times.',
      benefits: ['HD voice quality', 'Fast call setup', 'Better battery life', 'Simultaneous voice and data'],
      icon: 'V',
      color: '#EC4899'
    },
    {
      title: 'Advanced Roaming',
      subtitle: '190+ Countries',
      description: 'Stay connected worldwide with our advanced international roaming solutions covering over 190 countries.',
      benefits: ['190+ countries', 'Competitive rates', 'Auto-connect', 'Usage alerts'],
      icon: 'R',
      color: '#06B6D4'
    },
    {
      title: 'iPad and Tablet Support',
      subtitle: 'Secondary Device Plans',
      description: 'Full support for iPads, tablets, and secondary devices with dedicated data plans and easy setup.',
      benefits: ['Dedicated plans', 'Easy setup', 'Data sharing', 'Multi-device management'],
      icon: 'D',
      color: '#14B8A6'
    },
    {
      title: 'eSIM Quick Transfer',
      subtitle: 'iOS Native Feature',
      description: 'Quick Transfer feature for iOS allows instant eSIM migration between Apple devices using Bluetooth proximity.',
      benefits: ['One-tap transfer', 'No QR code needed', 'Bluetooth proximity', 'iOS 17+ optimized'],
      icon: 'Q',
      color: '#A855F7'
    },
    {
      title: 'Apple Watch and Wearables',
      subtitle: 'Cellular Connectivity',
      description: 'Connect your smartwatch and wearables with independent cellular connectivity for calls, messages, and data.',
      benefits: ['Independent connectivity', 'Shared number', 'Low power mode', 'Emergency SOS'],
      icon: 'W',
      color: '#EF4444'
    },
    {
      title: 'Cloud-native Architecture',
      subtitle: 'Enterprise Infrastructure',
      description: 'Built on modern cloud-native microservices architecture for 99.9% uptime guarantee and instant scalability.',
      benefits: ['99.9% uptime SLA', 'Auto-scaling', 'Global CDN', 'Real-time sync'],
      icon: 'C',
      color: '#3B82F6'
    },
    {
      title: 'Network Authentication',
      subtitle: 'Enterprise Security',
      description: 'Enterprise-grade security with OpenID authentication, two-factor verification, and biometric login support.',
      benefits: ['OpenID support', '2FA authentication', 'Biometric login', 'Zero-trust security'],
      icon: 'S',
      color: '#22C55E'
    },
    {
      title: 'SM-DP+ Integration',
      subtitle: 'GSMA Compliant',
      description: 'Full GSMA-compliant SM-DP+ integration for secure eSIM profile management and remote provisioning.',
      benefits: ['GSMA compliant', 'Secure provisioning', 'Profile management', 'Remote updates'],
      icon: 'P',
      color: '#F97316'
    }
  ];

  return (
    <div 
      className="min-h-screen py-12 sm:py-16 lg:py-20"
      style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)' }}
      data-testid="features-page"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00FFFF', border: '1px solid rgba(0, 255, 255, 0.25)' }}
          >
            Platform Features
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span 
              style={{ 
                background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Enterprise eSIM Features
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            Comprehensive eSIM management platform with advanced features for individuals, businesses, and enterprises.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div 
                className="h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 255, 255, 0.12)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold mb-5 transition-transform group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                    border: `1px solid ${feature.color}30`,
                    color: feature.color
                  }}
                >
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: feature.color }}>{feature.subtitle}</p>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{feature.description}</p>
                
                {/* Benefits */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: feature.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div 
            className="rounded-2xl p-8 sm:p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(30, 47, 60, 0.95) 100%)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              boxShadow: '0 8px 40px rgba(0, 255, 255, 0.1)'
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 text-base mb-8 max-w-2xl mx-auto">
              Join 50 million users experiencing enterprise-grade eSIM technology with carrier-level reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                  color: '#1e2f3c',
                  boxShadow: '0 4px 20px rgba(0, 255, 255, 0.35)'
                }}
                data-testid="features-cta-btn"
              >
                Create Account
              </Link>
              <Link 
                to="/plans" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#F8F9FA',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                View Plans
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;
