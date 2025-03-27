"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle, Download, Search, Loader2 } from "lucide-react"
import axios from "axios"

interface Transaction {
  id: string
  user_id: string
  type: string // "stake" or "unstake"
  status: string
  amount: string
  date: string
}

interface ApiResponse {
  message: string
  transactions: Transaction[]
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("auth-token")
      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await axios.post<ApiResponse>(
        "https://app.starkord.com/api/investment/transactions.php",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer a7bX9c2dE5fg1h8i",
          },
        },
      )

      setTransactions(response.data.transactions || [])
    } catch (error) {
      console.error("Error fetching transactions:", error)

      if (axios.isAxiosError(error) && error.response) {
        // Handle the specific error format from the API
        if (error.response.status === 400 && error.response.data?.message) {
          setError(error.response.data.message)
        } else {
          setError("Failed to load transaction history. Please try again later.")
        }
      } else {
        setError("Failed to load transaction history. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "confirmed":
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case "failed":
      case "rejected":
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
    }
  }

  const getTransactionTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "stake":
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />
      case "unstake":
        return <ArrowUpRight className="w-4 h-4 text-blue-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const getTransactionTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case "stake":
        return <span className="text-green-400">Stake</span>
      case "unstake":
        return <span className="text-blue-400">Unstake</span>
      default:
        return <span className="text-slate-400">{type}</span>
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value)
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toString().includes(searchTerm) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || tx.type.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const handleExport = () => {
    // Create CSV content
    const headers = ["ID", "Type", "Amount", "Status", "Date"]
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map((tx) => [tx.id, tx.type, tx.amount, tx.status, tx.date].join(",")),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `transactions_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const refreshTransactions = () => {
    fetchTransactions()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold">Transaction History</h2>
            <button
              onClick={refreshTransactions}
              className="p-1.5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
              title="Refresh transactions"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 12L12 8M12 8L8 12M12 8V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterType}
              onChange={handleFilterChange}
            >
              <option value="all">All Types</option>
              <option value="stake">Stakes</option>
              <option value="unstake">Unstakes</option>
            </select>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-3 text-slate-300">Loading transactions...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center p-12 text-center">
            <XCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-slate-300 mb-4">{error}</p>
            <button
              onClick={refreshTransactions}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No transactions found</h3>
            <p className="text-slate-400 max-w-md">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Your transaction history will appear here once you make your first stake or unstake."}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-t border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getTransactionTypeIcon(tx.type)}
                      {getTransactionTypeLabel(tx.type)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{tx.amount} ETH</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tx.status)}
                      <span className="capitalize">{tx.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{new Date(tx.date).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 truncate block max-w-[200px]" title={tx.id}>
                      {tx.id}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  )
}

