import { EnhancedResumeChecker } from "@/components/enhanced-resume-checker"
import { BackToHome } from "@/components/back-to-home"

export default function ResumeCheckerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-6 text-center">ATS Resume Checker</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Compare your resume against a job description to see how well they match. Get insights on matching skills,
        missing skills, and suggestions to improve your resume.
      </p>

      <EnhancedResumeChecker />
    </div>
  )
}
