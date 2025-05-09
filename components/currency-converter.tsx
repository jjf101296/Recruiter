"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { RefreshCw, DollarSign } from "lucide-react"

export function CurrencyConverter() {
  const [rate, setRate] = useState<number | null>(null)
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
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Current approximate USD to INR rate with small random variation
      const baseRate = 83.5
      const variation = (Math.random() - 0.5) * 0.5 // Random variation of ±0.25
      const simulatedRate = baseRate + variation

      setRate(simulatedRate)
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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <DollarSign className="h-3 w-3 text-blue-600 mr-1" />
          <span className="text-xs font-semibold text-slate-700">USD to INR</span>
        </div>
        {loading ? (
          <RefreshCw className="h-3 w-3 animate-spin text-blue-500" />
        ) : (
          <span className="text-xs text-green-600 font-medium">{rate ? `1 = ₹${rate.toFixed(2)}` : ""}</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <div className="flex-1">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-1 text-xs border border-slate-300 rounded"
            min="0"
            step="0.01"
          />
        </div>
        <div className="text-sm font-bold">=</div>
        <div className="flex-1">
          <div className="p-1 text-xs bg-slate-50 border border-slate-200 rounded font-mono">
            ₹{(amount * (rate || 0)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
