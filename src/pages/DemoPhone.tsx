import React, { useState, useCallback } from 'react';
import IPhoneFrame from '@/components/demo-phone/IPhoneFrame';
import PhoneContent, { PhoneState } from '../components/demo-phone/PhoneContent';

const DemoPhone = () => {
  const [currentState, setCurrentState] = useState<PhoneState>(PhoneState.INITIAL_WAVEFORM);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextState = useCallback(() => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    const states = Object.values(PhoneState);
    const currentIndex = states.indexOf(currentState);
    if (currentIndex < states.length - 1) {
      setIsAnimating(true);
      setCurrentState(states[currentIndex + 1]);
    }
  }, [currentState, isAnimating]);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center relative">
        <div className="relative">
          <IPhoneFrame>
            <PhoneContent 
              currentState={currentState} 
              onStateChange={setCurrentState}
              onAnimationComplete={handleAnimationComplete}
            />
          </IPhoneFrame>
        </div>
        <button
          onClick={handleNextState}
          className={`absolute -right-20 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 font-semibold z-50 ${
            isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
          disabled={isAnimating}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DemoPhone;
