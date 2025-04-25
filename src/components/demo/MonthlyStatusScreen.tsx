import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Users, ArrowRight, Bell, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonthlyStatusScreenProps {
  onContinue: () => void;
}

const MonthlyStatusScreen: React.FC<MonthlyStatusScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    // Auto-advance to the final screen after a delay
    const timer = setTimeout(() => {
      onContinue();
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-muted p-4 border-r">
        <div className="flex items-center mb-6">
          <img 
            src="/lovable-uploads/d279ab32-44e0-473f-bc4b-f419642be4d8.png" 
            alt="Logo" 
            className="h-8 w-8 mr-2" 
          />
          <span className="font-bold text-xl">BeeNetwork</span>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg bg-accent text-accent-foreground">
                <Users className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-accent/50 text-muted-foreground">
                <Users className="h-5 w-5 mr-3" />
                <span>Appointments</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-accent/50 text-muted-foreground">
                <Users className="h-5 w-5 mr-3" />
                <span>Patients</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-accent/50 text-muted-foreground">
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Billing</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-accent/50 text-muted-foreground">
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="relative">
            <Bell className="h-6 w-6 text-primary cursor-pointer animate-pulse" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
              2
            </span>
          </div>
        </div>
        
        <div className="animate-fade-in">
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Monthly Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">April 2025</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-background rounded-md">
                    <div className="text-3xl font-bold">38</div>
                    <div className="text-sm text-muted-foreground">Patients Seen</div>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <div className="text-3xl font-bold">$30,650</div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <div className="text-3xl font-bold">$27,585</div>
                    <div className="text-sm text-muted-foreground">Net Earnings</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Recent Notifications</h2>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                <li className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">We've processed your April deposit: $27,585</p>
                    <p className="text-sm text-muted-foreground">Funds will be available in 1-2 business days</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Monthly report ready</p>
                    <p className="text-sm text-muted-foreground">April 2025 financial summary</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={onContinue} className="inline-flex items-center gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStatusScreen;
