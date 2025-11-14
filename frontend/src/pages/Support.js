import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: 'What is an eSIM?',
      answer: 'An eSIM is a digital SIM that allows you to activate a cellular plan without using a physical SIM card. It is embedded in your device and can be programmed with multiple carrier profiles.'
    },
    {
      question: 'How do I transfer my eSIM between devices?',
      answer: 'You can transfer your eSIM using our Quick Transfer feature. Simply log into your account, select the eSIM profile, and scan the QR code on your new device. Transfer between Android and Apple devices is fully supported.'
    },
    {
      question: 'Which devices support eSIM?',
      answer: 'Most modern smartphones support eSIM including iPhone XS and newer, Samsung Galaxy S20 and newer, Google Pixel 3 and newer, and many other devices.  Check our compatibility page for the full list.'
    },
    {
      question: 'Can I use eSIM while roaming?',
      answer: 'Yes, our eSIM plans include advanced roaming support across 150+ countries. You can manage roaming settings directly from your account dashboard.'
    },
    {
      question: 'How do I activate 5G on my eSIM?',
      answer: '5G is automatically enabled on all our plans if your device supports it. Make sure you are in a 5G coverage area and have a 5G-compatible device.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Support Center</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get help with your eSIM. Our team is available 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Send Message
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-primary font-bold">E</span>
                  <span>info@esim.com.mm</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-primary font-bold">P</span>
                  <span>09650000172</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-primary font-bold">W</span>
                  <span>esim.com.mm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;