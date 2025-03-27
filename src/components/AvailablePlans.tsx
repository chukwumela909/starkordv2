"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  TrendingUp,
  Zap,
  Star,
  ChevronUp,
  ArrowUpRight,
  RefreshCw,
  Clock,
  DollarSign,
  Wallet,
  LineChart,
  X,
  ArrowRight,
} from "lucide-react"
import { usePriceStore } from "../store/priceStore"
import { useInvestmentStore } from "../store/investmentStore"
import axios from "axios"
import { useNotificationStore } from "../store/notificationStore"

interface AvailablePlansProps {
  onStake: (
    plan: string,
    minStake: number,
    dailyYield: number,
    depositAddress: string,
    currency: string,
  ) => Promise<void>
  actionLoading: string | null
}

// Map API icon names to Lucide React icons
const ICON_MAP: Record<string, React.ElementType> = {
  Shield: Shield,
  TrendingUp: TrendingUp,
  Zap: Zap,
  Star: Star,
  Clock: Clock,
  DollarSign: DollarSign,
  Wallet: Wallet,
  LineChart: LineChart,
}

// Map plan names to highlight text
const HIGHLIGHT_MAP: Record<string, string> = {
  "Core Vault": "Best for new investors",
  "Growth Nexus": "Most popular",
  "Elite Matrix": "Best returns",
  "Legacy Protocol": "Premium tier",
}

// Define features for each plan type
const FEATURES_MAP: Record<string, string[]> = {
  "Core Vault": [
    "Minimum stake: 0.05 ETH",
    "Base yield: 0.5% daily",
    "30-day Unstake Window",
    "Early unstake penalty: 10%",
    "No compounding available",
    "Stake for 60 days & get 0.05% bonus yield monthly (up to 1%)",
    "NEW: Welcome bonus: +0.1% for first 7 days",
    "NEW: Loyalty rewards program",
    "NEW: Free gas fee on first withdrawal",
    "NEW: Stake insurance protection",
    "NEW: Referral bonus multiplier",
    "NEW: Early access to new plans",
  ],
  "Growth Nexus": [
    "Minimum stake: 1 ETH",
    "Base yield: 1.2% daily",
    "45-day Unstake Window",
    "Early unstake penalty: 15%",
    "Compounding available",
    "Stake for 60 days & get 0.05% bonus yield monthly (up to 1.5%)",
    "NEW: Multi-deposit bonus: +0.3% for 3+ deposits",
    "NEW: Weekly yield boost events",
    "NEW: Priority support access",
  ],
  "Elite Matrix": [
    "Minimum stake: 5 ETH",
    "Base yield: 1.5% daily",
    "60-day Unstake Window",
    "Early unstake penalty: 20%",
    "Compounding available",
    "Temporary 2.0% yield boost for 30 days with 2+ deposits",
    "Real-time analytics dashboard access",
    "Priority access to new features",
    "Stake for 60 days & get 0.05% bonus yield monthly (up to 1.8%)",
    "NEW: Flash stake events (+3% for 24 hours)",
    "NEW: Cross-chain bridging fee refund (up to $500)",
    "NEW: Exclusive NFT rewards (1 NFT per 10 ETH staked)",
    "NEW: Weekly performance reports",
    "NEW: VIP Discord access",
    "NEW: Dedicated account manager",
  ],
  "Legacy Protocol": [
    "Minimum stake: 10 ETH",
    "Base yield: 2.0% daily",
    "90-day Unstake Window",
    "Early unstake penalty: 25%",
    "Compounding available",
    "Duration milestone: +0.5% yield after 90 days",
    "Amount milestone: +0.5% yield at 50 ETH staked",
    "Compound milestone: +0.5% yield after 3 restakes",
    "Partial exit option after 60 days (12.5% penalty)",
    "Stake for 60 days & get 0.05% bonus yield monthly (up to 2.5%)",
    "NEW: Diamond hands bonus: +1% after 180 days",
    "NEW: Governance token rewards",
    "NEW: VIP concierge service",
    "NEW: Institutional-grade insurance",
    "NEW: Private OTC desk access",
    "NEW: Exclusive investment opportunities",
  ],
}

export function AvailablePlans({ onStake, actionLoading }: AvailablePlansProps) {
  const { ethPrice } = usePriceStore()
  const { plans, loading, error, fetchPlans } = useInvestmentStore()
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [loadingAddress, setLoadingAddress] = useState(false)
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  const handleStartStaking = (plan: any) => {
    setSelectedPlan(plan)
    setShowCurrencyModal(true)
  }

  const handleCurrencySelect = async (currency: string) => {
    setLoadingAddress(true);
    if (!selectedPlan) return

    try {
      const token = localStorage.getItem("auth-token")
      if (!token) {
        throw new Error("Authentication required")
      }



      // Call the API to generate a deposit address
      const response = await axios.post(
        "https://app.starkord.com/api/investment/stake.php",
        {
          token,
          plan_id: selectedPlan.id,
          currency,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer a7bX9c2dE5fg1h8i",
          },
        },
      )

      if (response.status !== 200) throw new Error("Failed to generate deposit address")

      const data = response.data
      console.log("Deposit address generated:", data)

      // Pass the deposit address and other details to the parent component
      const minStake = Number.parseFloat(selectedPlan.min_amount)
      const dailyYield = Number.parseFloat(selectedPlan.dpy)
      await onStake(selectedPlan.name, minStake, dailyYield, data.deposit_address, currency)
      setLoadingAddress(false);
      // Close the currency modal
      setShowCurrencyModal(false)
      setSelectedPlan(null)
    } catch (error) {
      console.error("Error generating deposit address:", error)
      setLoadingAddress(false);

      // Show error notification
      addNotification({
        type: "error",
        title: "Error",
        message: "Failed to generate deposit address. Please try again.",
        duration: 5000,
      })
      setShowCurrencyModal(false)
    } finally {
      //setActionLoading(null)
      setLoadingAddress(false);

    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/20 text-red-400 p-4 rounded-xl">
        <p>Error loading plans. Please try again later.</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Available Plans</h2>
          <p className="text-slate-400 mt-1">Choose a staking plan that matches your goals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => {
          const isGeneratingAddress = actionLoading === `generating_address_${plan.name}`
          const minStake = Number.parseFloat(plan.min_amount)
          const dailyYield = Number.parseFloat(plan.dpy)
          const minStakeUSD = minStake * ethPrice
          const IconComponent = ICON_MAP[plan.icon] || Shield
          const highlight = HIGHLIGHT_MAP[plan.name] || "Recommended"
          const features = FEATURES_MAP[plan.name] || [
            `Minimum stake: ${minStake} ETH`,
            `Base yield: ${dailyYield}% daily`,
            `${plan.lock_period_days}-day Unstake Window`,
            `Early unstake penalty: ${plan.penalty}%`,
            `${plan.restake === "1" ? "Compounding available" : "No compounding available"}`,
            plan.description_2,
            plan.description_3,
            plan.bonus_note,
          ]

          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-br ${plan.color} rounded-2xl p-8 relative overflow-hidden`}
            >
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl transform -translate-x-24 translate-y-24" />

              {/* Plan Badge */}
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{highlight}</span>
              </div>

              {/* Header */}
              <div className="relative flex items-center space-x-4 mb-6">
                <div className="bg-white/20 p-3 rounded-xl">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-white/80">{plan.description}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="relative grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <span className="text-sm text-white/70">Min Stake</span>
                  <div className="font-bold text-xl">{minStake} ETH</div>
                  <div className="text-sm text-white/70">≈ ${minStakeUSD.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <span className="text-sm text-white/70">Daily Yield</span>
                  <div className="font-bold text-xl">{dailyYield}%</div>
                  <div className="text-sm text-white/70">{(dailyYield * 365).toFixed(2)}% APY</div>
                </div>
              </div>

              {/* Features List */}
              <div className="relative mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <ChevronUp className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartStaking(plan)}
                disabled={isGeneratingAddress}
                className="relative w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingAddress ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating Address...</span>
                  </>
                ) : (
                  <>
                    <span>Start Staking</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </div>
      {/* Currency Selection Modal */}
      {showCurrencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCurrencyModal(false)} />

          <div className="relative bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-md shadow-xl">
            <button
              onClick={() => setShowCurrencyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 text-blue-400 mb-6">
              <Wallet className="w-8 h-8" />
              <h3 className="text-xl font-bold">Select Currency</h3>
            </div>

            <p className="text-slate-300 mb-6">Choose the currency you want to deposit for {selectedPlan?.name}</p>

            <div className="grid gap-4 mb-6">
              <button
                onClick={() => handleCurrencySelect("ETH")}
                disabled={loadingAddress}
                className="flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-3">
                  <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" alt="ETH" className="w-8 h-8" />
                  <div>
                    <p className="font-medium">Ethereum</p>
                    <p className="text-sm text-slate-400">ETH</p>
                  </div>
                </div>
               
                <ArrowRight className="w-5 h-5 text-slate-400" />
          
              </button>

              <button
                onClick={() => handleCurrencySelect("USDTTRC")}
                 disabled={loadingAddress}
                className="flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-3">
                  <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg" alt="USDT" className="w-8 h-8" />
                  <div>
                    <p className="font-medium">Tether (TRC20)</p>
                    <p className="text-sm text-slate-400 -ml-10">USDT</p>
                  </div>
                </div>
               
                <ArrowRight className="w-5 h-5 text-slate-400" />
             
              </button>

              <button
                onClick={() => handleCurrencySelect("BTC")}
              disabled={loadingAddress }
                className="flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-3">
                  <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg" alt="BTC" className="w-8 h-8" />
                  <div>
                    <p className="font-medium">Bitcoin</p>
                    <p className="text-sm text-slate-400">BTC</p>
                  </div>
                </div>
               
                <ArrowRight className="w-5 h-5 text-slate-400" />
             
              </button>
              {loadingAddress && (
              <RefreshCw className="w-5 h-5 text-slate-400 animate-spin mx-auto" />
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

