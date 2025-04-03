import { useEffect } from 'react';
import Scripter from './Scripter';
import React from 'react';
import { AlertCircle } from 'lucide-react';

export function PriceHeader() {

  const [ethPrice, setEthPrice] = React.useState<number>(0);
  const [ethPriceLoading, setEthPriceLoading] = React.useState(true);
  const [ethPriceError, setEthPriceError] = React.useState<boolean>(false);

  const fetchEthPrice = async () => {
    try {
      setEthPriceLoading(true);
      console.log(ethPriceLoading)
      setEthPriceError(false);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        {
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data?.ethereum?.usd) {
        setEthPrice(data.ethereum.usd);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      setEthPriceError(true);
      setEthPrice(1800);
    } finally {
      setEthPriceLoading(false);
    }
  };


  useEffect(() => {
    fetchEthPrice();

    const updateInterval = setInterval(() => {
      fetchEthPrice();
    }, 5 * 60 * 1000);

    return () => clearInterval(updateInterval);
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
              {ethPriceError && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <p className="text-sm text-yellow-500">
                    Unable to fetch current ETH price. Using estimated values.
                  </p>
                </div>
              )}
              {/* <motion.span
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
              </motion.span> */}
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