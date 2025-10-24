"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, FileText, Table, FileStack, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreatePipelineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ProcessorType = "parse" | "extract" | "split" | "edit"

export function CreatePipelineDialog({ open, onOpenChange }: CreatePipelineDialogProps) {
  const router = useRouter()
  const [selectedProcessor, setSelectedProcessor] = useState<ProcessorType>("extract")
  const [pipelineName, setPipelineName] = useState("")

  if (!open) return null

  const processors = [
    {
      id: "parse" as ProcessorType,
      title: "Parse",
      description: "Parse out document content.",
      icon: FileText,
    },
    {
      id: "extract" as ProcessorType,
      title: "Extract",
      description: "Extract fields from documents.",
      icon: Table,
    },
    {
      id: "split" as ProcessorType,
      title: "Split",
      description: "Split documents into sections.",
      icon: FileStack,
    },
    {
      id: "edit" as ProcessorType,
      title: "Edit",
      description: "Edit forms in documents.",
      icon: Edit3,
    },
  ]

  const handleCreate = () => {
    const name = pipelineName || "untitled-pipeline"
    console.log("[v0] Creating pipeline:", { selectedProcessor, pipelineName: name })
    onOpenChange(false)
    router.push(`/pipeline/${name}?type=${selectedProcessor}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl rounded-lg bg-card p-8 shadow-xl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Create New Pipeline</h2>
            <p className="mt-1 text-sm text-muted-foreground">Configure your new document processing pipeline.</p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">Processor Type</label>
            <div className="grid grid-cols-4 gap-4">
              {processors.map((processor) => {
                const Icon = processor.icon
                return (
                  <button
                    key={processor.id}
                    onClick={() => setSelectedProcessor(processor.id)}
                    className={`flex flex-col items-center gap-3 rounded-lg border-2 p-6 text-center transition-colors hover:border-primary/50 ${
                      selectedProcessor === processor.id ? "border-foreground bg-muted" : "border-border bg-background"
                    }`}
                  >
                    <div className="flex h-24 w-full items-center justify-center rounded-md bg-muted/50">
                      <Icon className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{processor.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{processor.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="pipeline-name" className="text-sm font-medium text-foreground">
              Pipeline Name
            </label>
            <Input
              id="pipeline-name"
              type="text"
              placeholder="Enter pipeline name"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCreate} className="bg-muted-foreground text-background hover:bg-muted-foreground/90">
              Create →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
