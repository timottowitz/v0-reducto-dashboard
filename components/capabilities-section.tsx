import { FileText, Split, Database, Edit3 } from "lucide-react"
import { Card } from "@/components/ui/card"

const capabilities = [
  {
    icon: FileText,
    title: "Parse",
    description: "Read documents with human-like accuracy.",
    color: "text-green-600",
  },
  {
    icon: Split,
    title: "Split",
    description: "Automatically split long or multi-doc files into clean, usable parts.",
    color: "text-blue-600",
  },
  {
    icon: Database,
    title: "Extract",
    description: "Extract structured data from documents with precision.",
    color: "text-purple-600",
  },
  {
    icon: Edit3,
    title: "Edit",
    description: "Fill forms and documents with ease.",
    color: "text-pink-600",
  },
]

export function CapabilitiesSection() {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">What Legal OS can do</h2>
        <button className="text-sm text-primary hover:underline">Dismiss</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((capability) => (
          <Card
            key={capability.title}
            className="group cursor-pointer border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-muted">
              <div className="relative h-24 w-24 rounded-lg bg-background shadow-sm">
                <capability.icon
                  className={`absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 ${capability.color}`}
                />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <capability.icon className={`mt-0.5 h-4 w-4 ${capability.color}`} />
              <div>
                <h3 className="mb-1 font-semibold">{capability.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
