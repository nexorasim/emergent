import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestId = searchParams.get('request_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2f3c] via-[#162838] to-[#0d1821] text-white py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-block p-6 bg-orange-500/20 rounded-full border-4 border-orange-500">
            <svg
              className="w-24 h-24 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Payment <span className="text-orange-500">Cancelled</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your payment was cancelled or expired
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-8 mb-8"
          data-testid="cancel-details"
        >
          <h2 className="text-xl font-bold mb-4 text-orange-500">Transaction Details</h2>
          
          {requestId && (
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Request ID</span>
              <span className="font-mono text-sm">{requestId}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="text-orange-500 font-semibold">CANCELLED</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
            <h3 className="font-semibold mb-2 text-orange-500">Why was my payment cancelled?</h3>
            <ul className="text-sm text-gray-300 space-y-2 text-left">
              <li>- You clicked the cancel button during payment</li>
              <li>- Payment session expired (5 minutes)</li>
              <li>- Browser or network issues interrupted the process</li>
              <li>- Insufficient funds or payment declined</li>
            </ul>
          </div>

          <div className="bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg p-6">
            <h3 className="font-semibold mb-2 text-[#00FFFF]">What should I do next?</h3>
            <ul className="text-sm text-gray-300 space-y-2 text-left">
              <li>- Try again with the same or different payment method</li>
              <li>- Check your bank account or card limits</li>
              <li>- Contact support if you continue to face issues</li>
              <li>- Browse other plans that might suit your needs</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/plans')}
              className="bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#1e2f3c] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
              data-testid="try-again-button"
            >
              Try Again
            </button>
            
            <button
              onClick={() => navigate('/support')}
              className="bg-[#1e2f3c] border border-[#00FFFF] text-[#00FFFF] px-8 py-3 rounded-lg font-semibold hover:bg-[#00FFFF] hover:text-[#1e2f3c] transition-all"
            >
              Contact Support
            </button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default PaymentCancel;
