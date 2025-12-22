import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME || 'eSIM Myanmar Entertainment Server';
  const DOMAIN = process.env.REACT_APP_DOMAIN || 'esim.com.mm';
  const EMAIL = process.env.REACT_APP_CONTACT_EMAIL || 'info@esim.com.mm';
  const PHONE = process.env.REACT_APP_CONTACT_PHONE || '09650000172';
  const SOCIAL = process.env.REACT_APP_SOCIAL_HANDLE || '@eSIMMyanmar';

  return (
    <footer className="glass-effect border-t border-primary/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">{SITE_NAME}</h3>
            <p className="text-gray-400 text-sm mb-4">
              Enterprise eSIM Management Platform serving 50M+ users across ASEAN.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{DOMAIN}</p>
              <p>{EMAIL}</p>
              <p>{PHONE}</p>
              <p>{SOCIAL}</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/plans" className="text-gray-400 hover:text-primary transition-colors">Plans & Pricing</Link></li>
              <li><Link to="/esim-store" className="text-gray-400 hover:text-primary transition-colors">eSIM Store</Link></li>
              <li><Link to="/devices" className="text-gray-400 hover:text-primary transition-colors">Devices</Link></li>
              <li><Link to="/roaming" className="text-gray-400 hover:text-primary transition-colors">Roaming</Link></li>
              <li><Link to="/enterprise" className="text-gray-400 hover:text-primary transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Entertainment</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tv" className="text-gray-400 hover:text-primary transition-colors">TV</Link></li>
              <li><Link to="/movies" className="text-gray-400 hover:text-primary transition-colors">Movies</Link></li>
              <li><Link to="/games" className="text-gray-400 hover:text-primary transition-colors">Games</Link></li>
              <li><Link to="/music" className="text-gray-400 hover:text-primary transition-colors">Music</Link></li>
              <li><Link to="/download" className="text-gray-400 hover:text-primary transition-colors">Downloads</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-primary transition-colors">Press</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>2025-2026 {SITE_NAME}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/gdpr" className="hover:text-primary transition-colors">GDPR</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;