import React from 'react';
import { ChevronRight } from 'lucide-react';

interface QuickCommandsProps {
  onCommandClick: (command: string) => void;
}

const commands = [
  { text: 'Swap ETH to BTC', icon: '💱' },
  { text: 'Bridge USDT to Polygon', icon: '🌉' },
  { text: 'Stake ETH', icon: '📈' },
];

export function QuickCommands({ onCommandClick }: QuickCommandsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
      {commands.map((command, index) => (
        <button
          key={index}
          onClick={() => onCommandClick(command.text)}
          className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
        >
          <span>{command.icon}</span>
          <span className="text-gray-700">{command.text}</span>
          <ChevronRight size={16} className="text-blue-500" />
        </button>
      ))}
    </div>
  );
}