"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, AlertTriangle, CheckCircle } from "lucide-react"

export function TravelHistoryCalculator() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-blue-500 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl font-bold text-blue-800">I-94 Travel History</CardTitle>
          <CardDescription>
            Check your travel history and I-94 records using the official U.S. Customs and Border Protection website
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-blue-800 text-sm">
                The I-94 website provides your most recent arrival/departure information and travel history. This
                information is important for visa applications, extensions, and immigration purposes.
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-lg shadow-md flex items-center gap-2 text-lg"
              onClick={() => window.open("https://i94.cbp.dhs.gov/search/recent-search", "_blank")}
            >
              <ExternalLink className="h-5 w-5" />
              Access Official I-94 Website
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Information Required</h3>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Family Name:</span> Your last name as it appears on your passport
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">First (Given) Name:</span> Your first name as it appears on your
                      passport
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Birth Date:</span> Your date of birth (MM/DD/YYYY)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Passport Number:</span> Your current passport number
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Passport Country of Issuance:</span> Country that issued your
                      passport
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">What You Can Access</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium text-slate-800">Most Recent I-94</h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    View your most recent I-94 admission record, including your class of admission and "Admit Until"
                    date.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium text-slate-800">Travel History</h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Access your five-year travel history showing entries and exits from the United States.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• The I-94 website only shows your travel history for the past five years.</li>
                    <li>• Land border crossings prior to 2009 may not be included in your travel history.</li>
                    <li>• You can print your I-94 record for official purposes like visa applications.</li>
                    <li>• If you find errors in your travel history, contact CBP for correction.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
