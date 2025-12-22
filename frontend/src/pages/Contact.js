/**
 * Contact Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      title: 'Customer Support',
      description: '24/7 support for all inquiries',
      email: 'support@esim.com.mm',
      phone: '+95 9650000172'
    },
    {
      title: 'Sales Inquiries',
      description: 'Enterprise and bulk orders',
      email: 'sales@esim.com.mm',
      phone: '+95 9650000173'
    },
    {
      title: 'Partner Relations',
      description: 'Become a reseller or affiliate',
      email: 'partners@esim.com.mm',
      phone: '+95 9650000174'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'feedback', label: 'Feedback' }
  ];

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'ESIM MYANMAR COMPANY LIMITED',
    'image': 'https://www.esim.com.mm/logo192.png',
    'telephone': '+95-9650000172',
    'email': 'info@esim.com.mm',
    'url': 'https://www.esim.com.mm',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Yangon',
      'addressRegion': 'Yangon Region',
      'addressCountry': 'MM'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '00:00',
      'closes': '23:59'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: 'general',
      message: ''
    });
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen py-20" style={{ background: '#1e2f3c' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-4xl md:text-5xl font-extrabold mb-6"
              style={{ color: '#F8F9FA' }}
            >
              Contact <span style={{ color: '#00FFFF' }}>Us</span>
            </h1>
            <p 
              className="text-xl max-w-2xl mx-auto"
              style={{ color: 'rgba(248, 249, 250, 0.8)', lineHeight: '1.75' }}
            >
              Have questions? We are here to help. Reach out to our team 24/7.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h2 
                  className="text-xl font-bold mb-2"
                  style={{ color: '#00FFFF' }}
                >
                  {info.title}
                </h2>
                <p 
                  className="mb-4"
                  style={{ color: 'rgba(248, 249, 250, 0.7)' }}
                >
                  {info.description}
                </p>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${info.email}`}
                    className="block hover:underline"
                    style={{ color: '#F8F9FA' }}
                  >
                    {info.email}
                  </a>
                  <a 
                    href={`tel:${info.phone.replace(/\s/g, '')}`}
                    className="block hover:underline"
                    style={{ color: '#F8F9FA' }}
                  >
                    {info.phone}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              aria-labelledby="form-title"
            >
              <h2 
                id="form-title"
                className="text-2xl font-bold mb-6"
                style={{ color: '#F8F9FA' }}
              >
                Send Us a Message
              </h2>
              
              {submitStatus === 'success' && (
                <div 
                  className="mb-6 p-4 rounded-lg"
                  style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981' }}
                  role="alert"
                >
                  <p style={{ color: '#10B981' }}>
                    Thank you for your message. We will respond within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name"
                      className="block mb-2 font-medium"
                      style={{ color: '#F8F9FA' }}
                    >
                      Full Name <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: 'rgba(248, 249, 250, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#F8F9FA',
                        minHeight: '48px'
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email"
                      className="block mb-2 font-medium"
                      style={{ color: '#F8F9FA' }}
                    >
                      Email Address <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: 'rgba(248, 249, 250, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#F8F9FA',
                        minHeight: '48px'
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="phone"
                      className="block mb-2 font-medium"
                      style={{ color: '#F8F9FA' }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: 'rgba(248, 249, 250, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#F8F9FA',
                        minHeight: '48px'
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="category"
                      className="block mb-2 font-medium"
                      style={{ color: '#F8F9FA' }}
                    >
                      Category <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg"
                      style={{
                        background: 'rgba(248, 249, 250, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#F8F9FA',
                        minHeight: '48px'
                      }}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value} style={{ background: '#1e2f3c' }}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="subject"
                    className="block mb-2 font-medium"
                    style={{ color: '#F8F9FA' }}
                  >
                    Subject <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg"
                    style={{
                      background: 'rgba(248, 249, 250, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#F8F9FA',
                      minHeight: '48px'
                    }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message"
                    className="block mb-2 font-medium"
                    style={{ color: '#F8F9FA' }}
                  >
                    Message <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg resize-none"
                    style={{
                      background: 'rgba(248, 249, 250, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#F8F9FA'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-semibold transition-all"
                  style={{
                    background: isSubmitting 
                      ? 'rgba(0, 255, 255, 0.5)' 
                      : 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)',
                    color: '#1e2f3c',
                    minHeight: '56px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.section>

            {/* Company Info */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              aria-labelledby="company-title"
            >
              <h2 
                id="company-title"
                className="text-2xl font-bold mb-6"
                style={{ color: '#F8F9FA' }}
              >
                Company Information
              </h2>

              <div 
                className="rounded-xl p-6 mb-6"
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 
                  className="font-bold mb-4"
                  style={{ color: '#00FFFF' }}
                >
                  ESIM MYANMAR COMPANY LIMITED
                </h3>
                <address style={{ fontStyle: 'normal', color: 'rgba(248, 249, 250, 0.8)' }}>
                  <p className="mb-2">Yangon, Myanmar</p>
                  <p className="mb-2">Phone: +95 9650000172</p>
                  <p className="mb-2">Email: info@esim.com.mm</p>
                  <p>Website: www.esim.com.mm</p>
                </address>
              </div>

              <div 
                className="rounded-xl p-6 mb-6"
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 
                  className="font-bold mb-4"
                  style={{ color: '#00FFFF' }}
                >
                  Business Hours
                </h3>
                <p style={{ color: 'rgba(248, 249, 250, 0.8)' }}>
                  Customer Support: 24/7
                </p>
                <p style={{ color: 'rgba(248, 249, 250, 0.8)' }}>
                  Sales Office: Monday - Friday, 9:00 AM - 6:00 PM (MMT)
                </p>
              </div>

              <div 
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(0, 255, 255, 0.1)',
                  border: '1px solid rgba(0, 255, 255, 0.3)'
                }}
              >
                <h3 
                  className="font-bold mb-4"
                  style={{ color: '#00FFFF' }}
                >
                  Response Time
                </h3>
                <ul className="space-y-2" style={{ color: 'rgba(248, 249, 250, 0.8)' }}>
                  <li>General Inquiries: Within 24 hours</li>
                  <li>Technical Support: Within 4 hours</li>
                  <li>Urgent Issues: Within 1 hour</li>
                </ul>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
