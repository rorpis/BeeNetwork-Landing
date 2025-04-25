import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import WelcomeScreen from '@/components/demo/WelcomeScreen';
import MarketplaceScreen from '@/components/demo/MarketplaceScreen';
import ReservationScreen from '@/components/demo/ReservationScreen';
import DocumentUploadScreen from '@/components/demo/DocumentUploadScreen';
import SetupConfirmation from '@/components/demo/SetupConfirmation';
import PracticeManagement from '@/components/demo/PracticeManagement';
import MonthlyStatusScreen from '@/components/demo/MonthlyStatusScreen';
import DemoClosingScreen from '@/components/demo/DemoClosingScreen';

export type DemoStep = 
  | 'welcome'
  | 'marketplace'
  | 'reservation'
  | 'document-upload'
  | 'setup-confirmation'
  | 'practice-management'
  | 'monthly-status'
  | 'closing';

const Demo = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('welcome');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const { toast } = useToast();

  const goToStep = (step: DemoStep) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onContinue={() => goToStep('marketplace')} />;
      case 'marketplace':
        return (
          <MarketplaceScreen 
            onLocationSelect={(location) => setSelectedLocation(location)} 
            onContinue={() => goToStep('reservation')}
          />
        );
      case 'reservation':
        return (
          <ReservationScreen 
            location={selectedLocation}
            onPaymentComplete={() => {
              toast({
                title: "Payment received",
                description: "Your reservation has been confirmed."
              });
              goToStep('document-upload');
            }}
            onBack={() => goToStep('marketplace')}
          />
        );
      case 'document-upload':
        return (
          <DocumentUploadScreen 
            onContinue={() => goToStep('setup-confirmation')}
          />
        );
      case 'setup-confirmation':
        return (
          <SetupConfirmation 
            onContinue={() => goToStep('practice-management')}
          />
        );
      case 'practice-management':
        return (
          <PracticeManagement 
            onContinue={() => {
              setTimeout(() => {
                goToStep('monthly-status');
              }, 4000);
            }}
          />
        );
      case 'monthly-status':
        return (
          <MonthlyStatusScreen 
            onContinue={() => goToStep('closing')}
          />
        );
      case 'closing':
        return (
          <DemoClosingScreen 
            onRestart={() => goToStep('welcome')}
          />
        );
      default:
        return <WelcomeScreen onContinue={() => goToStep('marketplace')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
};

export default Demo;
