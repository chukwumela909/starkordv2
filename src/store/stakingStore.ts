import { create } from 'zustand';
import axios from 'axios';
import { useNotificationStore } from './notificationStore';

interface Stake {
  id: string;
  plan: string;
  amount: number;
  daily_yield: number;
  start_date: string;
  end_date: string;
  status: string;
  total_earned: number;
  last_payout: string;
  deposit_address?: string;
  base_yield: number;
  max_yield: number;
  bonus_activated: boolean;
  last_yield_increase?: string;
  last_withdrawal?: string;
  next_withdrawal_date?: string;
  withdrawal_cycle: number;
  analytics_enabled?: boolean;
  milestone_bonuses?: {
    type: string;
    amount: number;
    achieved: boolean;
    date?: string;
    progress?: number;
    target?: number;
  }[];
  deposit_count?: number;
  restake_count?: number;
  total_deposits?: number;
}

interface StakingState {
  stakes: Stake[];
  loading: boolean;
  error: string | null;
  unstakeError: string | null;
  loadingUnstake: boolean;
  fetchStakes: () => Promise<void>;
  restake: (stakeId: string) => Promise<boolean>;
  unstake: (stake_id: string, wallet_address: string, unstake_amount: string) => Promise<boolean>;
  restakeError: string | null;
  loadingRestake: boolean;

  canWithdraw: (stakeId: string) => boolean;
  getNextWithdrawalDate: (stakeId: string) => Date | null;
  updateYields: () => Promise<void>;
}

const mockStakes: Stake[] = [
  {
    id: '1',
    plan: 'Core Vault',
    amount: 0.5,
    daily_yield: 0.6,
    base_yield: 0.5,
    max_yield: 1.0,
    start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 177 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    total_earned: 0.348,
    last_payout: new Date().toISOString(),
    bonus_activated: false,
    withdrawal_cycle: 30,
    next_withdrawal_date: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
    milestone_bonuses: [
      {
        type: 'welcome',
        amount: 0.1,
        achieved: true,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 3,
        target: 7
      }
    ],
    deposit_count: 1,
    restake_count: 0
  },
  {
    id: '2',
    plan: 'Growth Nexus',
    amount: 3.5,
    daily_yield: 1.5,
    base_yield: 1.2,
    max_yield: 1.5,
    start_date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 145 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    total_earned: 1.85,
    last_payout: new Date().toISOString(),
    bonus_activated: false,
    withdrawal_cycle: 45,
    next_withdrawal_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    deposit_count: 3,
    restake_count: 1,
    milestone_bonuses: [
      {
        type: 'multi_deposit',
        amount: 0.3,
        achieved: true,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 3,
        target: 3
      }
    ]
  },
  {
    id: '3',
    plan: 'Elite Matrix',
    amount: 7.5,
    daily_yield: 1.5,
    base_yield: 1.5,
    max_yield: 1.8,
    start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 165 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    total_earned: 2.25,
    last_payout: new Date().toISOString(),
    bonus_activated: false,
    analytics_enabled: true,
    withdrawal_cycle: 60,
    next_withdrawal_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    deposit_count: 2,
    restake_count: 1,
    milestone_bonuses: [
      {
        type: 'flash_stake',
        amount: 3.0,
        achieved: true,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 24,
        target: 24
      }
    ]
  },
  {
    id: '4',
    plan: 'Legacy Protocol',
    amount: 75.0,
    daily_yield: 2.0,
    base_yield: 2.0,
    max_yield: 2.5,
    start_date: new Date(Date.now() - 185 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 95 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    total_earned: 42.5,
    last_payout: new Date().toISOString(),
    bonus_activated: true,
    withdrawal_cycle: 90,
    next_withdrawal_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    milestone_bonuses: [
      {
        type: 'duration',
        amount: 0.5,
        achieved: true,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'amount',
        amount: 0.5,
        achieved: true,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 75,
        target: 100
      },
      {
        type: 'compound',
        amount: 0.5,
        achieved: false,
        progress: 2,
        target: 3
      },
      {
        type: 'diamond_hands',
        amount: 1.0,
        achieved: true,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 185,
        target: 180
      }
    ],
    deposit_count: 3,
    restake_count: 2,
    total_deposits: 75.0
  }
];

export const useStakingStore = create<StakingState>((set, get) => ({
  stakes: mockStakes,
  loading: false,
  error: null,
  unstakeError: null,
  loadingUnstake: false,
  restakeError: null,
  loadingRestake: false,

  fetchStakes: async () => {
    set({ loading: true });
    try {
      set({ stakes: mockStakes, error: null });
      await get().updateYields();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateYields: async () => {
    const stakes = get().stakes;
    const updatedStakes = stakes.map(stake => {
      if (stake.status !== 'active') return stake;

      const startDate = new Date(stake.start_date);
      const now = new Date();
      const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      // Handle Core Vault welcome bonus
      if (stake.plan === 'Core Vault') {
        const welcomeMilestone = stake.milestone_bonuses?.find(m => m.type === 'welcome');
        if (welcomeMilestone) {
          welcomeMilestone.progress = daysSinceStart;

          // Remove welcome bonus after 7 days
          if (daysSinceStart >= 7 && welcomeMilestone.achieved) {
            welcomeMilestone.achieved = false;
            stake.daily_yield = stake.base_yield;

            useNotificationStore.getState().addNotification({
              type: 'info',
              title: 'Welcome Bonus Expired',
              message: 'Your 7-day welcome bonus of +0.1% has expired. Your yield has returned to the base rate.',
              duration: 7000
            });
          }
        } else if (daysSinceStart <= 7) {
          stake.milestone_bonuses = [
            ...(stake.milestone_bonuses || []),
            {
              type: 'welcome',
              amount: 0.1,
              achieved: true,
              date: startDate.toISOString(),
              progress: daysSinceStart,
              target: 7
            }
          ];
          stake.daily_yield = stake.base_yield + 0.1;
        }
      }

      // Handle Growth Nexus multi-deposit bonus
      if (stake.plan === 'Growth Nexus') {
        const multiDepositMilestone = stake.milestone_bonuses?.find(m => m.type === 'multi_deposit');
        const depositCount = stake.deposit_count || 1;

        if (depositCount >= 3 && (!multiDepositMilestone || !multiDepositMilestone.achieved)) {
          const milestones = stake.milestone_bonuses || [];
          const updatedMilestones = [
            ...milestones.filter(m => m.type !== 'multi_deposit'),
            {
              type: 'multi_deposit',
              amount: 0.3,
              achieved: true,
              date: now.toISOString(),
              progress: depositCount,
              target: 3
            }
          ];

          useNotificationStore.getState().addNotification({
            type: 'success',
            title: 'Multi-Deposit Bonus Activated!',
            message: 'Congratulations! You\'ve earned +0.3% additional daily yield for having 3 or more deposits.',
            duration: 10000
          });

          return {
            ...stake,
            daily_yield: stake.daily_yield + 0.3,
            milestone_bonuses: updatedMilestones
          };
        }
      }

      // Handle Legacy Protocol Diamond Hands bonus
      if (stake.plan === 'Legacy Protocol') {
        const diamondHandsMilestone = stake.milestone_bonuses?.find(m => m.type === 'diamond_hands');
        if (diamondHandsMilestone && !diamondHandsMilestone.achieved && daysSinceStart >= 180) {
          diamondHandsMilestone.achieved = true;
          diamondHandsMilestone.date = now.toISOString();
          diamondHandsMilestone.progress = daysSinceStart;

          stake.daily_yield += diamondHandsMilestone.amount;

          useNotificationStore.getState().addNotification({
            type: 'success',
            title: 'Diamond Hands Bonus Achieved!',
            message: 'Congratulations! You\'ve earned +1% additional daily yield for holding your Legacy Protocol stake for 180 days.',
            duration: 10000
          });
        }
      }

      // If bonus not activated and 60 days passed, activate bonus
      if (!stake.bonus_activated && daysSinceStart >= 60) {
        return {
          ...stake,
          daily_yield: stake.base_yield * 1.5,
          bonus_activated: true,
          last_yield_increase: now.toISOString()
        };
      }

      return stake;
    });

    set({ stakes: updatedStakes });
  },




  restake: async (stakeId: string): Promise<boolean> => {
    set({ loadingRestake: true, restakeError: null });
    try {
      const token = localStorage.getItem('auth-token');

      if (!token) {
        set({ restakeError: "No auth token found" })
        return false;
      }

      const response = await axios.post("https://app.starkord.com/api/investment/restake.php", {
        token: token,
        stake_id: stakeId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Failed to restake');

      return true;

    } catch (error) {
      console.error('Restake error:', error);
      if (axios.isAxiosError(error) && error.response) {
        set({ restakeError: error.response.data.message || "Failed to restake" });
      } else {
        set({ restakeError: String(error) });
        throw error;
      }
      return false
    } finally {
      set({ loadingRestake: false });

    }
  },

  unstake: async (stake_id: string, wallet_address: string, unstake_amount: string): Promise<boolean> => {
    set({ loadingUnstake: true, unstakeError: null });
    try {
      const token = localStorage.getItem('auth-token');

      if (!token) {
        set({ restakeError: "No auth token found" })
        return false;
      }
      const response = await axios.post("https://app.starkord.com/api/investment/unstake.php", {
        token: token,
        stake_id: stake_id,
        wallet_address: wallet_address,
        unstake_amount: unstake_amount
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Failed to restake');

      return true;

    } catch (error) {
      console.error('unstake error:', error);
      if (axios.isAxiosError(error) && error.response) {
        set({ unstakeError: error.response.data.message || "Failed to unstake" });
      } else {
        set({ unstakeError: String(error) });
        throw error;
      }
      return false
    } finally {
      set({ loadingUnstake: false });
    }
  },


  canWithdraw: (stakeId: string): boolean => {
    const stake = get().stakes.find(s => s.id === stakeId);
    if (!stake) return false;

    const now = new Date();
    const nextWithdrawalDate = new Date(stake.next_withdrawal_date || stake.start_date);
    return now >= nextWithdrawalDate;
  },

  getNextWithdrawalDate: (stakeId: string): Date | null => {
    const stake = get().stakes.find(s => s.id === stakeId);
    if (!stake) return null;

    return new Date(stake.next_withdrawal_date || stake.start_date);
  },



}
)
);

export default useStakingStore;