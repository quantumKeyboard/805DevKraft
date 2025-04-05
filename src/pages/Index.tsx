import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinancial } from '@/context/FinancialContext';

const Index = () => {
  const { financialData } = useFinancial();

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintwin-blue to-fintwin-teal">
              FinTwin
            </span>
          </CardTitle>
          <CardDescription className="text-xl">
            Your Personal Financial Twin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Welcome to FinTwin, your personal financial companion that helps you make better financial decisions through simulation and prediction.
            </p>
            {!financialData.isOnboardingComplete ? (
              <Button size="lg" asChild>
                <Link to="/onboarding">Get Started</Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
