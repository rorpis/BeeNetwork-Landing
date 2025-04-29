
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

interface CongratulationsScreenProps {
  onContinue: () => void;
}

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <CalendarDays className="h-12 w-12" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          You've taken the first step on your journey with us. We just need to gather some important documents before we begin.
        </p>
        
        <Button 
          onClick={onContinue}
          className="px-8 py-6 text-lg"
        >
          Continue to Document Upload
        </Button>
      </div>
    </div>
  );
};

export default CongratulationsScreen;
