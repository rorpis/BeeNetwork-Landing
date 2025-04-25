import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, CreditCard, Settings, Bell, FastForward, PartyPopper } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface PracticeManagementProps {
  onContinue: () => void;
}

const PracticeManagement: React.FC<PracticeManagementProps> = ({ onContinue }) => {
  const [showFastForwardButton, setShowFastForwardButton] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    if (!notificationShown) {
      toast({
        title: "Congratulations!",
        description: (
          <div className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-yellow-500" />
            <span>You have your first patient booking!</span>
          </div>
        ),
        action: (
          <div className="mt-2">
            <button 
              className="bg-primary px-3 py-1 rounded text-sm text-primary-foreground"
            >
              View Appointment
            </button>
          </div>
        ),
      });
      setNotificationShown(true);
    }
  }, [notificationShown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFastForwardButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex relative">
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
                <CalendarDays className="h-5 w-5 mr-3" />
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
          <h1 className="text-3xl font-bold">Practice Dashboard</h1>
          <div className="relative">
            <Bell className="h-6 w-6 text-muted-foreground cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
              1
            </span>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Welcome, Dr. Smith!</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your practice is now active. Start by scheduling your first appointments.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Quick Stats</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Upcoming Appointments</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between">
                  <span>Patients</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-bold">$0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">To-Do List</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-4 h-4 border rounded-sm mr-2"></div>
                  <span>Prepare for first patient visit</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 border rounded-sm mr-2"></div>
                  <span>Set up payment methods</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 border rounded-sm mr-2"></div>
                  <span>Complete office setup</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fast Forward Demo Button - Only shown after notification appears */}
      {showFastForwardButton && (
        <div className="fixed bottom-6 left-6 z-50">
          <Button 
            onClick={onContinue}
            className="bg-[#9b87f5] hover:bg-[#1A1F2C] text-white font-medium px-6 py-6 rounded-full shadow-lg flex items-center gap-2"
          >
            <FastForward className="h-5 w-5" />
            Fast Forward Demo
          </Button>
        </div>
      )}
    </div>
  );
};

export default PracticeManagement;
