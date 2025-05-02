"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the visa type data structure
interface VisaType {
  name: string
  description: string
  duration: string
  sponsorship: string
  renewability: string
  dependents?: string
  workEligibility?: string
  path?: string
  quota?: string
  notes?: string
}

// Comprehensive visa data
const visaTypes: Record<string, VisaType> = {
  "H-1B": {
    name: "H-1B Specialty Occupation",
    description:
      "For professionals in specialized fields requiring theoretical and practical application of highly specialized knowledge.",
    duration: "3 years, extendable to 6 years total",
    sponsorship: "Employer must sponsor and file petition",
    renewability: "Renewable once for additional 3 years (6 years total)",
    dependents: "H-4 visa for spouse and unmarried children under 21",
    workEligibility: "Only for sponsoring employer",
    path: "Dual intent visa, can pursue permanent residency",
    quota: "Annual cap of 85,000 (20,000 reserved for US master's degree holders)",
    notes: "Premium processing available for expedited adjudication",
  },
  "L-1": {
    name: "L-1 Intracompany Transferee",
    description:
      "For employees of international companies transferring to a US office (L-1A for managers/executives, L-1B for specialized knowledge).",
    duration: "L-1A: Up to 7 years, L-1B: Up to 5 years",
    sponsorship: "Employer must have qualifying relationship with foreign entity",
    renewability: "Increments of 2 years until maximum duration",
    dependents: "L-2 visa for spouse and unmarried children under 21 (spouses eligible for work authorization)",
    workEligibility: "Only for sponsoring employer",
    path: "Dual intent visa, can pursue permanent residency",
    notes: "No annual quota, blanket petitions available for large companies",
  },
  "O-1": {
    name: "O-1 Extraordinary Ability",
    description: "For individuals with extraordinary abilities in sciences, arts, education, business, or athletics.",
    duration: "Initially up to 3 years",
    sponsorship: "Employer or agent must sponsor",
    renewability: "1-year increments with no maximum duration",
    dependents: "O-3 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Limited to activities specified in petition",
    path: "Can pursue permanent residency",
    notes: "Requires substantial documentation of extraordinary ability",
  },
  TN: {
    name: "TN NAFTA Professional",
    description: "For citizens of Canada and Mexico in specific professional categories under USMCA (formerly NAFTA).",
    duration: "Up to 3 years",
    sponsorship: "Job offer required but no petition needed for Canadians",
    renewability: "Unlimited renewals in 3-year increments",
    dependents: "TD visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Only for specific profession and employer",
    path: "Not dual intent, challenges with immigrant intent",
    notes: "Limited to professions listed in USMCA agreement",
  },
  "E-3": {
    name: "E-3 Australian Professional",
    description: "Specialty occupation visa specifically for Australian citizens.",
    duration: "2 years",
    sponsorship: "Employer must provide job offer",
    renewability: "Unlimited 2-year extensions",
    dependents: "E-3D for spouse and unmarried children under 21 (spouses eligible for work authorization)",
    workEligibility: "Only for sponsoring employer",
    path: "Not technically dual intent but can pursue permanent residency",
    quota: "Annual cap of 10,500 visas",
  },
  "F-1": {
    name: "F-1 Student",
    description: "For academic studies with Optional Practical Training (OPT) allowing temporary employment.",
    duration: "Duration of study program plus grace periods",
    sponsorship: "Accredited educational institution",
    renewability: "Valid as long as maintaining student status",
    dependents: "F-2 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "On-campus employment, CPT, OPT, and STEM OPT extension",
    path: "Not dual intent, but can change to dual intent status",
    notes: "12 months OPT, additional 24 months for STEM degrees",
  },
  "STEM OPT": {
    name: "STEM OPT Extension",
    description:
      "Extension of F-1 OPT for students with degrees in science, technology, engineering, and mathematics fields.",
    duration: "24 months extension after regular 12-month OPT",
    sponsorship: "Requires E-Verify employer",
    renewability: "One-time extension per degree level",
    workEligibility: "Must be related to STEM field of study",
    path: "Provides longer time to secure H-1B or other work visa",
    notes: "Requires formal training plan (I-983)",
  },
  "Green Card": {
    name: "Permanent Resident Card",
    description: "Authorization to live and work in the United States permanently.",
    duration: "10-year card (2 years for conditional)",
    sponsorship: "Family, employer, investment, or humanitarian grounds",
    renewability: "Card renewal required, status is permanent",
    dependents: "Spouse and unmarried children under 21 included in application or can be petitioned",
    workEligibility: "Unrestricted work authorization",
    path: "Can apply for US citizenship after 3-5 years",
    notes: "Conditional cards require removal of conditions after 2 years",
  },
}

export function VisaTypesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter visa types based on search term
  const filteredVisaTypes = Object.entries(visaTypes).filter(([key, visa]) => {
    const matchesSearch =
      visa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "work") {
      return matchesSearch && (key === "H-1B" || key === "L-1" || key === "O-1" || key === "TN" || key === "E-3")
    }
    if (activeTab === "student") {
      return matchesSearch && (key === "F-1" || key === "STEM OPT")
    }
    if (activeTab === "permanent") {
      return matchesSearch && key === "Green Card"
    }

    return matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search visa types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Visas</TabsTrigger>
            <TabsTrigger value="work">Work Visas</TabsTrigger>
            <TabsTrigger value="student">Student Visas</TabsTrigger>
            <TabsTrigger value="permanent">Permanent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredVisaTypes.map(([key, visa]) => (
          <Card key={key} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {visa.name}
                    <Badge variant="outline">{key}</Badge>
                  </CardTitle>
                  <CardDescription>{visa.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="font-medium text-muted-foreground">Duration</p>
                  <p>{visa.duration}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Sponsorship</p>
                  <p>{visa.sponsorship}</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Renewability</p>
                <p>{visa.renewability}</p>
              </div>
              {visa.dependents && (
                <div>
                  <p className="font-medium text-muted-foreground">Dependents</p>
                  <p>{visa.dependents}</p>
                </div>
              )}
              {visa.notes && (
                <div className="pt-2 border-t border-border">
                  <p className="italic text-xs text-muted-foreground">{visa.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVisaTypes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No visa types found matching your search.</p>
        </div>
      )}
    </div>
  )
}
