/**
 * Payment Page Component
 * Handles Transactease payment flow
 */

import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { processPayment } from '../../utils/transactease';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get payment details from navigation state
  const paymentDetails = location.state || {};
  const { amount, planName, planId, esimProfileId, invoiceNo } = paymentDetails;

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      setError('Invalid payment amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        amount: parseFloat(amount),
        invoiceNo: invoiceNo || `INV${Date.now()}`,
        customerName: user?.full_name || 'Customer',
        customerPhone: user?.phone_number || '09000000000',
        customerEmail: user?.email || 'customer@example.com',
        remark: `eSIM Plan: ${planName || 'Purchase'}`,
        esimProfileId: esimProfileId || '',
        planId: planId || '',
        userId: user?.id || ''
      };

      // This will redirect to Transactease gateway
      await processPayment(paymentData);
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const formatAmount = (amt) => {
    return new Intl.NumberFormat('en-MM', {
      style: 'currency',
      currency: 'MMK',
      minimumFractionDigits: 0
    }).format(amt || 0);
  };

  return (
    <div className="min-h-screen bg-[#1e2f3c] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Complete Payment
          </h1>

          {/* Payment Summary */}
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#00FFFF] mb-4">
              Order Summary
            </h2>
            
            {planName && (
              <div className="flex justify-between text-white/80 mb-2">
                <span>Plan</span>
                <span>{planName}</span>
              </div>
            )}
            
            <div className="flex justify-between text-white/80 mb-2">
              <span>Invoice</span>
              <span>{invoiceNo || 'Pending'}</span>
            </div>
            
            <div className="border-t border-white/20 my-4"></div>
            
            <div className="flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span className="text-[#00FFFF]">{formatAmount(amount)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white/60 mb-3">
              Available Payment Methods
            </h3>
            <div className="flex gap-3">
              <div className="flex-1 bg-white/5 rounded-lg p-3 text-center border border-white/10">
                <span className="text-white text-sm">MMQR</span>
              </div>
              <div className="flex-1 bg-white/5 rounded-lg p-3 text-center border border-white/10">
                <span className="text-white text-sm">Visa/Master</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading || !amount}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              loading || !amount
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#00FFFF] hover:bg-[#00CCCC] text-[#1e2f3c]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay ${formatAmount(amount)}`
            )}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl font-medium text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </button>

          {/* Security Notice */}
          <p className="text-center text-white/40 text-xs mt-6">
            Secured by Transactease Payment Gateway
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
