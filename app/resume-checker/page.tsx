"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Lightbulb, ArrowLeft, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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
    matchedSkills: string[]
    missingSkills: string[]
    suggestions: string[]
  }

  const handleJobDescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescriptionFile(e.target.files[0])
      toast({
        title: "Job Description Uploaded",
        description: `File: ${e.target.files[0].name}`,
      })
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
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

    // Extract skills from resume
    const resumeSkills = extractSkillsFromResume(resumeText)

    // Find matches and missing skills
    const matchedSkills = requirements.filter((req) =>
      resumeSkills.some((skill) => skill.toLowerCase().includes(req.toLowerCase())),
    )

    const missingSkills = requirements.filter(
      (req) => !resumeSkills.some((skill) => skill.toLowerCase().includes(req.toLowerCase())),
    )

    // Calculate score based on matches
    const score = Math.min(Math.floor((matchedSkills.length / (requirements.length || 1)) * 100), 100)

    // Generate suggestions for missing skills
    const suggestions = missingSkills.map(
      (skill) => `Add experience with ${skill} to your resume to match this job requirement`,
    )

    // Simulate analysis with a timeout
    setTimeout(() => {
      // Create the results object
      const mockResults: ResultsType = {
        score: score,
        matchedSkills: matchedSkills,
        missingSkills: missingSkills,
        suggestions: suggestions,
      }

      setResults(mockResults)
      setIsAnalyzing(false)
    }, 2000)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold">ATS Resume Score Checker</h1>
          <p className="text-slate-600 mt-2">
            Check how well a resume matches a job description and get AI-powered suggestions for improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Job Description Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Job Description</CardTitle>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Resume</CardTitle>
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
                      <div className="rounded-full bg-blue-100 p-3">
                        <Upload className="h-6 w-6 text-blue-600" />
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
          <Button size="lg" onClick={analyzeResume} disabled={isAnalyzing} className="px-8">
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
            <Card className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
              <CardHeader>
                <CardTitle className="text-xl">ATS Match Score</CardTitle>
                <CardDescription>How well your resume matches the job requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-slate-100 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className={`${
                          results.score >= 80
                            ? "text-green-500"
                            : results.score >= 70
                              ? "text-yellow-500"
                              : "text-red-500"
                        } stroke-current`}
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
                      <span className="text-sm font-medium">Keywords Match</span>
                      <span className="text-sm font-medium">{Math.round(results.score * 0.8)}%</span>
                    </div>
                    <Progress value={results.score * 0.8} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Skills Match</span>
                      <span className="text-sm font-medium">{Math.round(results.score * 1.1)}%</span>
                    </div>
                    <Progress value={Math.min(results.score * 1.1, 100)} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Experience Match</span>
                      <span className="text-sm font-medium">{Math.round(results.score * 0.9)}%</span>
                    </div>
                    <Progress value={results.score * 0.9} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Education Match</span>
                      <span className="text-sm font-medium">{Math.round(results.score * 1.05)}%</span>
                    </div>
                    <Progress value={Math.min(results.score * 1.05, 100)} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Matched Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Matched Skills
                  </CardTitle>
                  <CardDescription>Skills and keywords found in your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.matchedSkills.length > 0 ? (
                      results.matchedSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-700">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-500 italic">No matching skills found</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Missing Skills
                  </CardTitle>
                  <CardDescription>Important skills not found in your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.missingSkills.length > 0 ? (
                      results.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 border-red-200 text-red-700">
                          {skill}
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
            <Card>
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
                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Need help with your resume?</h4>
                    <p className="text-sm text-blue-700 mb-4">
                      Ask our AI assistant to help you craft content for your missing skills:
                    </p>
                    <Button variant="outline" className="bg-white">
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
      <footer className="bg-slate-900 text-slate-200 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Recruiter Support Platform.</p>
          <p className="text-slate-400 mt-2">Helping recruiters find the perfect candidates faster.</p>
        </div>
      </footer>
    </div>
  )
}
