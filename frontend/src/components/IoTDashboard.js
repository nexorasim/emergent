/**
 * IoTDashboard.js - Premium Enterprise IoT-Style Dashboard
 * Real-time metrics display with glassmorphism design
 * Carrier-grade telemetry visualization
 * Zero emoji - Professional enterprise design
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated counter hook with easing
const useAnimatedCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const startTime = useRef(null);
  const animationFrame = useRef(null);
  
  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [end, duration]);
  
  return count;
};

// Circular Progress Component with glow effect
const CircularProgress = ({ value, max, label, color = '#00FFFF', size = 120 }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="42"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle with animation */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="42"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ 
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 8px ${color}50)`
          }}
        />
        {/* Glow overlay */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="42"
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ 
            strokeDasharray: circumference,
            opacity: 0.15
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color, textShadow: `0 0 20px ${color}40` }}>
          {Math.round(percentage)}%
        </span>
        <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
};

// Metric Card Component with premium styling
const MetricCard = ({ title, value, unit, icon, trend, color = '#00FFFF', delay = 0 }) => {
  const animatedValue = useAnimatedCounter(parseInt(value) || 0, 2000);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.6
        }}
      />
      
      {/* Corner decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '80px',
          background: `radial-gradient(circle at top right, ${color}15 0%, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{title}</p>
          <div className="flex items-baseline gap-1">
            <span 
              className="text-3xl font-bold"
              style={{ color, textShadow: `0 0 20px ${color}40` }}
            >
              {typeof value === 'number' ? animatedValue.toLocaleString() : value}
            </span>
            {unit && <span className="text-gray-400 text-sm ml-1">{unit}</span>}
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-3 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={trend >= 0 ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} 
                />
              </svg>
              <span className="font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div 
          className="text-4xl opacity-30 font-bold"
          style={{ color }}
        >
          {icon}
        </div>
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
  const statusColor = colors[status] || colors.offline;
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: statusColor }}
        />
        {status === 'online' && (
          <div 
            className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: statusColor, opacity: 0.4 }}
          />
        )}
      </div>
      <span className="text-sm text-gray-300 font-medium">{label}</span>
    </div>
  );
};

// Network Status Widget
const NetworkStatusWidget = () => {
  const networks = [
    { name: 'MPT 5G', status: 'online', latency: '12ms', coverage: 95, color: '#FFD700' },
    { name: 'ATOM LTE', status: 'online', latency: '18ms', coverage: 88, color: '#FF6B35' },
    { name: 'MYTEL 5G', status: 'online', latency: '14ms', coverage: 91, color: '#00A651' },
    { name: 'U9 Network', status: 'online', latency: '15ms', coverage: 82, color: '#9B59B6' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '20px'
      }}
    >
      <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
        Network Status
      </h3>
      <div className="space-y-3">
        {networks.map((network, index) => (
          <motion.div
            key={network.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: `${network.color}20`, color: network.color }}
              >
                {network.name.charAt(0)}
              </div>
              <div>
                <StatusIndicator status={network.status} label={network.name} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm font-mono">{network.latency}</span>
              <div className="w-20">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: network.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${network.coverage}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1 block text-right">{network.coverage}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Real-time Activity Feed
const ActivityFeed = () => {
  const activities = [
    { id: 1, type: 'activation', message: 'eSIM activated for iPhone 15 Pro', time: '2 min ago', icon: 'A', color: '#00FFFF' },
    { id: 2, type: 'payment', message: 'Payment received - 120,000 MMK', time: '5 min ago', icon: 'P', color: '#10B981' },
    { id: 3, type: 'transfer', message: 'eSIM transferred to new device', time: '12 min ago', icon: 'T', color: '#8B5CF6' },
    { id: 4, type: 'registration', message: 'New user registration completed', time: '18 min ago', icon: 'R', color: '#F59E0B' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '20px'
      }}
    >
      <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          >
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: `${activity.color}15`, color: activity.color }}
            >
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main IoT Dashboard Component
const IoTDashboard = ({ compact = false }) => {
  const metrics = [
    { title: 'Active eSIMs', value: 52847, unit: '', icon: 'S', trend: 12, color: '#00FFFF' },
    { title: 'Daily Activations', value: 1284, unit: '', icon: 'A', trend: 8, color: '#10B981' },
    { title: 'Network Uptime', value: '99.9', unit: '%', icon: 'U', trend: 0.1, color: '#F59E0B' },
    { title: 'Revenue Today', value: 154, unit: 'M MMK', icon: 'R', trend: 15, color: '#8B5CF6' }
  ];
  
  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} delay={index * 0.1} />
        ))}
      </div>
    );
  }
  
  return (
    <div 
      className="space-y-6 p-6 min-h-screen"
      style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)' }}
      data-testid="iot-dashboard"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">IoT Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">Real-time platform telemetry</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusIndicator status="online" label="All Systems Operational" />
          <div 
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ 
              background: 'rgba(0, 255, 255, 0.1)', 
              border: '1px solid rgba(0, 255, 255, 0.3)',
              color: '#00FFFF'
            }}
          >
            {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} delay={index * 0.1} />
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '20px'
          }}
        >
          <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            System Health
          </h3>
          <div className="flex justify-around">
            <CircularProgress value={95} max={100} label="CPU" color="#00FFFF" />
            <CircularProgress value={72} max={100} label="Memory" color="#10B981" />
            <CircularProgress value={45} max={100} label="Storage" color="#F59E0B" />
          </div>
        </motion.div>
        
        {/* Network Status */}
        <NetworkStatusWidget />
        
        {/* Activity Feed */}
        <ActivityFeed />
      </div>
      
      {/* Provider Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 255, 255, 0.15)',
          borderRadius: '16px',
          padding: '24px'
        }}
      >
        <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Provider Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'MPT', count: 18420, percentage: 35, color: '#FFD700' },
            { name: 'ATOM', count: 14280, percentage: 27, color: '#FF6B35' },
            { name: 'MYTEL', count: 10300, percentage: 22, color: '#00A651' },
            { name: 'U9', count: 9847, percentage: 16, color: '#9B59B6' }
          ].map((provider, index) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center p-5 rounded-xl"
              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
            >
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: `${provider.color}20`, color: provider.color }}
              >
                {provider.name[0]}
              </div>
              <p className="text-white font-semibold text-sm">{provider.name}</p>
              <p 
                className="text-2xl font-bold my-1"
                style={{ color: provider.color, textShadow: `0 0 20px ${provider.color}40` }}
              >
                {provider.count.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Active eSIMs ({provider.percentage}%)</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default IoTDashboard;
