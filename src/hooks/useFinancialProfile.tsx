
import { useState, useEffect } from 'react';

// Financial profile interface definition
export interface FinancialProfile {
  userId: string;
  financialHealthScore: number;
  monthlyIncome: number;
  essentialExpenses: number;
  discretionarySpending: number;
  monthlySavings: number;
  totalSavings: number;
  emergencyFundMonths: number;
  totalDebt: number;
  debtToIncomeRatio: number;
  netWorth: number;
  netWorthChange: number;
  incomeSources: {
    name: string;
    amount: number;
  }[];
  expenseCategories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
  assets: {
    name: string;
    value: number;
  }[];
  liabilities: {
    name: string;
    value: number;
  }[];
  financialGoals: {
    name: string;
    description: string;
    currentAmount: number;
    targetAmount: number;
    progressPercentage: number;
    targetDate: string;
    onTrack: boolean;
  }[];
  creditScore: number;
  lastUpdated: string;
}

// Mock data for development
const mockFinancialProfile: FinancialProfile = {
  userId: "user123",
  financialHealthScore: 72,
  monthlyIncome: 5800,
  essentialExpenses: 3200,
  discretionarySpending: 1500,
  monthlySavings: 1100,
  totalSavings: 24500,
  emergencyFundMonths: 2.3,
  totalDebt: 18400,
  debtToIncomeRatio: 42,
  netWorth: 143000,
  netWorthChange: 3.2,
  incomeSources: [
    { name: "Primary Job", amount: 5200 },
    { name: "Side Gig", amount: 600 }
  ],
  expenseCategories: [
    { name: "Housing", amount: 1800, percentage: 38 },
    { name: "Transportation", amount: 500, percentage: 11 },
    { name: "Food", amount: 600, percentage: 13 },
    { name: "Utilities", amount: 300, percentage: 6 },
    { name: "Entertainment", amount: 400, percentage: 8 },
    { name: "Shopping", amount: 500, percentage: 11 },
    { name: "Healthcare", amount: 200, percentage: 4 },
    { name: "Other", amount: 400, percentage: 9 }
  ],
  assets: [
    { name: "Checking Account", value: 4500 },
    { name: "Savings Account", value: 20000 },
    { name: "Retirement Accounts", value: 85000 },
    { name: "Investments", value: 35000 },
    { name: "Vehicle", value: 18000 }
  ],
  liabilities: [
    { name: "Student Loans", value: 12000 },
    { name: "Car Loan", value: 6400 }
  ],
  financialGoals: [
    {
      name: "Emergency Fund",
      description: "Build a 6-month emergency fund",
      currentAmount: 20000,
      targetAmount: 34800,
      progressPercentage: 57,
      targetDate: "September 2025",
      onTrack: true
    },
    {
      name: "Debt Payoff",
      description: "Pay off all non-mortgage debt",
      currentAmount: 8600,
      targetAmount: 18400,
      progressPercentage: 47,
      targetDate: "December 2025",
      onTrack: true
    },
    {
      name: "House Down Payment",
      description: "Save for 20% down payment on a home",
      currentAmount: 15000,
      targetAmount: 60000,
      progressPercentage: 25,
      targetDate: "June 2026",
      onTrack: false
    }
  ],
  creditScore: 720,
  lastUpdated: "2025-04-03"
};

export const useFinancialProfile = () => {
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchFinancialProfile = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For development, use mock data
        setProfile(mockFinancialProfile);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsLoading(false);
      }
    };

    fetchFinancialProfile();
  }, []);

  // Function to update the profile (would integrate with API in real app)
  const updateProfile = async (updatedProfile: Partial<FinancialProfile>) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile
      setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      setIsLoading(false);
    }
  };

  return {
    profile: profile as FinancialProfile,
    isLoading,
    error,
    updateProfile
  };
};
