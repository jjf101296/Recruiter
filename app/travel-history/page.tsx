"use client"
import { TravelHistoryCalculator } from "@/components/travel-history-calculator"
import { BackToHome } from "@/components/back-to-home"

export default function TravelHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-6 text-center">Travel History Calculator</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Calculate visa eligibility based on travel history to determine compliance with visa regulations.
      </p>

      <TravelHistoryCalculator />
    </div>
  )
}
