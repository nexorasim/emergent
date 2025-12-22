/**
 * IoTDashboard.js - Enterprise IoT-Style Dashboard Widgets
 * Real-time metrics display with glassmorphism design
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animated counter hook
const useAnimatedCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
};

// Circular Progress Component
const CircularProgress = ({ value, max, label, color = '#00FFFF', size = 120 }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{Math.round(percentage)}%</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, unit, icon, trend, color = '#00FFFF' }) => {
  const animatedValue = useAnimatedCounter(parseInt(value) || 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10" style={{ background: color }}>
        <div className="w-full h-full rounded-bl-full" />
      </div>
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold" style={{ color }}>
              {typeof value === 'number' ? animatedValue.toLocaleString() : value}
            </span>
            {unit && <span className="text-gray-400 text-sm">{unit}</span>}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={trend > 0 ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
              </svg>
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className="text-3xl opacity-50">{icon}</div>
      </div>
    </motion.div>
  );
};

// Status Indicator Component
const StatusIndicator = ({ status, label }) => {
  const colors = {
    online: '#10B981',
    offline: '#EF4444',
    warning: '#F59E0B',
    maintenance: '#6366F1'
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: colors[status] || colors.offline }}
        />
        {status === 'online' && (
          <div 
            className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: colors[status], opacity: 0.5 }}
          />
        )}
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
};

// Network Status Widget
const NetworkStatusWidget = () => {
  const networks = [
    { name: 'MPT 5G', status: 'online', latency: '12ms', coverage: 95 },
    { name: 'ATOM LTE', status: 'online', latency: '18ms', coverage: 88 },
    { name: 'U9 Network', status: 'online', latency: '15ms', coverage: 82 },
    { name: 'MYTEL 5G', status: 'online', latency: '14ms', coverage: 91 }
  ];
  
  return (
    <div className="glass-card">
      <h3 className="text-lg font-semibold text-white mb-4">Network Status</h3>
      <div className="space-y-4">
        {networks.map((network, index) => (
          <motion.div
            key={network.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <StatusIndicator status={network.status} label={network.name} />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">{network.latency}</span>
              <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: '#00FFFF' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${network.coverage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Real-time Activity Feed
const ActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'activation', message: 'eSIM activated for iPhone 15 Pro', time: '2 min ago', icon: 'A' },
    { id: 2, type: 'payment', message: 'Payment received - 120,000 MMK', time: '5 min ago', icon: 'P' },
    { id: 3, type: 'transfer', message: 'eSIM transferred to new device', time: '12 min ago', icon: 'T' },
    { id: 4, type: 'registration', message: 'New user registration completed', time: '18 min ago', icon: 'R' }
  ]);
  
  return (
    <div className="glass-card">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 bg-white/5 rounded-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main IoT Dashboard Component
const IoTDashboard = ({ compact = false }) => {
  const metrics = [
    { title: 'Active eSIMs', value: 52847, unit: '', icon: 'S', trend: 12, color: '#00FFFF' },
    { title: 'Daily Activations', value: 1284, unit: '', icon: 'A', trend: 8, color: '#10B981' },
    { title: 'Network Uptime', value: '99.9', unit: '%', icon: 'U', trend: 0.1, color: '#F59E0B' },
    { title: 'Revenue Today', value: 154080000, unit: 'MMK', icon: 'R', trend: 15, color: '#8B5CF6' }
  ];
  
  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">IoT Dashboard</h2>
          <p className="text-gray-400">Real-time platform metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="online" label="All Systems Operational" />
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circular Progress Cards */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="flex justify-around">
            <CircularProgress value={95} max={100} label="CPU" color="#00FFFF" />
            <CircularProgress value={72} max={100} label="Memory" color="#10B981" />
            <CircularProgress value={45} max={100} label="Storage" color="#F59E0B" />
          </div>
        </div>
        
        {/* Network Status */}
        <NetworkStatusWidget />
        
        {/* Activity Feed */}
        <ActivityFeed />
      </div>
      
      {/* Provider Stats */}
      <div className="glass-card">
        <h3 className="text-lg font-semibold text-white mb-4">Provider Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'MPT', count: 18420, color: '#FFD700' },
            { name: 'ATOM', count: 14280, color: '#FF6B35' },
            { name: 'U9', count: 9847, color: '#9B59B6' },
            { name: 'MYTEL', count: 10300, color: '#00A651' }
          ].map((provider, index) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-white/5 rounded-xl"
            >
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: provider.color + '20', color: provider.color }}
              >
                {provider.name[0]}
              </div>
              <p className="text-white font-semibold">{provider.name}</p>
              <p className="text-2xl font-bold" style={{ color: provider.color }}>
                {provider.count.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Active eSIMs</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IoTDashboard;
