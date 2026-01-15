/**
 * Home.js - Premium Enterprise Homepage
 * eSIM Myanmar Entertainment Server
 * 2026 UI/UX Design with glassmorphism and seasonal elements
 * Zero emoji - Professional enterprise design
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Countdown2026 from '../components/Countdown2026';
import { isSeasonalActive, isNewYearPeriod } from '../utils/seasonalConfig';

// Animated section wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Premium Glass Card
const GlassCard = ({ children, className = '', hover = true, glow = false }) => (
  <div
    className={`relative overflow-hidden transition-all duration-300 ${hover ? 'hover:-translate-y-1' : ''} ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.9) 0%, rgba(42, 74, 92, 0.85) 100%)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 255, 255, 0.12)',
      borderRadius: '20px',
      boxShadow: glow 
        ? '0 8px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(0, 255, 255, 0.08)' 
        : '0 8px 32px rgba(0, 0, 0, 0.2)'
    }}
  >
    {/* Top accent line */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)'
      }}
    />
    {children}
  </div>
);

// Feature Icon Component
const FeatureIcon = ({ icon, color = '#00FFFF' }) => (
  <div
    className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold mb-4"
    style={{ 
      background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
      border: `1px solid ${color}30`,
      color,
      boxShadow: `0 0 30px ${color}15`
    }}
  >
    {icon}
  </div>
);

const HomePage = () => {
  const showSeasonal = isSeasonalActive();
  const isNewYear = isNewYearPeriod();
  
  const features = [
    {
      title: 'eSIM Transfer',
      subtitle: 'Android to Apple',
      description: 'Seamlessly transfer your eSIM between Android and Apple devices with zero downtime and instant activation.',
      icon: 'T',
      color: '#00FFFF'
    },
    {
      title: '5G Network',
      subtitle: 'Ultra Fast Speed',
      description: 'Experience blazing-fast 5G speeds across Myanmar and ASEAN region with carrier-grade reliability.',
      icon: '5G',
      color: '#10B981'
    },
    {
      title: 'VoLTE Enabled',
      subtitle: 'HD Voice Quality',
      description: 'Crystal-clear voice calls over LTE network with HD quality audio and seamless handoffs.',
      icon: 'V',
      color: '#8B5CF6'
    },
    {
      title: 'Global Roaming',
      subtitle: '190+ Countries',
      description: 'Stay connected worldwide with our advanced international roaming solutions across 190+ countries.',
      icon: 'R',
      color: '#F59E0B'
    },
    {
      title: 'Multi-Device',
      subtitle: 'Connect Everything',
      description: 'Connect smartphones, tablets, Apple Watch, iPads, and wearables simultaneously with one account.',
      icon: 'M',
      color: '#EC4899'
    },
    {
      title: 'Instant QR',
      subtitle: 'Quick Activation',
      description: 'Activate your eSIM in seconds with QR code scanning. No physical SIM cards needed.',
      icon: 'Q',
      color: '#06B6D4'
    }
  ];

  const stats = [
    { value: '50M+', label: 'Active Users', sublabel: 'Across ASEAN' },
    { value: '99.9%', label: 'Uptime SLA', sublabel: 'Enterprise Grade' },
    { value: '190+', label: 'Countries', sublabel: 'Global Coverage' },
    { value: '24/7', label: 'Support', sublabel: 'Always Available' }
  ];

  const entertainmentServices = [
    { name: 'TV Streaming', icon: 'TV', description: '1000+ live channels', color: '#00FFFF' },
    { name: 'Movies', icon: 'MV', description: 'Unlimited content library', color: '#8B5CF6' },
    { name: 'Cloud Gaming', icon: 'GM', description: 'Low latency gaming', color: '#10B981' },
    { name: 'Premium Music', icon: 'MS', description: 'Hi-Fi audio streaming', color: '#F59E0B' }
  ];

  const esimFlows = [
    'Phone number registration',
    'eSIM purchase and provisioning',
    'QR code generation and delivery',
    'SIM to eSIM migration',
    'iOS Quick Transfer support',
    'Apple Watch and iPad support',
    'Device upgrade transfers',
    'Advanced roaming activation'
  ];

  return (
    <div className="relative overflow-hidden" data-testid="homepage">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.06) 0%, transparent 40%)'
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Seasonal Countdown Section */}
      {showSeasonal && !isNewYear && (
        <AnimatedSection className="py-6 sm:py-8 relative z-10">
          <div className="container mx-auto px-4">
            <Countdown2026 />
          </div>
        </AnimatedSection>
      )}

      {/* New Year Celebration Banner */}
      {showSeasonal && isNewYear && (
        <AnimatedSection className="py-8 sm:py-10 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
                style={{ 
                  background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 50%, #00FFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 60px rgba(0, 255, 255, 0.3)'
                }}
              >
                Celebrating 4th Anniversary
              </h2>
              <p className="text-gray-300 text-base sm:text-lg">Wishing you seamless connectivity throughout the year</p>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(0, 255, 255, 0.1)',
                border: '1px solid rgba(0, 255, 255, 0.25)'
              }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">Enterprise eSIM Platform</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 50%, #00FFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.3))'
                }}
              >
                eSIM Myanmar
              </span>
              <br />
              <span className="text-white">Entertainment Server</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Enterprise eSIM Management Platform serving 50M+ users across ASEAN 
              with 5G, VoLTE, and seamless device transfer capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                data-testid="hero-cta-primary"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                  color: '#1e2f3c',
                  boxShadow: '0 4px 20px rgba(0, 255, 255, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  if (window.santaAnimations) window.santaAnimations.onCTAHover();
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get Started Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/features" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                data-testid="hero-cta-secondary"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#F8F9FA',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                Explore Features
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20"
          >
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-5 sm:p-6 text-center" glow>
                <div 
                  className="text-3xl sm:text-4xl font-bold mb-1"
                  style={{ 
                    color: '#00FFFF',
                    textShadow: '0 0 30px rgba(0, 255, 255, 0.4)'
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white font-medium text-sm">{stat.label}</div>
                <div className="text-gray-500 text-xs mt-1">{stat.sublabel}</div>
              </GlassCard>
            ))}
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-10 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-20 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-10 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full opacity-15 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)', filter: 'blur(80px)', animationDelay: '1s' }} />
      </section>

      {/* Features Section */}
      <AnimatedSection className="py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00FFFF', border: '1px solid rgba(0, 255, 255, 0.2)' }}
            >
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Advanced eSIM Technology
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Industry-leading eSIM technology with enterprise-grade security and carrier-level reliability
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 sm:p-8 h-full">
                  <FeatureIcon icon={feature.icon} color={feature.color} />
                  <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: feature.color }}>{feature.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* eSIM Flows Section */}
      <AnimatedSection className="py-16 sm:py-20 relative z-10" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span 
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00FFFF', border: '1px solid rgba(0, 255, 255, 0.2)' }}
              >
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Complete eSIM Lifecycle Management</h2>
              <p className="text-gray-400 text-base mb-8">
                Enterprise-grade eSIM orchestration platform supporting the complete device lifecycle from provisioning to transfer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {esimFlows.map((flow, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 255, 0.15)' }}>
                      <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">{flow}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <GlassCard className="p-6 sm:p-8" glow>
                <h3 className="text-xl font-bold text-white mb-6">Entitlement Server Features</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Cloud-native Microservices', value: 'Active' },
                    { label: 'SM-DP+ Integration', value: 'Connected' },
                    { label: 'Network Authentication', value: 'Secure' },
                    { label: 'Device Lifecycle', value: 'Managed' },
                    { label: 'Real-time Analytics', value: 'Enabled' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span 
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Entertainment Section */}
      <AnimatedSection className="py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', border: '1px solid rgba(139, 92, 246, 0.2)' }}
            >
              Entertainment Bundle
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Premium Entertainment
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Premium streaming and entertainment services bundled with your eSIM subscription
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {entertainmentServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 sm:p-8 text-center cursor-pointer group">
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold transition-transform group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)`,
                      border: `1px solid ${service.color}30`,
                      color: service.color
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <GlassCard className="p-8 sm:p-12 lg:p-16" glow>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Join 50 million users across ASEAN experiencing the future of mobile connectivity with enterprise-grade eSIM technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                data-testid="cta-create-account"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                  color: '#1e2f3c',
                  boxShadow: '0 4px 20px rgba(0, 255, 255, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Create Account
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                data-testid="cta-contact-sales"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#F8F9FA',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                Contact Sales
              </Link>
            </div>
          </GlassCard>
        </div>
      </AnimatedSection>

      {/* Contact Info Bar */}
      <section 
        className="py-6 sm:py-8 relative z-10"
        style={{ 
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(0, 255, 255, 0.1)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 text-sm">
            {[
              { icon: 'W', label: 'esim.com.mm' },
              { icon: 'E', label: 'info@esim.com.mm' },
              { icon: 'P', label: '09650000172' },
              { icon: 'S', label: '@eSIMMyanmar' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span 
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00FFFF' }}
                >
                  {item.icon}
                </span>
                <span className="text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
