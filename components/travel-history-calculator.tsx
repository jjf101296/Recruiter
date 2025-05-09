"use client"

import { Clock, ExternalLink, FileText, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TravelHistoryCalculator() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl shadow-md text-white mb-6">
        <h2 className="text-2xl font-bold mb-3">I-94 Travel History</h2>
        <p className="text-white text-opacity-90 mb-4">
          Check your travel history and I-94 records using the official U.S. Customs and Border Protection website
        </p>
        <Button
          className="bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2"
          onClick={() => window.open("https://i94.cbp.dhs.gov/search/recent-search", "_blank")}
        >
          <ExternalLink className="h-4 w-4" />
          Access Official I-94 Website
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <CardTitle className="text-lg text-blue-800">Required Information</CardTitle>
                <CardDescription>Information needed to check your I-94 record</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Badge className="bg-blue-100 text-blue-800 mt-0.5">1</Badge>
                <div>
                  <span className="font-medium">Family Name</span>
                  <p className="text-sm text-slate-600">Your last name as it appears on your passport</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-blue-100 text-blue-800 mt-0.5">2</Badge>
                <div>
                  <span className="font-medium">First (Given) Name</span>
                  <p className="text-sm text-slate-600">Your first name as it appears on your passport</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-blue-100 text-blue-800 mt-0.5">3</Badge>
                <div>
                  <span className="font-medium">Birth Date</span>
                  <p className="text-sm text-slate-600">Your date of birth (MM/DD/YYYY)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-blue-100 text-blue-800 mt-0.5">4</Badge>
                <div>
                  <span className="font-medium">Passport Number</span>
                  <p className="text-sm text-slate-600">Your current passport number</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-blue-100 text-blue-800 mt-0.5">5</Badge>
                <div>
                  <span className="font-medium">Passport Country of Issuance</span>
                  <p className="text-sm text-slate-600">Country that issued your passport</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <CardTitle className="text-lg text-blue-800">Sample Data</CardTitle>
                <CardDescription>Example of I-94 travel history information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-700 mb-2">Most Recent Entry</h4>
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
                <h4 className="text-sm font-semibold text-cyan-700 mb-2">Previous Entry Example</h4>
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
          </CardContent>
        </Card>
      </div>

      <Card className="border-yellow-100 shadow-md">
        <CardHeader className="bg-yellow-50 border-b border-yellow-100 pb-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
            <div>
              <CardTitle className="text-lg text-yellow-800">Important Notes</CardTitle>
              <CardDescription>Key information about I-94 records</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xs">
                !
              </span>
              <span className="text-sm">The I-94 website only shows your travel history for the past five years.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xs">
                !
              </span>
              <span className="text-sm">
                Land border crossings prior to 2009 may not be included in your travel history.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xs">
                !
              </span>
              <span className="text-sm">
                You can print your I-94 record for official purposes like visa applications.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xs">
                !
              </span>
              <span className="text-sm">If you find errors in your travel history, contact CBP for correction.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
