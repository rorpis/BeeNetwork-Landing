
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SetupConfirmationProps {
  onContinue: () => void;
}

const SetupConfirmation: React.FC<SetupConfirmationProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">You're All Set!</h1>
        
        <p className="text-gray-600 mb-8">
          Your space is reserved. We expect you at 123 Bee Street next Monday, May 2 at 9:00 AM.
        </p>
        
        <div className="space-y-4">
          <Button onClick={onContinue} className="w-full">
            Go to My Practice
          </Button>
          <Button variant="outline" className="w-full">
            View Tour Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupConfirmation;
