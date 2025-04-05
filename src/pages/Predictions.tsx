
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Bell, Calendar, ChevronDown, CoinsIcon, LineChart, TrendingDown, TrendingUp, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Predictions = () => {
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
              <Link to="/simulator" className="text-sm font-medium text-muted-foreground hover:text-foreground">Simulator</Link>
              <Link to="/predictions" className="text-sm font-medium text-foreground">Predictions</Link>
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
            <h1 className="text-3xl font-bold">Financial Predictions</h1>
            <p className="text-muted-foreground">AI-powered insights about your financial future</p>
          </div>

          <Tabs defaultValue="risks" className="w-full">
            <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
              <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            {/* Risk Analysis Tab */}
            <TabsContent value="risks" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 md:row-span-2">
                  <CardHeader>
                    <CardTitle>Risk Factors</CardTitle>
                    <CardDescription>Potential financial vulnerabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Emergency Fund</div>
                        <div className="text-xs text-yellow-500 font-medium">High Risk</div>
                      </div>
                      <Progress value={78} className="h-2 w-full bg-yellow-100 dark:bg-yellow-900/20" />
                      <p className="text-xs text-muted-foreground">
                        Your emergency fund covers only 1.2 months of expenses, below the recommended 3-6 months.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Debt-to-Income Ratio</div>
                        <div className="text-xs text-red-500 font-medium">Critical Risk</div>
                      </div>
                      <Progress value={92} className="h-2 w-full bg-red-100 dark:bg-red-900/20" />
                      <p className="text-xs text-muted-foreground">
                        Your debt payments consume 42% of your income, which is much higher than the recommended 36%.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Retirement Savings</div>
                        <div className="text-xs text-orange-500 font-medium">Medium Risk</div>
                      </div>
                      <Progress value={45} className="h-2 w-full bg-orange-100 dark:bg-orange-900/20" />
                      <p className="text-xs text-muted-foreground">
                        You're currently on track for 65% of your retirement needs at age 65.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Investment Diversity</div>
                        <div className="text-xs text-green-500 font-medium">Low Risk</div>
                      </div>
                      <Progress value={25} className="h-2 w-full bg-green-100 dark:bg-green-900/20" />
                      <p className="text-xs text-muted-foreground">
                        Your investments are well-diversified across multiple asset classes.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Insurance Coverage</div>
                        <div className="text-xs text-orange-500 font-medium">Medium Risk</div>
                      </div>
                      <Progress value={55} className="h-2 w-full bg-orange-100 dark:bg-orange-900/20" />
                      <p className="text-xs text-muted-foreground">
                        Your health insurance has high deductibles and your life insurance is insufficient.
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">View All Risk Factors</Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Early Warning System</CardTitle>
                    <CardDescription>Critical issues that need immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/10">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Credit Card Balance Nearly Maxed</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Your Capital One card is at 89% utilization. This will likely impact your credit score within 30 days if not reduced below 30%.
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-red-500">96% probability</div>
                        </div>
                        <div className="pl-8 mt-3">
                          <Button size="sm">View Solution</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Potential Overdraft Risk</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Based on your spending patterns and scheduled payments, your checking account may overdraft around the 27th of this month.
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-yellow-500">78% probability</div>
                        </div>
                        <div className="pl-8 mt-3">
                          <Button size="sm">View Solution</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Long-Term Risk Forecast</CardTitle>
                    <CardDescription>Potential issues in the next 6-12 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-orange-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Mortgage Rate Adjustment</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Your adjustable-rate mortgage will reset in September, potentially increasing your monthly payment by $235-$310.
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-orange-500">90 days</div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Car Maintenance Due</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Based on your vehicle's age and mileage, you'll likely need major maintenance costing $800-$1,200 in the next 4-6 months.
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-blue-500">120 days</div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-purple-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Income Tax Shortfall</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Your current withholding may result in owing approximately $1,500 in additional taxes next April.
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-purple-500">180 days</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending Trends</CardTitle>
                    <CardDescription>Analysis of your spending patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded flex items-center justify-center mb-4">
                      <LineChart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-sm">Food & Dining</span>
                        </div>
                        <div className="text-sm font-medium text-red-500">+18% increase</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <TrendingDown className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Utilities</span>
                        </div>
                        <div className="text-sm font-medium text-green-500">-7% decrease</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-sm">Shopping</span>
                        </div>
                        <div className="text-sm font-medium text-red-500">+12% increase</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Income Analysis</CardTitle>
                    <CardDescription>Patterns and variations in your income</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded flex items-center justify-center mb-4">
                      <LineChart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Main Salary</span>
                        </div>
                        <div className="text-sm font-medium text-green-500">+3% increase</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-sm">Side Income</span>
                        </div>
                        <div className="text-sm font-medium text-red-500">-15% decrease</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Investment Returns</span>
                        </div>
                        <div className="text-sm font-medium text-green-500">+8% increase</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Net Worth Projection</CardTitle>
                    <CardDescription>Forecasted growth based on current trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-muted rounded flex items-center justify-center">
                      <LineChart className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>Customize when and how you receive financial alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <h3 className="font-medium">Low Balance Warning</h3>
                        <p className="text-sm text-muted-foreground">Alert when account falls below $500</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <h3 className="font-medium">Unusual Spending</h3>
                        <p className="text-sm text-muted-foreground">Alert when spending is 30% above monthly average</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <h3 className="font-medium">Bill Due Reminder</h3>
                        <p className="text-sm text-muted-foreground">Alert 3 days before bills are due</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <h3 className="font-medium">Credit Score Changes</h3>
                        <p className="text-sm text-muted-foreground">Alert when score changes by more than 20 points</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <h3 className="font-medium">Investment Opportunity</h3>
                        <p className="text-sm text-muted-foreground">Alert when cash balance could be better allocated</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button className="w-full">Add New Alert</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Historical record of financial alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Low Balance Warning</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your checking account balance fell below $500 on June 24.
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">2 days ago</div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Bill Due Reminder</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your electric bill of $87.45 is due in 3 days.
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">4 days ago</div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Bell className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Investment Opportunity</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your savings account has $5,000+ that could earn more in a CD or investment account.
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">1 week ago</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">View All Alerts</Button>
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

export default Predictions;
