"use client"

import { useState, useEffect } from "react"

export function TimeZoneClock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Define time zones with correct UTC offsets
  const timeZones = [
    { name: "ET", fullName: "Eastern Time", offset: getETOffset(), color: "from-blue-500 to-blue-600" },
    { name: "CT", fullName: "Central Time", offset: getETOffset() - 1, color: "from-indigo-500 to-indigo-600" },
    { name: "MT", fullName: "Mountain Time", offset: getETOffset() - 2, color: "from-purple-500 to-purple-600" },
    { name: "PT", fullName: "Pacific Time", offset: getETOffset() - 3, color: "from-violet-500 to-violet-600" },
    { name: "IST", fullName: "India Time", offset: 5.5, color: "from-emerald-500 to-emerald-600" },
  ]

  // Function to get the current ET offset based on DST
  function getETOffset() {
    // Get the user's local time offset in hours
    const localOffset = -currentTime.getTimezoneOffset() / 60

    // Determine if we're in DST for Eastern Time
    // This is a simplified approach - in a production app, you'd use a library like moment-timezone
    const jan = new Date(currentTime.getFullYear(), 0, 1)
    const jul = new Date(currentTime.getFullYear(), 6, 1)
    const isDST = Math.max(-jan.getTimezoneOffset(), -jul.getTimezoneOffset()) === -currentTime.getTimezoneOffset()

    // Eastern Time is UTC-5 in standard time, UTC-4 in DST
    const etOffset = isDST ? -4 : -5

    // Calculate the difference between local time and ET
    return etOffset
  }

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
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {timeZones.map((zone) => {
        const time = formatTimeForZone(currentTime, zone.offset)
        const hours = time.hours % 12 || 12
        const minutes = time.minutes.toString().padStart(2, "0")
        const seconds = time.seconds.toString().padStart(2, "0")

        return (
          <div
            key={zone.name}
            className="relative overflow-hidden rounded-lg shadow-md min-w-[120px] h-[60px] flex items-center justify-center"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${zone.color}`}></div>
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs font-bold text-white/90 mb-1" title={zone.fullName}>
                {zone.name}
              </span>
              <div className="flex items-center">
                <span className="text-lg font-mono font-bold text-white tracking-wider">
                  {hours}:{minutes}
                </span>
                <span className="text-xs font-bold text-white/80 ml-1">{time.ampm}</span>
                <span className="text-xs font-mono text-white/60 ml-1">{seconds}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
