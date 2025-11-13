import React from 'react';
import { motion } from 'framer-motion';

const CoveragePage = () => {
  const countries = [
    { name: 'Myanmar', status: 'Full 5G', icon: '🇲🇲' },
    { name: 'Thailand', status: 'Full 5G', icon: '🇹🇭' },
    { name: 'Singapore', status: 'Full 5G', icon: '🇸🇬' },
    { name: 'Vietnam', status: 'Full 5G', icon: '🇻🇳' },
    { name: 'Malaysia', status: 'Full 5G', icon: '🇲🇾' },
    { name: 'Indonesia', status: '4G+', icon: '🇮🇩' },
    { name: 'Philippines', status: '4G+', icon: '🇵🇭' },
    { name: 'Cambodia', status: '4G+', icon: '🇰🇭' },
    { name: 'Laos', status: '4G', icon: '🇱🇦' },
    { name: 'Japan', status: 'Full 5G', icon: '🇯🇵' },
    { name: 'South Korea', status: 'Full 5G', icon: '🇰🇷' },
    { name: 'China', status: 'Full 5G', icon: '🇨🇳' }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Global Coverage</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay connected across ASEAN and beyond with our extensive network coverage.
          </p>
        </motion.div>

        <div className="glass-card mb-12 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">15+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">50M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-gray-400">Network Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card text-center card-hover"
            >
              <div className="text-5xl mb-3">{country.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{country.name}</h3>
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                {country.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoveragePage;