import React from 'react';
import { motion } from 'framer-motion';

const PartnerDashboard = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Partner Dashboard</span>
          </h1>
          <p className="text-gray-400">Manage your reseller and affiliate operations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">$12,450</div>
            <div className="text-gray-400">Total Earnings</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">1,234</div>
            <div className="text-gray-400">Referrals</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">892</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">15%</div>
            <div className="text-gray-400">Commission Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h3 className="text-xl font-bold text-white mb-4">Partner Tools</h3>
            <div className="space-y-3">
              <button className="w-full btn-secondary text-left">API Documentation</button>
              <button className="w-full btn-secondary text-left">Affiliate Links</button>
              <button className="w-full btn-secondary text-left">Commission Report</button>
              <button className="w-full btn-secondary text-left">Marketing Materials</button>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-xl font-bold text-white mb-4">Recent Commissions</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Plan activation</span>
                <span className="text-green-400">+$45.00</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">New referral</span>
                <span className="text-green-400">+$25.00</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Top-up</span>
                <span className="text-green-400">+$10.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;