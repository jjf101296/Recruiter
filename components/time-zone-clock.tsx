"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function TimeZoneClock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeZones = [
    { name: "EST", label: "Eastern", offset: -5, city: "New York" },
    { name: "CST", label: "Central", offset: -6, city: "Chicago" },
    { name: "MST", label: "Mountain", offset: -7, city: "Denver" },
    { name: "PST", label: "Pacific", offset: -8, city: "Los Angeles" },
    { name: "IST", label: "India", offset: 5.5, city: "Mumbai" },
  ]

  const formatTimeForZone = (date: Date, offset: number) => {
    // Create a date object with the UTC time
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

    // Add the timezone offset (in hours)
    const targetDate = new Date(utcDate.getTime() + offset * 3600000)

    // Handle half-hour offsets (like IST which is UTC+5:30)
    if (offset % 1 !== 0) {
      const minutes = (offset % 1) * 60
      targetDate.setMinutes(targetDate.getMinutes() + minutes)
    }

    // Format the time
    return targetDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="w-full border-none shadow-sm overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-0">
        <div className="flex flex-wrap justify-between items-center p-2 md:p-3">
          {timeZones.map((zone) => (
            <div
              key={zone.name}
              className="flex flex-col items-center p-2 min-w-[100px] bg-white bg-opacity-50 backdrop-blur-sm rounded-lg mx-1 my-1 border border-blue-100 shadow-sm"
            >
              <div className="flex items-center mb-1">
                <Clock className="h-3 w-3 text-blue-600 mr-1" />
                <Badge
                  variant="outline"
                  className="text-xs font-semibold px-2 py-0 bg-blue-100 text-blue-700 border-blue-200"
                >
                  {zone.name}
                </Badge>
              </div>
              <span className="text-sm md:text-base font-mono text-gray-700">
                {formatTimeForZone(currentTime, zone.offset)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
