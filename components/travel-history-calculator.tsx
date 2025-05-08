"use client"

import { useState } from "react"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TravelHistoryCalculator() {
  const [showSampleData, setShowSampleData] = useState(false)

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl shadow-md text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Travel History Calculator</h2>
        <p className="text-white text-opacity-90 mb-4">
          Check your I-94 travel history to determine visa eligibility and compliance with US immigration regulations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="https://i94.cbp.dhs.gov/search/recent-search"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Check I-94 Travel History
          </a>
          <button
            onClick={() => setShowSampleData(!showSampleData)}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors"
          >
            {showSampleData ? "Hide" : "Show"} Sample Data
          </button>
        </div>
      </div>

      {showSampleData && (
        <Card className="border-blue-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <CardTitle>Sample I-94 Information</CardTitle>
            <CardDescription>
              Here's what you'll need to fill out when checking your I-94 travel history
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    Personal Information
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-slate-600">Family Name:</span>
                      <Badge variant="outline" className="font-mono">
                        DOE
                      </Badge>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">First Name:</span>
                      <Badge variant="outline" className="font-mono">
                        JOHN
                      </Badge>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">Birth Date:</span>
                      <Badge variant="outline" className="font-mono">
                        01/01/1980
                      </Badge>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">Passport Number:</span>
                      <Badge variant="outline" className="font-mono">
                        A1234567
                      </Badge>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">Country of Citizenship:</span>
                      <Badge variant="outline" className="font-mono">
                        INDIA
                      </Badge>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    Travel Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <h4 className="text-xs font-semibold text-blue-700 mb-2">Most Recent Entry</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-slate-600">Date of Entry:</span>
                          <Badge variant="outline" className="font-mono">
                            03/15/2023
                          </Badge>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-600">Class of Admission:</span>
                          <Badge variant="outline" className="font-mono">
                            B1/B2
                          </Badge>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-600">Admit Until Date:</span>
                          <Badge variant="outline" className="font-mono">
                            09/14/2023
                          </Badge>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100">
                      <h4 className="text-xs font-semibold text-cyan-700 mb-2">Previous Entry Example</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-slate-600">Date of Entry:</span>
                          <Badge variant="outline" className="font-mono">
                            07/10/2022
                          </Badge>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-600">Date of Departure:</span>
                          <Badge variant="outline" className="font-mono">
                            08/15/2022
                          </Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Important Notes</h3>
                <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
                  <li>All names should be entered exactly as they appear on your passport</li>
                  <li>Dates should be in MM/DD/YYYY format</li>
                  <li>You may need to provide additional information for certain visa types</li>
                  <li>The system may take a few moments to retrieve your travel history</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
