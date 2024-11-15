import React, { useState } from 'react';
import { ArrowDownUp, Info, Edit2, CheckCircle, XCircle, ArrowDown } from 'lucide-react';
import { TokenSelector } from './TokenSelector';

interface TransactionBoxProps {
  type: 'swap' | 'bridge' | 'stake';
  onConfirm: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

const defaultTokens = {
  from: {
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    balance: '2.5',
    value: '$4,750.00'
  },
  to: {
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    balance: '0.15',
    value: '$6,225.00'
  }
};

export function TransactionBox({ type, onConfirm, onEdit, onCancel }: TransactionBoxProps) {
  const [amount, setAmount] = useState('');
  const [fromToken, setFromToken] = useState(defaultTokens.from);
  const [toToken, setToToken] = useState(defaultTokens.to);

  return (
    <div className="glass rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500 bg-opacity-10 flex items-center justify-center">
            <ArrowDownUp className="text-blue-500" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <p className="text-sm text-gray-400">Choose tokens to swap</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-200 p-2 hover:bg-white hover:bg-opacity-5 rounded-lg transition-colors">
          <Info size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="glass p-4 rounded-xl space-y-3">
          <div className="flex justify-between text-sm text-gray-400">
            <span>From</span>
            <span>Balance: {fromToken.balance} {fromToken.symbol}</span>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium focus:outline-none"
            />
            <TokenSelector selectedToken={fromToken} onSelect={setFromToken} />
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            className="p-2 rounded-lg glass hover:bg-white hover:bg-opacity-5 transition-colors"
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
            }}
          >
            <ArrowDown size={20} className="text-blue-500" />
          </button>
        </div>

        <div className="glass p-4 rounded-xl space-y-3">
          <div className="flex justify-between text-sm text-gray-400">
            <span>To</span>
            <span>Balance: {toToken.balance} {toToken.symbol}</span>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium focus:outline-none"
              readOnly
              value={amount ? (Number(amount) * 0.05).toFixed(6) : ''}
            />
            <TokenSelector selectedToken={toToken} onSelect={setToToken} />
          </div>
        </div>

        <div className="glass p-4 rounded-xl space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Network Fee</span>
            <span className="font-medium">≈ $2.50</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="font-medium">1 {fromToken.symbol} ≈ {0.05} {toToken.symbol}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price Impact</span>
            <span className="text-green-500">-0.05%</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            disabled={!amount}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 button-glow transition-colors"
          >
            <CheckCircle size={18} />
            Confirm Swap
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-3 rounded-xl glass glass-hover flex items-center justify-center"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-3 rounded-xl glass glass-hover flex items-center justify-center text-red-500"
          >
            <XCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}