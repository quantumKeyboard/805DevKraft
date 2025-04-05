import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useFinancial } from '@/context/FinancialContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface OnboardingStep {
  title: string;
  description: string;
  component: React.ReactNode;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateFinancialData, completeOnboarding } = useFinancial();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    monthlyIncome: '',
    monthlyExpenses: '',
    savings: '',
    debt: '',
    
    // Detailed Income
    incomeSource: '',
    incomeFrequency: '',
    additionalIncome: '',
    additionalIncomeSource: '',
    
    // Detailed Expenses
    housingExpenses: '',
    transportationExpenses: '',
    foodExpenses: '',
    utilitiesExpenses: '',
    entertainmentExpenses: '',
    otherExpenses: '',
    
    // Savings & Investments
    emergencyFund: '',
    retirementSavings: '',
    investmentAccounts: '',
    investmentTypes: [] as string[],
    
    // Debt Details
    mortgageDebt: '',
    carDebt: '',
    creditCardDebt: '',
    studentLoanDebt: '',
    otherDebt: '',
    
    // Financial Goals
    financialGoal: '',
    shortTermGoal: '',
    mediumTermGoal: '',
    longTermGoal: '',
    goalTimeframe: '',
    
    // Risk Profile
    riskTolerance: '',
    investmentExperience: '',
    financialKnowledge: '',
    investmentTimeframe: '',
    
    // Financial Habits
    budgetingFrequency: '',
    savingFrequency: '',
    investmentFrequency: '',
    financialEducation: '',
    
    // Additional Information
    age: '',
    occupation: '',
    dependents: '',
    financialPriorities: [] as string[],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = [...(prev[field as keyof typeof prev] as string[])];
      if (checked && !currentArray.includes(value)) {
        return { ...prev, [field]: [...currentArray, value] };
      } else if (!checked) {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
      return prev;
    });
  };

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to FinTwin",
      description: "Let's get started by understanding your current financial situation.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <Input
                id="monthlyIncome"
                type="number"
                placeholder="Enter your monthly income"
                value={formData.monthlyIncome}
                onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                placeholder="Enter your monthly expenses"
                value={formData.monthlyExpenses}
                onChange={(e) => updateFormData('monthlyExpenses', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="savings">Total Savings</Label>
              <Input
                id="savings"
                type="number"
                placeholder="Enter your total savings"
                value={formData.savings}
                onChange={(e) => updateFormData('savings', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="debt">Total Debt</Label>
              <Input
                id="debt"
                type="number"
                placeholder="Enter your total debt"
                value={formData.debt}
                onChange={(e) => updateFormData('debt', e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Income Details",
      description: "Let's understand your income sources in more detail.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="incomeSource">Primary Income Source</Label>
              <Select
                value={formData.incomeSource}
                onValueChange={(value) => updateFormData('incomeSource', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary income source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="incomeFrequency">Income Frequency</Label>
              <Select
                value={formData.incomeFrequency}
                onValueChange={(value) => updateFormData('incomeFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your income frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="additionalIncome">Additional Income (Monthly)</Label>
              <Input
                id="additionalIncome"
                type="number"
                placeholder="Enter any additional monthly income"
                value={formData.additionalIncome}
                onChange={(e) => updateFormData('additionalIncome', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="additionalIncomeSource">Additional Income Source</Label>
              <Select
                value={formData.additionalIncomeSource}
                onValueChange={(value) => updateFormData('additionalIncomeSource', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select additional income source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investments">Investments</SelectItem>
                  <SelectItem value="rental">Rental Income</SelectItem>
                  <SelectItem value="side-hustle">Side Hustle</SelectItem>
                  <SelectItem value="gifts">Gifts/Inheritance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Expense Breakdown",
      description: "Let's break down your monthly expenses by category.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="housingExpenses">Housing (Rent/Mortgage)</Label>
              <Input
                id="housingExpenses"
                type="number"
                placeholder="Enter your monthly housing expenses"
                value={formData.housingExpenses}
                onChange={(e) => updateFormData('housingExpenses', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="transportationExpenses">Transportation</Label>
              <Input
                id="transportationExpenses"
                type="number"
                placeholder="Enter your monthly transportation expenses"
                value={formData.transportationExpenses}
                onChange={(e) => updateFormData('transportationExpenses', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="foodExpenses">Food & Groceries</Label>
              <Input
                id="foodExpenses"
                type="number"
                placeholder="Enter your monthly food expenses"
                value={formData.foodExpenses}
                onChange={(e) => updateFormData('foodExpenses', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="utilitiesExpenses">Utilities</Label>
              <Input
                id="utilitiesExpenses"
                type="number"
                placeholder="Enter your monthly utilities expenses"
                value={formData.utilitiesExpenses}
                onChange={(e) => updateFormData('utilitiesExpenses', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="entertainmentExpenses">Entertainment & Leisure</Label>
              <Input
                id="entertainmentExpenses"
                type="number"
                placeholder="Enter your monthly entertainment expenses"
                value={formData.entertainmentExpenses}
                onChange={(e) => updateFormData('entertainmentExpenses', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="otherExpenses">Other Expenses</Label>
              <Input
                id="otherExpenses"
                type="number"
                placeholder="Enter your other monthly expenses"
                value={formData.otherExpenses}
                onChange={(e) => updateFormData('otherExpenses', e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Savings & Investments",
      description: "Let's understand your savings and investment situation.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergencyFund">Emergency Fund</Label>
              <Input
                id="emergencyFund"
                type="number"
                placeholder="Enter your emergency fund amount"
                value={formData.emergencyFund}
                onChange={(e) => updateFormData('emergencyFund', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="retirementSavings">Retirement Savings</Label>
              <Input
                id="retirementSavings"
                type="number"
                placeholder="Enter your retirement savings amount"
                value={formData.retirementSavings}
                onChange={(e) => updateFormData('retirementSavings', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="investmentAccounts">Investment Accounts Value</Label>
              <Input
                id="investmentAccounts"
                type="number"
                placeholder="Enter your investment accounts value"
                value={formData.investmentAccounts}
                onChange={(e) => updateFormData('investmentAccounts', e.target.value)}
              />
            </div>
            <div>
              <Label>Investment Types (Select all that apply)</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="stocks" 
                    checked={formData.investmentTypes.includes('stocks')}
                    onCheckedChange={(checked) => updateArrayField('investmentTypes', 'stocks', checked as boolean)}
                  />
                  <Label htmlFor="stocks">Stocks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="bonds" 
                    checked={formData.investmentTypes.includes('bonds')}
                    onCheckedChange={(checked) => updateArrayField('investmentTypes', 'bonds', checked as boolean)}
                  />
                  <Label htmlFor="bonds">Bonds</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mutual-funds" 
                    checked={formData.investmentTypes.includes('mutual-funds')}
                    onCheckedChange={(checked) => updateArrayField('investmentTypes', 'mutual-funds', checked as boolean)}
                  />
                  <Label htmlFor="mutual-funds">Mutual Funds</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="etfs" 
                    checked={formData.investmentTypes.includes('etfs')}
                    onCheckedChange={(checked) => updateArrayField('investmentTypes', 'etfs', checked as boolean)}
                  />
                  <Label htmlFor="etfs">ETFs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="real-estate" 
                    checked={formData.investmentTypes.includes('real-estate')}
                    onCheckedChange={(checked) => updateArrayField('investmentTypes', 'real-estate', checked as boolean)}
                  />
                  <Label htmlFor="real-estate">Real Estate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="crypto" 
                    checked={formData.investmentTypes.includes('crypto')}
                    onCheckedChange={(checked) => updateArrayField('investmentTypes', 'crypto', checked as boolean)}
                  />
                  <Label htmlFor="crypto">Cryptocurrency</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="other-investments" 
                    checked={formData.investmentTypes.includes('other-investments')}
                    onCheckedChange={(checked) => updateArrayField('investmentTypes', 'other-investments', checked as boolean)}
                  />
                  <Label htmlFor="other-investments">Other</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Debt Breakdown",
      description: "Let's understand your debt situation in detail.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="mortgageDebt">Mortgage Debt</Label>
              <Input
                id="mortgageDebt"
                type="number"
                placeholder="Enter your mortgage debt amount"
                value={formData.mortgageDebt}
                onChange={(e) => updateFormData('mortgageDebt', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="carDebt">Car Loan Debt</Label>
              <Input
                id="carDebt"
                type="number"
                placeholder="Enter your car loan debt amount"
                value={formData.carDebt}
                onChange={(e) => updateFormData('carDebt', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="creditCardDebt">Credit Card Debt</Label>
              <Input
                id="creditCardDebt"
                type="number"
                placeholder="Enter your credit card debt amount"
                value={formData.creditCardDebt}
                onChange={(e) => updateFormData('creditCardDebt', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="studentLoanDebt">Student Loan Debt</Label>
              <Input
                id="studentLoanDebt"
                type="number"
                placeholder="Enter your student loan debt amount"
                value={formData.studentLoanDebt}
                onChange={(e) => updateFormData('studentLoanDebt', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="otherDebt">Other Debt</Label>
              <Input
                id="otherDebt"
                type="number"
                placeholder="Enter your other debt amount"
                value={formData.otherDebt}
                onChange={(e) => updateFormData('otherDebt', e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Financial Goals",
      description: "What are your financial goals and priorities?",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Primary Financial Goal</Label>
              <RadioGroup
                value={formData.financialGoal}
                onValueChange={(value) => updateFormData('financialGoal', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Label htmlFor="emergency">Build Emergency Fund</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debt" id="debt" />
                  <Label htmlFor="debt">Pay Off Debt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investment" id="investment" />
                  <Label htmlFor="investment">Start Investing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retirement" id="retirement" />
                  <Label htmlFor="retirement">Plan for Retirement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">Buy a Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="education" id="education" />
                  <Label htmlFor="education">Education</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="shortTermGoal">Short-Term Goal (1-2 years)</Label>
              <Textarea
                id="shortTermGoal"
                placeholder="Describe your short-term financial goal"
                value={formData.shortTermGoal}
                onChange={(e) => updateFormData('shortTermGoal', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="mediumTermGoal">Medium-Term Goal (3-5 years)</Label>
              <Textarea
                id="mediumTermGoal"
                placeholder="Describe your medium-term financial goal"
                value={formData.mediumTermGoal}
                onChange={(e) => updateFormData('mediumTermGoal', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="longTermGoal">Long-Term Goal (5+ years)</Label>
              <Textarea
                id="longTermGoal"
                placeholder="Describe your long-term financial goal"
                value={formData.longTermGoal}
                onChange={(e) => updateFormData('longTermGoal', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="goalTimeframe">Goal Timeframe</Label>
              <Select
                value={formData.goalTimeframe}
                onValueChange={(value) => updateFormData('goalTimeframe', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short-term (1-2 years)</SelectItem>
                  <SelectItem value="medium">Medium-term (3-5 years)</SelectItem>
                  <SelectItem value="long">Long-term (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Risk Profile",
      description: "Let's understand your risk tolerance and investment preferences.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Risk Tolerance</Label>
              <Select
                value={formData.riskTolerance}
                onValueChange={(value) => updateFormData('riskTolerance', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Investment Experience</Label>
              <Select
                value={formData.investmentExperience}
                onValueChange={(value) => updateFormData('investmentExperience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Financial Knowledge</Label>
              <Select
                value={formData.financialKnowledge}
                onValueChange={(value) => updateFormData('financialKnowledge', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your financial knowledge level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Investment Timeframe</Label>
              <Select
                value={formData.investmentTimeframe}
                onValueChange={(value) => updateFormData('investmentTimeframe', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your investment timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short-term (1-3 years)</SelectItem>
                  <SelectItem value="medium">Medium-term (3-7 years)</SelectItem>
                  <SelectItem value="long">Long-term (7+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Financial Habits",
      description: "Let's understand your financial habits and behaviors.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Budgeting Frequency</Label>
              <Select
                value={formData.budgetingFrequency}
                onValueChange={(value) => updateFormData('budgetingFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your budgeting frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Saving Frequency</Label>
              <Select
                value={formData.savingFrequency}
                onValueChange={(value) => updateFormData('savingFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your saving frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Investment Frequency</Label>
              <Select
                value={formData.investmentFrequency}
                onValueChange={(value) => updateFormData('investmentFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your investment frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Financial Education</Label>
              <Select
                value={formData.financialEducation}
                onValueChange={(value) => updateFormData('financialEducation', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your financial education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self-taught">Self-taught</SelectItem>
                  <SelectItem value="courses">Formal courses</SelectItem>
                  <SelectItem value="advisor">Financial advisor</SelectItem>
                  <SelectItem value="books">Books/Reading</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Personal Information",
      description: "Let's gather some personal information to better understand your financial situation.",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                type="text"
                placeholder="Enter your occupation"
                value={formData.occupation}
                onChange={(e) => updateFormData('occupation', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="Enter number of dependents"
                value={formData.dependents}
                onChange={(e) => updateFormData('dependents', e.target.value)}
              />
            </div>
            <div>
              <Label>Financial Priorities (Select all that apply)</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="security" 
                    checked={formData.financialPriorities.includes('security')}
                    onCheckedChange={(checked) => updateArrayField('financialPriorities', 'security', checked as boolean)}
                  />
                  <Label htmlFor="security">Financial Security</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="growth" 
                    checked={formData.financialPriorities.includes('growth')}
                    onCheckedChange={(checked) => updateArrayField('financialPriorities', 'growth', checked as boolean)}
                  />
                  <Label htmlFor="growth">Wealth Growth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="lifestyle" 
                    checked={formData.financialPriorities.includes('lifestyle')}
                    onCheckedChange={(checked) => updateArrayField('financialPriorities', 'lifestyle', checked as boolean)}
                  />
                  <Label htmlFor="lifestyle">Lifestyle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="legacy" 
                    checked={formData.financialPriorities.includes('legacy')}
                    onCheckedChange={(checked) => updateArrayField('financialPriorities', 'legacy', checked as boolean)}
                  />
                  <Label htmlFor="legacy">Legacy Planning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="philanthropy" 
                    checked={formData.financialPriorities.includes('philanthropy')}
                    onCheckedChange={(checked) => updateArrayField('financialPriorities', 'philanthropy', checked as boolean)}
                  />
                  <Label htmlFor="philanthropy">Philanthropy</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Update the financial context with the form data
      updateFinancialData(formData);
      completeOnboarding();
      // Navigate to the dashboard
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
          <Progress value={(currentStep + 1) * (100 / steps.length)} className="h-2" />
        </CardHeader>
        <CardContent>
          {steps[currentStep].component}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding; 