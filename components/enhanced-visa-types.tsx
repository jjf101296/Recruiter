"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Visa type interface
interface VisaType {
  name: string
  code: string
  description: string
  duration: string
  maxStay?: string
  eligibility: string[]
  sponsorship: string
  renewability: string
  dependents: string
  workEligibility: string
  path: string
  quota?: string
  premiumProcessing?: string
  notes?: string
  category: "work" | "student" | "visitor" | "permanent" | "dependent" | "other"
  riskLevel: "low" | "medium" | "high"
  timeline: {
    preparation: string
    processing: string
    extension: string
  }
  requiredDocuments: string[]
  advantages: string[]
  disadvantages: string[]
  comparisonFactors: {
    cost: number // 1-10 scale
    complexity: number // 1-10 scale
    stability: number // 1-10 scale
    flexibility: number // 1-10 scale
    pathToPermanence: number // 1-10 scale
  }
}

// Enhanced US visa types with descriptions
const ENHANCED_VISA_TYPES: Record<string, VisaType> = {
  USC: {
    name: "U.S. Citizen",
    code: "USC",
    description:
      "A person who was born in the United States or who has been granted citizenship after meeting specific requirements.",
    duration: "Permanent",
    eligibility: [
      "Born in the United States or U.S. territories",
      "Born to U.S. citizen parents (with certain conditions)",
      "Naturalized after meeting residency and other requirements",
    ],
    sponsorship: "N/A",
    renewability: "N/A",
    dependents: "Can sponsor family members for immigration",
    workEligibility: "Unrestricted work authorization",
    path: "N/A (already a citizen)",
    category: "permanent",
    riskLevel: "low",
    timeline: {
      preparation: "N/A",
      processing: "N/A",
      extension: "N/A",
    },
    requiredDocuments: ["Birth certificate", "U.S. passport", "Certificate of naturalization (if applicable)"],
    advantages: [
      "Unrestricted right to live and work in the U.S.",
      "Cannot be deported",
      "Can vote in elections",
      "Can run for most public offices",
      "Can obtain a U.S. passport",
    ],
    disadvantages: [
      "Subject to U.S. tax on worldwide income",
      "May have limited ability for dual citizenship depending on other country",
    ],
    comparisonFactors: {
      cost: 1,
      complexity: 1,
      stability: 10,
      flexibility: 10,
      pathToPermanence: 10,
    },
  },
  GC: {
    name: "Green Card (Permanent Resident)",
    code: "GC",
    description:
      "Legal permanent residency status that allows individuals to live and work permanently in the United States.",
    duration: "10-year card (2 years for conditional)",
    eligibility: [
      "Family sponsorship",
      "Employment sponsorship",
      "Investment (EB-5)",
      "Refugee or asylum status",
      "Diversity visa lottery",
      "Special categories",
    ],
    sponsorship: "Family, employer, self-sponsorship (certain categories)",
    renewability: "Card renewal required, status is permanent",
    dependents: "Spouse and unmarried children under 21 included in application or can be petitioned",
    workEligibility: "Unrestricted work authorization",
    path: "Can apply for U.S. citizenship after 3-5 years",
    category: "permanent",
    riskLevel: "low",
    timeline: {
      preparation: "1-6 months",
      processing: "10 months - 3+ years (depends on category)",
      extension: "Card renewal every 10 years (process takes 6-12 months)",
    },
    requiredDocuments: [
      "Form I-485 or consular processing forms",
      "Birth certificate",
      "Marriage certificate (if applicable)",
      "Medical examination",
      "Police certificates",
      "Employment verification (if applicable)",
      "Financial support evidence",
    ],
    advantages: [
      "Permanent right to live and work in the U.S.",
      "Can change employers freely",
      "Can sponsor certain family members",
      "Access to most government benefits after 5 years",
      "Can travel freely (with certain limitations)",
    ],
    disadvantages: [
      "Cannot vote or run for public office",
      "Can be deported for certain criminal convictions",
      "Must maintain residence in the U.S.",
      "Subject to U.S. tax on worldwide income",
    ],
    comparisonFactors: {
      cost: 7,
      complexity: 8,
      stability: 9,
      flexibility: 9,
      pathToPermanence: 9,
    },
  },
  H1B: {
    name: "H-1B Specialty Occupation",
    code: "H1B",
    description:
      "For professionals in specialized fields requiring theoretical and practical application of highly specialized knowledge.",
    duration: "3 years, extendable to 6 years total",
    maxStay: "6 years (exceptions available if in green card process)",
    eligibility: [
      "Bachelor's degree or higher (or equivalent)",
      "Job requires specialized knowledge",
      "Employer willing to sponsor",
      "Position must meet prevailing wage requirements",
    ],
    sponsorship: "Employer must sponsor and file petition",
    renewability: "Renewable once for additional 3 years (6 years total)",
    dependents: "H-4 visa for spouse and unmarried children under 21",
    workEligibility: "Only for sponsoring employer",
    path: "Dual intent visa, can pursue permanent residency",
    quota: "Annual cap of 85,000 (20,000 reserved for US master's degree holders)",
    premiumProcessing: "Available for expedited adjudication (15 calendar days)",
    notes: "Subject to lottery if cap is reached",
    category: "work",
    riskLevel: "medium",
    timeline: {
      preparation: "1-2 months",
      processing: "Regular: 4-8 months, Premium: 15 days",
      extension: "Similar to initial application",
    },
    requiredDocuments: [
      "Form I-129 petition",
      "Labor Condition Application (LCA)",
      "Proof of specialized knowledge",
      "Degree certificates and transcripts",
      "Resume/CV",
      "Company documents for employer",
    ],
    advantages: [
      "Path to permanent residency",
      "Spouse may be eligible for work authorization",
      "Premium processing available",
      "Relatively stable visa category",
      "Recognized by employers",
    ],
    disadvantages: [
      "Lottery system",
      "Employer-specific",
      "Processing delays",
      "Prevailing wage requirements",
      "Limited duration",
    ],
    comparisonFactors: {
      cost: 8,
      complexity: 7,
      stability: 7,
      flexibility: 5,
      pathToPermanence: 8,
    },
  },
  L1: {
    name: "L-1 Intracompany Transferee",
    code: "L1",
    description:
      "For employees of international companies transferring to a US office (L-1A for managers/executives, L-1B for specialized knowledge).",
    duration: "L-1A: Up to 7 years, L-1B: Up to 5 years",
    maxStay: "L-1A: 7 years, L-1B: 5 years",
    eligibility: [
      "Worked for foreign affiliate for at least 1 year in past 3 years",
      "Transferring to U.S. branch, parent, subsidiary, or affiliate",
      "Position as manager/executive (L-1A) or specialized knowledge employee (L-1B)",
    ],
    sponsorship: "Employer must have qualifying relationship with foreign entity",
    renewability: "Increments of 2 years until maximum duration",
    dependents: "L-2 visa for spouse and unmarried children under 21 (spouses eligible for work authorization)",
    workEligibility: "Only for sponsoring employer",
    path: "Dual intent visa, can pursue permanent residency",
    premiumProcessing: "Available for expedited adjudication",
    notes: "No annual quota, blanket petitions available for large companies",
    category: "work",
    riskLevel: "medium",
    timeline: {
      preparation: "1-3 months",
      processing: "Regular: 3-5 months, Premium: 15 days",
      extension: "Similar to initial application",
    },
    requiredDocuments: [
      "Form I-129 petition",
      "Evidence of qualifying relationship between companies",
      "Proof of employment abroad for one year",
      "Job descriptions for foreign and U.S. positions",
    ],
    advantages: [
      "Path to permanent residency",
      "No annual quota",
      "Blanket petitions available for large companies",
      "Spouse eligible for work authorization",
    ],
    disadvantages: [
      "Employer-specific",
      "Qualifying relationship required",
      "Limited duration",
      "Specialized knowledge can be difficult to prove (L-1B)",
    ],
    comparisonFactors: {
      cost: 7,
      complexity: 6,
      stability: 8,
      flexibility: 6,
      pathToPermanence: 7,
    },
  },
}

export { ENHANCED_VISA_TYPES }

export function EnhancedVisaTypes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedVisa, setExpandedVisa] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    riskLevel: [] as ("low" | "medium" | "high")[],
    workEligibility: [] as string[],
    duration: [] as string[],
  })

  const toggleExpand = (visaCode: string) => {
    setExpandedVisa(expandedVisa === visaCode ? null : visaCode)
  }

  const toggleFilter = (category: keyof typeof filters, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((v) => v !== value)
      } else {
        newFilters[category] = [...newFilters[category], value]
      }
      return newFilters
    })
  }

  const filteredVisas = Object.values(ENHANCED_VISA_TYPES).filter((visa) => {
    const matchesSearch =
      visa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = activeTab === "all" || visa.category === activeTab

    const matchesFilters =
      (filters.riskLevel.length === 0 || filters.riskLevel.includes(visa.riskLevel)) &&
      (filters.workEligibility.length === 0 || filters.workEligibility.includes(visa.workEligibility)) &&
      (filters.duration.length === 0 || filters.duration.includes(visa.duration))

    return matchesSearch && matchesCategory && matchesFilters
  })

  const categories = [
    { id: "all", name: "All Visas" },
    { id: "work", name: "Work Visas" },
    { id: "student", name: "Student Visas" },
    { id: "visitor", name: "Visitor Visas" },
    { id: "permanent", name: "Permanent Residency" },
    { id: "dependent", name: "Dependent Visas" },
    { id: "other", name: "Other Visas" },
  ]

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">U.S. Visa Types</CardTitle>
              <CardDescription>
                Comprehensive guide to U.S. visa categories, requirements, and work eligibility
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 self-start md:self-auto"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
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

          {showFilters && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
              <h4 className="font-medium mb-3">Filter by:</h4>

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Risk Level</h5>
                  <div className="flex flex-wrap gap-2">
                    {["low", "medium", "high"].map((level) => (
                      <Badge
                        key={level}
                        variant={filters.riskLevel.includes(level as any) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter("riskLevel", level)}
                      >
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${getRiskLevelColor(level)}`}></span>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Work Eligibility</h5>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(Object.values(ENHANCED_VISA_TYPES).map((v) => v.workEligibility))).map(
                      (eligibility) => (
                        <Badge
                          key={eligibility}
                          variant={filters.workEligibility.includes(eligibility) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilter("workEligibility", eligibility)}
                        >
                          {eligibility}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Duration</h5>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(Object.values(ENHANCED_VISA_TYPES).map((v) => v.duration))).map((duration) => (
                      <Badge
                        key={duration}
                        variant={filters.duration.includes(duration) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter("duration", duration)}
                      >
                        {duration}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFilters({
                      riskLevel: [],
                      workEligibility: [],
                      duration: [],
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
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
              <div className="space-y-6">
                {filteredVisas.map((visa) => (
                  <Card key={visa.code} className="overflow-hidden">
                    <CardHeader
                      className="bg-gray-50 dark:bg-gray-800 cursor-pointer"
                      onClick={() => toggleExpand(visa.code)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getRiskLevelColor(visa.riskLevel)} text-white`}>{visa.code}</Badge>
                          <CardTitle className="text-xl font-bold">{visa.name}</CardTitle>
                        </div>
                        {expandedVisa === visa.code ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </CardHeader>

                    {expandedVisa === visa.code && (
                      <CardContent className="pt-4">
                        <p className="mb-4">{visa.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold mb-3">Key Details</h4>
                            <ul className="space-y-2">
                              <li>
                                <span className="font-medium">Duration:</span> {visa.duration}
                              </li>
                              {visa.maxStay && (
                                <li>
                                  <span className="font-medium">Maximum Stay:</span> {visa.maxStay}
                                </li>
                              )}
                              <li>
                                <span className="font-medium">Sponsorship:</span> {visa.sponsorship}
                              </li>
                              <li>
                                <span className="font-medium">Renewability:</span> {visa.renewability}
                              </li>
                              <li>
                                <span className="font-medium">Dependents:</span> {visa.dependents}
                              </li>
                              <li>
                                <span className="font-medium">Work Eligibility:</span> {visa.workEligibility}
                              </li>
                              <li>
                                <span className="font-medium">Path to Permanent Residency:</span> {visa.path}
                              </li>
                              {visa.quota && (
                                <li>
                                  <span className="font-medium">Annual Quota:</span> {visa.quota}
                                </li>
                              )}
                              {visa.premiumProcessing && (
                                <li>
                                  <span className="font-medium">Premium Processing:</span> {visa.premiumProcessing}
                                </li>
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Timeline</h4>
                            <ul className="space-y-2">
                              <li>
                                <span className="font-medium">Preparation Time:</span> {visa.timeline.preparation}
                              </li>
                              <li>
                                <span className="font-medium">Processing Time:</span> {visa.timeline.processing}
                              </li>
                              <li>
                                <span className="font-medium">Extension Process:</span> {visa.timeline.extension}
                              </li>
                            </ul>

                            <h4 className="font-semibold mt-6 mb-3">Risk Assessment</h4>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">Risk Level:</span>
                              <Badge className={`${getRiskLevelColor(visa.riskLevel)} text-white`}>
                                {visa.riskLevel.charAt(0).toUpperCase() + visa.riskLevel.slice(1)}
                              </Badge>
                            </div>
                            {visa.notes && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{visa.notes}</p>
                            )}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Eligibility Requirements</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {visa.eligibility.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Required Documents</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {visa.requiredDocuments.map((doc, i) => (
                              <li key={i}>{doc}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold mb-3">Advantages</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {visa.advantages.map((advantage, i) => (
                                <li key={i}>{advantage}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Disadvantages</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {visa.disadvantages.map((disadvantage, i) => (
                                <li key={i}>{disadvantage}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Comparison Factors</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Cost</span>
                                <span className="text-sm">{visa.comparisonFactors.cost}/10</span>
                              </div>
                              <Progress value={visa.comparisonFactors.cost * 10} className="h-2" />
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Complexity</span>
                                <span className="text-sm">{visa.comparisonFactors.complexity}/10</span>
                              </div>
                              <Progress value={visa.comparisonFactors.complexity * 10} className="h-2" />
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Stability</span>
                                <span className="text-sm">{visa.comparisonFactors.stability}/10</span>
                              </div>
                              <Progress value={visa.comparisonFactors.stability * 10} className="h-2" />
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Flexibility</span>
                                <span className="text-sm">{visa.comparisonFactors.flexibility}/10</span>
                              </div>
                              <Progress value={visa.comparisonFactors.flexibility * 10} className="h-2" />
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Path to Permanence</span>
                                <span className="text-sm">{visa.comparisonFactors.pathToPermanence}/10</span>
                              </div>
                              <Progress value={visa.comparisonFactors.pathToPermanence * 10} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}

                {filteredVisas.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No visa types found matching your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visa Comparison</CardTitle>
          <CardDescription>Compare different visa types to find the best option for your situation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Visa Type</th>
                  <th className="text-left p-2">Duration</th>
                  <th className="text-left p-2">Work Eligibility</th>
                  <th className="text-left p-2">Risk Level</th>
                  <th className="text-left p-2">Path to Green Card</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(ENHANCED_VISA_TYPES).map((visa) => (
                  <tr key={visa.code} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-2">
                      <div className="font-medium">{visa.code}</div>
                      <div className="text-sm text-gray-500">{visa.name}</div>
                    </td>
                    <td className="p-2">{visa.duration}</td>
                    <td className="p-2">{visa.workEligibility}</td>
                    <td className="p-2">
                      <Badge className={`${getRiskLevelColor(visa.riskLevel)} text-white`}>{visa.riskLevel}</Badge>
                    </td>
                    <td className="p-2">{visa.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
