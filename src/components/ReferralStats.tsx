"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Award, TrendingUp, CheckCircle2, Copy, AlertCircle, RefreshCw, Loader2, DollarSign } from "lucide-react"
import axios from "axios"

interface ReferralStatsProps {
  referralCode: string
  handleWithdraw: () => void;
  totalReferrals: number
  activeReferrals: number
  referralRewards: number
  ethPrice: number
}

interface Referral {
  name: string
  email: string
  created_at: string
  bonus_amount: string
}

export function ReferralStats({
  referralCode,
  totalReferrals,
  activeReferrals,
  handleWithdraw,
  referralRewards,
  ethPrice,
}: ReferralStatsProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const referralLink = `${window.location.origin}?ref=${referralCode}`

  const fetchReferrals = async (showRefreshing = false) => {
    if (showRefreshing) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    setError(null)

    try {
      // Get token from localStorage - following the pattern in other components
      const token = localStorage.getItem("auth-token")

      if (!token) {
        console.log("No auth token found")
        throw new Error("No auth token found")
      }

      const response = await axios.post(
        "https://app.starkord.com/api/auth/list-referrals.php",
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer a7bX9c2dE5fg1h8i",
          },
        },
      )

      console.log(response)

      if (response.status !== 200) {
        throw new Error("Failed to fetch referrals")
      }

      setReferrals(response.data)
    } catch (error) {
      console.error("Fetch referrals error:", error)
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Failed to fetch referrals")
      } else {
        setError(String(error))
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchReferrals()
  }, [])

  const copyToClipboard = () => {
    setError(null)

    // Create a temporary input element
    const textArea = document.createElement("textarea")
    textArea.value = referralLink

    // Make it invisible
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)

    try {
      textArea.select()
      document.execCommand("copy")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError("Failed to copy link")
      console.error("Failed to copy:", err)
    } finally {
      document.body.removeChild(textArea)
    }
  }

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Mask email for privacy
  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@")
    if (!username || !domain) return email

    const maskedUsername =
      username.length > 2 ? `${username.substring(0, 2)}${"*".repeat(username.length - 2)}` : username

    return `${maskedUsername}@${domain}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Referral Program</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="bg-slate-800/50 px-4 py-2 rounded-lg flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-sm text-slate-400">Your Code:</span>
            <span className="font-mono font-bold">{referralCode}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyToClipboard}
            className={`px-4 py-2 ${
              copied ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-lg flex items-center space-x-2 text-sm transition-colors w-full sm:w-auto justify-center`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="z-50 " />
                <span>Copy Referral Link</span>
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleWithdraw()}
            className="w-full mt-2 bg-green-500 hover:bg-yellow-600 backdrop-blur-sm px-4 py-2 rounded-lg transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Withdraw
          </motion.button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Referrals</p>
              <p className="text-2xl font-bold mt-2">{totalReferrals}</p>
              <p className="text-sm text-purple-400">All-time invites</p>
            </div>
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Active Referrals</p>
              <p className="text-2xl font-bold mt-2">{activeReferrals}</p>
              <p className="text-sm text-green-400">Currently staking</p>
            </div>
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Award className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Referral Rewards</p>
              <p className="text-2xl font-bold mt-2 text-blue-400">{referralRewards.toFixed(4)} ETH</p>
              <p className="text-sm text-blue-500">≈ ${(referralRewards * ethPrice).toLocaleString()}</p>
            </div>
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Referrals</h3>
          <button
            onClick={() => fetchReferrals(true)}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700/50">
                  <th className="pb-3 px-4">User</th>
                  <th className="pb-3 px-4">Joined</th>
                  <th className="pb-3 px-4">Your Rewards</th>
                </tr>
              </thead>
              <tbody>
                {referrals.length > 0 ? (
                  referrals.map((referral, index) => (
                    <tr key={index} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{referral.name}</span>
                          <span className="text-sm text-slate-400">{maskEmail(referral.email)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{formatDate(referral.created_at)}</td>
                      <td className="py-4 px-4">
                        <span className="text-blue-400 font-medium">
                          {Number.parseFloat(referral.bonus_amount).toFixed(4)} ETH
                        </span>
                        <div className="text-xs text-slate-400">
                          ≈ ${(Number.parseFloat(referral.bonus_amount) * ethPrice).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-slate-400 text-sm">
                    <td className="py-4 px-4" colSpan={3}>
                      No referrals yet. Share your referral link to start earning rewards!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

