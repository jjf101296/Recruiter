"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { RefreshCw, TrendingUp } from "lucide-react"

export function CurrencyConverter() {
  const [rate, setRate] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [amount, setAmount] = useState<number>(1)

  useEffect(() => {
    fetchExchangeRate()

    // Update every hour
    const interval = setInterval(fetchExchangeRate, 3600000)
    return () => clearInterval(interval)
  }, [])

  const fetchExchangeRate = async () => {
    setLoading(true)
    try {
      // In a real implementation, you would use an actual API
      // For demo purposes, we'll simulate an API response with a realistic rate
      // that fluctuates slightly on each refresh

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Current approximate USD to INR rate with small random variation
      const baseRate = 83.5
      const variation = (Math.random() - 0.5) * 0.5 // Random variation of ±0.25
      const simulatedRate = baseRate + variation

      setRate(simulatedRate)
      setLastUpdated(new Date().toLocaleString())
    } catch (error) {
      console.error("Error fetching exchange rate:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setAmount(value)
    } else if (e.target.value === "") {
      setAmount(0)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {loading ? (
            <RefreshCw className="h-3 w-3 mr-1 animate-spin text-blue-500" />
          ) : (
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
          )}
          <span className="text-xs text-slate-500">{rate ? `1 USD = ${rate.toFixed(2)} INR` : "Loading..."}</span>
        </div>
        <button onClick={fetchExchangeRate} className="text-xs text-blue-600 hover:text-blue-800" disabled={loading}>
          Refresh
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-1 text-sm border border-slate-300 rounded"
            min="0"
            step="0.01"
          />
          <div className="text-xs text-slate-400 mt-1">USD</div>
        </div>
        <div className="text-lg font-bold">=</div>
        <div className="flex-1">
          <div className="p-1 text-sm bg-slate-50 border border-slate-200 rounded">
            {(amount * (rate || 0)).toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">INR</div>
        </div>
      </div>
    </div>
  )
}
