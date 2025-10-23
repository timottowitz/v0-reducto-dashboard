"use client"

export function CalendarWidget() {
  const events = [
    { time: "2:00 PM", title: "Client Meeting", color: "bg-blue-500" },
    { time: "3:30 PM", title: "Court Review", color: "bg-purple-500" },
    { time: "5:00 PM", title: "Team Call", color: "bg-green-500" },
    { time: "6:30 PM", title: "Document Prep", color: "bg-orange-500" },
  ]

  const now = new Date()
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
  const day = now.getDate()
  const month = now.toLocaleDateString("en-US", { month: "long" })

  return (
    <div className="absolute left-8 top-8 w-56 rounded-2xl bg-white/90 p-6 shadow-2xl backdrop-blur-sm">
      <div className="mb-6 text-center">
        <div className="text-xs font-medium text-gray-600">{dayName}</div>
        <div className="text-6xl font-light text-gray-900">{day}</div>
        <div className="text-sm text-gray-600">{month}</div>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className={`mt-1 h-2 w-2 rounded-full ${event.color}`} />
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-900">{event.time}</div>
              <div className="text-xs text-gray-600">{event.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
