"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Building, Flag } from "lucide-react"

export function USMapExplorer() {
  // States organized by time zone
  const statesByTimeZone = {
    "Eastern Time (ET)": [
      {
        name: "New York",
        abbreviation: "NY",
        capital: "Albany",
        population: "19.8 million",
        governor: "Kathy Hochul",
        party: "Democratic",
        illiteracyRate: "2.1%",
        topCompanies: ["JPMorgan Chase", "IBM", "Citigroup", "Goldman Sachs", "Pfizer"],
      },
      {
        name: "Florida",
        abbreviation: "FL",
        capital: "Tallahassee",
        population: "21.5 million",
        governor: "Ron DeSantis",
        party: "Republican",
        illiteracyRate: "2.6%",
        topCompanies: ["Walt Disney", "Publix", "NextEra Energy", "Carnival Cruise", "CSX"],
      },
      {
        name: "Pennsylvania",
        abbreviation: "PA",
        capital: "Harrisburg",
        population: "13.0 million",
        governor: "Josh Shapiro",
        party: "Democratic",
        illiteracyRate: "2.3%",
        topCompanies: ["Comcast", "AmerisourceBergen", "Rite Aid", "PNC Financial", "PPG Industries"],
      },
      {
        name: "Georgia",
        abbreviation: "GA",
        capital: "Atlanta",
        population: "10.7 million",
        governor: "Brian Kemp",
        party: "Republican",
        illiteracyRate: "3.2%",
        topCompanies: ["Coca-Cola", "Home Depot", "UPS", "Delta Air Lines", "Southern Company"],
      },
      {
        name: "North Carolina",
        abbreviation: "NC",
        capital: "Raleigh",
        population: "10.5 million",
        governor: "Roy Cooper",
        party: "Democratic",
        illiteracyRate: "2.8%",
        topCompanies: ["Bank of America", "Lowe's", "Duke Energy", "Nucor", "Laboratory Corp"],
      },
      {
        name: "Virginia",
        abbreviation: "VA",
        capital: "Richmond",
        population: "8.6 million",
        governor: "Glenn Youngkin",
        party: "Republican",
        illiteracyRate: "2.1%",
        topCompanies: ["Capital One", "Northrop Grumman", "General Dynamics", "Dollar Tree", "Dominion Energy"],
      },
      {
        name: "Ohio",
        abbreviation: "OH",
        capital: "Columbus",
        population: "11.7 million",
        governor: "Mike DeWine",
        party: "Republican",
        illiteracyRate: "2.7%",
        topCompanies: ["Procter & Gamble", "Kroger", "Cardinal Health", "Progressive", "Sherwin-Williams"],
      },
      {
        name: "Michigan",
        abbreviation: "MI",
        capital: "Lansing",
        population: "10.0 million",
        governor: "Gretchen Whitmer",
        party: "Democratic",
        illiteracyRate: "2.6%",
        topCompanies: ["Ford Motor", "General Motors", "Dow Chemical", "Whirlpool", "Stryker"],
      },
      {
        name: "Kentucky",
        abbreviation: "KY",
        capital: "Frankfort",
        population: "4.5 million",
        governor: "Andy Beshear",
        party: "Democratic",
        illiteracyRate: "3.4%",
        topCompanies: ["Humana", "Yum! Brands", "Brown-Forman", "Lexmark", "Kindred Healthcare"],
      },
      {
        name: "Indiana",
        abbreviation: "IN",
        capital: "Indianapolis",
        population: "6.8 million",
        governor: "Eric Holcomb",
        party: "Republican",
        illiteracyRate: "2.8%",
        topCompanies: ["Eli Lilly", "Anthem", "Cummins", "Steel Dynamics", "NiSource"],
      },
    ],
    "Central Time (CT)": [
      {
        name: "Texas",
        abbreviation: "TX",
        capital: "Austin",
        population: "29.5 million",
        governor: "Greg Abbott",
        party: "Republican",
        illiteracyRate: "2.9%",
        topCompanies: ["ExxonMobil", "AT&T", "Dell", "Texas Instruments", "Valero Energy"],
      },
      {
        name: "Illinois",
        abbreviation: "IL",
        capital: "Springfield",
        population: "12.7 million",
        governor: "J.B. Pritzker",
        party: "Democratic",
        illiteracyRate: "2.5%",
        topCompanies: ["Boeing", "Abbott Laboratories", "Caterpillar", "McDonald's", "Walgreens"],
      },
      {
        name: "Missouri",
        abbreviation: "MO",
        capital: "Jefferson City",
        population: "6.2 million",
        governor: "Mike Parson",
        party: "Republican",
        illiteracyRate: "3.1%",
        topCompanies: ["Centene", "Emerson Electric", "Monsanto", "Edward Jones", "Enterprise Holdings"],
      },
      {
        name: "Wisconsin",
        abbreviation: "WI",
        capital: "Madison",
        population: "5.8 million",
        governor: "Tony Evers",
        party: "Democratic",
        illiteracyRate: "2.2%",
        topCompanies: ["Northwestern Mutual", "Kohl's", "Harley-Davidson", "Oshkosh", "American Family Insurance"],
      },
      {
        name: "Minnesota",
        abbreviation: "MN",
        capital: "St. Paul",
        population: "5.7 million",
        governor: "Tim Walz",
        party: "Democratic",
        illiteracyRate: "1.9%",
        topCompanies: ["UnitedHealth Group", "Target", "Best Buy", "3M", "General Mills"],
      },
    ],
    "Mountain Time (MT)": [
      {
        name: "Arizona",
        abbreviation: "AZ",
        capital: "Phoenix",
        population: "7.3 million",
        governor: "Katie Hobbs",
        party: "Democratic",
        illiteracyRate: "2.6%",
        topCompanies: ["Freeport-McMoRan", "Republic Services", "Avnet", "PetSmart", "Sprouts Farmers Market"],
      },
      {
        name: "Colorado",
        abbreviation: "CO",
        capital: "Denver",
        population: "5.8 million",
        governor: "Jared Polis",
        party: "Democratic",
        illiteracyRate: "1.7%",
        topCompanies: ["Arrow Electronics", "DaVita", "Ball", "Newmont Mining", "Dish Network"],
      },
      {
        name: "Utah",
        abbreviation: "UT",
        capital: "Salt Lake City",
        population: "3.3 million",
        governor: "Spencer Cox",
        party: "Republican",
        illiteracyRate: "1.5%",
        topCompanies: ["Zions Bancorp", "Huntsman", "SkyWest Airlines", "Extra Space Storage", "Overstock.com"],
      },
      {
        name: "New Mexico",
        abbreviation: "NM",
        capital: "Santa Fe",
        population: "2.1 million",
        governor: "Michelle Lujan Grisham",
        party: "Democratic",
        illiteracyRate: "3.5%",
        topCompanies: [
          "PNM Resources",
          "Presbyterian Healthcare Services",
          "Sandia National Laboratories",
          "Los Alamos National Laboratory",
          "Intel",
        ],
      },
    ],
    "Pacific Time (PT)": [
      {
        name: "California",
        abbreviation: "CA",
        capital: "Sacramento",
        population: "39.5 million",
        governor: "Gavin Newsom",
        party: "Democratic",
        illiteracyRate: "2.1%",
        topCompanies: ["Apple", "Google", "Meta", "Disney", "Wells Fargo"],
      },
      {
        name: "Washington",
        abbreviation: "WA",
        capital: "Olympia",
        population: "7.7 million",
        governor: "Jay Inslee",
        party: "Democratic",
        illiteracyRate: "1.8%",
        topCompanies: ["Amazon", "Microsoft", "Starbucks", "Costco", "Boeing"],
      },
      {
        name: "Oregon",
        abbreviation: "OR",
        capital: "Salem",
        population: "4.2 million",
        governor: "Tina Kotek",
        party: "Democratic",
        illiteracyRate: "2.0%",
        topCompanies: ["Nike", "Columbia Sportswear", "Precision Castparts", "Lithia Motors", "Dutch Bros"],
      },
      {
        name: "Nevada",
        abbreviation: "NV",
        capital: "Carson City",
        population: "3.1 million",
        governor: "Joe Lombardo",
        party: "Republican",
        illiteracyRate: "2.6%",
        topCompanies: ["Las Vegas Sands", "MGM Resorts", "Caesars Entertainment", "Wynn Resorts", "Switch"],
      },
    ],
    "Alaska Time (AKT)": [
      {
        name: "Alaska",
        abbreviation: "AK",
        capital: "Juneau",
        population: "0.7 million",
        governor: "Mike Dunleavy",
        party: "Republican",
        illiteracyRate: "2.2%",
        topCompanies: ["Alaska Air Group", "GCI", "ASRC", "Alyeska Pipeline", "Chugach Alaska"],
      },
    ],
    "Hawaii-Aleutian Time (HAT)": [
      {
        name: "Hawaii",
        abbreviation: "HI",
        capital: "Honolulu",
        population: "1.4 million",
        governor: "Josh Green",
        party: "Democratic",
        illiteracyRate: "1.8%",
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

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 rounded-xl shadow-md text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">US States Information by Time Zone</h2>
        <p className="text-white text-opacity-90">
          Explore comprehensive information about all 50 US states organized by time zone to help with targeted
          recruitment strategies. Each state profile includes population demographics, political landscape, illiteracy
          rates, and top companies.
        </p>
      </div>

      {Object.entries(statesByTimeZone).map(([timeZone, states]) => (
        <div key={timeZone} className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg border-l-4 border-blue-500">
            <Clock className="h-5 w-5 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-800">{timeZone}</h3>
            <Badge className="ml-auto bg-blue-100 text-blue-800 border-blue-200">
              {states.length} {states.length === 1 ? "State" : "States"}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {states.map((state) => (
              <Card
                key={state.abbreviation}
                className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow"
              >
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Flag className="h-5 w-5 text-blue-600 mr-2" />
                      <CardTitle className="text-lg">{state.name}</CardTitle>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                      {state.abbreviation}
                    </Badge>
                  </div>
                  <CardDescription>Capital: {state.capital}</CardDescription>
                </CardHeader>

                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                          Population
                        </h4>
                        <p className="text-sm">{state.population}</p>
                      </div>
                      <div className="text-right">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Governor</h4>
                        <p className="text-sm flex items-center justify-end">
                          {state.governor}
                          <Badge
                            variant="outline"
                            className={`ml-2 ${
                              state.party === "Democratic"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-red-50 text-red-800 border-red-200"
                            }`}
                          >
                            {state.party}
                          </Badge>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Illiteracy Rate
                      </h4>
                      <p className="text-sm">{state.illiteracyRate}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Top Companies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {state.topCompanies.map((company, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                            <Building className="h-3 w-3 mr-1" />
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
