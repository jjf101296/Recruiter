"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download } from "lucide-react"

// Define visa type interface
interface VisaType {
  name: string
  description: string
  duration: string
  sponsorship: string
  renewability: string
  dependents: string
  workEligibility: string
  path: string
  quota?: string
  notes?: string
  category: "work" | "student" | "visitor" | "permanent" | "dependent" | "other"
}

// Define US visa types with descriptions
const US_VISA_TYPES: Record<string, VisaType> = {
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
    category: "work",
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
    category: "work",
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
    category: "work",
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
    category: "work",
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
    category: "work",
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
    category: "student",
  },
  "J-1": {
    name: "J-1 Exchange Visitor",
    description: "For educational and cultural exchange programs.",
    duration: "Varies by program category (typically 1-5 years)",
    sponsorship: "Designated sponsor organization required",
    renewability: "Varies by program category",
    dependents: "J-2 visa for spouse and unmarried children under 21 (eligible for work authorization)",
    workEligibility: "Limited to program activities",
    path: "Some categories subject to 2-year home residency requirement",
    notes: "Multiple categories including researchers, professors, students, au pairs, etc.",
    category: "student",
  },
  "EB-1": {
    name: "EB-1 Priority Workers",
    description:
      "Employment-based first preference for priority workers (extraordinary ability, outstanding professors/researchers, multinational executives).",
    duration: "Permanent residency (Green Card)",
    sponsorship: "Employer sponsorship or self-petition (for extraordinary ability)",
    renewability: "N/A (permanent)",
    dependents: "Spouse and unmarried children under 21 included",
    workEligibility: "Unrestricted work authorization",
    path: "Direct path to permanent residency",
    notes: "No labor certification required, priority processing",
    category: "permanent",
  },
  "EB-2": {
    name: "EB-2 Advanced Degree Professionals",
    description: "Employment-based second preference for professionals with advanced degrees or exceptional ability.",
    duration: "Permanent residency (Green Card)",
    sponsorship: "Employer sponsorship or self-petition with National Interest Waiver",
    renewability: "N/A (permanent)",
    dependents: "Spouse and unmarried children under 21 included",
    workEligibility: "Unrestricted work authorization",
    path: "Direct path to permanent residency",
    notes: "Labor certification typically required unless waived",
    category: "permanent",
  },
  "EB-3": {
    name: "EB-3 Skilled Workers and Professionals",
    description: "Employment-based third preference for skilled workers, professionals, and other workers.",
    duration: "Permanent residency (Green Card)",
    sponsorship: "Employer sponsorship required",
    renewability: "N/A (permanent)",
    dependents: "Spouse and unmarried children under 21 included",
    workEligibility: "Unrestricted work authorization",
    path: "Direct path to permanent residency",
    notes: "Labor certification required, longer wait times than EB-1/EB-2",
    category: "permanent",
  },
  "B-1/B-2": {
    name: "B-1/B-2 Business/Tourist Visitor",
    description: "For temporary business or tourism visits to the United States.",
    duration: "Up to 6 months, typically granted for shorter periods",
    sponsorship: "No sponsor required",
    renewability: "Extensions possible in 6-month increments",
    dependents: "Each family member needs separate B visa",
    workEligibility: "No work authorization, limited to business activities (B-1) or tourism (B-2)",
    path: "Not dual intent, must maintain foreign residence",
    notes: "Cannot receive salary from US source",
    category: "visitor",
  },
  "H-4": {
    name: "H-4 Dependent",
    description: "For spouses and children of H-1B visa holders.",
    duration: "Same as primary H-1B holder",
    sponsorship: "Derived from H-1B holder",
    renewability: "Same as primary H-1B holder",
    workEligibility: "EAD available for spouses of certain H-1B holders (those with approved I-140)",
    path: "Follows primary H-1B holder's path",
    notes: "Children lose status at age 21",
    category: "dependent",
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
    category: "permanent",
  },
}

export function VisaTypesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedVisa, setSelectedVisa] = useState<string | null>(null)
  const [showVisaDetails, setShowVisaDetails] = useState(false)

  const handleVisaClick = (visaCode: string) => {
    setSelectedVisa(visaCode)
    setShowVisaDetails(true)
  }

  const filteredVisaTypes = Object.entries(US_VISA_TYPES).filter(([code, visa]) => {
    const matchesSearch =
      searchTerm === "" ||
      code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || visa.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search visa types..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          <Button
            variant={selectedCategory === "work" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("work")}
          >
            Work
          </Button>
          <Button
            variant={selectedCategory === "student" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("student")}
          >
            Student
          </Button>
          <Button
            variant={selectedCategory === "permanent" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("permanent")}
          >
            Permanent
          </Button>
          <Button
            variant={selectedCategory === "visitor" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("visitor")}
          >
            Visitor
          </Button>
          <Button
            variant={selectedCategory === "dependent" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("dependent")}
          >
            Dependent
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVisaTypes.map(([visaCode, visaInfo]) => (
          <Card
            key={visaCode}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleVisaClick(visaCode)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge
                  className={`
                    ${visaInfo.category === "work" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""}
                    ${visaInfo.category === "student" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                    ${visaInfo.category === "permanent" ? "bg-purple-100 text-purple-800 hover:bg-purple-200" : ""}
                    ${visaInfo.category === "visitor" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : ""}
                    ${visaInfo.category === "dependent" ? "bg-pink-100 text-pink-800 hover:bg-pink-200" : ""}
                    ${visaInfo.category === "other" ? "bg-slate-100 text-slate-800 hover:bg-slate-200" : ""}
                  `}
                >
                  {visaInfo.category.charAt(0).toUpperCase() + visaInfo.category.slice(1)}
                </Badge>
                <Badge variant="outline">{visaCode}</Badge>
              </div>
              <CardTitle className="mt-2">{visaInfo.name}</CardTitle>
              <CardDescription className="line-clamp-2">{visaInfo.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                <p className="font-medium text-muted-foreground">Duration</p>
                <p>{visaInfo.duration}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Work Eligibility</p>
                <p className="line-clamp-1">{visaInfo.workEligibility}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVisaTypes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500">No visa types match your search criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Visa Details Dialog */}
      <Dialog open={showVisaDetails} onOpenChange={setShowVisaDetails}>
        <DialogContent className="max-w-3xl">
          {selectedVisa && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{US_VISA_TYPES[selectedVisa].name}</DialogTitle>
                  <Badge variant="outline">{selectedVisa}</Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium">Description</h4>
                    <p>{US_VISA_TYPES[selectedVisa].description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Duration</h4>
                      <p>{US_VISA_TYPES[selectedVisa].duration}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Renewability</h4>
                      <p>{US_VISA_TYPES[selectedVisa].renewability}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Work Eligibility</h4>
                    <p>{US_VISA_TYPES[selectedVisa].workEligibility}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Path to Residency</h4>
                    <p>{US_VISA_TYPES[selectedVisa].path}</p>
                  </div>

                  {US_VISA_TYPES[selectedVisa].quota && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Quota</h4>
                      <p>{US_VISA_TYPES[selectedVisa].quota}</p>
                    </div>
                  )}

                  {US_VISA_TYPES[selectedVisa].notes && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Notes</h4>
                      <p>{US_VISA_TYPES[selectedVisa].notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="eligibility" className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium">Sponsorship Requirements</h4>
                    <p>{US_VISA_TYPES[selectedVisa].sponsorship}</p>
                  </div>

                  <div>
                    <h4 className="font-medium">Dependents</h4>
                    <p>{US_VISA_TYPES[selectedVisa].dependents}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <h4 className="font-medium mb-2">Key Eligibility Criteria</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedVisa === "H-1B" && (
                        <>
                          <li>Bachelor's degree or higher in specific specialty</li>
                          <li>Job must require theoretical and practical application of specialized knowledge</li>
                          <li>Prevailing wage requirements must be met</li>
                          <li>Labor Condition Application (LCA) must be certified</li>
                        </>
                      )}
                      {selectedVisa === "L-1" && (
                        <>
                          <li>Must have worked for foreign affiliate for at least 1 year in past 3 years</li>
                          <li>Position must be managerial, executive, or specialized knowledge</li>
                          <li>Qualifying relationship between US and foreign employer</li>
                          <li>US office must be operational (for L-1A) or in process (for L-1B)</li>
                        </>
                      )}
                      {selectedVisa === "O-1" && (
                        <>
                          <li>Extraordinary ability in sciences, arts, education, business, or athletics</li>
                          <li>Sustained national or international acclaim</li>
                          <li>Coming to US to continue work in area of extraordinary ability</li>
                          <li>Advisory opinion from relevant peer group</li>
                        </>
                      )}
                      {/* Default eligibility criteria for other visa types */}
                      {!["H-1B", "L-1", "O-1"].includes(selectedVisa) && (
                        <>
                          <li>Meet specific requirements for visa category</li>
                          <li>Proper documentation and evidence</li>
                          <li>Sponsorship as required</li>
                          <li>Compliance with immigration regulations</li>
                        </>
                      )}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="process" className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium">Application Process</h4>
                    <ol className="list-decimal pl-5 space-y-2 mt-2">
                      {selectedVisa === "H-1B" && (
                        <>
                          <li>Employer files Labor Condition Application (LCA) with Department of Labor</li>
                          <li>Upon LCA approval, employer files Form I-129 petition with USCIS</li>
                          <li>If selected in H-1B lottery (if applicable), USCIS processes petition</li>
                          <li>Upon approval, applicant applies for visa at US consulate (if abroad)</li>
                          <li>Visa interview and issuance</li>
                          <li>Entry to US with valid H-1B visa</li>
                        </>
                      )}
                      {selectedVisa === "Green Card" && (
                        <>
                          <li>Sponsor files immigrant petition (family or employer)</li>
                          <li>Priority date established when petition filed</li>
                          <li>Wait for priority date to become current (if applicable)</li>
                          <li>File Form I-485 Adjustment of Status or process through consular processing</li>
                          <li>Biometrics appointment</li>
                          <li>Interview (if required)</li>
                          <li>Approval and issuance of Green Card</li>
                        </>
                      )}
                      {!["H-1B", "Green Card"].includes(selectedVisa) && (
                        <>
                          <li>Sponsor files appropriate petition with USCIS (if required)</li>
                          <li>Upon approval, applicant applies for visa at US consulate (if abroad)</li>
                          <li>Submit required documentation and forms</li>
                          <li>Attend visa interview</li>
                          <li>Visa issuance</li>
                          <li>Entry to US with valid visa</li>
                        </>
                      )}
                    </ol>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <h4 className="font-medium mb-2">Required Documentation</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Passport valid for at least 6 months beyond intended period of stay</li>
                      <li>Completed visa application forms</li>
                      <li>Application fee payment receipt</li>
                      <li>Petition approval notice (if applicable)</li>
                      <li>Evidence of qualifications and eligibility</li>
                      <li>Proof of ties to home country (for non-immigrant visas)</li>
                      <li>Photographs meeting specifications</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Processing Times</h4>
                    <p>
                      Processing times vary based on visa type, workload, and location. Check the{" "}
                      <a
                        href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        US Department of State website
                      </a>{" "}
                      for current wait times.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Export PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
