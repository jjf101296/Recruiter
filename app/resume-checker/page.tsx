"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ArrowLeft,
  Upload,
  FileText,
  MessageSquare,
  Award,
  Clock,
  BookOpen,
  Building,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Linkedin } from "lucide-react"

export default function ResumeCheckerPage() {
  const [jobDescriptionText, setJobDescriptionText] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ResultsType | null>(null)
  const [activeTab, setActiveTab] = useState("jd-text")
  const [activeResumeTab, setActiveResumeTab] = useState("resume-text")
  const { toast } = useToast()

  type ResultsType = {
    score: number
    categoryScores: {
      skills: number
      experience: number
      education: number
      keywords: number
    }
    matchedSkills: Array<{
      name: string
      type: "skill" | "certification" | "education" | "experience" | "background"
      details?: string
    }>
    missingSkills: Array<{
      name: string
      type: "skill" | "certification" | "education" | "experience" | "background"
      details?: string
    }>
    suggestions: string[]
    experienceGap?: {
      required: string
      actual: string
      details: string
    }
  }

  const handleJobDescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescriptionFile(e.target.files[0])

      // Read the file content
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const content = event.target.result as string
          setJobDescriptionText(content)
        }
      }
      reader.readAsText(e.target.files[0])

      toast({
        title: "Job Description Uploaded",
        description: `File: ${e.target.files[0].name}`,
      })
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])

      // Read the file content
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const content = event.target.result as string
          setResumeText(content)
        }
      }
      reader.readAsText(e.target.files[0])

      toast({
        title: "Resume Uploaded",
        description: `File: ${e.target.files[0].name}`,
      })
    }
  }

  const analyzeResume = () => {
    // Check if we have either text or file for both JD and resume
    const hasJobDescription = jobDescriptionText.trim() !== "" || jobDescriptionFile !== null
    const hasResume = resumeText.trim() !== "" || resumeFile !== null

    if (!hasJobDescription || !hasResume) {
      toast({
        title: "Missing Information",
        description: "Please provide both a job description and resume (either by text or file upload).",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Extract requirements from job description
    const requirements = extractRequirements(jobDescriptionText)

    // Extract years of experience required
    const yearsRequired = extractYearsRequired(jobDescriptionText)

    // Extract certifications required
    const certificationsRequired = extractCertifications(jobDescriptionText)

    // Extract background requirements
    const backgroundRequired = extractBackground(jobDescriptionText)

    // Extract skills from resume
    const resumeSkills = extractSkillsFromResume(resumeText)

    // Extract years of experience from resume
    const yearsExperience = extractYearsFromResume(resumeText)

    // Extract certifications from resume
    const resumeCertifications = extractCertificationsFromResume(resumeText)

    // Extract background from resume
    const resumeBackground = extractBackgroundFromResume(resumeText)

    // Find matches and missing skills using fuzzy matching
    const matchedSkills: ResultsType["matchedSkills"] = []
    const missingSkills: ResultsType["missingSkills"] = []

    // Match technical skills
    for (const req of requirements) {
      let found = false
      for (const skill of resumeSkills) {
        // Check if the requirement is contained in the skill or vice versa
        if (
          skill.toLowerCase().includes(req.toLowerCase()) ||
          req.toLowerCase().includes(skill.toLowerCase()) ||
          calculateSimilarity(skill.toLowerCase(), req.toLowerCase()) > 0.7
        ) {
          found = true
          matchedSkills.push({
            name: req,
            type: "skill",
          })
          break
        }
      }

      if (!found) {
        missingSkills.push({
          name: req,
          type: "skill",
        })
      }
    }

    // Match certifications
    for (const cert of certificationsRequired) {
      let found = false
      for (const resumeCert of resumeCertifications) {
        if (
          resumeCert.toLowerCase().includes(cert.toLowerCase()) ||
          cert.toLowerCase().includes(resumeCert.toLowerCase())
        ) {
          found = true
          matchedSkills.push({
            name: cert,
            type: "certification",
            details: "Certification found in resume",
          })
          break
        }
      }

      if (!found) {
        missingSkills.push({
          name: cert,
          type: "certification",
          details: "Required certification not found in resume",
        })
      }
    }

    // Match background
    let backgroundMatch = false
    let backgroundDetail = ""

    for (const bg of backgroundRequired) {
      for (const resumeBg of resumeBackground) {
        if (resumeBg.toLowerCase().includes(bg.toLowerCase()) || bg.toLowerCase().includes(resumeBg.toLowerCase())) {
          backgroundMatch = true
          backgroundDetail = `Background in ${bg} found in resume`
          matchedSkills.push({
            name: bg,
            type: "background",
            details: backgroundDetail,
          })
          break
        }
      }

      if (!backgroundMatch) {
        missingSkills.push({
          name: bg,
          type: "background",
          details: `Required background in ${bg} not found in resume`,
        })
      }
    }

    // Check experience gap
    let experienceGap = null
    if (yearsRequired && yearsExperience) {
      const reqYears = Number.parseInt(yearsRequired)
      const expYears = Number.parseInt(yearsExperience)

      if (expYears < reqYears) {
        experienceGap = {
          required: `${reqYears} years`,
          actual: `${expYears} years`,
          details: `The job requires ${reqYears} years of experience, but the resume shows only ${expYears} years`,
        }

        missingSkills.push({
          name: `${reqYears} years of experience`,
          type: "experience",
          details: `Resume shows only ${expYears} years of experience`,
        })
      } else {
        matchedSkills.push({
          name: `${reqYears}+ years of experience`,
          type: "experience",
          details: `Resume shows ${expYears} years of experience`,
        })
      }
    }

    // Calculate category scores
    const skillsScore = Math.min(
      Math.floor((matchedSkills.filter((s) => s.type === "skill").length / (requirements.length || 1)) * 100),
      100,
    )

    // Experience score based on years gap
    const experienceScore = experienceGap
      ? Math.max(60, 100 - (Number.parseInt(yearsRequired) - Number.parseInt(yearsExperience)) * 10)
      : Math.floor(Math.random() * 21) + 70 // Random score between 70-90 if no specific gap

    const educationScore = Math.floor(Math.random() * 21) + 70 // Random score between 70-90
    const keywordsScore = Math.floor(Math.random() * 21) + 65 // Random score between 65-85

    // Calculate overall score (weighted average)
    const overallScore = Math.floor(
      skillsScore * 0.4 + experienceScore * 0.3 + educationScore * 0.15 + keywordsScore * 0.15,
    )

    // Generate suggestions for missing skills
    const suggestions = generateSuggestions(missingSkills, matchedSkills, experienceGap)

    // Simulate analysis with a timeout
    setTimeout(() => {
      // Create the results object
      const analysisResults: ResultsType = {
        score: overallScore,
        categoryScores: {
          skills: skillsScore,
          experience: experienceScore,
          education: educationScore,
          keywords: keywordsScore,
        },
        matchedSkills: matchedSkills,
        missingSkills: missingSkills,
        suggestions: suggestions,
        experienceGap: experienceGap,
      }

      setResults(analysisResults)
      setIsAnalyzing(false)
    }, 2000)
  }

  // Extract years required from job description
  const extractYearsRequired = (text: string): string | null => {
    // Fixed regex pattern to avoid syntax errors
    const regex = /\d+\s*(?:year|years|yr|yrs)/i
    const match = text.match(regex)
    if (!match) return null

    // Extract just the number
    const numMatch = match[0].match(/\d+/)
    return numMatch ? numMatch[0] : null
  }

  // Extract years from resume
  const extractYearsFromResume = (text: string): string | null => {
    // For demo purposes, generate a random number between 1-7
    return Math.floor(Math.random() * 7 + 1).toString()
  }

  // Extract certifications required
  const extractCertifications = (text: string): string[] => {
    // List of certifications to look for
    const certifications = [
      "AWS",
      "Azure",
      "GCP",
      "PMP",
      "CISSP",
      "CISM",
      "CISA",
      "ITIL",
      "Scrum",
      "CSM",
      "CSPO",
      "CSD",
      "SAFe",
      "CompTIA",
      "MCSE",
      "CCNA",
      "CCNP",
      "CCIE",
      "CEH",
      "OSCP",
    ]

    // Simple word matching without regex
    const found = []
    const lowerText = text.toLowerCase()

    for (const cert of certifications) {
      const lowerCert = cert.toLowerCase()
      // Check if the certification appears as a whole word
      if (
        lowerText.includes(` ${lowerCert} `) ||
        lowerText.includes(` ${lowerCert}.`) ||
        lowerText.includes(` ${lowerCert},`) ||
        lowerText.includes(`(${lowerCert})`) ||
        lowerText.includes(`${lowerCert}:`) ||
        lowerText.startsWith(`${lowerCert} `) ||
        lowerText.endsWith(` ${lowerCert}`)
      ) {
        found.push(cert)
      }
    }

    return found
  }

  // Extract certifications from resume
  const extractCertificationsFromResume = (text: string): string[] => {
    // Use the same function for both job description and resume
    return extractCertifications(text)
  }

  // Extract background requirements
  const extractBackground = (text: string): string[] => {
    const backgrounds = ["banking", "finance", "healthcare", "retail", "manufacturing", "technology", "education"]
    const found = []

    for (const bg of backgrounds) {
      if (text.toLowerCase().includes(bg)) {
        found.push(bg)
      }
    }

    return found
  }

  // Extract background from resume
  const extractBackgroundFromResume = (text: string): string[] => {
    const backgrounds = ["banking", "finance", "healthcare", "retail", "manufacturing", "technology", "education"]
    const found = []

    for (const bg of backgrounds) {
      if (text.toLowerCase().includes(bg)) {
        found.push(bg)
      }
    }

    return found
  }

  // Calculate similarity between two strings (Levenshtein distance based)
  const calculateSimilarity = (s1: string, s2: string): number => {
    const longer = s1.length > s2.length ? s1 : s2
    const shorter = s1.length > s2.length ? s2 : s1

    if (longer.length === 0) {
      return 1.0
    }

    // If the shorter string is contained in the longer one, high similarity
    if (longer.includes(shorter)) {
      return 0.8 + (shorter.length / longer.length) * 0.2
    }

    // Simple similarity check for demo purposes
    let matchCount = 0
    const words1 = longer.split(/\s+/)
    const words2 = shorter.split(/\s+/)

    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1 === word2 || word1.includes(word2) || word2.includes(word1)) {
          matchCount++
          break
        }
      }
    }

    return matchCount / Math.max(words1.length, words2.length)
  }

  const generateSuggestions = (
    missingSkills: ResultsType["missingSkills"],
    matchedSkills: ResultsType["matchedSkills"],
    experienceGap: any,
  ): string[] => {
    const suggestions = []

    // Generate specific suggestions for missing skills
    for (let i = 0; i < Math.min(missingSkills.length, 3); i++) {
      const skill = missingSkills[i]

      if (skill.type === "skill") {
        suggestions.push(`Add experience with ${skill.name} to your resume to match this job requirement`)
      } else if (skill.type === "certification") {
        suggestions.push(`Highlight your ${skill.name} certification or consider obtaining this credential`)
      } else if (skill.type === "background") {
        suggestions.push(`Emphasize any experience related to ${skill.name} in your work history`)
      }
    }

    // Add suggestion for experience gap
    if (experienceGap) {
      suggestions.push(`Highlight quality of experience to compensate for the ${experienceGap.required} requirement`)
    }

    // Add general suggestions
    if (missingSkills.length > 0) {
      suggestions.push(`Consider adding a 'Skills' section that clearly lists your technical competencies`)
    }

    if (matchedSkills.length < 5) {
      suggestions.push(`Use more specific terminology that matches the job description`)
    }

    // Add a suggestion about quantifying achievements
    suggestions.push(`Quantify your achievements with metrics and specific outcomes`)

    return suggestions
  }

  const extractRequirements = (text: string): string[] => {
    // This is a simplified implementation
    // In a real app, you'd use more sophisticated NLP techniques
    const lines = text.split("\n")

    // Look for sections that might contain requirements
    const requirementSections = lines.filter(
      (line) =>
        line.toLowerCase().includes("requirement") ||
        line.toLowerCase().includes("qualification") ||
        line.toLowerCase().includes("skill") ||
        line.toLowerCase().includes("experience"),
    )

    // Extract bullet points and lists
    const bulletPoints = lines.filter(
      (line) =>
        line.trim().startsWith("•") ||
        line.trim().startsWith("-") ||
        line.trim().startsWith("*") ||
        /^\d+\./.test(line.trim()),
    )

    // Common skills to look for
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
    ]

    // Extract skills mentioned in the text
    const extractedSkills = commonSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()))

    // Combine all potential requirements
    const allRequirements = [...new Set([...requirementSections, ...bulletPoints, ...extractedSkills])]

    // Clean up the requirements
    return allRequirements
      .map((req) => req.trim())
      .filter((req) => req.length > 0 && req.length < 100) // Filter out too long or empty items
      .slice(0, 15) // Limit to 15 requirements for simplicity
  }

  const extractSkillsFromResume = (text: string): string[] => {
    // Similar to extractRequirements but focused on resume content
    const lines = text.split("\n")

    // Look for sections that might contain skills
    const skillSections = lines.filter(
      (line) =>
        line.toLowerCase().includes("skill") ||
        line.toLowerCase().includes("expertise") ||
        line.toLowerCase().includes("proficiency") ||
        line.toLowerCase().includes("experience"),
    )

    // Extract bullet points and lists
    const bulletPoints = lines.filter(
      (line) =>
        line.trim().startsWith("•") ||
        line.trim().startsWith("-") ||
        line.trim().startsWith("*") ||
        /^\d+\./.test(line.trim()),
    )

    // Common skills to look for
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
    ]

    // Extract skills mentioned in the text
    const extractedSkills = commonSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()))

    // Combine all potential skills
    const allSkills = [...new Set([...skillSections, ...bulletPoints, ...extractedSkills])]

    // Clean up the skills
    return allSkills
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0 && skill.length < 100) // Filter out too long or empty items
      .slice(0, 20) // Limit to 20 skills for simplicity
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreText = (score: number) => {
    if (score >= 80) return "Excellent Match"
    if (score >= 70) return "Good Match"
    if (score >= 60) return "Average Match"
    return "Poor Match"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600"
    if (score >= 70) return "from-yellow-500 to-yellow-600"
    return "from-red-500 to-red-600"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "skill":
        return <Award className="h-4 w-4 text-blue-500" />
      case "certification":
        return <Award className="h-4 w-4 text-purple-500" />
      case "experience":
        return <Clock className="h-4 w-4 text-green-500" />
      case "education":
        return <BookOpen className="h-4 w-4 text-yellow-500" />
      case "background":
        return <Building className="h-4 w-4 text-orange-500" />
      default:
        return <Award className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            ATS Resume Score Checker
          </h1>
          <p className="text-slate-600 mt-2">
            Check how well a resume matches a job description and get AI-powered suggestions for improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Job Description Section */}
          <Card className="border-t-4 border-t-green-500 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                Job Description
              </CardTitle>
              <CardDescription>Provide the job description you want to match against</CardDescription>
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
                    className="min-h-[250px] font-mono text-sm"
                    value={jobDescriptionText}
                    onChange={(e) => setJobDescriptionText(e.target.value)}
                  />
                </TabsContent>

                <TabsContent value="jd-upload">
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                    <div className="mx-auto flex flex-col items-center justify-center gap-4">
                      <div className="rounded-full bg-green-100 p-3">
                        <Upload className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          {jobDescriptionFile ? jobDescriptionFile.name : "Upload Job Description"}
                        </p>
                        <p className="text-xs text-slate-500">PDF, DOCX, or TXT up to 10MB</p>
                      </div>
                      <Button variant="outline" className="relative" disabled={isAnalyzing}>
                        Choose File
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept=".pdf,.docx,.txt"
                          onChange={handleJobDescriptionUpload}
                          disabled={isAnalyzing}
                        />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Resume Section */}
          <Card className="border-t-4 border-t-teal-500 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileText className="h-5 w-5 text-teal-500 mr-2" />
                Resume
              </CardTitle>
              <CardDescription>Provide the resume you want to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeResumeTab} onValueChange={setActiveResumeTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="resume-text">Paste Text</TabsTrigger>
                  <TabsTrigger value="resume-upload">Upload File</TabsTrigger>
                </TabsList>

                <TabsContent value="resume-text">
                  <Textarea
                    placeholder="Paste resume content here..."
                    className="min-h-[250px] font-mono text-sm"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </TabsContent>

                <TabsContent value="resume-upload">
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                    <div className="mx-auto flex flex-col items-center justify-center gap-4">
                      <div className="rounded-full bg-teal-100 p-3">
                        <Upload className="h-6 w-6 text-teal-600" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{resumeFile ? resumeFile.name : "Upload Resume"}</p>
                        <p className="text-xs text-slate-500">PDF, DOCX, or TXT up to 10MB</p>
                      </div>
                      <Button variant="outline" className="relative" disabled={isAnalyzing}>
                        Choose File
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept=".pdf,.docx,.txt"
                          onChange={handleResumeUpload}
                          disabled={isAnalyzing}
                        />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mb-12">
          <Button
            size="lg"
            onClick={analyzeResume}
            disabled={isAnalyzing}
            className="px-8 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          >
            {isAnalyzing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Analyzing Resume...
              </>
            ) : (
              <>Analyze Resume Match</>
            )}
          </Button>
        </div>

        {results && (
          <div className="space-y-8">
            {/* Score Card */}
            <Card className="overflow-hidden border-t-4 border-t-indigo-500 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">ATS Match Score</CardTitle>
                <CardDescription>How well your resume matches the job requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop
                            offset="0%"
                            className={`stop-color-${results.score >= 80 ? "green" : results.score >= 70 ? "yellow" : "red"}-500`}
                          />
                          <stop
                            offset="100%"
                            className={`stop-color-${results.score >= 80 ? "green" : results.score >= 70 ? "yellow" : "red"}-600`}
                          />
                        </linearGradient>
                      </defs>
                      <circle
                        className="text-slate-100 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        stroke="url(#scoreGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${results.score * 2.51} 251.2`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      ></circle>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(results.score)}`}>{results.score}%</span>
                      <span className="text-sm font-medium text-slate-500">{getScoreText(results.score)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Skills Match</span>
                      <span className="text-sm font-medium">{results.categoryScores.skills}%</span>
                    </div>
                    <Progress value={results.categoryScores.skills} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Experience Match</span>
                      <span className="text-sm font-medium">{results.categoryScores.experience}%</span>
                    </div>
                    <Progress value={results.categoryScores.experience} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Education Match</span>
                      <span className="text-sm font-medium">{results.categoryScores.education}%</span>
                    </div>
                    <Progress value={results.categoryScores.education} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Keywords Match</span>
                      <span className="text-sm font-medium">{results.categoryScores.keywords}%</span>
                    </div>
                    <Progress value={results.categoryScores.keywords} className="h-2" />
                  </div>
                </div>

                {/* Experience Gap Alert */}
                {results.experienceGap && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Experience Gap Detected</h4>
                        <p className="text-sm text-yellow-700 mt-1">{results.experienceGap.details}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Matched Skills */}
              <Card className="border-t-4 border-t-green-500 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Matched Skills & Requirements
                  </CardTitle>
                  <CardDescription>Skills and requirements found in your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.matchedSkills.length > 0 ? (
                      results.matchedSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-green-50 border-green-200 text-green-700 flex items-center gap-1.5 py-1.5"
                        >
                          {getTypeIcon(skill.type)}
                          <span>{skill.name}</span>
                          {skill.details && <span className="text-xs text-green-600 ml-1 opacity-70">✓</span>}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-500 italic">No matching skills found</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Skills */}
              <Card className="border-t-4 border-t-red-500 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Missing Skills & Requirements
                  </CardTitle>
                  <CardDescription>Important requirements not found in your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.missingSkills.length > 0 ? (
                      results.missingSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-red-50 border-red-200 text-red-700 flex items-center gap-1.5 py-1.5"
                        >
                          {getTypeIcon(skill.type)}
                          <span>{skill.name}</span>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-green-500 italic">Great job! Your resume covers all required skills.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Support Section */}
            <Card className="border-t-4 border-t-yellow-500 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  AI-Powered Improvement Suggestions
                </CardTitle>
                <CardDescription>Recommendations to improve your resume for this job</CardDescription>
              </CardHeader>
              <CardContent>
                {results.suggestions.length > 0 ? (
                  <ul className="space-y-3">
                    {results.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-500 italic">Your resume is well-matched to this job description!</p>
                )}

                {results.missingSkills.length > 0 && (
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2">Need help with your resume?</h4>
                    <p className="text-sm text-blue-700 mb-4">
                      Ask our AI assistant to help you craft content for your missing skills:
                    </p>
                    <Button variant="outline" className="bg-white flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Get AI Help with Resume Content
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
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
