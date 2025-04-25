"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileUp, FileText, BarChart3, CheckCircle, AlertCircle, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ResumeScoreChecker() {
  const [jobDescription, setJobDescription] = useState<File | null>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ResultsType | null>(null)
  const { toast } = useToast()

  type ResultsType = {
    score: number
    matchedSkills: string[]
    missingSkills: string[]
    suggestions: string[]
  }

  const handleJobDescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescription(e.target.files[0])
      toast({
        title: "Job Description Uploaded",
        description: `File: ${e.target.files[0].name}`,
      })
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0])
      toast({
        title: "Resume Uploaded",
        description: `File: ${e.target.files[0].name}`,
      })
    }
  }

  const analyzeResume = () => {
    if (!jobDescription || !resume) {
      toast({
        title: "Missing Files",
        description: "Please upload both a job description and resume.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis with a timeout
    setTimeout(() => {
      // Mock results - in a real app, this would come from an API
      const mockResults: ResultsType = {
        score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
        matchedSkills: [
          "JavaScript",
          "React",
          "TypeScript",
          "Node.js",
          "REST APIs",
          "Team Leadership",
          "Agile Methodology",
        ],
        missingSkills: ["GraphQL", "AWS", "CI/CD", "Docker", "Kubernetes"],
        suggestions: [
          "Add experience with GraphQL to highlight your API knowledge",
          "Include specific AWS services you've worked with",
          "Mention any CI/CD pipelines you've set up or worked with",
          "Add containerization experience with Docker",
          "Highlight any Kubernetes experience or knowledge you have",
        ],
      }

      setResults(mockResults)
      setIsAnalyzing(false)
    }, 2000)
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
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Job Description Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Job Description
            </CardTitle>
            <CardDescription>Upload the job description PDF or document</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center justify-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <FileUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {jobDescription ? jobDescription.name : "Upload Job Description"}
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
          </CardContent>
        </Card>

        {/* Resume Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Resume
            </CardTitle>
            <CardDescription>Upload the resume you want to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center justify-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <FileUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{resume ? resume.name : "Upload Resume"}</p>
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
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={analyzeResume} disabled={!jobDescription || !resume || isAnalyzing} className="px-8">
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
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                ATS Match Score
              </CardTitle>
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

          {/* Skills Analysis */}
          <Tabs defaultValue="matched" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="matched">Matched Skills</TabsTrigger>
              <TabsTrigger value="missing">Missing Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="matched">
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
                    {results.matchedSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="missing">
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
                    {results.missingSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-red-50 border-red-200 text-red-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Improvement Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                AI-Powered Improvement Suggestions
              </CardTitle>
              <CardDescription>Recommendations to improve your resume for this job</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
