
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" 
         style={{ backgroundImage: "url('/lovable-uploads/b0d2383a-53cd-4cdf-9173-447ee47f096c.png')" }}>
      <div className="bg-background/90 backdrop-blur-sm p-8 rounded-xl max-w-lg shadow-lg text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-secondary">Welcome to BeeNetwork</h1>
        <p className="text-xl mb-8">Ready to open your own practice?</p>
        <Button 
          onClick={onContinue} 
          className="px-8 py-6 text-lg hover:scale-105 transition-transform"
        >
          I want to open my own practice
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
