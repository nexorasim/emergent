import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/plans');
      setPlans(response.data.plans);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading plans">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">Choose Your Plan</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto">
            Flexible eSIM plans for every need. All plans include 5G, VoLTE, and roaming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.plan_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card card-hover text-center"
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">{plan.name}</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">{plan.price.toLocaleString()}</span>
                <span className="text-sm sm:text-base text-gray-400 ml-2">{plan.currency}</span>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">{plan.validity_days} days</p>
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="text-2xl sm:text-3xl font-bold text-white">{plan.data_gb} GB</p>
                <p className="text-xs sm:text-sm text-gray-400">High-speed data</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-center justify-center gap-2">
                    <span className="text-primary font-bold">-</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansPage;