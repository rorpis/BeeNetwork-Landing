
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface DemoClosingScreenProps {
  onRestart: () => void;
}

const DemoClosingScreen: React.FC<DemoClosingScreenProps> = ({ onRestart }) => {
  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center animate-fade-in">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/d279ab32-44e0-473f-bc4b-f419642be4d8.png" 
            alt="BeeNetwork Logo" 
            className="h-16 w-16 mx-auto mb-4" 
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">That's a Wrap!</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          You've explored the key features of BeeNetwork. Ready to get started for real?
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="px-8 py-6 text-lg"
            onClick={() => window.location.href = '/'}
          >
            Start Your Journey
          </Button>
          
          <Button 
            variant="outline" 
            className="px-8 py-6 text-lg"
            onClick={onRestart}
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Replay Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoClosingScreen;
