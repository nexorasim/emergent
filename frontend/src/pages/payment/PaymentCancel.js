/**
 * Payment Cancel Page
 */

import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestId = searchParams.get('request_id');

  return (
    <div className="min-h-screen bg-[#1e2f3c] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-10 h-10 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </motion.div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Cancelled
          </h1>
          
          <p className="text-white/60 mb-6">
            Your payment was cancelled. No charges were made.
          </p>

          {/* Request ID */}
          {requestId && (
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Request ID</span>
                <span className="text-white font-mono">{requestId}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-2)}
              className="flex-1 py-3 rounded-xl bg-[#00FFFF] text-[#1e2f3c] font-semibold hover:bg-[#00CCCC] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/plans')}
              className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              View Plans
            </button>
          </div>

          {/* Help Link */}
          <button
            onClick={() => navigate('/support')}
            className="mt-4 text-white/40 text-sm hover:text-white/60 transition-colors"
          >
            Need help? Contact Support
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
