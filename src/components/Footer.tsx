
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-fintwin-gray-100 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fintwin-blue to-fintwin-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <span className="font-bold text-xl text-fintwin-blue-dark">FinTwin</span>
            </div>
            <p className="text-fintwin-gray-600 max-w-xs">
              Your financial digital twin. Visualize your future and make better financial decisions today.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Pricing</Link></li>
              <li><Link to="/roadmap" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Roadmap</Link></li>
              <li><Link to="/security" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Guides</Link></li>
              <li><Link to="/help" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Help Center</Link></li>
              <li><Link to="/api" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Contact</Link></li>
              <li><Link to="/legal" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-fintwin-gray-600 text-sm">
            © {new Date().getFullYear()} FinTwin. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-fintwin-gray-600 hover:text-fintwin-blue transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
