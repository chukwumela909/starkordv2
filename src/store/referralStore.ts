import { create } from 'zustand';


interface ReferralState {
  referralCode: string;
  totalReferrals: number;
  activeReferrals: number;
  referralRewards: number;
  loading: boolean;
  error: string | null;
  fetchReferralStats: () => Promise<void>;
  generateReferralCode: () => Promise<void>;
}

export const useReferralStore = create<ReferralState>((set) => ({
  referralCode: 'DEMO123',
  totalReferrals: 5,
  activeReferrals: 3,
  referralRewards: 0.25,
  loading: false,
  error: null,

  fetchReferralStats: async () => {
  

    // For demo, use static data
    set({
      totalReferrals: 5,
      activeReferrals: 3,
      referralRewards: 0.25,
      loading: false,
      error: null
    });
  },

  generateReferralCode: async () => {
   

    // For demo, use static code
    set({ 
      referralCode: 'DEMO123', 
      error: null 
    });
  },
}));