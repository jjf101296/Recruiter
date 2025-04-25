"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Wand2, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export function BooleanSearch() {
  const [jobDescription, setJobDescription] = useState("")
  const [extractedSkills, setExtractedSkills] = useState<string[]>([])
  const [booleanStrings, setBooleanStrings] = useState({
    basic: "",
    advanced: "",
    expert: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const { toast } = useToast()

  const extractSkillsFromJD = (text: string) => {
    // This is a simplified implementation
    // In a real app, you'd use more sophisticated NLP techniques
    const commonSkills = [
      "javascript",
      "react",
      "node.js",
      "python",
      "java",
      "c#",
      ".net",
      "aws",
      "azure",
      "gcp",
      "sql",
      "nosql",
      "mongodb",
      "postgresql",
      "mysql",
      "docker",
      "kubernetes",
      "ci/cd",
      "agile",
      "scrum",
      "product management",
      "project management",
      "leadership",
      "communication",
      "teamwork",
      "problem solving",
      "critical thinking",
      "data analysis",
      "machine learning",
      "ai",
      "artificial intelligence",
      "devops",
      "cloud",
      "frontend",
      "backend",
      "full stack",
      "mobile",
      "ios",
      "android",
      "react native",
      "flutter",
      "ux",
      "ui",
      "user experience",
      "user interface",
      "design",
      "figma",
      "sketch",
      "adobe",
      "photoshop",
      "illustrator",
      "marketing",
      "sales",
      "customer success",
      "support",
      "operations",
      "finance",
      "accounting",
      "human resources",
      "hr",
      "recruiting",
      "talent acquisition",
    ]

    const text_lower = text.toLowerCase()
    const foundSkills = commonSkills.filter((skill) => text_lower.includes(skill.toLowerCase()))

    // Add any capitalized words that might be technologies or tools
    const potentialTechWords = text.match(/\b[A-Z][a-zA-Z]+\b/g) || []
    const techWords = potentialTechWords.filter(
      (word) =>
        !foundSkills.includes(word.toLowerCase()) &&
        word.length > 2 &&
        !["The", "And", "For", "With", "This", "That", "Our", "Your", "Their"].includes(word),
    )

    return [...new Set([...foundSkills, ...techWords])]
  }

  const generateBooleanStrings = (skills: string[]) => {
    if (skills.length === 0) return { basic: "", advanced: "", expert: "" }

    // Basic Boolean string (OR between all skills)
    const basic = skills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")

    // Advanced Boolean string (group skills by category with AND/OR)
    // This is a simplified implementation
    const technicalSkills = skills.slice(0, Math.ceil(skills.length / 2))
    const softSkills = skills.slice(Math.ceil(skills.length / 2))

    const technicalString = technicalSkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
    const softString = softSkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
    const advanced = `(${technicalString}) AND (${softString})`

    // Expert Boolean string (more complex grouping with proximity operators)
    const primarySkills = skills.slice(0, Math.ceil(skills.length / 3))
    const secondarySkills = skills.slice(Math.ceil(skills.length / 3), Math.ceil((skills.length * 2) / 3))
    const tertiarySkills = skills.slice(Math.ceil((skills.length * 2) / 3))

    const primaryString = primarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
    const secondaryString = secondarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
    const tertiaryString = tertiarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")

    const expert = `(${primaryString}) AND ((${secondaryString}) OR (${tertiaryString})) NOT (intern OR internship OR "entry level")`

    return { basic, advanced, expert }
  }

  const handleGenerate = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty Job Description",
        description: "Please paste a job description to generate search strings.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate processing time
    setTimeout(() => {
      const skills = extractSkillsFromJD(jobDescription)
      setExtractedSkills(skills)
      setBooleanStrings(generateBooleanStrings(skills))
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)

    toast({
      title: "Copied!",
      description: `${type} search string has been copied to clipboard.`,
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" />
                Job Description
              </CardTitle>
              <CardDescription>Paste the job description you want to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste job description here..."
                className="min-h-[300px] font-mono text-sm"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button className="mt-4 w-full" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Search Strings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5 text-blue-500" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    1
                  </div>
                  <p className="font-medium">Paste Job Description</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Copy and paste the complete job description from any source.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    2
                  </div>
                  <p className="font-medium">Extract Key Skills</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Our AI analyzes the text to identify key skills and requirements.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    3
                  </div>
                  <p className="font-medium">Generate Search Strings</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Choose from basic, advanced, or expert Boolean search strings.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    4
                  </div>
                  <p className="font-medium">Copy & Search</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Copy the string and paste it into LinkedIn, job boards, or your ATS.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {extractedSkills.length > 0 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TagIcon className="h-5 w-5 text-blue-500" />
                Extracted Skills
              </CardTitle>
              <CardDescription>Key skills and keywords identified from the job description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SearchCode className="h-5 w-5 text-blue-500" />
                Boolean Search Strings
              </CardTitle>
              <CardDescription>Ready-to-use search strings for LinkedIn, job boards, or your ATS</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="expert">Expert</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Basic Search String</h4>
                        <p className="text-sm text-slate-500">Simple OR operator between all skills</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          Beginner
                        </Badge>
                        <Progress value={33} className="w-20 h-2" />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px]">
                        {booleanStrings.basic}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(booleanStrings.basic, "Basic")}
                      >
                        {copied === "Basic" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Advanced Search String</h4>
                        <p className="text-sm text-slate-500">Grouped skills with AND/OR operators</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50">
                          Intermediate
                        </Badge>
                        <Progress value={66} className="w-20 h-2" />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px]">
                        {booleanStrings.advanced}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(booleanStrings.advanced, "Advanced")}
                      >
                        {copied === "Advanced" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="expert">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Expert Search String</h4>
                        <p className="text-sm text-slate-500">Complex grouping with NOT operators</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50">
                          Expert
                        </Badge>
                        <Progress value={100} className="w-20 h-2" />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px]">
                        {booleanStrings.expert}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(booleanStrings.expert, "Expert")}
                      >
                        {copied === "Expert" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Icons
function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  )
}

function SearchCode(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 15 6 6" />
      <path d="M9.5 4a7.5 7.5 0 1 0 0 15 7.5 7.5 0 1 0 0-15Z" />
      <path d="m12 6-3 9 3-2" />
      <path d="m9 9 3 9-3-2" />
    </svg>
  )
}
