"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Building } from "lucide-react"

export function USMapExplorer() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTimeForZone = (date: Date, offset: number) => {
    // Create a date object with the UTC time
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

    // Add the timezone offset (in hours)
    const targetDate = new Date(utcDate.getTime() + offset * 3600000)

    // Handle half-hour offsets
    if (offset % 1 !== 0) {
      const minutes = (offset % 1) * 60
      targetDate.setMinutes(targetDate.getMinutes() + minutes)
    }

    // Format the time
    return targetDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  // States organized by time zone
  const statesByTimeZone = {
    "Eastern Time (ET)": {
      offset: -5,
      states: [
        {
          name: "Connecticut",
          abbreviation: "CT",
          capital: "Hartford",
          governor: "Ned Lamont",
          party: "Democratic",
          illiteracyRate: "1.9%",
          topCompanies: ["Aetna", "United Technologies", "Cigna", "The Hartford", "Xerox"],
        },
        {
          name: "Delaware",
          abbreviation: "DE",
          capital: "Dover",
          governor: "John Carney",
          party: "Democratic",
          illiteracyRate: "2.1%",
          topCompanies: ["DuPont", "ChristianaCare", "Bank of America", "JPMorgan Chase", "Barclays"],
        },
        {
          name: "Florida",
          abbreviation: "FL",
          capital: "Tallahassee",
          governor: "Ron DeSantis",
          party: "Republican",
          illiteracyRate: "2.6%",
          topCompanies: ["Walt Disney", "Publix", "NextEra Energy", "Carnival Cruise", "CSX"],
        },
        {
          name: "Georgia",
          abbreviation: "GA",
          capital: "Atlanta",
          governor: "Brian Kemp",
          party: "Republican",
          illiteracyRate: "3.2%",
          topCompanies: ["Coca-Cola", "Home Depot", "UPS", "Delta Air Lines", "Southern Company"],
        },
        {
          name: "Maine",
          abbreviation: "ME",
          capital: "Augusta",
          governor: "Janet Mills",
          party: "Democratic",
          illiteracyRate: "2.0%",
          topCompanies: ["L.L. Bean", "IDEXX Laboratories", "WEX", "Hannaford", "Jackson Laboratory"],
        },
        {
          name: "Maryland",
          abbreviation: "MD",
          capital: "Annapolis",
          governor: "Wes Moore",
          party: "Democratic",
          illiteracyRate: "2.1%",
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
          governor: "Maura Healey",
          party: "Democratic",
          illiteracyRate: "1.7%",
          topCompanies: ["General Electric", "Raytheon", "Biogen", "State Street", "TJX Companies"],
        },
        {
          name: "Michigan",
          abbreviation: "MI",
          capital: "Lansing",
          governor: "Gretchen Whitmer",
          party: "Democratic",
          illiteracyRate: "2.6%",
          topCompanies: ["Ford Motor", "General Motors", "Dow Chemical", "Whirlpool", "Stryker"],
        },
        {
          name: "New Hampshire",
          abbreviation: "NH",
          capital: "Concord",
          governor: "Chris Sununu",
          party: "Republican",
          illiteracyRate: "1.8%",
          topCompanies: ["Dartmouth-Hitchcock", "BAE Systems", "Hypertherm", "Timberland", "C&S Wholesale Grocers"],
        },
        {
          name: "New Jersey",
          abbreviation: "NJ",
          capital: "Trenton",
          governor: "Phil Murphy",
          party: "Democratic",
          illiteracyRate: "2.0%",
          topCompanies: ["Johnson & Johnson", "Prudential Financial", "Merck", "Bed Bath & Beyond", "Campbell Soup"],
        },
        {
          name: "New York",
          abbreviation: "NY",
          capital: "Albany",
          governor: "Kathy Hochul",
          party: "Democratic",
          illiteracyRate: "2.1%",
          topCompanies: ["JPMorgan Chase", "IBM", "Citigroup", "Goldman Sachs", "Pfizer"],
        },
        {
          name: "North Carolina",
          abbreviation: "NC",
          capital: "Raleigh",
          governor: "Roy Cooper",
          party: "Democratic",
          illiteracyRate: "2.8%",
          topCompanies: ["Bank of America", "Lowe's", "Duke Energy", "Nucor", "Laboratory Corp"],
        },
        {
          name: "Ohio",
          abbreviation: "OH",
          capital: "Columbus",
          governor: "Mike DeWine",
          party: "Republican",
          illiteracyRate: "2.7%",
          topCompanies: ["Procter & Gamble", "Kroger", "Cardinal Health", "Progressive", "Sherwin-Williams"],
        },
        {
          name: "Pennsylvania",
          abbreviation: "PA",
          capital: "Harrisburg",
          governor: "Josh Shapiro",
          party: "Democratic",
          illiteracyRate: "2.3%",
          topCompanies: ["Comcast", "AmerisourceBergen", "Rite Aid", "PNC Financial", "PPG Industries"],
        },
        {
          name: "Rhode Island",
          abbreviation: "RI",
          capital: "Providence",
          governor: "Daniel McKee",
          party: "Democratic",
          illiteracyRate: "2.0%",
          topCompanies: ["CVS Health", "Textron", "Hasbro", "Citizens Financial Group", "Amica Mutual Insurance"],
        },
        {
          name: "South Carolina",
          abbreviation: "SC",
          capital: "Columbia",
          governor: "Henry McMaster",
          party: "Republican",
          illiteracyRate: "3.0%",
          topCompanies: ["Boeing", "BMW Manufacturing", "Michelin", "Sonoco Products", "SCANA"],
        },
        {
          name: "Vermont",
          abbreviation: "VT",
          capital: "Montpelier",
          governor: "Phil Scott",
          party: "Republican",
          illiteracyRate: "1.6%",
          topCompanies: [
            "Ben & Jerry's",
            "Green Mountain Coffee",
            "National Life Group",
            "Casella Waste Systems",
            "Keurig Dr Pepper",
          ],
        },
        {
          name: "Virginia",
          abbreviation: "VA",
          capital: "Richmond",
          governor: "Glenn Youngkin",
          party: "Republican",
          illiteracyRate: "2.1%",
          topCompanies: ["Capital One", "Northrop Grumman", "General Dynamics", "Dollar Tree", "Dominion Energy"],
        },
        {
          name: "West Virginia",
          abbreviation: "WV",
          capital: "Charleston",
          governor: "Jim Justice",
          party: "Republican",
          illiteracyRate: "3.6%",
          topCompanies: [
            "Kroger",
            "Mylan Pharmaceuticals",
            "Camcare",
            "Toyota Motor Manufacturing",
            "Wheeling-Nisshin",
          ],
        },
        {
          name: "Wisconsin",
          abbreviation: "WI",
          capital: "Madison",
          governor: "Tony Evers",
          party: "Democratic",
          illiteracyRate: "2.2%",
          topCompanies: ["Northwestern Mutual", "Kohl's", "Harley-Davidson", "Oshkosh", "American Family Insurance"],
        },
      ],
    },
    "Central Time (CT)": {
      offset: -6,
      states: [
        {
          name: "Alabama",
          abbreviation: "AL",
          capital: "Montgomery",
          governor: "Kay Ivey",
          party: "Republican",
          illiteracyRate: "3.6%",
          topCompanies: [
            "Regions Financial",
            "Vulcan Materials",
            "Protective Life",
            "BBVA Compass",
            "Drummond Company",
          ],
        },
        {
          name: "Arkansas",
          abbreviation: "AR",
          capital: "Little Rock",
          governor: "Sarah Huckabee Sanders",
          party: "Republican",
          illiteracyRate: "3.5%",
          topCompanies: ["Walmart", "Tyson Foods", "J.B. Hunt Transport", "Murphy Oil", "Dillard's"],
        },
        {
          name: "Illinois",
          abbreviation: "IL",
          capital: "Springfield",
          governor: "J.B. Pritzker",
          party: "Democratic",
          illiteracyRate: "2.5%",
          topCompanies: ["Boeing", "Abbott Laboratories", "Caterpillar", "McDonald's", "Walgreens"],
        },
        {
          name: "Iowa",
          abbreviation: "IA",
          capital: "Des Moines",
          governor: "Kim Reynolds",
          party: "Republican",
          illiteracyRate: "2.1%",
          topCompanies: ["Principal Financial", "Casey's General Stores", "Rockwell Collins", "Hy-Vee", "Vermeer"],
        },
        {
          name: "Kansas",
          abbreviation: "KS",
          capital: "Topeka",
          governor: "Laura Kelly",
          party: "Democratic",
          illiteracyRate: "2.4%",
          topCompanies: ["Sprint", "Garmin", "Koch Industries", "Cerner", "Spirit AeroSystems"],
        },
        {
          name: "Kentucky",
          abbreviation: "KY",
          capital: "Frankfort",
          governor: "Andy Beshear",
          party: "Democratic",
          illiteracyRate: "3.4%",
          topCompanies: ["Humana", "Yum! Brands", "Brown-Forman", "Lexmark", "Kindred Healthcare"],
        },
        {
          name: "Louisiana",
          abbreviation: "LA",
          capital: "Baton Rouge",
          governor: "Jeff Landry",
          party: "Republican",
          illiteracyRate: "3.8%",
          topCompanies: ["Entergy", "CenturyLink", "Shaw Group", "Ochsner Health System", "Raising Cane's"],
        },
        {
          name: "Minnesota",
          abbreviation: "MN",
          capital: "St. Paul",
          governor: "Tim Walz",
          party: "Democratic",
          illiteracyRate: "1.9%",
          topCompanies: ["UnitedHealth Group", "Target", "Best Buy", "3M", "General Mills"],
        },
        {
          name: "Mississippi",
          abbreviation: "MS",
          capital: "Jackson",
          governor: "Tate Reeves",
          party: "Republican",
          illiteracyRate: "4.0%",
          topCompanies: ["Sanderson Farms", "Ergon", "Yates Construction", "Hancock Whitney", "Southern Farm Bureau"],
        },
        {
          name: "Missouri",
          abbreviation: "MO",
          capital: "Jefferson City",
          governor: "Mike Parson",
          party: "Republican",
          illiteracyRate: "3.1%",
          topCompanies: ["Centene", "Emerson Electric", "Monsanto", "Edward Jones", "Enterprise Holdings"],
        },
        {
          name: "Nebraska",
          abbreviation: "NE",
          capital: "Lincoln",
          governor: "Jim Pillen",
          party: "Republican",
          illiteracyRate: "2.2%",
          topCompanies: [
            "Berkshire Hathaway",
            "Union Pacific",
            "ConAgra Foods",
            "Peter Kiewit Sons'",
            "Mutual of Omaha",
          ],
        },
        {
          name: "North Dakota",
          abbreviation: "ND",
          capital: "Bismarck",
          governor: "Doug Burgum",
          party: "Republican",
          illiteracyRate: "2.0%",
          topCompanies: [
            "MDU Resources",
            "Scheels",
            "Bobcat Company",
            "Nodak Mutual Insurance",
            "Border States Electric",
          ],
        },
        {
          name: "Oklahoma",
          abbreviation: "OK",
          capital: "Oklahoma City",
          governor: "Kevin Stitt",
          party: "Republican",
          illiteracyRate: "3.0%",
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
          governor: "Kristi Noem",
          party: "Republican",
          illiteracyRate: "2.4%",
          topCompanies: ["Sanford Health", "Citibank", "Daktronics", "Black Hills Corporation", "Raven Industries"],
        },
        {
          name: "Tennessee",
          abbreviation: "TN",
          capital: "Nashville",
          governor: "Bill Lee",
          party: "Republican",
          illiteracyRate: "3.1%",
          topCompanies: ["FedEx", "HCA Healthcare", "Dollar General", "AutoZone", "International Paper"],
        },
        {
          name: "Texas",
          abbreviation: "TX",
          capital: "Austin",
          governor: "Greg Abbott",
          party: "Republican",
          illiteracyRate: "2.9%",
          topCompanies: ["ExxonMobil", "AT&T", "Dell", "Texas Instruments", "Valero Energy"],
        },
      ],
    },
    "Mountain Time (MT)": {
      offset: -7,
      states: [
        {
          name: "Arizona",
          abbreviation: "AZ",
          capital: "Phoenix",
          governor: "Katie Hobbs",
          party: "Democratic",
          illiteracyRate: "2.6%",
          topCompanies: ["Freeport-McMoRan", "Republic Services", "Avnet", "PetSmart", "Sprouts Farmers Market"],
        },
        {
          name: "Colorado",
          abbreviation: "CO",
          capital: "Denver",
          governor: "Jared Polis",
          party: "Democratic",
          illiteracyRate: "1.7%",
          topCompanies: ["Arrow Electronics", "DaVita", "Ball", "Newmont Mining", "Dish Network"],
        },
        {
          name: "Idaho",
          abbreviation: "ID",
          capital: "Boise",
          governor: "Brad Little",
          party: "Republican",
          illiteracyRate: "2.2%",
          topCompanies: ["Micron Technology", "Albertsons", "Simplot", "Boise Cascade", "WinCo Foods"],
        },
        {
          name: "Montana",
          abbreviation: "MT",
          capital: "Helena",
          governor: "Greg Gianforte",
          party: "Republican",
          illiteracyRate: "2.1%",
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
          governor: "Joe Lombardo",
          party: "Republican",
          illiteracyRate: "2.6%",
          topCompanies: ["Las Vegas Sands", "MGM Resorts", "Caesars Entertainment", "Wynn Resorts", "Switch"],
        },
        {
          name: "New Mexico",
          abbreviation: "NM",
          capital: "Santa Fe",
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
        {
          name: "Utah",
          abbreviation: "UT",
          capital: "Salt Lake City",
          governor: "Spencer Cox",
          party: "Republican",
          illiteracyRate: "1.5%",
          topCompanies: ["Zions Bancorp", "Huntsman", "SkyWest Airlines", "Extra Space Storage", "Overstock.com"],
        },
        {
          name: "Wyoming",
          abbreviation: "WY",
          capital: "Cheyenne",
          governor: "Mark Gordon",
          party: "Republican",
          illiteracyRate: "2.2%",
          topCompanies: [
            "Cloud Peak Energy",
            "Wyoming Machinery",
            "Union Wireless",
            "Sierra Trading Post",
            "Taco John's",
          ],
        },
      ],
    },
    "Pacific Time (PT)": {
      offset: -8,
      states: [
        {
          name: "California",
          abbreviation: "CA",
          capital: "Sacramento",
          governor: "Gavin Newsom",
          party: "Democratic",
          illiteracyRate: "2.1%",
          topCompanies: ["Apple", "Google", "Meta", "Disney", "Wells Fargo"],
        },
        {
          name: "Oregon",
          abbreviation: "OR",
          capital: "Salem",
          governor: "Tina Kotek",
          party: "Democratic",
          illiteracyRate: "2.0%",
          topCompanies: ["Nike", "Columbia Sportswear", "Precision Castparts", "Lithia Motors", "Dutch Bros"],
        },
        {
          name: "Washington",
          abbreviation: "WA",
          capital: "Olympia",
          governor: "Jay Inslee",
          party: "Democratic",
          illiteracyRate: "1.8%",
          topCompanies: ["Amazon", "Microsoft", "Starbucks", "Costco", "Boeing"],
        },
      ],
    },
    "Alaska Time (AKT)": {
      offset: -9,
      states: [
        {
          name: "Alaska",
          abbreviation: "AK",
          capital: "Juneau",
          governor: "Mike Dunleavy",
          party: "Republican",
          illiteracyRate: "2.2%",
          topCompanies: ["Alaska Air Group", "GCI", "ASRC", "Alyeska Pipeline", "Chugach Alaska"],
        },
      ],
    },
    "Hawaii-Aleutian Time (HAT)": {
      offset: -10,
      states: [
        {
          name: "Hawaii",
          abbreviation: "HI",
          capital: "Honolulu",
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
    },
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl shadow-md text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">US States Information by Time Zone</h2>
        <p className="text-white text-opacity-90">
          Explore comprehensive information about all 50 US states organized by time zone to help with targeted
          recruitment strategies. Each state profile includes political landscape, governor, illiteracy rates, and top
          companies.
        </p>
      </div>

      {Object.entries(statesByTimeZone).map(([timeZoneName, timeZoneData]) => (
        <div key={timeZoneName} className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg border-l-4 border-blue-500">
            <Clock className="h-5 w-5 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-800">{timeZoneName}</h3>
            <div className="ml-auto flex items-center">
              <span className="text-blue-600 font-mono font-bold">
                {formatTimeForZone(currentTime, timeZoneData.offset)}
              </span>
              <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                {timeZoneData.states.length} {timeZoneData.states.length === 1 ? "State" : "States"}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {timeZoneData.states.map((state) => (
              <Card
                key={state.abbreviation}
                className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow"
              >
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{state.name}</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                      {state.abbreviation}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Capital</h4>
                        <p className="text-sm">{state.capital}</p>
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
