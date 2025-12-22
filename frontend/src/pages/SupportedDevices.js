/**
 * Supported Devices Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant - Device Compatibility Matrix
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SupportedDevices = () => {
  const [activeTab, setActiveTab] = useState('apple');

  const devices = {
    apple: {
      title: 'Apple Devices',
      items: [
        { name: 'iPhone 15 Pro Max', esim: true, dualSim: true, fiveG: true, notes: 'eSIM only (no physical SIM)' },
        { name: 'iPhone 15 Pro', esim: true, dualSim: true, fiveG: true, notes: 'eSIM only (no physical SIM)' },
        { name: 'iPhone 15 Plus', esim: true, dualSim: true, fiveG: true, notes: 'eSIM only (no physical SIM)' },
        { name: 'iPhone 15', esim: true, dualSim: true, fiveG: true, notes: 'eSIM only (no physical SIM)' },
        { name: 'iPhone 14 Pro Max', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'iPhone 14 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'iPhone 14 Plus', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'iPhone 14', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'iPhone 13 Series', esim: true, dualSim: true, fiveG: true, notes: 'All models supported' },
        { name: 'iPhone 12 Series', esim: true, dualSim: true, fiveG: true, notes: 'All models supported' },
        { name: 'iPhone 11 Series', esim: true, dualSim: true, fiveG: false, notes: '4G LTE only' },
        { name: 'iPhone XS / XS Max', esim: true, dualSim: true, fiveG: false, notes: 'First eSIM iPhones' },
        { name: 'iPhone XR', esim: true, dualSim: true, fiveG: false, notes: '4G LTE only' },
        { name: 'iPad Pro (2022+)', esim: true, dualSim: false, fiveG: true, notes: 'Wi-Fi + Cellular models' },
        { name: 'iPad Air (2022+)', esim: true, dualSim: false, fiveG: true, notes: 'Wi-Fi + Cellular models' },
        { name: 'iPad (10th gen)', esim: true, dualSim: false, fiveG: true, notes: 'Wi-Fi + Cellular models' },
        { name: 'Apple Watch Series 9', esim: true, dualSim: false, fiveG: false, notes: 'GPS + Cellular models' },
        { name: 'Apple Watch Ultra 2', esim: true, dualSim: false, fiveG: false, notes: 'GPS + Cellular models' },
        { name: 'Apple Watch SE (2nd)', esim: true, dualSim: false, fiveG: false, notes: 'GPS + Cellular models' }
      ]
    },
    samsung: {
      title: 'Samsung Devices',
      items: [
        { name: 'Galaxy S24 Ultra', esim: true, dualSim: true, fiveG: true, notes: 'Dual SIM + eSIM' },
        { name: 'Galaxy S24+', esim: true, dualSim: true, fiveG: true, notes: 'Dual SIM + eSIM' },
        { name: 'Galaxy S24', esim: true, dualSim: true, fiveG: true, notes: 'Dual SIM + eSIM' },
        { name: 'Galaxy S23 Series', esim: true, dualSim: true, fiveG: true, notes: 'All models supported' },
        { name: 'Galaxy S22 Series', esim: true, dualSim: true, fiveG: true, notes: 'All models supported' },
        { name: 'Galaxy S21 Series', esim: true, dualSim: true, fiveG: true, notes: 'All models supported' },
        { name: 'Galaxy S20 Series', esim: true, dualSim: true, fiveG: true, notes: 'All models supported' },
        { name: 'Galaxy Z Fold 5', esim: true, dualSim: true, fiveG: true, notes: 'Foldable with eSIM' },
        { name: 'Galaxy Z Flip 5', esim: true, dualSim: true, fiveG: true, notes: 'Foldable with eSIM' },
        { name: 'Galaxy Z Fold 4', esim: true, dualSim: true, fiveG: true, notes: 'Foldable with eSIM' },
        { name: 'Galaxy Z Flip 4', esim: true, dualSim: true, fiveG: true, notes: 'Foldable with eSIM' },
        { name: 'Galaxy Note 20 Series', esim: true, dualSim: true, fiveG: true, notes: 'All models supported' },
        { name: 'Galaxy Watch 6 Series', esim: true, dualSim: false, fiveG: false, notes: 'LTE models only' },
        { name: 'Galaxy Watch 5 Series', esim: true, dualSim: false, fiveG: false, notes: 'LTE models only' }
      ]
    },
    google: {
      title: 'Google Pixel',
      items: [
        { name: 'Pixel 8 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 8', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 7 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 7', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 7a', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 6 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 6', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 6a', esim: true, dualSim: true, fiveG: true, notes: 'Dual eSIM support' },
        { name: 'Pixel 5', esim: true, dualSim: true, fiveG: true, notes: 'First 5G Pixel' },
        { name: 'Pixel 4 / 4 XL', esim: true, dualSim: true, fiveG: false, notes: '4G LTE only' },
        { name: 'Pixel 3 / 3 XL', esim: true, dualSim: false, fiveG: false, notes: 'First eSIM Pixel' },
        { name: 'Pixel Watch 2', esim: true, dualSim: false, fiveG: false, notes: 'LTE models only' },
        { name: 'Pixel Watch', esim: true, dualSim: false, fiveG: false, notes: 'LTE models only' }
      ]
    },
    other: {
      title: 'Other Brands',
      items: [
        { name: 'Huawei P40 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Select regions' },
        { name: 'Huawei Mate 40 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Select regions' },
        { name: 'Motorola Razr (2023)', esim: true, dualSim: true, fiveG: true, notes: 'Foldable with eSIM' },
        { name: 'Motorola Edge 40 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Dual SIM + eSIM' },
        { name: 'OnePlus 12', esim: true, dualSim: true, fiveG: true, notes: 'Select regions' },
        { name: 'OnePlus 11', esim: true, dualSim: true, fiveG: true, notes: 'Select regions' },
        { name: 'Xiaomi 14 Pro', esim: true, dualSim: true, fiveG: true, notes: 'China/Global variants' },
        { name: 'Xiaomi 13 Pro', esim: true, dualSim: true, fiveG: true, notes: 'China/Global variants' },
        { name: 'OPPO Find X6 Pro', esim: true, dualSim: true, fiveG: true, notes: 'Select regions' },
        { name: 'Sony Xperia 1 V', esim: true, dualSim: true, fiveG: true, notes: 'Dual SIM + eSIM' }
      ]
    }
  };

  const tabs = [
    { id: 'apple', label: 'Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'google', label: 'Google' },
    { id: 'other', label: 'Other Brands' }
  ];

  return (
    <div className="min-h-screen py-20" style={{ background: '#1e2f3c' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl md:text-5xl font-extrabold mb-6"
            style={{ color: '#F8F9FA' }}
          >
            Supported <span style={{ color: '#00FFFF' }}>Devices</span>
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'rgba(248, 249, 250, 0.8)', lineHeight: '1.75' }}
          >
            Check if your device supports eSIM technology. Our platform works with 
            hundreds of devices from major manufacturers.
          </p>
        </motion.header>

        {/* Quick Check Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div 
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: '#F8F9FA' }}
            >
              How to Check eSIM Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#00FFFF' }}>iPhone / iPad</h3>
                <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '16px' }}>
                  Settings &gt; General &gt; About &gt; Look for "EID" number
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#00FFFF' }}>Android</h3>
                <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '16px' }}>
                  Settings &gt; About Phone &gt; SIM Status &gt; Look for "EID"
                </p>
              </div>
            </div>
            <p 
              className="mt-4 text-sm"
              style={{ color: 'rgba(248, 249, 250, 0.6)' }}
            >
              If you see an EID (32-digit number), your device supports eSIM.
            </p>
          </div>
        </motion.section>

        {/* Tabs */}
        <div 
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Device categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
              style={{
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)' 
                  : 'rgba(248, 249, 250, 0.1)',
                color: activeTab === tab.id ? '#1e2f3c' : '#F8F9FA',
                minHeight: '48px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Device Table */}
        <motion.section
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={activeTab}
        >
          <h2 
            className="text-2xl font-bold mb-6"
            style={{ color: '#F8F9FA' }}
          >
            {devices[activeTab].title}
          </h2>
          <div className="overflow-x-auto rounded-xl" style={{ background: 'rgba(248, 249, 250, 0.05)' }}>
            <table className="w-full" style={{ minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(0, 255, 255, 0.3)' }}>
                  <th className="text-left py-4 px-6" style={{ color: '#00FFFF' }}>Device</th>
                  <th className="text-center py-4 px-4" style={{ color: '#00FFFF' }}>eSIM</th>
                  <th className="text-center py-4 px-4" style={{ color: '#00FFFF' }}>Dual SIM</th>
                  <th className="text-center py-4 px-4" style={{ color: '#00FFFF' }}>5G</th>
                  <th className="text-left py-4 px-6" style={{ color: '#00FFFF' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {devices[activeTab].items.map((device, index) => (
                  <tr 
                    key={index}
                    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                  >
                    <td className="py-4 px-6 font-medium" style={{ color: '#F8F9FA' }}>
                      {device.name}
                    </td>
                    <td className="text-center py-4 px-4">
                      <span 
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ 
                          background: device.esim ? '#10B981' : '#EF4444',
                          lineHeight: '24px',
                          fontSize: '14px',
                          color: '#fff'
                        }}
                        aria-label={device.esim ? 'Supported' : 'Not supported'}
                      >
                        {device.esim ? 'Y' : 'N'}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span 
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ 
                          background: device.dualSim ? '#10B981' : '#6B7280',
                          lineHeight: '24px',
                          fontSize: '14px',
                          color: '#fff'
                        }}
                        aria-label={device.dualSim ? 'Supported' : 'Not supported'}
                      >
                        {device.dualSim ? 'Y' : '-'}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span 
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ 
                          background: device.fiveG ? '#10B981' : '#6B7280',
                          lineHeight: '24px',
                          fontSize: '14px',
                          color: '#fff'
                        }}
                        aria-label={device.fiveG ? '5G Supported' : '4G only'}
                      >
                        {device.fiveG ? 'Y' : '-'}
                      </span>
                    </td>
                    <td className="py-4 px-6" style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '14px' }}>
                      {device.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-6" aria-label="Legend">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ background: '#10B981' }} aria-hidden="true" />
            <span style={{ color: 'rgba(248, 249, 250, 0.7)' }}>Supported</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ background: '#6B7280' }} aria-hidden="true" />
            <span style={{ color: 'rgba(248, 249, 250, 0.7)' }}>Not Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ background: '#EF4444' }} aria-hidden="true" />
            <span style={{ color: 'rgba(248, 249, 250, 0.7)' }}>Not Supported</span>
          </div>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div 
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(248, 249, 250, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: '#F8F9FA' }}
            >
              Device Compatible?
            </h2>
            <p 
              className="mb-6"
              style={{ color: 'rgba(248, 249, 250, 0.7)' }}
            >
              Get your eSIM activated in minutes
            </p>
            <Link
              to="/esim-register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold"
              style={{
                background: 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)',
                color: '#1e2f3c',
                minHeight: '48px'
              }}
            >
              Get Your eSIM Now
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SupportedDevices;
