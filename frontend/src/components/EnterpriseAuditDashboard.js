/**
 * EnterpriseAuditDashboard.js - Premium 2026 UI/UX Audit Dashboard
 * Enterprise-grade glassmorphism dashboard matching the design mockup
 * Features: Real-time metrics, charts, entitlement server, seasonal design
 * Zero emoji - Professional enterprise design
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Chart component using canvas for performance
const LineChart = ({ data, color = '#00FFFF', height = 120, animated = true }) => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const h = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, h);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw line
    const padding = 10;
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    
    data.forEach((val, i) => {
      const x = padding + ((width - padding * 2) / (data.length - 1)) * i;
      const y = h - padding - ((val - minVal) / range) * (h - padding * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    
    ctx.stroke();
    
    // Draw glow effect
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = padding + ((width - padding * 2) / (data.length - 1)) * i;
      const y = h - padding - ((val - minVal) / range) * (h - padding * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Draw dots at data points
    ctx.fillStyle = color;
    data.forEach((val, i) => {
      const x = padding + ((width - padding * 2) / (data.length - 1)) * i;
      const y = h - padding - ((val - minVal) / range) * (h - padding * 2);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    
  }, [data, color, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={height}
      style={{
        width: '100%',
        height: `${height}px`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}
    />
  );
};

// Circular progress indicator
const CircularIndicator = ({ value, max, label, size = 100, color = '#00FFFF' }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 38;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="38"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="38"
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: '700', color }}>{Math.round(percentage)}%</span>
        <span style={{ fontSize: '9px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      </div>
    </div>
  );
};

// Glassmorphism Card
const GlassCard = ({ children, className = '', style = {}, hover = true, glow = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
    style={{
      background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.9) 100%)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 255, 255, 0.15)',
      borderRadius: '16px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: glow 
        ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)' 
        : '0 8px 32px rgba(0, 0, 0, 0.2)',
      ...style
    }}
    className={className}
  >
    {/* Top accent line */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent)'
      }}
    />
    {children}
  </motion.div>
);

// Navigation Sidebar Item
const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      background: active ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
      border: 'none',
      borderLeft: active ? '3px solid #00FFFF' : '3px solid transparent',
      borderRadius: '0 8px 8px 0',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'left'
    }}
    onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
    }}
    onMouseLeave={(e) => {
      if (!active) e.currentTarget.style.background = 'transparent';
    }}
  >
    <span style={{ color: active ? '#00FFFF' : '#9CA3AF', fontSize: '14px' }}>{icon}</span>
    <span style={{ color: active ? '#00FFFF' : '#F8F9FA', fontSize: '13px', fontWeight: active ? '600' : '400' }}>{label}</span>
  </button>
);

// Metric Display
const MetricDisplay = ({ label, value, unit, trend, color = '#00FFFF' }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ color: '#9CA3AF', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
      {label}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
      <span style={{ color, fontSize: '28px', fontWeight: '700', textShadow: `0 0 20px ${color}40` }}>
        {value}
      </span>
      {unit && <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{unit}</span>}
    </div>
    {trend !== undefined && (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '4px', 
        marginTop: '6px',
        color: trend >= 0 ? '#10B981' : '#EF4444',
        fontSize: '11px'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={trend >= 0 ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
        </svg>
        <span>{Math.abs(trend)}%</span>
      </div>
    )}
  </div>
);

// Status Badge
const StatusBadge = ({ status, label }) => {
  const colors = {
    online: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', dot: '#10B981' },
    offline: { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', dot: '#EF4444' },
    warning: { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', dot: '#F59E0B' },
    maintenance: { bg: 'rgba(99, 102, 241, 0.15)', text: '#6366F1', dot: '#6366F1' }
  };
  const c = colors[status] || colors.offline;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      background: c.bg,
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.dot }} />
        {status === 'online' && (
          <div style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '50%',
            background: c.dot,
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            opacity: 0.4
          }} />
        )}
      </div>
      <span style={{ color: c.text }}>{label}</span>
    </div>
  );
};

// Main Dashboard Component
const EnterpriseAuditDashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    activeESIMs: 52847,
    dailyActivations: 1284,
    networkUptime: 99.94,
    revenue: 154.08
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample chart data
  const chartData = [35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92];
  const entitlementData = [28, 35, 32, 45, 42, 55, 52, 62, 58, 68];

  const navItems = [
    { id: 'dashboard', icon: 'D', label: 'Dashboard' },
    { id: 'structure', icon: 'S', label: 'Page Structure' },
    { id: 'features', icon: 'F', label: 'Features' },
    { id: 'coverage', icon: 'C', label: 'Coverage' },
    { id: 'operators', icon: 'O', label: 'Operators' },
    { id: 'persistence', icon: 'P', label: 'Persistence' },
    { id: 'handlers', icon: 'H', label: 'Event Handlers' },
    { id: 'screens', icon: 'R', label: 'Screen Routes' },
    { id: 'movements', icon: 'M', label: 'Movements' }
  ];

  return (
    <div
      data-testid="enterprise-audit-dashboard"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)',
        padding: '24px',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ 
            color: '#F8F9FA', 
            fontSize: '28px', 
            fontWeight: '700', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ color: '#00FFFF' }}>2026</span> UI/UX AUDIT
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '13px', margin: '4px 0 0' }}>Enterprise Platform Assessment</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <StatusBadge status="online" label="All Systems Operational" />
          <div style={{
            padding: '10px 18px',
            background: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '10px',
            color: '#00FFFF',
            fontWeight: '600',
            fontSize: '13px'
          }}>
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 320px', gap: '20px' }}>
        
        {/* Left Sidebar - GLASSMORPHS Navigation */}
        <GlassCard style={{ padding: '16px 0' }}>
          <div style={{ padding: '0 16px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h2 style={{ color: '#F8F9FA', fontSize: '14px', fontWeight: '700', letterSpacing: '0.05em', margin: 0 }}>GLASSMORPHS</h2>
            <div style={{ marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Search pages..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#F8F9FA',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            {navItems.map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeNav === item.id}
                onClick={() => setActiveNav(item.id)}
              />
            ))}
          </div>
          <div style={{ padding: '16px', marginTop: 'auto' }}>
            <button
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#1e2f3c',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 255, 255, 0.3)'
              }}
            >
              Run Audit
            </button>
          </div>
        </GlassCard>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Row - Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <GlassCard glow>
              <MetricDisplay label="Active eSIMs" value={metrics.activeESIMs.toLocaleString()} trend={12} />
            </GlassCard>
            <GlassCard glow>
              <MetricDisplay label="Daily Activations" value={metrics.dailyActivations.toLocaleString()} trend={8} color="#10B981" />
            </GlassCard>
            <GlassCard glow>
              <MetricDisplay label="Network Uptime" value={metrics.networkUptime} unit="%" trend={0.1} color="#F59E0B" />
            </GlassCard>
            <GlassCard glow>
              <MetricDisplay label="Revenue" value={metrics.revenue} unit="M MMK" trend={15} color="#8B5CF6" />
            </GlassCard>
          </div>

          {/* Main Chart */}
          <GlassCard style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ color: '#F8F9FA', fontSize: '16px', fontWeight: '600', margin: 0 }}>Platform Analytics 2025-2026</h3>
                <p style={{ color: '#9CA3AF', fontSize: '12px', margin: '4px 0 0' }}>Expression type analysis data</p>
              </div>
              <span style={{ color: '#00FFFF', fontSize: '14px', fontWeight: '700' }}>2026</span>
            </div>
            <LineChart data={chartData} height={180} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 10px' }}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <span key={m} style={{ color: '#6B7280', fontSize: '10px' }}>{m}</span>
              ))}
            </div>
          </GlassCard>

          {/* Entitlement Server Section */}
          <GlassCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#F8F9FA', fontSize: '16px', fontWeight: '700', letterSpacing: '0.05em', margin: 0 }}>ENTITLEMENT SERVER</h3>
              <button style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Chart */}
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '12px' }}>Array Performance Metrics</div>
                <LineChart data={entitlementData} height={100} color="#00FFFF" />
              </div>
              
              {/* Responsiveness Indicator */}
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '12px' }}>Responsiveness Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, #00FFFF, #00CCCC)', borderRadius: '4px' }}
                    />
                  </div>
                  <span style={{ color: '#00FFFF', fontSize: '14px', fontWeight: '700' }}>85%</span>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ color: '#9CA3AF', fontSize: '10px', textTransform: 'uppercase', marginBottom: '8px' }}>Reach Year</div>
                <div style={{ color: '#F8F9FA', fontSize: '24px', fontWeight: '700' }}>12.8</div>
                <div style={{ color: '#6B7280', fontSize: '10px' }}>Million Users</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ color: '#9CA3AF', fontSize: '10px', textTransform: 'uppercase', marginBottom: '8px' }}>Engagement</div>
                <div style={{ color: '#00FFFF', fontSize: '24px', fontWeight: '700' }}>612.04</div>
                <div style={{ color: '#6B7280', fontSize: '10px' }}>Thousand Sessions</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ color: '#9CA3AF', fontSize: '10px', textTransform: 'uppercase', marginBottom: '8px' }}>Success Rate</div>
                <div style={{ color: '#10B981', fontSize: '24px', fontWeight: '700' }}>98.01%</div>
                <div style={{ color: '#6B7280', fontSize: '10px' }}>Session Success</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Holiday Card */}
          <GlassCard glow style={{ textAlign: 'center' }}>
            <div style={{ color: '#00FFFF', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', marginBottom: '8px' }}>SEASON GREETINGS</div>
            <h3 style={{ color: '#F8F9FA', fontSize: '20px', fontWeight: '700', margin: '0 0 4px' }}>Merry Christmas</h3>
            <div style={{ color: '#00FFFF', fontSize: '32px', fontWeight: '800', letterSpacing: '0.05em' }}>2026</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: 'rgba(0, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#00FFFF">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Digital Clock */}
          <GlassCard style={{ textAlign: 'center' }}>
            <div style={{ color: '#9CA3AF', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>System Time</div>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#00FFFF',
              fontFamily: '"SF Mono", "Fira Code", monospace',
              textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              letterSpacing: '0.05em'
            }}>
              {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
            <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '8px' }}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </GlassCard>

          {/* System Health */}
          <GlassCard>
            <h3 style={{ color: '#F8F9FA', fontSize: '14px', fontWeight: '600', margin: '0 0 20px' }}>System Health</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <CircularIndicator value={95} max={100} label="CPU" color="#00FFFF" size={90} />
              <CircularIndicator value={72} max={100} label="Memory" color="#10B981" size={90} />
            </div>
          </GlassCard>

          {/* Provider Stats */}
          <GlassCard>
            <h3 style={{ color: '#F8F9FA', fontSize: '14px', fontWeight: '600', margin: '0 0 16px' }}>Provider Distribution</h3>
            {[
              { name: 'MPT', value: 35, color: '#FFD700' },
              { name: 'ATOM', value: 27, color: '#FF6B35' },
              { name: 'MYTEL', value: 22, color: '#00A651' },
              { name: 'U9', value: 16, color: '#9B59B6' }
            ].map(provider => (
              <div key={provider.name} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#F8F9FA', fontSize: '12px' }}>{provider.name}</span>
                  <span style={{ color: provider.color, fontSize: '12px', fontWeight: '600' }}>{provider.value}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${provider.value}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ height: '100%', background: provider.color, borderRadius: '3px' }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        input::placeholder {
          color: #6B7280;
        }
        
        input:focus {
          border-color: rgba(0, 255, 255, 0.4);
          box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.1);
        }
        
        @media (max-width: 1200px) {
          [data-testid="enterprise-audit-dashboard"] > div:nth-child(2) {
            grid-template-columns: 200px 1fr !important;
          }
          [data-testid="enterprise-audit-dashboard"] > div:nth-child(2) > div:last-child {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          [data-testid="enterprise-audit-dashboard"] > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          [data-testid="enterprise-audit-dashboard"] > div:nth-child(2) > div:first-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EnterpriseAuditDashboard;
