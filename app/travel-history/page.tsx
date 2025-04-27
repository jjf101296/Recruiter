"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, StampIcon as Passport, ExternalLink, Linkedin, Calendar, MapPin, Plane } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function TravelHistoryPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [passportNumber, setPassportNumber] = useState("")
  const [countryOfIssue, setCountryOfIssue] = useState("")
  const { toast } = useToast()

  const handleCheckHistory = () => {
    // Validate form
    if (!firstName || !lastName || !birthDate || !passportNumber || !countryOfIssue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Redirect to the official I-94 website
    window.open("https://i94.cbp.dhs.gov/I94/#/recent-search", "_blank")

    toast({
      title: "Redirecting",
      description: "Opening the official I-94 website in a new tab.",
    })
  }

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
                  Enter your passport information to check your travel history and most recent I-94
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name/Surname</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date of Birth</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passportNumber">Document Number (Passport Number)</Label>
                    <Input
                      id="passportNumber"
                      placeholder="Enter your passport number"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="countryOfIssue">Country of Issue</Label>
                    <Input
                      id="countryOfIssue"
                      placeholder="Enter country of issue"
                      value={countryOfIssue}
                      onChange={(e) => setCountryOfIssue(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleCheckHistory}
                >
                  Check Travel History
                </Button>

                <div className="mt-4 text-center text-sm text-slate-500">
                  <p>This will redirect you to the official I-94 website</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-pink-500 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                  What You'll Find
                </CardTitle>
                <CardDescription>Information available in your travel history and I-94 records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                    <h3 className="font-medium text-purple-800 flex items-center gap-2 mb-3">
                      <Plane className="h-5 w-5 text-purple-500" />
                      Travel History Results
                    </h3>
                    <ul className="space-y-2 text-sm text-purple-700">
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
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-100">
                    <h3 className="font-medium text-pink-800 flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-pink-500" />
                      Most Recent I-94
                    </h3>
                    <ul className="space-y-2 text-sm text-pink-700">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-pink-400"></div>
                        <span>Admission date and class</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-pink-400"></div>
                        <span>Admit until date</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-pink-400"></div>
                        <span>I-94 number and status</span>
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
                <CardTitle className="text-xl">How It Works</CardTitle>
                <CardDescription>Step-by-step guide to check your travel history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        1
                      </div>
                      <p className="font-medium">Enter Your Information</p>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">
                      Fill in your personal and passport details in the form.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        2
                      </div>
                      <p className="font-medium">Visit Official Website</p>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">You'll be redirected to the official I-94 website.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        3
                      </div>
                      <p className="font-medium">Enter Details Again</p>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">Enter the same information on the official site.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        4
                      </div>
                      <p className="font-medium">View Your Results</p>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">
                      See your travel history and most recent I-94 information.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-2">Direct Access</h4>
                  <p className="text-sm text-purple-700 mb-4">
                    You can also access the official I-94 website directly:
                  </p>
                  <a
                    href="https://i94.cbp.dhs.gov/I94/#/recent-search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
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
