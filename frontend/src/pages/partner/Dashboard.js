/**
 * Partner Dashboard - Affiliate/Reseller Management
 * MPT, ATOM, U9, MYTEL eSIM Partner Portal
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PROVIDERS = [
  { id: 'MPT', name: 'MPT', color: '#FFD700', sales: 456, commission: 15 },
  { id: 'ATOM', name: 'ATOM', color: '#FF6B35', sales: 312, commission: 12 },
  { id: 'U9', name: 'U9', color: '#9B59B6', sales: 189, commission: 12 },
  { id: 'MYTEL', name: 'MYTEL', color: '#00A651', sales: 277, commission: 14 }
];

const RECENT_SALES = [
  { id: 1, provider: 'MPT', phone: '09*****234', amount: 120000, commission: 18000, date: '2025-12-22' },
  { id: 2, provider: 'ATOM', phone: '094****567', amount: 120000, commission: 14400, date: '2025-12-22' },
  { id: 3, provider: 'U9', phone: '094****890', amount: 120000, commission: 14400, date: '2025-12-21' },
  { id: 4, provider: 'MYTEL', phone: '096****123', amount: 120000, commission: 16800, date: '2025-12-21' },
  { id: 5, provider: 'MPT', phone: '097****456', amount: 120000, commission: 18000, date: '2025-12-20' }
];

const PartnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const totalSales = PROVIDERS.reduce((sum, p) => sum + p.sales, 0);
  const totalEarnings = RECENT_SALES.reduce((sum, s) => sum + s.commission, 0);

  return (
    <div className="min-h-screen py-20" style={{ background: 'linear-gradient(180deg, #1e2f3c 0%, #162430 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span style={{ color: '#00FFFF' }}>Partner Dashboard</span>
          </h1>
          <p style={{ color: '#9CA3AF' }}>Manage your eSIM reseller operations - MPT, ATOM, U9, MYTEL</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#00FFFF' }}>
              {totalSales.toLocaleString()}
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '14px' }}>Total Sales</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#00FFFF' }}>
              {(totalEarnings / 1000).toFixed(0)}K MMK
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '14px' }}>This Month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#00FFFF' }}>4</div>
            <div style={{ color: '#9CA3AF', fontSize: '14px' }}>Providers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#10B981' }}>Active</div>
            <div style={{ color: '#9CA3AF', fontSize: '14px' }}>Status</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['overview', 'providers', 'sales', 'tools'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: activeTab === tab ? '#00FFFF' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === tab ? '#1e2f3c' : '#F8F9FA',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Provider Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <h3 style={{ color: '#F8F9FA', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
                Provider Performance
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {PROVIDERS.map((provider) => (
                  <div key={provider.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: provider.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        color: '#1e2f3c',
                        fontSize: '12px'
                      }}
                    >
                      {provider.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: '#F8F9FA', fontWeight: '600' }}>{provider.name}</span>
                        <span style={{ color: '#00FFFF' }}>{provider.sales} sales</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${(provider.sales / 500) * 100}%`,
                            background: provider.color,
                            borderRadius: '3px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Sales */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <h3 style={{ color: '#F8F9FA', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
                Recent Sales
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {RECENT_SALES.slice(0, 5).map((sale) => (
                  <div
                    key={sale.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div>
                      <div style={{ color: '#F8F9FA', fontWeight: '600' }}>{sale.provider}</div>
                      <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{sale.phone}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#10B981', fontWeight: '600' }}>
                        +{sale.commission.toLocaleString()} MMK
                      </div>
                      <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{sale.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'providers' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROVIDERS.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${provider.color}`,
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: provider.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontWeight: '800',
                    color: '#1e2f3c',
                    fontSize: '18px'
                  }}
                >
                  {provider.id}
                </div>
                <h3 style={{ color: '#F8F9FA', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                  {provider.name}
                </h3>
                <div style={{ color: '#00FFFF', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                  {provider.sales}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '12px' }}>Total Sales</div>
                <div
                  style={{
                    background: 'rgba(0, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#00FFFF',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  {provider.commission}% Commission
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'sales' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 255, 255, 0.1)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '600' }}>Provider</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '600' }}>Phone</th>
                  <th style={{ padding: '16px', textAlign: 'right', color: '#00FFFF', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '16px', textAlign: 'right', color: '#00FFFF', fontWeight: '600' }}>Commission</th>
                  <th style={{ padding: '16px', textAlign: 'right', color: '#00FFFF', fontWeight: '600' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_SALES.map((sale) => (
                  <tr key={sale.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '16px', color: '#F8F9FA', fontWeight: '600' }}>{sale.provider}</td>
                    <td style={{ padding: '16px', color: '#9CA3AF' }}>{sale.phone}</td>
                    <td style={{ padding: '16px', textAlign: 'right', color: '#F8F9FA' }}>
                      {sale.amount.toLocaleString()} MMK
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right', color: '#10B981', fontWeight: '600' }}>
                      +{sale.commission.toLocaleString()} MMK
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right', color: '#9CA3AF' }}>{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <h3 style={{ color: '#F8F9FA', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
                Partner Tools
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['API Documentation', 'Affiliate Links', 'Commission Report', 'Marketing Materials'].map((tool) => (
                  <button
                    key={tool}
                    style={{
                      padding: '14px 20px',
                      borderRadius: '8px',
                      background: 'rgba(0, 255, 255, 0.1)',
                      border: '1px solid rgba(0, 255, 255, 0.2)',
                      color: '#F8F9FA',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <h3 style={{ color: '#F8F9FA', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
                Your Referral Link
              </h3>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '14px',
                  marginBottom: '16px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: '#00FFFF',
                  wordBreak: 'break-all'
                }}
              >
                https://esim-myanmar-ia6gw.web.app/esim-register?ref=PARTNER123
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                  border: 'none',
                  color: '#1e2f3c',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Copy Link
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDashboard;
