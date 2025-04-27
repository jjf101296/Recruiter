"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileCheck, StampIcon as Passport, Linkedin } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState({
    est: "",
    pst: "",
    cst: "",
    mst: "",
    ist: "",
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // EST (UTC-5)
      const estTime = new Date(now.getTime() - (now.getTimezoneOffset() + 300) * 60000)
      // PST (UTC-8)
      const pstTime = new Date(now.getTime() - (now.getTimezoneOffset() + 480) * 60000)
      // CST (UTC-6)
      const cstTime = new Date(now.getTime() - (now.getTimezoneOffset() + 360) * 60000)
      // MST (UTC-7)
      const mstTime = new Date(now.getTime() - (now.getTimezoneOffset() + 420) * 60000)
      // IST (UTC+5:30)
      const istTime = new Date(now.getTime() - (now.getTimezoneOffset() - 330) * 60000)

      setCurrentTime({
        est: estTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        pst: pstTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        cst: cstTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        mst: mstTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        ist: istTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* World Clock */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-2 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center">
              <span className="font-semibold mr-2">EST:</span> {currentTime.est}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">PST:</span> {currentTime.pst}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">CST:</span> {currentTime.cst}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">MST:</span> {currentTime.mst}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">IST:</span> {currentTime.ist}
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
                Welcome to the Recruiters Support
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Powerful tools to streamline your recruitment process and find the perfect candidates faster.
            </p>

            {/* Author Section */}
            <div className="flex flex-col items-center justify-center mt-8 mb-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 mb-2">
                <img
                  src="https://media.licdn.com/dms/image/D5603AQFPgTHUHgR4Dw/profile-displayphoto-shrink_800_800/0/1691394087331?e=1719446400&v=beta&t=Ij9-K_7QJVpVDtnfrHYEVLnYD_kvAVNpJoT-_JJiKQQ"
                  alt="John Francis"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-slate-700 font-medium">John Francis</p>
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
          Choose Your Tool
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
                    Highlight important job requirements
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
