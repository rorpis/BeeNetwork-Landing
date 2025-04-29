
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SetupConfirmationProps {
  onContinue: () => void;
}

const SetupConfirmation: React.FC<SetupConfirmationProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">You're All Set!</h1>
        
        <p className="text-xl text-gray-600 mb-6">
          Your practice is now ready to go. Welcome to the BeeNetwork community!
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span className="text-left">Documentation verified</span>
          </div>
          <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span className="text-left">Space confirmed at 123 Bee Street</span>
          </div>
          <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span className="text-left">Credentials processed</span>
          </div>
        </div>
        
        <Button 
          onClick={onContinue}
          className="px-8 py-6 text-lg"
        >
          Complete Demo
        </Button>
      </div>
    </div>
  );
};

export default SetupConfirmation;
