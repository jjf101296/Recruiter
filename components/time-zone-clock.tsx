"use client"

import { useState, useEffect } from "react"

export function TimeZoneClock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeZones = [
    { name: "EST", offset: -5, isEST: true },
    { name: "CST", offset: -6, isEST: false },
    { name: "MST", offset: -7, isEST: false },
    { name: "PST", offset: -8, isEST: false },
    { name: "IST", offset: 5.5, isEST: false },
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
      hour12: true,
    })
  }

  return (
    <div className="flex flex-wrap justify-center md:justify-between items-center">
      {timeZones.map((zone) => {
        const timeString = formatTimeForZone(currentTime, zone.offset)

        return (
          <div
            key={zone.name}
            className={`flex items-center px-4 py-1 rounded-lg mx-1 my-1 ${
              zone.isEST ? "bg-blue-600" : "bg-slate-700"
            } shadow-sm transition-all duration-300`}
          >
            <span className="text-xs font-bold text-white mr-2">{zone.name}</span>
            <span className="text-sm font-mono text-white">{timeString}</span>
          </div>
        )
      })}
    </div>
  )
}
