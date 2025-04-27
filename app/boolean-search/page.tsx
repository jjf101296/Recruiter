"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Wand2, CheckCircle2, ArrowLeft, Upload, FileText, Linkedin, Info, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

export default function BooleanSearchPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null)
  const [highlightedJD, setHighlightedJD] = useState<string>("")
  const [extractedSkills, setExtractedSkills] = useState<{ name: string; description: string; priority: number }[]>([])
  const [booleanStrings, setBooleanStrings] = useState({
    and: "",
    or: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("jd-text")
  const { toast } = useToast()
  const jdContentRef = useRef<HTMLDivElement>(null)

  const handleJobDescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescriptionFile(e.target.files[0])

      // Read the file content
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const content = event.target.result as string
          setJobDescription(content)
        }
      }
      reader.readAsText(e.target.files[0])

      toast({
        title: "Job Description Uploaded",
        description: `File: ${e.target.files[0].name}`,
      })
    }
  }

  useEffect(() => {
    if (jobDescription) {
      highlightJobDescription(jobDescription)
    }
  }, [jobDescription])

  const highlightJobDescription = (text: string) => {
    // Define regex patterns for different elements
    const yearsPattern = /\b([0-9]+[+]?)\s*(years?|yrs?)\b|\b([0-9]+[+]?)\s*\+\s*(years?|yrs?)\b/gi
    const certificationPattern =
      /\b(certification|certified|certificate|AWS|Azure|GCP|PMP|CISSP|CISM|CISA|ITIL|Scrum|CSM|CSPO|CSD|SAFe|CompTIA|MCSE|CCNA|CCNP|CCIE|CEH|OSCP)\b/gi
    const educationPattern =
      /\b(Bachelor'?s|Master'?s|PhD|Doctorate|MBA|BSc|MSc|BA|MA|BS|MS|degree|education|university|college)\b/gi
    const technicalSkillsPattern =
      /\b(JavaScript|Python|Java|C\+\+|C#|Ruby|PHP|Swift|Kotlin|Go|Rust|SQL|NoSQL|MongoDB|MySQL|PostgreSQL|Oracle|React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|ASP\.NET|\.NET|\.NET Core|HTML|CSS|AWS|Azure|GCP|Docker|Kubernetes|CI\/CD|Git|DevOps|Agile|Scrum|REST|API|JSON|XML|GraphQL)\b/gi
    const backgroundPattern = /\b(background|experience|industry|sector|field)\b/gi

    // Preserve line breaks by replacing them with a placeholder
    const lineBreakPlaceholder = "LINE_BREAK_PLACEHOLDER"
    let processedText = text.replace(/\n/g, lineBreakPlaceholder)

    // Apply highlighting with HTML spans
    processedText = processedText
      .replace(yearsPattern, '<span class="highlight-years">$&</span>')
      .replace(certificationPattern, '<span class="highlight-certification">$&</span>')
      .replace(educationPattern, '<span class="highlight-education">$&</span>')
      .replace(technicalSkillsPattern, '<span class="highlight-technical">$&</span>')
      .replace(backgroundPattern, '<span class="highlight-background">$&</span>')

    // Restore line breaks
    processedText = processedText.replace(new RegExp(lineBreakPlaceholder, "g"), "<br>")

    setHighlightedJD(processedText)
  }

  const extractSkillsFromJD = (text: string) => {
    // This is a more targeted implementation focusing on highlighted elements
    const skillsData = [
      // Technical Skills
      { name: "JavaScript", description: "A programming language that enables interactive web pages", priority: 3 },
      { name: "Python", description: "A high-level programming language for general-purpose programming", priority: 3 },
      { name: "Java", description: "A class-based, object-oriented programming language", priority: 3 },
      { name: "C#", description: "A multi-paradigm programming language developed by Microsoft", priority: 3 },
      {
        name: ".NET",
        description:
          "A free, cross-platform, open-source developer platform for building many different types of applications",
        priority: 3,
      },
      {
        name: ".NET Core",
        description: "A cross-platform version of .NET for building websites, services, and console apps",
        priority: 3,
      },
      { name: "ASP.NET", description: "A web framework for building web apps on the .NET platform", priority: 3 },
      { name: "React", description: "A JavaScript library for building user interfaces", priority: 3 },
      { name: "Angular", description: "A platform for building mobile and desktop web applications", priority: 3 },
      { name: "Vue.js", description: "A progressive framework for building user interfaces", priority: 3 },
      { name: "Node.js", description: "A JavaScript runtime built on Chrome's V8 JavaScript engine", priority: 3 },
      {
        name: "SQL",
        description: "A domain-specific language used for managing data in relational databases",
        priority: 3,
      },
      {
        name: "NoSQL",
        description:
          "A mechanism for storage and retrieval of data that is modeled differently from relational databases",
        priority: 3,
      },
      { name: "AWS", description: "Amazon Web Services - a cloud computing platform", priority: 3 },
      { name: "Azure", description: "Microsoft's cloud computing service", priority: 3 },
      { name: "GCP", description: "Google Cloud Platform - a suite of cloud computing services", priority: 3 },
      {
        name: "Docker",
        description: "A platform for developing, shipping, and running applications in containers",
        priority: 3,
      },
      {
        name: "Kubernetes",
        description:
          "An open-source system for automating deployment, scaling, and management of containerized applications",
        priority: 3,
      },

      // Certifications
      {
        name: "CCNA",
        description: "Cisco Certified Network Associate - Entry-level networking certification",
        priority: 2,
      },
      {
        name: "AWS Certified",
        description: "Certification validating cloud expertise with Amazon Web Services",
        priority: 2,
      },
      { name: "Azure Certified", description: "Microsoft certification for Azure cloud skills", priority: 2 },
      { name: "PMP", description: "Project Management Professional - certification for project managers", priority: 2 },
      { name: "CISSP", description: "Certified Information Systems Security Professional", priority: 2 },

      // Soft Skills
      { name: "leadership", description: "Ability to lead and guide teams", priority: 1 },
      { name: "communication", description: "Effective verbal and written communication skills", priority: 1 },
      { name: "teamwork", description: "Ability to work collaboratively in a team environment", priority: 1 },
      { name: "problem solving", description: "Ability to identify and resolve complex issues", priority: 1 },
      { name: "critical thinking", description: "Analytical thinking and evaluation skills", priority: 1 },
    ]

    // Extract highlighted technical skills from the job description
    const techSkillMatches = [
      ...text.matchAll(
        /\b(JavaScript|Python|Java|C\+\+|C#|Ruby|PHP|Swift|Kotlin|Go|Rust|SQL|NoSQL|MongoDB|MySQL|PostgreSQL|Oracle|React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|ASP\.NET|\.NET|\.NET Core|HTML|CSS|AWS|Azure|GCP|Docker|Kubernetes|CI\/CD|Git|DevOps|Agile|Scrum|REST|API|JSON|XML|GraphQL)\b/gi,
      ),
    ]
    const certMatches = [
      ...text.matchAll(
        /\b(certification|certified|certificate|AWS|Azure|GCP|PMP|CISSP|CISM|CISA|ITIL|Scrum|CSM|CSPO|CSD|SAFe|CompTIA|MCSE|CCNA|CCNP|CCIE|CEH|OSCP)\b/gi,
      ),
    ]

    // Extract years of experience
    const yearsMatches = [...text.matchAll(/\b([0-9]+[+]?)\s*(years?|yrs?)\b|\b([0-9]+[+]?)\s*\+\s*(years?|yrs?)\b/gi)]

    // Create a set of found skills
    const foundSkillNames = new Set()

    // Add all highlighted technical skills
    techSkillMatches.forEach((match) => {
      foundSkillNames.add(match[0].toLowerCase())
    })

    // Add all highlighted certifications
    certMatches.forEach((match) => {
      foundSkillNames.add(match[0].toLowerCase())
    })

    // Filter the skills data to only include found skills
    const foundSkills = skillsData.filter(
      (skill) =>
        foundSkillNames.has(skill.name.toLowerCase()) ||
        [...foundSkillNames].some(
          (name) => name.includes(skill.name.toLowerCase()) || skill.name.toLowerCase().includes(name),
        ),
    )

    // Sort by priority (higher priority first)
    foundSkills.sort((a, b) => b.priority - a.priority)

    // Limit to top 10 skills
    return foundSkills.slice(0, 10)
  }

  const generateBooleanStrings = (skills: { name: string; description: string; priority: number }[]) => {
    if (skills.length === 0) return { and: "", or: "" }

    // Extract just the skill names
    const skillNames = skills.map((skill) => skill.name)

    // OR string (all skills with OR)
    const orString = skillNames.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")

    // AND string (mixed with AND/OR for better results)
    // Group skills into categories based on priority
    const highPrioritySkills = skills.filter((skill) => skill.priority === 3).map((skill) => skill.name)
    const mediumPrioritySkills = skills.filter((skill) => skill.priority === 2).map((skill) => skill.name)

    // If we have high priority skills, use them for the AND string
    let andString = ""
    if (highPrioritySkills.length >= 2) {
      // Take the top 2 high priority skills and connect with AND
      const primaryString = highPrioritySkills
        .slice(0, 2)
        .map((skill) => (skill.includes(" ") ? `"${skill}"` : skill))
        .join(" AND ")

      // Take the rest of the skills and connect with OR
      const secondarySkills = [...highPrioritySkills.slice(2), ...mediumPrioritySkills]
      const secondaryString =
        secondarySkills.length > 0
          ? secondarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
          : ""

      andString = secondaryString ? `(${primaryString}) AND (${secondaryString})` : primaryString
    } else {
      // If we don't have enough high priority skills, use the top skills
      const primarySkills = skillNames.slice(0, Math.min(2, skillNames.length))
      const secondarySkills = skillNames.slice(Math.min(2, skillNames.length))

      const primaryString = primarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" AND ")

      const secondaryString =
        secondarySkills.length > 0
          ? secondarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
          : ""

      andString = secondaryString ? `(${primaryString}) AND (${secondaryString})` : primaryString
    }

    return { and: andString, or: orString }
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Boolean Search Generator
          </h1>
          <p className="text-slate-600 mt-2">
            Generate powerful Boolean search strings from job descriptions to find the perfect candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-2">
            <Card className="mb-6 border-t-4 border-t-blue-500 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  Job Description
                </CardTitle>
                <CardDescription>Paste or upload your job description to generate search strings</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="jd-text">Paste Text</TabsTrigger>
                    <TabsTrigger value="jd-upload">Upload File</TabsTrigger>
                  </TabsList>

                  <TabsContent value="jd-text">
                    <Textarea
                      placeholder="Paste job description here..."
                      className="min-h-[300px] font-mono text-sm"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </TabsContent>

                  <TabsContent value="jd-upload">
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                      <div className="mx-auto flex flex-col items-center justify-center gap-4">
                        <div className="rounded-full bg-blue-100 p-3">
                          <Upload className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            {jobDescriptionFile ? jobDescriptionFile.name : "Upload Job Description"}
                          </p>
                          <p className="text-xs text-slate-500">PDF, DOCX, or TXT up to 10MB</p>
                        </div>
                        <Button variant="outline" className="relative" disabled={isGenerating}>
                          Choose File
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept=".pdf,.docx,.txt"
                            onChange={handleJobDescriptionUpload}
                            disabled={isGenerating}
                          />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  size="lg"
                >
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

            {/* Highlighted Job Description */}
            {highlightedJD && (
              <Card className="mb-6 border-t-4 border-t-purple-500 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Highlighted Job Description</CardTitle>
                  <CardDescription>Key elements are highlighted for better analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Color Legend */}
                  <div className="flex flex-wrap gap-3 mb-4 p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs text-slate-700">Years of Experience</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                      <span className="text-xs text-slate-700">Certifications</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                      <span className="text-xs text-slate-700">Education</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                      <span className="text-xs text-slate-700">Technical Skills</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                      <span className="text-xs text-slate-700">Background</span>
                    </div>
                  </div>

                  {/* Highlighted Content */}
                  <div
                    ref={jdContentRef}
                    className="p-4 bg-white rounded-md border border-slate-200 max-h-[300px] overflow-auto text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightedJD }}
                    style={
                      {
                        "--highlight-years-color": "#10b981",
                        "--highlight-certification-color": "#3b82f6",
                        "--highlight-education-color": "#eab308",
                        "--highlight-technical-color": "#8b5cf6",
                        "--highlight-background-color": "#f97316",
                      } as React.CSSProperties
                    }
                  />
                </CardContent>
              </Card>
            )}

            {/* Results Section */}
            {extractedSkills.length > 0 && (
              <div className="space-y-6">
                <Card className="border-t-4 border-t-green-500 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Key Skills & Requirements</CardTitle>
                    <CardDescription>Most important skills identified from the job description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {extractedSkills.map((skill, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Badge
                                    variant="secondary"
                                    className={`text-sm cursor-pointer ${
                                      skill.priority === 3
                                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                                        : skill.priority === 2
                                          ? "bg-gradient-to-r from-green-50 to-teal-50 border border-green-200"
                                          : "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200"
                                    }`}
                                  >
                                    {skill.name}
                                  </Badge>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <Info className="h-5 w-5 text-blue-500" />
                                      {skill.name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p>{skill.description}</p>
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                      <h4 className="text-sm font-medium mb-2">Priority Level:</h4>
                                      <div className="flex items-center gap-2">
                                        {skill.priority === 3 ? (
                                          <Badge className="bg-blue-500">High</Badge>
                                        ) : skill.priority === 2 ? (
                                          <Badge className="bg-green-500">Medium</Badge>
                                        ) : (
                                          <Badge className="bg-yellow-500">Low</Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <DialogClose asChild>
                                    <Button variant="outline" className="absolute top-2 right-2 h-8 w-8 p-0">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </DialogClose>
                                </DialogContent>
                              </Dialog>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click for details about {skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-blue-500 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Boolean Search Strings</CardTitle>
                    <CardDescription>
                      Ready-to-use search strings for Dice, LinkedIn, and other platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="or" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="or">OR Combination</TabsTrigger>
                        <TabsTrigger value="and">AND/OR Combination</TabsTrigger>
                      </TabsList>

                      <TabsContent value="or">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">OR Search String</h4>
                              <p className="text-sm text-slate-500">Find candidates with any of these skills</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-blue-50">
                                Broader Results
                              </Badge>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px] border border-slate-200">
                              {booleanStrings.or}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(booleanStrings.or, "OR")}
                            >
                              {copied === "OR" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="and">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">AND/OR Search String</h4>
                              <p className="text-sm text-slate-500">Find candidates with specific skill combinations</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-50">
                                Targeted Results
                              </Badge>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px] border border-slate-200">
                              {booleanStrings.and}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(booleanStrings.and, "AND")}
                            >
                              {copied === "AND" ? (
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

          {/* Right Column - Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-t-4 border-t-indigo-500 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">How It Works</CardTitle>
                <CardDescription>Generate powerful Boolean search strings in seconds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
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
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        2
                      </div>
                      <p className="font-medium">Analyze Key Elements</p>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">
                      Our system highlights important elements like experience, skills, and certifications.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        3
                      </div>
                      <p className="font-medium">Extract Skills</p>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">
                      We automatically identify and extract key skills and requirements.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        4
                      </div>
                      <p className="font-medium">Generate & Copy</p>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">
                      Choose your preferred search string format and copy to your sourcing platform.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Pro Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-blue-400"></div>
                      <span>Use quotation marks for exact phrases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-blue-400"></div>
                      <span>OR strings find more candidates, AND strings find more qualified ones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-blue-400"></div>
                      <span>Combine with location filters for better results</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Recruiter Support Platform.</p>
          <p className="text-slate-400 mt-2">Created by John Francis</p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.linkedin.com/in/john-francis-eeemba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
