import { Card } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import Image from "next/image"

const pipelines = [
  {
    name: "Solar Panel Fraud Complaint",
    type: "Parse → Split",
    files: "1 file",
    creator: "Tim Ottowitz",
    updated: "10/21/2025",
    thumbnail: "/solar-fraud-complaint.jpg",
  },
  {
    name: "Class Action Discovery Docs",
    type: "Parse → Extract",
    files: "1 file",
    creator: "Tim Ottowitz",
    updated: "10/21/2025",
    thumbnail: "/class-action-discovery.jpg",
  },
  {
    name: "Solar Lease Fraud Evidence",
    type: "Edit",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/solar-lease-fraud.jpg",
  },
  {
    name: "Deposition Transcripts",
    type: "Parse → Extract",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/deposition-transcript.jpg",
  },
  {
    name: "Consumer Protection Filing",
    type: "Parse → Split → Extract",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/consumer-protection.jpg",
  },
  {
    name: "Solar Contract Breach Case",
    type: "Parse",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/contract-breach.jpg",
  },
]

export function RecentPipelines() {
  return (
    <section>
      <h2 className="mb-6 text-xl font-semibold">Recent pipelines</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pipelines.map((pipeline, index) => (
          <Card
            key={index}
            className="group cursor-pointer overflow-hidden border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-muted">
              <Image
                src={pipeline.thumbnail || "/placeholder.svg"}
                alt={pipeline.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute right-2 top-2">
                <button className="rounded-lg bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-tight">{pipeline.name}</h3>
                <span className="shrink-0 text-xs text-muted-foreground">{pipeline.files}</span>
              </div>
              <p className="mb-3 text-sm text-primary">{pipeline.type}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Created by {pipeline.creator}</span>
                <span>Last updated {pipeline.updated}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
