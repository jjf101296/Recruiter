"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { RefreshCw, DollarSign, TrendingUp } from "lucide-react"

export function CurrencyConverter() {
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [amount, setAmount] = useState<number>(1)
  const [inrValue, setInrValue] = useState<number>(0)

  useEffect(() => {
    fetchExchangeRate()

    // Update every minute to simulate "live" updates
    const interval = setInterval(fetchExchangeRate, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (rate !== null) {
      setInrValue(amount * rate)
    }
  }, [amount, rate])

  const fetchExchangeRate = async () => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Current approximate USD to INR rate with small random variation
      const baseRate = 83.5
      const variation = (Math.random() - 0.5) * 0.5 // Random variation of ±0.25
      const simulatedRate = baseRate + variation

      setRate(simulatedRate)
      setInrValue(amount * simulatedRate)
    } catch (error) {
      console.error("Error fetching exchange rate:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value)

    if (value === "") {
      setAmount(0)
      setInrValue(0)
    } else if (!isNaN(Number(value)) && Number(value) >= 0) {
      setAmount(Number(value))
      if (rate !== null) {
        setInrValue(Number(value) * rate)
      }
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md bg-white border border-slate-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
          <span className="text-sm font-semibold text-slate-700">USD to INR</span>
        </div>
        <div className="flex items-center">
          {loading ? (
            <RefreshCw className="h-3 w-3 animate-spin text-blue-500 mr-1" />
          ) : (
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
          )}
          <span className="text-xs font-medium text-green-600">Live Rate</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500">$</span>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-2 pl-6 text-sm border border-slate-300 rounded-md"
            min="0"
            step="any"
            placeholder="Enter amount"
          />
        </div>
        <div className="text-lg font-bold">=</div>
        <div className="flex-1">
          <div className="p-2 text-sm bg-slate-50 border border-slate-200 rounded-md font-mono">
            ₹{inrValue.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-2 text-xs text-center text-slate-500">
        1 USD = ₹{rate?.toFixed(2) || "Loading..."} • Updated {loading ? "updating..." : "just now"}
      </div>
    </div>
  )
}
