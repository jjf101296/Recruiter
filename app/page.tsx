"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BooleanSearch } from "@/components/boolean-search"
import { ResumeScoreChecker } from "@/components/resume-score-checker"
import { ChevronRight, Search, FileCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Welcome to the <span className="text-blue-600">Recruiter Support Platform</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Powerful tools to streamline your recruitment process and find the perfect candidates faster.
            </p>
            <p className="text-slate-500 italic">Created by John</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Tool</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Boolean Search Card */}
          <Card className="overflow-hidden border-2 hover:border-blue-400 transition-all hover:shadow-lg">
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
              <Button
                className="w-full"
                onClick={() => document.getElementById("boolean-search")?.scrollIntoView({ behavior: "smooth" })}
              >
                Try Boolean Search
              </Button>
            </CardFooter>
          </Card>

          {/* ATS Score Card */}
          <Card className="overflow-hidden border-2 hover:border-green-400 transition-all hover:shadow-lg">
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
              <Button
                className="w-full"
                variant="outline"
                onClick={() => document.getElementById("resume-checker")?.scrollIntoView({ behavior: "smooth" })}
              >
                Try Resume Checker
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-t-3xl shadow-sm">
        <Tabs defaultValue="boolean" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="boolean">Boolean Search Generator</TabsTrigger>
            <TabsTrigger value="resume">ATS Resume Checker</TabsTrigger>
          </TabsList>

          <TabsContent value="boolean" id="boolean-search">
            <BooleanSearch />
          </TabsContent>

          <TabsContent value="resume" id="resume-checker">
            <ResumeScoreChecker />
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Recruiter Support Platform. Created by John.</p>
          <p className="text-slate-400 mt-2">Helping recruiters find the perfect candidates faster.</p>
        </div>
      </footer>
    </div>
  )
}
