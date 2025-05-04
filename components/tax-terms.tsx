"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ExternalLink } from "lucide-react"

interface TaxTerm {
  term: string
  definition: string
  category: "general" | "forms" | "employment" | "international" | "deductions"
  relatedTerms?: string[]
}

const TAX_TERMS: TaxTerm[] = [
  {
    term: "W-2",
    definition:
      "A tax form issued by employers that reports an employee's annual wages and taxes withheld from their paycheck.",
    category: "forms",
    relatedTerms: ["Federal Income Tax", "FICA", "Withholding"],
  },
  {
    term: "1099-NEC",
    definition:
      "A tax form used to report payments made to independent contractors and non-employees for services performed.",
    category: "forms",
    relatedTerms: ["Independent Contractor", "Self-Employment Tax"],
  },
  {
    term: "W-4",
    definition:
      "A form completed by employees to indicate their tax situation and determine the amount of federal income tax to withhold from their pay.",
    category: "forms",
    relatedTerms: ["Withholding", "Allowances", "Federal Income Tax"],
  },
  {
    term: "W-8BEN",
    definition:
      "A form used by foreign individuals to certify their foreign status for tax purposes and claim tax treaty benefits if applicable.",
    category: "international",
    relatedTerms: ["Nonresident Alien", "Tax Treaty", "Foreign Income"],
  },
  {
    term: "W-9",
    definition: "A form used to provide a Taxpayer Identification Number (TIN) to entities that will be paying you.",
    category: "forms",
    relatedTerms: ["TIN", "SSN", "EIN"],
  },
  {
    term: "Federal Income Tax",
    definition:
      "A tax levied by the United States government on the annual earnings of individuals, corporations, trusts, and other legal entities.",
    category: "general",
    relatedTerms: ["Tax Bracket", "Marginal Tax Rate", "Withholding"],
  },
  {
    term: "FICA",
    definition:
      "Federal Insurance Contributions Act tax, which includes Social Security and Medicare taxes withheld from employee paychecks.",
    category: "employment",
    relatedTerms: ["Social Security", "Medicare", "Payroll Tax"],
  },
  {
    term: "Independent Contractor",
    definition:
      "A self-employed individual who provides services to a business but is not an employee of that business.",
    category: "employment",
    relatedTerms: ["1099-NEC", "Self-Employment Tax", "Schedule C"],
  },
  {
    term: "Employee",
    definition:
      "An individual who works for an employer and whose work, schedule, and methods are controlled by the employer.",
    category: "employment",
    relatedTerms: ["W-2", "FICA", "Withholding"],
  },
  {
    term: "Withholding",
    definition: "The amount of an employee's pay that is set aside to cover their estimated tax liability.",
    category: "employment",
    relatedTerms: ["W-4", "Federal Income Tax", "FICA"],
  },
  {
    term: "Tax Bracket",
    definition:
      "A range of incomes taxed at a specific rate. The U.S. has a progressive tax system with higher incomes taxed at higher rates.",
    category: "general",
    relatedTerms: ["Marginal Tax Rate", "Progressive Tax", "Federal Income Tax"],
  },
  {
    term: "Marginal Tax Rate",
    definition:
      "The tax rate applied to the last dollar of income earned. As income increases, it may be taxed at a higher marginal rate.",
    category: "general",
    relatedTerms: ["Tax Bracket", "Progressive Tax", "Effective Tax Rate"],
  },
  {
    term: "Effective Tax Rate",
    definition:
      "The average rate at which an individual or corporation is taxed on their income, calculated as total tax paid divided by total income.",
    category: "general",
    relatedTerms: ["Marginal Tax Rate", "Tax Bracket"],
  },
  {
    term: "Nonresident Alien",
    definition:
      "A foreign national who is not a U.S. citizen and does not meet the substantial presence test or green card test.",
    category: "international",
    relatedTerms: ["W-8BEN", "Foreign Income", "Tax Treaty"],
  },
  {
    term: "Resident Alien",
    definition:
      "A foreign national who is a lawful permanent resident (green card holder) or meets the substantial presence test.",
    category: "international",
    relatedTerms: ["Green Card Test", "Substantial Presence Test", "Foreign Income"],
  },
  {
    term: "Substantial Presence Test",
    definition:
      "A test used to determine if a foreign individual should be classified as a resident alien for tax purposes based on their physical presence in the U.S.",
    category: "international",
    relatedTerms: ["Resident Alien", "Nonresident Alien", "183-Day Rule"],
  },
  {
    term: "Tax Treaty",
    definition:
      "An agreement between two countries that determines how residents of each country are taxed on income earned in the other country.",
    category: "international",
    relatedTerms: ["W-8BEN", "Foreign Income", "Double Taxation"],
  },
  {
    term: "Foreign Earned Income Exclusion",
    definition:
      "A provision that allows U.S. citizens and resident aliens living abroad to exclude a certain amount of foreign earnings from U.S. taxation.",
    category: "international",
    relatedTerms: ["Form 2555", "Foreign Income", "Bona Fide Residence Test"],
  },
  {
    term: "Standard Deduction",
    definition:
      "A fixed amount that reduces the income subject to tax, available to taxpayers who do not itemize deductions.",
    category: "deductions",
    relatedTerms: ["Itemized Deductions", "Tax Return", "Adjusted Gross Income"],
  },
  {
    term: "Itemized Deductions",
    definition:
      "Specific expenses that taxpayers can deduct from their adjusted gross income to reduce taxable income, such as mortgage interest, charitable contributions, and medical expenses.",
    category: "deductions",
    relatedTerms: ["Schedule A", "Standard Deduction", "Tax Return"],
  },
]

export function TaxTerms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredTerms = TAX_TERMS.filter((term) => {
    const matchesSearch =
      searchTerm === "" ||
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search tax terms..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">{renderTerms(filteredTerms)}</div>
        </TabsContent>

        <TabsContent value="forms" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">{renderTerms(filteredTerms)}</div>
        </TabsContent>

        <TabsContent value="employment" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">{renderTerms(filteredTerms)}</div>
        </TabsContent>

        <TabsContent value="international" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">{renderTerms(filteredTerms)}</div>
        </TabsContent>

        <TabsContent value="deductions" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">{renderTerms(filteredTerms)}</div>
        </TabsContent>

        <TabsContent value="general" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">{renderTerms(filteredTerms)}</div>
        </TabsContent>
      </Tabs>

      {filteredTerms.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500">No tax terms match your search criteria.</p>
        </div>
      )}

      <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
        <h3 className="font-medium mb-2">Tax Resources</h3>
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
          <li>
            <a
              href="https://www.irs.gov/forms-instructions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" /> Forms & Instructions
            </a>
          </li>
        </ul>
      </div>
    </div>
  )

  function renderTerms(terms: TaxTerm[]) {
    return terms.map((term) => (
      <Card key={term.term} className="overflow-hidden">
        <CardHeader className="pb-2 bg-slate-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{term.term}</CardTitle>
            <Badge
              className={`
                ${term.category === "forms" ? "bg-blue-100 text-blue-800" : ""}
                ${term.category === "employment" ? "bg-green-100 text-green-800" : ""}
                ${term.category === "international" ? "bg-purple-100 text-purple-800" : ""}
                ${term.category === "deductions" ? "bg-amber-100 text-amber-800" : ""}
                ${term.category === "general" ? "bg-slate-100 text-slate-800" : ""}
              `}
            >
              {term.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p>{term.definition}</p>

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Related Terms:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {term.relatedTerms.map((relatedTerm) => (
                  <Badge key={relatedTerm} variant="outline">
                    {relatedTerm}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    ))
  }
}
