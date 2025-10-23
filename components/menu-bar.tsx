"use client"

import { Wifi, Battery, Bell } from "lucide-react"

export function MenuBar() {
  const now = new Date()
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  })
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })

  return (
    <div className="flex h-6 items-center justify-between bg-black/20 px-4 text-xs text-white backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button className="font-semibold hover:bg-white/10 px-2 py-0.5 rounded">LegalOS</button>
        <button className="hover:bg-white/10 px-2 py-0.5 rounded">About</button>
        <button className="hover:bg-white/10 px-2 py-0.5 rounded">Settings</button>
        <button className="hover:bg-white/10 px-2 py-0.5 rounded">Help</button>
      </div>

      <div className="flex items-center gap-3">
        <Wifi className="h-3.5 w-3.5" />
        <Battery className="h-3.5 w-3.5" />
        <span className="text-xs">78%</span>
        <Bell className="h-3.5 w-3.5" />
        <span className="text-xs">
          {dateString} {timeString}
        </span>
      </div>
    </div>
  )
}
