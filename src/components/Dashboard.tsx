import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { UnstakeModal } from './UnstakeModal';
import { DepositModal } from './DepositModal';
import { ReferralStats } from './ReferralStats';
import { YieldCalculator } from './YieldCalculator';
import { AvailablePlans } from './AvailablePlans';
import { TransactionHistory } from './TransactionHistory';
import { DashboardGuide } from './DashboardGuide';
import { QuickTips } from './QuickTips';
import { Leaderboard } from './Leaderboard';
import {
  Wallet,
  Clock,
  RefreshCw,
  LogOut,
  TrendingUp,
  Calendar,
  AlertCircle,
  Star,
  Info,
  Zap,
  Crown,
  Target,
  User,
  Diamond,
  BarChart3,
  ChevronUp
} from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { RestakeModal } from './RestakeModal';
import { WithdrawModal } from './WithdrawModal';
import { StakingAnalytics } from './StakingAnalytics';

export function Dashboard() {
  const navigate = useNavigate();
  const { clearSession } = useAuthStore();
  const { fetchUserData, fetchStakes, loading, stakes, user } = useUserStore();



  const activeStakesPlanMatch = {
    "045a88bc-e647-11ef-8679-04421a23dd01": "Core Vault",
    "045a8a8b-e647-11ef-8679-04421a23dd01": "Growth Nexus",
    "045a8b03-e647-11ef-8679-04421a23dd01": "Elite Matrix",
    "174e640d-e6e1-11ef-8679-04421a23dd01": "Legacy Protocol",
  }


  // Use memo for expensive calculations
  const activeStakes = stakes ? stakes.filter(stake => stake.status === 'staked') : [];

  // const stakingMetrics = React.useMemo(() => {
  //   const totalStaked = activeStakes.reduce((acc, stake) => acc + stake.amount, 0);
  //   const totalRewards = activeStakes.reduce((acc, stake) => acc + stake.total_earned, 0);
  //   const dailyRewards = activeStakes.reduce((acc, stake) => 
  //     acc + (stake.amount * stake.daily_yield / 100), 0
  //   );

  //   return { totalStaked, totalRewards, dailyRewards };
  // }, [activeStakes]);

  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [ethPrice, setEthPrice] = React.useState<number>(0);
  const [ethPriceLoading, setEthPriceLoading] = React.useState(true);
  const [unstakeModalOpen, setUnstakeModalOpen] = React.useState(false);
  const [depositModalOpen, setDepositModalOpen] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>("ETH")
  const [withdrawrefModalOpen, setWithdrawrefModalOpen] = React.useState(false);
  const [selectedUnstake, setSelectedUnstake] = React.useState<any>(null);
  const [selectedRestake, setSelectedRestake] = React.useState<any>(null);
  const [restakeModalOpen, setRestakeModalOpen] = React.useState(false);
  const [depositAddress, setDepositAddress] = React.useState<string>('');
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const [restakeError, setRestakeError] = React.useState<string | null>(null);
  const [ethPriceError, setEthPriceError] = React.useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await clearSession();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };



  // Fetch data on mount
  useEffect(() => {
    fetchUserData();
    fetchStakes();
    fetchEthPrice();



    const updateInterval = setInterval(() => {
      fetchUserData();
      // getInvestmentPlans();
      fetchStakes();
      fetchEthPrice();
      // setLastUpdate(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(updateInterval);

  }, []);

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

  function calculateRemainingDaysCustomFormat(
    stakedDate: string,
    lockPeriodDays: number,
    currentDate: string = new Date().toISOString().split('T')[0]
  ): number {
    const stakedDateParts = stakedDate.split(' '); // Split date and time
    const stakedDateOnly = stakedDateParts[0]; // Get the date part
    const stakedDateTime = new Date(stakedDateOnly);
    const currentDateTime = new Date(currentDate);

    const lockPeriodEndDate = new Date(stakedDateTime);
    lockPeriodEndDate.setDate(stakedDateTime.getDate() + lockPeriodDays);

    const timeDifference = lockPeriodEndDate.getTime() - currentDateTime.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysRemaining;
  }

  const handleStake = async (plan: string, minStake: number, _dailyYield: number, address: string, currency: string) => {
    try {
      setActionLoading(`generating_address_${plan}`)
      setSelectedPlan({ name: plan, minStake });

      setDepositAddress(address)

      // Store the selected currency
      setSelectedCurrency(currency)
      setDepositModalOpen(true);
      setActionLoading(null)
    } catch (error) {
      console.error('Error in handleStake:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to generate deposit address. Please try again.';
      alert(errorMessage);

      setActionLoading(null);

    }
  };

  const handleRestakeClick = (stakeid: any) => {
    setRestakeError('')
    setSelectedRestake(stakeid);
    setRestakeModalOpen(true);
  };

  const handleUnstakeClick = (stake: any) => {
    setSelectedUnstake(stake);
    setUnstakeModalOpen(true);
  };

  // const openStakingModal = async () => {
  //   setDepositModalOpen(true);
  // }

  const handleWithdrawRefClick = () => {
    // setSelectedUnstake(stake);
    console.log("withdraw ref clicked")
    setWithdrawrefModalOpen(true);
  };






  const totalStakedUSD = (user?.total_staked ?? 0) * ethPrice;
  const totalRewardsUSD = (user?.total_rewards ?? 0) * ethPrice;
  const dailyRewardsUSD = (user?.daily_rewards ?? 0) * ethPrice;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
      <p className="text-xl font-semibold text-slate-400">Oops, Session Expired.</p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/login')}
        className=" bg-slate-700 mb-2 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg  transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Go to login
      </motion.button>
    </div>;

  }



  return (
    <div className=" min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Staking Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">Welcome back, {user?.name}</p>
          </div>

          <div className="flex flex-col mb-2 md:flex-row justify-center  items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/profile')}
              className="z-50 mb-2 md:mb-0 ml-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/support')}
              className=" z-50 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Support</span>
            </motion.button> */}
            <button
              onClick={handleLogout}
              className="z-50 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        {ethPriceError && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-yellow-500">
              Unable to fetch current ETH price. Using estimated values.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dashboard-overview">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Staked</p>
                <p className="text-2xl font-bold">{Number(user?.total_staked).toFixed(4)} ETH</p>
                <p className="text-sm text-slate-400">≈ ${totalStakedUSD.toLocaleString()}</p>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Rewards</p>
                <p className="text-2xl font-bold text-green-400">{user?.total_rewards.toFixed(4)} ETH</p>
                <p className="text-sm text-green-500">≈ ${totalRewardsUSD.toLocaleString()}</p>
              </div>
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Active Stakes</p>
                <p className="text-2xl font-bold">{user?.active_stake_count}</p>
                <p className="text-sm text-slate-400">Active positions</p>
              </div>
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Daily Rewards</p>
                <p className="text-2xl font-bold text-blue-400">{user?.daily_rewards.toFixed(4)} ETH</p>
                <p className="text-sm text-blue-500">≈ ${dailyRewardsUSD}</p>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Active Stakes</h2>
            <div className="text-sm text-slate-400">
              {activeStakes.length} active {activeStakes.length === 1 ? 'position' : 'positions'}
            </div>
          </div>

          {activeStakes.length > 0 ? (
            <div className="space-y-4">
              {activeStakes.map(stake => {
                const startDate = new Date(stake.staked_at);
                const daysSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                const daysRemaining = calculateRemainingDaysCustomFormat(stake.staked_at, Number(stake.lock_period_days));
                // const daysRemainingBonusAct = calculateRemainingDaysCustomFormat(stake.staked_at, Number(60));

                // Calculate days remaining for bonus activation based on bonus_yield status
                const calculateDaysRemainingForBonus = () => {
                  if (stake.bonus_yield === "1") {
                    // If bonus is already active, calculate days in the current 30-day cycle
                    const bonusActivationDate = new Date(stake.staked_at)
                    bonusActivationDate.setDate(bonusActivationDate.getDate() + 60) // Initial activation after 60 days

                    const currentDate = new Date()
                    const daysSinceActivation = Math.floor(
                      (currentDate.getTime() - bonusActivationDate.getTime()) / (1000 * 60 * 60 * 24),
                    )

                    // Calculate days remaining in the current 30-day cycle
                    // Ensure it's never 0 by using 30 when it would be 0
                    const daysRemainingInCycle = daysSinceActivation % 30 === 0 ? 30 : 30 - (daysSinceActivation % 30)
                    return daysRemainingInCycle
                  } else {
                    // If bonus is not yet active, count down from 60 days
                    return calculateRemainingDaysCustomFormat(stake.staked_at, Number(60))
                  }
                }

                const daysRemainingBonusAct = calculateDaysRemainingForBonus()

                return (
                  <motion.div
                    key={stake.id}
                    layoutId={stake.id}
                    className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div>
                            <h3 className="text-xl font-bold">{activeStakesPlanMatch[stake.plan_id as keyof typeof activeStakesPlanMatch]}</h3>
                            <p className="text-sm text-slate-400">Started {new Date(stake.staked_at).toLocaleDateString()}</p>
                          </div>
                          {/* {activeStakesPlanMatch[stake.plan_id as keyof typeof activeStakesPlanMatch] === 'Elite Matrix' && (
                            <div className="bg-emerald-500/20 px-2 py-1 rounded text-xs font-medium text-emerald-400">
                              Premium Analytics
                            </div>
                          )} */}
                          {/* {activeStakesPlanMatch[stake.plan_id as keyof typeof activeStakesPlanMatch] === 'Legacy Protocol' && (
                            <div className="bg-amber-500/20 px-2 py-1 rounded text-xs font-medium text-amber-400">
                              Premium Tier
                            </div>
                          )} */}
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRestakeClick(stake.id)}

                            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center space-x-2 text-sm hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <RefreshCw className={`w-4 h-4 ${actionLoading === stake.id + '_restake' ? 'animate-spin' : ''}`} />
                            <span>Restake</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUnstakeClick(stake)}

                            className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Unstake</span>
                          </motion.button>
                        </div>
                      </div>

                      {restakeError && (
                        <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400 flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{restakeError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-slate-400">Staked Amount</p>
                          <p className="text-lg font-bold">{Number(stake.amount).toFixed(4)} ETH</p>
                          <p className="text-sm text-slate-400">≈ ${(Number(stake.amount) * ethPrice).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Daily Yield</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-lg font-bold text-green-400">{stake.dpy}%</p>
                            {stake.bonus_yield == "1" && (
                              <span title="Bonus Activated">
                                <Star className="w-4 h-4 text-yellow-400" />
                              </span>
                            )}
                            {/* {diamondHandsMilestone?.achieved && (
                              <span title="Diamond Hands Bonus Active">
                                <Diamond className="w-4 h-4 text-blue-400" />
                              </span>
                            )} */}
                          </div>
                          <p className="text-sm text-green-500">{(Number(stake.amount) * Number(stake.dpy) / 100).toFixed(4)} ETH/day</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Total Rewards</p>
                          <p className="text-lg font-bold text-blue-400">{Number(stake.earnings).toFixed(4)} ETH</p>
                          <p className="text-sm text-blue-500">≈ ${(Number(stake.earnings) * ethPrice).toLocaleString()}</p>
                        </div>
                        <div>
                          <div>
                            <p className="text-sm text-slate-400">Next Yield Increase</p>
                            <div className="flex items-center space-x-2">
                              <p className="text-lg font-bold">{daysRemainingBonusAct} days</p>
                              {stake.bonus_yield === "1" ? <ChevronUp className="w-4 h-4 text-green-400"  /> : <></> }
                            </div>
                            <p className="text-sm text-slate-400">
                              {stake.bonus_yield === "1" ? "Until next yield increase" : "Until bonus activation"}
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Elite Matrix Features */}
                      {activeStakesPlanMatch[stake.plan_id as keyof typeof activeStakesPlanMatch] === 'Elite Matrix' && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-emerald-400 mb-3 flex items-center">
                              <Zap className="w-5 h-5 mr-2" />
                              Elite Features
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-center space-x-3">
                                <div className="bg-emerald-500/20 p-2 rounded-lg">
                                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Flash Stake</p>
                                  <p className="text-sm text-slate-400">
                                    {true
                                      ? '+3.0% active for 24h'
                                      : 'Next event: Coming soon'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-500/20 p-2 rounded-lg">
                                  <BarChart3 className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Temporary 30-Day boost</p>
                                  <p className="text-sm text-slate-400">
                                    +2.0% for 2+ deposit
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-purple-500/20 p-2 rounded-lg">
                                  <Star className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Priority Access</p>
                                  <p className="text-sm text-slate-400">
                                    Early feature access
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Legacy Protocol Features */}
                      {activeStakesPlanMatch[stake.plan_id as keyof typeof activeStakesPlanMatch] === 'Legacy Protocol' && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-amber-400 mb-3 flex items-center">
                              <Crown className="w-5 h-5 mr-2" />
                              Legacy Milestones
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="flex items-center space-x-3">
                                <div className="bg-amber-500/20 p-2 rounded-lg">
                                  <Calendar className="w-4 h-4 text-amber-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Duration</p>
                                  <p className="text-sm text-slate-400">
                                    {daysSinceStart >= 90
                                      ? '+0.5% yield achieved'
                                      : `${90 - daysSinceStart} days to +0.5%`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-green-500/20 p-2 rounded-lg">
                                  <Target className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Amount</p>
                                  <p className="text-sm text-slate-400">
                                    {Number(stake.amount) >= 50
                                      ? '+0.5% yield achieved'
                                      : `${(50 - Number(stake.amount)).toFixed(2)} ETH to +0.5%`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-500/20 p-2 rounded-lg">
                                  <RefreshCw className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Compound</p>
                                  <p className="text-sm text-slate-400">
                                    {Number(stake.restake_count) >= 3
                                      ? '+0.5% yield achieved'
                                      : `${3 - (Number(stake.restake_count) || 0)} restakes to +0.5%`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-purple-500/20 p-2 rounded-lg">
                                  <Diamond className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Diamond Hands</p>
                                  {/* <p className="text-sm text-slate-400">
                                    {diamondHandsMilestone?.achieved
                                      ? '+1.0% yield achieved'
                                      : `${180 - daysSinceStart} days to +1.0%`}
                                  </p> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          {daysSinceStart >= 60 && (
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                              <div className="flex items-center space-x-2 text-sm text-blue-400">
                                <Info className="w-4 h-4" />
                                <span>
                                  Partial exit available with reduced 12.5% penalty
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Growth Nexus Multi-Deposit Bonus */}
                      {/* {activeStakesPlanMatch[stake.plan_id as keyof typeof activeStakesPlanMatch] === 'Growth Nexus' && multiDepositMilestone?.achieved && (
                        <div className="mt-4 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-sm text-purple-400">
                            <Star className="w-4 h-4" />
                            <span>
                              Multi-Deposit Bonus Active: +0.3% additional daily yield
                            </span>
                          </div>
                        </div>
                      )} */}

                      {/* Standard Bonus Activation Notice */}
                      {stake.status == "staked" && daysRemaining > 0 && (
                        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-sm text-blue-400">
                            <Star className="w-4 h-4" />
                            <span>
                              Maintain your stake for {daysRemainingBonusAct} more days to activate bonus yield!
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 text-center"
            >
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">No Active Stakes</p>
              <p className="text-slate-400">Start staking to earn rewards and track your progress here!</p>
            </motion.div>
          )}
        </motion.div>

        <div className="analytics-section">
          {user?.stakes ? (
            <StakingAnalytics stakes={user.stakes} ethPrice={ethPrice} monthlyEarnings={user.monthly_earnings} />
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
              <p className="text-slate-400">No staking data available</p>
            </div>
          )}
        </div>

        <div className="leaderboard-section">
          <Leaderboard />
        </div>

        <div className="staking-plans">
          <AvailablePlans onStake={handleStake} actionLoading={actionLoading} />
        </div>

        <div className="yield-calculator">
          <YieldCalculator ethPrice={ethPrice} />
        </div>

        <div className="referral-section">
          <ReferralStats
            referralCode={user?.referral_code || ''}
            totalReferrals={Number(user?.total_referrals) || 0}
            activeReferrals={Number(user?.active_referrals)}
            referralRewards={Number(user?.referral_rewards)}
            ethPrice={ethPrice}
            handleWithdraw={handleWithdrawRefClick} />
        </div>

        <div className="transaction-history">
          <TransactionHistory />
        </div>
      </div>

      {unstakeModalOpen && (
        <UnstakeModal
          isOpen={unstakeModalOpen}
          onClose={() => {
            setUnstakeModalOpen(false);
            setSelectedUnstake(null);
          }}
          // onConfirm={handleUnstakeConfirm}
          stake={selectedUnstake || { amount: 0, total_earned: 0, plan: 'Core Vault', withdrawal_cycle: 30, next_withdrawal_date: new Date().toISOString() }}
          ethPrice={ethPrice}
        />
      )}

      {depositModalOpen && (
        <DepositModal
          isOpen={depositModalOpen}
          onClose={() => {
            setDepositModalOpen(false);
            setSelectedPlan(null);
            setDepositAddress('');
            setSelectedCurrency("ETH")
          }}
          depositAddress={depositAddress}
          minAmount={selectedPlan?.minStake || 0}
          ethPrice={ethPrice}
          currency={selectedCurrency}
        />
      )}



      <WithdrawModal
        isOpen={withdrawrefModalOpen}
        ethPrice={ethPrice}
        balance={Number(user.earnings)}
        onClose={() => {
          setWithdrawrefModalOpen(false);

        }}

      />

      <DashboardGuide />

      <RestakeModal
        isOpen={restakeModalOpen}
        onClose={() => {
          setRestakeModalOpen(false)
        }
        }
        stakeID={selectedRestake}
      />

      <QuickTips />
    </div>
  );
}

export default Dashboard;