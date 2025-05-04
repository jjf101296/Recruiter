export interface StateData {
  name: string
  abbreviation: string
  capital: string
  population: number
  governor: string
  flagUrl: string
  largestCity: string
  demographics: {
    white: number
    black: number
    hispanic: number
    asian: number
    other: number
  }
  majorIndustries: string[]
  topEmployers: string[]
  timeZones: string[]
  costOfLiving: "Low" | "Medium" | "High" | "Very High"
  politicalLeaning: "Democratic" | "Republican" | "Swing"
}

export const statesData: StateData[] = [
  {
    name: "Alabama",
    abbreviation: "AL",
    capital: "Montgomery",
    population: 5024279,
    governor: "Kay Ivey",
    flagUrl: "/flags/alabama.svg",
    largestCity: "Birmingham",
    demographics: {
      white: 65.3,
      black: 26.8,
      hispanic: 4.6,
      asian: 1.5,
      other: 1.8,
    },
    majorIndustries: ["Aerospace", "Automotive", "Healthcare", "Education"],
    topEmployers: ["Redstone Arsenal", "University of Alabama", "Mercedes-Benz"],
    timeZones: ["Central"],
    costOfLiving: "Low",
    politicalLeaning: "Republican",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
    capital: "Juneau",
    population: 733391,
    governor: "Mike Dunleavy",
    flagUrl: "/flags/alaska.svg",
    largestCity: "Anchorage",
    demographics: {
      white: 60.2,
      black: 3.7,
      hispanic: 7.3,
      asian: 6.5,
      other: 22.3,
    },
    majorIndustries: ["Oil & Gas", "Fishing", "Tourism", "Mining"],
    topEmployers: ["Providence Health", "State of Alaska", "Ted Stevens Anchorage International Airport"],
    timeZones: ["Alaska"],
    costOfLiving: "High",
    politicalLeaning: "Republican",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
    capital: "Phoenix",
    population: 7278717,
    governor: "Katie Hobbs",
    flagUrl: "/flags/arizona.svg",
    largestCity: "Phoenix",
    demographics: {
      white: 54.1,
      black: 5.2,
      hispanic: 31.7,
      asian: 3.7,
      other: 5.3,
    },
    majorIndustries: ["Aerospace", "Electronics", "Tourism", "Healthcare"],
    topEmployers: ["Banner Health", "Walmart", "Arizona State University"],
    timeZones: ["Mountain (no DST in most areas)"],
    costOfLiving: "Medium",
    politicalLeaning: "Swing",
  },
  {
    name: "California",
    abbreviation: "CA",
    capital: "Sacramento",
    population: 39538223,
    governor: "Gavin Newsom",
    flagUrl: "/flags/california.svg",
    largestCity: "Los Angeles",
    demographics: {
      white: 36.5,
      black: 6.5,
      hispanic: 39.4,
      asian: 15.5,
      other: 2.1,
    },
    majorIndustries: ["Technology", "Entertainment", "Agriculture", "Tourism"],
    topEmployers: ["Apple", "Google", "Kaiser Permanente", "University of California"],
    timeZones: ["Pacific"],
    costOfLiving: "Very High",
    politicalLeaning: "Democratic",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
    capital: "Denver",
    population: 5773714,
    governor: "Jared Polis",
    flagUrl: "/flags/colorado.svg",
    largestCity: "Denver",
    demographics: {
      white: 67.5,
      black: 4.6,
      hispanic: 21.8,
      asian: 3.5,
      other: 2.6,
    },
    majorIndustries: ["Aerospace", "Technology", "Tourism", "Agriculture"],
    topEmployers: ["UCHealth", "University of Colorado", "Lockheed Martin"],
    timeZones: ["Mountain"],
    costOfLiving: "High",
    politicalLeaning: "Democratic",
  },
  // Adding 5 more states as examples - in a real implementation, all 50 would be included
  {
    name: "New York",
    abbreviation: "NY",
    capital: "Albany",
    population: 20201249,
    governor: "Kathy Hochul",
    flagUrl: "/flags/new-york.svg",
    largestCity: "New York City",
    demographics: {
      white: 55.6,
      black: 17.6,
      hispanic: 19.3,
      asian: 9.0,
      other: 1.5,
    },
    majorIndustries: ["Finance", "Healthcare", "Professional Services", "Education"],
    topEmployers: ["JPMorgan Chase", "Mount Sinai Health System", "New York University"],
    timeZones: ["Eastern"],
    costOfLiving: "Very High",
    politicalLeaning: "Democratic",
  },
  {
    name: "Texas",
    abbreviation: "TX",
    capital: "Austin",
    population: 29145505,
    governor: "Greg Abbott",
    flagUrl: "/flags/texas.svg",
    largestCity: "Houston",
    demographics: {
      white: 41.2,
      black: 12.9,
      hispanic: 39.7,
      asian: 5.2,
      other: 1.0,
    },
    majorIndustries: ["Energy", "Technology", "Healthcare", "Aerospace"],
    topEmployers: ["Walmart", "H-E-B", "Dell Technologies", "Texas A&M University System"],
    timeZones: ["Central", "Mountain (El Paso)"],
    costOfLiving: "Medium",
    politicalLeaning: "Republican",
  },
  {
    name: "Florida",
    abbreviation: "FL",
    capital: "Tallahassee",
    population: 21538187,
    governor: "Ron DeSantis",
    flagUrl: "/flags/florida.svg",
    largestCity: "Jacksonville",
    demographics: {
      white: 53.2,
      black: 16.9,
      hispanic: 26.4,
      asian: 3.0,
      other: 0.5,
    },
    majorIndustries: ["Tourism", "Agriculture", "Aerospace", "Healthcare"],
    topEmployers: ["Walt Disney World", "Universal Orlando", "Publix Super Markets"],
    timeZones: ["Eastern", "Central (western panhandle)"],
    costOfLiving: "Medium",
    politicalLeaning: "Swing",
  },
  // In a real implementation, all 50 states would be included
]
