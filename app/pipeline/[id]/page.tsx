"use client"

import { useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { ArrowLeft, Upload, ChevronDown, Share2, Sparkles, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function PipelinePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const processorType = searchParams.get("type") || "parse"

  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple")
  const [settings, setSettings] = useState({
    handwritten: false,
    aiSummarization: false,
    returnImages: false,
    includeImages: false,
    latencyOptimized: false,
    citations: true,
    numericalConfidence: false,
  })
  const [instructionsExpanded, setInstructionsExpanded] = useState(true)
  const [settingsExpanded, setSettingsExpanded] = useState(true)
  const [systemPrompt, setSystemPrompt] = useState("")
  const [schemaFields, setSchemaFields] = useState<Array<{ name: string; type: string; description: string }>>([])
  const [sections, setSections] = useState<Array<{ id: string; name: string }>>([])

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium text-foreground">{params.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
              processorType === "parse" ? "bg-purple-100" : "bg-muted"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${processorType === "parse" ? "bg-purple-600" : "bg-muted-foreground"}`}
            />
            <span
              className={`text-sm font-medium ${processorType === "parse" ? "text-purple-900" : "text-muted-foreground"}`}
            >
              Parse
            </span>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
              processorType === "extract" ? "bg-purple-100" : "bg-muted"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${processorType === "extract" ? "bg-purple-600" : "bg-muted-foreground"}`}
            />
            <span
              className={`text-sm font-medium ${processorType === "extract" ? "text-purple-900" : "text-muted-foreground"}`}
            >
              Extract
            </span>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
              processorType === "split" ? "bg-purple-100" : "bg-muted"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${processorType === "split" ? "bg-purple-600" : "bg-muted-foreground"}`}
            />
            <span
              className={`text-sm font-medium ${processorType === "split" ? "text-purple-900" : "text-muted-foreground"}`}
            >
              Split
            </span>
          </div>
          <Button variant="outline" size="sm">
            + Add
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            More Actions
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
            Deploy
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Upload Area */}
        <div className="flex flex-1 items-center justify-center bg-muted/30 p-8">
          <div className="flex h-96 w-full max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-8 text-center">
            <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Click to upload or drag and drop your files here</p>
            <p className="mt-1 text-xs text-muted-foreground">PDF, images, Office, and CSV files</p>
          </div>
        </div>

        {/* Right Side - Configuration Panel */}
        <div className="flex w-[500px] flex-col border-l border-border bg-card">
          {/* Tabs Header */}
          <div className="border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 text-muted-foreground">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground">Configurations</h3>
              </div>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <div className="h-4 w-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6M9 16h6M9 8h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Results
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {processorType === "parse" ? (
              // Parse Configuration
              <div className="p-6">
                <div className="mb-4 flex gap-1">
                  <button
                    onClick={() => setActiveTab("simple")}
                    className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === "simple"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => setActiveTab("advanced")}
                    className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === "advanced"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Advanced
                  </button>
                </div>

                <h4 className="mb-4 text-sm font-semibold text-foreground">Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-foreground">Contains Handwritten Text</h5>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Enables agentive processing for better handwriting recognition and table/text corrections.
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.handwritten}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({ ...prev, handwritten: checked as boolean }))
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-foreground">Enable AI Summarization</h5>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Generate AI summaries of figures within your document.
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.aiSummarization}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({ ...prev, aiSummarization: checked as boolean }))
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-foreground">Return Figure/Table Images</h5>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Include extracted images, charts, or tables in URL form from the document in the output.
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.returnImages}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({ ...prev, returnImages: checked as boolean }))
                      }
                    />
                  </div>
                </div>
              </div>
            ) : processorType === "extract" ? (
              // Extract Configuration
              <div className="space-y-6 p-6">
                {/* Instructions Section */}
                <div className="rounded-lg border border-border">
                  <button
                    onClick={() => setInstructionsExpanded(!instructionsExpanded)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <h4 className="text-sm font-semibold text-foreground">Instructions</h4>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        instructionsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {instructionsExpanded && (
                    <div className="border-t border-border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        <h5 className="text-sm font-medium text-foreground">Build System Prompt</h5>
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">
                        Provide more context for the document processing block.
                      </p>
                      <Textarea
                        placeholder="Be precise and thorough."
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                  )}
                </div>

                {/* Schema Builder Section */}
                <div className="rounded-lg border border-border">
                  <div className="flex items-center justify-between border-b border-border p-4">
                    <h4 className="text-sm font-semibold text-foreground">Schema Builder</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Import
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Generate Schema
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-4 text-xs text-muted-foreground">
                      Define the fields you'd like to extract from the document.
                    </p>
                    <div className="mb-3 grid grid-cols-[1fr,1fr,2fr] gap-2 text-xs font-medium text-muted-foreground">
                      <div>NAME</div>
                      <div>TYPE</div>
                      <div>DESCRIPTION</div>
                    </div>
                    {schemaFields.length === 0 && (
                      <div className="py-8 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700"
                          onClick={() => setSchemaFields([{ name: "", type: "", description: "" }])}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          ADD FIELD
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Settings Section */}
                <div className="rounded-lg border border-border">
                  <button
                    onClick={() => setSettingsExpanded(!settingsExpanded)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <h4 className="text-sm font-semibold text-foreground">Settings</h4>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        settingsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {settingsExpanded && (
                    <div className="space-y-4 border-t border-border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-foreground">Include Images</h5>
                          <p className="mt-1 text-xs text-muted-foreground">
                            When enabled, extracted images will be included in the output as URLs or base64 encoded
                            data.
                          </p>
                        </div>
                        <Checkbox
                          checked={settings.includeImages}
                          onCheckedChange={(checked) =>
                            setSettings((prev) => ({ ...prev, includeImages: checked as boolean }))
                          }
                        />
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-foreground">Latency Optimized</h5>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Enables priority processing for faster results. This costs 2x credits.
                          </p>
                        </div>
                        <Checkbox
                          checked={settings.latencyOptimized}
                          onCheckedChange={(checked) =>
                            setSettings((prev) => ({ ...prev, latencyOptimized: checked as boolean }))
                          }
                        />
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-foreground">Citations</h5>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Identifies where your extracted content is coming from.
                          </p>
                        </div>
                        <Checkbox
                          checked={settings.citations}
                          onCheckedChange={(checked) =>
                            setSettings((prev) => ({ ...prev, citations: checked as boolean }))
                          }
                        />
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-foreground">Numerical Confidence</h5>
                          <p className="mt-1 text-xs text-muted-foreground">
                            This reveals how confident we are for extracting the true value from your document.
                          </p>
                        </div>
                        <Checkbox
                          checked={settings.numericalConfidence}
                          onCheckedChange={(checked) =>
                            setSettings((prev) => ({ ...prev, numericalConfidence: checked as boolean }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-6">
                {/* Instructions Section */}
                <div className="rounded-lg border border-border">
                  <button
                    onClick={() => setInstructionsExpanded(!instructionsExpanded)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <h4 className="text-sm font-semibold text-foreground">Instructions</h4>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        instructionsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {instructionsExpanded && (
                    <div className="border-t border-border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        <h5 className="text-sm font-medium text-foreground">Build System Prompt</h5>
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">
                        Provide more context for the document processing block.
                      </p>
                      <Textarea
                        placeholder="Split the document into the applicable sections. Sections may only overlap at their first and last page if at all."
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                  )}
                </div>

                {/* Settings Section for Split/Edit */}
                <div className="rounded-lg border border-border">
                  <button
                    onClick={() => setSettingsExpanded(!settingsExpanded)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <h4 className="text-sm font-semibold text-foreground">Settings</h4>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        settingsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {settingsExpanded && (
                    <div className="border-t border-border p-4">
                      <h5 className="mb-2 text-sm font-medium text-foreground">Sections & Partitions</h5>
                      <p className="mb-4 text-xs text-muted-foreground">
                        We split your document by sections. You can also split your sections further by adding
                        partitions.
                      </p>
                      <div className="flex justify-center py-8">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-foreground"
                          onClick={() =>
                            setSections([
                              ...sections,
                              { id: Date.now().toString(), name: `Section ${sections.length + 1}` },
                            ])
                          }
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Section
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <footer className="flex items-center justify-between border-t border-border bg-card px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Credits:</span>
            <span className="text-sm font-medium text-foreground">929 remaining</span>
          </div>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[7.1%] bg-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">71/1000</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm text-foreground">All Files</span>
          </label>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">Run</Button>
        </div>
      </footer>
    </div>
  )
}
