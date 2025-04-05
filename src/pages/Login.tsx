
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify credentials
    console.log("Login attempted");
    
    // Show success toast
    toast({
      title: "Login successful",
      description: "Welcome back to FinTwin!",
    });
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-fintwin-green-lightest/50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="border-fintwin-green-medium/20 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-fintwin-green-darker">Welcome back</CardTitle>
              <CardDescription className="text-fintwin-green-dark/80">
                Enter your credentials to access your financial twin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required className="border-fintwin-green-medium/30 focus-visible:ring-fintwin-green-medium" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-fintwin-green-dark hover:text-fintwin-green-darker hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required className="border-fintwin-green-medium/30 focus-visible:ring-fintwin-green-medium" />
                </div>
                <Button type="submit" className="w-full bg-fintwin-green-dark hover:bg-fintwin-green-darker">
                  Sign In
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-fintwin-green-medium/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full border-fintwin-green-medium/30 text-fintwin-green-dark hover:bg-fintwin-green-lightest">
                    Apple
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm mt-2">
                <span className="text-muted-foreground">Don't have an account?</span>{" "}
                <Link to="/signup" className="text-fintwin-green-dark font-medium hover:text-fintwin-green-darker hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
