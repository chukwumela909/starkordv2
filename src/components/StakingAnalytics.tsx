import  { useState } from 'react';
import { motion } from 'framer-motion';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp,  ChevronUp,  DollarSign, Wallet, Award,  Filter } from 'lucide-react';
import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface Stake {
  id: string;
  plan: string;
  amount: number;
  daily_yield: number;
  start_date: string;
  end_date: string;
  status: string;
  total_earned: number;
}

interface StakingAnalyticsProps {
  stakes: Stake[];
  ethPrice: number;
}

export function StakingAnalytics({ stakes, ethPrice }: StakingAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const activeStakes = stakes.filter(stake => stake.status === 'active');
  const totalStaked = activeStakes.reduce((acc, stake) => acc + stake.amount, 0);
  const totalEarned = activeStakes.reduce((acc, stake) => acc + stake.total_earned, 0);
  const dailyYield = activeStakes.reduce((acc, stake) => acc + (stake.amount * stake.daily_yield / 100), 0);

  // Generate historical data
  const generateHistoricalData = () => {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 180;
    const startDate = subDays(new Date(), days);
    
    return Array.from({ length: days + 1 }, (_, i) => {
      const date = addDays(startDate, i);
      const dayStakes = stakes.filter(stake => new Date(stake.start_date) <= date);
      const earnings = dayStakes.reduce((acc, stake) => {
        const stakeDays = Math.floor((date.getTime() - new Date(stake.start_date).getTime()) / (1000 * 60 * 60 * 24));
        return acc + (stake.amount * (stake.daily_yield / 100) * stakeDays);
      }, 0);

      return {
        date: format(date, 'MMM dd'),
        earnings: Number(earnings.toFixed(4)),
        tvl: dayStakes.reduce((acc, stake) => acc + stake.amount, 0)
      };
    });
  };

  // Generate monthly performance data
  const generateMonthlyData = () => {
    const start = startOfMonth(subDays(new Date(), 180));
    const end = endOfMonth(new Date());
    const days = eachDayOfInterval({ start, end });
    
    const monthlyData = days.reduce((acc: any, date) => {
      const monthKey = format(date, 'MMM yyyy');
      const dayStakes = stakes.filter(stake => new Date(stake.start_date) <= date);
      const dailyEarnings = dayStakes.reduce((sum, stake) => {
        return sum + (stake.amount * (stake.daily_yield / 100));
      }, 0);

      if (!acc[monthKey]) {
        acc[monthKey] = { earnings: 0, days: 0 };
      }
      acc[monthKey].earnings += dailyEarnings;
      acc[monthKey].days += 1;
      return acc;
    }, {});

    return Object.entries(monthlyData).map(([month, data]: [string, any]) => ({
      month,
      earnings: Number((data.earnings / data.days).toFixed(4))
    }));
  };

  // Calculate performance metrics
  const calculateMetrics = () => {
    const monthlyReturn = dailyYield * 30;
    const annualizedReturn = dailyYield * 365;
    const roi = totalStaked > 0 ? (totalEarned / totalStaked) * 100 : 0;

    return {
      monthlyReturn,
      annualizedReturn,
      roi
    };
  };

  const historicalData = generateHistoricalData();
  const monthlyData = generateMonthlyData();
  const metrics = calculateMetrics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Staking Analytics</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
          <div className="text-sm text-slate-400">
            Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Value Locked</p>
              <p className="text-2xl font-bold mt-2">{totalStaked.toFixed(4)} ETH</p>
              <p className="text-sm text-slate-400">≈ ${(totalStaked * ethPrice).toLocaleString()}</p>
            </div>
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Earnings</p>
              <p className="text-2xl font-bold mt-2 text-green-400">{totalEarned.toFixed(4)} ETH</p>
              <p className="text-sm text-green-500">≈ ${(totalEarned * ethPrice).toLocaleString()}</p>
            </div>
            <div className="bg-green-500/20 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">ROI</p>
              <div className="flex items-center mt-2">
                <p className="text-2xl font-bold text-purple-400">{metrics.roi.toFixed(2)}%</p>
                <ChevronUp className="w-4 h-4 text-purple-400 ml-1" />
              </div>
              <p className="text-sm text-purple-500">Return on Investment</p>
            </div>
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Daily Yield</p>
              <p className="text-2xl font-bold mt-2 text-amber-400">{dailyYield.toFixed(4)} ETH</p>
              <p className="text-sm text-amber-500">≈ ${(dailyYield * ethPrice).toLocaleString()}</p>
            </div>
            <div className="bg-amber-500/20 p-2 rounded-lg">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Historical Performance Chart */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold mb-6">Historical Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                name="Earnings"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TVL Chart */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold mb-6">Total Value Locked (TVL)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorTVL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area
                type="monotone"
                dataKey="tvl"
                name="TVL"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorTVL)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold mb-6">Monthly Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Bar
                dataKey="earnings"
                name="Average Daily Earnings"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <h4 className="text-lg font-bold mb-4">Daily Returns</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Amount</span>
              <span className="font-bold text-green-400">{dailyYield.toFixed(4)} ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">USD Value</span>
              <span>${(dailyYield * ethPrice).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Daily APR</span>
              <span>{(dailyYield / totalStaked * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <h4 className="text-lg font-bold mb-4">Monthly Projection</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Amount</span>
              <span className="font-bold text-green-400">{metrics.monthlyReturn.toFixed(4)} ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">USD Value</span>
              <span>${(metrics.monthlyReturn * ethPrice).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Monthly APR</span>
              <span>{(metrics.monthlyReturn / totalStaked * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <h4 className="text-lg font-bold mb-4">Annual Projection</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Amount</span>
              <span className="font-bold text-green-400">{metrics.annualizedReturn.toFixed(4)} ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">USD Value</span>
              <span>${(metrics.annualizedReturn * ethPrice).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">APY</span>
              <span>{(metrics.annualizedReturn / totalStaked * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}