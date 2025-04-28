"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, StampIcon as Passport, ExternalLink, Linkedin, Calendar, MapPin, Plane, Info } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TravelHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            I-94 & Travel History Checker
          </h1>
          <p className="text-slate-600 mt-2">
            Check travel history and recent I-94 records using passport information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-t-4 border-t-purple-500 shadow-md mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Passport className="h-5 w-5 text-purple-500 mr-2" />
                  Check Travel History & I-94
                </CardTitle>
                <CardDescription>
                  Access the official I-94 website to check travel history and most recent I-94
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle>Direct Access to Official I-94 Website</AlertTitle>
                    <AlertDescription>
                      Click the button below to access the official U.S. Customs and Border Protection I-94 website.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Sample Information</h3>
                  <p className="text-sm text-blue-700 mb-2">
                    For testing purposes, you can use the following sample information:
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      <span className="font-medium">First Name:</span> John
                    </li>
                    <li>
                      <span className="font-medium">Last Name:</span> Smith
                    </li>
                    <li>
                      <span className="font-medium">Date of Birth:</span> 01/01/1980
                    </li>
                    <li>
                      <span className="font-medium">Passport Number:</span> AB1234567
                    </li>
                    <li>
                      <span className="font-medium">Country of Issue:</span> United Kingdom
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center mt-8">
                  <a
                    href="https://i94.cbp.dhs.gov/I94/#/recent-search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md font-medium transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Access I-94 Website
                  </a>
                </div>

                <div className="mt-4 text-center text-sm text-slate-500">
                  <p>This will open the official I-94 website in a new tab</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-pink-500 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                  How to Use the I-94 Website
                </CardTitle>
                <CardDescription>Step-by-step instructions for checking your travel history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <h3 className="font-medium text-purple-800 flex items-center gap-2 mb-3">
                      <Plane className="h-5 w-5 text-purple-500" />
                      Instructions
                    </h3>
                    <ol className="space-y-3 text-sm text-purple-700 list-decimal pl-5">
                      <li>
                        <span className="font-medium">Enter your information</span> - Fill in all the required fields on
                        the I-94 website with your personal and travel document information.
                      </li>
                      <li>
                        <span className="font-medium">Verify your information</span> - Double-check all entered
                        information for accuracy before submitting.
                      </li>
                      <li>
                        <span className="font-medium">Submit your request</span> - Click the "Next" button to submit
                        your information.
                      </li>
                      <li>
                        <span className="font-medium">View your results</span> - Your travel history and most recent
                        I-94 information will be displayed.
                      </li>
                      <li>
                        <span className="font-medium">Save or print your results</span> - You can save or print your
                        I-94 record for your records.
                      </li>
                    </ol>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                    <h3 className="font-medium text-pink-800 flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-pink-500" />
                      Important Notes
                    </h3>
                    <ul className="space-y-2 text-sm text-pink-700">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-pink-400"></div>
                        <span>
                          The official I-94 website is maintained by U.S. Customs and Border Protection (CBP).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-pink-400"></div>
                        <span>Information must match exactly as it appears on your passport or travel document.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-pink-400"></div>
                        <span>The system only shows travel history for the past 5 years.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-pink-400"></div>
                        <span>
                          For privacy and security reasons, this tool only redirects you to the official website and
                          does not store any of your information.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-t-4 border-t-indigo-500 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">What You'll Find</CardTitle>
                <CardDescription>Information available in your travel history and I-94 records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-2">Travel History Results</h4>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-purple-400"></div>
                      <span>Date of entry and departure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-purple-400"></div>
                      <span>Port of entry information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-purple-400"></div>
                      <span>Class of admission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-purple-400"></div>
                      <span>Arrival and departure locations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100">
                  <h4 className="font-medium text-indigo-800 mb-2">Most Recent I-94</h4>
                  <ul className="text-sm text-indigo-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-indigo-400"></div>
                      <span>Admission date and class</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-indigo-400"></div>
                      <span>Admit until date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-indigo-400"></div>
                      <span>I-94 number and status</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-indigo-400"></div>
                      <span>Electronic or paper I-94 record</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Direct Access</h4>
                  <p className="text-sm text-blue-700 mb-4">You can also access the official I-94 website directly:</p>
                  <a
                    href="https://i94.cbp.dhs.gov/I94/#/recent-search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Official I-94 Website
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
