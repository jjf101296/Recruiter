"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function BackToHome() {
  return (
    <div className="mb-6">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>
    </div>
  )
}
