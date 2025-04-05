
import React from 'react';
import { Activity, BarChart3, Brain, Clock, CoinsIcon, LineChart, TrendingUp, Zap } from 'lucide-react';

const featureItems = [
  {
    icon: <Brain className="w-10 h-10 text-fintwin-blue" />,
    title: "Financial Twin Simulator",
    description: "Create a virtual representation of your financial profile and test different scenarios to see their long-term impact."
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-fintwin-teal" />,
    title: "Predictive Analytics",
    description: "Our AI model identifies potential financial vulnerabilities 6-12 months ahead, helping you avoid future problems."
  },
  {
    icon: <Activity className="w-10 h-10 text-fintwin-green" />,
    title: "Financial Health Score",
    description: "Get a comprehensive evaluation of your current financial stability with actionable insights to improve."
  },
  {
    icon: <Clock className="w-10 h-10 text-fintwin-orange" />,
    title: "Time Machine View",
    description: "Project financial outcomes at 1, 5, and 10-year intervals to see the long-term effects of today's decisions."
  },
  {
    icon: <Zap className="w-10 h-10 text-fintwin-blue" />,
    title: "Gamified Challenges",
    description: "Complete personalized financial challenges that incentivize positive habits while tracking your progress."
  },
  {
    icon: <LineChart className="w-10 h-10 text-fintwin-teal" />,
    title: "Interactive Visualizations",
    description: "Dynamic graphs and charts that illustrate the compounding effects of your financial decisions."
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-fintwin-green" />,
    title: "Action Plan Generator",
    description: "Receive personalized roadmaps to improve your financial health based on your specific goals and situation."
  },
  {
    icon: <CoinsIcon className="w-10 h-10 text-fintwin-orange" />,
    title: "Micro-Learning",
    description: "Bite-sized financial education tied directly to your behavior and needs, making learning relevant and practical."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features to Transform Your Finances</h2>
          <p className="text-muted-foreground text-lg">
            FinTwin combines advanced technology with personalized insights to help you build a better financial future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-xl p-6 shadow-sm card-hover"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
