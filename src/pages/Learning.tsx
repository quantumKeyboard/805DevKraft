
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Award, Bell, BookOpen, Check, ChevronDown, Clock, CoinsIcon, ExternalLink, Play, Search, TrendingUp, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Learning = () => {
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
              <Link to="/predictions" className="text-sm font-medium text-muted-foreground hover:text-foreground">Predictions</Link>
              <Link to="/learning" className="text-sm font-medium text-foreground">Learning</Link>
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
            <h1 className="text-3xl font-bold">Learning & Action Center</h1>
            <p className="text-muted-foreground">Personalized financial education with actionable insights</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for financial topics..." 
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="grid grid-cols-4 w-full md:w-[500px]">
              <TabsTrigger value="recommended">For You</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="progress">My Progress</TabsTrigger>
            </TabsList>

            {/* For You Tab */}
            <TabsContent value="recommended" className="space-y-6">
              {/* Featured Learning */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Learning Path</CardTitle>
                  <CardDescription>Personalized based on your financial situation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 rounded-full p-4">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">Building Financial Security</h3>
                      <p className="text-muted-foreground mb-4">
                        A step-by-step program to create a solid financial foundation and reduce money stress.
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">Progress: 3/12 modules</div>
                        <div className="text-sm text-muted-foreground">25%</div>
                      </div>
                      <Progress value={25} className="h-2 mb-4" />
                      <div className="flex flex-wrap gap-3">
                        <Button>
                          Continue Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline">View All Modules</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Micro-Learning */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Quick Lessons</h2>
                  <Button variant="link" className="text-foreground">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

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
                        Learn why emergency funds are crucial and how much you should save.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          5 min read
                        </div>
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
                          <TrendingUp className="h-4 w-4 text-fintwin-teal" />
                        </div>
                        <div className="text-sm font-medium">Debt Payoff Methods</div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Compare avalanche vs. snowball methods and which works best for you.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          8 min read
                        </div>
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
                          <BookOpen className="h-4 w-4 text-fintwin-green" />
                        </div>
                        <div className="text-sm font-medium">Investment Basics</div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Learn fundamental concepts for smart, long-term investing.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          10 min read
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Start
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Current Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Challenges</CardTitle>
                  <CardDescription>Financial goals you're currently working on</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="bg-fintwin-blue-light/20 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-fintwin-blue" />
                          </div>
                          <div>
                            <h3 className="font-medium">No-Spend Challenge</h3>
                            <p className="text-sm text-muted-foreground">
                              Avoid non-essential spending for 30 days
                            </p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">16 days left</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>14/30 days</span>
                        </div>
                        <Progress value={46} className="h-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="bg-fintwin-teal-light/20 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-fintwin-teal" />
                          </div>
                          <div>
                            <h3 className="font-medium">Save $500 Challenge</h3>
                            <p className="text-sm text-muted-foreground">
                              Build your emergency fund with regular contributions
                            </p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">$320 saved</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>$320/$500</span>
                        </div>
                        <Progress value={64} className="h-2" />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Browse More Challenges
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Financial Foundations</CardTitle>
                    <CardDescription>Master the basics of personal finance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3 mr-1" />
                          8 modules
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          3.5 hours
                        </div>
                      </div>
                      <div className="text-xs font-medium text-fintwin-blue">Beginner</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Debt Mastery</CardTitle>
                    <CardDescription>Strategic approaches to eliminating debt</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3 mr-1" />
                          6 modules
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          2.5 hours
                        </div>
                      </div>
                      <div className="text-xs font-medium text-fintwin-teal">Intermediate</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Investment Strategies</CardTitle>
                    <CardDescription>Building wealth through smart investing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3 mr-1" />
                          10 modules
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          4 hours
                        </div>
                      </div>
                      <div className="text-xs font-medium text-fintwin-green">Advanced</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Retirement Planning</CardTitle>
                    <CardDescription>Setting up your future financial security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3 mr-1" />
                          7 modules
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          3 hours
                        </div>
                      </div>
                      <div className="text-xs font-medium text-fintwin-teal">Intermediate</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tax Optimization</CardTitle>
                    <CardDescription>Legal strategies to minimize tax burden</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3 mr-1" />
                          6 modules
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          2.5 hours
                        </div>
                      </div>
                      <div className="text-xs font-medium text-fintwin-green">Advanced</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full p-3">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Real Estate Investing</CardTitle>
                    <CardDescription>Building wealth through property</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3 mr-1" />
                          9 modules
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          4.5 hours
                        </div>
                      </div>
                      <div className="text-xs font-medium text-fintwin-green">Advanced</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Challenges</CardTitle>
                  <CardDescription>Gamified goals to improve your financial health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="bg-fintwin-blue-light/20 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-fintwin-blue" />
                          </div>
                          <div>
                            <h3 className="font-medium">30-Day No-Spend Challenge</h3>
                            <p className="text-sm text-muted-foreground">
                              Avoid discretionary spending for 30 days
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                      <div className="pl-12">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            842 participants
                          </div>
                          <div className="flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            65% completion rate
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="bg-fintwin-teal-light/20 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-fintwin-teal" />
                          </div>
                          <div>
                            <h3 className="font-medium">$1,000 Emergency Fund</h3>
                            <p className="text-sm text-muted-foreground">
                              Build your first emergency fund within 3 months
                            </p>
                          </div>
                        </div>
                        <Button size="sm">Join</Button>
                      </div>
                      <div className="pl-12">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            1,247 participants
                          </div>
                          <div className="flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            72% completion rate
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="bg-fintwin-green-light/20 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-fintwin-green" />
                          </div>
                          <div>
                            <h3 className="font-medium">Debt Payoff Sprint</h3>
                            <p className="text-sm text-muted-foreground">
                              Pay off a specific debt with accelerated payments
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                      <div className="pl-12">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            1,836 participants
                          </div>
                          <div className="flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            58% completion rate
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="bg-fintwin-orange-light/20 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-fintwin-orange" />
                          </div>
                          <div>
                            <h3 className="font-medium">Budget Mastery</h3>
                            <p className="text-sm text-muted-foreground">
                              Create and stick to a budget for 60 days straight
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                      <div className="pl-12">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            2,104 participants
                          </div>
                          <div className="flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            51% completion rate
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="bg-fintwin-purple-light/20 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-fintwin-purple" />
                          </div>
                          <div>
                            <h3 className="font-medium">Investment Starter</h3>
                            <p className="text-sm text-muted-foreground">
                              Make your first investment and learn the basics
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                      <div className="pl-12">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            968 participants
                          </div>
                          <div className="flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            83% completion rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Learning Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-2">
                      <div className="text-4xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">consecutive days</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 rounded-md flex items-center justify-center text-xs ${
                            i < 5 ? "bg-fintwin-blue text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Completed Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-2">
                      <div className="text-4xl font-bold">2</div>
                      <div className="text-sm text-muted-foreground">finished courses</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Certificates
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Badges Earned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-2">
                      <div className="text-4xl font-bold">8</div>
                      <div className="text-sm text-muted-foreground">achievement badges</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Badges
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Learning History</CardTitle>
                  <CardDescription>Your recent educational activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center border-b pb-4">
                      <div className="bg-fintwin-blue-light/20 p-2 rounded-full mr-3">
                        <BookOpen className="h-4 w-4 text-fintwin-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Emergency Fund Basics</h3>
                          <div className="text-xs text-muted-foreground">2 days ago</div>
                        </div>
                        <div className="text-sm text-muted-foreground">Module 3 completed</div>
                      </div>
                    </div>

                    <div className="flex items-center border-b pb-4">
                      <div className="bg-fintwin-teal-light/20 p-2 rounded-full mr-3">
                        <Award className="h-4 w-4 text-fintwin-teal" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Savings Streak Badge</h3>
                          <div className="text-xs text-muted-foreground">3 days ago</div>
                        </div>
                        <div className="text-sm text-muted-foreground">Badge earned for 7-day streak</div>
                      </div>
                    </div>

                    <div className="flex items-center border-b pb-4">
                      <div className="bg-fintwin-green-light/20 p-2 rounded-full mr-3">
                        <BookOpen className="h-4 w-4 text-fintwin-green" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Debt Management Strategies</h3>
                          <div className="text-xs text-muted-foreground">5 days ago</div>
                        </div>
                        <div className="text-sm text-muted-foreground">Course completed</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-fintwin-orange-light/20 p-2 rounded-full mr-3">
                        <BookOpen className="h-4 w-4 text-fintwin-orange" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Investment Basics</h3>
                          <div className="text-xs text-muted-foreground">1 week ago</div>
                        </div>
                        <div className="text-sm text-muted-foreground">Module 1 completed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Graph</CardTitle>
                  <CardDescription>Your financial education progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded flex items-center justify-center">
                    <div className="text-muted-foreground">Financial Knowledge Visualization</div>
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

export default Learning;
