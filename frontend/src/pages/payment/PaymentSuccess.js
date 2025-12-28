import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  const requestId = searchParams.get('request_id');
  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2f3c] via-[#162838] to-[#0d1821] text-white py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-block p-6 bg-green-500/20 rounded-full border-4 border-green-500">
            <svg
              className="w-24 h-24 text-green-500"
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Payment <span className="text-[#00FFFF]">Successful</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your eSIM purchase has been completed successfully
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-[#00FFFF]/30 rounded-lg p-8 mb-8"
          data-testid="success-details"
        >
          <h2 className="text-xl font-bold mb-6 text-[#00FFFF]">Transaction Details</h2>
          
          <div className="space-y-4 text-left">
            {requestId && (
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">Request ID</span>
                <span className="font-mono text-sm">{requestId}</span>
              </div>
            )}
            
            {transactionId && (
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">Transaction ID</span>
                <span className="font-mono text-sm">{transactionId}</span>
              </div>
            )}
            
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Status</span>
              <span className="text-green-500 font-semibold">COMPLETED</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Method</span>
              <span>Transactease</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <div className="bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg p-6">
            <h3 className="font-semibold mb-2 text-[#00FFFF]">What's Next?</h3>
            <ul className="text-sm text-gray-300 space-y-2 text-left">
              <li>- Check your email for eSIM activation QR code</li>
              <li>- Download and install the eSIM profile</li>
              <li>- Activate your plan from the dashboard</li>
              <li>- Start using your 5G connection</li>
            </ul>
          </div>

          <p className="text-gray-400">
            Redirecting to dashboard in <span className="text-[#00FFFF] font-bold">{countdown}</span> seconds...
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#1e2f3c] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
              data-testid="go-to-dashboard-button"
            >
              Go to Dashboard
            </button>
            
            <button
              onClick={() => navigate('/plans')}
              className="bg-[#1e2f3c] border border-[#00FFFF] text-[#00FFFF] px-8 py-3 rounded-lg font-semibold hover:bg-[#00FFFF] hover:text-[#1e2f3c] transition-all"
            >
              Browse Plans
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
