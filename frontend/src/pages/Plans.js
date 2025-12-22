/**
 * PlansPage.js - Premium eSIM Plans
 * ESIM MYANMAR COMPANY LIMITED
 * Zero emoji - Professional enterprise design
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../utils/api';

// Default plans if API fails
const DEFAULT_PLANS = [
  {
    plan_id: 'basic',
    name: 'Basic',
    price: 15000,
    currency: 'MMK',
    data_gb: 5,
    validity_days: 30,
    features: ['5G Network Access', 'VoLTE Enabled', 'Myanmar Coverage', '24/7 Support'],
    popular: false
  },
  {
    plan_id: 'standard',
    name: 'Standard',
    price: 35000,
    currency: 'MMK',
    data_gb: 15,
    validity_days: 30,
    features: ['5G Network Access', 'VoLTE Enabled', 'ASEAN Roaming', 'Priority Support', 'Multi-device'],
    popular: true
  },
  {
    plan_id: 'premium',
    name: 'Premium',
    price: 75000,
    currency: 'MMK',
    data_gb: 50,
    validity_days: 30,
    features: ['5G Network Access', 'VoLTE Enabled', 'Global Roaming 190+ Countries', 'Dedicated Support', 'Multi-device', 'Entertainment Bundle'],
    popular: false
  },
  {
    plan_id: 'enterprise',
    name: 'Enterprise',
    price: 150000,
    currency: 'MMK',
    data_gb: 100,
    validity_days: 30,
    features: ['5G Network Access', 'VoLTE Enabled', 'Global Roaming Unlimited', 'Account Manager', 'Unlimited Devices', 'Full Entertainment Suite', 'SLA 99.9%'],
    popular: false
  }
];

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/plans');
        if (response.data?.plans?.length > 0) {
          setPlans(response.data.plans);
        } else {
          setPlans(DEFAULT_PLANS);
        }
      } catch (error) {
        console.error('Using default plans');
        setPlans(DEFAULT_PLANS);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 100%)' }}
        role="status" 
        aria-label="Loading plans"
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full animate-spin"
            style={{ border: '3px solid rgba(0, 255, 255, 0.2)', borderTopColor: '#00FFFF' }}
          />
          <p className="text-gray-400">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 sm:py-16 lg:py-20"
      style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)' }}
      data-testid="plans-page"
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
            Pricing Plans
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span 
              style={{ 
                background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Choose Your Plan
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Flexible eSIM plans for every need. All plans include 5G, VoLTE, and premium support.
          </p>

          {/* Period Toggle */}
          <div className="flex justify-center mt-8 gap-2">
            {['monthly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  background: selectedPeriod === period ? 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedPeriod === period ? '#1e2f3c' : '#9CA3AF',
                  border: selectedPeriod === period ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {period === 'monthly' ? 'Monthly' : 'Yearly (Save 20%)'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.plan_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold z-10"
                  style={{ background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)', color: '#1e2f3c' }}
                >
                  Most Popular
                </div>
              )}
              <div 
                className="h-full rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: plan.popular 
                    ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.12) 0%, rgba(30, 47, 60, 0.95) 100%)' 
                    : 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: plan.popular ? '2px solid rgba(0, 255, 255, 0.4)' : '1px solid rgba(0, 255, 255, 0.15)',
                  boxShadow: plan.popular ? '0 8px 40px rgba(0, 255, 255, 0.15)' : '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span 
                    className="text-4xl sm:text-5xl font-bold"
                    style={{ color: '#00FFFF', textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
                  >
                    {(selectedPeriod === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price).toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm ml-2">{plan.currency}</span>
                  <p className="text-xs text-gray-500 mt-1">
                    {plan.validity_days} days {selectedPeriod === 'yearly' ? '(billed yearly)' : ''}
                  </p>
                </div>
                <div 
                  className="py-4 mb-6 rounded-xl"
                  style={{ background: 'rgba(0, 255, 255, 0.08)' }}
                >
                  <p className="text-3xl font-bold text-white">{plan.data_gb} GB</p>
                  <p className="text-xs text-gray-400 mt-1">High-speed 5G Data</p>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00FFFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/esim-register?plan=${plan.plan_id}`}
                  className="block w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)' 
                      : 'rgba(255, 255, 255, 0.08)',
                    color: plan.popular ? '#1e2f3c' : '#F8F9FA',
                    border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                  data-testid={`plan-${plan.plan_id}-btn`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20"
        >
          <div 
            className="rounded-2xl p-8 sm:p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
              border: '1px solid rgba(0, 255, 255, 0.15)'
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">All Plans Include</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '5G', label: '5G Network', desc: 'Ultra-fast speeds' },
                { icon: 'V', label: 'VoLTE', desc: 'HD voice quality' },
                { icon: 'S', label: '24/7 Support', desc: 'Always available' },
                { icon: 'Q', label: 'Instant QR', desc: 'Quick activation' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-xl font-bold"
                    style={{ background: 'rgba(0, 255, 255, 0.15)', color: '#00FFFF' }}
                  >
                    {item.icon}
                  </div>
                  <h4 className="text-white font-semibold text-sm">{item.label}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlansPage;
