import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 group`}>
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} max-w-[80%] items-end gap-2`}>
        <div className={`w-8 h-8 rounded-xl glass flex items-center justify-center ${
          isBot ? 'text-blue-500' : 'text-purple-500'
        } transition-transform group-hover:scale-110`}>
          {isBot ? <Bot size={20} /> : <User size={20} />}
        </div>
        <div className={`rounded-xl px-4 py-2 ${
          isBot 
            ? 'glass hover:bg-opacity-5' 
            : 'bg-blue-500 bg-opacity-20 hover:bg-opacity-25'
        } transition-all duration-200`}>
          <p className="text-sm md:text-base">{message}</p>
          <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}