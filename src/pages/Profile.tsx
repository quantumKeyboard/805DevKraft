
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, ChevronDown, LineChart, User, CreditCard, PiggyBank, Wallet, FileEdit, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FinancialProfile from '@/components/FinancialProfile';
import { useFinancialProfile } from '@/hooks/useFinancialProfile';

const Profile = () => {
  const { profile } = useFinancialProfile();

  return (
    <div className="min-h-screen bg-fintwin-green-lightest/50">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-fintwin-green-light/20">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintwin-green-dark to-fintwin-green-darker">
                FinTwin
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-fintwin-green-dark hover:text-fintwin-green-darker">Dashboard</Link>
              <Link to="/simulator" className="text-sm font-medium text-fintwin-green-dark hover:text-fintwin-green-darker">Simulator</Link>
              <Link to="/predictions" className="text-sm font-medium text-fintwin-green-dark hover:text-fintwin-green-darker">Predictions</Link>
              <Link to="/learning" className="text-sm font-medium text-fintwin-green-dark hover:text-fintwin-green-darker">Learning</Link>
              <Link to="/profile" className="text-sm font-medium text-foreground">Profile</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-fintwin-green-dark">
              <PiggyBank className="h-4 w-4 mr-2" />
              <span>${profile?.totalSavings.toLocaleString() || "0"}</span>
            </Button>
            <Button variant="outline" size="icon" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold text-fintwin-green-darker">Financial Profile</h1>
            <p className="text-fintwin-green-dark">Your comprehensive financial identity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FinancialProfile />
            </div>

            <div className="space-y-6">
              <Card className="border-fintwin-green-medium/20 shadow-md">
                <CardHeader>
                  <CardTitle className="text-fintwin-green-darker">Profile Actions</CardTitle>
                  <CardDescription>Quick actions for your financial profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                    <div className="flex items-center">
                      <FileEdit className="h-4 w-4 mr-2" />
                      <span>Update Income & Expenses</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>Manage Debt & Liabilities</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2" />
                      <span>Update Assets & Savings</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                    <div className="flex items-center">
                      <LineChart className="h-4 w-4 mr-2" />
                      <span>Set Financial Goals</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button className="w-full bg-fintwin-green-dark hover:bg-fintwin-green-darker">
                    Run Financial Health Check
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-fintwin-green-medium/20 shadow-md">
                <CardHeader>
                  <CardTitle className="text-fintwin-green-darker">Profile Integrations</CardTitle>
                  <CardDescription>Connect accounts for better insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg border border-fintwin-green-light/20 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-fintwin-green-lightest rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-fintwin-green-dark">B</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Banking Accounts</h4>
                        <p className="text-xs text-fintwin-green-dark">2 accounts connected</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-fintwin-green-dark">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-fintwin-green-light/20 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-fintwin-green-lightest rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-fintwin-green-dark">I</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Investment Accounts</h4>
                        <p className="text-xs text-fintwin-green-dark">1 account connected</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-fintwin-green-dark">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-dashed border-fintwin-green-light/40 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-fintwin-green-lightest/50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-fintwin-green-dark">C</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Credit Accounts</h4>
                        <p className="text-xs text-fintwin-green-dark">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-dashed border-fintwin-green-light/40 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-fintwin-green-lightest/50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-fintwin-green-dark">R</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Retirement Accounts</h4>
                        <p className="text-xs text-fintwin-green-dark">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
