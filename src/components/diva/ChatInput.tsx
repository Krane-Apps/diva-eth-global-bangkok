import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white p-4 border-t border-gray-100 shadow-sm">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="button"
        className="p-3 rounded-lg bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      >
        <Mic size={20} />
      </button>
      <button
        type="submit"
        className="p-3 rounded-lg gradient-bg text-white hover:opacity-90 transition-opacity"
      >
        <Send size={20} />
      </button>
    </form>
  );
}