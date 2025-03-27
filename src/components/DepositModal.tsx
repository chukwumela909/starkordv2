"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, X, Wallet, CheckCircle2, AlertCircle, RefreshCw, ArrowDownUp } from "lucide-react"
import axios from "axios"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  depositAddress: string
  minAmount: number
  ethPrice: number
  currency: string
}

type SupportedCurrency = {
  symbol: string
  name: string
  network: string
  logo: string
  minDeposit: number
  conversionRate: number
}

// Initial values that will be updated with real-time data
const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "ERC20",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    minDeposit: 0.05,
    conversionRate: 1, // Base currency
  },
  {
    symbol: "USDTTRC",
    name: "Tether USD",
    network: "TRC20",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
    minDeposit: 100,
    conversionRate: 0.00033, // Will be updated with real-time data
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    network: "BTC",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
    minDeposit: 0.001,
    conversionRate: 15.5, // Will be updated with real-time data
  },
]

export function DepositModal({ isOpen, onClose, depositAddress,  ethPrice, currency }: DepositModalProps) {
  const [copied, setCopied] = useState(false)
  const [depositAmount, setDepositAmount] = useState<string>("")
  const [ethEquivalent, setEthEquivalent] = useState<number>(0)
  // const [loading, setLoading] = useState(false)
  const [fetchingRates, setFetchingRates] = useState(false)
  const [currencies, setCurrencies] = useState<SupportedCurrency[]>(SUPPORTED_CURRENCIES)
  const [error, setError] = useState<string | null>(null)

  // Find the currency in the current state of currencies
  const currencyInfo = currencies.find((c) => c.symbol === currency) || currencies[0]

  // Fetch real-time exchange rates when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchExchangeRates()
    }
  }, [isOpen])

  // Update ETH equivalent when deposit amount or currency changes
  useEffect(() => {
    if (depositAmount) {
      const amount = Number.parseFloat(depositAmount)
      if (!isNaN(amount)) {
        setEthEquivalent(amount * currencyInfo.conversionRate)
      }
    } else {
      setEthEquivalent(0)
    }
  }, [depositAmount, currencyInfo])

  // Fetch real-time exchange rates from CoinGecko API
  const fetchExchangeRates = async () => {
    try {
      setFetchingRates(true)
      setError(null)

      // CoinGecko API for getting current prices
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,ethereum&vs_currencies=usd",
      )

      console.log("Exchange rates response:", response.data)

      if (response.data) {
        // Calculate conversion rates relative to ETH
        const ethUsdPrice = response.data.ethereum.usd
        const btcUsdPrice = response.data.bitcoin.usd
        const usdtUsdPrice = response.data.tether.usd

        // BTC to ETH rate = BTC price in USD / ETH price in USD
        const btcToEthRate = btcUsdPrice / ethUsdPrice

        // USDT to ETH rate = USDT price in USD / ETH price in USD
        const usdtToEthRate = usdtUsdPrice / ethUsdPrice

        // Update the currencies with real-time rates
        const updatedCurrencies = currencies.map((currency) => {
          if (currency.symbol === "BTC") {
            return { ...currency, conversionRate: btcToEthRate }
          } else if (currency.symbol === "USDTTRC") {
            return { ...currency, conversionRate: usdtToEthRate }
          }
          return currency
        })

        setCurrencies(updatedCurrencies)
        console.log("Updated currencies with real-time rates:", updatedCurrencies)
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err)
      setError("Failed to fetch current exchange rates. Using estimated values.")
    } finally {
      setFetchingRates(false)
    }
  }

  const copyToClipboard = () => {
    if (depositAddress) {
      navigator.clipboard.writeText(depositAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // const isValidAmount = () => {
  //   const amount = Number.parseFloat(depositAmount)
  //   if (isNaN(amount)) return false
  //   return amount >= currencyInfo.minDeposit && ethEquivalent >= minAmount
  // }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-lg shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 text-blue-400 mb-6">
              <Wallet className="w-8 h-8" />
              <h3 className="text-xl font-bold">Deposit {currencyInfo.name}</h3>
            </div>

            <div className="space-y-6">
              {/* Currency Information */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={currencyInfo.logo || "/placeholder.svg"} alt={currency} className="w-10 h-10" />
                  <div>
                    <p className="font-medium text-lg">{currencyInfo.name}</p>
                    <p className="text-sm text-slate-400">{currencyInfo.network} Network</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Minimum Deposit:</span>
                  <span className="font-medium text-white">
                    {currencyInfo.minDeposit} {currency}
                  </span>
                </div>

                {/* Exchange Rate Status */}
                {fetchingRates ? (
                  <div className="flex items-center justify-center space-x-2 mt-2 text-sm text-blue-400">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Fetching current exchange rates...</span>
                  </div>
                ) : error ? (
                  <div className="text-sm text-amber-400 mt-2">{error}</div>
                ) : (
                  <div className="flex items-center justify-between text-sm text-slate-400 mt-2">
                    <span>Current Rate:</span>
                    <span className="font-medium text-white">
                      1 {currency} = {currencyInfo.conversionRate.toFixed(6)} ETH
                    </span>
                  </div>
                )}

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium mb-2 mt-2">Amount to Deposit</label>
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="number"
                          className="w-full bg-transparent text-lg font-bold focus:outline-none"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder={`Min: ${currencyInfo.minDeposit} ${currency}`}
                        />
                        <div className="text-sm text-slate-400">
                          ≈ $
                          {(
                            (Number.parseFloat(depositAmount || "0") * ethPrice) /
                            currencyInfo.conversionRate
                          ).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400">
                        <img src={currencyInfo.logo || "/placeholder.svg"} alt={currency} className="w-5 h-5" />
                        <span>{currency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion Preview */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mt-2 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">You'll Receive</span>
                    <ArrowDownUp className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">{ethEquivalent.toFixed(6)} ETH</div>
                      <div className="text-sm text-slate-400">≈ ${(ethEquivalent * ethPrice).toLocaleString()}</div>
                    </div>
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" alt="ETH" className="w-6 h-6" />
                  </div>
                </div>

                {/* Deposit Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {currency} Deposit Address ({currencyInfo.network})
                  </label>
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 break-all font-mono">
                    {depositAddress || "Generating address..."}
                  </div>
                </div>

                <button
                  onClick={copyToClipboard}
                  disabled={!depositAddress}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed my-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Copied!</span>
                    </>
                  ) : !depositAddress ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating Address...</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-2">
                  <div className="flex items-center space-x-2 text-sm text-blue-400">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Important</p>
                      <ul className="mt-1 space-y-1 text-slate-300">
                        <li>
                          • Send only {currency} ({currencyInfo.network}) to this address
                        </li>
                        <li>
                          • Minimum deposit: {currencyInfo.minDeposit} {currency}
                        </li>
                        <li>• Your deposit will be automatically converted to ETH</li>
                        <li>• Deposits will be credited after network confirmation (5-10 minutes)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

