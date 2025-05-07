"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DollarSign, RefreshCw, TrendingUp } from "lucide-react"

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

  const handleRefresh = () => {
    fetchExchangeRate()
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-600" />
          USD to INR Converter
        </h2>
        <button
          onClick={handleRefresh}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Current Exchange Rate</div>
          {loading && !rate ? (
            <div className="h-8 animate-pulse bg-gray-200 rounded"></div>
          ) : (
            <div className="flex items-center">
              <span className="text-2xl font-bold">1 USD = {rate?.toFixed(2)} INR</span>
              <TrendingUp className="h-5 w-5 ml-2 text-green-600" />
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2">
            {lastUpdated ? `Last updated: ${lastUpdated}` : "Updating..."}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Convert USD to INR</div>
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
            />
          </div>
          <div className="text-xs text-gray-400 mt-2">Enter amount in USD</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Result</div>
          {loading && !rate ? (
            <div className="h-8 animate-pulse bg-gray-200 rounded"></div>
          ) : (
            <div className="text-2xl font-bold">{(amount * (rate || 0)).toFixed(2)} INR</div>
          )}
          <div className="text-xs text-gray-400 mt-2">Approximate value based on current rate</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Note: Exchange rates are for informational purposes only and may vary from actual market rates.</p>
      </div>
    </div>
  )
}
