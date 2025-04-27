"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileCheck } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Welcome to the <span className="text-blue-600">Recruiters Support</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Powerful tools to streamline your recruitment process and find the perfect candidates faster.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Tool</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Boolean Search Card */}
          <Link href="/boolean-search" className="block">
            <Card className="overflow-hidden border-2 hover:border-blue-400 transition-all hover:shadow-lg h-full">
              <div className="h-3 bg-blue-500"></div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
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
                    Generate optimized search strings
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-blue-600" />
                    </div>
                    Copy and use instantly
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <div className="w-full py-2 px-4 text-center bg-blue-600 text-white rounded-md font-medium">
                  Try Boolean Search
                </div>
              </CardFooter>
            </Card>
          </Link>

          {/* ATS Score Card */}
          <Link href="/resume-checker" className="block">
            <Card className="overflow-hidden border-2 hover:border-green-400 transition-all hover:shadow-lg h-full">
              <div className="h-3 bg-green-500"></div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-green-600" />
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
                <div className="w-full py-2 px-4 text-center bg-green-600 text-white rounded-md font-medium">
                  Try Resume Checker
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Recruiter Support Platform.</p>
          <p className="text-slate-400 mt-2">Helping recruiters find the perfect candidates faster.</p>
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
