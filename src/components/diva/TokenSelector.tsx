import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  logo: string;
  balance: string;
  value: string;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onSelect: (token: Token) => void;
}

const tokens: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    balance: '2.5',
    value: '$4,750.00'
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    balance: '0.15',
    value: '$6,225.00'
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
    balance: '1,000.00',
    value: '$1,000.00'
  }
];

export function TokenSelector({ selectedToken, onSelect }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <img src={selectedToken.logo} alt={selectedToken.symbol} className="w-6 h-6" />
        <span className="font-medium text-gray-800">{selectedToken.symbol}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-lg p-4 z-50 border border-gray-100">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mb-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-sm text-gray-800"
            />
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onSelect(token);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img src={token.logo} alt={token.symbol} className="w-8 h-8" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{token.symbol}</p>
                    <p className="text-sm text-gray-500">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-800">{token.balance}</p>
                  <p className="text-xs text-gray-500">{token.value}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}