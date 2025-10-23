"use client"

import { Card } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import Image from "next/image"

const pipelines = [
  {
    id: "solar-fraud-complaint",
    name: "Solar Panel Fraud Complaint",
    type: "Parse → Split",
    processorType: "parse",
    files: "1 file",
    creator: "Tim Ottowitz",
    updated: "10/21/2025",
    thumbnail: "/solar-fraud-complaint.jpg",
  },
  {
    id: "class-action-discovery",
    name: "Class Action Discovery Docs",
    type: "Parse → Extract",
    processorType: "extract",
    files: "1 file",
    creator: "Tim Ottowitz",
    updated: "10/21/2025",
    thumbnail: "/class-action-discovery.jpg",
  },
  {
    id: "solar-lease-fraud",
    name: "Solar Lease Fraud Evidence",
    type: "Edit",
    processorType: "edit",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/solar-lease-fraud.jpg",
  },
  {
    id: "deposition-transcripts",
    name: "Deposition Transcripts",
    type: "Parse → Extract",
    processorType: "extract",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/deposition-transcript.jpg",
  },
  {
    id: "consumer-protection",
    name: "Consumer Protection Filing",
    type: "Parse → Split → Extract",
    processorType: "split",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/consumer-protection.jpg",
  },
  {
    id: "contract-breach",
    name: "Solar Contract Breach Case",
    type: "Parse",
    processorType: "parse",
    files: "1 file",
    creator: "Legal OS Demo",
    updated: "10/21/2025",
    thumbnail: "/contract-breach.jpg",
  },
]

interface RecentPipelinesProps {
  onPipelineClick?: (id: string, processorType: string) => void
}

export function RecentPipelines({ onPipelineClick }: RecentPipelinesProps) {
  return (
    <section>
      <h2 className="mb-6 text-xl font-semibold">Recent pipelines</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pipelines.map((pipeline, index) => (
          <Card
            key={index}
            onClick={() => onPipelineClick?.(pipeline.id, pipeline.processorType)}
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
