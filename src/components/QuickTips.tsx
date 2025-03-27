import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight, Info } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: 'deposit' | 'withdraw' | 'general';
}

const tips: Tip[] = [
  {
    id: 'deposit-1',
    title: 'How to Deposit',
    content: '1. Choose a staking plan\n2. Click "Start Staking"\n3. Send ETH to the provided deposit address\n4. Wait for network confirmation (5-10 minutes)',
    category: 'deposit'
  },
  {
    id: 'deposit-2',
    title: 'Supported Deposit Methods',
    content: 'We accept deposits in ETH, USDT (ERC20 & TRC20), and BTC. All deposits are automatically converted to ETH for staking.',
    category: 'deposit'
  },
  {
    id: 'withdraw-1',
    title: 'How to Withdraw',
    content: '1. Select your active stake\n2. Click "Unstake"\n3. Enter your withdrawal address\n4. Confirm the transaction\n5. Receive funds within 24 hours',
    category: 'withdraw'
  },
  {
    id: 'withdraw-2',
    title: 'Withdrawal Windows',
    content: 'Each plan has a specific withdrawal window:\n- Core Vault: 30 days\n- Growth Nexus: 45 days\n- Elite Matrix: 60 days\n- Legacy Protocol: 90 days',
    category: 'withdraw'
  }
];

export function QuickTips() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'deposit' | 'withdraw' | 'general'>('general');

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg flex items-center space-x-2"
      >
        <HelpCircle className="w-5 h-5" />
        <span className="pr-2">Quick Tips</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 right-0 w-96 bg-slate-800 rounded-xl border border-slate-700 shadow-xl"
          >
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold">Help & Guides</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-700">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCategory('deposit')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === 'deposit'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Deposits
                </button>
                <button
                  onClick={() => setSelectedCategory('withdraw')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === 'withdraw'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Withdrawals
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {tips
                .filter(tip => tip.category === selectedCategory)
                .map(tip => (
                  <div
                    key={tip.id}
                    className="p-4 border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Info className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{tip.title}</h4>
                        <p className="text-sm text-slate-400 whitespace-pre-line">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-4 bg-slate-700/50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 text-sm transition-colors"
              >
                <span>Got it, thanks!</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}