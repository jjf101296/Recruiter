"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  FileText,
  Plane,
  Map,
  FileCheck,
  Calculator,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react"

export default function WelcomePage() {
  const [activeTab, setActiveTab] = useState("welcome")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Recruiter Support Platform
              </h1>
              <p className="text-slate-600 mt-1">Your all-in-one toolkit for recruitment excellence</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Link
                href="https://www.linkedin.com/in/john-francis-eeemba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-1" />
                <span>Connect on LinkedIn</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="welcome" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="boolean">Boolean Search</TabsTrigger>
            <TabsTrigger value="ats">ATS Checker</TabsTrigger>
            <TabsTrigger value="travel">Travel History</TabsTrigger>
            <TabsTrigger value="map">US Map</TabsTrigger>
            <TabsTrigger value="visa">Visa Types</TabsTrigger>
            <TabsTrigger value="tax">Tax Terms</TabsTrigger>
          </TabsList>

          {/* Welcome Tab */}
          <TabsContent value="welcome">
            <div className="grid gap-8">
              <section className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <Badge variant="outline" className="mb-4">
                      Welcome
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4">Your Complete Recruitment Toolkit</h2>
                    <p className="text-slate-600 mb-6">
                      Access powerful tools designed specifically for recruiters to streamline your workflow, find the
                      perfect candidates, and stay informed about visa regulations, state information, and more.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => setActiveTab("boolean")}>
                        Explore Tools <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        Learn More <Info className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-gradient-to-r from-blue-500 to-teal-500 p-8 md:p-12 text-white">
                    <h3 className="text-2xl font-bold mb-4">Created by John Francis</h3>
                    <p className="mb-4 text-blue-50">Talent Acquisition | Technical Recruiter | Sourcing Specialist</p>
                    <p className="mb-6 text-blue-50">
                      Passionate about connecting top talent with innovative companies and providing recruiters with the
                      tools they need to succeed.
                    </p>
                    <Link
                      href="https://www.linkedin.com/in/john-francis-eeemba/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      View LinkedIn Profile
                    </Link>
                  </div>
                </div>
              </section>

              <h2 className="text-2xl font-bold mt-8 mb-4">Available Tools</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  icon={<Search className="h-8 w-8 text-blue-500" />}
                  title="Boolean Search Generator"
                  description="Create powerful search strings for multiple platforms to find the perfect candidates."
                  link="/boolean-search"
                  badge="Popular"
                />

                <FeatureCard
                  icon={<FileText className="h-8 w-8 text-green-500" />}
                  title="ATS Resume Checker"
                  description="Match resumes against job descriptions to identify the best candidates."
                  link="/resume-checker"
                  badge="Essential"
                />

                <FeatureCard
                  icon={<Plane className="h-8 w-8 text-purple-500" />}
                  title="I94 & Travel History"
                  description="Track and calculate travel history for visa applications and compliance."
                  link="/travel-history"
                  badge="Compliance"
                />

                <FeatureCard
                  icon={<Map className="h-8 w-8 text-amber-500" />}
                  title="US Interactive Map"
                  description="Explore detailed information about all 50 US states for targeted recruitment."
                  link="#"
                  onClick={() => setActiveTab("map")}
                  badge="Informative"
                />

                <FeatureCard
                  icon={<FileCheck className="h-8 w-8 text-red-500" />}
                  title="US Visa Types"
                  description="Comprehensive reference for all US visa types and their requirements."
                  link="#"
                  onClick={() => setActiveTab("visa")}
                  badge="Reference"
                />

                <FeatureCard
                  icon={<Calculator className="h-8 w-8 text-indigo-500" />}
                  title="Tax Terms"
                  description="Essential tax information and terminology for recruiters and candidates."
                  link="#"
                  onClick={() => setActiveTab("tax")}
                  badge="Financial"
                />
              </div>
            </div>
          </TabsContent>

          {/* Boolean Search Tab */}
          <TabsContent value="boolean">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Search className="h-6 w-6 mr-2 text-blue-500" />
                  Boolean Search Generator
                </CardTitle>
                <CardDescription>
                  Create powerful search strings for multiple platforms to find the perfect candidates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    The Boolean Search Generator helps you create optimized search strings for platforms like LinkedIn,
                    Indeed, Dice, and Google X-Ray. Select skills, locations, and other criteria to generate precise
                    search queries.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <h3 className="font-medium mb-2">Key Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Comprehensive skill categories with detailed descriptions</li>
                      <li>Platform-specific syntax optimization</li>
                      <li>Save and reuse search templates</li>
                      <li>Export search results</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/boolean-search" passHref>
                  <Button>
                    Open Boolean Search Generator
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ATS Resume Checker Tab */}
          <TabsContent value="ats">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-green-500" />
                  ATS Resume Checker
                </CardTitle>
                <CardDescription>
                  Match resumes against job descriptions to identify the best candidates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    The ATS Resume Checker analyzes resumes against job descriptions to determine match rates, identify
                    missing skills, and provide recommendations for improvement.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <h3 className="font-medium mb-2">Key Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Skill matching and gap analysis</li>
                      <li>Keyword optimization suggestions</li>
                      <li>Resume scoring and ranking</li>
                      <li>Detailed feedback reports</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/resume-checker" passHref>
                  <Button>
                    Open ATS Resume Checker
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Travel History Tab */}
          <TabsContent value="travel">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Plane className="h-6 w-6 mr-2 text-purple-500" />
                  I94 & Travel History
                </CardTitle>
                <CardDescription>
                  Track and calculate travel history for visa applications and compliance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    The I94 & Travel History tool helps track and calculate travel history for visa applications,
                    ensuring compliance with immigration regulations and requirements.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <h3 className="font-medium mb-2">Key Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Travel date tracking and calculation</li>
                      <li>Visa validity period monitoring</li>
                      <li>Compliance alerts and notifications</li>
                      <li>Exportable travel history reports</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/travel-history" passHref>
                  <Button>
                    Open I94 & Travel History
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* US Map Tab */}
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Map className="h-6 w-6 mr-2 text-amber-500" />
                  US Interactive Map
                </CardTitle>
                <CardDescription>
                  Explore detailed information about all 50 US states for targeted recruitment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p>
                    The US Interactive Map provides comprehensive information about all 50 states, including
                    demographics, major employers, time zones, and more to help with targeted recruitment strategies.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mb-6">
                    <h3 className="font-medium mb-2">Available Information:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Population demographics and statistics</li>
                      <li>Major industries and top employers</li>
                      <li>Time zones and regional information</li>
                      <li>Political landscape and leadership</li>
                      <li>Cultural insights for candidate engagement</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 relative">
                    <h3 className="font-medium mb-4 text-center">Interactive US Map</h3>
                    <p className="text-center text-sm text-slate-500 mb-4">
                      Click on a state to view detailed information
                    </p>
                    <div className="aspect-[4/3] bg-slate-100 rounded-md flex items-center justify-center">
                      <p className="text-slate-500">Interactive map will display here</p>
                      {/* This would be replaced with the actual interactive map component */}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline">View State List</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visa Types Tab */}
          <TabsContent value="visa">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <FileCheck className="h-6 w-6 mr-2 text-red-500" />
                  US Visa Types
                </CardTitle>
                <CardDescription>Comprehensive reference for all US visa types and their requirements.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    The US Visa Types section provides detailed information about various US visa categories, including
                    eligibility requirements, application processes, and important considerations for recruiters and
                    candidates.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mb-6">
                    <h3 className="font-medium mb-2">Visa Categories Covered:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Badge variant="outline" className="justify-center">
                        H-1B
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        L-1
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        O-1
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        TN
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        E-3
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        J-1
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        F-1/OPT
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        EB-1/2/3
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        Green Card
                      </Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="font-medium mb-2">For Each Visa Type:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Eligibility requirements</li>
                        <li>Duration and renewability</li>
                        <li>Sponsorship requirements</li>
                        <li>Dependent options</li>
                        <li>Work authorization details</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="font-medium mb-2">Search and Filter:</h3>
                      <div className="space-y-3">
                        <Input placeholder="Search visa types..." />
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            All
                          </Button>
                          <Button variant="outline" size="sm">
                            Work Visas
                          </Button>
                          <Button variant="outline" size="sm">
                            Student Visas
                          </Button>
                          <Button variant="outline" size="sm">
                            Permanent Residency
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <DialogTrigger asChild>
                  <Button>
                    View Visa Types List
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tax Terms Tab */}
          <TabsContent value="tax">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-indigo-500" />
                  Tax Terms
                </CardTitle>
                <CardDescription>
                  Essential tax information and terminology for recruiters and candidates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    The Tax Terms section provides essential tax information and terminology that recruiters and
                    candidates need to understand, especially when dealing with international placements and various
                    employment arrangements.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mb-6">
                    <h3 className="font-medium mb-2">Topics Covered:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Tax classifications for different employment types</li>
                      <li>International tax considerations</li>
                      <li>State-specific tax information</li>
                      <li>Tax implications of various visa statuses</li>
                      <li>Common tax forms and documentation</li>
                    </ul>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="font-medium mb-2">Common Tax Forms:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Badge variant="outline" className="mr-2 w-16 justify-center">
                            W-2
                          </Badge>
                          <span className="text-sm">Employee wage and tax statement</span>
                        </li>
                        <li className="flex items-center">
                          <Badge variant="outline" className="mr-2 w-16 justify-center">
                            1099
                          </Badge>
                          <span className="text-sm">Independent contractor income</span>
                        </li>
                        <li className="flex items-center">
                          <Badge variant="outline" className="mr-2 w-16 justify-center">
                            W-4
                          </Badge>
                          <span className="text-sm">Employee withholding certificate</span>
                        </li>
                        <li className="flex items-center">
                          <Badge variant="outline" className="mr-2 w-16 justify-center">
                            W-8BEN
                          </Badge>
                          <span className="text-sm">Foreign status certification</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="font-medium mb-2">Tax Resources:</h3>
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="https://www.irs.gov"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> IRS Official Website
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.irs.gov/individuals/international-taxpayers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> International Taxpayer Information
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.irs.gov/businesses/small-businesses-self-employed"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> Small Business & Self-Employed
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Recruiter Support Platform</h2>
              <p className="text-slate-600 mt-1">Created by John Francis</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="https://www.linkedin.com/in/john-francis-eeemba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-1" />
                <span>Connect on LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Recruiter Support Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  link,
  badge,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  badge?: string
  onClick?: () => void
}) {
  const content = (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="bg-slate-50 p-3 rounded-lg">{icon}</div>
          {badge && <Badge variant="outline">{badge}</Badge>}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Explore <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {content}
      </div>
    )
  }

  return (
    <Link href={link} passHref>
      {content}
    </Link>
  )
}
