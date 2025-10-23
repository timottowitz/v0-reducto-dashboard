"use client"

import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface DockApp {
  id: string
  icon: LucideIcon
  color: string
  label: string
}

interface DockProps {
  apps: DockApp[]
  onAppClick: (id: string) => void
}

export function Dock({ apps, onAppClick }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2">
      <div className="flex items-end gap-2 rounded-2xl bg-white/10 px-3 py-2 backdrop-blur-xl">
        {apps.map((app) => {
          const Icon = app.icon
          const isHovered = hoveredApp === app.id

          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
              className={`group relative flex h-14 w-14 items-center justify-center rounded-xl ${app.color} transition-all duration-200 hover:scale-110 ${
                isHovered ? "scale-110" : ""
              }`}
              aria-label={app.label}
            >
              <Icon className="h-7 w-7 text-white" />
              {isHovered && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  {app.label}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
