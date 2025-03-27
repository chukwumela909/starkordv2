import { create } from 'zustand';

interface PriceState {
  ethPrice: number;
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  priceChange24h: number;
  updateEthPrice: (price: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPriceChange: (change: number) => void;
  startPriceUpdates: () => void;
  stopPriceUpdates: () => void;
}

export const usePriceStore = create<PriceState>((set, get) => {
  let updateInterval: NodeJS.Timeout | null = null;
  let retryTimeout: NodeJS.Timeout | null = null;
  let retryCount = 0;
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 5000;
  const FALLBACK_PRICE = 3845.67;

  // Use mock data instead of real API calls for demo
  const mockPriceData = {
    price: FALLBACK_PRICE,
    change: 2.45
  };

  const fetchPrice = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use mock data
      set({
        ethPrice: mockPriceData.price,
        priceChange24h: mockPriceData.change,
        lastUpdate: new Date(),
        loading: false,
        error: null
      });
      
      retryCount = 0;
    } catch (error) {
      console.error('Error fetching price:', error);
      
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        const delay = RETRY_DELAY * Math.pow(2, retryCount - 1);
        
        retryTimeout = setTimeout(fetchPrice, delay);
        set({ 
          error: `Retrying price update in ${delay/1000}s...`,
          loading: true 
        });
        return;
      }

      // Use last known price if available
      const lastPrice = get().ethPrice;
      if (lastPrice > 0) {
        set({
          loading: false,
          lastUpdate: new Date(),
          error: 'Using last known price'
        });
        return;
      }

      // Fall back to default price
      set({ 
        ethPrice: FALLBACK_PRICE,
        loading: false,
        error: 'Using fallback price',
        lastUpdate: new Date()
      });
    }
  };

  return {
    ethPrice: FALLBACK_PRICE,
    loading: false,
    error: null,
    lastUpdate: null,
    priceChange24h: 0,
    updateEthPrice: (price) => set({ ethPrice: price }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPriceChange: (change) => set({ priceChange24h: change }),
    startPriceUpdates: () => {
      set({ loading: true });
      fetchPrice();
      updateInterval = setInterval(fetchPrice, 60000);
    },
    stopPriceUpdates: () => {
      if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout);
        retryTimeout = null;
      }
    }
  };
});