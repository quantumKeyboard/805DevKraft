import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FinancialData {
  // Basic Information
  monthlyIncome: string;
  monthlyExpenses: string;
  savings: string;
  debt: string;
  
  // Detailed Income
  incomeSource: string;
  incomeFrequency: string;
  additionalIncome: string;
  additionalIncomeSource: string;
  
  // Detailed Expenses
  housingExpenses: string;
  transportationExpenses: string;
  foodExpenses: string;
  utilitiesExpenses: string;
  entertainmentExpenses: string;
  otherExpenses: string;
  
  // Savings & Investments
  emergencyFund: string;
  retirementSavings: string;
  investmentAccounts: string;
  investmentTypes: string[];
  
  // Debt Details
  mortgageDebt: string;
  carDebt: string;
  creditCardDebt: string;
  studentLoanDebt: string;
  otherDebt: string;
  
  // Financial Goals
  financialGoal: string;
  shortTermGoal: string;
  mediumTermGoal: string;
  longTermGoal: string;
  goalTimeframe: string;
  
  // Risk Profile
  riskTolerance: string;
  investmentExperience: string;
  financialKnowledge: string;
  investmentTimeframe: string;
  
  // Financial Habits
  budgetingFrequency: string;
  savingFrequency: string;
  investmentFrequency: string;
  financialEducation: string;
  
  // Additional Information
  age: string;
  occupation: string;
  dependents: string;
  financialPriorities: string[];
  
  // Onboarding Status
  isOnboardingComplete: boolean;
}

interface FinancialContextType {
  financialData: FinancialData;
  updateFinancialData: (data: Partial<FinancialData>) => void;
  completeOnboarding: () => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [financialData, setFinancialData] = useState<FinancialData>({
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
    investmentTypes: [],
    
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
    financialPriorities: [],
    
    // Onboarding Status
    isOnboardingComplete: false,
  });

  const updateFinancialData = (data: Partial<FinancialData>) => {
    setFinancialData(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = () => {
    setFinancialData(prev => ({ ...prev, isOnboardingComplete: true }));
  };

  return (
    <FinancialContext.Provider value={{ financialData, updateFinancialData, completeOnboarding }}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}; 