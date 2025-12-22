import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME || 'eSIM Myanmar Entertainment Server';
  const DOMAIN = process.env.REACT_APP_DOMAIN || 'esim.com.mm';
  const EMAIL = process.env.REACT_APP_CONTACT_EMAIL || 'info@esim.com.mm';
  const PHONE = process.env.REACT_APP_CONTACT_PHONE || '09650000172';
  const SOCIAL = process.env.REACT_APP_SOCIAL_HANDLE || '@eSIMMyanmar';

  return (
    <footer className="glass-effect border-t border-primary/10 mt-12 sm:mt-16 lg:mt-20" role="contentinfo">
      <div className="container py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold gradient-text mb-3 sm:mb-4">{SITE_NAME}</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 leading-relaxed">
              Enterprise eSIM Management Platform serving 50M+ users across ASEAN.
            </p>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <p>{DOMAIN}</p>
              <p>{EMAIL}</p>
              <p>{PHONE}</p>
              <p>{SOCIAL}</p>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-sm sm:text-base text-white font-semibold mb-3 sm:mb-4">Products</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/plans" className="text-gray-400 hover:text-primary transition-colors">Plans & Pricing</Link></li>
              <li><Link to="/esim-register" className="text-gray-400 hover:text-primary transition-colors">eSIM Store</Link></li>
              <li><Link to="/supported-devices" className="text-gray-400 hover:text-primary transition-colors">Devices</Link></li>
              <li><Link to="/coverage" className="text-gray-400 hover:text-primary transition-colors">Roaming</Link></li>
              <li><Link to="/partners" className="text-gray-400 hover:text-primary transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm sm:text-base text-white font-semibold mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-primary transition-colors">Support</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm sm:text-base text-white font-semibold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">
            <p>2025-2026 {SITE_NAME}. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;