import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function PaymentPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const plan = location.state?.plan || {
    name: 'Basic 5G Plan',
    price: 5000,
    data_gb: 10,
    validity_days: 30
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_line1: 'Yangon',
    city: 'Yangon',
    postal_code: '11211'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Initiate payment with Transactease
      const response = await axios.post(`${API_URL}/api/payment/initiate`, {
        amount: plan.price,
        plan_id: plan.plan_id || 'basic_5g',
        user_id: 'user_' + Date.now(),
        ...formData
      });

      if (response.data.success) {
        setPaymentData(response.data);
        // Auto-submit form to Transactease
        setTimeout(() => {
          document.getElementById('transactease-form').submit();
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Payment initiation failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2f3c] via-[#162838] to-[#0d1821] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            Complete Your <span className="text-[#00FFFF]">Payment</span>
          </h1>
          <p className="text-xl text-gray-300">Secure payment powered by Transactease</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-[#00FFFF]/30 rounded-lg p-6"
            data-testid="order-summary"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#00FFFF]">Order Summary</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-gray-400 text-sm">eSIM Plan Subscription</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Data</span>
                  <span>{plan.data_gb} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Validity</span>
                  <span>{plan.validity_days} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">5G Network</span>
                  <span className="text-[#00FFFF]">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VoLTE</span>
                  <span className="text-[#00FFFF]">Included</span>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#00FFFF]">{plan.price?.toLocaleString()} MMK</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#00FFFF]/10 rounded-lg">
              <h4 className="font-semibold mb-2 text-[#00FFFF]">Payment Methods</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>- MMQR (Myanmar QR Payment)</p>
                <p>- Visa / Mastercard</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-[#00FFFF]/30 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#00FFFF]">Billing Information</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="first_name">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0d1821] border border-[#00FFFF]/30 rounded-lg focus:outline-none focus:border-[#00FFFF] text-white"
                    data-testid="first-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="last_name">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0d1821] border border-[#00FFFF]/30 rounded-lg focus:outline-none focus:border-[#00FFFF] text-white"
                    data-testid="last-name-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0d1821] border border-[#00FFFF]/30 rounded-lg focus:outline-none focus:border-[#00FFFF] text-white"
                  data-testid="email-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="09XXXXXXXXX"
                  className="w-full px-4 py-3 bg-[#0d1821] border border-[#00FFFF]/30 rounded-lg focus:outline-none focus:border-[#00FFFF] text-white"
                  data-testid="phone-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="address_line1">
                  Address
                </label>
                <input
                  type="text"
                  id="address_line1"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0d1821] border border-[#00FFFF]/30 rounded-lg focus:outline-none focus:border-[#00FFFF] text-white"
                  data-testid="address-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0d1821] border border-[#00FFFF]/30 rounded-lg focus:outline-none focus:border-[#00FFFF] text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="postal_code">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0d1821] border border-[#00FFFF]/30 rounded-lg focus:outline-none focus:border-[#00FFFF] text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#1e2f3c] py-4 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                data-testid="proceed-payment-button"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Secured by Transactease Payment Gateway
              </p>
            </form>
          </motion.div>
        </div>

        {/* Hidden Transactease Form */}
        {paymentData && (
          <form
            id="transactease-form"
            method="POST"
            action={paymentData.payment_url}
            style={{ display: 'none' }}
          >
            {Object.entries(paymentData.form_fields).map(([key, value]) => (
              <input
                key={key}
                type="hidden"
                name={key}
                value={value}
              />
            ))}
          </form>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
