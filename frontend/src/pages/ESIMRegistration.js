/**
 * ESIMRegistration.js - Complete eSIM Registration Flow
 * MPT, ATOM U9, MYTEL registration with MMQR payment and AI verification
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';

// Provider data - 4 separate providers
const PROVIDERS = [
  { id: 'MPT', name: 'MPT', color: '#FFD700', supports5G: true, supportsVoLTE: true },
  { id: 'ATOM', name: 'ATOM', color: '#FF6B35', supports5G: true, supportsVoLTE: true },
  { id: 'U9', name: 'U9', color: '#9B59B6', supports5G: true, supportsVoLTE: true },
  { id: 'MYTEL', name: 'MYTEL', color: '#00A651', supports5G: true, supportsVoLTE: true }
];

const DEVICE_TYPES = [
  { id: 'ios', name: 'iPhone', icon: 'IP' },
  { id: 'android', name: 'Android', icon: 'AD' },
  { id: 'tablet', name: 'iPad / Tablet', icon: 'TB' },
  { id: 'wearable', name: 'Apple Watch / Wearable', icon: 'WR' }
];

const STEPS = [
  { id: 1, name: 'Provider', description: 'Select telecom provider' },
  { id: 2, name: 'Phone', description: 'Enter phone number' },
  { id: 3, name: 'Device', description: 'Device information' },
  { id: 4, name: 'Payment', description: 'MMQR payment' },
  { id: 5, name: 'Verification', description: 'AI verification' },
  { id: 6, name: 'eSIM', description: 'QR code issuance' }
];

const ESIMRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    provider: '',
    phoneNumber: '',
    deviceType: '',
    deviceModel: '',
    osVersion: '',
    mmqrData: '',
    screenshot: null
  });
  const [orderId, setOrderId] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [esimQR, setEsimQR] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationResults, setValidationResults] = useState({});

  // Step 1: Provider Selection
  const handleProviderSelect = (provider) => {
    setFormData({ ...formData, provider });
    setCurrentStep(2);
  };

  // Step 2: Phone Validation
  const validatePhone = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/esim-registration/validate-phone', {
        phone_number: formData.phoneNumber,
        provider: formData.provider
      });
      
      if (response.data.success) {
        setValidationResults({ ...validationResults, phone: response.data });
        setCurrentStep(3);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Phone validation failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Device Check
  const checkDevice = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/esim-registration/check-device', {
        device_type: formData.deviceType,
        device_model: formData.deviceModel,
        os_version: formData.osVersion
      });
      
      setValidationResults({ ...validationResults, device: response.data });
      
      if (response.data.success || response.data.status === 'requires_review') {
        // Register and get order ID
        await registerOrder();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Device check failed');
    } finally {
      setLoading(false);
    }
  };

  // Register order
  const registerOrder = async () => {
    try {
      const response = await api.post('/esim-registration/register', {
        phone_number: formData.phoneNumber,
        provider: formData.provider,
        device_info: {
          device_type: formData.deviceType,
          device_model: formData.deviceModel,
          os_version: formData.osVersion
        }
      });
      
      if (response.data.success) {
        setOrderId(response.data.order_id);
        setValidationResults({ ...validationResults, registration: response.data });
        setCurrentStep(4);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  // Step 4: Payment Verification
  const verifyPayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        order_id: orderId,
        mmqr_data: formData.mmqrData
      };
      
      if (formData.screenshot) {
        payload.screenshot_base64 = formData.screenshot;
      }
      
      const response = await api.post('/esim-registration/verify-payment', payload);
      
      setValidationResults({ ...validationResults, payment: response.data });
      
      if (response.data.success) {
        setCurrentStep(5);
        // Auto-proceed to verification
        await runVerification();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 5: AI Verification
  const runVerification = async () => {
    setLoading(true);
    
    try {
      const response = await api.get(`/esim-registration/order/${orderId}`);
      setVerificationStatus(response.data);
      
      if (response.data.status === 'verified') {
        setCurrentStep(6);
        // Issue eSIM
        await issueESIM();
      } else if (response.data.status === 'failed') {
        setError('Verification failed. Please contact support.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Verification check failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 6: Issue eSIM
  const issueESIM = async () => {
    setLoading(true);
    
    try {
      const response = await api.post(`/esim-registration/issue-esim?order_id=${orderId}`);
      
      if (response.data.success) {
        setEsimQR(response.data.details);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'eSIM issuance failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle screenshot upload
  const handleScreenshotUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, screenshot: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }, [formData]);

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProviderSelection onSelect={handleProviderSelect} />;
      case 2:
        return (
          <PhoneInput
            value={formData.phoneNumber}
            provider={formData.provider}
            onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
            onSubmit={validatePhone}
            loading={loading}
          />
        );
      case 3:
        return (
          <DeviceInput
            formData={formData}
            onChange={(field, value) => setFormData({ ...formData, [field]: value })}
            onSubmit={checkDevice}
            loading={loading}
          />
        );
      case 4:
        return (
          <PaymentStep
            orderId={orderId}
            formData={formData}
            onChange={(field, value) => setFormData({ ...formData, [field]: value })}
            onScreenshotUpload={handleScreenshotUpload}
            onSubmit={verifyPayment}
            loading={loading}
          />
        );
      case 5:
        return (
          <VerificationStep
            verificationStatus={verificationStatus}
            loading={loading}
          />
        );
      case 6:
        return (
          <ESIMIssuance
            esimQR={esimQR}
            orderId={orderId}
            provider={formData.provider}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">eSIM Registration</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Register your MPT, ATOM U9, or MYTEL eSIM in minutes
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8 sm:mb-10 lg:mb-12 overflow-x-auto">
          <div className="flex justify-between items-center min-w-max px-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                    currentStep >= step.id
                      ? 'bg-primary text-background'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 lg:w-20 h-0.5 sm:h-1 mx-1 sm:mx-2 transition-all ${
                      currentStep > step.id ? 'bg-primary' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 min-w-max px-2">
            {STEPS.map((step) => (
              <div key={step.id} className="text-center" style={{ width: '60px' }}>
                <p className={`text-xs ${currentStep >= step.id ? 'text-primary' : 'text-gray-500'}`}>
                  {step.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-xs sm:text-sm text-red-400"
              role="alert"
            >
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-4 text-red-300 hover:text-red-200"
                aria-label="Dismiss error"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Order ID Display */}
        {orderId && (
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Order ID: <span className="text-primary font-mono">{orderId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 1: Provider Selection Component
const ProviderSelection = ({ onSelect }) => (
  <div className="glass-card">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">Select Your Provider</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {PROVIDERS.map((provider) => (
        <motion.button
          key={provider.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(provider.id)}
          className="glass-card card-hover text-center p-4 sm:p-6 lg:p-8 cursor-pointer border-2 border-transparent hover:border-primary"
        >
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold"
            style={{ backgroundColor: provider.color + '20', color: provider.color }}
          >
            {provider.id[0]}
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2">{provider.name}</h3>
          <div className="flex justify-center gap-2 sm:gap-4 text-xs">
            {provider.supports5G && (
              <span className="px-2 py-1 bg-primary/20 text-primary rounded">5G</span>
            )}
            {provider.supportsVoLTE && (
              <span className="px-2 py-1 bg-primary/20 text-primary rounded">VoLTE</span>
            )}
          </div>
        </motion.button>
      ))}
    </div>
    <p className="text-center text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6">
      eSIM Price: <span className="text-primary font-bold">120,000 MMK</span>
    </p>
  </div>
);

// Step 2: Phone Input Component
const PhoneInput = ({ value, provider, onChange, onSubmit, loading }) => (
  <div className="glass-card">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">Enter Your Phone Number</h2>
    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">
      Enter your {provider} phone number to register for eSIM
    </p>
    <div className="max-w-md mx-auto">
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
          Myanmar Phone Number
        </label>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="09xxxxxxxxx"
          className="input-field"
          aria-describedby="phone-format"
        />
        <p id="phone-format" className="text-xs text-gray-500 mt-2">
          Format: 09xxxxxxxxx or +959xxxxxxxxx
        </p>
      </div>
      <button
        onClick={onSubmit}
        disabled={loading || !value}
        className="btn-primary w-full"
      >
        {loading ? 'Validating...' : 'Validate Phone Number'}
      </button>
    </div>
  </div>
);

// Step 3: Device Input Component
const DeviceInput = ({ formData, onChange, onSubmit, loading }) => (
  <div className="glass-card">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">Device Information</h2>
    
    <div className="mb-6 sm:mb-8">
      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-3 sm:mb-4">
        Select Device Type
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {DEVICE_TYPES.map((device) => (
          <button
            key={device.id}
            onClick={() => onChange('deviceType', device.id)}
            className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
              formData.deviceType === device.id
                ? 'border-primary bg-primary/10'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div className="text-xl sm:text-2xl mb-2 text-center">{device.icon}</div>
            <p className="text-xs sm:text-sm text-center text-white">{device.name}</p>
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
          Device Model
        </label>
        <input
          type="text"
          value={formData.deviceModel}
          onChange={(e) => onChange('deviceModel', e.target.value)}
          placeholder="e.g., iPhone 15 Pro, Samsung Galaxy S24"
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
          OS Version
        </label>
        <input
          type="text"
          value={formData.osVersion}
          onChange={(e) => onChange('osVersion', e.target.value)}
          placeholder="e.g., 17.0, 14.0"
          className="input-field"
        />
      </div>
    </div>

    <button
      onClick={onSubmit}
      disabled={loading || !formData.deviceType || !formData.deviceModel || !formData.osVersion}
      className="btn-primary w-full"
    >
      {loading ? 'Checking Compatibility...' : 'Check Device Compatibility'}
    </button>
  </div>
);

// Step 4: Payment Component
const PaymentStep = ({ orderId, formData, onChange, onScreenshotUpload, onSubmit, loading }) => (
  <div className="glass-card">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">MMQR Payment</h2>
    
    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-xs sm:text-sm text-gray-300">Amount Due</span>
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">120,000 MMK</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-400">
        Order ID: <span className="font-mono text-white">{orderId}</span>
      </p>
    </div>

    <div className="mb-4 sm:mb-6">
      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
        MMQR Payment Data
      </label>
      <textarea
        value={formData.mmqrData}
        onChange={(e) => onChange('mmqrData', e.target.value)}
        placeholder="Paste MMQR string here (starts with 00020101...)"
        rows={4}
        className="input-field font-mono text-xs sm:text-sm"
        style={{ height: 'auto', minHeight: '100px' }}
      />
      <p className="text-xs text-gray-500 mt-2">
        Scan the payment QR code and paste the data string here
      </p>
    </div>

    <div className="mb-4 sm:mb-6">
      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
        Payment Screenshot (Optional)
      </label>
      <div className="border-2 border-dashed border-white/20 rounded-xl p-4 sm:p-6 text-center">
        {formData.screenshot ? (
          <div>
            <p className="text-xs sm:text-sm text-green-400 mb-2">Screenshot uploaded</p>
            <button
              onClick={() => onChange('screenshot', null)}
              className="text-xs sm:text-sm text-gray-400 hover:text-white"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={onScreenshotUpload}
              className="hidden"
              id="screenshot-upload"
            />
            <label
              htmlFor="screenshot-upload"
              className="cursor-pointer text-xs sm:text-sm text-gray-400 hover:text-white"
            >
              Click to upload payment screenshot
            </label>
          </div>
        )}
      </div>
    </div>

    <button
      onClick={onSubmit}
      disabled={loading || !formData.mmqrData}
      className="btn-primary w-full"
    >
      {loading ? 'Verifying Payment...' : 'Verify Payment'}
    </button>
  </div>
);

// Step 5: Verification Component
const VerificationStep = ({ verificationStatus, loading }) => (
  <div className="glass-card text-center">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">AI Verification</h2>
    
    {loading ? (
      <div className="py-8 sm:py-12">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" role="status" aria-label="Verifying" />
        <p className="text-xs sm:text-sm text-gray-400">Nexora AI is verifying your registration...</p>
      </div>
    ) : verificationStatus ? (
      <div>
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {verificationStatus.verifications?.map((v, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${
                v.status === 'verified'
                  ? 'bg-green-500/10 border border-green-500/30'
                  : v.status === 'failed'
                  ? 'bg-red-500/10 border border-red-500/30'
                  : 'bg-yellow-500/10 border border-yellow-500/30'
              }`}
            >
              <span className="text-xs sm:text-sm text-white capitalize">{v.type.replace('_', ' ')}</span>
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs ${
                  v.status === 'verified'
                    ? 'bg-green-500/20 text-green-400'
                    : v.status === 'failed'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {v.status}
              </span>
            </div>
          ))}
        </div>
        
        <div className={`text-sm sm:text-base lg:text-lg font-bold ${
          verificationStatus.status === 'verified' ? 'text-green-400' : 'text-yellow-400'
        }`}>
          Overall Status: {verificationStatus.status.toUpperCase()}
        </div>
      </div>
    ) : (
      <p className="text-xs sm:text-sm text-gray-400">Waiting for verification...</p>
    )}
  </div>
);

// Step 6: eSIM Issuance Component
const ESIMIssuance = ({ esimQR, orderId, provider }) => (
  <div className="glass-card text-center">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">eSIM Ready</h2>
    <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">Your {provider} eSIM has been issued successfully</p>
    
    {esimQR && (
      <div className="mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl inline-block mb-4">
          {/* QR Code placeholder - in production use a QR library */}
          <div className="w-36 h-36 sm:w-48 sm:h-48 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-600 text-xs text-center font-mono break-all p-2">
              {esimQR.esim_qr}
            </p>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-400 mb-4">
          Scan this QR code with your device to activate eSIM
        </p>
        
        {esimQR.activation_instructions && (
          <div className="text-left bg-white/5 rounded-xl p-4 sm:p-6 max-w-md mx-auto">
            <h3 className="text-sm sm:text-base text-white font-bold mb-3 sm:mb-4">Activation Instructions</h3>
            <ol className="space-y-2">
              {esimQR.activation_instructions.map((instruction, index) => (
                <li key={index} className="text-xs sm:text-sm text-gray-400 flex gap-2 sm:gap-3">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    )}
    
    <div className="text-xs sm:text-sm text-gray-500">
      <p>Order ID: <span className="font-mono text-primary">{orderId}</span></p>
      <p className="mt-2">Support: info@esim.com.mm</p>
    </div>
  </div>
);

export default ESIMRegistration;
