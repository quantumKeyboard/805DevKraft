
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, LineChart, AlertTriangle, Check, Calendar, Wallet, Landmark, CreditCard } from 'lucide-react';

const ScenarioSimulator = () => {
  const [scenarioType, setScenarioType] = useState('major_purchase');
  const [scenarioDescription, setScenarioDescription] = useState('');
  const [scenarioCost, setScenarioCost] = useState('5000');
  const [scenarioTimeframe, setScenarioTimeframe] = useState('3');
  const [simulationResult, setSimulationResult] = useState<null | {
    feasibility: 'high' | 'medium' | 'low';
    savingsImpact: number;
    monthlyBudgetChange: number;
    debtImpact: number;
    longTermEffect: string;
    alternatives: string[];
  }>(null);

  const handleRunSimulation = () => {
    // In a real app, this would call an API to run the simulation
    // For now, we'll just set some example data
    setSimulationResult({
      feasibility: 'medium',
      savingsImpact: -12.5,
      monthlyBudgetChange: -180,
      debtImpact: scenarioCost === '0' ? 0 : 0.5,
      longTermEffect: "This purchase will delay your emergency fund goal by approximately 3 months.",
      alternatives: [
        "Wait 6 months to improve cash reserves first",
        "Look for a more affordable alternative (estimated 30% savings)",
        "Finance at 0% APR if available to spread the cost"
      ]
    });
  };

  const getFeasibilityColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'text-green-500 bg-green-50';
      case 'medium': return 'text-amber-500 bg-amber-50';
      case 'low': return 'text-red-500 bg-red-50';
      default: return '';
    }
  };

  return (
    <Card className="border-fintwin-green-medium/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-fintwin-green-darker">Financial Decision Simulator</CardTitle>
        <CardDescription>
          Visualize the impact of your financial decisions before making them
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="scenario-type">What type of financial decision are you considering?</Label>
            <Select 
              value={scenarioType} 
              onValueChange={setScenarioType}
            >
              <SelectTrigger className="w-full mt-1 border-fintwin-green-medium/30">
                <SelectValue placeholder="Select a scenario type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="major_purchase">Major Purchase</SelectItem>
                <SelectItem value="housing_change">Housing Change</SelectItem>
                <SelectItem value="debt_decision">Taking on Debt</SelectItem>
                <SelectItem value="investment">Investment Opportunity</SelectItem>
                <SelectItem value="job_change">Job or Career Change</SelectItem>
                <SelectItem value="expense_reduction">Expense Reduction</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="scenario-description">Describe your scenario in detail</Label>
            <Textarea 
              id="scenario-description" 
              placeholder="e.g., I'm considering buying a new car for $25,000..." 
              className="mt-1 h-24 border-fintwin-green-medium/30 focus-visible:ring-fintwin-green-medium"
              value={scenarioDescription}
              onChange={(e) => setScenarioDescription(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scenario-cost">
                Financial Impact (Cost/Benefit in $)
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input 
                  id="scenario-cost" 
                  type="number" 
                  className="pl-7 border-fintwin-green-medium/30 focus-visible:ring-fintwin-green-medium"
                  value={scenarioCost}
                  onChange={(e) => setScenarioCost(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="scenario-timeframe">
                Timeframe (months)
              </Label>
              <Input 
                id="scenario-timeframe" 
                type="number" 
                className="mt-1 border-fintwin-green-medium/30 focus-visible:ring-fintwin-green-medium"
                value={scenarioTimeframe}
                onChange={(e) => setScenarioTimeframe(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleRunSimulation}
          className="w-full bg-fintwin-green-dark hover:bg-fintwin-green-darker"
        >
          Run Financial Simulation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        {simulationResult && (
          <div className="mt-6 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fintwin-green-darker">Simulation Results</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getFeasibilityColor(simulationResult.feasibility)}`}>
                {simulationResult.feasibility === 'high' ? (
                  <span className="flex items-center"><Check size={16} className="mr-1" /> Highly Feasible</span>
                ) : simulationResult.feasibility === 'medium' ? (
                  <span className="flex items-center"><AlertTriangle size={16} className="mr-1" /> Moderately Feasible</span>
                ) : (
                  <span className="flex items-center"><AlertTriangle size={16} className="mr-1" /> Low Feasibility</span>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="impact">
              <TabsList className="grid w-full grid-cols-3 bg-fintwin-green-lightest">
                <TabsTrigger value="impact">Financial Impact</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
              </TabsList>
              
              <TabsContent value="impact" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-fintwin-green-light/20 flex">
                    <div className="h-10 w-10 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-3">
                      <Wallet className="h-5 w-5 text-fintwin-green-dark" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Savings Impact</div>
                      <div className="text-lg font-semibold text-fintwin-green-darker">{simulationResult.savingsImpact}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-fintwin-green-light/20 flex">
                    <div className="h-10 w-10 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-fintwin-green-dark" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Monthly Budget</div>
                      <div className="text-lg font-semibold text-fintwin-green-darker">${simulationResult.monthlyBudgetChange}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-fintwin-green-light/20 flex">
                    <div className="h-10 w-10 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-fintwin-green-dark" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Debt-to-Income</div>
                      <div className="text-lg font-semibold text-fintwin-green-darker">+{simulationResult.debtImpact}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-fintwin-green-light/20 space-y-3">
                  <h4 className="font-medium text-fintwin-green-darker">Long-term Financial Impact</h4>
                  <p className="text-sm text-gray-600">{simulationResult.longTermEffect}</p>
                  
                  <div className="h-16 bg-fintwin-green-lightest rounded flex items-center justify-center">
                    <LineChart className="text-fintwin-green-medium mr-2" /> <span className="text-sm text-gray-500">Projected Financial Impact Graph</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="timeline" className="pt-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-fintwin-green-light/20">
                    <h4 className="font-medium text-fintwin-green-darker mb-3">Financial Recovery Timeline</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Emergency Fund Recovery</span>
                        <span className="text-sm font-medium">3 months</span>
                      </div>
                      <div className="h-2 bg-fintwin-green-lightest rounded-full">
                        <div className="h-full bg-fintwin-green-medium rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Budget Stabilization</span>
                        <span className="text-sm font-medium">1 month</span>
                      </div>
                      <div className="h-2 bg-fintwin-green-lightest rounded-full">
                        <div className="h-full bg-fintwin-green-medium rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Return to Financial Goals</span>
                        <span className="text-sm font-medium">5 months</span>
                      </div>
                      <div className="h-2 bg-fintwin-green-lightest rounded-full">
                        <div className="h-full bg-fintwin-green-medium rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-fintwin-green-light/20">
                    <h4 className="font-medium text-fintwin-green-darker mb-2">Key Timeline Milestones</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs text-fintwin-green-dark">1</span>
                        </span>
                        Immediate: Initial financial adjustment period (1-2 weeks)
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs text-fintwin-green-dark">2</span>
                        </span>
                        Month 1: Budget stabilizes with new expense pattern
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs text-fintwin-green-dark">3</span>
                        </span>
                        Month 3: Emergency fund begins recovery phase
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs text-fintwin-green-dark">4</span>
                        </span>
                        Month 5: Return to regular saving for primary financial goals
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="alternatives" className="pt-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-fintwin-green-light/20">
                    <h4 className="font-medium text-fintwin-green-darker mb-3">Alternative Approaches</h4>
                    
                    <ul className="space-y-3">
                      {simulationResult.alternatives.map((alternative, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-fintwin-green-lightest flex items-center justify-center mr-3 mt-0.5">
                            <Check className="h-3 w-3 text-fintwin-green-dark" />
                          </div>
                          <div className="text-sm text-gray-600">{alternative}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-fintwin-green-light/20">
                    <h4 className="font-medium text-fintwin-green-darker mb-2">Financial Advisor Recommendations</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Based on your financial profile, our AI financial advisor suggests:
                    </p>
                    <div className="p-3 bg-fintwin-green-lightest rounded-lg text-sm text-gray-700">
                      "Consider delaying this purchase by 3-6 months while building your emergency fund. This would improve your financial resilience and reduce the stress on your monthly budget."
                    </div>
                  </div>
                  
                  <Button className="w-full bg-fintwin-green-dark hover:bg-fintwin-green-darker">
                    Save This Simulation
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScenarioSimulator;
