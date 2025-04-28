"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileCheck, StampIcon as Passport, Linkedin, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState({
    est: "",
    cst: "",
    mst: "",
    pst: "",
    ist: "",
  })
  const [selectedState, setSelectedState] = useState(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // EST (UTC-5) - Eastern Standard Time
      const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }))
      // CST (UTC-6) - Central Standard Time
      const cstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }))
      // MST (UTC-7) - Mountain Standard Time
      const mstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Denver" }))
      // PST (UTC-8) - Pacific Standard Time
      const pstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))
      // IST (UTC+5:30) - Indian Standard Time
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))

      setCurrentTime({
        est: estTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        cst: cstTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        mst: mstTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        pst: pstTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        ist: istTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // State information data
  const stateInfo = {
    california: {
      name: "California",
      population: "39.5 million",
      timezone: "Pacific Time (PT)",
      culture: "Diverse, tech-focused, entertainment hub",
      topCompanies: ["Apple", "Google", "Meta", "Disney", "Salesforce"],
      description:
        "California is known for Silicon Valley, Hollywood, and its diverse culture. It's the tech hub of the US with major companies headquartered in the Bay Area and Los Angeles.",
    },
    texas: {
      name: "Texas",
      population: "29.1 million",
      timezone: "Central Time (CT)",
      culture: "Southern hospitality, independent spirit",
      topCompanies: ["Dell", "ExxonMobil", "AT&T", "Texas Instruments", "USAA"],
      description:
        "Texas has a strong economy with major industries in energy, technology, and healthcare. Austin has emerged as a major tech hub, often called 'Silicon Hills'.",
    },
    newyork: {
      name: "New York",
      population: "19.8 million",
      timezone: "Eastern Time (ET)",
      culture: "Fast-paced, financial center, arts hub",
      topCompanies: ["JPMorgan Chase", "IBM", "Citigroup", "Goldman Sachs", "Pfizer"],
      description:
        "New York is the financial capital of the US with Wall Street in Manhattan. It's also a center for media, advertising, and fashion industries.",
    },
    florida: {
      name: "Florida",
      population: "21.5 million",
      timezone: "Eastern Time (ET)",
      culture: "Tourism-focused, retirement destination, Latin influence",
      topCompanies: ["Disney", "Universal", "Publix", "NextEra Energy", "Carnival Cruise"],
      description:
        "Florida's economy is driven by tourism, agriculture, and aerospace. It's home to major theme parks and has a strong Latin American influence, especially in Miami.",
    },
    illinois: {
      name: "Illinois",
      population: "12.7 million",
      timezone: "Central Time (CT)",
      culture: "Midwestern values, diverse urban center in Chicago",
      topCompanies: ["Boeing", "McDonald's", "Walgreens", "Allstate", "Caterpillar"],
      description:
        "Illinois is a transportation hub with Chicago being a major financial center. It has diverse industries including manufacturing, finance, and agriculture.",
    },
  }

  // Visa information data
  const visaInfo = {
    h1b: {
      name: "H-1B Visa",
      duration: "3 years, extendable to 6 years",
      eligibility: "Specialty occupation requiring bachelor's degree or higher",
      process: "Employer must sponsor and file petition with USCIS",
      dependencies: "Spouse and children under 21 eligible for H-4 visa",
      notes: "Annual cap of 85,000 visas (20,000 for advanced degree holders)",
    },
    l1: {
      name: "L-1 Visa",
      duration: "Up to 7 years for L-1A, 5 years for L-1B",
      eligibility: "Intracompany transferees (executives, managers, specialized knowledge)",
      process: "Employer must have related entity abroad where employee worked for 1+ year",
      dependencies: "Spouse and children under 21 eligible for L-2 visa (spouses can work)",
      notes: "No annual cap, but requires qualifying relationship between companies",
    },
    tn: {
      name: "TN Visa (NAFTA)",
      duration: "3 years, renewable indefinitely",
      eligibility: "Canadian and Mexican professionals in specific occupations",
      process: "Apply at port of entry (Canadians) or at US consulate (Mexicans)",
      dependencies: "Spouse and children under 21 eligible for TD visa (cannot work)",
      notes: "Limited to professions listed in NAFTA agreement",
    },
    ead: {
      name: "Employment Authorization Document (EAD)",
      duration: "Typically 1-2 years, renewable based on underlying status",
      eligibility: "Various categories including asylum seekers, students, adjustment of status applicants",
      process: "File Form I-765 with USCIS",
      dependencies: "Independent document, not tied to family status",
      notes: "Processing times vary significantly by category",
    },
    usc: {
      name: "US Citizenship",
      duration: "Permanent",
      eligibility: "5 years as permanent resident (3 years if married to US citizen)",
      process: "File N-400, biometrics, interview, civics test, oath ceremony",
      dependencies: "Children under 18 may derive citizenship automatically",
      notes: "Provides voting rights and ability to sponsor more family members",
    },
  }

  // Tax terms information
  const taxTerms = {
    w2: {
      name: "W-2 Employment",
      description: "Traditional employment where employer withholds taxes",
      benefits: "Employee benefits, unemployment insurance, workers' compensation",
      taxes: "Employer pays half of FICA taxes (Social Security and Medicare)",
      considerations: "Less tax burden on employee, more stability",
    },
    c2c: {
      name: "Corp-to-Corp (C2C)",
      description: "Business-to-business relationship requiring contractor to have their own corporation",
      benefits: "Higher pay rates, more tax deductions, business expense write-offs",
      taxes: "Self-employment tax (full FICA), quarterly estimated tax payments",
      considerations: "Need to maintain corporate structure, insurance, and compliance",
    },
    "1099": {
      name: "1099 Independent Contractor",
      description: "Self-employed individual providing services without being an employee",
      benefits: "Flexibility, potential for higher rates, business deductions",
      taxes: "Self-employment tax (15.3%), quarterly estimated tax payments",
      considerations: "No benefits, responsible for all taxes, need to track expenses",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* World Clock */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-3">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {/* Digital clock displays */}
            <div className="flex flex-col items-center">
              <div className="text-xs mb-1 text-blue-200">Eastern (EST)</div>
              <div className="bg-black bg-opacity-30 px-3 py-1 rounded-md font-mono text-lg tracking-wider">
                {currentTime.est}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs mb-1 text-blue-200">Central (CST)</div>
              <div className="bg-black bg-opacity-30 px-3 py-1 rounded-md font-mono text-lg tracking-wider">
                {currentTime.cst}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs mb-1 text-blue-200">Mountain (MST)</div>
              <div className="bg-black bg-opacity-30 px-3 py-1 rounded-md font-mono text-lg tracking-wider">
                {currentTime.mst}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs mb-1 text-blue-200">Pacific (PST)</div>
              <div className="bg-black bg-opacity-30 px-3 py-1 rounded-md font-mono text-lg tracking-wider">
                {currentTime.pst}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs mb-1 text-blue-200">India (IST)</div>
              <div className="bg-black bg-opacity-30 px-3 py-1 rounded-md font-mono text-lg tracking-wider">
                {currentTime.ist}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome to the Recruiter Support Platform
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Professional tools to streamline your recruitment process and find the perfect candidates faster.
            </p>

            {/* Author Section */}
            <div className="flex flex-col items-center justify-center mt-8 mb-4">
              <p className="text-slate-700 font-medium text-lg">Founder: John Francis</p>
              <p className="text-slate-600 text-sm max-w-md text-center mb-2">
                Technical Recruiter | Talent Acquisition Specialist | Helping companies find top tech talent
              </p>
              <a
                href="https://www.linkedin.com/in/john-francis-eeemba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 mt-1"
              >
                <Linkedin className="h-4 w-4 mr-1" />
                <span className="text-sm">Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Professional Recruitment Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Boolean Search Card */}
          <Link href="/boolean-search" className="block">
            <Card className="overflow-hidden border-2 hover:border-blue-400 transition-all hover:shadow-xl h-full group">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Search className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Boolean Search Generator</CardTitle>
                <CardDescription>
                  Generate powerful Boolean search strings from job descriptions to find the perfect candidates on
                  LinkedIn and job boards.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-600">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-blue-600" />
                    </div>
                    Extract key skills automatically
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-blue-600" />
                    </div>
                    Identify domain-specific requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-blue-600" />
                    </div>
                    Generate optimized search strings
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <div className="w-full py-2 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-medium group-hover:from-blue-700 group-hover:to-indigo-700 transition-colors">
                  Try Boolean Search
                </div>
              </CardFooter>
            </Card>
          </Link>

          {/* ATS Score Card */}
          <Link href="/resume-checker" className="block">
            <Card className="overflow-hidden border-2 hover:border-green-400 transition-all hover:shadow-xl h-full group">
              <div className="h-3 bg-gradient-to-r from-green-500 to-teal-500"></div>
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <FileCheck className="h-7 w-7 text-green-600" />
                </div>
                <CardTitle className="text-2xl">ATS Resume Score Checker</CardTitle>
                <CardDescription>
                  Check how well a resume matches a job description and get AI-powered suggestions for improvement.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-600">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-green-600" />
                    </div>
                    Score resume against job requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-green-600" />
                    </div>
                    Identify missing keywords and skills
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-green-600" />
                    </div>
                    Get AI-powered improvement suggestions
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <div className="w-full py-2 px-4 text-center bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-md font-medium group-hover:from-green-700 group-hover:to-teal-700 transition-colors">
                  Try Resume Checker
                </div>
              </CardFooter>
            </Card>
          </Link>

          {/* I-94 & Travel History Card */}
          <Link href="/travel-history" className="block">
            <Card className="overflow-hidden border-2 hover:border-purple-400 transition-all hover:shadow-xl h-full group">
              <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Passport className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">I-94 & Travel History</CardTitle>
                <CardDescription>
                  Check travel history and recent I-94 records using passport information.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-600">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-purple-600" />
                    </div>
                    Find travel history results
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-purple-600" />
                    </div>
                    View arrival and departure locations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-purple-600" />
                    </div>
                    Access most recent I-94 information
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <div className="w-full py-2 px-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md font-medium group-hover:from-purple-700 group-hover:to-pink-700 transition-colors">
                  Check Travel History
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </section>

      {/* USA Map Section */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl my-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          USA Recruitment Map
        </h2>
        <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
          Click on states to learn about local culture, population, time zones, and top companies for targeted
          recruitment.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            {/* Simplified USA Map with clickable states */}
            <div className="relative w-full h-[400px] bg-white rounded-lg shadow-md p-4 border border-slate-200">
              <h3 className="text-center text-lg font-medium mb-4">Interactive USA Map</h3>

              {/* This is a simplified representation - in a real app, you'd use an SVG map */}
              <div className="relative w-full h-[300px]">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-[45%] left-[80%] w-16 h-16 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center text-xs font-medium text-blue-800 border-2 border-blue-300 transition-colors"
                      onClick={() => setSelectedState("california")}
                    >
                      CA
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{stateInfo.california.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Population</h4>
                          <p>{stateInfo.california.population}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Time Zone</h4>
                          <p>{stateInfo.california.timezone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Culture</h4>
                        <p>{stateInfo.california.culture}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Top Companies</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {stateInfo.california.topCompanies.map((company, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Overview</h4>
                        <p className="text-sm">{stateInfo.california.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-[60%] left-[55%] w-16 h-16 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-xs font-medium text-red-800 border-2 border-red-300 transition-colors"
                      onClick={() => setSelectedState("texas")}
                    >
                      TX
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{stateInfo.texas.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Population</h4>
                          <p>{stateInfo.texas.population}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Time Zone</h4>
                          <p>{stateInfo.texas.timezone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Culture</h4>
                        <p>{stateInfo.texas.culture}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Top Companies</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {stateInfo.texas.topCompanies.map((company, i) => (
                            <span key={i} className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Overview</h4>
                        <p className="text-sm">{stateInfo.texas.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-[30%] left-[85%] w-16 h-16 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-xs font-medium text-green-800 border-2 border-green-300 transition-colors"
                      onClick={() => setSelectedState("newyork")}
                    >
                      NY
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{stateInfo.newyork.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Population</h4>
                          <p>{stateInfo.newyork.population}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Time Zone</h4>
                          <p>{stateInfo.newyork.timezone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Culture</h4>
                        <p>{stateInfo.newyork.culture}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Top Companies</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {stateInfo.newyork.topCompanies.map((company, i) => (
                            <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Overview</h4>
                        <p className="text-sm">{stateInfo.newyork.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-[70%] left-[80%] w-16 h-16 bg-yellow-100 hover:bg-yellow-200 rounded-full flex items-center justify-center text-xs font-medium text-yellow-800 border-2 border-yellow-300 transition-colors"
                      onClick={() => setSelectedState("florida")}
                    >
                      FL
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{stateInfo.florida.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Population</h4>
                          <p>{stateInfo.florida.population}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Time Zone</h4>
                          <p>{stateInfo.florida.timezone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Culture</h4>
                        <p>{stateInfo.florida.culture}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Top Companies</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {stateInfo.florida.topCompanies.map((company, i) => (
                            <span key={i} className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Overview</h4>
                        <p className="text-sm">{stateInfo.florida.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-[40%] left-[65%] w-16 h-16 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center text-xs font-medium text-purple-800 border-2 border-purple-300 transition-colors"
                      onClick={() => setSelectedState("illinois")}
                    >
                      IL
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{stateInfo.illinois.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Population</h4>
                          <p>{stateInfo.illinois.population}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-slate-500">Time Zone</h4>
                          <p>{stateInfo.illinois.timezone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Culture</h4>
                        <p>{stateInfo.illinois.culture}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Top Companies</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {stateInfo.illinois.topCompanies.map((company, i) => (
                            <span key={i} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-500">Overview</h4>
                        <p className="text-sm">{stateInfo.illinois.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Background map outline */}
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=500')] bg-contain bg-center bg-no-repeat opacity-20"></div>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Recruitment by Region
                </CardTitle>
                <CardDescription>
                  Understanding regional differences can help you tailor your recruitment strategy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Different regions in the US have unique talent pools, industry concentrations, and cultural aspects
                  that can impact your recruitment strategy. Click on states in the map to learn more about:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Time zones for scheduling interviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Major companies and competitors in the area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Population demographics and talent availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Globe className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Cultural insights for better candidate engagement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visa Types and Tax Terms Section */}
      <section className="container mx-auto px-4 py-12 my-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Visa Types & Tax Terms
        </h2>
        <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
          Essential information about work visas and tax classifications for recruiters working with international
          talent.
        </p>

        <Tabs defaultValue="visas" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="visas">Visa Types</TabsTrigger>
            <TabsTrigger value="tax">Tax Classifications</TabsTrigger>
          </TabsList>

          <TabsContent value="visas">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(visaInfo).map((key) => (
                <Card key={key} className="overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{visaInfo[key].name}</CardTitle>
                    <CardDescription>
                      <span className="font-medium">Duration:</span> {visaInfo[key].duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium text-slate-700">Eligibility</h4>
                      <p className="text-slate-600">{visaInfo[key].eligibility}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700">Process</h4>
                      <p className="text-slate-600">{visaInfo[key].process}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700">Dependencies</h4>
                      <p className="text-slate-600">{visaInfo[key].dependencies}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs text-slate-500 italic">{visaInfo[key].notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tax">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.keys(taxTerms).map((key) => (
                <Card key={key} className="overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{taxTerms[key].name}</CardTitle>
                    <CardDescription>{taxTerms[key].description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium text-slate-700">Benefits</h4>
                      <p className="text-slate-600">{taxTerms[key].benefits}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700">Tax Implications</h4>
                      <p className="text-slate-600">{taxTerms[key].taxes}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700">Considerations</h4>
                      <p className="text-slate-600">{taxTerms[key].considerations}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Recruiter Support Platform.</p>
          <p className="text-slate-400 mt-2">Helping recruiters find the perfect candidates faster.</p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.linkedin.com/in/john-francis-eeemba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ChevronRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function Building(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Globe(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
