"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Building, Users, Clock, BriefcaseBusiness, ArrowLeft } from "lucide-react"
import Link from "next/link"

// State data structure
interface StateData {
  name: string
  abbreviation: string
  capital: string
  timeZone: string
  flagUrl: string
  governor: string
  party: "Democratic" | "Republican" | "Independent"
  population: string
  demographics: string
  majorIndustries: string[]
  topCompanies: string[]
  recruitingInfo?: {
    talentPool: string
    keyIndustries: string[]
    avgSalary: string
    jobGrowth: string
    recruitingChallenges: string[]
  }
}

// All 50 US states with detailed data
const US_STATES_DATA: Record<string, StateData> = {
  AL: {
    name: "Alabama",
    abbreviation: "AL",
    capital: "Montgomery",
    timeZone: "Central Time Zone (CT)",
    flagUrl: "/flags/alabama.png",
    governor: "Kay Ivey",
    party: "Republican",
    population: "5.1 million",
    demographics: "White: 65.3%, Black: 26.8%, Hispanic: 4.6%, Asian: 1.5%, Other: 1.8%",
    majorIndustries: ["Aerospace", "Automotive", "Healthcare", "Education", "Manufacturing"],
    topCompanies: ["Regions Financial", "Vulcan Materials", "Encompass Health"],
    recruitingInfo: {
      talentPool: "Strong engineering talent from universities like Auburn and Alabama",
      keyIndustries: ["Manufacturing", "Aerospace", "Automotive"],
      avgSalary: "$45,000 - $85,000",
      jobGrowth: "Moderate (3.2% annual)",
      recruitingChallenges: ["Competitive manufacturing sector", "Need for specialized engineering skills"],
    },
  },
  AK: {
    name: "Alaska",
    abbreviation: "AK",
    capital: "Juneau",
    timeZone: "Alaska Time Zone (AKT)",
    flagUrl: "/flags/alaska.png",
    governor: "Mike Dunleavy",
    party: "Republican",
    population: "730,000",
    demographics: "White: 60.2%, Native American/Alaska Native: 15.6%, Asian: 6.5%, Hispanic: 7.3%, Other: 10.4%",
    majorIndustries: ["Oil & Gas", "Fishing", "Tourism", "Mining", "Forestry"],
    topCompanies: ["Alaska Air Group", "GCI", "ASRC Energy Services"],
    recruitingInfo: {
      talentPool: "Specialized in resource extraction and environmental sciences",
      keyIndustries: ["Energy", "Natural Resources", "Transportation"],
      avgSalary: "$58,000 - $98,000",
      jobGrowth: "Slow (1.5% annual)",
      recruitingChallenges: ["Remote location", "Seasonal workforce", "High cost of living"],
    },
  },
  AZ: {
    name: "Arizona",
    abbreviation: "AZ",
    capital: "Phoenix",
    timeZone: "Mountain Time Zone (MT)",
    flagUrl: "/flags/arizona.png",
    governor: "Katie Hobbs",
    party: "Democratic",
    population: "7.4 million",
    demographics: "White: 54.1%, Hispanic: 31.7%, Black: 5.2%, Native American: 4.6%, Asian: 3.7%, Other: 0.7%",
    majorIndustries: ["Technology", "Aerospace & Defense", "Manufacturing", "Tourism", "Healthcare"],
    topCompanies: ["Intel", "Banner Health", "Amazon", "Raytheon Technologies"],
    recruitingInfo: {
      talentPool: "Growing tech hub with strong universities like ASU",
      keyIndustries: ["Tech", "Healthcare", "Aerospace"],
      avgSalary: "$52,000 - $115,000",
      jobGrowth: "Strong (4.8% annual)",
      recruitingChallenges: ["Competitive tech market", "Seasonal population fluctuations"],
    },
  },
  // Additional states would be defined similarly
}

export function EnhancedUSMapExplorer() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [showStateDetailsDialog, setShowStateDetailsDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("map")
  const [stateDetailsView, setStateDetailsView] = useState<"general" | "recruiting" | "demographics">("general")

  // Sample state positions on map (simplified for this example)
  // In a real implementation, you would use actual coordinates or an SVG map with defined areas
  const statePositions: Record<string, { top: string; left: string }> = {
    AL: { top: "65%", left: "70%" },
    AK: { top: "85%", left: "20%" },
    AZ: { top: "60%", left: "20%" },
    // Other state positions would be defined
  }

  const filteredStates = Object.entries(US_STATES_DATA).filter(([code, data]) => {
    if (!searchTerm) return true
    return (
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.majorIndustries.some((industry) => industry.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  const handleStateClick = (stateCode: string) => {
    setSelectedState(stateCode)
    setShowStateDetailsDialog(true)
  }

  const handleCloseStateDetailsDialog = () => {
    setShowStateDetailsDialog(false)
    setStateDetailsView("general")
  }

  const getPartyColor = (party: "Democratic" | "Republican" | "Independent") => {
    switch (party) {
      case "Democratic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Republican":
        return "bg-red-100 text-red-800 border-red-200"
      case "Independent":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
        US States Explorer
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search states, industries, or regions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-0">
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8">
              <div className="relative aspect-video bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                {/* Placeholder for the actual SVG map */}
                <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                  <p className="text-blue-400">Interactive US Map (SVG would be here)</p>
                </div>

                {/* Sample state buttons on the map */}
                {Object.entries(statePositions).map(([code, position]) => (
                  <Button
                    key={code}
                    variant="outline"
                    size="sm"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 border-blue-200 hover:bg-blue-50 p-1 h-auto"
                    style={{
                      top: position.top,
                      left: position.left,
                    }}
                    onClick={() => handleStateClick(code)}
                  >
                    {code}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-4">
                Click on a state to view detailed information including demographics, industries, and recruiting
                insights.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStates.map(([code, state]) => (
                <Card
                  key={code}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleStateClick(code)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center">
                        <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                        {state.name}
                      </CardTitle>
                      <Badge variant="outline">{code}</Badge>
                    </div>
                    <CardDescription>Capital: {state.capital}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-1" />
                        <span>{state.timeZone}</span>
                      </div>
                      <Badge className={getPartyColor(state.party)}>{state.party}</Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-slate-500 mb-1">Major Industries</p>
                      <div className="flex flex-wrap gap-1">
                        {state.majorIndustries.slice(0, 3).map((industry, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                        {state.majorIndustries.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{state.majorIndustries.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStates.length === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-500">No states match your search criteria.</p>
                <Button variant="outline" className="mt-2" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* State Details Dialog */}
      {selectedState && (
        <Dialog open={showStateDetailsDialog} onOpenChange={handleCloseStateDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center text-2xl">
                <span className="mr-2">{US_STATES_DATA[selectedState].name}</span>
                <Badge className="text-sm">{selectedState}</Badge>
              </DialogTitle>
              <DialogDescription>Comprehensive state information for recruiters</DialogDescription>
            </DialogHeader>

            <div className="flex gap-4 border-b pb-2 mb-4">
              <Button
                variant={stateDetailsView === "general" ? "default" : "outline"}
                onClick={() => setStateDetailsView("general")}
                size="sm"
              >
                General Info
              </Button>
              <Button
                variant={stateDetailsView === "recruiting" ? "default" : "outline"}
                onClick={() => setStateDetailsView("recruiting")}
                size="sm"
              >
                Recruiting Insights
              </Button>
              <Button
                variant={stateDetailsView === "demographics" ? "default" : "outline"}
                onClick={() => setStateDetailsView("demographics")}
                size="sm"
              >
                Demographics
              </Button>
            </div>

            {/* General Information View */}
            {stateDetailsView === "general" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video bg-slate-100 rounded-md overflow-hidden mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-slate-400">State Flag Image</p>
                      <p className="text-xs text-slate-500">({US_STATES_DATA[selectedState].flagUrl})</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500">Capital</h3>
                      <p>{US_STATES_DATA[selectedState].capital}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-slate-500">Time Zone</h3>
                      <p>{US_STATES_DATA[selectedState].timeZone}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-slate-500">Governor</h3>
                      <div className="flex items-center">
                        <p>{US_STATES_DATA[selectedState].governor}</p>
                        <Badge className={`ml-2 ${getPartyColor(US_STATES_DATA[selectedState].party)}`}>
                          {US_STATES_DATA[selectedState].party}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Population & Demographics
                    </h3>
                    <p className="font-medium mb-1">{US_STATES_DATA[selectedState].population}</p>
                    <p className="text-sm">{US_STATES_DATA[selectedState].demographics}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 flex items-center">
                      <BriefcaseBusiness className="h-4 w-4 mr-1" /> Major Industries
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {US_STATES_DATA[selectedState].majorIndustries.map((industry, i) => (
                        <Badge key={i} className="bg-blue-50 text-blue-700 border-blue-200">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 flex items-center">
                      <Building className="h-4 w-4 mr-1" /> Top Companies
                    </h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {US_STATES_DATA[selectedState].topCompanies.map((company, i) => (
                        <li key={i} className="text-sm">
                          {company}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Recruiting Insights View */}
            {stateDetailsView === "recruiting" && US_STATES_DATA[selectedState].recruitingInfo && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h3 className="text-blue-800 font-medium mb-2">Talent Pool</h3>
                    <p>{US_STATES_DATA[selectedState].recruitingInfo?.talentPool}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <h3 className="text-green-800 font-medium mb-2">Salary Range</h3>
                    <p className="text-lg font-bold">{US_STATES_DATA[selectedState].recruitingInfo?.avgSalary}</p>
                    <p className="text-sm">Job Growth: {US_STATES_DATA[selectedState].recruitingInfo?.jobGrowth}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Key Industries for Recruitment</h3>
                  <div className="flex flex-wrap gap-2">
                    {US_STATES_DATA[selectedState].recruitingInfo?.keyIndustries.map((industry, i) => (
                      <Badge key={i} className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recruiting Challenges</h3>
                  <ul className="space-y-2">
                    {US_STATES_DATA[selectedState].recruitingInfo?.recruitingChallenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          !
                        </span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                  <h3 className="font-medium mb-2">Recruiting Tips</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Highlight remote work options if applicable</li>
                    <li>Emphasize career growth opportunities</li>
                    <li>Showcase company culture and benefits</li>
                    <li>Leverage local university partnerships</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Demographics View */}
            {stateDetailsView === "demographics" && (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-md border">
                  <h3 className="font-medium mb-3">Population Breakdown</h3>
                  <div className="text-sm">
                    {US_STATES_DATA[selectedState].demographics.split(", ").map((demo, i) => {
                      const [group, percentage] = demo.split(": ")
                      const numericPercentage = Number.parseFloat(percentage.replace("%", ""))

                      return (
                        <div key={i} className="mb-2">
                          <div className="flex justify-between mb-1">
                            <span>{group}</span>
                            <span className="font-medium">{percentage}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${numericPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md border">
                    <h3 className="font-medium mb-2">Education</h3>
                    <p className="text-sm mb-3">Major educational institutions and workforce statistics</p>
                    <p className="text-sm text-slate-500">Detailed education data would be displayed here.</p>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <h3 className="font-medium mb-2">Cost of Living</h3>
                    <p className="text-sm mb-3">Housing, transportation, and lifestyle costs</p>
                    <p className="text-sm text-slate-500">Detailed cost of living data would be displayed here.</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md border">
                  <h3 className="font-medium mb-2">Transportation & Connectivity</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Major airports and transportation hubs</li>
                    <li>Public transit information</li>
                    <li>Internet connectivity statistics</li>
                    <li>Remote work infrastructure</li>
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
