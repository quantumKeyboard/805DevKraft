
import React from 'react';
import { Activity, BarChart3, Brain, Clock, CreditCard, LineChart, Wallet, FileText } from 'lucide-react';

const featureItems = [
  {
    icon: <Wallet className="w-10 h-10 text-fintwin-green-medium" />,
    title: "Expense Tracking",
    description: "Easily track all your expenses and categorize them to understand where your money is going each month."
  },
  {
    icon: <Brain className="w-10 h-10 text-fintwin-green-dark" />,
    title: "Decision Simulator",
    description: "Test different financial decisions before making them to see their long-term impact on your finances."
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-fintwin-green-medium" />,
    title: "Predictive Analytics",
    description: "Our AI model identifies potential financial risks 6-12 months ahead, helping you avoid future problems."
  },
  {
    icon: <Activity className="w-10 h-10 text-fintwin-green-dark" />,
    title: "Financial Health Score",
    description: "Get a comprehensive evaluation of your current financial stability with actionable insights to improve."
  },
  {
    icon: <Clock className="w-10 h-10 text-fintwin-green-medium" />,
    title: "Timeline Projections",
    description: "See how your financial decisions today affect your future at 1, 5, and 10-year intervals."
  },
  {
    icon: <CreditCard className="w-10 h-10 text-fintwin-green-dark" />,
    title: "Smart Budgeting",
    description: "Create personalized budgets based on your spending patterns and financial goals."
  },
  {
    icon: <LineChart className="w-10 h-10 text-fintwin-green-medium" />,
    title: "Interactive Visualizations",
    description: "Dynamic graphs and charts that illustrate your spending habits and financial progress over time."
  },
  {
    icon: <FileText className="w-10 h-10 text-fintwin-green-dark" />,
    title: "Financial Reports",
    description: "Generate detailed reports on your financial performance and receive personalized recommendations."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-fintwin-green-lightest/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-fintwin-green-darker">Powerful Features to Transform Your Finances</h2>
          <p className="text-fintwin-green-dark text-lg">
            FinTwin combines expense tracking with advanced prediction tools to help you make better financial decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-fintwin-green-light/20 rounded-xl p-6 shadow-sm card-hover"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-fintwin-green-darker">{feature.title}</h3>
              <p className="text-fintwin-green-dark">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
