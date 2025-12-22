/**
 * Partners.js - Public Partner Program Landing Page
 * MPT, ATOM, U9, MYTEL eSIM Reseller/Affiliate Program
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BENEFITS = [
  {
    title: 'High Commissions',
    description: 'Earn up to 15% commission on every eSIM activation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
  {
    title: '4 Providers',
    description: 'Sell MPT, ATOM, U9, and MYTEL eSIM plans',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    )
  },
  {
    title: 'Real-time Dashboard',
    description: 'Track sales, commissions, and referrals instantly',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )
  },
  {
    title: 'API Access',
    description: 'Integrate eSIM sales into your own platform',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    title: 'Marketing Support',
    description: 'Access banners, landing pages, and promotional materials',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  },
  {
    title: 'Fast Payouts',
    description: 'Weekly payouts via KBZ Pay, Wave Money, or bank transfer',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    )
  }
];

const COMMISSION_TIERS = [
  { provider: 'MPT', rate: '15%', color: '#FFD700', perSale: '18,000 MMK' },
  { provider: 'ATOM', rate: '12%', color: '#FF6B35', perSale: '14,400 MMK' },
  { provider: 'U9', rate: '12%', color: '#9B59B6', perSale: '14,400 MMK' },
  { provider: 'MYTEL', rate: '14%', color: '#00A651', perSale: '16,800 MMK' }
];

const Partners = () => {
  return (
    <div style={{ background: 'linear-gradient(180deg, #1e2f3c 0%, #162430 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: 'rgba(0, 255, 255, 0.1)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                borderRadius: '20px',
                color: '#00FFFF',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              Partner Program
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: '800',
              color: '#F8F9FA',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}
          >
            Become an <span style={{ color: '#00FFFF' }}>eSIM Partner</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: '#9CA3AF',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}
          >
            Join our partner network and earn commissions selling MPT, ATOM, U9, and MYTEL eSIM plans. 
            Perfect for resellers, affiliates, and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              to="/register"
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                borderRadius: '12px',
                color: '#1e2f3c',
                fontWeight: '700',
                fontSize: '16px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)'
              }}
            >
              Apply Now
            </Link>
            <Link
              to="/login"
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                borderRadius: '12px',
                color: '#00FFFF',
                fontWeight: '700',
                fontSize: '16px',
                textDecoration: 'none'
              }}
            >
              Partner Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Commission Rates */}
      <section style={{ padding: '60px 20px', background: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#F8F9FA',
              textAlign: 'center',
              marginBottom: '48px'
            }}
          >
            Commission Rates
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {COMMISSION_TIERS.map((tier, index) => (
              <motion.div
                key={tier.provider}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${tier.color}`,
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: tier.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontWeight: '800',
                    color: '#1e2f3c',
                    fontSize: '20px'
                  }}
                >
                  {tier.provider}
                </div>
                <div style={{ fontSize: '48px', fontWeight: '800', color: tier.color, marginBottom: '8px' }}>
                  {tier.rate}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '16px' }}>
                  Commission Rate
                </div>
                <div
                  style={{
                    background: 'rgba(0, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#00FFFF',
                    fontWeight: '600'
                  }}
                >
                  {tier.perSale} per sale
                </div>
              </motion.div>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: '#6B7280', marginTop: '24px', fontSize: '14px' }}>
            Based on eSIM activation price of 120,000 MMK
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#F8F9FA',
              textAlign: 'center',
              marginBottom: '48px'
            }}
          >
            Partner Benefits
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '28px'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: 'rgba(0, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  {benefit.icon}
                </div>
                <h3 style={{ color: '#F8F9FA', fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>
                  {benefit.title}
                </h3>
                <p style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: '1.6' }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '60px 20px', background: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#F8F9FA',
              textAlign: 'center',
              marginBottom: '48px'
            }}
          >
            How It Works
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { step: '1', title: 'Apply', desc: 'Submit your partner application with business details' },
              { step: '2', title: 'Get Approved', desc: 'Our team reviews and approves within 24-48 hours' },
              { step: '3', title: 'Access Dashboard', desc: 'Get your unique referral links and marketing materials' },
              { step: '4', title: 'Start Selling', desc: 'Promote eSIM plans and track your sales in real-time' },
              { step: '5', title: 'Earn Commissions', desc: 'Receive weekly payouts for all successful activations' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '24px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    color: '#1e2f3c',
                    fontSize: '20px',
                    flexShrink: 0
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 style={{ color: '#F8F9FA', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#9CA3AF', fontSize: '14px' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#F8F9FA',
              marginBottom: '20px'
            }}
          >
            Ready to Start Earning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              color: '#9CA3AF',
              fontSize: '16px',
              marginBottom: '32px'
            }}
          >
            Join hundreds of partners already earning with eSIM Myanmar
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/register"
              style={{
                display: 'inline-block',
                padding: '18px 48px',
                background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                borderRadius: '12px',
                color: '#1e2f3c',
                fontWeight: '700',
                fontSize: '18px',
                textDecoration: 'none',
                boxShadow: '0 4px 30px rgba(0, 255, 255, 0.4)'
              }}
            >
              Become a Partner
            </Link>
          </motion.div>
          <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '20px' }}>
            Contact: info@esim.com.mm
          </p>
        </div>
      </section>
    </div>
  );
};

export default Partners;
