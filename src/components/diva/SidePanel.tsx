import React from 'react';
import { Clock, ArrowUpRight, Wallet, History, ChevronRight } from 'lucide-react';

const recentTransactions = [
  { type: 'Swap', from: 'ETH', to: 'BTC', amount: '1.5', status: 'completed', time: '2m ago' },
  { type: 'Bridge', from: 'USDT', to: 'Polygon', amount: '500', status: 'pending', time: '5m ago' },
];

const walletBalances = [
  { token: 'ETH', amount: '2.5', value: '$4,750.00' },
  { token: 'BTC', amount: '0.15', value: '$6,225.00' },
  { token: 'USDT', amount: '1,000', value: '$1,000.00' },
];

export function SidePanel() {
  return (
    <div className="w-80 border-l border-gray-100 bg-gradient-to-b from-white to-blue-50 hidden lg:block">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <Wallet size={20} className="text-blue-500" />
            Wallet
          </h2>
          <div className="space-y-3">
            {walletBalances.map((balance, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-medium text-gray-800">{balance.token}</p>
                  <p className="text-sm text-gray-500">{balance.amount}</p>
                </div>
                <p className="text-sm text-gray-600">{balance.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <History size={20} className="text-blue-500" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-1 text-gray-800">
                    {tx.type}
                    <ArrowUpRight size={14} className="text-blue-500" />
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {tx.time}
                    <Clock size={12} />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-600">{tx.amount} {tx.from}</span>
                    <ChevronRight size={14} className="inline mx-1 text-gray-400" />
                    <span className="text-gray-800">{tx.to}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tx.status === 'completed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}