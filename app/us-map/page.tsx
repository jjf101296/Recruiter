import { USStatesByTimezone } from "@/components/us-states-by-timezone"
import { BackToHome } from "@/components/back-to-home"

export default function USMapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-6 text-center">US Map</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Explore US states organized by time zone to help with scheduling and recruitment planning.
      </p>

      <USStatesByTimezone />
    </div>
  )
}
