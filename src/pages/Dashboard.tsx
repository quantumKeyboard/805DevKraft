
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Bell, Brain, ChevronDown, Clock, CoinsIcon, LineChart, Sliders, TrendingUp, User, Zap } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [financialHealth, setFinancialHealth] = useState(78);

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
              <Link to="/dashboard" className="text-sm font-medium text-foreground">Dashboard</Link>
              <Link to="/simulator" className="text-sm font-medium text-muted-foreground hover:text-foreground">Simulator</Link>
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
          {/* Dashboard Heading */}
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
            <p className="text-muted-foreground">Here's your financial snapshot for today</p>
          </div>

          {/* Mode Selector */}
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="overview">Predictor Mode</TabsTrigger>
              <TabsTrigger value="simulator">Twin Mode</TabsTrigger>
            </TabsList>

            {/* Predictor Mode Content */}
            <TabsContent value="overview" className="space-y-6">
              {/* Financial Health Score */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center justify-between">
                      Financial Health
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">How is this calculated?</h4>
                            <p className="text-sm">
                              Your financial health score is based on your savings rate, debt-to-income ratio, emergency fund coverage, and investment diversity.
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </CardTitle>
                    <CardDescription>Based on your current financial data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center rounded-full border-8 border-fintwin-blue/20 p-8">
                          <div className="text-4xl font-bold">{financialHealth}</div>
                        </div>
                      </div>
                      <Progress value={financialHealth} className="h-2 w-full" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>Poor</div>
                        <div>Excellent</div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">View Details</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Risk Prediction</CardTitle>
                    <CardDescription>Potential financial vulnerabilities in next 6 months</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="font-medium">Emergency Fund Gap</span>
                        </div>
                        <div className="text-sm text-muted-foreground">67% risk</div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span className="font-medium">High Debt Exposure</span>
                        </div>
                        <div className="text-sm text-muted-foreground">89% risk</div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="font-medium">Investment Diversity</span>
                        </div>
                        <div className="text-sm text-muted-foreground">23% risk</div>
                      </div>
                      <Button variant="outline" className="w-full">View Complete Analysis</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Future Projections */}
              <Card>
                <CardHeader>
                  <CardTitle>Future Projections</CardTitle>
                  <CardDescription>Time machine view of your financial future</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Card className="flex-1 min-w-[250px]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">1 Year Outlook</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">$42,800</div>
                            <div className="text-green-500 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              +12%
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="flex-1 min-w-[250px]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">5 Year Outlook</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">$94,500</div>
                            <div className="text-green-500 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              +45%
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="flex-1 min-w-[250px]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">10 Year Outlook</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">$235,000</div>
                            <div className="text-green-500 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              +110%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-muted-foreground">Interactive financial projection chart</div>
                    </div>
                    <Button>Adjust Projection Variables</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Learning & Action Center */}
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Actions</CardTitle>
                  <CardDescription>Steps to improve your financial health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Build Your Emergency Fund</h4>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="text-sm text-muted-foreground">Priority: High</span>
                        </div>
                        <div className="text-sm">Potential impact: +12 points</div>
                      </div>
                      <Progress value={35} className="h-2 w-full" />
                      <CollapsibleContent className="mt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Your emergency fund covers only 1.2 months of expenses, well below the recommended 3-6 months. 
                          Setting up automatic transfers of $250/month would reach your target in 8 months.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm">Setup Auto-Transfer</Button>
                          <Button variant="outline" size="sm">Learn More</Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Reduce High-Interest Debt</h4>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-sm text-muted-foreground">Priority: Critical</span>
                        </div>
                        <div className="text-sm">Potential impact: +18 points</div>
                      </div>
                      <Progress value={15} className="h-2 w-full" />
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Diversify Investment Portfolio</h4>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-muted-foreground">Priority: Medium</span>
                        </div>
                        <div className="text-sm">Potential impact: +8 points</div>
                      </div>
                      <Progress value={60} className="h-2 w-full" />
                    </div>

                    <Button className="w-full">View All Recommended Actions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Twin Mode Simulator Content */}
            <TabsContent value="simulator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Twin Simulator</CardTitle>
                  <CardDescription>Test different scenarios to see their long-term impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg space-y-4">
                      <h3 className="font-semibold">Create New Scenario</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Scenario Name</label>
                          <input 
                            type="text" 
                            placeholder="Early retirement plan" 
                            className="mt-1 w-full px-3 py-2 bg-background border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Time Horizon</label>
                          <select className="mt-1 w-full px-3 py-2 bg-background border rounded-md">
                            <option>1 Year</option>
                            <option>5 Years</option>
                            <option>10 Years</option>
                            <option>20 Years</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>
                          Create Scenario
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-semibold">Saved Scenarios</h3>
                    <div className="space-y-4">
                      {/* Scenario Card */}
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>Home Purchase Plan</CardTitle>
                            <Button variant="ghost" size="sm">
                              <Sliders className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardDescription>Last modified: Yesterday</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex-1 min-w-[150px]">
                              <div className="text-xs text-muted-foreground">Monthly Savings</div>
                              <div className="text-lg font-semibold">$750</div>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                              <div className="text-xs text-muted-foreground">Down Payment</div>
                              <div className="text-lg font-semibold">$45,000</div>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                              <div className="text-xs text-muted-foreground">Time to Goal</div>
                              <div className="text-lg font-semibold">4.2 years</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Continue Simulation
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Scenario Card */}
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>Debt Payoff Strategy</CardTitle>
                            <Button variant="ghost" size="sm">
                              <Sliders className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardDescription>Last modified: 2 days ago</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex-1 min-w-[150px]">
                              <div className="text-xs text-muted-foreground">Monthly Payment</div>
                              <div className="text-lg font-semibold">$850</div>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                              <div className="text-xs text-muted-foreground">Interest Saved</div>
                              <div className="text-lg font-semibold">$3,245</div>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                              <div className="text-xs text-muted-foreground">Payoff Date</div>
                              <div className="text-lg font-semibold">Jun 2026</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Continue Simulation
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Micro-Learning Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Learning</CardTitle>
              <CardDescription>Personalized financial education based on your situation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-fintwin-blue-light/20 p-2 rounded-full">
                        <CoinsIcon className="h-4 w-4 text-fintwin-blue" />
                      </div>
                      <div className="text-sm font-medium">Emergency Funds</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Learn how to build an adequate emergency fund for financial security.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs">5 min read</div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Start
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-fintwin-teal-light/20 p-2 rounded-full">
                        <LineChart className="h-4 w-4 text-fintwin-teal" />
                      </div>
                      <div className="text-sm font-medium">Debt Strategies</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Compare avalanche vs. snowball methods for faster debt payoff.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs">8 min read</div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Start
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-fintwin-green-light/20 p-2 rounded-full">
                        <BarChart3 className="h-4 w-4 text-fintwin-green" />
                      </div>
                      <div className="text-sm font-medium">Investment Basics</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Learn simple principles for getting started with investing.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs">10 min read</div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Start
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
