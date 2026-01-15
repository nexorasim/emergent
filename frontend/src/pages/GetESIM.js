/**
 * GetESIM.js - Direct eSIM Installation System
 * eSIM Myanmar 4th Anniversary - No Registration Required
 * Universal Link + QR-less Provisioning
 * Copyright 2025-2026 ESIM MYANMAR COMPANY LIMITED
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';

const GetESIM = () => {
  const [deviceType, setDeviceType] = useState('unknown');
  const [installing, setInstalling] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const ESIM_DATA = 'LPA:1$rsp.truphone.com$QR-G-5C-21K-1CHHCG1';
  const APPLE_UNIVERSAL_LINK = `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${ESIM_DATA}`;
  const ANDROID_LINK = `https://esimsetup.android.com/esim_qrcode_provisioning?carddata=${ESIM_DATA}`;

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setDeviceType('ios');
    } else if (/android/.test(ua)) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  const handleDirectInstall = () => {
    setInstalling(true);
    
    if (deviceType === 'ios') {
      window.location.href = APPLE_UNIVERSAL_LINK;
    } else if (deviceType === 'android') {
      window.location.href = ANDROID_LINK;
    }
    
    setTimeout(() => setInstalling(false), 3000);
  };

  const handleShowQR = () => {
    setShowQR(true);
  };

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: '#1e2f3c' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="inline-block px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}
          >
            <span style={{ color: '#00FFFF', fontSize: '14px', fontWeight: '600' }}>
              4th Anniversary Special Offer
            </span>
          </div>
          
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Get Free eSIM
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Direct Installation - No Registration Required
          </p>
          <p className="text-sm text-gray-500">
            iOS and Android - Instant Activation
          </p>
        </motion.div>

        {/* Main Installation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-8 md:p-12 mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.9) 0%, rgba(42, 74, 92, 0.85) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(0, 255, 255, 0.08)'
          }}
        >
          {/* Device Detection */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-4"
              style={{ background: 'rgba(0, 255, 255, 0.1)' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-300 text-sm">
                Detected: {deviceType === 'ios' ? 'iOS Device' : deviceType === 'android' ? 'Android Device' : 'Desktop Browser'}
              </span>
            </div>
          </div>

          {/* Direct Install Button */}
          {(deviceType === 'ios' || deviceType === 'android') && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDirectInstall}
              disabled={installing}
              className="w-full py-6 rounded-xl font-bold text-xl mb-6 transition-all"
              style={{
                background: installing 
                  ? 'linear-gradient(135deg, #00CCCC 0%, #009999 100%)'
                  : 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                color: '#1e2f3c',
                boxShadow: '0 4px 20px rgba(0, 255, 255, 0.4)',
                cursor: installing ? 'not-allowed' : 'pointer'
              }}
            >
              {installing ? 'Opening Installation...' : 'Tap to Install eSIM'}
            </motion.button>
          )}

          {/* QR Code Option */}
          <div className="text-center">
            <button
              onClick={handleShowQR}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              Or Scan QR Code to Activate
            </button>
          </div>

          {/* QR Code Display */}
          {showQR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 text-center"
            >
              <div
                className="inline-block p-6 rounded-2xl"
                style={{
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <QRCode
                  value={ESIM_DATA}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Scan with your device camera to activate eSIM
              </p>
              <div
                className="mt-4 p-3 rounded-lg"
                style={{ background: 'rgba(0, 0, 0, 0.3)' }}
              >
                <code className="text-xs text-gray-500 break-all">
                  {ESIM_DATA}
                </code>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { title: 'No Registration', desc: 'Install directly without account' },
            { title: 'Instant Activation', desc: 'Active in seconds' },
            { title: 'Free Forever', desc: '4th Anniversary gift' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-6 rounded-xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Installation Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl p-6"
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <h3 className="text-white font-semibold mb-4">Installation Steps:</h3>
          <ol className="space-y-3 text-gray-300 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(0, 255, 255, 0.2)', color: '#00FFFF' }}
              >1</span>
              <span>Tap the installation button above</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(0, 255, 255, 0.2)', color: '#00FFFF' }}
              >2</span>
              <span>Follow your device prompts to add eSIM</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(0, 255, 255, 0.2)', color: '#00FFFF' }}
              >3</span>
              <span>Your eSIM will activate automatically</span>
            </li>
          </ol>
        </motion.div>

        {/* Support Info */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Need help? Contact us at info@esim.com.mm or call 09650000172</p>
        </div>
      </div>
    </div>
  );
};

export default GetESIM;
