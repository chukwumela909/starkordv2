import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator,  Calendar, TrendingUp, RefreshCw, ChevronUp,  Info } from 'lucide-react';

interface YieldCalculatorProps {
  ethPrice: number;
}

export function YieldCalculator({ ethPrice }: YieldCalculatorProps) {
  const [amount, setAmount] = useState<number>(0);
  const [plan, setPlan] = useState<string>('Core Vault');
  const [compounding, setCompounding] = useState<boolean>(true);

  const plans = {
    'Core Vault': { 
      yield: 0.5, 
      min: 0.05,
      max: 0.99,
      bonusYield: 0.75,
      maxYield: 1.0,
      withdrawalCycle: 30,
      description: 'Low-risk, stable returns. Rewards can be restaked after 30-day unstake window. Bonus yield after 60 days (Max 1%).',
      compoundingAllowed: false,
      earlyUnstakePenalty: 10
    },
    'Growth Nexus': { 
      yield: 1.2, 
      min: 1,
      max: 4.99,
      bonusYield: 1.35,
      maxYield: 1.5,
      withdrawalCycle: 45,
      description: 'Balanced growth with compounding rewards. Bonus yield after 60 days (Max 1.5%). 45-day unstake window.',
      compoundingAllowed: true,
      earlyUnstakePenalty: 15
    },
    'Elite Matrix': { 
      yield: 1.5, 
      min: 5,
      max: 9.99,
      bonusYield: 1.65,
      maxYield: 1.8,
      withdrawalCycle: 60,
      description: 'Premium analytics & enhanced yields. Bonus yield after 60 days (Max 1.8%). 60-day unstake window.',
      compoundingAllowed: true,
      earlyUnstakePenalty: 20
    },
    'Legacy Protocol': { 
      yield: 2.0, 
      min: 10,
      max: 600,
      bonusYield: 2.25,
      maxYield: 2.5,
      withdrawalCycle: 90,
      description: 'Premium plan with generational rewards. Bonus yield after 60 days (Max 2.5%). 90-day unstake window.',
      compoundingAllowed: true,
      earlyUnstakePenalty: 25
    }
  };

  useEffect(() => {
    // Disable compounding for Core Vault
    if (plan === 'Core Vault' && compounding) {
      setCompounding(false);
    }
  }, [plan]);

  const calculateReturns = (days: number) => {
    const planDetails = plans[plan as keyof typeof plans];
    const dailyYield = planDetails.yield;
    const bonusYield = planDetails.bonusYield;
    const maxYield = planDetails.maxYield;
    
    let earned: number;

    if (compounding && planDetails.compoundingAllowed) {
      const initialPeriod = Math.min(days, 60);
      const bonusPeriod = Math.min(Math.max(0, days - 60), 30);
      const maxYieldPeriod = Math.max(0, days - 90);
      
      let currentAmount = amount * Math.pow(1 + dailyYield / 100, initialPeriod);
      
      if (bonusPeriod > 0) {
        currentAmount = currentAmount * Math.pow(1 + bonusYield / 100, bonusPeriod);
      }
      
      if (maxYieldPeriod > 0) {
        currentAmount = currentAmount * Math.pow(1 + maxYield / 100, maxYieldPeriod);
      }
      
      earned = currentAmount - amount;
    } else {
      const initialEarnings = amount * (dailyYield / 100) * Math.min(days, 60);
      const bonusEarnings = days > 60 ? amount * (bonusYield / 100) * Math.min(days - 60, 30) : 0;
      const maxEarnings = days > 90 ? amount * (maxYield / 100) * (days - 90) : 0;
      
      earned = initialEarnings + bonusEarnings + maxEarnings;
    }

    const total = amount + earned;
    const platformFee = earned * 0.10;
    const netEarned = earned - platformFee;
    const netTotal = amount + netEarned;

    const effectiveYield = days <= 60 ? dailyYield : 
                          days <= 90 ? bonusYield : 
                          maxYield;
    const apy = compounding && planDetails.compoundingAllowed
      ? (Math.pow(1 + effectiveYield / 100, 365) - 1) * 100
      : effectiveYield * 365;

    return {
      earned,
      total,
      platformFee,
      netEarned,
      netTotal,
      apy
    };
  };

  const thirtyDayReturns = calculateReturns(30);
  const ninetyDayReturns = calculateReturns(90);
  const oneEightyDayReturns = calculateReturns(180);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calculator className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Yield Calculator</h2>
          </div>
          <button
            onClick={() => plan !== 'Core Vault' && setCompounding(!compounding)}
            disabled={plan === 'Core Vault'}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              plan === 'Core Vault'
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : compounding
                ? 'bg-green-500/20 text-green-400'
                : 'bg-slate-700/50 text-slate-400'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${compounding && plan !== 'Core Vault' ? 'animate-spin' : ''}`} />
            <span>Compound Interest</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Stake Amount (ETH)</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                    // Allow empty input (will show as 0)
                    if (e.target.value === "") {
                      setAmount(0)
                      return
                    }
  
                    // Allow any valid number input, we'll validate on blur
                    if (!isNaN(value)) {
                    setAmount(value);
                  }
                }}
                onBlur={() => {
                  // On blur, ensure the value is within the plan's limits
                  const planDetails = plans[plan as keyof typeof plans]
                  if (amount < planDetails.min) {
                    setAmount(planDetails.min)
                  } else if (amount > planDetails.max) {
                    setAmount(planDetails.max)
                  }
                }}
                min={plans[plan as keyof typeof plans].min}
                max={plans[plan as keyof typeof plans].max}
                step="0.01"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">ETH</span>
            </div>
            <p className="text-sm text-slate-400 mt-1">≈ ${(amount * ethPrice).toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">
              Valid range: {plans[plan as keyof typeof plans].min} - {plans[plan as keyof typeof plans].max} ETH
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Staking Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(plans).map(([name, details]) => (
                <option key={name} value={name}>
                  {name} ({details.min} - {details.max} ETH)
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-slate-400">
                Base: {plans[plan as keyof typeof plans].yield}% daily
              </p>
              <ChevronUp className="w-3 h-3 text-green-400" />
              <p className="text-sm text-green-400">
                Max: {plans[plan as keyof typeof plans].maxYield}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-sm text-blue-400">
            <Info className="w-4 h-4" />
            <p>
              {plans[plan as keyof typeof plans].description} • {plans[plan as keyof typeof plans].earlyUnstakePenalty}% early unstake penalty
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-medium">30 Days</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Gross Earnings</span>
                <span className="text-green-400">+{thirtyDayReturns.earned.toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Platform Fee</span>
                <span className="text-red-400">-{thirtyDayReturns.platformFee.toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-slate-700">
                <span>Net Total</span>
                <div className="text-right">
                  <div>{thirtyDayReturns.netTotal.toFixed(4)} ETH</div>
                  <div className="text-sm text-slate-400">
                    ≈ ${(thirtyDayReturns.netTotal * ethPrice).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-slate-400">APY</span>
                <span className="text-green-400">{thirtyDayReturns.apy.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="font-medium">90 Days</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Gross Earnings</span>
                <span className="text-green-400">+{ninetyDayReturns.earned.toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Platform Fee</span>
                <span className="text-red-400">-{ninetyDayReturns.platformFee.toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-slate-700">
                <span>Net Total</span>
                <div className="text-right">
                  <div>{ninetyDayReturns.netTotal.toFixed(4)} ETH</div>
                  <div className="text-sm text-slate-400">
                    ≈ ${(ninetyDayReturns.netTotal * ethPrice).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-slate-400">APY</span>
                <span className="text-green-400">{ninetyDayReturns.apy.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-green-400" />
              <span className="font-medium">180 Days</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Gross Earnings</span>
                <span className="text-green-400">+{oneEightyDayReturns.earned.toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Platform Fee</span>
                <span className="text-red-400">-{oneEightyDayReturns.platformFee.toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-slate-700">
                <span>Net Total</span>
                <div className="text-right">
                  <div>{oneEightyDayReturns.netTotal.toFixed(4)} ETH</div>
                  <div className="text-sm text-slate-400">
                    ≈ ${(oneEightyDayReturns.netTotal * ethPrice).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-slate-400">APY</span>
                <span className="text-green-400">{oneEightyDayReturns.apy.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-blue-400">
              {compounding && plans[plan as keyof typeof plans].compoundingAllowed
                ? "Earnings are automatically reinvested for compound growth. Yields increase after 60 days and again after 90 days. A 10% platform fee is applied to earnings."
                : "Simple interest calculation without reinvestment. Yields increase after 60 days and again after 90 days. A 10% platform fee is applied to earnings."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}