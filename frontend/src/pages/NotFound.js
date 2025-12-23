import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | eSIM Myanmar</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to eSIM Myanmar homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#1e2f3c' }}>
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="text-9xl font-bold mb-4"
              style={{ color: '#00FFFF', textShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
            >
              404
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-400 mb-8 text-lg"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #00FFFF, #00D4AA)',
                color: '#1e2f3c'
              }}
            >
              Go Home
            </Link>
            <Link
              to="/support"
              className="px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105"
              style={{ 
                borderColor: '#00FFFF',
                color: '#00FFFF'
              }}
            >
              Get Support
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm"
          >
            <Link to="/plans" className="text-gray-400 hover:text-cyan-400 transition-colors">Plans</Link>
            <Link to="/features" className="text-gray-400 hover:text-cyan-400 transition-colors">Features</Link>
            <Link to="/coverage" className="text-gray-400 hover:text-cyan-400 transition-colors">Coverage</Link>
            <Link to="/faq" className="text-gray-400 hover:text-cyan-400 transition-colors">FAQ</Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
