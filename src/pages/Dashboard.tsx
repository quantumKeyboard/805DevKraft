import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFinancial } from '@/context/FinancialContext';
import { ArrowRight, BarChart3, Brain, CoinsIcon, LineChart, TrendingUp, PieChart, Wallet, CreditCard, PiggyBank, Target, Shield, Clock, User, Briefcase, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

const Dashboard = () => {
  const { financialData } = useFinancial();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    income: true,
    expenses: false,
    savings: false,
    debt: false,
    goals: false,
    profile: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Calculate financial health score based on collected data
  const calculateFinancialHealth = () => {
    const income = parseFloat(financialData.monthlyIncome) || 0;
    const expenses = parseFloat(financialData.monthlyExpenses) || 0;
    const savings = parseFloat(financialData.savings) || 0;
    const debt = parseFloat(financialData.debt) || 0;
    const emergencyFund = parseFloat(financialData.emergencyFund) || 0;
    const retirementSavings = parseFloat(financialData.retirementSavings) || 0;
    const investmentAccounts = parseFloat(financialData.investmentAccounts) || 0;

    // Basic scoring logic (can be enhanced)
    let score = 0;
    
    // Savings rate (target: 20% of income)
    const savingsRate = (savings / income) * 100;
    score += Math.min(savingsRate / 20 * 15, 15);

    // Debt-to-income ratio (target: < 30%)
    const debtToIncome = (debt / income) * 100;
    score += Math.max(15 - (debtToIncome / 30 * 15), 0);

    // Emergency fund (target: 3 months of expenses)
    const emergencyFundRatio = emergencyFund / (expenses * 3);
    score += Math.min(emergencyFundRatio * 15, 15);

    // Monthly surplus
    const monthlySurplus = income - expenses;
    const surplusRatio = (monthlySurplus / income) * 100;
    score += Math.min(surplusRatio / 20 * 15, 15);

    // Retirement savings (target: 1x annual income by 30, 3x by 40, etc.)
    const age = parseInt(financialData.age) || 0;
    let retirementTarget = 0;
    if (age < 30) retirementTarget = income * 12;
    else if (age < 40) retirementTarget = income * 12 * 3;
    else if (age < 50) retirementTarget = income * 12 * 6;
    else if (age < 60) retirementTarget = income * 12 * 8;
    else retirementTarget = income * 12 * 10;
    
    const retirementRatio = retirementSavings / retirementTarget;
    score += Math.min(retirementRatio * 15, 15);

    // Investment diversification
    const investmentTypes = financialData.investmentTypes || [];
    const diversificationScore = Math.min(investmentTypes.length * 3, 15);
    score += diversificationScore;

    // Financial habits
    let habitsScore = 0;
    if (financialData.budgetingFrequency === 'monthly' || financialData.budgetingFrequency === 'weekly') habitsScore += 5;
    if (financialData.savingFrequency === 'monthly' || financialData.savingFrequency === 'weekly') habitsScore += 5;
    if (financialData.investmentFrequency === 'monthly' || financialData.investmentFrequency === 'quarterly') habitsScore += 5;
    score += habitsScore;

    return Math.round(score);
  };

  const financialHealth = calculateFinancialHealth();

  // Calculate expense percentages
  const calculateExpensePercentages = () => {
    const totalExpenses = parseFloat(financialData.monthlyExpenses) || 0;
    if (totalExpenses === 0) return {};

    const housing = parseFloat(financialData.housingExpenses) || 0;
    const transportation = parseFloat(financialData.transportationExpenses) || 0;
    const food = parseFloat(financialData.foodExpenses) || 0;
    const utilities = parseFloat(financialData.utilitiesExpenses) || 0;
    const entertainment = parseFloat(financialData.entertainmentExpenses) || 0;
    const other = parseFloat(financialData.otherExpenses) || 0;

    return {
      housing: Math.round((housing / totalExpenses) * 100),
      transportation: Math.round((transportation / totalExpenses) * 100),
      food: Math.round((food / totalExpenses) * 100),
      utilities: Math.round((utilities / totalExpenses) * 100),
      entertainment: Math.round((entertainment / totalExpenses) * 100),
      other: Math.round((other / totalExpenses) * 100),
    };
  };

  const expensePercentages = calculateExpensePercentages();

  // Calculate debt breakdown
  const calculateDebtBreakdown = () => {
    const totalDebt = parseFloat(financialData.debt) || 0;
    if (totalDebt === 0) return {};

    const mortgage = parseFloat(financialData.mortgageDebt) || 0;
    const car = parseFloat(financialData.carDebt) || 0;
    const creditCard = parseFloat(financialData.creditCardDebt) || 0;
    const studentLoan = parseFloat(financialData.studentLoanDebt) || 0;
    const other = parseFloat(financialData.otherDebt) || 0;

    return {
      mortgage: Math.round((mortgage / totalDebt) * 100),
      car: Math.round((car / totalDebt) * 100),
      creditCard: Math.round((creditCard / totalDebt) * 100),
      studentLoan: Math.round((studentLoan / totalDebt) * 100),
      other: Math.round((other / totalDebt) * 100),
    };
  };

  const debtBreakdown = calculateDebtBreakdown();

  // Chart Colors
  const CHART_COLORS = {
    primary: '#2563eb',
    secondary: '#7c3aed',
    success: '#16a34a',
    warning: '#ca8a04',
    danger: '#dc2626',
    muted: '#94a3b8',
    background: '#f8fafc',
  };

  // Prepare expense data for charts
  const prepareExpenseData = () => {
    const totalExpenses = parseFloat(financialData.monthlyExpenses) || 0;
    return [
      { name: 'Housing', value: parseFloat(financialData.housingExpenses) || 0, percentage: expensePercentages.housing || 0 },
      { name: 'Transportation', value: parseFloat(financialData.transportationExpenses) || 0, percentage: expensePercentages.transportation || 0 },
      { name: 'Food', value: parseFloat(financialData.foodExpenses) || 0, percentage: expensePercentages.food || 0 },
      { name: 'Utilities', value: parseFloat(financialData.utilitiesExpenses) || 0, percentage: expensePercentages.utilities || 0 },
      { name: 'Entertainment', value: parseFloat(financialData.entertainmentExpenses) || 0, percentage: expensePercentages.entertainment || 0 },
      { name: 'Other', value: parseFloat(financialData.otherExpenses) || 0, percentage: expensePercentages.other || 0 },
    ];
  };

  // Prepare debt data for charts
  const prepareDebtData = () => {
    const totalDebt = parseFloat(financialData.debt) || 0;
    return [
      { name: 'Mortgage', value: parseFloat(financialData.mortgageDebt) || 0, percentage: debtBreakdown.mortgage || 0 },
      { name: 'Car Loan', value: parseFloat(financialData.carDebt) || 0, percentage: debtBreakdown.car || 0 },
      { name: 'Credit Card', value: parseFloat(financialData.creditCardDebt) || 0, percentage: debtBreakdown.creditCard || 0 },
      { name: 'Student Loan', value: parseFloat(financialData.studentLoanDebt) || 0, percentage: debtBreakdown.studentLoan || 0 },
      { name: 'Other', value: parseFloat(financialData.otherDebt) || 0, percentage: debtBreakdown.other || 0 },
    ];
  };

  // Prepare investment data for charts
  const prepareInvestmentData = () => {
    return [
      { name: 'Emergency Fund', value: parseFloat(financialData.emergencyFund) || 0 },
      { name: 'Retirement', value: parseFloat(financialData.retirementSavings) || 0 },
      { name: 'Investment Accounts', value: parseFloat(financialData.investmentAccounts) || 0 },
    ];
  };

  // Prepare monthly cash flow data
  const prepareCashFlowData = () => {
    const income = parseFloat(financialData.monthlyIncome) || 0;
    const expenses = parseFloat(financialData.monthlyExpenses) || 0;
    const surplus = income - expenses;
    return [
      { name: 'Income', value: income },
      { name: 'Expenses', value: expenses },
      { name: 'Surplus', value: surplus },
    ];
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
              {entry.payload.percentage && ` (${entry.payload.percentage}%)`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get financial goal description
  const getFinancialGoalDescription = () => {
    switch (financialData.financialGoal) {
      case 'emergency':
        return 'Building your emergency fund for financial security';
      case 'debt':
        return 'Paying off debt to improve your financial health';
      case 'investment':
        return 'Starting your investment journey for long-term growth';
      case 'retirement':
        return 'Planning for a secure retirement future';
      case 'home':
        return 'Saving for a home purchase';
      case 'education':
        return 'Funding education or skill development';
      default:
        return 'Setting financial goals for your future';
    }
  };

  // Get risk profile description
  const getRiskProfileDescription = () => {
    const riskTolerance = financialData.riskTolerance || '';
    const investmentExperience = financialData.investmentExperience || '';
    const financialKnowledge = financialData.financialKnowledge || '';
    
    let description = `You have a ${riskTolerance} risk tolerance and ${investmentExperience} investment experience. `;
    
    if (financialKnowledge === 'basic') {
      description += 'You may benefit from more financial education resources.';
    } else if (financialKnowledge === 'intermediate') {
      description += 'You have a good foundation of financial knowledge.';
    } else if (financialKnowledge === 'advanced') {
      description += 'You have advanced financial knowledge and can handle complex strategies.';
    }
    
    return description;
  };

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
              <span>${parseFloat(financialData.savings).toLocaleString()}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Dashboard Heading */}
          <div>
            <h1 className="text-3xl font-bold">Welcome to Your Financial Dashboard</h1>
            <p className="text-muted-foreground">Here's your comprehensive financial snapshot</p>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Financial Health Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Health Score</CardTitle>
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
                  </div>
                </CardContent>
              </Card>

              {/* Financial Snapshot with Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Income & Expenses
                    </CardTitle>
                    <CardDescription>Your monthly cash flow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={prepareCashFlowData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill={CHART_COLORS.primary} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="text-muted-foreground">Monthly Income</div>
                          <div className="font-medium">${parseFloat(financialData.monthlyIncome).toLocaleString()}</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-muted-foreground">Monthly Expenses</div>
                          <div className="font-medium">${parseFloat(financialData.monthlyExpenses).toLocaleString()}</div>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <div className="font-medium">Monthly Surplus</div>
                          <div className="font-medium text-green-600">
                            ${(parseFloat(financialData.monthlyIncome) - parseFloat(financialData.monthlyExpenses)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="h-5 w-5" />
                      Savings & Debt
                    </CardTitle>
                    <CardDescription>Your current financial position</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={[
                                { name: 'Savings', value: parseFloat(financialData.savings) || 0 },
                                { name: 'Debt', value: parseFloat(financialData.debt) || 0 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill={CHART_COLORS.success} />
                              <Cell fill={CHART_COLORS.danger} />
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="text-muted-foreground">Total Savings</div>
                          <div className="font-medium">${parseFloat(financialData.savings).toLocaleString()}</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-muted-foreground">Total Debt</div>
                          <div className="font-medium">${parseFloat(financialData.debt).toLocaleString()}</div>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <div className="font-medium">Net Worth</div>
                          <div className="font-medium">
                            ${(parseFloat(financialData.savings) - parseFloat(financialData.debt)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Your Financial Goal
                  </CardTitle>
                  <CardDescription>{getFinancialGoalDescription()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Short-Term Goal</div>
                        <div className="font-medium">{financialData.shortTermGoal || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Medium-Term Goal</div>
                        <div className="font-medium">{financialData.mediumTermGoal || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Long-Term Goal</div>
                        <div className="font-medium">{financialData.longTermGoal || 'Not set'}</div>
                      </div>
                    </div>
                    <Button className="w-full">
                      View Goal Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Learning Center
                    </CardTitle>
                    <CardDescription>Start your financial education journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/learning">Explore Learning Resources</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5" />
                      Predictions
                    </CardTitle>
                    <CardDescription>View your financial projections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/predictions">View Predictions</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Simulator
                    </CardTitle>
                    <CardDescription>Test different financial scenarios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/simulator">Start Simulation</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Income Tab */}
            <TabsContent value="income" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Income Overview
                  </CardTitle>
                  <CardDescription>Your income sources and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Primary Income</div>
                        <div className="text-2xl font-bold">${parseFloat(financialData.monthlyIncome).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {financialData.incomeSource ? `From ${financialData.incomeSource}` : 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Additional Income</div>
                        <div className="text-2xl font-bold">${parseFloat(financialData.additionalIncome || '0').toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {financialData.additionalIncomeSource ? `From ${financialData.additionalIncomeSource}` : 'Not specified'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="text-muted-foreground">Income Frequency</div>
                        <div className="font-medium capitalize">{financialData.incomeFrequency || 'Not specified'}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-muted-foreground">Total Monthly Income</div>
                        <div className="font-medium">
                          ${(parseFloat(financialData.monthlyIncome) + parseFloat(financialData.additionalIncome || '0')).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expenses Tab */}
            <TabsContent value="expenses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Expense Breakdown
                  </CardTitle>
                  <CardDescription>Your monthly expenses by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Monthly Expenses</div>
                        <div className="text-2xl font-bold">${parseFloat(financialData.monthlyExpenses).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={prepareExpenseData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {prepareExpenseData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={Object.values(CHART_COLORS)[index % Object.keys(CHART_COLORS).length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      {prepareExpenseData().map((expense, index) => (
                        <div key={expense.name} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: Object.values(CHART_COLORS)[index % Object.keys(CHART_COLORS).length] }}
                            />
                            <div className="text-muted-foreground">{expense.name}</div>
                          </div>
                          <div className="font-medium">
                            ${expense.value.toLocaleString()}
                            <span className="text-muted-foreground ml-2">({expense.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Debt Breakdown
                  </CardTitle>
                  <CardDescription>Your current debt by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Debt</div>
                        <div className="text-2xl font-bold">${parseFloat(financialData.debt).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prepareDebtData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="value" fill={CHART_COLORS.primary}>
                            {prepareDebtData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={Object.values(CHART_COLORS)[index % Object.keys(CHART_COLORS).length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      {prepareDebtData().map((debt, index) => (
                        <div key={debt.name} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: Object.values(CHART_COLORS)[index % Object.keys(CHART_COLORS).length] }}
                            />
                            <div className="text-muted-foreground">{debt.name}</div>
                          </div>
                          <div className="font-medium">
                            ${debt.value.toLocaleString()}
                            <span className="text-muted-foreground ml-2">({debt.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Investments Tab */}
            <TabsContent value="investments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Investment Overview
                  </CardTitle>
                  <CardDescription>Your investment portfolio and strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Emergency Fund</div>
                        <div className="text-2xl font-bold">${parseFloat(financialData.emergencyFund || '0').toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Retirement Savings</div>
                        <div className="text-2xl font-bold">${parseFloat(financialData.retirementSavings || '0').toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Investment Accounts</div>
                        <div className="text-2xl font-bold">${parseFloat(financialData.investmentAccounts || '0').toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={prepareInvestmentData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {prepareInvestmentData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={Object.values(CHART_COLORS)[index % Object.keys(CHART_COLORS).length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Investment Types</div>
                        <div className="flex flex-wrap gap-2">
                          {financialData.investmentTypes && financialData.investmentTypes.length > 0 ? (
                            financialData.investmentTypes.map((type, index) => (
                              <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm capitalize">
                                {type.replace('-', ' ')}
                              </div>
                            ))
                          ) : (
                            <div className="text-muted-foreground">No investment types specified</div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-2">Risk Profile</div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Risk Tolerance</span>
                                <span className="font-medium capitalize">{financialData.riskTolerance}</span>
                              </div>
                              <Progress
                                value={
                                  financialData.riskTolerance === 'conservative' ? 33 :
                                  financialData.riskTolerance === 'moderate' ? 66 : 100
                                }
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Investment Experience</span>
                                <span className="font-medium capitalize">{financialData.investmentExperience}</span>
                              </div>
                              <Progress
                                value={
                                  financialData.investmentExperience === 'beginner' ? 33 :
                                  financialData.investmentExperience === 'intermediate' ? 66 : 100
                                }
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Financial Knowledge</span>
                                <span className="font-medium capitalize">{financialData.financialKnowledge}</span>
                              </div>
                              <Progress
                                value={
                                  financialData.financialKnowledge === 'basic' ? 33 :
                                  financialData.financialKnowledge === 'intermediate' ? 66 : 100
                                }
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Goals Tab */}
            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Financial Goals
                  </CardTitle>
                  <CardDescription>Your short, medium, and long-term financial goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Short-Term</CardTitle>
                          <CardDescription>1-2 years</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{financialData.shortTermGoal || 'No short-term goal set'}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Medium-Term</CardTitle>
                          <CardDescription>3-5 years</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{financialData.mediumTermGoal || 'No medium-term goal set'}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Long-Term</CardTitle>
                          <CardDescription>5+ years</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{financialData.longTermGoal || 'No long-term goal set'}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Primary Financial Goal</div>
                        <div className="bg-muted p-4 rounded-lg capitalize">
                          {financialData.financialGoal ? financialData.financialGoal.replace('-', ' ') : 'Not specified'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-2">Financial Priorities</div>
                        <div className="flex flex-wrap gap-2">
                          {financialData.financialPriorities && financialData.financialPriorities.length > 0 ? (
                            financialData.financialPriorities.map((priority, index) => (
                              <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm capitalize">
                                {priority.replace('-', ' ')}
                              </div>
                            ))
                          ) : (
                            <div className="text-muted-foreground">No financial priorities specified</div>
                          )}
                        </div>
                      </div>
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

export default Dashboard;
