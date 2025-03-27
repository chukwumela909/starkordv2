import { create } from 'zustand';
import axios from 'axios';


interface User {
    id: string;
    name: string;
    country: string;
    earnings: string;
    phone: string;
    referral_code: string;
    referral_rewards: number;
    total_referrals: string;
    active_referrals: string;
    daily_returns: {
        amount: number;
        daily_apr: number;
    };
    monthly_projection: {
        amount: number;
        monthly_apr: number;
    };
    annual_projection: {
        amount: number;
        apy: number;
    };
    total_staked: number;
    total_rewards: number;
    active_stake_count: number;
    daily_rewards: number;
}

interface Stake {
    id: string;
    user_id: string;
    can_unstake: string;
    bonus_yield: string;
    plan_id: string;
    amount: string;
    earnings: string;
    status: string;
    deposit_address: string;
    dpy: string;
    lock_period_days: string;
    penalty: string;
    loyalty_bonus: string;
    temp_loyalty_bonus: string;
    staked_at: string;
    restake: string;
    unstaked_at: string | null;
    unstaked: string;
    restake_count: string;
    tx_id: string;
    created_at: string;
    due: string;
}

interface InvestmentPlan {
    id: string;
    name: string;
    min_amount: string;
    max_amount: string;
    dpy: string;
    lock_period_days: string;
    icon: string;
    color: string;
    description: string;
    created_at: string;
}

interface UserState {
    user: User | null;
    stakes: Stake[] | null;
    plans: InvestmentPlan[] | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    error: string | null;
    fetchUserData: () => Promise<void>;
    fetchStakes: () => Promise<void>;
    getInvestmentPlans: () => Promise<void>;
    withdraw: (amount: string, eth_address: string) => Promise<void>;
    withdrawerror: string | null;
    loadingWithdraw: boolean;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    plans: null,
    stakes: null,
    loading: false,
    loadingWithdraw: false,
    withdrawerror: null,
    setUser: (user) => set({ user }),
    error: null,

    fetchUserData: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('auth-token');
            console.log(token);
            if (!token) {
                console.log("No auth token found")
                throw new Error('No auth token found');
            }

            const response = await axios.post("https://app.starkord.com/api/auth/user-data.php", {
                token: token
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": "Bearer a7bX9c2dE5fg1h8i"
                },
            });

            console.log(response);

            if (response.status !== 200) {
                throw new Error('Failed to fetch user data');
            }
            const data = response.data;
            console.log(data);
            set({ user: data });

        } catch (error) {
            console.error('Fetch user data error:', error);
            if (axios.isAxiosError(error) && error.response) {
                set({ error: error.response.data });
            } else {
                set({ error: String(error) });
            }
        } finally {
            set({ loading: false });
        }
    },

    fetchStakes: async () => {
        set({ loading: true });
        try {
            const token = localStorage.getItem('auth-token');
            console.log(token);
            if (!token) {
                console.log("No auth token found")
                throw new Error('No auth token found');
            }
            const response = await axios.post("https://app.starkord.com/api/investment/list-stakes.php", {
                token: token
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": "Bearer a7bX9c2dE5fg1h8i"
                },
            });

            console.log(response);

            if (response.status !== 200) throw new Error('Failed to fetch user data');
            const data = response.data;
            console.log(data);
            set({ stakes: data['stakes'] });
        } catch (error) {
            console.error('Fetch stakes error:', error);
            if (axios.isAxiosError(error) && error.response) {
                set({ error: error.response.data });
            } else {
                set({ error: String(error) });
            }
        } finally {
            set({ loading: false });
        }
    },

    getInvestmentPlans: async () => {
        set({ loading: true, error: null });
        try {

            const response = await axios.get("https://app.starkord.com/api/investment/plans.php", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": "Bearer a7bX9c2dE5fg1h8i"
                },
            });

            console.log(response);

            if (response.status !== 200) throw new Error('Failed to fetch user data');
            const data = response.data;
            console.log(data);
            set({ plans: data });
            console.log('Investment plans:', useUserStore.getState().plans);
        } catch (error) {
            console.error('Fetch user data error:', error);
            if (axios.isAxiosError(error) && error.response) {
                set({ error: error.response.data });
            } else {
                set({ error: String(error) });
            }
        } finally {
            set({ loading: false });
        }
    },

    withdraw: async (amount: string, eth_address: string): Promise<void> => {
        set({ loadingWithdraw: true });
        try {
          const token = localStorage.getItem('auth-token');
          console.log(token);
          if (!token) {
            console.log("No auth token found")
            throw new Error('No auth token found');
          }
          const response = await axios.post("https://app.starkord.com/api/withdrawal/create.php", {
            token: token,
            amount: amount,
            eth_address: eth_address,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Authorization": "Bearer a7bX9c2dE5fg1h8i"
            },
          });
    
          console.log(response);
    
          if (response.status !== 200) throw new Error('Failed to withdraw');
          const data = response.data;
          console.log(data);
        } catch (error) {
          console.error('withdraw error:', error);
          if (axios.isAxiosError(error) && error.response) {
            set({ withdrawerror: error.response.data.message });
          } else {
            set({ withdrawerror: String(error) });
            throw error;
          }
        } finally {
          set({ loadingWithdraw: false });
          return
        }
      },
}));

// Usage example in a component

// const Dashboard = () => {
//     const { user, loading, error, fetchUserData } = useUserStore();

//     useEffect(() => {
//         fetchUserData();
//     }, [fetchUserData]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!user) {
//         return <div>No user data available</div>;
//     }

//     return (
//         <div>
//             <h1>Welcome, {user.name}</h1>
//             <p>Country: {user.country}</p>
//             <p>Earnings: {user.earnings}</p>
//             <p>Phone: {user.phone}</p>
//             <p>Referral Code: {user.referral_code}</p>
//             <p>Total Referrals: {user.total_referrals}</p>
//             <p>Active Referrals: {user.active_referrals}</p>
//             <p>Referral Rewards: {user.referral_rewards}</p>
//             <p>Total Staked: {user.total_staked}</p>
//             <p>Total Rewards: {user.total_rewards}</p>
//             <p>Active Stake Count: {user.active_stake_count}</p>
//             <p>Daily Rewards: {user.daily_rewards}</p>
//         </div>
//     );
// };

// export default Dashboard;
