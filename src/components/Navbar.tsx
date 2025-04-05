
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fintwin-blue to-fintwin-teal flex items-center justify-center">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <span className="font-bold text-xl text-fintwin-blue-dark">FinTwin</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <div className="relative group">
              <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors gap-1">
                Learn <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-background border rounded-md p-2 shadow-lg min-w-[180px]">
                <Link to="/blog" className="block p-2 hover:bg-muted rounded-md">Blog</Link>
                <Link to="/resources" className="block p-2 hover:bg-muted rounded-md">Resources</Link>
                <Link to="/guides" className="block p-2 hover:bg-muted rounded-md">Guides</Link>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t py-4 px-4 bg-background animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/features" className="p-2 hover:bg-muted rounded-md">Features</Link>
            <Link to="/pricing" className="p-2 hover:bg-muted rounded-md">Pricing</Link>
            <Link to="/blog" className="p-2 hover:bg-muted rounded-md">Blog</Link>
            <Link to="/resources" className="p-2 hover:bg-muted rounded-md">Resources</Link>
            <Link to="/guides" className="p-2 hover:bg-muted rounded-md">Guides</Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link to="/login">
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
