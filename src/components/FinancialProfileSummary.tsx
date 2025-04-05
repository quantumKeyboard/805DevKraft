
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank, CreditCard, LineChart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { useFinancialProfile } from '@/hooks/useFinancialProfile';

const FinancialProfileSummary = () => {
  const { profile, isLoading } = useFinancialProfile();

  if (isLoading) {
    return (
      <Card className="border-fintwin-green-medium/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-fintwin-green-darker">Financial Profile</CardTitle>
          <CardDescription>Loading summary...</CardDescription>
        </CardHeader>
        <CardContent className="animate-pulse space-y-4">
          <div className="h-4 bg-fintwin-green-lightest rounded w-3/4"></div>
          <div className="h-8 bg-fintwin-green-lightest rounded"></div>
          <div className="h-4 bg-fintwin-green-lightest rounded w-1/2"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 bg-fintwin-green-lightest rounded"></div>
            <div className="h-16 bg-fintwin-green-lightest rounded"></div>
            <div className="h-16 bg-fintwin-green-lightest rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-fintwin-green-medium/20 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-fintwin-green-darker">Financial Profile</CardTitle>
            <CardDescription>Your financial health at a glance</CardDescription>
          </div>
          <Link to="/profile">
            <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
              View Profile
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-fintwin-green-lightest/50 rounded-lg">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center text-fintwin-green-darker font-medium">
              <PiggyBank className="h-4 w-4 mr-1.5" />
              Financial Health Score
            </span>
            <span className={`text-sm font-medium ${
              profile.financialHealthScore < 60 ? 'text-red-500' : 
              profile.financialHealthScore < 80 ? 'text-amber-500' : 'text-green-500'
            }`}>
              {profile.financialHealthScore}/100
            </span>
          </div>
          <Progress value={profile.financialHealthScore} className="h-2 bg-white" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-2 rounded-lg border border-fintwin-green-light/20">
            <span className="text-xs text-fintwin-green-dark">Monthly Income</span>
            <div className="flex items-center mt-1">
              <DollarSign className="h-3.5 w-3.5 text-fintwin-green-dark mr-1" />
              <span className="font-medium">${profile.monthlyIncome.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="p-2 rounded-lg border border-fintwin-green-light/20">
            <span className="text-xs text-fintwin-green-dark">Net Worth</span>
            <div className="flex items-center mt-1">
              <LineChart className="h-3.5 w-3.5 text-fintwin-green-dark mr-1" />
              <span className="font-medium">${profile.netWorth.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="p-2 rounded-lg border border-fintwin-green-light/20">
            <span className="text-xs text-fintwin-green-dark">Monthly Savings</span>
            <div className="flex items-center mt-1">
              <PiggyBank className="h-3.5 w-3.5 text-fintwin-green-dark mr-1" />
              <span className="font-medium">${profile.monthlySavings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="pt-1 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center text-fintwin-green-dark">
              <CreditCard className="h-3.5 w-3.5 mr-1.5" />
              Debt-to-Income Ratio
            </span>
            <span className={`font-medium ${profile.debtToIncomeRatio > 43 ? 'text-red-500' : 
              profile.debtToIncomeRatio > 36 ? 'text-amber-500' : 'text-green-500'}`}>
              {profile.debtToIncomeRatio}%
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center text-fintwin-green-dark">
              <PiggyBank className="h-3.5 w-3.5 mr-1.5" />
              Emergency Fund
            </span>
            <span className={`font-medium ${profile.emergencyFundMonths < 3 ? 'text-amber-500' : 'text-green-500'}`}>
              {profile.emergencyFundMonths.toFixed(1)} months
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center text-fintwin-green-dark">
              {profile.netWorthChange >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-green-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 mr-1.5 text-red-500" />
              )}
              Net Worth Trend
            </span>
            <span className={`font-medium ${profile.netWorthChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {profile.netWorthChange >= 0 ? '+' : ''}{profile.netWorthChange}%
            </span>
          </div>
        </div>
        
        <div className="pt-2">
          <Link to="/profile">
            <Button variant="outline" size="sm" className="w-full border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
              Update Financial Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialProfileSummary;
