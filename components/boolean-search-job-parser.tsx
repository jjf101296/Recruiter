"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, FileText } from "lucide-react"

interface ExtractedData {
  jobTitles: string[]
  skills: string[]
  certifications: string[]
  locations: string[]
  experience: string[]
}

export function BooleanSearchJobParser() {
  const [jobDescription, setJobDescription] = useState("")
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [booleanString, setBooleanString] = useState("")
  const [platform, setPlatform] = useState<"linkedin" | "google" | "github" | "indeed">("linkedin")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value)
    // Reset results when input changes
    if (extractedData) {
      setExtractedData(null)
      setBooleanString("")
    }
  }

  const extractKeywords = () => {
    setLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      // This is a simplified extraction logic
      // In a real implementation, you would use more sophisticated NLP techniques

      const text = jobDescription.toLowerCase()

      // Extract job titles (simplified)
      const commonTitles = [
        "software engineer",
        "developer",
        "frontend",
        "backend",
        "full stack",
        "data scientist",
        "product manager",
        "project manager",
        "designer",
        "devops",
        "cloud engineer",
        "architect",
        "analyst",
        "qa",
        "tester",
      ]

      const jobTitles = commonTitles.filter((title) => text.includes(title.toLowerCase()))

      // Extract skills (simplified)
      const commonSkills = [
        "javascript",
        "python",
        "java",
        "c#",
        "react",
        "angular",
        "vue",
        "node.js",
        "express",
        "django",
        "flask",
        "sql",
        "nosql",
        "mongodb",
        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",
        "ci/cd",
        "git",
        "agile",
        "scrum",
        "jira",
        "figma",
        "sketch",
        "photoshop",
        "machine learning",
        "ai",
        "data analysis",
        "statistics",
      ]

      const skills = commonSkills.filter((skill) => text.includes(skill.toLowerCase()))

      // Extract certifications (simplified)
      const commonCerts = [
        "aws certified",
        "azure certified",
        "google certified",
        "pmp",
        "scrum",
        "cissp",
        "ceh",
        "comptia",
        "itil",
        "six sigma",
      ]

      const certifications = commonCerts.filter((cert) => text.includes(cert.toLowerCase()))

      // Extract locations (simplified)
      const commonLocations = [
        "remote",
        "new york",
        "san francisco",
        "seattle",
        "austin",
        "boston",
        "chicago",
        "los angeles",
        "atlanta",
        "denver",
      ]

      const locations = commonLocations.filter((location) => text.includes(location.toLowerCase()))

      // Extract experience levels (simplified)
      const experiencePatterns = [
        { pattern: /\b[1-3]\s*(?:years?|yrs?)\b/g, level: "1-3 years" },
        { pattern: /\b[3-5]\s*(?:years?|yrs?)\b/g, level: "3-5 years" },
        { pattern: /\b[5-7]\s*(?:years?|yrs?)\b/g, level: "5-7 years" },
        { pattern: /\b[7-9]\s*(?:years?|yrs?)\b/g, level: "7-9 years" },
        { pattern: /\b(?:10|[1-9][0-9])\s*(?:years?|yrs?)\b/g, level: "10+ years" },
        { pattern: /\bjunior\b/g, level: "Junior" },
        { pattern: /\bmid-level\b/g, level: "Mid-level" },
        { pattern: /\bsenior\b/g, level: "Senior" },
        { pattern: /\bprincipal\b/g, level: "Principal" },
        { pattern: /\bstaff\b/g, level: "Staff" },
      ]

      const experience = experiencePatterns.filter(({ pattern }) => pattern.test(text)).map(({ level }) => level)

      // Set the extracted data
      const data = {
        jobTitles: jobTitles.length > 0 ? jobTitles : ["software engineer"], // Default
        skills: skills.length > 0 ? skills : ["javascript", "react"], // Default
        certifications,
        locations: locations.length > 0 ? locations : ["remote"], // Default
        experience: experience.length > 0 ? experience : ["3-5 years"], // Default
      }

      setExtractedData(data)

      // Generate Boolean string based on platform
      generateBooleanString(data, platform)

      setLoading(false)
    }, 1500)
  }

  const generateBooleanString = (data: ExtractedData, platform: string) => {
    let booleanStr = ""

    switch (platform) {
      case "linkedin":
        // LinkedIn Boolean format
        const titleStr = data.jobTitles.map((t) => `"${t}"`).join(" OR ")
        const skillStr = data.skills.map((s) => `"${s}"`).join(" OR ")
        const certStr = data.certifications.length > 0 ? data.certifications.map((c) => `"${c}"`).join(" OR ") : ""
        const locStr = data.locations.length > 0 ? data.locations.map((l) => `"${l}"`).join(" OR ") : ""

        booleanStr = `(${titleStr}) AND (${skillStr})`

        if (certStr) {
          booleanStr += ` AND (${certStr})`
        }

        if (locStr) {
          booleanStr += ` AND (${locStr})`
        }
        break

      case "google":
        // Google search format
        const gTitleStr = data.jobTitles.map((t) => `"${t}"`).join(" OR ")
        const gSkillStr = data.skills.map((s) => `"${s}"`).join(" OR ")

        booleanStr = `(${gTitleStr}) (${gSkillStr}) site:linkedin.com OR site:indeed.com OR site:glassdoor.com`
        break

      case "github":
        // GitHub search format
        const ghSkillStr = data.skills.map((s) => `language:${s.replace(/\s+/g, "-")}`).join(" ")

        booleanStr = `${data.jobTitles[0].replace(/\s+/g, "-")} ${ghSkillStr}`
        break

      case "indeed":
        // Indeed search format
        const iTitleStr = data.jobTitles.map((t) => `title:(${t})`).join(" OR ")
        const iSkillStr = data.skills.join(" AND ")

        booleanStr = `(${iTitleStr}) ${iSkillStr}`
        break
    }

    setBooleanString(booleanStr)
  }

  const handlePlatformChange = (newPlatform: "linkedin" | "google" | "github" | "indeed") => {
    setPlatform(newPlatform)
    if (extractedData) {
      generateBooleanString(extractedData, newPlatform)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(booleanString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Boolean Search Job Parser</CardTitle>
          <CardDescription>
            Paste a job description to extract key information and generate a Boolean search string
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Paste job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            />
            <Button onClick={extractKeywords} disabled={!jobDescription.trim() || loading} className="w-full">
              {loading ? "Processing..." : "Extract Keywords & Generate Search"}
              {loading ? null : <FileText className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {extractedData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Extracted Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Job Titles</h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.jobTitles.map((title, i) => (
                      <Badge key={i} variant="outline">
                        {title}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {extractedData.certifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="bg-green-50">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium mb-2">Locations</h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.locations.map((location, i) => (
                      <Badge key={i} variant="outline" className="bg-blue-50">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>

                {extractedData.experience.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Experience Levels</h3>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.experience.map((exp, i) => (
                        <Badge key={i} variant="outline" className="bg-purple-50">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boolean Search String</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="linkedin" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="linkedin" onClick={() => handlePlatformChange("linkedin")}>
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="google" onClick={() => handlePlatformChange("google")}>
                    Google
                  </TabsTrigger>
                  <TabsTrigger value="github" onClick={() => handlePlatformChange("github")}>
                    GitHub
                  </TabsTrigger>
                  <TabsTrigger value="indeed" onClick={() => handlePlatformChange("indeed")}>
                    Indeed
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="linkedin" className="mt-0">
                  <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">{booleanString}</div>
                </TabsContent>
                <TabsContent value="google" className="mt-0">
                  <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">{booleanString}</div>
                </TabsContent>
                <TabsContent value="github" className="mt-0">
                  <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">{booleanString}</div>
                </TabsContent>
                <TabsContent value="indeed" className="mt-0">
                  <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">{booleanString}</div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button onClick={copyToClipboard} variant="outline" className="ml-auto">
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
