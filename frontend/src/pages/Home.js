import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const features = [
    {
      title: 'eSIM Transfer Android to Apple',
      description: 'Seamlessly transfer your eSIM between Android and Apple devices with zero downtime.',
      icon: '📱'
    },
    {
      title: '5G Network Support',
      description: 'Experience blazing-fast 5G speeds across Myanmar and ASEAN region.',
      icon: '⚡'
    },
    {
      title: 'VoLTE Enabled',
      description: 'Crystal-clear voice calls over LTE network with HD quality.',
      icon: '📞'
    },
    {
      title: 'Advanced Roaming',
      description: 'Stay connected worldwide with our advanced international roaming solutions.',
      icon: '🌍'
    },
    {
      title: 'Multi-Device Support',
      description: 'Connect smartphones, tablets, smartwatches, and iPads simultaneously.',
      icon: '⌚'
    },
    {
      title: 'Instant Activation',
      description: 'Activate your eSIM in seconds with QR code scanning.',
      icon: '⚡'
    }
  ];

  const stats = [
    { value: '50M+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '15+', label: 'Countries' },
    { value: '24/7', label: 'Support' }
  ];

  const entertainmentServices = [
    { name: 'TV Streaming', icon: '📺', description: '1000+ channels' },
    { name: 'Movies', icon: '🎬', description: 'Unlimited content' },
    { name: 'Games', icon: '🎮', description: 'Cloud gaming' },
    { name: 'Music', icon: '🎵', description: 'Premium quality' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-pattern grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text text-glow">eSIM Myanmar</span>
              <br />
              <span className="text-white">Entertainment Server</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Enterprise eSIM Management Platform serving 50M+ users across ASEAN with 5G, VoLTE, and seamless device transfer capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Get Started Now
              </Link>
              <Link to="/features" className="btn-secondary text-lg px-8 py-4">
                Explore Features
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass-card text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Advanced eSIM Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Industry-leading eSIM technology with enterprise-grade security and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card card-hover"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Entertainment Section */}
      <section className="py-20 relative bg-gradient-to-b from-transparent to-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Entertainment Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium streaming and entertainment bundled with your eSIM
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {entertainmentServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center card-hover cursor-pointer"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.name}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card box-glow p-12"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 50 million users across ASEAN experiencing the future of mobile connectivity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Create Account
              </Link>
              <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="py-8 glass-effect border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-primary">🌐</span>
              <span>esim.com.mm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✉</span>
              <span>info@esim.com.mm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">📱</span>
              <span>09650000172</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">💬</span>
              <span>@eSIMMyanmar</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
