/**
 * IoTDashboard.js - Enterprise IoT-Style Dashboard Widgets
 * 2026 UI/UX Standards with real-time data visualization
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// IoT Widget Component
const IoTWidget = ({ 
  title, 
  value, 
  unit = '', 
  icon, 
  trend = null, 
  status = 'normal',
  onClick 
}) => {
  const statusColors = {
    normal: '#00FFFF',
    warning: '#F59E0B',
    critical: '#EF4444',
    success: '#10B981'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      style={{
        background: 'rgba(248, 249, 250, 0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Status indicator line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${statusColors[status]}, transparent)`,
          opacity: 0.8
        }}
      />

      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#F8F9FA',
          opacity: 0.9
        }}>
          {title}
        </span>
        {icon && (
          <div style={{
            width: '32px',
            height: '32px',
            background: `linear-gradient(135deg, ${statusColors[status]}40, ${statusColors[status]}20)`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: statusColors[status]
          }}>
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{
        fontSize: '32px',
        fontWeight: '800',
        color: statusColors[status],
        marginBottom: '8px',
        textShadow: `0 0 20px ${statusColors[status]}40`
      }}>
        {value}
        {unit && <span style={{ fontSize: '16px', marginLeft: '4px', opacity: 0.7 }}>{unit}</span>}
      </div>

      {/* Trend */}
      {trend !== null && (
        <div style={{
          fontSize: '12px',
          color: trend >= 0 ? '#10B981' : '#EF4444',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>{trend >= 0 ? '+' : ''}{trend}%</span>
          <span style={{ opacity: 0.7 }}>vs last period</span>
        </div>
      )}
    </motion.div>
  );
};

// System Health Indicator
const SystemHealthIndicator = ({ systems }) => {
  return (
    <div style={{
      background: 'rgba(248, 249, 250, 0.08)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '16px',
      padding: '24px'
    }}>
      <h3 style={{ 
        fontSize: '16px', 
        fontWeight: '600', 
        color: '#F8F9FA',
        marginBottom: '20px'
      }}>
        System Health
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {systems.map((system, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: system.status === 'healthy' ? '#10B981' : 
                           system.status === 'warning' ? '#F59E0B' : '#EF4444',
                boxShadow: `0 0 8px ${system.status === 'healthy' ? '#10B981' : 
                           system.status === 'warning' ? '#F59E0B' : '#EF4444'}`
              }} />
              <span style={{ color: '#F8F9FA', fontSize: '14px' }}>{system.name}</span>
            </div>
            <span style={{ 
              color: system.status === 'healthy' ? '#10B981' : 
                     system.status === 'warning' ? '#F59E0B' : '#EF4444',
              fontSize: '12px',
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              {system.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Real-time Activity Feed
const ActivityFeed = ({ activities }) => {
  return (
    <div style={{
      background: 'rgba(248, 249, 250, 0.08)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '16px',
      padding: '24px',
      maxHeight: '400px',
      overflow: 'auto'
    }}>
      <h3 style={{ 
        fontSize: '16px', 
        fontWeight: '600', 
        color: '#F8F9FA',
        marginBottom: '20px'
      }}>
        Recent Activity
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: index < activities.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00FFFF',
              marginTop: '6px',
              flexShrink: 0
            }} />
            <div>
              <p style={{ color: '#F8F9FA', fontSize: '14px', marginBottom: '4px' }}>
                {activity.message}
              </p>
              <span style={{ color: '#00FFFF', fontSize: '12px', opacity: 0.7 }}>
                {activity.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const IoTDashboard = ({ data = {} }) => {
  const [metrics, setMetrics] = useState({
    activeUsers: data.activeUsers || 0,
    activeProfiles: data.activeProfiles || 0,
    dataUsage: data.dataUsage || 0,
    revenue: data.revenue || 0
  });

  const systems = [
    { name: 'API Gateway', status: 'healthy' },
    { name: 'Database Cluster', status: 'healthy' },
    { name: 'SM-DP+ Connection', status: 'healthy' },
    { name: 'Payment Gateway', status: 'healthy' },
    { name: 'CDN', status: 'healthy' }
  ];

  const activities = [
    { message: 'New eSIM profile activated', time: '2 min ago' },
    { message: 'Payment received - Premium 5G Plan', time: '5 min ago' },
    { message: 'User registration completed', time: '8 min ago' },
    { message: 'eSIM transferred to new device', time: '12 min ago' },
    { message: 'Support ticket resolved', time: '15 min ago' }
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <IoTWidget
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          icon={<span>U</span>}
          trend={12.5}
          status="normal"
        />
        <IoTWidget
          title="Active eSIM Profiles"
          value={metrics.activeProfiles.toLocaleString()}
          icon={<span>E</span>}
          trend={8.3}
          status="success"
        />
        <IoTWidget
          title="Data Usage"
          value={metrics.dataUsage.toFixed(1)}
          unit="TB"
          icon={<span>D</span>}
          trend={-2.1}
          status="normal"
        />
        <IoTWidget
          title="Monthly Revenue"
          value={`${(metrics.revenue / 1000000).toFixed(1)}M`}
          unit="MMK"
          icon={<span>R</span>}
          trend={15.7}
          status="success"
        />
      </div>

      {/* Secondary Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <SystemHealthIndicator systems={systems} />
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
};

export { IoTDashboard, IoTWidget, SystemHealthIndicator, ActivityFeed };
export default IoTDashboard;
