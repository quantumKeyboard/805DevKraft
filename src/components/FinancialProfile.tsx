
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PiggyBank, CreditCard, LineChart, DollarSign, Building, BarChart3, Landmark, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { useFinancialProfile } from '@/hooks/useFinancialProfile';

const FinancialProfile = () => {
  const { profile, isLoading } = useFinancialProfile();

  if (isLoading) {
    return (
      <Card className="border-fintwin-green-medium/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-fintwin-green-darker">Your Financial Profile</CardTitle>
          <CardDescription>Loading your financial data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-fintwin-green-lightest rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-fintwin-green-lightest rounded mb-2"></div>
            <div className="h-4 w-36 bg-fintwin-green-lightest rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-fintwin-green-medium/20 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-fintwin-green-darker">Your Financial Profile</CardTitle>
            <CardDescription>
              Overview of your current financial standing
            </CardDescription>
          </div>
          <Link to="/profile">
            <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
              Edit Profile
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-fintwin-green-lightest border border-fintwin-green-light/20 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-fintwin-green-darker">
              Overview
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:text-fintwin-green-darker">
              Details
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-white data-[state=active]:text-fintwin-green-darker">
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="p-4 bg-fintwin-green-lightest/50 rounded-lg border border-fintwin-green-light/20">
              <div className="flex items-center mb-3">
                <PiggyBank className="h-5 w-5 text-fintwin-green-dark mr-2" />
                <h3 className="font-medium text-fintwin-green-darker">Financial Health Score</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-fintwin-green-dark">Current Score</span>
                <span className="font-medium text-amber-500">{profile.financialHealthScore}/100</span>
              </div>
              <Progress value={profile.financialHealthScore} className="h-2 bg-fintwin-green-lightest" />
              <p className="text-xs text-fintwin-green-dark mt-2">
                {profile.financialHealthScore < 60 
                  ? "Your financial health needs attention. Focus on building emergency savings and reducing debt."
                  : profile.financialHealthScore < 80 
                    ? "Your financial health is on the right track. Continue building savings and managing debt wisely."
                    : "Your financial health is excellent! Consider optimizing investments for long-term growth."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="p-3 rounded-lg border border-fintwin-green-light/20 flex flex-col">
                <div className="flex items-center mb-1">
                  <DollarSign className="h-4 w-4 text-fintwin-green-dark mr-1" />
                  <span className="text-xs text-fintwin-green-dark">Monthly Income</span>
                </div>
                <span className="font-medium">${profile.monthlyIncome.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-lg border border-fintwin-green-light/20 flex flex-col">
                <div className="flex items-center mb-1">
                  <Building className="h-4 w-4 text-fintwin-green-dark mr-1" />
                  <span className="text-xs text-fintwin-green-dark">Essential Expenses</span>
                </div>
                <span className="font-medium">${profile.essentialExpenses.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-lg border border-fintwin-green-light/20 flex flex-col">
                <div className="flex items-center mb-1">
                  <Wallet className="h-4 w-4 text-fintwin-green-dark mr-1" />
                  <span className="text-xs text-fintwin-green-dark">Discretionary</span>
                </div>
                <span className="font-medium">${profile.discretionarySpending.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-lg border border-fintwin-green-light/20 flex flex-col">
                <div className="flex items-center mb-1">
                  <PiggyBank className="h-4 w-4 text-fintwin-green-dark mr-1" />
                  <span className="text-xs text-fintwin-green-dark">Monthly Savings</span>
                </div>
                <span className="font-medium">${profile.monthlySavings.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-fintwin-green-light/20">
                <div className="flex items-center mb-2">
                  <Landmark className="h-4 w-4 text-fintwin-green-dark mr-2" />
                  <span className="text-sm font-medium text-fintwin-green-darker">Total Savings</span>
                </div>
                <span className="text-lg font-semibold">${profile.totalSavings.toLocaleString()}</span>
                <div className="mt-1 text-xs text-fintwin-green-dark">
                  {profile.emergencyFundMonths < 3 
                    ? `Emergency fund: ${profile.emergencyFundMonths.toFixed(1)} months (below target)` 
                    : `Emergency fund: ${profile.emergencyFundMonths.toFixed(1)} months (on target)`}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-fintwin-green-light/20">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-4 w-4 text-fintwin-green-dark mr-2" />
                  <span className="text-sm font-medium text-fintwin-green-darker">Total Debt</span>
                </div>
                <span className="text-lg font-semibold">${profile.totalDebt.toLocaleString()}</span>
                <div className="mt-1 text-xs text-fintwin-green-dark">
                  Debt-to-income ratio: {profile.debtToIncomeRatio}%
                </div>
              </div>

              <div className="p-3 rounded-lg border border-fintwin-green-light/20">
                <div className="flex items-center mb-2">
                  <LineChart className="h-4 w-4 text-fintwin-green-dark mr-2" />
                  <span className="text-sm font-medium text-fintwin-green-darker">Net Worth</span>
                </div>
                <span className="text-lg font-semibold">${profile.netWorth.toLocaleString()}</span>
                <div className="mt-1 text-xs text-fintwin-green-dark">
                  {profile.netWorthChange >= 0 
                    ? `+${profile.netWorthChange}% from last month` 
                    : `${profile.netWorthChange}% from last month`}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-fintwin-green-light/20">
                <h3 className="font-medium text-fintwin-green-darker mb-2">Income Sources</h3>
                {profile.incomeSources.map((source, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-fintwin-green-lightest last:border-0">
                    <span className="text-sm">{source.name}</span>
                    <span className="text-sm font-medium">${source.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg border border-fintwin-green-light/20">
                <h3 className="font-medium text-fintwin-green-darker mb-2">Expense Breakdown</h3>
                {profile.expenseCategories.map((category, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-sm font-medium">${category.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={category.percentage} className="h-1.5 bg-fintwin-green-lightest" />
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg border border-fintwin-green-light/20">
                <h3 className="font-medium text-fintwin-green-darker mb-2">Assets & Liabilities</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm text-fintwin-green-dark mb-1">Assets</h4>
                    {profile.assets.map((asset, index) => (
                      <div key={index} className="flex justify-between items-center py-1 text-sm">
                        <span>{asset.name}</span>
                        <span className="font-medium">${asset.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-px bg-fintwin-green-light/20"></div>
                  <div>
                    <h4 className="text-sm text-fintwin-green-dark mb-1">Liabilities</h4>
                    {profile.liabilities.map((liability, index) => (
                      <div key={index} className="flex justify-between items-center py-1 text-sm">
                        <span>{liability.name}</span>
                        <span className="font-medium">${liability.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {profile.financialGoals.map((goal, index) => (
                <div key={index} className="p-3 rounded-lg border border-fintwin-green-light/20">
                  <h3 className="font-medium text-fintwin-green-darker">{goal.name}</h3>
                  <p className="text-xs text-fintwin-green-dark mt-1 mb-2">{goal.description}</p>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Progress: ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}</span>
                    <span className="font-medium">{goal.progressPercentage}%</span>
                  </div>
                  <Progress value={goal.progressPercentage} className="h-2 bg-fintwin-green-lightest" />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-fintwin-green-dark">Target date: {goal.targetDate}</span>
                    <span className="text-xs text-fintwin-green-dark">
                      {goal.onTrack ? 'On track' : 'Behind schedule'}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                Add New Financial Goal
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialProfile;
