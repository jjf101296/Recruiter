"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, FileSearch, MapPin, FileCheck, Calculator, Clock } from "lucide-react"
import { TimeZoneClock } from "./time-zone-clock"
import { CurrencyConverter } from "./currency-converter"

export default function WelcomePage() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  const tools = [
    {
      id: "boolean-search",
      name: "Boolean Search Generator",
      description: "Create powerful Boolean search strings for job boards and LinkedIn",
      icon: <Search className="h-8 w-8" />,
      href: "/boolean-search",
      gradient: "from-blue-500 to-indigo-600",
      pattern: "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 70%)",
    },
    {
      id: "resume-checker",
      name: "ATS Resume Checker",
      description: "Check how well your resume matches a job description",
      icon: <FileSearch className="h-8 w-8" />,
      href: "/resume-checker",
      gradient: "from-emerald-500 to-teal-600",
      pattern: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
    },
    {
      id: "us-map",
      name: "US Map Explorer",
      description: "Explore US states with detailed information for recruiters",
      icon: <MapPin className="h-8 w-8" />,
      href: "/us-map",
      gradient: "from-purple-500 to-violet-600",
      pattern: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
    },
    {
      id: "visa-types",
      name: "US VISA Types",
      description: "Comprehensive guide to US visa types for recruiters",
      icon: <FileCheck className="h-8 w-8" />,
      href: "/visa-types",
      gradient: "from-rose-500 to-pink-600",
      pattern: "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.1) 0%, transparent 70%)",
    },
    {
      id: "tax-terms",
      name: "Tax Terms Glossary",
      description: "Understand different employment and tax terms in the US",
      icon: <Calculator className="h-8 w-8" />,
      href: "/tax-terms",
      gradient: "from-amber-500 to-orange-600",
      pattern: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
    },
    {
      id: "travel-history",
      name: "Travel History Calculator",
      description: "Calculate visa eligibility based on travel history",
      icon: <Clock className="h-8 w-8" />,
      href: "/travel-history",
      gradient: "from-cyan-500 to-blue-600",
      pattern: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      {/* Header with Time Zone Clock and Currency Converter */}
      <div className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <TimeZoneClock />
          <div className="w-full md:w-auto max-w-[200px]">
            <CurrencyConverter />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Recruiter Support Platform
            </span>
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg md:mt-5 md:text-xl max-w-3xl mx-auto">
            A comprehensive suite of tools designed to help recruiters find the right candidates faster.
          </p>
        </div>

        {/* Creator Section */}
        <div className="mb-12 text-center">
          <p className="text-sm text-slate-600">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/johnfrancis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              John Francis
            </a>{" "}
            - Technical Recruiter | Talent Acquisition Specialist | Sourcing Expert
          </p>
        </div>

        {/* Available Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Available Tools</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="group"
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <div
                  className="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-lg hover:border-slate-200 hover:translate-y-[-4px]"
                  style={{
                    backgroundColor: "white",
                    backgroundImage: hoveredTool === tool.id ? tool.pattern : "none",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="px-6 py-8 flex-1">
                    <div
                      className={`flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r ${tool.gradient} text-white mb-5 mx-auto shadow-md`}
                    >
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 text-center mb-2">{tool.name}</h3>
                    <p className="text-slate-600 text-center">{tool.description}</p>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <div className="text-sm font-medium text-blue-600 hover:text-blue-500 text-center">
                      Explore Tool
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Updated Footer with Contact Information */}
        <footer className="text-center py-4 border-t border-slate-200">
          <p className="text-slate-600 mb-2">© 2025 Recruiter Support Platform</p>
          <p className="text-slate-600">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/johnfrancis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              John Francis
            </a>{" "}
            | Contact:{" "}
            <a href="mailto:jjf101296@gmail.com" className="text-blue-600 hover:text-blue-800">
              jjf101296@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
