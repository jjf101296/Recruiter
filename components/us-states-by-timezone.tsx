"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, MapPin, ChevronDown, ChevronUp, Building, Users, Award, Briefcase } from "lucide-react"

export function USStatesByTimezone() {
  const [expandedZones, setExpandedZones] = useState<Record<string, boolean>>({})
  const [selectedState, setSelectedState] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleZone = (zone: string) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }))
  }

  const handleStateClick = (e: React.MouseEvent, state: any) => {
    e.stopPropagation()
    setSelectedState(state)
    setDialogOpen(true)
  }

  // States organized by time zone with additional details
  const statesByTimeZone = {
    "Eastern Time (ET)": [
      {
        name: "New York",
        abbreviation: "NY",
        capital: "Albany",
        population: "19.45 million",
        governor: "Kathy Hochul (Democratic)",
        topCompanies: ["JPMorgan Chase", "IBM", "PepsiCo", "Citigroup", "Pfizer"],
      },
      {
        name: "Florida",
        abbreviation: "FL",
        capital: "Tallahassee",
        population: "21.78 million",
        governor: "Ron DeSantis (Republican)",
        topCompanies: ["Walt Disney World", "Universal Orlando", "Publix", "NextEra Energy", "Carnival Cruise Line"],
      },
      {
        name: "Georgia",
        abbreviation: "GA",
        capital: "Atlanta",
        population: "10.8 million",
        governor: "Brian Kemp (Republican)",
        topCompanies: ["Coca-Cola", "Home Depot", "UPS", "Delta Air Lines", "Southern Company"],
      },
      // More states with details...
      {
        name: "Connecticut",
        abbreviation: "CT",
        capital: "Hartford",
        population: "3.57 million",
        governor: "Ned Lamont (Democratic)",
        topCompanies: ["Aetna", "United Technologies", "Cigna", "The Hartford", "Xerox"],
      },
      {
        name: "Delaware",
        abbreviation: "DE",
        capital: "Dover",
        population: "1 million",
        governor: "John Carney (Democratic)",
        topCompanies: ["DuPont", "AstraZeneca", "Bank of America", "JPMorgan Chase", "Barclays"],
      },
      {
        name: "Maine",
        abbreviation: "ME",
        capital: "Augusta",
        population: "1.36 million",
        governor: "Janet Mills (Democratic)",
        topCompanies: ["L.L. Bean", "WEX Inc.", "IDEXX Laboratories", "Hannaford", "TD Bank"],
      },
      {
        name: "Maryland",
        abbreviation: "MD",
        capital: "Annapolis",
        population: "6.17 million",
        governor: "Wes Moore (Democratic)",
        topCompanies: [
          "Lockheed Martin",
          "Marriott International",
          "T. Rowe Price",
          "McCormick & Company",
          "Under Armour",
        ],
      },
      {
        name: "Massachusetts",
        abbreviation: "MA",
        capital: "Boston",
        population: "6.98 million",
        governor: "Maura Healey (Democratic)",
        topCompanies: ["General Electric", "Liberty Mutual", "Raytheon", "Biogen", "State Street"],
      },
      {
        name: "Michigan",
        abbreviation: "MI",
        capital: "Lansing",
        population: "10.05 million",
        governor: "Gretchen Whitmer (Democratic)",
        topCompanies: ["General Motors", "Ford Motor Company", "Dow Chemical", "Whirlpool", "Kellogg's"],
      },
      {
        name: "New Hampshire",
        abbreviation: "NH",
        capital: "Concord",
        population: "1.38 million",
        governor: "Chris Sununu (Republican)",
        topCompanies: ["Dartmouth-Hitchcock", "BAE Systems", "Timberland", "Hypertherm", "Dyn"],
      },
      {
        name: "New Jersey",
        abbreviation: "NJ",
        capital: "Trenton",
        population: "9.29 million",
        governor: "Phil Murphy (Democratic)",
        topCompanies: ["Johnson & Johnson", "Prudential Financial", "Merck", "Bed Bath & Beyond", "Campbell Soup"],
      },
      {
        name: "North Carolina",
        abbreviation: "NC",
        capital: "Raleigh",
        population: "10.7 million",
        governor: "Roy Cooper (Democratic)",
        topCompanies: ["Bank of America", "Lowe's", "Duke Energy", "Nucor", "Laboratory Corp"],
      },
      {
        name: "Ohio",
        abbreviation: "OH",
        capital: "Columbus",
        population: "11.8 million",
        governor: "Mike DeWine (Republican)",
        topCompanies: ["Procter & Gamble", "Kroger", "Goodyear", "Progressive", "Sherwin-Williams"],
      },
      {
        name: "Pennsylvania",
        abbreviation: "PA",
        capital: "Harrisburg",
        population: "13 million",
        governor: "Josh Shapiro (Democratic)",
        topCompanies: ["Comcast", "AmerisourceBergen", "Rite Aid", "PNC Financial Services", "PPG Industries"],
      },
      {
        name: "Rhode Island",
        abbreviation: "RI",
        capital: "Providence",
        population: "1.1 million",
        governor: "Daniel McKee (Democratic)",
        topCompanies: ["CVS Health", "Textron", "Hasbro", "Citizens Financial Group", "Amica Mutual Insurance"],
      },
      {
        name: "South Carolina",
        abbreviation: "SC",
        capital: "Columbia",
        population: "5.19 million",
        governor: "Henry McMaster (Republican)",
        topCompanies: ["Boeing", "BMW Manufacturing", "Michelin", "Sonoco", "Milliken & Company"],
      },
      {
        name: "Vermont",
        abbreviation: "VT",
        capital: "Montpelier",
        population: "0.64 million",
        governor: "Phil Scott (Republican)",
        topCompanies: [
          "Ben & Jerry's",
          "Green Mountain Coffee",
          "GlobalFoundries",
          "Keurig Dr Pepper",
          "Casella Waste Systems",
        ],
      },
      {
        name: "Virginia",
        abbreviation: "VA",
        capital: "Richmond",
        population: "8.65 million",
        governor: "Glenn Youngkin (Republican)",
        topCompanies: ["Capital One", "Northrop Grumman", "General Dynamics", "Dollar Tree", "CarMax"],
      },
      {
        name: "West Virginia",
        abbreviation: "WV",
        capital: "Charleston",
        population: "1.79 million",
        governor: "Jim Justice (Republican)",
        topCompanies: ["Kroger", "Mylan Pharmaceuticals", "Camcare", "Toyota Motor Manufacturing", "Arch Coal"],
      },
    ],
    "Central Time (CT)": [
      {
        name: "Texas",
        abbreviation: "TX",
        capital: "Austin",
        population: "29.53 million",
        governor: "Greg Abbott (Republican)",
        topCompanies: ["ExxonMobil", "AT&T", "Dell", "Texas Instruments", "Whole Foods Market"],
      },
      {
        name: "Illinois",
        abbreviation: "IL",
        capital: "Springfield",
        population: "12.67 million",
        governor: "J.B. Pritzker (Democratic)",
        topCompanies: ["Boeing", "McDonald's", "Walgreens Boots Alliance", "Caterpillar", "Archer Daniels Midland"],
      },
      // More states with details...
      {
        name: "Alabama",
        abbreviation: "AL",
        capital: "Montgomery",
        population: "5.03 million",
        governor: "Kay Ivey (Republican)",
        topCompanies: ["Regions Financial", "Vulcan Materials", "Protective Life", "BBVA Compass", "Drummond Company"],
      },
      {
        name: "Arkansas",
        abbreviation: "AR",
        capital: "Little Rock",
        population: "3.03 million",
        governor: "Sarah Huckabee Sanders (Republican)",
        topCompanies: ["Walmart", "Tyson Foods", "J.B. Hunt", "Murphy Oil", "Dillard's"],
      },
      {
        name: "Indiana",
        abbreviation: "IN",
        capital: "Indianapolis",
        population: "6.79 million",
        governor: "Eric Holcomb (Republican)",
        topCompanies: ["Eli Lilly", "Anthem", "Cummins", "Steel Dynamics", "Berry Global"],
      },
      {
        name: "Iowa",
        abbreviation: "IA",
        capital: "Des Moines",
        population: "3.19 million",
        governor: "Kim Reynolds (Republican)",
        topCompanies: ["Principal Financial", "Casey's General Stores", "Rockwell Collins", "Hy-Vee", "Vermeer"],
      },
      {
        name: "Kansas",
        abbreviation: "KS",
        capital: "Topeka",
        population: "2.94 million",
        governor: "Laura Kelly (Democratic)",
        topCompanies: ["Sprint", "Garmin", "Koch Industries", "Cargill Meat Solutions", "Seaboard"],
      },
      {
        name: "Kentucky",
        abbreviation: "KY",
        capital: "Frankfort",
        population: "4.51 million",
        governor: "Andy Beshear (Democratic)",
        topCompanies: ["Humana", "Yum! Brands", "Brown-Forman", "Lexmark", "Ashland"],
      },
      {
        name: "Louisiana",
        abbreviation: "LA",
        capital: "Baton Rouge",
        population: "4.65 million",
        governor: "Jeff Landry (Republican)",
        topCompanies: ["Entergy", "CenturyLink", "Shaw Group", "Ochsner Health System", "Raising Cane's"],
      },
      {
        name: "Minnesota",
        abbreviation: "MN",
        capital: "Saint Paul",
        population: "5.71 million",
        governor: "Tim Walz (Democratic)",
        topCompanies: ["UnitedHealth Group", "Target", "Best Buy", "3M", "General Mills"],
      },
      {
        name: "Mississippi",
        abbreviation: "MS",
        capital: "Jackson",
        population: "2.97 million",
        governor: "Tate Reeves (Republican)",
        topCompanies: ["Sanderson Farms", "Ergon", "Yates Construction", "Hancock Whitney", "Southern Farm Bureau"],
      },
      {
        name: "Missouri",
        abbreviation: "MO",
        capital: "Jefferson City",
        population: "6.17 million",
        governor: "Mike Parson (Republican)",
        topCompanies: ["Emerson Electric", "Monsanto", "Express Scripts", "Edward Jones", "O'Reilly Auto Parts"],
      },
      {
        name: "Nebraska",
        abbreviation: "NE",
        capital: "Lincoln",
        population: "1.96 million",
        governor: "Jim Pillen (Republican)",
        topCompanies: ["Berkshire Hathaway", "Union Pacific", "ConAgra", "Peter Kiewit Sons'", "Mutual of Omaha"],
      },
      {
        name: "North Dakota",
        abbreviation: "ND",
        capital: "Bismarck",
        population: "0.78 million",
        governor: "Doug Burgum (Republican)",
        topCompanies: ["MDU Resources", "Scheels", "Bobcat Company", "Basin Electric Power", "Border States Electric"],
      },
      {
        name: "Oklahoma",
        abbreviation: "OK",
        capital: "Oklahoma City",
        population: "4 million",
        governor: "Kevin Stitt (Republican)",
        topCompanies: [
          "Devon Energy",
          "Chesapeake Energy",
          "Continental Resources",
          "Williams Companies",
          "Sonic Drive-In",
        ],
      },
      {
        name: "South Dakota",
        abbreviation: "SD",
        capital: "Pierre",
        population: "0.89 million",
        governor: "Kristi Noem (Republican)",
        topCompanies: ["Sanford Health", "Citibank", "Daktronics", "Black Hills Corporation", "Raven Industries"],
      },
      {
        name: "Tennessee",
        abbreviation: "TN",
        capital: "Nashville",
        population: "6.97 million",
        governor: "Bill Lee (Republican)",
        topCompanies: ["FedEx", "HCA Healthcare", "Dollar General", "AutoZone", "International Paper"],
      },
      {
        name: "Wisconsin",
        abbreviation: "WI",
        capital: "Madison",
        population: "5.89 million",
        governor: "Tony Evers (Democratic)",
        topCompanies: ["Johnson Controls", "Northwestern Mutual", "Kohl's", "Harley-Davidson", "Oshkosh Corporation"],
      },
    ],
    "Mountain Time (MT)": [
      {
        name: "Colorado",
        abbreviation: "CO",
        capital: "Denver",
        population: "5.81 million",
        governor: "Jared Polis (Democratic)",
        topCompanies: ["Arrow Electronics", "DaVita", "Ball Corporation", "Newmont Mining", "Dish Network"],
      },
      {
        name: "Arizona",
        abbreviation: "AZ",
        capital: "Phoenix",
        population: "7.28 million",
        governor: "Katie Hobbs (Democratic)",
        topCompanies: ["Freeport-McMoRan", "Republic Services", "Avnet", "PetSmart", "Sprouts Farmers Market"],
      },
      // More states with details...
      {
        name: "Idaho",
        abbreviation: "ID",
        capital: "Boise",
        population: "1.84 million",
        governor: "Brad Little (Republican)",
        topCompanies: ["Micron Technology", "Albertsons", "Simplot", "WinCo Foods", "Boise Cascade"],
      },
      {
        name: "Montana",
        abbreviation: "MT",
        capital: "Helena",
        population: "1.09 million",
        governor: "Greg Gianforte (Republican)",
        topCompanies: [
          "Glacier Bancorp",
          "Washington Companies",
          "Stillwater Mining",
          "D.A. Davidson",
          "First Interstate BancSystem",
        ],
      },
      {
        name: "Nevada",
        abbreviation: "NV",
        capital: "Carson City",
        population: "3.1 million",
        governor: "Joe Lombardo (Republican)",
        topCompanies: ["Las Vegas Sands", "MGM Resorts", "Caesars Entertainment", "Wynn Resorts", "Switch"],
      },
      {
        name: "New Mexico",
        abbreviation: "NM",
        capital: "Santa Fe",
        population: "2.12 million",
        governor: "Michelle Lujan Grisham (Democratic)",
        topCompanies: [
          "Presbyterian Healthcare Services",
          "Los Alamos National Laboratory",
          "Sandia National Laboratories",
          "Intel",
          "Public Service Company of New Mexico",
        ],
      },
      {
        name: "Utah",
        abbreviation: "UT",
        capital: "Salt Lake City",
        population: "3.27 million",
        governor: "Spencer Cox (Republican)",
        topCompanies: [
          "Zions Bancorporation",
          "Huntsman Corporation",
          "SkyWest Airlines",
          "Merit Medical Systems",
          "Extra Space Storage",
        ],
      },
      {
        name: "Wyoming",
        abbreviation: "WY",
        capital: "Cheyenne",
        population: "0.58 million",
        governor: "Mark Gordon (Republican)",
        topCompanies: [
          "Cloud Peak Energy",
          "Wyoming Machinery Company",
          "Union Wireless",
          "Sierra Trading Post",
          "Taco John's",
        ],
      },
    ],
    "Pacific Time (PT)": [
      {
        name: "California",
        abbreviation: "CA",
        capital: "Sacramento",
        population: "39.51 million",
        governor: "Gavin Newsom (Democratic)",
        topCompanies: ["Apple", "Google", "Facebook", "Wells Fargo", "Chevron"],
      },
      {
        name: "Washington",
        abbreviation: "WA",
        capital: "Olympia",
        population: "7.71 million",
        governor: "Jay Inslee (Democratic)",
        topCompanies: ["Amazon", "Microsoft", "Starbucks", "Costco", "Boeing"],
      },
      {
        name: "Oregon",
        abbreviation: "OR",
        capital: "Salem",
        population: "4.24 million",
        governor: "Tina Kotek (Democratic)",
        topCompanies: ["Nike", "Columbia Sportswear", "Intel", "Precision Castparts", "Lithia Motors"],
      },
    ],
    "Alaska Time (AKT)": [
      {
        name: "Alaska",
        abbreviation: "AK",
        capital: "Juneau",
        population: "0.73 million",
        governor: "Mike Dunleavy (Republican)",
        topCompanies: ["Alaska Air Group", "GCI", "ASRC Energy Services", "Lynden", "Chugach Alaska Corporation"],
      },
    ],
    "Hawaii-Aleutian Time (HAT)": [
      {
        name: "Hawaii",
        abbreviation: "HI",
        capital: "Honolulu",
        population: "1.42 million",
        governor: "Josh Green (Democratic)",
        topCompanies: [
          "Hawaiian Airlines",
          "Bank of Hawaii",
          "Hawaiian Electric Industries",
          "Alexander & Baldwin",
          "Matson",
        ],
      },
    ],
  }

  const timeZoneColors = {
    "Eastern Time (ET)": {
      bg: "bg-blue-600",
      gradient: "from-blue-500 to-blue-700",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
    },
    "Central Time (CT)": {
      bg: "bg-indigo-600",
      gradient: "from-indigo-500 to-indigo-700",
      light: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
    },
    "Mountain Time (MT)": {
      bg: "bg-purple-600",
      gradient: "from-purple-500 to-purple-700",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
    },
    "Pacific Time (PT)": {
      bg: "bg-violet-600",
      gradient: "from-violet-500 to-violet-700",
      light: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
    },
    "Alaska Time (AKT)": {
      bg: "bg-cyan-600",
      gradient: "from-cyan-500 to-cyan-700",
      light: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-700",
    },
    "Hawaii-Aleutian Time (HAT)": {
      bg: "bg-teal-600",
      gradient: "from-teal-500 to-teal-700",
      light: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-700",
    },
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
          const isExpanded = expandedZones[timeZone] || false
          const colors = timeZoneColors[timeZone as keyof typeof timeZoneColors]

          return (
            <Card
              key={timeZone}
              className={`overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer`}
              onClick={() => toggleZone(timeZone)}
            >
              <CardHeader className={`bg-gradient-to-r ${colors.gradient} text-white py-3`}>
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {timeZone}
                  </div>
                  <Badge className="bg-white/20 hover:bg-white/30">
                    {states.length} {states.length === 1 ? "State" : "States"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className={`p-4 ${isExpanded ? `${colors.light} border-t-2 ${colors.border}` : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {isExpanded ? "All States" : "Sample States"}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {(isExpanded ? states : states.slice(0, 5)).map((state) => (
                    <Badge
                      key={state.abbreviation}
                      variant="outline"
                      className={`flex items-center gap-1 ${colors.light} hover:bg-opacity-80 cursor-pointer`}
                      onClick={(e) => handleStateClick(e, state)}
                    >
                      <MapPin className="h-3 w-3 text-slate-500" />
                      <span className="font-medium">{state.abbreviation}</span>
                      <span className="text-xs text-slate-500 hidden sm:inline">- {state.name}</span>
                    </Badge>
                  ))}

                  {!isExpanded && states.length > 5 && (
                    <Badge variant="outline" className="bg-slate-100 text-slate-500">
                      +{states.length - 5} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* State Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedState && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-xl">{selectedState.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {selectedState.abbreviation}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">Capital</h3>
                    <p>{selectedState.capital}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">Population</h3>
                    <p>{selectedState.population}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">Governor</h3>
                    <p>{selectedState.governor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">Top Companies</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {selectedState.topCompanies.map((company: string, index: number) => (
                        <li key={index}>{company}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
