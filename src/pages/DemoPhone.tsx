import React, { useState, useCallback, useEffect, useRef } from 'react';
import IPhoneFrame from '@/components/demo-phone/IPhoneFrame';
import PhoneContent, { PhoneState } from '../components/demo-phone/PhoneContent';
import DialogueUI from '@/components/demo-phone/DialogueUI';

// Add animation styles
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  .animate-fade-in-delayed {
    animation: fadeIn 0.8s ease-out 0.3s forwards;
    opacity: 0;
  }
  .animate-fade-in-delayed-2 {
    animation: fadeIn 0.8s ease-out 0.6s forwards;
    opacity: 0;
  }
`;

type Message = {
  sender: 'ai' | 'user';
  content: string;
  isTyping?: boolean;
  audioPath?: string;
};

const messages: Message[] = [
  { 
    sender: 'ai', 
    content: "Good morning, Dr. Smith! I'm Beeanca. Ready to get your own clinic off the ground?",
    audioPath: '/audio/ai/message1.mp3'
  },
  { 
    sender: 'user', 
    content: "Sure, can you tell me how can you help me exactly?", 
    isTyping: true,
    audioPath: '/audio/user/message1.mp3'
  },
  { 
    sender: 'ai', 
    content: "Sure, I help you set up and run your practice in days. I handle your payroll, billing, credentialing, and even marketing! You focus on patients, and we take care of the rest.",
    audioPath: '/audio/ai/message2.mp3'
  },
  { 
    sender: 'user', 
    content: "That sounds like exactly what I need. How can I start?", 
    isTyping: true,
    audioPath: '/audio/user/message2.mp3'
  },
  { 
    sender: 'ai', 
    content: "First let's find a place to sublease to get started quickly, based on your location, I recommend you to check out Dr Ramzi's place.",
    audioPath: '/audio/ai/message3.mp3'
  },
  { 
    sender: 'user', 
    content: "Yeah, sounds good.", 
    isTyping: true,
    audioPath: '/audio/user/message3.mp3'
  },
  { 
    sender: 'ai', 
    content: "Great. Want me to coordinate a visit with the owner? His calendar has Monday and Wednesday available at 3pm.",
    audioPath: '/audio/ai/message4.mp3'
  },
  { 
    sender: 'user', 
    content: "Perfect, Monday works for me.", 
    isTyping: true,
    audioPath: '/audio/user/message4.mp3'
  },
  { 
    sender: 'ai', 
    content: "Perfect, I'm sending a request to Dr Ramzi, I'll let you know what he decides…",
    audioPath: '/audio/ai/message5.mp3'
  },
  { 
    sender: 'user', 
    content: "Thank you Beeanca", 
    isTyping: true,
    audioPath: '/audio/user/message5.mp3'
  },
];

const DemoPhone = () => {
  const [currentState, setCurrentState] = useState<PhoneState>(PhoneState.COMPANY_LOGO);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [nextPressCount, setNextPressCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to play audio for a message
  const playMessageAudio = useCallback((audioPath: string | undefined) => {
    if (!audioPath) return;
    
    if (audioRef.current) {
      const playAudio = () => {
        if (!audioRef.current) return;
        
        // Stop any current playback
        audioRef.current.pause();
        
        // Reset the audio element
        audioRef.current.src = audioPath;
        audioRef.current.currentTime = 0;
        
        // Play with better error handling
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented - this is common in browsers
            console.warn("Audio playback failed, will retry with user interaction:", error);
            
            // Create a one-time click handler to try again
            const retryPlayback = () => {
              if (audioRef.current) {
                audioRef.current.play()
                  .then(() => {
                    document.removeEventListener('click', retryPlayback);
                  })
                  .catch(err => {
                    console.error("Audio playback failed even after user interaction:", err);
                  });
              }
            };
            
            // Add the retry handler
            document.addEventListener('click', retryPlayback, { once: true });
          });
        }
      };
      
      // Add a small delay to ensure audio context has time to initialize
      setTimeout(playAudio, 50);
    }
  }, []);

  // Update visible messages based on next press count
  useEffect(() => {
    let newVisibleMessages: Message[] = [];
    
    if (nextPressCount === 0) {
      // Initial state - no messages yet
      newVisibleMessages = [];
    } else if (nextPressCount === 1) {
      // After Start button press - show first AI message
      newVisibleMessages = [messages[0]];
      playMessageAudio(messages[0].audioPath);
    } else if (nextPressCount === 2) {
      // After second press - show first user message
      newVisibleMessages = [messages[1]];
      playMessageAudio(messages[1].audioPath);
    } else if (nextPressCount === 3) {
      // After third press - show second AI message
      newVisibleMessages = [messages[1], messages[2]];
      playMessageAudio(messages[2].audioPath);
    } else if (nextPressCount === 4) {
      // After fourth press - show second user message
      newVisibleMessages = [messages[3]];
      playMessageAudio(messages[3].audioPath);
    } else if (nextPressCount === 5) {
      // After fifth press - show third AI message
      newVisibleMessages = [messages[3], messages[4]];
      playMessageAudio(messages[4].audioPath);
    } else if (nextPressCount === 6) {
      // After sixth press - show third user message
      newVisibleMessages = [messages[5]];
      playMessageAudio(messages[5].audioPath);
    } else if (nextPressCount === 7) {
      // After seventh press - show fourth AI message
      newVisibleMessages = [messages[5], messages[6]];
      playMessageAudio(messages[6].audioPath);
    } else if (nextPressCount === 8) {
      // After eighth press - show fourth user message
      newVisibleMessages = [messages[7]];
      playMessageAudio(messages[7].audioPath);
    } else if (nextPressCount === 9) {
      // After ninth press - show fifth AI message
      newVisibleMessages = [messages[7], messages[8]];
      playMessageAudio(messages[8].audioPath);
    } else if (nextPressCount === 10) {
      // After tenth press - show fifth user message
      newVisibleMessages = [messages[9]];
      playMessageAudio(messages[9].audioPath);
    }
    
    setVisibleMessages(newVisibleMessages);
  }, [nextPressCount, playMessageAudio]);

  const handleNextState = useCallback(() => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    // Update nextPressCount first
    setNextPressCount(prev => prev + 1);
    
    // If we're at the initial state, we don't change the phone state yet
    if (nextPressCount > 0) {
      const states = Object.values(PhoneState);
      const currentIndex = states.indexOf(currentState);
      
      // Special handling for map states
      if (currentState === PhoneState.SHOW_MAP) {
        setIsAnimating(true);
        setCurrentState(PhoneState.SHOW_MAP_2);
        return;
      }

      // Special handling for second map state
      if (currentState === PhoneState.SHOW_MAP_2) {
        setIsAnimating(true);
        setCurrentState(PhoneState.SHOW_MAP_3);
        return;
      }

      // Special handling for third map state to go to waveform
      if (currentState === PhoneState.SHOW_MAP_3) {
        setIsAnimating(true);
        setCurrentState(PhoneState.POST_MAP_WAVEFORM);
        return;
      }

      // Special handling for post-map waveform to show AI message
      if (currentState === PhoneState.POST_MAP_WAVEFORM) {
        setIsAnimating(true);
        setCurrentState(PhoneState.SENDING_REQUEST);
        return;
      }
      
      if (currentIndex < states.length - 1) {
        setIsAnimating(true);
        setCurrentState(states[currentIndex + 1]);
      }
    }
  }, [currentState, isAnimating, nextPressCount]);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <style>{animationStyles}</style>
      <audio ref={audioRef} className="hidden" />
      <div className="flex items-center gap-8">
        <div className="w-[400px]">
          <DialogueUI messages={visibleMessages} />
        </div>
        <div className="flex flex-col items-center relative">
          <div className="relative">
            <IPhoneFrame>
              <PhoneContent 
                currentState={currentState} 
                onStateChange={setCurrentState}
                onAnimationComplete={handleAnimationComplete}
                audioRef={audioRef}
              />
            </IPhoneFrame>
          </div>
          <button
            onClick={handleNextState}
            className={`absolute -right-32 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 font-semibold z-50 ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
            disabled={isAnimating}
          >
            {nextPressCount === 0 ? "Start" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPhone;
