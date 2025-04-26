import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/welcome-background.png')",
          opacity: 0.7
        }}
      />
      <div className="bg-background/90 backdrop-blur-sm p-12 rounded-xl max-w-2xl shadow-lg text-center animate-fade-in relative z-10 border-2 border-primary">
        <h1 className="text-5xl font-bold mb-6 text-secondary">Welcome to BeeNetwork</h1>
        <p className="text-2xl mb-10">Ready to open your own practice?</p>
        <Button 
          onClick={onContinue} 
          className="px-10 py-7 text-xl hover:scale-105 transition-transform"
        >
          I want to open my own practice
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
