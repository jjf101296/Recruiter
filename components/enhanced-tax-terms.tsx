"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, DollarSign, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

// Simplified tax term interface
interface TaxTerm {
  term: string
  fullName?: string
  description: string
  advantages: string[]
  disadvantages: string[]
  bestFor: string[]
  category: "employment" | "contractor" | "business"
}

// Simplified tax terms data
const TAX_TERMS: TaxTerm[] = [
  {
    term: "W2",
    fullName: "IRS Form W-2",
    description:
      "Standard employment relationship where the employer withholds taxes, provides benefits, and issues a W-2 tax form at year-end.",
    advantages: [
      "Employer handles tax withholding",
      "Eligible for unemployment benefits",
      "Access to employer benefits (health insurance, 401(k), etc.)",
      "Worker's compensation coverage",
      "Paid time off (typically)",
      "Job security and protections",
    ],
    disadvantages: [
      "Less control over work schedule",
      "Limited tax deductions",
      "Fixed salary/hourly rate",
      "Less flexibility",
    ],
    bestFor: [
      "Long-term employment",
      "Those who prefer stability",
      "Candidates seeking benefits packages",
      "Individuals who don't want to handle tax complexities",
    ],
    category: "employment",
  },
  {
    term: "1099",
    fullName: "IRS Form 1099-NEC",
    description:
      "Independent contractor relationship where the worker is self-employed, responsible for their own taxes, and receives a 1099-NEC form for tax reporting.",
    advantages: [
      "Greater autonomy and flexibility",
      "Ability to work with multiple clients",
      "More tax deductions available",
      "Potential for higher pay rates",
      "Control over work methods and schedule",
    ],
    disadvantages: [
      "Self-employment taxes (15.3% for Social Security/Medicare)",
      "No employer benefits",
      "No unemployment insurance",
      "No worker's compensation",
      "Responsible for quarterly estimated tax payments",
      "Less job security",
    ],
    bestFor: [
      "Professionals seeking flexibility",
      "Those with multiple income sources",
      "Workers who want control over their schedule",
      "Specialized consultants",
    ],
    category: "contractor",
  },
  {
    term: "C2C",
    fullName: "Corp-to-Corp",
    description:
      "Business-to-business relationship where a contractor's corporation provides services to a client corporation, typically with a formal contract and invoicing.",
    advantages: [
      "Higher billing rates than W2",
      "Significant tax advantages and deductions",
      "Ability to build business equity",
      "Can hire employees/subcontractors",
      "Limited liability protection",
      "Potential for retirement plans with higher contribution limits",
    ],
    disadvantages: [
      "Administrative overhead (incorporation, accounting, etc.)",
      "Compliance requirements (business licenses, insurance)",
      "More complex tax filing",
      "Startup costs",
      "Need to manage business operations",
    ],
    bestFor: [
      "Established consultants and contractors",
      "Those planning to scale beyond individual work",
      "Professionals seeking maximum tax advantages",
      "Workers with significant business expenses",
    ],
    category: "business",
  },
]

export function EnhancedTaxTerms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredTerms = TAX_TERMS.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (term.fullName && term.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && term.category === activeTab
  })

  const categories = [
    { id: "all", name: "All Terms" },
    { id: "employment", name: "Employment" },
    { id: "contractor", name: "Contractor" },
    { id: "business", name: "Business" },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "employment":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "contractor":
        return "bg-green-100 text-green-800 border-green-200"
      case "business":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 border-t-4 border-t-green-500 shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center">
            <DollarSign className="h-6 w-6 mr-2 text-green-600" />
            Tax Terms Glossary
          </CardTitle>
          <CardDescription>Essential tax and employment terms for U.S. recruiters and job seekers</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search terms..."
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTerms.map((term) => (
                  <Card key={term.term} className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow">
                    <CardHeader className={`${getCategoryColor(term.category)} bg-opacity-30`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">{term.term}</CardTitle>
                        <Badge className={getCategoryColor(term.category)}>{term.category}</Badge>
                      </div>
                      {term.fullName && <CardDescription>{term.fullName}</CardDescription>}
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="mb-4">{term.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                          Advantages
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {term.advantages.map((advantage, i) => (
                            <li key={i} className="text-sm">
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1.5" />
                          Disadvantages
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {term.disadvantages.map((disadvantage, i) => (
                            <li key={i} className="text-sm">
                              {disadvantage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Best For</h4>
                        <div className="flex flex-wrap gap-2">
                          {term.bestFor.map((item, i) => (
                            <Badge key={i} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTerms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tax terms found matching your search.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
