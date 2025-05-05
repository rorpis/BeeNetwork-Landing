import React, { useState, useEffect } from 'react';
import Waveform from './Waveform';
import AIFeatures from './AIFeatures';
import PracticeMap from './PracticeMap';
import IPhoneNotification from './IPhoneNotification';

// Define states as an enum
export enum PhoneState {
  COMPANY_LOGO = 'COMPANY_LOGO',
  INITIAL_WAVEFORM = 'INITIAL_WAVEFORM',
  AI_FEATURES = 'AI_FEATURES',
  SECOND_WAVEFORM = 'SECOND_WAVEFORM',
  SHOW_MAP = 'SHOW_MAP',
  SHOW_MAP_2 = 'SHOW_MAP_2',
  SHOW_MAP_3 = 'SHOW_MAP_3',
  POST_MAP_WAVEFORM = 'POST_MAP_WAVEFORM',
  SENDING_REQUEST = 'SENDING_REQUEST',
  APPOINTMENT_ACCEPTED = 'APPOINTMENT_ACCEPTED'
}

// Reusable component for Waveform display
interface WaveformContainerProps {
  audioRef?: React.RefObject<HTMLAudioElement>;
}

const WaveformContainer: React.FC<WaveformContainerProps> = ({ audioRef }) => (
  <div className="w-[300px] h-[200px]">
    <Waveform className="w-full h-full" audioRef={audioRef} />
  </div>
);

interface PhoneContentProps {
  currentState: PhoneState;
  onStateChange: (state: PhoneState) => void;
  onAnimationComplete?: () => void;
  audioRef?: React.RefObject<HTMLAudioElement>;
}

const PhoneContent: React.FC<PhoneContentProps> = ({ 
  currentState, 
  onStateChange,
  onAnimationComplete,
  audioRef
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSubtitle, setNotificationSubtitle] = useState("");
  const [previousState, setPreviousState] = useState<PhoneState>(currentState);

  // Handle state changes and trigger exit animation
  useEffect(() => {
    if (currentState !== previousState) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setPreviousState(currentState);
        setIsExiting(false);
        onAnimationComplete?.();
      }, 300); // Match the animation duration
      return () => clearTimeout(timer);
    }
  }, [currentState, previousState, onAnimationComplete]);

  // Effect to control the notification visibility and message
  useEffect(() => {
    let notifTimeout: NodeJS.Timeout | undefined;
    if (currentState === PhoneState.APPOINTMENT_ACCEPTED) {
      setNotificationMessage("Dr Ramzi's Practice Tour");
      setNotificationSubtitle("Dr Ramzi invites you to a personal tour of their practice. 10:00 AM EST");
      notifTimeout = setTimeout(() => {
         setShowNotification(true);
      }, 1500);
    } else {
      setShowNotification(false);
    }
    return () => notifTimeout && clearTimeout(notifTimeout);
  }, [currentState]);

  const backgroundClass = "relative w-full h-full bg-gradient-to-br from-[#6b4ba3] via-[#563d92] to-indigo-600 flex items-center justify-center text-white p-6 overflow-hidden";

  const renderStateContent = (state: PhoneState) => {
    switch (state) {
      case PhoneState.COMPANY_LOGO:
        return (
          <div className="flex flex-col items-center justify-center gap-4">
            <img 
              src="/lovable-uploads/dashboard-icon.png" 
              alt="BeeNetwork" 
              className="w-32 h-32 animate-fade-in"
            />
            <span className="text-2xl font-semibold text-white animate-fade-in-delayed">
              BeeNetwork
            </span>
          </div>
        );
      case PhoneState.INITIAL_WAVEFORM:
        return (
          <div className="flex flex-col items-center gap-4">
            <WaveformContainer audioRef={audioRef} />
          </div>
        );
      case PhoneState.AI_FEATURES:
        return <AIFeatures />;
      case PhoneState.SECOND_WAVEFORM:
        return (
          <div className="flex flex-col items-center gap-4">
            <WaveformContainer audioRef={audioRef} />
          </div>
        );
      case PhoneState.SHOW_MAP:
      case PhoneState.SHOW_MAP_2:
      case PhoneState.SHOW_MAP_3:
        return (
          <div className="w-full h-3/4">
            <PracticeMap />
          </div>
        );
      case PhoneState.POST_MAP_WAVEFORM:
        return (
          <div className="flex flex-col items-center gap-4">
            <WaveformContainer audioRef={audioRef} />
          </div>
        );
      case PhoneState.SENDING_REQUEST:
        return (
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl font-semibold">Sending request to Dr Ramzi…</span>
          </div>
        );
      case PhoneState.APPOINTMENT_ACCEPTED:
        return (
            <div className="flex flex-col items-center gap-4">
              <div className="px-6 py-4 rounded-xl border border-white text-white text-lg font-semibold select-none cursor-default transition-all text-center bg-transparent">
                Dr Ramzi accepted your request. I'll send an appointment to your calendar now.
              </div>
            </div>
        );
    }
  };

  return (
    <div className={backgroundClass}>
      {currentState !== PhoneState.SHOW_MAP && currentState !== PhoneState.SHOW_MAP_2 && currentState !== PhoneState.SHOW_MAP_3 && (
         <div
           style={{
             opacity: isExiting ? 0 : 1,
             transform: isExiting ? 'scale(0.9)' : 'scale(1)',
             transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out'
           }}
         >
           {renderStateContent(previousState)}
         </div>
      )}
      {(currentState === PhoneState.SHOW_MAP || currentState === PhoneState.SHOW_MAP_2 || currentState === PhoneState.SHOW_MAP_3) && renderStateContent(currentState)}

      {currentState === PhoneState.APPOINTMENT_ACCEPTED && (
        <IPhoneNotification
          visible={showNotification}
          senderName="Beeanca from BeeNetwork"
          invitationTitle={notificationMessage}
          invitationDetails={notificationSubtitle}
          icon={<img src="/gmail-logo.webp" alt="Gmail" width="24" height="24" className="rounded-sm" />}
        />
      )}
    </div>
  );
};

export default PhoneContent;