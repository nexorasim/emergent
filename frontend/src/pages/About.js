/**
 * About Us Page - ESIM MYANMAR COMPANY LIMITED
 * WCAG 2.2 AA Compliant
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const milestones = [
    { year: '2024', title: 'Company Founded', description: 'ESIM MYANMAR COMPANY LIMITED established in Yangon' },
    { year: '2024', title: 'Platform Launch', description: 'Enterprise eSIM platform launched with MPT, ATOM, U9, MYTEL' },
    { year: '2025', title: '5G Expansion', description: 'Full 5G and VoLTE support across all networks' },
    { year: '2025', title: 'ASEAN Growth', description: 'Expanded coverage to 15+ countries in ASEAN region' }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Pioneering eSIM technology adoption in Myanmar with cutting-edge solutions'
    },
    {
      title: 'Security',
      description: 'GSMA-compliant infrastructure with enterprise-grade security standards'
    },
    {
      title: 'Accessibility',
      description: 'Making mobile connectivity accessible to all users across Myanmar'
    },
    {
      title: 'Reliability',
      description: '99.9% uptime SLA with 24/7 customer support'
    }
  ];

  const team = [
    { role: 'Leadership', count: '5+', description: 'Experienced executives' },
    { role: 'Engineering', count: '20+', description: 'Technical specialists' },
    { role: 'Support', count: '15+', description: 'Customer service agents' },
    { role: 'Partners', count: '50+', description: 'Business partners' }
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20" style={{ background: '#1e2f3c' }}>
      <div className="container">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h1 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 sm:mb-6"
            style={{ color: '#F8F9FA' }}
          >
            About <span style={{ color: '#00FFFF' }}>ESIM MYANMAR</span>
          </h1>
          <p 
            className="text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto"
            style={{ color: 'rgba(248, 249, 250, 0.8)', lineHeight: '1.75' }}
          >
            ESIM MYANMAR COMPANY LIMITED is the leading enterprise eSIM management platform 
            serving Myanmar and the ASEAN region. We provide seamless digital connectivity 
            solutions for individuals, businesses, and enterprises.
          </p>
        </motion.header>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
          aria-labelledby="mission-title"
        >
          <div 
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: 'rgba(248, 249, 250, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.2)'
            }}
          >
            <h2 
              id="mission-title"
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: '#00FFFF' }}
            >
              Our Mission
            </h2>
            <p 
              className="text-xl text-center max-w-4xl mx-auto"
              style={{ color: 'rgba(248, 249, 250, 0.9)', lineHeight: '1.75' }}
            >
              To democratize mobile connectivity in Myanmar by providing accessible, secure, 
              and innovative eSIM solutions that empower individuals and businesses to stay 
              connected in an increasingly digital world.
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
          aria-labelledby="values-title"
        >
          <h2 
            id="values-title"
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: '#F8F9FA' }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: '#00FFFF' }}
                >
                  {value.title}
                </h3>
                <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '16px', lineHeight: '1.6' }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
          aria-labelledby="timeline-title"
        >
          <h2 
            id="timeline-title"
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: '#F8F9FA' }}
          >
            Our Journey
          </h2>
          <div className="relative">
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5"
              style={{ background: 'rgba(0, 255, 255, 0.3)' }}
              aria-hidden="true"
            />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div 
                      className="inline-block px-4 py-2 rounded-full mb-2"
                      style={{ background: 'rgba(0, 255, 255, 0.2)' }}
                    >
                      <span style={{ color: '#00FFFF', fontWeight: '700' }}>{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#F8F9FA' }}>
                      {milestone.title}
                    </h3>
                    <p style={{ color: 'rgba(248, 249, 250, 0.7)' }}>
                      {milestone.description}
                    </p>
                  </div>
                  <div 
                    className="w-2/12 flex justify-center"
                    aria-hidden="true"
                  >
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ background: '#00FFFF', boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
                    />
                  </div>
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
          aria-labelledby="team-title"
        >
          <h2 
            id="team-title"
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: '#F8F9FA' }}
          >
            Our Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center rounded-xl p-6"
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  className="text-4xl font-extrabold mb-2"
                  style={{ color: '#00FFFF' }}
                >
                  {item.count}
                </div>
                <div className="font-semibold mb-1" style={{ color: '#F8F9FA' }}>
                  {item.role}
                </div>
                <div style={{ color: 'rgba(248, 249, 250, 0.6)', fontSize: '14px' }}>
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div 
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}
          >
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ color: '#F8F9FA' }}
            >
              Ready to Get Started?
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: 'rgba(248, 249, 250, 0.8)' }}
            >
              Join millions of users experiencing seamless connectivity with eSIM Myanmar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/esim-register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)',
                  color: '#1e2f3c',
                  minHeight: '48px'
                }}
              >
                Get Your eSIM
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all"
                style={{
                  background: 'transparent',
                  color: '#00FFFF',
                  border: '2px solid #00FFFF',
                  minHeight: '48px'
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
