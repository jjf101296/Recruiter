"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, FileSearch, MapPin, ViewIcon as Visa, Calculator, Clock } from "lucide-react"
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
      pattern: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
    },
    {
      id: "resume-checker",
      name: "ATS Resume Checker",
      description: "Check how well your resume matches a job description",
      icon: <FileSearch className="h-8 w-8" />,
      href: "/resume-checker",
      pattern: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
    },
    {
      id: "us-map",
      name: "US Map Explorer",
      description: "Explore US states with detailed information for recruiters",
      icon: <MapPin className="h-8 w-8" />,
      href: "/us-map",
      pattern: "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
    },
    {
      id: "visa-types",
      name: "US VISA Types",
      description: "Comprehensive guide to US visa types for recruiters",
      icon: <Visa className="h-8 w-8" />,
      href: "/visa-types",
      pattern: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
    },
    {
      id: "tax-terms",
      name: "Tax Terms Glossary",
      description: "Understand different employment and tax terms in the US",
      icon: <Calculator className="h-8 w-8" />,
      href: "/tax-terms",
      pattern: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
    },
    {
      id: "travel-history",
      name: "Travel History Calculator",
      description: "Calculate visa eligibility based on travel history",
      icon: <Clock className="h-8 w-8" />,
      href: "/travel-history",
      pattern: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Time Zone Clock and Currency Converter */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <TimeZoneClock />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Currency Converter */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <CurrencyConverter />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Recruiter's</span>
            <span className="block text-blue-600">Toolkit</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A comprehensive suite of tools designed to help recruiters find the right candidates faster.
          </p>
        </div>

        {/* Creator Section */}
        <div className="mb-16 text-center">
          <p className="text-sm text-gray-500">
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
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Available Tools</h2>
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
                  className="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:translate-y-[-4px]"
                  style={{
                    backgroundColor: "white",
                    backgroundImage: hoveredTool === tool.id ? tool.pattern : "none",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="px-6 py-8 flex-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-5 mx-auto">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{tool.name}</h3>
                    <p className="text-gray-500 text-center">{tool.description}</p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="text-sm font-medium text-blue-600 hover:text-blue-500 text-center">
                      Explore Tool
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
