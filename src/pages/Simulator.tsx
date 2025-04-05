
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, ChevronDown, LineChart, User, History, PiggyBank, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScenarioSimulator from '@/components/ScenarioSimulator';

const Simulator = () => {
  return (
    <div className="min-h-screen bg-fintwin-green-lightest/50">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-fintwin-green-light/20">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintwin-green-dark to-fintwin-green-darker">
                FinTwin
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-fintwin-green-dark hover:text-fintwin-green-darker">Dashboard</Link>
              <Link to="/simulator" className="text-sm font-medium text-foreground">Simulator</Link>
              <Link to="/predictions" className="text-sm font-medium text-fintwin-green-dark hover:text-fintwin-green-darker">Predictions</Link>
              <Link to="/learning" className="text-sm font-medium text-fintwin-green-dark hover:text-fintwin-green-darker">Learning</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-fintwin-green-dark">
              <PiggyBank className="h-4 w-4 mr-2" />
              <span>$24,500</span>
            </Button>
            <Button variant="outline" size="icon" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold text-fintwin-green-darker">Financial Decision Simulator</h1>
            <p className="text-fintwin-green-dark">Test different financial decisions before making them</p>
          </div>

          <Tabs defaultValue="decision" className="space-y-8">
            <TabsList className="bg-fintwin-green-lightest border border-fintwin-green-light/20 p-1">
              <TabsTrigger 
                value="decision"
                className="data-[state=active]:bg-white data-[state=active]:text-fintwin-green-darker"
              >
                Decision Simulator
              </TabsTrigger>
              <TabsTrigger 
                value="historical"
                className="data-[state=active]:bg-white data-[state=active]:text-fintwin-green-darker"
              >
                Past Decisions Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="templates"
                className="data-[state=active]:bg-white data-[state=active]:text-fintwin-green-darker"
              >
                Templates
              </TabsTrigger>
            </Tabs>

            <TabsContent value="decision" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <Card className="border-fintwin-green-medium/20 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-fintwin-green-darker">Your Financial Profile</CardTitle>
                      <CardDescription>
                        Simulation is based on this information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-fintwin-green-dark">Monthly Income</span>
                        <span className="font-medium">$5,800</span>
                      </div>
                      <div className="h-px bg-fintwin-green-light/20"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-fintwin-green-dark">Essential Expenses</span>
                        <span className="font-medium">$3,200</span>
                      </div>
                      <div className="h-px bg-fintwin-green-light/20"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-fintwin-green-dark">Discretionary Spending</span>
                        <span className="font-medium">$1,500</span>
                      </div>
                      <div className="h-px bg-fintwin-green-light/20"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-fintwin-green-dark">Monthly Savings</span>
                        <span className="font-medium">$1,100</span>
                      </div>
                      <div className="h-px bg-fintwin-green-light/20"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-fintwin-green-dark">Emergency Fund</span>
                        <span className="font-medium">$7,500</span>
                      </div>
                      <div className="h-px bg-fintwin-green-light/20"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-fintwin-green-dark">Total Debt</span>
                        <span className="font-medium">$18,400</span>
                      </div>
                      <div className="h-px bg-fintwin-green-light/20"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-fintwin-green-dark">Financial Health Score</span>
                        <span className="font-medium text-amber-500">72/100</span>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-2 border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Update Financial Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-fintwin-green-medium/20 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-fintwin-green-darker">Saved Scenarios</CardTitle>
                      <CardDescription>Previously simulated financial decisions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Home Renovation
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        New Car Purchase
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Job Change
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Debt Consolidation
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <ScenarioSimulator />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="historical" className="space-y-6">
              <Card className="border-fintwin-green-medium/20 shadow-md">
                <CardHeader>
                  <CardTitle className="text-fintwin-green-darker">Past Financial Decisions Analysis</CardTitle>
                  <CardDescription>
                    Review the impact of your previous financial decisions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-fintwin-green-darker">Recent Decisions</h3>
                      <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        <History className="h-4 w-4 mr-2" /> View All
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-fintwin-green-light/20 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-3">
                              <Landmark className="h-5 w-5 text-fintwin-green-dark" />
                            </div>
                            <div>
                              <h4 className="font-medium text-fintwin-green-darker">Apartment Rental Upgrade</h4>
                              <p className="text-sm text-gray-500">December 2024</p>
                            </div>
                          </div>
                          <div className="px-3 py-1 rounded-full text-sm font-medium text-amber-500 bg-amber-50">
                            Moderate Impact
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-gray-500">Monthly Cost</p>
                            <p className="font-medium">+$450</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Savings Impact</p>
                            <p className="font-medium text-amber-500">-38%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Satisfaction</p>
                            <p className="font-medium text-green-500">High</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-2 border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                          View Detailed Analysis
                        </Button>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-fintwin-green-light/20 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-3">
                              <LineChart className="h-5 w-5 text-fintwin-green-dark" />
                            </div>
                            <div>
                              <h4 className="font-medium text-fintwin-green-darker">Investment Portfolio Rebalance</h4>
                              <p className="text-sm text-gray-500">October 2024</p>
                            </div>
                          </div>
                          <div className="px-3 py-1 rounded-full text-sm font-medium text-green-500 bg-green-50">
                            Positive Impact
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-gray-500">One-time Cost</p>
                            <p className="font-medium">$0</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Return Improvement</p>
                            <p className="font-medium text-green-500">+2.3%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Risk Level</p>
                            <p className="font-medium">Moderate</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-2 border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                          View Detailed Analysis
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <Card className="border-fintwin-green-medium/20 shadow-md">
                <CardHeader>
                  <CardTitle className="text-fintwin-green-darker">Decision Templates</CardTitle>
                  <CardDescription>
                    Common financial scenarios with pre-built simulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-fintwin-green-light/20 hover:border-fintwin-green-medium/40 transition-colors cursor-pointer">
                      <h4 className="font-medium text-fintwin-green-darker mb-2">Home Purchase</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Simulate the impact of buying a home, including mortgage payments, maintenance costs, and tax benefits.
                      </p>
                      <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Use Template
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-fintwin-green-light/20 hover:border-fintwin-green-medium/40 transition-colors cursor-pointer">
                      <h4 className="font-medium text-fintwin-green-darker mb-2">Job Change</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Analyze the financial effects of changing jobs, including salary adjustments, benefits changes, and relocation costs.
                      </p>
                      <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Use Template
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-fintwin-green-light/20 hover:border-fintwin-green-medium/40 transition-colors cursor-pointer">
                      <h4 className="font-medium text-fintwin-green-darker mb-2">Major Purchase</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Evaluate the impact of a significant purchase like a vehicle, appliance, or electronics on your overall financial health.
                      </p>
                      <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Use Template
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-fintwin-green-light/20 hover:border-fintwin-green-medium/40 transition-colors cursor-pointer">
                      <h4 className="font-medium text-fintwin-green-darker mb-2">Debt Consolidation</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Compare different approaches to consolidating and paying off debt, including timeline and interest savings.
                      </p>
                      <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Use Template
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-fintwin-green-light/20 hover:border-fintwin-green-medium/40 transition-colors cursor-pointer">
                      <h4 className="font-medium text-fintwin-green-darker mb-2">Expense Reduction</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Model the long-term impact of cutting specific expenses and redirecting those funds to savings or debt reduction.
                      </p>
                      <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Use Template
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-fintwin-green-light/20 hover:border-fintwin-green-medium/40 transition-colors cursor-pointer">
                      <h4 className="font-medium text-fintwin-green-darker mb-2">Education Funding</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Plan for education expenses with simulations of different saving and funding strategies, including loans.
                      </p>
                      <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Simulator;
