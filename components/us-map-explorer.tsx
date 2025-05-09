"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

export function USMapExplorer() {
  const [activeTimeZone, setActiveTimeZone] = useState<string | null>(null)

  // States organized by time zone
  const statesByTimeZone = {
    "Eastern Time (ET)": [
      { name: "Connecticut", abbreviation: "CT" },
      { name: "Delaware", abbreviation: "DE" },
      { name: "Florida", abbreviation: "FL" },
      { name: "Georgia", abbreviation: "GA" },
      { name: "Maine", abbreviation: "ME" },
      { name: "Maryland", abbreviation: "MD" },
      { name: "Massachusetts", abbreviation: "MA" },
      { name: "Michigan", abbreviation: "MI" },
      { name: "New Hampshire", abbreviation: "NH" },
      { name: "New Jersey", abbreviation: "NJ" },
      { name: "New York", abbreviation: "NY" },
      { name: "North Carolina", abbreviation: "NC" },
      { name: "Ohio", abbreviation: "OH" },
      { name: "Pennsylvania", abbreviation: "PA" },
      { name: "Rhode Island", abbreviation: "RI" },
      { name: "South Carolina", abbreviation: "SC" },
      { name: "Vermont", abbreviation: "VT" },
      { name: "Virginia", abbreviation: "VA" },
      { name: "West Virginia", abbreviation: "WV" },
    ],
    "Central Time (CT)": [
      { name: "Alabama", abbreviation: "AL" },
      { name: "Arkansas", abbreviation: "AR" },
      { name: "Illinois", abbreviation: "IL" },
      { name: "Indiana", abbreviation: "IN" },
      { name: "Iowa", abbreviation: "IA" },
      { name: "Kansas", abbreviation: "KS" },
      { name: "Kentucky", abbreviation: "KY" },
      { name: "Louisiana", abbreviation: "LA" },
      { name: "Minnesota", abbreviation: "MN" },
      { name: "Mississippi", abbreviation: "MS" },
      { name: "Missouri", abbreviation: "MO" },
      { name: "Nebraska", abbreviation: "NE" },
      { name: "North Dakota", abbreviation: "ND" },
      { name: "Oklahoma", abbreviation: "OK" },
      { name: "South Dakota", abbreviation: "SD" },
      { name: "Tennessee", abbreviation: "TN" },
      { name: "Texas", abbreviation: "TX" },
      { name: "Wisconsin", abbreviation: "WI" },
    ],
    "Mountain Time (MT)": [
      { name: "Arizona", abbreviation: "AZ" },
      { name: "Colorado", abbreviation: "CO" },
      { name: "Idaho", abbreviation: "ID" },
      { name: "Montana", abbreviation: "MT" },
      { name: "Nevada", abbreviation: "NV" },
      { name: "New Mexico", abbreviation: "NM" },
      { name: "Utah", abbreviation: "UT" },
      { name: "Wyoming", abbreviation: "WY" },
    ],
    "Pacific Time (PT)": [
      { name: "California", abbreviation: "CA" },
      { name: "Oregon", abbreviation: "OR" },
      { name: "Washington", abbreviation: "WA" },
    ],
    "Alaska Time (AKT)": [{ name: "Alaska", abbreviation: "AK" }],
    "Hawaii-Aleutian Time (HAT)": [{ name: "Hawaii", abbreviation: "HI" }],
  }

  const timeZoneColors = {
    "Eastern Time (ET)": "bg-blue-600",
    "Central Time (CT)": "bg-indigo-600",
    "Mountain Time (MT)": "bg-purple-600",
    "Pacific Time (PT)": "bg-violet-600",
    "Alaska Time (AKT)": "bg-cyan-600",
    "Hawaii-Aleutian Time (HAT)": "bg-teal-600",
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl shadow-md text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">US States by Time Zone</h2>
        <p className="text-white text-opacity-90">
          All 50 US states organized by time zone to help with scheduling and recruitment planning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(statesByTimeZone).map(([timeZone, states]) => {
          const isActive = activeTimeZone === timeZone
          const colorClass = timeZoneColors[timeZone as keyof typeof timeZoneColors] || "bg-blue-600"

          return (
            <Card
              key={timeZone}
              className={`overflow-hidden transition-all duration-300 ${
                isActive ? "ring-2 ring-blue-500 shadow-lg" : "shadow-md"
              }`}
              onClick={() => setActiveTimeZone(isActive ? null : timeZone)}
            >
              <CardHeader className={`${colorClass} text-white py-3`}>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-4 w-4 mr-2" />
                  {timeZone}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {states.map((state) => (
                    <Badge
                      key={state.abbreviation}
                      variant="outline"
                      className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100"
                    >
                      <MapPin className="h-3 w-3 text-slate-500" />
                      <span className="font-medium">{state.abbreviation}</span>
                      <span className="text-xs text-slate-500 hidden sm:inline">- {state.name}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
