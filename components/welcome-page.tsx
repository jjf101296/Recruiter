"use client"

import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  FileText,
  Plane,
  FileCheck,
  Calculator,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Map,
  CheckCircle,
  DollarSign,
  Flag,
} from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Title */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 text-center mb-12">
          <div className="relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500"></div>
              <div className="grid grid-cols-10 grid-rows-10 gap-1 h-full w-full">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="bg-blue-500 opacity-20 rounded-md"></div>
                ))}
              </div>
            </div>

            <div className="relative z-10 p-8 md:p-16 max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl font-medium text-blue-600 mb-2">Welcome to the</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Recruiter Support Platform
              </h1>

              <div className="mt-4 text-center">
                <p className="font-medium">Created by</p>
                <Link
                  href="https://www.linkedin.com/in/john-francis-eeemba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center font-bold text-blue-600 hover:text-blue-800 mt-1"
                >
                  John Francis
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
                <p className="text-slate-600 mt-2 italic">
                  Talent Acquisition | Technical Recruiting | Sourcing Specialist
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Tools Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Available Tools
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Search className="h-10 w-10 text-white" />}
              iconBg="bg-gradient-to-br from-blue-500 to-blue-700"
              title="Boolean Search Generator"
              description="Create powerful search strings for multiple platforms to find the perfect candidates."
              link="/boolean-search"
              badge="Popular"
              bgPattern="radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)"
              bgSize="20px 20px"
            />

            <FeatureCard
              icon={<FileText className="h-10 w-10 text-white" />}
              iconBg="bg-gradient-to-br from-green-500 to-emerald-700"
              title="ATS Resume Checker"
              description="Match resumes against job descriptions to identify the best candidates."
              link="/resume-checker"
              badge="Essential"
              bgPattern="radial-gradient(circle, rgba(16, 185, 129, 0.1) 1px, transparent 1px)"
              bgSize="20px 20px"
            />

            <FeatureCard
              icon={<Plane className="h-10 w-10 text-white" />}
              iconBg="bg-gradient-to-br from-purple-500 to-violet-700"
              title="I94 & Travel History"
              description="Track and calculate travel history for visa applications and compliance."
              link="/travel-history"
              badge="Compliance"
              bgPattern="radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)"
              bgSize="20px 20px"
            />

            <FeatureCard
              icon={<Map className="h-10 w-10 text-white" />}
              iconBg="bg-gradient-to-br from-teal-500 to-teal-700"
              title="US Map Explorer"
              description="Explore detailed information about all 50 US states for targeted recruitment."
              link="/us-map"
              badge="Geographic"
              bgPattern="radial-gradient(circle, rgba(20, 184, 166, 0.1) 1px, transparent 1px)"
              bgSize="20px 20px"
            />

            <FeatureCard
              icon={<FileCheck className="h-10 w-10 text-white" />}
              iconBg="bg-gradient-to-br from-pink-500 to-rose-700"
              title="US Visa Types"
              description="Comprehensive reference for all US work visa types and their requirements."
              link="/visa-types"
              badge="Reference"
              bgPattern="radial-gradient(circle, rgba(244, 114, 182, 0.1) 1px, transparent 1px)"
              bgSize="20px 20px"
            />

            <FeatureCard
              icon={<Calculator className="h-10 w-10 text-white" />}
              iconBg="bg-gradient-to-br from-amber-500 to-orange-700"
              title="Tax Terms"
              description="Essential tax information on C2C, W2, 1099 and other employment models."
              link="/tax-terms"
              badge="Financial"
              bgPattern="radial-gradient(circle, rgba(251, 191, 36, 0.1) 1px, transparent 1px)"
              bgSize="20px 20px"
            />
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-slate-400">Created by John Francis</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="https://www.linkedin.com/in/john-francis-eeemba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-1" />
                <span>Connect on LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700 text-center text-sm text-slate-400">
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Card Component with enhanced graphics
function FeatureCard({
  icon,
  iconBg,
  title,
  description,
  link,
  badge,
  bgPattern,
  bgSize,
}: {
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
  link: string
  badge?: string
  bgPattern?: string
  bgSize?: string
}) {
  return (
    <Link href={link} passHref>
      <Card
        className="h-full transition-all hover:shadow-lg border-blue-100 hover:border-blue-300 hover:translate-y-[-5px] cursor-pointer overflow-hidden"
        style={{
          backgroundImage: bgPattern,
          backgroundSize: bgSize,
        }}
      >
        <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50"></div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <div className={`p-4 rounded-xl ${iconBg} shadow-lg`}>{icon}</div>
            {badge && (
              <Badge variant="outline" className="bg-slate-50">
                {badge}
              </Badge>
            )}
          </div>
          <CardTitle className="mt-6 text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>

        <CardFooter className="bg-slate-50 border-t border-blue-100">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Explore <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

// Visa Card Component
function VisaCard({
  name,
  category,
  description,
  duration,
  requirements,
  dependents,
  notes,
}: {
  name: string
  category: string
  description: string
  duration: string
  requirements: string[]
  dependents: string
  notes: string
}) {
  return (
    <Card className="border-pink-100 shadow-md overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100 pb-3">
        <div className="flex items-center justify-between">
          <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200">{name}</Badge>
          <span className="text-sm text-pink-700 font-medium">{category}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm mb-4">{description}</p>

        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-semibold text-pink-800 uppercase tracking-wide mb-1">Duration</h4>
            <p className="text-sm">{duration}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-pink-800 uppercase tracking-wide mb-1">Requirements</h4>
            <ul className="text-sm space-y-1">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-3 w-3 text-pink-600 mr-1 mt-1 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-pink-800 uppercase tracking-wide mb-1">Dependents</h4>
            <p className="text-sm">{dependents}</p>
          </div>

          {notes && (
            <div>
              <h4 className="text-xs font-semibold text-pink-800 uppercase tracking-wide mb-1">Notes</h4>
              <p className="text-sm">{notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Tax Card Component
function TaxCard({
  title,
  icon,
  description,
  keyPoints,
  taxForms,
  considerations,
}: {
  title: string
  icon: React.ReactNode
  description: string
  keyPoints: string[]
  taxForms: string[]
  considerations: string[]
}) {
  return (
    <Card className="border-amber-100 shadow-md overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="flex items-center">
          <div className="mr-4">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">Key Points</h4>
            <ul className="text-sm space-y-1">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-3 w-3 text-amber-600 mr-1 mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">Tax Forms</h4>
            <ul className="text-sm space-y-1">
              {taxForms.map((form, index) => (
                <li key={index} className="flex items-start">
                  <DollarSign className="h-3 w-3 text-amber-600 mr-1 mt-1 flex-shrink-0" />
                  <span>{form}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">Considerations</h4>
            <ul className="text-sm space-y-1">
              {considerations.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-3 w-3 text-amber-600 mr-1 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// State Card Component
function StateCard({
  name,
  abbreviation,
  capital,
  population,
  governor,
  party,
  topCompanies,
  timeZones,
  demographics,
  majorIndustries,
}: {
  name: string
  abbreviation: string
  capital: string
  population: string
  governor: string
  party: string
  topCompanies: string[]
  timeZones: string[]
  demographics: string
  majorIndustries: string[]
}) {
  return (
    <Card className="border-teal-100 shadow-md overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-100 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Flag className="h-5 w-5 text-teal-600 mr-2" />
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 border-teal-200">{abbreviation}</Badge>
        </div>
        <CardDescription>Capital: {capital}</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div>
              <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Population</h4>
              <p className="text-sm">{population}</p>
            </div>
            <div className="text-right">
              <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Governor</h4>
              <p className="text-sm flex items-center justify-end">
                {governor}
                <Badge
                  variant="outline"
                  className={`ml-2 ${party === "Democratic" ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-red-50 text-red-800 border-red-200"}`}
                >
                  {party}
                </Badge>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Time Zones</h4>
            <p className="text-sm">{timeZones.join(", ")}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Demographics</h4>
            <p className="text-sm">{demographics}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Major Industries</h4>
            <div className="flex flex-wrap gap-1">
              {majorIndustries.map((industry, index) => (
                <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-wide mb-1">Top Companies</h4>
            <p className="text-sm">{topCompanies.join(", ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
