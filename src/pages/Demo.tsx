
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import WelcomeScreen from '@/components/demo/WelcomeScreen';
import MarketplaceScreen from '@/components/demo/MarketplaceScreen';
import CongratulationsScreen from '@/components/demo/CongratulationsScreen';
import DocumentUploadScreen from '@/components/demo/DocumentUploadScreen';
import SetupConfirmation from '@/components/demo/SetupConfirmation';
import DemoClosingScreen from '@/components/demo/DemoClosingScreen';

export type DemoStep = 
  | 'welcome'
  | 'marketplace'
  | 'congratulations'
  | 'document-upload'
  | 'setup-confirmation'
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
            onContinue={() => goToStep('congratulations')}
          />
        );
      case 'congratulations':
        return (
          <CongratulationsScreen 
            onContinue={() => goToStep('document-upload')}
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
