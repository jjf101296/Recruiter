"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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
  capital: string
  largestCity: string
  industries: string[]
  universities: string[]
  culturalInsights: string
}

// Complete US states data
const US_STATES_DATA: Record<string, StateData> = {
  AL: {
    name: "Alabama",
    timeZones: ["Central Time Zone (CT)"],
    topCompanies: ["Regions Financial", "Vulcan Materials", "Encompass Health", "Huntsville Hospital Health System"],
    population: "5.03 million (2023)",
    demographics: "65.3% White, 26.8% Black, 4.6% Hispanic, 1.5% Asian",
    flag: "🏴 Red X on white background",
    party: "Republican",
    governor: "Kay Ivey",
    capital: "Montgomery",
    largestCity: "Birmingham",
    industries: ["Aerospace", "Automotive Manufacturing", "Healthcare", "Education"],
    universities: ["University of Alabama", "Auburn University", "UAB"],
    culturalInsights: "Strong southern hospitality culture, aerospace industry presence, and growing biotech sector",
  },
  AK: {
    name: "Alaska",
    timeZones: ["Alaska Time Zone (AKT)"],
    topCompanies: ["Alaska Air Group", "GCI", "ASRC Energy Services", "Alyeska Pipeline"],
    population: "733,583 (2023)",
    demographics: "65.3% White, 3.7% Black, 7.3% Hispanic, 6.5% Asian, 15.6% Native American/Alaska Native",
    flag: "🏴 Big Dipper and North Star on blue background",
    party: "Republican",
    governor: "Mike Dunleavy",
    capital: "Juneau",
    largestCity: "Anchorage",
    industries: ["Oil & Gas", "Fishing", "Tourism", "Mining"],
    universities: ["University of Alaska Anchorage", "University of Alaska Fairbanks"],
    culturalInsights:
      "Resource-driven economy, outdoor lifestyle, and unique work schedules due to seasonal daylight variations",
  },
  AZ: {
    name: "Arizona",
    timeZones: ["Mountain Time Zone (MT) - Arizona does not observe Daylight Saving Time"],
    topCompanies: ["Intel", "Banner Health", "Amazon", "Raytheon Technologies", "Honeywell"],
    population: "7.4 million (2023)",
    demographics: "54.1% White, 5.2% Black, 31.7% Hispanic, 3.7% Asian, 4.5% Native American",
    flag: "🏴 Copper star and red/yellow rays",
    party: "Democratic",
    governor: "Katie Hobbs",
    capital: "Phoenix",
    largestCity: "Phoenix",
    industries: ["Technology", "Healthcare", "Aerospace", "Tourism", "Manufacturing"],
    universities: ["Arizona State University", "University of Arizona", "Northern Arizona University"],
    culturalInsights: "Growing tech ecosystem, retirement destination, and strong aerospace/defense industry presence",
  },
  // Additional states would be added here in the same format
  CA: {
    name: "California",
    timeZones: ["Pacific Time Zone (PT)"],
    topCompanies: ["Apple", "Google", "Meta", "Disney", "Netflix", "Salesforce", "Chevron"],
    population: "39.24 million (2023)",
    demographics: "36.5% White, 6.5% Black, 39.4% Hispanic, 15.5% Asian",
    flag: "🏴 Bear and star on white background with red stripe",
    party: "Democratic",
    governor: "Gavin Newsom",
    capital: "Sacramento",
    largestCity: "Los Angeles",
    industries: ["Technology", "Entertainment", "Agriculture", "Tourism", "Manufacturing"],
    universities: ["Stanford", "UC Berkeley", "UCLA", "Caltech", "USC"],
    culturalInsights:
      "Innovation-driven culture, diverse workforce, competitive talent market, and high cost of living",
  },
  NY: {
    name: "New York",
    timeZones: ["Eastern Time Zone (ET)"],
    topCompanies: ["JPMorgan Chase", "IBM", "Pfizer", "Goldman Sachs", "Citigroup", "MetLife"],
    population: "19.84 million (2023)",
    demographics: "55.3% White, 17.6% Black, 19.3% Hispanic, 9.0% Asian",
    flag: "🏴 State coat of arms on blue background",
    party: "Democratic",
    governor: "Kathy Hochul",
    capital: "Albany",
    largestCity: "New York City",
    industries: ["Finance", "Healthcare", "Professional Services", "Technology", "Media"],
    universities: ["Columbia", "Cornell", "NYU", "University of Rochester", "SUNY system"],
    culturalInsights: "Global business hub, diverse workforce, and competitive talent market",
  },
  TX: {
    name: "Texas",
    timeZones: ["Central Time Zone (CT)", "Mountain Time Zone (MT) in El Paso area"],
    topCompanies: ["ExxonMobil", "AT&T", "Dell Technologies", "American Airlines", "Texas Instruments"],
    population: "30.03 million (2023)",
    demographics: "41.2% White, 13.4% Black, 39.7% Hispanic, 5.2% Asian",
    flag: "🏴 Single star on blue stripe with red and white stripes",
    party: "Republican",
    governor: "Greg Abbott",
    capital: "Austin",
    largestCity: "Houston",
    industries: ["Energy", "Technology", "Healthcare", "Aerospace", "Manufacturing"],
    universities: ["University of Texas", "Texas A&M", "Rice University", "Baylor"],
    culturalInsights: "Energy industry dominance, growing tech hubs in Austin and Dallas, and diverse population",
  },
  FL: {
    name: "Florida",
    timeZones: ["Eastern Time Zone (ET)", "Central Time Zone (CT) - Panhandle"],
    topCompanies: ["Publix", "NextEra Energy", "Carnival Cruise Line", "Jabil", "Raymond James"],
    population: "22.24 million (2023)",
    demographics: "53.2% White, 16.9% Black, 26.5% Hispanic, 3.0% Asian",
    flag: "🏴 State seal on white background with red X",
    party: "Republican",
    governor: "Ron DeSantis",
    capital: "Tallahassee",
    largestCity: "Jacksonville",
    industries: ["Tourism", "Agriculture", "Aerospace", "Healthcare", "Financial Services"],
    universities: ["University of Florida", "Florida State", "University of Miami", "UCF"],
    culturalInsights: "Tourism-driven economy, retirement destination, and growing tech and finance sectors",
  },
}

export function USStatesMap() {
  const [activeTab, setActiveTab] = useState("map")
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showStateDetails, setShowStateDetails] = useState(false)

  const handleStateClick = (stateCode: string) => {
    setSelectedState(stateCode)
    setShowStateDetails(true)
  }

  const filteredStates = searchTerm
    ? Object.entries(US_STATES_DATA).filter(
        ([code, state]) =>
          state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          code.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : Object.entries(US_STATES_DATA)

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="list">State List</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="pt-4">
          <div className="relative w-full bg-white rounded-lg shadow-md p-4 border border-slate-200">
            <h3 className="text-center text-lg font-medium mb-4">Interactive USA Map</h3>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Click on a state to view detailed information
            </p>

            <div className="relative w-full h-[400px] bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center">
              <p className="text-slate-500">Interactive SVG map would be displayed here</p>
              {/* This would be replaced with an actual SVG map with clickable states */}

              {/* For demonstration, showing a few clickable state buttons */}
              <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-2 p-4">
                {Object.entries(US_STATES_DATA)
                  .slice(0, 10)
                  .map(([stateCode, stateData]) => (
                    <Button
                      key={stateCode}
                      variant="outline"
                      size="sm"
                      onClick={() => handleStateClick(stateCode)}
                      className="h-auto py-2"
                    >
                      {stateCode} - {stateData.name}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>A complete implementation would include an interactive SVG map of all 50 United States.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="pt-4">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Search states..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStates.map(([stateCode, stateData]) => (
              <Card
                key={stateCode}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleStateClick(stateCode)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {stateData.name}
                        <Badge variant="outline" className="ml-2">
                          {stateCode}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{stateData.timeZones[0]}</CardDescription>
                    </div>
                    <div className="text-2xl" title={stateData.flag.split(" ")[1]}>
                      {stateData.flag.split(" ")[0]}
                    </div>
                  </div>
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

      {/* State Details Dialog */}
      <Dialog open={showStateDetails} onOpenChange={setShowStateDetails}>
        <DialogContent className="max-w-3xl">
          {selectedState && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {US_STATES_DATA[selectedState].name}
                  <Badge variant="outline">{selectedState}</Badge>
                  <span className="text-2xl ml-auto" title={US_STATES_DATA[selectedState].flag.split(" ")[1]}>
                    {US_STATES_DATA[selectedState].flag.split(" ")[0]}
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Population</h4>
                    <p>{US_STATES_DATA[selectedState].population}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Time Zone(s)</h4>
                    <p>{US_STATES_DATA[selectedState].timeZones.join(", ")}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Demographics</h4>
                  <p>{US_STATES_DATA[selectedState].demographics}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Capital</h4>
                    <p>{US_STATES_DATA[selectedState].capital}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Largest City</h4>
                    <p>{US_STATES_DATA[selectedState].largestCity}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Political</h4>
                  <p>
                    <Badge variant={US_STATES_DATA[selectedState].party === "Democratic" ? "default" : "destructive"}>
                      {US_STATES_DATA[selectedState].party}
                    </Badge>{" "}
                    Governor: {US_STATES_DATA[selectedState].governor}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Key Industries</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {US_STATES_DATA[selectedState].industries.map((industry, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Top Companies</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {US_STATES_DATA[selectedState].topCompanies.map((company, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Major Universities</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {US_STATES_DATA[selectedState].universities.map((university, i) => (
                      <span key={i} className="bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs">
                        {university}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Cultural Insights</h4>
                  <p>{US_STATES_DATA[selectedState].culturalInsights}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
