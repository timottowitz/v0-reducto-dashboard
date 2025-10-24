"use client"

import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreatePipelineDialog } from "@/components/create-pipeline-dialog"
import { useState } from "react"

export function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted">
            All users
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search pipelines..." className="w-80 pl-9" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Get API Access and Free Credits</Button>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create pipeline +
          </Button>
        </div>
      </header>

      <CreatePipelineDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
