import  { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, } from 'lucide-react';
import { usePriceStore } from '../store/priceStore';
import Scripter from './Scripter';

export function PriceHeader() {
  const { ethPrice, priceChange24h,   startPriceUpdates, stopPriceUpdates } = usePriceStore();

  useEffect(() => {
    startPriceUpdates();
    return () => stopPriceUpdates();
  }, []);

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src="https://cryptologos.cc/logos/ethereum-eth-logo.svg"
                alt="ETH"
                className="w-6 h-6 mr-2"
              />
              <span className="font-medium">ETH/USD</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">${ethPrice.toLocaleString()}</span>
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center ${priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {priceChange24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(priceChange24h).toFixed(2)}%
              </motion.span>
            </div>
          </div>
          
          {/* {lastUpdate && (
            <div className="flex items-center text-sm text-slate-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )} */}
          <Scripter /> {/* *** RENDER ONCE - Desktop Position *** */}
        </div>
      </div>
    </div>
  );
}