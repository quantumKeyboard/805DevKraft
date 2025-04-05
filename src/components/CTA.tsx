
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-fintwin-blue/10 to-fintwin-teal/10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-fintwin-blue-light/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-fintwin-teal-light/5 blur-3xl rounded-full" />
      </div>
      
      <div className="container relative z-10">
        <div className="bg-card border rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Financial Future?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of having a financial digital twin. Start your free 30-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="font-medium">
                Get Started Free
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="font-medium">
                See Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
