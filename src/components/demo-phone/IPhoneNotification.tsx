import React from 'react';

interface IPhoneNotificationProps {
  visible: boolean;
  senderName?: string;
  invitationTitle: string;
  invitationDetails: string;
  icon?: React.ReactNode;
}

const IPhoneNotification: React.FC<IPhoneNotificationProps> = ({
  visible,
  senderName = "BeeNetwork",
  invitationTitle,
  invitationDetails,
  icon,
}) => {
  return (
    <div
      className="fixed left-1/2 z-50 w-[92%] sm:w-[90%] min-w-[280px] max-w-[360px] pointer-events-none"
      style={{
        top: 0,
        transform: `translateX(-50%) translateY(${visible ? '70px' : '-120%'})`,
        transition: 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
      role="alert"
      aria-live="assertive"
      aria-hidden={!visible}
    >
      <div 
        className="
          flex items-center gap-3
          bg-gray-100/95 
          backdrop-blur-xl 
          rounded-2xl 
          shadow-sm 
          p-3
          dark:bg-gray-800/90
        "
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          borderRadius: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-gray-200/80 rounded-lg dark:bg-gray-700/80 p-1.5">
          {icon || <img src="/gmail-logo.webp" alt="Gmail" width="45" height="45" className="rounded-sm" />}
        </div>
        <div className="flex-grow text-left min-w-0">
          <div className="flex justify-between items-center">
            <span 
              className="text-sm font-semibold text-gray-900 dark:text-white"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              {senderName}
            </span>
            <span 
              className="text-xs text-gray-500 dark:text-gray-400"
              style={{ fontSize: '12px' }}
            >
              now
            </span>
          </div>
          <div 
            className="text-sm font-semibold text-gray-900 dark:text-white pt-0.5"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Invitation: {invitationTitle}
          </div>
          <div 
            className="text-sm text-gray-700 dark:text-gray-300"
            style={{ fontSize: '13px', fontWeight: 400, lineHeight: '1.3' }}
          >
            {invitationDetails}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPhoneNotification;