"use client"
import Link from "next/link"
import { TimeZoneClock } from "./time-zone-clock"
import { CurrencyConverter } from "./currency-converter"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Recruiter Support Platform
            </Link>
            <span className="text-xs text-slate-500 ml-2">Created by Talent Acquisition Team</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="w-full md:w-auto flex justify-between items-center gap-4">
              <TimeZoneClock />
              <div className="hidden md:block h-8 w-px bg-slate-200 mx-2"></div>
              <div className="w-[220px]">
                <CurrencyConverter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
