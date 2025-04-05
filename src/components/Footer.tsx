
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-fintwin-green-light/20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fintwin-green-medium to-fintwin-green-darker flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <span className="font-bold text-xl text-fintwin-green-darker">FinTwin</span>
            </div>
            <p className="text-fintwin-green-dark max-w-xs">
              Your financial digital twin. Track expenses, predict outcomes, and make better financial decisions today.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-fintwin-green-darker">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Pricing</Link></li>
              <li><Link to="/roadmap" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Roadmap</Link></li>
              <li><Link to="/security" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-fintwin-green-darker">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Guides</Link></li>
              <li><Link to="/help" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Help Center</Link></li>
              <li><Link to="/api" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-fintwin-green-darker">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Contact</Link></li>
              <li><Link to="/legal" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-fintwin-green-light/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-fintwin-green-dark text-sm">
            © {new Date().getFullYear()} FinTwin. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-fintwin-green-dark hover:text-fintwin-green-darker transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
