
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Bell, ChevronDown, CoinsIcon, DollarSign, LineChart, Percentage, PieChart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Simulator = () => {
  const [savingsRate, setSavingsRate] = useState(15);
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3500);
  const [investments, setInvestments] = useState(500);
  const [timeHorizon, setTimeHorizon] = useState(10);
  
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintwin-blue to-fintwin-teal">
                FinTwin
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link to="/simulator" className="text-sm font-medium text-foreground">Simulator</Link>
              <Link to="/predictions" className="text-sm font-medium text-muted-foreground hover:text-foreground">Predictions</Link>
              <Link to="/learning" className="text-sm font-medium text-muted-foreground hover:text-foreground">Learning</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <CoinsIcon className="h-4 w-4 mr-2" />
              <span>$24,500</span>
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Page Heading */}
          <div>
            <h1 className="text-3xl font-bold">Financial Twin Simulator</h1>
            <p className="text-muted-foreground">Test different scenarios to visualize your financial future</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Simulator Controls */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Parameters</CardTitle>
                  <CardDescription>Adjust these values to see how they affect your financial future</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Income */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="income" className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Monthly Income
                      </Label>
                      <div className="font-medium">${income}</div>
                    </div>
                    <Slider
                      id="income"
                      min={1000}
                      max={15000}
                      step={100}
                      value={[income]}
                      onValueChange={(value) => setIncome(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$1,000</span>
                      <span>$15,000</span>
                    </div>
                  </div>

                  {/* Expenses */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="expenses" className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Monthly Expenses
                      </Label>
                      <div className="font-medium">${expenses}</div>
                    </div>
                    <Slider
                      id="expenses"
                      min={500}
                      max={10000}
                      step={100}
                      value={[expenses]}
                      onValueChange={(value) => setExpenses(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$500</span>
                      <span>$10,000</span>
                    </div>
                  </div>

                  {/* Investments */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="investments" className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Monthly Investments
                      </Label>
                      <div className="font-medium">${investments}</div>
                    </div>
                    <Slider
                      id="investments"
                      min={0}
                      max={5000}
                      step={50}
                      value={[investments]}
                      onValueChange={(value) => setInvestments(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$5,000</span>
                    </div>
                  </div>

                  {/* Savings Rate */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="savings-rate" className="flex items-center">
                        <Percentage className="h-4 w-4 mr-1" />
                        Savings Rate
                      </Label>
                      <div className="font-medium">{savingsRate}%</div>
                    </div>
                    <Slider
                      id="savings-rate"
                      min={0}
                      max={50}
                      step={1}
                      value={[savingsRate]}
                      onValueChange={(value) => setSavingsRate(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Time Horizon */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="time-horizon">Time Horizon (years)</Label>
                      <div className="font-medium">{timeHorizon} years</div>
                    </div>
                    <Slider
                      id="time-horizon"
                      min={1}
                      max={30}
                      step={1}
                      value={[timeHorizon]}
                      onValueChange={(value) => setTimeHorizon(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    Run Simulation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Templates</CardTitle>
                  <CardDescription>Quick start with common financial goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-between">
                    Home Purchase
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Retirement Planning
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Debt Freedom
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    College Fund
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Simulation Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Results</CardTitle>
                  <CardDescription>Based on your current parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="details">Detailed View</TabsTrigger>
                      <TabsTrigger value="compare">Compare</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-6">
                      {/* Results Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-card border p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Net Worth ({timeHorizon} years)</div>
                          <div className="text-2xl font-bold mt-1">$347,580</div>
                          <div className="text-xs text-green-500 flex items-center mt-1">
                            <LineChart className="h-3 w-3 mr-1" /> +218% growth
                          </div>
                        </div>
                        <div className="bg-card border p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Monthly Passive Income</div>
                          <div className="text-2xl font-bold mt-1">$1,450</div>
                          <div className="text-xs text-green-500 mt-1">29% of current expenses</div>
                        </div>
                        <div className="bg-card border p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Financial Independence</div>
                          <div className="text-2xl font-bold mt-1">17.4 years</div>
                          <div className="text-xs text-muted-foreground mt-1">at current rate</div>
                        </div>
                      </div>

                      {/* Results Chart */}
                      <div className="border rounded-lg p-4">
                        <div className="h-72 bg-muted rounded flex items-center justify-center">
                          <div className="text-muted-foreground">Net Worth Projection Chart</div>
                        </div>
                      </div>

                      {/* Asset Allocation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="text-sm font-semibold mb-4">Projected Asset Allocation</h3>
                          <div className="h-48 bg-muted rounded flex items-center justify-center">
                            <PieChart className="h-6 w-6 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h3 className="text-sm font-semibold mb-4">Income Sources</h3>
                          <div className="h-48 bg-muted rounded flex items-center justify-center">
                            <PieChart className="h-6 w-6 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="details">
                      <div className="h-96 bg-muted rounded flex items-center justify-center mt-4">
                        <div className="text-muted-foreground">Detailed Financial Projection View</div>
                      </div>
                    </TabsContent>

                    <TabsContent value="compare">
                      <div className="h-96 bg-muted rounded flex items-center justify-center mt-4">
                        <div className="text-muted-foreground">Scenario Comparison View</div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Adjustments</CardTitle>
                  <CardDescription>Suggestions to improve your financial outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-100 dark:bg-green-800 p-1.5 rounded-full">
                          <LineChart className="h-4 w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium">Increase savings rate to 20%</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Increasing your savings rate by just 5% could add $87,500 to your net worth over {timeHorizon} years and reduce your path to financial independence by 2.3 years.
                      </p>
                      <Button size="sm" variant="outline">Apply This Change</Button>
                    </div>

                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-100 dark:bg-blue-800 p-1.5 rounded-full">
                          <LineChart className="h-4 w-4 text-blue-500" />
                        </div>
                        <h3 className="font-medium">Optimize investment allocation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Adjusting your investment allocation based on your time horizon could potentially increase returns by 1.2% annually, adding $54,300 to your net worth.
                      </p>
                      <Button size="sm" variant="outline">Apply This Change</Button>
                    </div>

                    <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-orange-100 dark:bg-orange-800 p-1.5 rounded-full">
                          <LineChart className="h-4 w-4 text-orange-500" />
                        </div>
                        <h3 className="font-medium">Reduce monthly expenses by 10%</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Finding ways to cut $350 from your monthly expenses could dramatically improve your financial situation, adding $126,000 to your net worth over time.
                      </p>
                      <Button size="sm" variant="outline">Apply This Change</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Simulator;
