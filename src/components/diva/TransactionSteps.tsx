import React from 'react';
import { ArrowDownUp, ArrowRightLeft, LockKeyhole, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TransactionStep {
  action: string;
  amount: string;
  from_token: string;
  from_chain: string;
  to_token: string;
  to_chain: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
}

interface TransactionStepsProps {
  steps: TransactionStep[];
  currentStep?: number;
}

export function TransactionSteps({ steps, currentStep = 0 }: TransactionStepsProps) {
  const getStepIcon = (action: string) => {
    switch (action) {
      case 'SWAP':
        return <ArrowDownUp className="w-4 h-4" />;
      case 'BRIDGE':
        return <ArrowRightLeft className="w-4 h-4" />;
      case 'STAKE':
        return <LockKeyhole className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'processing';
    return 'pending';
  };

  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        
        return (
          <div key={index} className="relative">
            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div className="absolute left-4 top-[2.5rem] bottom-[-0.25rem] w-[2px]">
                <div className="h-full w-full bg-gradient-to-b from-blue-500/20 to-transparent" />
              </div>
            )}
            
            <div className={`relative rounded-lg backdrop-blur-sm transition-all duration-300 ${
              status === 'completed' ? 'bg-white/40 shadow-sm' :
              status === 'processing' ? 'bg-blue-50/50 shadow-lg ring-1 ring-blue-500/20' :
              'bg-white/30'
            }`}>
              <div className="p-3">
                <div className="flex items-center gap-3">
                  {/* Status Icon */}
                  <div className={`relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    status === 'completed' ? 'bg-green-100' :
                    status === 'processing' ? 'bg-blue-100' :
                    'bg-gray-100'
                  }`}>
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : status === 'processing' ? (
                      <div className="absolute inset-0 rounded-full">
                        <div className="absolute inset-0 rounded-full border-2 border-blue-500/30" />
                        <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin" />
                        {getStepIcon(step.action)}
                      </div>
                    ) : (
                      getStepIcon(step.action)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-medium transition-colors ${
                          status === 'completed' ? 'text-green-700' :
                          status === 'processing' ? 'text-blue-700' :
                          'text-gray-700'
                        }`}>
                          {step.action.charAt(0) + step.action.slice(1).toLowerCase()}
                        </h3>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full transition-colors ${
                          status === 'completed' ? 'bg-green-100 text-green-700' :
                          status === 'processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}/{steps.length}
                        </span>
                      </div>
                      
                      <span className={`text-xs font-medium transition-colors ${
                        status === 'completed' ? 'text-green-600' :
                        status === 'processing' ? 'text-blue-600' :
                        'text-gray-400'
                      }`}>
                        {status === 'completed' ? 'Completed' :
                         status === 'processing' ? 'Processing...' :
                         'Pending'}
                      </span>
                    </div>

                    <div className={`mt-1 flex items-center gap-2 py-1 px-2 rounded transition-all text-sm ${
                      status === 'completed' ? 'bg-green-50/50' :
                      status === 'processing' ? 'bg-blue-50/50' :
                      'bg-gray-50/50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{step.amount} {step.from_token}</span>
                        <span className="text-xs text-gray-500">({step.from_chain})</span>
                        
                        <ChevronRight className={`w-4 h-4 transition-colors ${
                          status === 'completed' ? 'text-green-400' :
                          status === 'processing' ? 'text-blue-400' :
                          'text-gray-400'
                        }`} />
                        
                        <span className="font-medium text-gray-900">{step.amount} {step.to_token}</span>
                        <span className="text-xs text-gray-500">({step.to_chain})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}