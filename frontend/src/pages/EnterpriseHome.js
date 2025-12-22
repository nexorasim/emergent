/**
 * EnterpriseHome.js - Enterprise Landing Page with Seasonal Design
 * 2026 UI/UX Standards with IoT-first thinking
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Countdown2026 from '../components/Countdown2026';
import { isSeasonalActive, getSeasonalMessage } from '../utils/seasonalConfig';

const EnterpriseHome = () => {
  const { t } = useLanguage();
  const seasonal = isSeasonalActive();
  const seasonalMessage = getSeasonalMessage();

  const features = [
    {
      title: 'eSIM Transfer',
      subtitle: 'Android to Apple',
      description: 'Seamlessly transfer your eSIM between devices with zero downtime.',
      icon: 'T'
    },
    {
      title: '5G Network',
      subtitle: 'Ultra-fast speeds',
      description: 'Experience blazing-fast 5G speeds across Myanmar and ASEAN.',
      icon: '5G'
    },
    {
      title: 'VoLTE Enabled',
      subtitle: 'HD Voice',
      description: 'Crystal-clear voice calls over LTE network.',
      icon: 'V'
    },
    {
      title: 'Global Roaming',
      subtitle: '150+ Countries',
      description: 'Stay connected worldwide with advanced roaming.',
      icon: 'R'
    },
    {
      title: 'Multi-Device',
      subtitle: 'Watch, iPad, Phone',
      description: 'Connect all your devices simultaneously.',
      icon: 'M'
    },
    {
      title: 'Instant QR',
      subtitle: 'Activate in seconds',
      description: 'Scan and activate your eSIM instantly.',
      icon: 'Q'
    }
  ];

  const stats = [
    { value: '50M+', label: 'Active Users', sublabel: 'Across ASEAN' },
    { value: '99.9%', label: 'Uptime SLA', sublabel: 'Enterprise Grade' },
    { value: '15+', label: 'Countries', sublabel: 'Coverage' },
    { value: '24/7', label: 'Support', sublabel: 'Always Available' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 50%, #1e2f3c 100%)'
        }}
      >
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Seasonal Greeting */}
          {seasonal && seasonalMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span 
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #00FFFF)',
                  color: '#1e2f3c',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {seasonalMessage.greeting}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span 
              style={{
                background: 'linear-gradient(135deg, #F8F9FA 0%, #00FFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              eSIM Myanmar
            </span>
            <br />
            <span style={{ color: '#F8F9FA' }}>Entertainment Server</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ color: 'rgba(248, 249, 250, 0.8)' }}
          >
            Enterprise eSIM Management Platform serving 50M+ users across ASEAN 
            with 5G, VoLTE, and seamless device transfer capabilities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/register"
              style={{
                background: 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)',
                color: '#1e2f3c',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 255, 255, 0.3)';
              }}
            >
              Get Started Now
            </Link>
            <Link
              to="/features"
              style={{
                background: 'transparent',
                color: '#00FFFF',
                padding: '14px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #00FFFF',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#00FFFF';
                e.target.style.color = '#1e2f3c';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#00FFFF';
              }}
            >
              Explore Features
            </Link>
          </motion.div>

          {/* Countdown (Seasonal) */}
          {seasonal && <Countdown2026 />}

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  background: 'rgba(248, 249, 250, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{ 
                    fontSize: '36px', 
                    fontWeight: '800', 
                    color: '#00FFFF',
                    marginBottom: '8px',
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ color: '#F8F9FA', fontWeight: '600', marginBottom: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ color: 'rgba(248, 249, 250, 0.6)', fontSize: '12px' }}>
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{ 
            background: 'rgba(0, 255, 255, 0.1)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: 'rgba(0, 139, 156, 0.1)',
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ background: '#1e2f3c' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #F8F9FA 0%, #00FFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Advanced eSIM Features
            </h2>
            <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              Industry-leading eSIM technology with enterprise-grade security and reliability
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div 
                  style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 139, 156, 0.2))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#00FFFF'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ color: '#F8F9FA', fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#00FFFF', fontSize: '14px', marginBottom: '12px' }}>
                  {feature.subtitle}
                </p>
                <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '14px', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(248, 249, 250, 0.08)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.15)'
            }}
          >
            <h2 
              className="text-4xl font-bold mb-6"
              style={{ color: '#00FFFF' }}
            >
              Ready to Get Started?
            </h2>
            <p style={{ color: 'rgba(248, 249, 250, 0.8)', fontSize: '18px', marginBottom: '32px' }}>
              Join 50 million users across ASEAN experiencing the future of mobile connectivity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)',
                  color: '#1e2f3c',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                Create Account
              </Link>
              <Link
                to="/support"
                style={{
                  background: 'transparent',
                  color: '#F8F9FA',
                  padding: '14px 30px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '2px solid rgba(248, 249, 250, 0.3)'
                }}
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default EnterpriseHome;
