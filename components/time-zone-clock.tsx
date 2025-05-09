"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function TimeZoneClock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Define time zones with correct UTC offsets
  const timeZones = [
    { name: "EST", offset: -5, color: "bg-blue-600" },
    { name: "CST", offset: -6, color: "bg-indigo-600" },
    { name: "MST", offset: -7, color: "bg-purple-600" },
    { name: "PST", offset: -8, color: "bg-violet-600" },
    { name: "IST", offset: 5.5, color: "bg-emerald-600" },
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
    return {
      hours: targetDate.getHours(),
      minutes: targetDate.getMinutes(),
      seconds: targetDate.getSeconds(),
      ampm: targetDate.getHours() >= 12 ? "PM" : "AM",
      formattedTime: targetDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {timeZones.map((zone) => {
        const time = formatTimeForZone(currentTime, zone.offset)
        const hours = time.hours % 12 || 12
        const minutes = time.minutes.toString().padStart(2, "0")

        return (
          <div
            key={zone.name}
            className={`${zone.color} rounded-lg shadow-md px-3 py-2 flex items-center space-x-2 min-w-[110px]`}
          >
            <Clock className="h-4 w-4 text-white opacity-80" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white/90">{zone.name}</span>
              <span className="text-sm font-mono font-bold text-white">
                {hours}:{minutes} {time.ampm}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
