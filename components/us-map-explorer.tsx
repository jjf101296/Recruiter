"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag } from "lucide-react"

export function USMapExplorer() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-teal-800">US States Information</h2>
        <p className="text-slate-600">
          Explore comprehensive information about all 50 US states to help with targeted recruitment strategies. Each
          state profile includes population demographics, political landscape, major industries, and top companies.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StateCard
          name="California"
          abbreviation="CA"
          capital="Sacramento"
          population="39.5 million"
          governor="Gavin Newsom"
          party="Democratic"
          topCompanies={["Apple", "Google", "Meta", "Disney", "Wells Fargo"]}
          timeZones={["Pacific Time (PT)"]}
          demographics="White: 36.5%, Hispanic: 39.4%, Asian: 15.5%, Black: 6.5%, Other: 2.1%"
          majorIndustries={["Technology", "Entertainment", "Agriculture", "Tourism"]}
        />

        <StateCard
          name="Texas"
          abbreviation="TX"
          capital="Austin"
          population="29.5 million"
          governor="Greg Abbott"
          party="Republican"
          topCompanies={["ExxonMobil", "AT&T", "Dell", "Texas Instruments", "Valero Energy"]}
          timeZones={["Central Time (CT)", "Mountain Time (MT) - El Paso"]}
          demographics="White: 41.2%, Hispanic: 39.7%, Black: 12.9%, Asian: 5.2%, Other: 1.0%"
          majorIndustries={["Energy", "Technology", "Healthcare", "Aerospace"]}
        />

        <StateCard
          name="New York"
          abbreviation="NY"
          capital="Albany"
          population="19.8 million"
          governor="Kathy Hochul"
          party="Democratic"
          topCompanies={["JPMorgan Chase", "IBM", "Citigroup", "Goldman Sachs", "Pfizer"]}
          timeZones={["Eastern Time (ET)"]}
          demographics="White: 55.6%, Hispanic: 19.3%, Black: 17.6%, Asian: 9.0%, Other: 1.5%"
          majorIndustries={["Finance", "Healthcare", "Professional Services", "Education"]}
        />

        <StateCard
          name="Florida"
          abbreviation="FL"
          capital="Tallahassee"
          population="21.5 million"
          governor="Ron DeSantis"
          party="Republican"
          topCompanies={["Walt Disney", "Publix", "NextEra Energy", "Carnival Cruise", "CSX"]}
          timeZones={["Eastern Time (ET)", "Central Time (CT) - Panhandle"]}
          demographics="White: 53.2%, Hispanic: 26.4%, Black: 16.9%, Asian: 3.0%, Other: 0.5%"
          majorIndustries={["Tourism", "Agriculture", "Aerospace", "Healthcare"]}
        />

        <StateCard
          name="Illinois"
          abbreviation="IL"
          capital="Springfield"
          population="12.7 million"
          governor="J.B. Pritzker"
          party="Democratic"
          topCompanies={["Boeing", "Abbott Laboratories", "Caterpillar", "McDonald's", "Walgreens"]}
          timeZones={["Central Time (CT)"]}
          demographics="White: 61.0%, Hispanic: 17.5%, Black: 14.6%, Asian: 5.9%, Other: 1.0%"
          majorIndustries={["Manufacturing", "Finance", "Agriculture", "Transportation"]}
        />

        <StateCard
          name="Pennsylvania"
          abbreviation="PA"
          capital="Harrisburg"
          population="13.0 million"
          governor="Josh Shapiro"
          party="Democratic"
          topCompanies={["Comcast", "AmerisourceBergen", "Rite Aid", "PNC Financial", "PPG Industries"]}
          timeZones={["Eastern Time (ET)"]}
          demographics="White: 75.7%, Hispanic: 7.8%, Black: 12.0%, Asian: 3.8%, Other: 0.7%"
          majorIndustries={["Manufacturing", "Healthcare", "Finance", "Agriculture"]}
        />
      </div>
    </div>
  )
}

// State Card Component
function StateCard({
  name,
  abbreviation,
  capital,
  population,
  governor,
  party,
  topCompanies,
  timeZones,
  demographics,
  majorIndustries,
}: {
  name: string
  abbreviation: string
  capital: string
  population: string
  governor: string
  party: string
  topCompanies: string[]
  timeZones: string[]
  demographics: string
  majorIndustries: string[]
}) {
  return (
    <Card className="border-teal-100 shadow-md overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-100 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Flag className="h-5 w-5 text-teal-600 mr-2" />
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 border-teal-200">{abbreviation}</Badge>
        </div>
        <CardDescription>Capital: {capital}</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div>
              <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Population</h4>
              <p className="text-sm">{population}</p>
            </div>
            <div className="text-right">
              <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Governor</h4>
              <p className="text-sm flex items-center justify-end">
                {governor}
                <Badge
                  variant="outline"
                  className={`ml-2 ${party === "Democratic" ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-red-50 text-red-800 border-red-200"}`}
                >
                  {party}
                </Badge>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Time Zones</h4>
            <p className="text-sm">{timeZones.join(", ")}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Demographics</h4>
            <p className="text-sm">{demographics}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Major Industries</h4>
            <div className="flex flex-wrap gap-1">
              {majorIndustries.map((industry, index) => (
                <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Top Companies</h4>
            <p className="text-sm">{topCompanies.join(", ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
