import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProfiles: 0,
    revenue: 0,
    supportTickets: 0
  });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Admin Dashboard</span>
          </h1>
          <p className="text-gray-400">Manage users, eSIM profiles, and system settings</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50M+</div>
            <div className="text-gray-400">Total Users</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">45M+</div>
            <div className="text-gray-400">Active eSIMs</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">$2.5M</div>
            <div className="text-gray-400">Monthly Revenue</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">152</div>
            <div className="text-gray-400">Open Tickets</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-secondary text-left">User Management</button>
              <button className="w-full btn-secondary text-left">eSIM Inventory</button>
              <button className="w-full btn-secondary text-left">Payment Management</button>
              <button className="w-full btn-secondary text-left">Analytics</button>
              <button className="w-full btn-secondary text-left">System Logs</button>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">New user registration</span>
                <span className="text-primary">2 min ago</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">eSIM activated</span>
                <span className="text-primary">5 min ago</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Payment received</span>
                <span className="text-primary">10 min ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Support ticket created</span>
                <span className="text-primary">15 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;