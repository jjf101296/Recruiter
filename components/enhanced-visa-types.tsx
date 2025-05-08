"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"

// Simplified visa type interface
interface VisaType {
  name: string
  code: string
  description: string
  category: string
  eligibility: string[]
  workEligibility: string
  duration: string
  dependents: string
  notes?: string
}

// Simplified US visa types with descriptions
const VISA_TYPES: VisaType[] = [
  {
    name: "U.S. Citizen",
    code: "USC",
    description: "A person who was born in the United States or who has been granted citizenship.",
    category: "permanent",
    eligibility: ["Born in the US", "Naturalized after meeting requirements"],
    workEligibility: "Unrestricted",
    duration: "Permanent",
    dependents: "Can sponsor family members",
    notes: "Full rights and privileges of US citizenship",
  },
  {
    name: "Green Card (Permanent Resident)",
    code: "GC",
    description: "Legal permanent residency status that allows individuals to live and work permanently in the US.",
    category: "permanent",
    eligibility: ["Family sponsorship", "Employment sponsorship", "Investment", "Diversity visa"],
    workEligibility: "Unrestricted",
    duration: "10-year card (2 years for conditional)",
    dependents: "Spouse and unmarried children under 21",
    notes: "Can apply for citizenship after 3-5 years",
  },
  {
    name: "Employment-Based Green Card (EB-3)",
    code: "EB-3",
    description: "Green card category for skilled workers, professionals, and other workers.",
    category: "permanent",
    eligibility: ["Bachelor's degree", "2+ years experience", "Labor certification"],
    workEligibility: "Unrestricted once approved",
    duration: "Permanent",
    dependents: "Spouse and unmarried children under 21",
    notes: "Processing times vary by country of birth",
  },
  {
    name: "H-1B Specialty Occupation",
    code: "H1B",
    description:
      "For professionals in specialized fields requiring theoretical and practical application of knowledge.",
    category: "work",
    eligibility: ["Bachelor's degree or higher", "Job requires specialized knowledge"],
    workEligibility: "Only for sponsoring employer",
    duration: "3 years, extendable to 6 years total",
    dependents: "H-4 visa for spouse and children under 21",
    notes: "Annual cap of 85,000 visas",
  },
  {
    name: "H-4 Dependent",
    code: "H4",
    description: "For spouses and children of H-1B visa holders.",
    category: "dependent",
    eligibility: ["Spouse or child under 21 of H-1B holder"],
    workEligibility: "Eligible if H-1B holder has approved I-140",
    duration: "Same as primary H-1B holder",
    dependents: "N/A",
    notes: "H-4 EAD allows work authorization for eligible spouses",
  },
  {
    name: "H-4 EAD (Employment Authorization)",
    code: "H4EAD",
    description: "Work authorization for certain H-4 visa holders.",
    category: "work",
    eligibility: ["H-4 spouse of H-1B with approved I-140"],
    workEligibility: "Unrestricted while valid",
    duration: "Typically 2 years, renewable",
    dependents: "N/A",
    notes: "Allows H-4 spouse to work for any employer",
  },
  {
    name: "Green Card EAD",
    code: "GCEAD",
    description: "Work authorization while green card application is pending.",
    category: "work",
    eligibility: ["Pending adjustment of status (I-485)"],
    workEligibility: "Unrestricted while valid",
    duration: "Typically 2 years, renewable",
    dependents: "N/A",
    notes: "Allows applicant to work while green card is processing",
  },
  {
    name: "Optional Practical Training",
    code: "OPT",
    description: "Work authorization for F-1 students after completing their degree.",
    category: "student",
    eligibility: ["F-1 student who completed degree program"],
    workEligibility: "Work related to field of study",
    duration: "12 months (24-month extension for STEM)",
    dependents: "N/A",
    notes: "STEM extension available for eligible fields",
  },
  {
    name: "Curricular Practical Training",
    code: "CPT",
    description: "Work authorization for F-1 students as part of curriculum.",
    category: "student",
    eligibility: ["F-1 student enrolled in curriculum-required training"],
    workEligibility: "Work related to field of study",
    duration: "While enrolled in program",
    dependents: "N/A",
    notes: "Must be integral part of established curriculum",
  },
  {
    name: "L-1 Intracompany Transferee",
    code: "L1",
    description: "For employees transferring to a US office of the same company.",
    category: "work",
    eligibility: ["Worked for foreign affiliate for 1+ year in past 3 years"],
    workEligibility: "Only for sponsoring employer",
    duration: "L-1A: Up to 7 years, L-1B: Up to 5 years",
    dependents: "L-2 visa for spouse and children under 21",
    notes: "L-1A for managers/executives, L-1B for specialized knowledge",
  },
  {
    name: "L-2 Dependent",
    code: "L2",
    description: "For spouses and children of L-1 visa holders.",
    category: "dependent",
    eligibility: ["Spouse or child under 21 of L-1 holder"],
    workEligibility: "Spouses eligible for work authorization",
    duration: "Same as primary L-1 holder",
    dependents: "N/A",
    notes: "Spouses can apply for EAD",
  },
  {
    name: "E-3 Australian Professional",
    code: "E3",
    description: "For Australian citizens in specialty occupations.",
    category: "work",
    eligibility: ["Australian citizen", "Bachelor's degree or higher", "Specialty occupation"],
    workEligibility: "Only for sponsoring employer",
    duration: "2 years, renewable indefinitely",
    dependents: "E-3D for spouse and children under 21",
    notes: "Annual cap of 10,500 visas",
  },
]

export function EnhancedVisaTypes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredVisas = VISA_TYPES.filter((visa) => {
    const matchesSearch =
      visa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && visa.category === activeTab
  })

  const categories = [
    { id: "all", name: "All Visas" },
    { id: "work", name: "Work Visas" },
    { id: "student", name: "Student Visas" },
    { id: "permanent", name: "Permanent Residency" },
    { id: "dependent", name: "Dependent Visas" },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "student":
        return "bg-green-100 text-green-800 border-green-200"
      case "permanent":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "dependent":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 border-t-4 border-t-blue-500 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">U.S. Visa Types</CardTitle>
              <CardDescription>
                Comprehensive guide to U.S. visa categories, requirements, and work eligibility
              </CardDescription>
            </div>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search visa types..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex flex-wrap">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex-grow">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredVisas.map((visa) => (
                  <Card key={visa.code} className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow">
                    <CardHeader className={`${getCategoryColor(visa.category)} bg-opacity-30 pb-3`}>
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(visa.category)}>{visa.code}</Badge>
                        <Badge variant="outline" className={getCategoryColor(visa.category)}>
                          {visa.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{visa.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-600 mb-4">{visa.description}</p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Work Eligibility
                          </h4>
                          <p className="text-sm font-medium">{visa.workEligibility}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Duration
                          </h4>
                          <p className="text-sm">{visa.duration}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Dependents
                          </h4>
                          <p className="text-sm">{visa.dependents}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Eligibility
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {visa.eligibility.map((item, i) => (
                              <li key={i} className="text-sm">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {visa.notes && (
                          <div className="bg-slate-50 p-2 rounded border border-slate-200 mt-2">
                            <div className="flex items-start">
                              <FileText className="h-4 w-4 text-slate-500 mt-0.5 mr-1.5 flex-shrink-0" />
                              <p className="text-xs text-slate-600">{visa.notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredVisas.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No visa types found matching your criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
