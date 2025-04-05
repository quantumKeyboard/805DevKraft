
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-fintwin-blue-light/10 via-fintwin-teal-light/5 to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-fintwin-blue-light/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-fintwin-teal-light/5 blur-3xl rounded-full" />
      </div>
      
      <div className="container relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintwin-blue to-fintwin-teal">Financial Twin</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8">
              Visualize your financial future and make better decisions today with personalized simulations and predictive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button size="lg" className="font-medium">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="font-medium">
                  See Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required. Free 30-day trial.
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="flex-1 shadow-xl rounded-xl overflow-hidden">
            <div className="bg-card border p-2 rounded-xl">
              <div className="bg-gradient-to-br from-fintwin-blue/10 to-fintwin-teal/10 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="FinTwin Dashboard Preview" 
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
