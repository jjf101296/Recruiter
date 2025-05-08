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

  const timeZones = [
    { name: "EST", label: "Eastern", offset: -5, city: "New York", isEST: true },
    { name: "CST", label: "Central", offset: -6, city: "Chicago", isEST: false },
    { name: "MST", label: "Mountain", offset: -7, city: "Denver", isEST: false },
    { name: "PST", label: "Pacific", offset: -8, city: "Los Angeles", isEST: false },
    { name: "IST", label: "India", offset: 5.5, city: "Mumbai", isEST: false },
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
      time: targetDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      hours: targetDate.getHours(),
      minutes: targetDate.getMinutes(),
      seconds: targetDate.getSeconds(),
    }
  }

  return (
    <div className="flex flex-wrap justify-between items-center">
      {timeZones.map((zone) => {
        const timeData = formatTimeForZone(currentTime, zone.offset)
        const hourRotation = (timeData.hours % 12) * 30 + timeData.minutes * 0.5
        const minuteRotation = timeData.minutes * 6
        const secondRotation = timeData.seconds * 6

        return (
          <div
            key={zone.name}
            className={`flex flex-col items-center p-3 rounded-lg mx-1 my-1 ${
              zone.isEST ? "bg-blue-900 bg-opacity-50" : "bg-slate-800 bg-opacity-50"
            } backdrop-blur-sm border ${
              zone.isEST ? "border-blue-700" : "border-slate-700"
            } shadow-lg transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center mb-2">
              <Clock className="h-3 w-3 text-blue-400 mr-1" />
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  zone.isEST ? "bg-blue-700 text-white" : "bg-slate-700 text-slate-200"
                }`}
              >
                {zone.name}
              </span>
            </div>

            {/* Analog Clock */}
            <div className="relative w-12 h-12 mb-1">
              <div
                className={`absolute inset-0 rounded-full border-2 ${
                  zone.isEST ? "border-blue-500" : "border-slate-500"
                } flex items-center justify-center`}
              >
                {/* Hour markers */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-1 bg-slate-300"
                    style={{
                      transform: `rotate(${i * 30}deg) translateY(-5px)`,
                      transformOrigin: "center 6px",
                    }}
                  ></div>
                ))}

                {/* Hour hand */}
                <div
                  className={`absolute h-3 w-0.5 ${
                    zone.isEST ? "bg-blue-400" : "bg-slate-400"
                  } rounded-full origin-bottom`}
                  style={{ transform: `rotate(${hourRotation}deg)` }}
                ></div>

                {/* Minute hand */}
                <div
                  className={`absolute h-4 w-0.5 ${
                    zone.isEST ? "bg-blue-300" : "bg-slate-300"
                  } rounded-full origin-bottom`}
                  style={{ transform: `rotate(${minuteRotation}deg)` }}
                ></div>

                {/* Second hand */}
                <div
                  className={`absolute h-4 w-0.5 ${
                    zone.isEST ? "bg-blue-200" : "bg-slate-200"
                  } rounded-full origin-bottom`}
                  style={{ transform: `rotate(${secondRotation}deg)` }}
                ></div>

                {/* Center dot */}
                <div
                  className={`absolute w-1.5 h-1.5 rounded-full ${zone.isEST ? "bg-blue-300" : "bg-slate-300"}`}
                ></div>
              </div>
            </div>

            {/* Digital time */}
            <span className="text-sm font-mono text-white">{timeData.time}</span>
            <span className="text-xs text-slate-400">{zone.city}</span>
          </div>
        )
      })}
    </div>
  )
}
