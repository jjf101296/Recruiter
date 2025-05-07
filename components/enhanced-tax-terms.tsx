"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Tax term interface
interface TaxTerm {
  term: string
  fullName?: string
  description: string
  advantages: string[]
  disadvantages: string[]
  bestFor: string[]
  category: "employment" | "contractor" | "business" | "tax" | "other"
  commonQuestions: {
    question: string
    answer: string
  }[]
}

// Enhanced tax terms data
const TAX_TERMS: Record<string, TaxTerm> = {
  W2: {
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
    commonQuestions: [
      {
        question: "Do W2 employees pay their own taxes?",
        answer:
          "No, employers withhold federal, state, and local taxes, as well as Social Security and Medicare taxes from each paycheck.",
      },
      {
        question: "Can W2 employees deduct business expenses?",
        answer:
          "Generally no. The Tax Cuts and Jobs Act eliminated most unreimbursed employee business expense deductions for tax years 2018-2025.",
      },
      {
        question: "Are W2 employees eligible for overtime?",
        answer:
          "Yes, non-exempt W2 employees are entitled to overtime pay (1.5x regular rate) for hours worked beyond 40 per week.",
      },
    ],
  },
  "1099": {
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
    commonQuestions: [
      {
        question: "How do 1099 contractors pay taxes?",
        answer:
          "1099 contractors must pay quarterly estimated taxes and are responsible for both the employer and employee portions of Social Security and Medicare taxes (15.3% total).",
      },
      {
        question: "What expenses can 1099 contractors deduct?",
        answer:
          "Business expenses including home office, travel, equipment, supplies, insurance, professional services, and a portion of self-employment taxes.",
      },
      {
        question: "Can a 1099 contractor also be a W2 employee?",
        answer:
          "Yes, it's possible to be both a W2 employee at one job and a 1099 contractor for other work, but not for the same company in the same role.",
      },
    ],
  },
  C2C: {
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
    commonQuestions: [
      {
        question: "What business entity is best for C2C?",
        answer:
          "Most C2C contractors operate as an S-Corporation or LLC taxed as an S-Corp to optimize tax benefits while maintaining liability protection.",
      },
      {
        question: "What insurance is needed for C2C?",
        answer:
          "Typically general liability insurance, professional liability (E&O), and sometimes cyber liability insurance. Clients may specify minimum coverage amounts.",
      },
      {
        question: "How does C2C taxation work?",
        answer:
          "With an S-Corp structure, owners can pay themselves a reasonable salary (subject to employment taxes) and take remaining profits as distributions (not subject to self-employment tax).",
      },
    ],
  },
}

export { TAX_TERMS }

export function EnhancedTaxTerms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredTerms = Object.values(TAX_TERMS).filter((term) => {
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
    { id: "tax", name: "Tax" },
    { id: "other", name: "Other" },
  ]

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Tax Terms Glossary</CardTitle>
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
                  <Card key={term.term} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">{term.term}</CardTitle>
                        <Badge variant="outline">{term.category}</Badge>
                      </div>
                      {term.fullName && <CardDescription>{term.fullName}</CardDescription>}
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="mb-4">{term.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Advantages</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {term.advantages.map((advantage, i) => (
                            <li key={i} className="text-sm">
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Disadvantages</h4>
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

      <Card>
        <CardHeader>
          <CardTitle>Common Questions</CardTitle>
          <CardDescription>Frequently asked questions about tax and employment terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.values(TAX_TERMS).flatMap((term) =>
              term.commonQuestions.map((qa, i) => (
                <div key={`${term.term}-${i}`} className="border-b pb-4 last:border-0">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Badge className="mr-2">{term.term}</Badge>
                    {qa.question}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">{qa.answer}</p>
                </div>
              )),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
