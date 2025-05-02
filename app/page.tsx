"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { USAMap } from "@/components/usa-map"
import { VisaTypesList } from "@/components/visa-types-list"

export default function Home() {
  const [activeTab, setActiveTab] = useState("tools")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Job Description Generator</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Created by{" "}
          <a href="https://github.com/yourusername" className="text-blue-500 hover:underline">
            Your Name
          </a>
        </p>
      </div>

      <Tabs defaultValue="tools" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="tools">Recruitment Tools</TabsTrigger>
          <TabsTrigger value="usa-map">U.S. State Information</TabsTrigger>
          <TabsTrigger value="visa-types">U.S. Visa Types</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/boolean-search" passHref>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Boolean Search Generator</CardTitle>
                  <CardDescription>Generate optimized boolean search strings for multiple platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Create powerful search strings for Dice, LinkedIn, Indeed, and Google X-Ray.</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline">Popular</Badge>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/resume-checker" passHref>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>ATS Resume Checker</CardTitle>
                  <CardDescription>Match your resume against job descriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analyze skill matches, get recommendations, and improve your resume.</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline">Essential</Badge>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/travel-history" passHref>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Travel History Calculator</CardTitle>
                  <CardDescription>Calculate visa-related travel history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Track and calculate travel history for visa applications.</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline">Useful</Badge>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="usa-map">
          <Card>
            <CardHeader>
              <CardTitle>Interactive U.S. State Information</CardTitle>
              <CardDescription>Hover or click on any state to view detailed information</CardDescription>
            </CardHeader>
            <CardContent>
              <USAMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visa-types">
          <Card>
            <CardHeader>
              <CardTitle>U.S. Visa Types Reference</CardTitle>
              <CardDescription>Comprehensive information about U.S. visa types</CardDescription>
            </CardHeader>
            <CardContent>
              <VisaTypesList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Job Description Generator. All rights reserved.</p>
      </footer>
    </div>
  )
}
