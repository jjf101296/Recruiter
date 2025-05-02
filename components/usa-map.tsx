"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Define the state data type
interface StateData {
  name: string
  timeZones: string[]
  topCompanies: string[]
  population: string
  demographics: string
  flag: string
  party: string
  governor: string
}

// Sample of state data (abbreviated for brevity)
const statesData: Record<string, StateData> = {
  CA: {
    name: "California",
    timeZones: ["Pacific Time Zone (PT)"],
    topCompanies: ["Apple", "Google", "Meta", "Disney", "Netflix"],
    population: "39.24 million (2023)",
    demographics: "36.5% White, 6.5% Black, 39.4% Hispanic, 15.5% Asian",
    flag: "🏴",
    party: "Democratic",
    governor: "Gavin Newsom",
  },
  TX: {
    name: "Texas",
    timeZones: ["Central Time Zone (CT)", "Mountain Time Zone (MT) - El Paso and Hudspeth counties"],
    topCompanies: ["ExxonMobil", "AT&T", "Dell", "Texas Instruments", "Valero Energy"],
    population: "30.03 million (2023)",
    demographics: "41.2% White, 13.4% Black, 39.7% Hispanic, 5.2% Asian",
    flag: "🏴",
    party: "Republican",
    governor: "Greg Abbott",
  },
  NY: {
    name: "New York",
    timeZones: ["Eastern Time Zone (ET)"],
    topCompanies: ["JPMorgan Chase", "IBM", "Pfizer", "Goldman Sachs", "Citigroup"],
    population: "19.84 million (2023)",
    demographics: "55.3% White, 17.6% Black, 19.3% Hispanic, 9.0% Asian",
    flag: "🏴",
    party: "Democratic",
    governor: "Kathy Hochul",
  },
  FL: {
    name: "Florida",
    timeZones: ["Eastern Time Zone (ET)", "Central Time Zone (CT) - Panhandle"],
    topCompanies: ["Publix", "NextEra Energy", "Carnival Cruise Line"],
    population: "22.24 million (2023)",
    demographics: "53.2% White, 16.9% Black, 26.5% Hispanic, 3.0% Asian",
    flag: "🏴",
    party: "Republican",
    governor: "Ron DeSantis",
  },
  IL: {
    name: "Illinois",
    timeZones: ["Central Time Zone (CT)"],
    topCompanies: ["Boeing", "Abbott Laboratories", "Caterpillar", "McDonald's"],
    population: "12.58 million (2023)",
    demographics: "61.0% White, 14.6% Black, 17.5% Hispanic, 5.9% Asian",
    flag: "🏴",
    party: "Democratic",
    governor: "J.B. Pritzker",
  },
}

export function USAMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("map")

  const handleStateClick = (stateCode: string) => {
    setSelectedState(stateCode)
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="list">State List</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="pt-4">
          <div className="relative w-full h-[400px] bg-white rounded-lg shadow-md p-4 border border-slate-200">
            <h3 className="text-center text-lg font-medium mb-4">Interactive USA Map</h3>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Click on a state to view detailed information
            </p>

            <div className="relative w-full h-[300px]">
              {/* This is a simplified representation - in a real app, you'd use an SVG map */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {Object.entries(statesData).map(([stateCode, stateData]) => (
                  <Dialog key={stateCode}>
                    <DialogTrigger asChild>
                      <button
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-800 border-2 border-blue-300 transition-colors"
                        onClick={() => handleStateClick(stateCode)}
                      >
                        {stateCode}
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                          {stateData.name} <span className="text-lg">{stateData.flag}</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Population</h4>
                            <p>{stateData.population}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Time Zone(s)</h4>
                            <p>{stateData.timeZones.join(", ")}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Demographics</h4>
                          <p>{stateData.demographics}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Political</h4>
                          <p>
                            <Badge variant={stateData.party === "Democratic" ? "default" : "destructive"}>
                              {stateData.party}
                            </Badge>{" "}
                            Governor: {stateData.governor}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Top Companies</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {stateData.topCompanies.map((company, i) => (
                              <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                {company}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>
                  Note: This is a simplified representation. A full implementation would use an SVG map of the United
                  States.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(statesData).map(([stateCode, stateData]) => (
              <Card key={stateCode}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>{stateData.name}</span>
                    <Badge variant="outline">{stateCode}</Badge>
                  </CardTitle>
                  <CardDescription>{stateData.timeZones[0]}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div>
                    <p className="font-medium text-muted-foreground">Population</p>
                    <p>{stateData.population}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Governor</p>
                    <p>
                      {stateData.governor}
                      <Badge variant={stateData.party === "Democratic" ? "default" : "destructive"} className="ml-2">
                        {stateData.party}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Top Companies</p>
                    <p className="truncate">{stateData.topCompanies.slice(0, 3).join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
