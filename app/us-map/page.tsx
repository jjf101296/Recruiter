import { EnhancedUSMapExplorer } from "@/components/enhanced-us-map-explorer"
import { BackToHome } from "@/components/back-to-home"

export default function USMapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-6 text-center">US Map Explorer</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Explore detailed information about each US state including time zones, major companies, demographics, and more
        to help with recruitment strategies.
      </p>

      <EnhancedUSMapExplorer />
    </div>
  )
}
