/**
 * Payment Success Page
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  const requestId = searchParams.get('request_id');
  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    // Clear pending payment from localStorage
    localStorage.removeItem('pending_payment_request_id');

    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/customer/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#1e2f3c] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Successful
          </h1>
          
          <p className="text-white/60 mb-6">
            Your payment has been processed successfully.
          </p>

          {/* Transaction Details */}
          <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
            {requestId && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Request ID</span>
                <span className="text-white font-mono">{requestId}</span>
              </div>
            )}
            {transactionId && (
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Transaction ID</span>
                <span className="text-white font-mono">{transactionId}</span>
              </div>
            )}
          </div>

          {/* Redirect Notice */}
          <p className="text-white/40 text-sm mb-6">
            Redirecting to dashboard in {countdown} seconds...
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/customer/esim')}
              className="flex-1 py-3 rounded-xl bg-[#00FFFF] text-[#1e2f3c] font-semibold hover:bg-[#00CCCC] transition-colors"
            >
              View eSIM
            </button>
            <button
              onClick={() => navigate('/customer/dashboard')}
              className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
