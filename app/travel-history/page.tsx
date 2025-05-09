import { TravelHistoryCalculator } from "@/components/travel-history-calculator"
import { BackToHome } from "@/components/back-to-home"

export default function TravelHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-6 text-center">I94 / Travel History Check</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Check your travel history and I-94 records to ensure compliance with visa regulations and track your days in the
        United States.
      </p>

      <TravelHistoryCalculator />
    </div>
  )
}
