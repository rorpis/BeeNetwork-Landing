import React from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { cn } from '@/lib/utils';

interface IPhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  landscape?: boolean;
  zoom?: number;
}

const IPhoneFrame = React.forwardRef<HTMLDivElement, IPhoneFrameProps>(
  ({ 
    children, 
    className,
    landscape = false,
    zoom = 0.8,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          className
        )}
        {...props}
      >
        <DeviceFrameset
          device="iPhone X"
          landscape={landscape}
          zoom={zoom}
        >
          <div className="w-full h-full overflow-hidden">
            {children}
          </div>
        </DeviceFrameset>
      </div>
    );
  }
);

IPhoneFrame.displayName = 'IPhoneFrame';

export default IPhoneFrame;
