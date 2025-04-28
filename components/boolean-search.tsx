"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Wand2, CheckCircle2, Info, Code, Zap, Award, Clock, Users, Tag } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Domain-specific skill sets
const domainSkills = {
  "network engineer": [
    { name: "router", description: "Network device that forwards data packets between computer networks" },
    { name: "switch", description: "Network device that connects devices on a computer network" },
    {
      name: "firewall",
      description: "Network security device that monitors and filters incoming and outgoing network traffic",
    },
    { name: "CCNA", description: "Cisco Certified Network Associate certification" },
    { name: "CCNP", description: "Cisco Certified Network Professional certification" },
    { name: "Cisco", description: "Leading networking equipment manufacturer" },
    { name: "Juniper", description: "Network equipment manufacturer specializing in routing and switching" },
    { name: "load balancer", description: "Device that distributes network traffic across multiple servers" },
    { name: "VPN", description: "Virtual Private Network for secure connections" },
    { name: "OSPF", description: "Open Shortest Path First routing protocol" },
    { name: "BGP", description: "Border Gateway Protocol for internet routing" },
    { name: "MPLS", description: "Multiprotocol Label Switching for high-performance networks" },
    { name: "SDN", description: "Software-Defined Networking" },
  ],
  "cyber security": [
    { name: "NIST", description: "National Institute of Standards and Technology framework" },
    { name: "penetration testing", description: "Method of evaluating security by simulating attacks" },
    { name: "vulnerability assessment", description: "Process of identifying security vulnerabilities" },
    { name: "SIEM", description: "Security Information and Event Management" },
    { name: "SOC", description: "Security Operations Center" },
    { name: "incident response", description: "Organized approach to addressing security breaches" },
    { name: "threat hunting", description: "Proactively searching for cyber threats" },
    { name: "CISSP", description: "Certified Information Systems Security Professional" },
    { name: "CEH", description: "Certified Ethical Hacker certification" },
    { name: "ISO 27001", description: "Information security management standard" },
    { name: "zero trust", description: "Security model that requires verification for all users" },
    { name: "malware analysis", description: "Process of studying malicious software" },
  ],
  "software developer": [
    { name: "JavaScript", description: "Programming language for web development" },
    { name: "Python", description: "High-level programming language" },
    { name: "Java", description: "Object-oriented programming language" },
    { name: "C#", description: "Programming language developed by Microsoft" },
    { name: "React", description: "JavaScript library for building user interfaces" },
    { name: "Angular", description: "TypeScript-based web application framework" },
    { name: "Vue.js", description: "JavaScript framework for building user interfaces" },
    { name: "Node.js", description: "JavaScript runtime built on Chrome's V8 JavaScript engine" },
    { name: "SQL", description: "Structured Query Language for managing databases" },
    { name: "NoSQL", description: "Database that provides a mechanism for storage and retrieval of data" },
    { name: "Git", description: "Distributed version control system" },
    { name: "CI/CD", description: "Continuous Integration and Continuous Deployment" },
    { name: "Agile", description: "Software development methodology" },
    { name: "Scrum", description: "Agile framework for managing work" },
  ],
  "data scientist": [
    { name: "machine learning", description: "Field of AI focused on building systems that learn from data" },
    { name: "deep learning", description: "Subset of machine learning using neural networks" },
    { name: "Python", description: "Programming language commonly used in data science" },
    { name: "R", description: "Programming language for statistical computing" },
    { name: "TensorFlow", description: "Open-source machine learning framework" },
    { name: "PyTorch", description: "Open-source machine learning library" },
    { name: "SQL", description: "Language for managing and querying databases" },
    { name: "data visualization", description: "Graphical representation of information and data" },
    { name: "statistical analysis", description: "Collection and interpretation of data" },
    { name: "Pandas", description: "Data manipulation and analysis library" },
    { name: "NumPy", description: "Library for numerical computations" },
    { name: "Jupyter", description: "Web application for creating and sharing documents with live code" },
  ],
  "devops engineer": [
    { name: "Docker", description: "Platform for developing, shipping, and running applications in containers" },
    { name: "Kubernetes", description: "Container orchestration system" },
    { name: "AWS", description: "Amazon Web Services cloud platform" },
    { name: "Azure", description: "Microsoft's cloud computing service" },
    { name: "GCP", description: "Google Cloud Platform" },
    { name: "Terraform", description: "Infrastructure as code software tool" },
    {
      name: "Ansible",
      description: "Open-source software provisioning, configuration management, and application-deployment tool",
    },
    { name: "Jenkins", description: "Open-source automation server" },
    { name: "CI/CD", description: "Continuous Integration and Continuous Deployment" },
    { name: "Git", description: "Distributed version control system" },
    { name: "monitoring", description: "Observing and checking the progress or quality of something over time" },
    { name: "logging", description: "Recording of events in a system" },
  ],
}

export function BooleanSearch() {
  const [jobDescription, setJobDescription] = useState("")
  const [extractedSkills, setExtractedSkills] = useState<
    { name: string; description: string; priority: number; type?: string }[]
  >([])
  const [booleanStrings, setBooleanStrings] = useState({
    basic: "",
    advanced: "",
    expert: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [jobType, setJobType] = useState<string>("")
  const { toast } = useToast()

  const detectJobType = (text: string) => {
    const lowerText = text.toLowerCase()

    // Check for job type keywords
    if (
      lowerText.includes("network engineer") ||
      lowerText.includes("network administrator") ||
      lowerText.includes("network architect")
    ) {
      return "network engineer"
    } else if (
      lowerText.includes("cyber security") ||
      lowerText.includes("information security") ||
      lowerText.includes("security analyst")
    ) {
      return "cyber security"
    } else if (
      lowerText.includes("software developer") ||
      lowerText.includes("software engineer") ||
      lowerText.includes("programmer")
    ) {
      return "software developer"
    } else if (
      lowerText.includes("data scientist") ||
      lowerText.includes("data analyst") ||
      lowerText.includes("machine learning")
    ) {
      return "data scientist"
    } else if (
      lowerText.includes("devops") ||
      lowerText.includes("site reliability") ||
      lowerText.includes("platform engineer")
    ) {
      return "devops engineer"
    } else {
      return ""
    }
  }

  const extractSkillsFromJD = (text: string) => {
    // Detect job type
    const detectedJobType = detectJobType(text)
    setJobType(detectedJobType)

    // Base skills data
    const skillsData = [
      // Technical Skills
      {
        name: "JavaScript",
        description: "A programming language that enables interactive web pages",
        priority: 3,
        type: "skill",
      },
      {
        name: "Python",
        description: "A high-level programming language for general-purpose programming",
        priority: 3,
        type: "skill",
      },
      { name: "Java", description: "A class-based, object-oriented programming language", priority: 3, type: "skill" },
      {
        name: "C#",
        description: "A multi-paradigm programming language developed by Microsoft",
        priority: 3,
        type: "skill",
      },
      {
        name: ".NET",
        description:
          "A free, cross-platform, open-source developer platform for building many different types of applications",
        priority: 3,
        type: "skill",
      },
      {
        name: ".NET Core",
        description: "A cross-platform version of .NET for building websites, services, and console apps",
        priority: 3,
        type: "skill",
      },
      {
        name: "ASP.NET",
        description: "A web framework for building web apps on the .NET platform",
        priority: 3,
        type: "skill",
      },
      { name: "React", description: "A JavaScript library for building user interfaces", priority: 3, type: "skill" },
      {
        name: "Angular",
        description: "A platform for building mobile and desktop web applications",
        priority: 3,
        type: "skill",
      },
      {
        name: "Vue.js",
        description: "A progressive framework for building user interfaces",
        priority: 3,
        type: "skill",
      },
      {
        name: "Node.js",
        description: "A JavaScript runtime built on Chrome's V8 JavaScript engine",
        priority: 3,
        type: "skill",
      },
      {
        name: "SQL",
        description: "A domain-specific language used for managing data in relational databases",
        priority: 3,
        type: "skill",
      },
      {
        name: "NoSQL",
        description:
          "A mechanism for storage and retrieval of data that is modeled differently from relational databases",
        priority: 3,
        type: "skill",
      },
      { name: "AWS", description: "Amazon Web Services - a cloud computing platform", priority: 3, type: "skill" },
      { name: "Azure", description: "Microsoft's cloud computing service", priority: 3, type: "skill" },
      {
        name: "GCP",
        description: "Google Cloud Platform - a suite of cloud computing services",
        priority: 3,
        type: "skill",
      },
      {
        name: "Docker",
        description: "A platform for developing, shipping, and running applications in containers",
        priority: 3,
        type: "skill",
      },
      {
        name: "Kubernetes",
        description:
          "An open-source system for automating deployment, scaling, and management of containerized applications",
        priority: 3,
        type: "skill",
      },

      // Certifications
      {
        name: "CCNA",
        description: "Cisco Certified Network Associate - Entry-level networking certification",
        priority: 2,
        type: "certification",
      },
      {
        name: "AWS Certified",
        description: "Certification validating cloud expertise with Amazon Web Services",
        priority: 2,
        type: "certification",
      },
      {
        name: "Azure Certified",
        description: "Microsoft certification for Azure cloud skills",
        priority: 2,
        type: "certification",
      },
      {
        name: "PMP",
        description: "Project Management Professional - certification for project managers",
        priority: 2,
        type: "certification",
      },
      {
        name: "CISSP",
        description: "Certified Information Systems Security Professional",
        priority: 2,
        type: "certification",
      },

      // Soft Skills
      { name: "leadership", description: "Ability to lead and guide teams", priority: 1, type: "soft skill" },
      {
        name: "communication",
        description: "Effective verbal and written communication skills",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "teamwork",
        description: "Ability to work collaboratively in a team environment",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "problem solving",
        description: "Ability to identify and resolve complex issues",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "critical thinking",
        description: "Analytical thinking and evaluation skills",
        priority: 1,
        type: "soft skill",
      },
    ]

    // Add domain-specific skills if job type is detected
    let allSkills = [...skillsData]
    if (detectedJobType && domainSkills[detectedJobType]) {
      const domainSpecificSkills = domainSkills[detectedJobType].map((skill) => ({
        name: skill.name,
        description: skill.description,
        priority: 3, // High priority for domain-specific skills
        type: "domain skill",
      }))
      allSkills = [...allSkills, ...domainSpecificSkills]
    }

    // Create a set of found skills
    const foundSkillNames = new Set()
    const lowerText = text.toLowerCase()

    // Check for each skill in the text
    allSkills.forEach((skill) => {
      if (lowerText.includes(skill.name.toLowerCase())) {
        foundSkillNames.add(skill.name.toLowerCase())
      }
    })

    // Extract years of experience - using a simpler regex to avoid syntax issues
    const yearsRegex = /\d+\s*(?:years?|yrs?)/gi
    const yearsMatches = text.match(yearsRegex) || []

    if (yearsMatches.length > 0) {
      yearsMatches.forEach((match) => {
        // Extract just the number
        const years = match.match(/\d+/)[0]
        const yearsText = `${years}+ years experience`
        foundSkillNames.add(yearsText.toLowerCase())
        allSkills.push({
          name: yearsText,
          description: `At least ${years} years of professional experience required`,
          priority: 3,
          type: "experience",
        })
      })
    }

    // Filter the skills data to only include found skills
    const foundSkills = allSkills.filter(
      (skill) =>
        foundSkillNames.has(skill.name.toLowerCase()) ||
        [...foundSkillNames].some(
          (name) => name.includes(skill.name.toLowerCase()) || skill.name.toLowerCase().includes(name),
        ),
    )

    // Sort by priority (higher priority first)
    foundSkills.sort((a, b) => b.priority - a.priority)

    // Limit to top 15 skills
    return foundSkills.slice(0, 15)
  }

  const generateBooleanStrings = (skills: { name: string; description: string; priority: number; type?: string }[]) => {
    if (skills.length === 0) return { basic: "", advanced: "", expert: "" }

    // Extract just the skill names
    const skillNames = skills.map((skill) => skill.name)

    // Basic Boolean string (OR between all skills)
    const basic = skillNames.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")

    // Advanced Boolean string (group skills by category with AND/OR)
    const highPrioritySkills = skills.filter((skill) => skill.priority === 3).map((skill) => skill.name)
    const mediumPrioritySkills = skills.filter((skill) => skill.priority === 2).map((skill) => skill.name)

    let advanced = ""
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

      advanced = secondaryString ? `(${primaryString}) AND (${secondaryString})` : primaryString
    } else {
      // If we don't have enough high priority skills, use the top skills
      const primarySkills = skillNames.slice(0, Math.min(2, skillNames.length))
      const secondarySkills = skillNames.slice(Math.min(2, skillNames.length))

      const primaryString = primarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" AND ")

      const secondaryString =
        secondarySkills.length > 0
          ? secondarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
          : ""

      advanced = secondaryString ? `(${primaryString}) AND (${secondaryString})` : primaryString
    }

    // Expert Boolean string (more complex grouping with proximity operators)
    // Group by skill types
    const technicalSkills = skills
      .filter((skill) => skill.type === "skill" || skill.type === "domain skill")
      .map((skill) => skill.name)

    const certifications = skills.filter((skill) => skill.type === "certification").map((skill) => skill.name)

    const experienceReqs = skills.filter((skill) => skill.type === "experience").map((skill) => skill.name)

    const softSkills = skills.filter((skill) => skill.type === "soft skill").map((skill) => skill.name)

    // Build expert string with specific exclusions
    const expertParts = []

    if (technicalSkills.length > 0) {
      expertParts.push(`(${technicalSkills.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})`)
    }

    if (certifications.length > 0) {
      expertParts.push(`(${certifications.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})`)
    }

    if (experienceReqs.length > 0) {
      expertParts.push(`(${experienceReqs.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})`)
    }

    const expert =
      expertParts.join(" AND ") +
      (softSkills.length > 0 ? ` AND (${softSkills.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})` : "") +
      ` NOT (intern OR internship OR "entry level" OR junior)`

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

  const getSkillBadgeClass = (type?: string) => {
    switch (type) {
      case "skill":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "domain skill":
        return "bg-purple-50 border-purple-200 text-purple-700"
      case "certification":
        return "bg-green-50 border-green-200 text-green-700"
      case "experience":
        return "bg-amber-50 border-amber-200 text-amber-700"
      case "soft skill":
        return "bg-pink-50 border-pink-200 text-pink-700"
      default:
        return "bg-slate-50 border-slate-200 text-slate-700"
    }
  }

  const getSkillIcon = (type?: string) => {
    switch (type) {
      case "skill":
        return <Code className="h-3 w-3" />
      case "domain skill":
        return <Zap className="h-3 w-3" />
      case "certification":
        return <Award className="h-3 w-3" />
      case "experience":
        return <Clock className="h-3 w-3" />
      case "soft skill":
        return <Users className="h-3 w-3" />
      default:
        return <Tag className="h-3 w-3" />
    }
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
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Badge
                              variant="outline"
                              className={`text-sm cursor-pointer flex items-center gap-1.5 py-1 ${getSkillBadgeClass(skill.type)}`}
                            >
                              {getSkillIcon(skill.type)}
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
                                <h4 className="text-sm font-medium mb-2">Type:</h4>
                                <Badge className={getSkillBadgeClass(skill.type)}>{skill.type || "Skill"}</Badge>
                              </div>
                            </div>
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
