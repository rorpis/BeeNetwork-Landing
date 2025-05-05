import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface Message {
  sender: 'ai' | 'user';
  content: string;
  isTyping?: boolean;
}

interface DialogueUIProps {
  messages: Message[];
  className?: string;
}

const DialogueUI: React.FC<DialogueUIProps> = ({ messages, className }) => {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null);
  const [typingText, setTypingText] = useState<string>('');
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  // Keep track of messages that have already been typed
  const typedMessagesRef = useRef<Set<string>>(new Set());
  // Track the previous messages to detect new ones
  const prevMessagesRef = useRef<Message[]>([]);
  
  // Set displayed messages and check for typing messages
  useEffect(() => {
    setDisplayedMessages(messages);
    
    // Find new user messages that haven't been typed yet
    const newMessages = messages.filter((msg, idx) => {
      // Check if this message was in the previous messages array
      const wasInPrevMessages = prevMessagesRef.current.some(
        (prevMsg) => prevMsg.content === msg.content && prevMsg.sender === msg.sender
      );
      
      // Only consider it as new if it's a user message with isTyping flag
      // and either it's not in previous messages OR it hasn't been typed yet
      return msg.sender === 'user' && 
             msg.isTyping && 
             (!wasInPrevMessages || !typedMessagesRef.current.has(msg.content));
    });
    
    // If we have new messages to type
    if (newMessages.length > 0) {
      // Get the last new message
      const lastNewMessage = newMessages[newMessages.length - 1];
      const lastNewIndex = messages.findIndex(msg => msg === lastNewMessage);
      
      if (lastNewIndex !== -1) {
        setTypingMessageIndex(lastNewIndex);
        setTypingText('');
        startTypingAnimation(lastNewMessage.content);
      }
    } else {
      // No new typing messages
      setTypingMessageIndex(null);
      setTypingText('');
    }
    
    // Update previous messages ref
    prevMessagesRef.current = [...messages];
    
    return () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    };
  }, [messages]);
  
  // Function to start the typing animation
  const startTypingAnimation = (text: string) => {
    // Clear any existing timer
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    
    // Add a 1-second delay before starting typing
    typingTimer.current = setTimeout(() => {
      let currentIndex = 0;
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setTypingText(text.substring(0, currentIndex + 1));
          currentIndex++;
          
          // Schedule next character
          typingTimer.current = setTimeout(typeNextChar, 50);
        } else {
          // Typing completed
          setTypingMessageIndex(null);
          // Mark this message as typed
          typedMessagesRef.current.add(text);
        }
      };
      
      // Start typing
      typeNextChar();
    }, 1000); // 1-second delay before typing starts
  };

  return (
    <div className={cn("flex flex-col gap-4 min-h-[500px] relative bg-amber-50 p-4 rounded-lg", className)}>
      {displayedMessages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex items-start gap-3 absolute w-full",
            message.sender === 'user' ? 'justify-end right-0' : 'justify-start left-0',
            {
              'top-0': index === 0,
              'top-24': index === 1, 
              'top-48': index === 2,
              'top-72': index === 3,
              'top-96': index === 4,
              'top-[30rem]': index === 5,
              'top-[36rem]': index === 6,
              'top-[42rem]': index === 7,
              'top-[48rem]': index === 8,
              'top-[54rem]': index === 9,
            }
          )}
        >
          {message.sender === 'ai' && (
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 border-2 border-purple-600">
              <img 
                src="/lovable-uploads/dashboard-icon.png" 
                alt="BeeNetwork" 
                className="w-5 h-5"
              />
            </div>
          )}
          <div
            className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2.5",
              message.sender === 'ai'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-900'
            )}
          >
            {message.sender === 'user' && index === typingMessageIndex ? typingText : message.content}
          </div>
          {message.sender === 'user' && (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DialogueUI; 