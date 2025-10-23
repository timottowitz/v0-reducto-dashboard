"use client"
import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Grid3x3,
  List,
  Columns3,
  LayoutGrid,
  FolderPlus,
  Upload,
  Trash2,
  Share2,
  MoreHorizontal,
  Folder,
  File,
  FileText,
  ImageIcon,
  FileVideo,
  FileArchive,
  Clock,
  Scale,
  Sun,
  Briefcase,
  ChevronRightSquare as ChevronRightSmall,
  ChevronDown,
  GitBranch,
  History,
  GitPullRequest,
  Check,
  X,
  Plus,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ViewMode = "icon" | "list" | "column" | "gallery"
type FileStatus = "modified" | "added" | "deleted" | "renamed" | "untracked" | "conflict" | "staged" | "clean"

interface FileItem {
  id: string
  name: string
  type: "folder" | "file"
  fileType?: "pdf" | "doc" | "image" | "video" | "archive" | "text"
  size?: string
  kind?: string
  status?: FileStatus
  lastCommit?: string
  author?: string
  updated?: string
}

const getFileIcon = (file: FileItem) => {
  switch (file.type) {
    case "folder":
      return Folder
    case "file":
      switch (file.fileType) {
        case "pdf":
          return FileText
        case "doc":
          return File
        case "image":
          return ImageIcon
        case "video":
          return FileVideo
        case "archive":
          return FileArchive
        case "text":
          return FileText
        default:
          return File
      }
    default:
      return File
  }
}

const handleNewFolder = () => {
  // Implementation for handling new folder creation
}

const handleDelete = () => {
  // Implementation for handling file deletion
}

const handleFileClick = (fileId: string, multiSelect: boolean) => {
  // Implementation for handling file click
}

const sidebarSections = {
  favorites: [
    { id: "recents", label: "Recents", icon: Clock },
    { id: "documents", label: "Documents", icon: Folder, color: "text-blue-500" },
  ],
  cases: [
    { id: "litigation", label: "Litigation", icon: Scale, color: "text-orange-500" },
    { id: "solar-fraud", label: "Solar Fraud", icon: Sun, color: "text-yellow-500" },
    { id: "injury", label: "Injury", icon: Briefcase, color: "text-red-500" },
  ],
  changeRequests: [{ id: "open-crs", label: "Open CRs", icon: GitPullRequest, badge: 3 }],
}

const sampleFiles: FileItem[] = [
  {
    id: "1",
    name: "Solar Panel Fraud Cases",
    type: "folder",
    kind: "Folder",
    status: "modified",
    lastCommit: "2 days ago",
    author: "Tim Ottowitz",
    updated: "Today, 10:30 a.m.",
  },
  {
    id: "2",
    name: "Class Action Discovery",
    type: "folder",
    kind: "Folder",
    status: "clean",
    lastCommit: "1 week ago",
    author: "Sarah Chen",
    updated: "Yesterday, 3:15 p.m.",
  },
  {
    id: "3",
    name: "Consumer Protection Briefs",
    type: "folder",
    kind: "Folder",
    status: "staged",
    lastCommit: "3 days ago",
    author: "Tim Ottowitz",
    updated: "Today, 9:00 a.m.",
  },
  {
    id: "4",
    name: "Complaint_SolarFraud_2025.pdf",
    type: "file",
    fileType: "pdf",
    size: "2.4 MB",
    kind: "PDF Document",
    status: "modified",
    lastCommit: "Today",
    author: "Tim Ottowitz",
    updated: "Today, 12:06 a.m.",
  },
  {
    id: "5",
    name: "Deposition_Transcript_Oct15.pdf",
    type: "file",
    fileType: "pdf",
    size: "8.7 MB",
    kind: "PDF Document",
    status: "added",
    lastCommit: "Never",
    author: "Tim Ottowitz",
    updated: "Today, 11:45 a.m.",
  },
  {
    id: "6",
    name: "Evidence_Photos.zip",
    type: "file",
    fileType: "archive",
    size: "45.2 MB",
    kind: "ZIP Archive",
    status: "clean",
    lastCommit: "5 days ago",
    author: "Sarah Chen",
    updated: "Oct 17, 2:30 p.m.",
  },
  {
    id: "7",
    name: "Contract_Analysis.docx",
    type: "file",
    fileType: "doc",
    size: "1.2 MB",
    kind: "Word Document",
    status: "staged",
    lastCommit: "2 days ago",
    author: "Tim Ottowitz",
    updated: "Today, 9:15 a.m.",
  },
  {
    id: "8",
    name: "Settlement_Agreement.pdf",
    type: "file",
    fileType: "pdf",
    size: "3.1 MB",
    kind: "PDF Document",
    status: "untracked",
    lastCommit: "Never",
    author: "Tim Ottowitz",
    updated: "Today, 1:20 p.m.",
  },
]

export function Finder() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedLocation, setSelectedLocation] = useState("documents")
  const [files, setFiles] = useState<FileItem[]>(sampleFiles)
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [navigationHistory, setNavigationHistory] = useState<string[]>(["documents"])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [currentRef, setCurrentRef] = useState("HEAD")
  const [compareRef, setCompareRef] = useState("HEAD")
  const [showChangesOnly, setShowChangesOnly] = useState(false)
  const [stagingDrawerOpen, setStagingDrawerOpen] = useState(false)
  const [commitMessage, setCommitMessage] = useState("")

  const getStatusBadge = (status?: FileStatus) => {
    if (!status || status === "clean") return null

    const badges = {
      modified: { label: "M", color: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
      added: { label: "A", color: "bg-green-500/10 text-green-700 border-green-500/20" },
      deleted: { label: "D", color: "bg-gray-500/10 text-gray-700 border-gray-500/20" },
      renamed: { label: "R", color: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
      untracked: { label: "U", color: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20" },
      conflict: { label: "!", color: "bg-red-500/10 text-red-700 border-red-500/20" },
      staged: { label: "●", color: "bg-green-600/10 text-green-700 border-green-600/20" },
    }

    return badges[status]
  }

  const toggleStage = (fileId: string) => {
    setFiles(
      files.map((f) => {
        if (f.id === fileId) {
          if (f.status === "staged") {
            // Unstage: revert to previous status (modified, added, etc.)
            return { ...f, status: "modified" as FileStatus }
          } else if (f.status && f.status !== "clean") {
            // Stage the file
            return { ...f, status: "staged" as FileStatus }
          }
        }
        return f
      }),
    )
  }

  const stagedFiles = files.filter((f) => f.status === "staged")
  const unstagedFiles = files.filter((f) => f.status && f.status !== "clean" && f.status !== "staged")

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !showChangesOnly || (file.status && file.status !== "clean")
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 bg-transparent">
                <GitBranch className="h-3.5 w-3.5" />
                <span className="text-xs">@ {currentRef}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setCurrentRef("HEAD")}>HEAD</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentRef("main")}>main</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentRef("develop")}>develop</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentRef("CR-23")}>CR-23</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 bg-transparent">
                <span className="text-xs">Compare: {compareRef}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setCompareRef("HEAD")}>HEAD</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCompareRef("main")}>main</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCompareRef("develop")}>develop</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Navigation buttons */}
          <div className="ml-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={historyIndex === 0}
              onClick={() => {
                if (historyIndex > 0) {
                  setHistoryIndex(historyIndex - 1)
                  setSelectedLocation(navigationHistory[historyIndex - 1])
                }
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={historyIndex === navigationHistory.length - 1}
              onClick={() => {
                if (historyIndex < navigationHistory.length - 1) {
                  setHistoryIndex(historyIndex + 1)
                  setSelectedLocation(navigationHistory[historyIndex + 1])
                }
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* View mode switcher */}
          <div className="ml-4 flex items-center gap-1 rounded-md border border-border p-1">
            <Button
              variant={viewMode === "icon" ? "secondary" : "ghost"}
              size="icon"
              className="h-6 w-6"
              onClick={() => setViewMode("icon")}
            >
              <Grid3x3 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-6 w-6"
              onClick={() => setViewMode("list")}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === "column" ? "secondary" : "ghost"}
              size="icon"
              className="h-6 w-6"
              onClick={() => setViewMode("column")}
            >
              <Columns3 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === "gallery" ? "secondary" : "ghost"}
              size="icon"
              className="h-6 w-6"
              onClick={() => setViewMode("gallery")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button
            variant={showChangesOnly ? "secondary" : "ghost"}
            size="sm"
            className="ml-2 h-7 gap-1.5"
            onClick={() => setShowChangesOnly(!showChangesOnly)}
          >
            <Filter className="h-3.5 w-3.5" />
            <span className="text-xs">Changes only</span>
          </Button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 gap-1.5">
            <GitPullRequest className="h-3.5 w-3.5" />
            <span className="text-xs">Create CR</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-7 gap-1.5">
            <History className="h-3.5 w-3.5" />
            <span className="text-xs">History</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-7" onClick={handleNewFolder}>
            <FolderPlus className="mr-1.5 h-3.5 w-3.5" />
            New Folder
          </Button>
          <Button variant="ghost" size="sm" className="h-7">
            <Upload className="mr-1.5 h-3.5 w-3.5" />
            Upload
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleDelete}
            disabled={selectedFiles.size === 0}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Share2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-border bg-muted/30 p-2">
          <div className="space-y-4">
            {/* Favorites */}
            <div>
              <h3 className="mb-1 px-2 text-xs font-semibold text-muted-foreground">Favorites</h3>
              <div className="space-y-0.5">
                {sidebarSections.favorites.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedLocation(item.id)
                        const newHistory = navigationHistory.slice(0, historyIndex + 1)
                        newHistory.push(item.id)
                        setNavigationHistory(newHistory)
                        setHistoryIndex(newHistory.length - 1)
                      }}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors ${
                        selectedLocation === item.id
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${item.color || ""}`} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Cases */}
            <div>
              <h3 className="mb-1 px-2 text-xs font-semibold text-muted-foreground">Cases</h3>
              <div className="space-y-0.5">
                {sidebarSections.cases.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLocation(item.id)}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors ${
                        selectedLocation === item.id
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${item.color || ""}`} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-1 px-2 text-xs font-semibold text-muted-foreground">Change Requests</h3>
              <div className="space-y-0.5">
                {sidebarSections.changeRequests.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLocation(item.id)}
                      className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-sm transition-colors ${
                        selectedLocation === item.id
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Breadcrumb and search */}
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Documents</span>
              <ChevronRightSmall className="h-4 w-4" />
              <span>Legal Cases</span>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-7 pl-8 text-sm"
              />
            </div>
          </div>

          {/* Files display */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === "icon" && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 p-4">
                {filteredFiles.map((file) => {
                  const Icon = getFileIcon(file)
                  return (
                    <ContextMenu key={file.id}>
                      <ContextMenuTrigger>
                        <button
                          onClick={(e) => handleFileClick(file.id, e.metaKey || e.ctrlKey)}
                          className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
                            selectedFiles.has(file.id) ? "bg-accent" : "hover:bg-accent/50"
                          }`}
                        >
                          <Icon
                            className={`h-12 w-12 ${
                              file.type === "folder" ? "text-blue-500" : "text-muted-foreground"
                            }`}
                          />
                          <span className="line-clamp-2 text-center text-xs text-foreground">{file.name}</span>
                        </button>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>Open</ContextMenuItem>
                        <ContextMenuItem>Get Info</ContextMenuItem>
                        <ContextMenuItem>Rename</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>Duplicate</ContextMenuItem>
                        <ContextMenuItem>Compress</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem className="text-destructive">Move to Trash</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  )
                })}
              </div>
            )}

            {viewMode === "list" && (
              <div className="w-full">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="sticky top-0 z-10 border-b border-border bg-card text-xs font-medium text-muted-foreground">
                      <th className="w-8 px-2 py-2"></th>
                      <th className="px-4 py-2 text-left font-medium" style={{ width: "35%" }}>
                        Name
                      </th>
                      <th className="px-4 py-2 text-left font-medium" style={{ width: "10%" }}>
                        Status
                      </th>
                      <th className="px-4 py-2 text-left font-medium" style={{ width: "15%" }}>
                        Kind
                      </th>
                      <th className="px-4 py-2 text-left font-medium" style={{ width: "15%" }}>
                        Size
                      </th>
                      <th className="px-4 py-2 text-left font-medium" style={{ width: "15%" }}>
                        Last Commit
                      </th>
                      <th className="px-4 py-2 text-left font-medium" style={{ width: "10%" }}>
                        Author
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => {
                      const Icon = getFileIcon(file)
                      const statusBadge = getStatusBadge(file.status)
                      const isStaged = file.status === "staged"
                      const canStage = file.status && file.status !== "clean"

                      return (
                        <ContextMenu key={file.id}>
                          <ContextMenuTrigger asChild>
                            <tr
                              onClick={(e) => handleFileClick(file.id, e.metaKey || e.ctrlKey)}
                              className={`group cursor-pointer text-sm transition-colors ${
                                selectedFiles.has(file.id) ? "bg-accent" : "hover:bg-accent/50"
                              }`}
                            >
                              <td className="px-2 py-1.5">
                                {canStage && (
                                  <Checkbox
                                    checked={isStaged}
                                    onCheckedChange={() => toggleStage(file.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="opacity-0 group-hover:opacity-100"
                                  />
                                )}
                              </td>
                              <td className="px-4 py-1.5">
                                <div className="flex items-center gap-2">
                                  <Icon
                                    className={`h-4 w-4 flex-shrink-0 ${
                                      file.type === "folder" ? "text-blue-500" : "text-muted-foreground"
                                    }`}
                                  />
                                  <span className="truncate text-foreground">{file.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-1.5">
                                {statusBadge && (
                                  <span
                                    className={`inline-flex items-center justify-center rounded border px-1.5 py-0.5 text-[10px] font-medium ${statusBadge.color}`}
                                  >
                                    {statusBadge.label}
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-1.5 text-muted-foreground">{file.kind || "--"}</td>
                              <td className="px-4 py-1.5 text-muted-foreground">{file.size || "--"}</td>
                              <td className="px-4 py-1.5 text-muted-foreground">{file.lastCommit || "--"}</td>
                              <td className="px-4 py-1.5 text-muted-foreground">{file.author || "--"}</td>
                            </tr>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem>Open</ContextMenuItem>
                            <ContextMenuItem>Quick Look</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuSub>
                              <ContextMenuSubTrigger>Open Diff vs...</ContextMenuSubTrigger>
                              <ContextMenuSubContent>
                                <ContextMenuItem>HEAD</ContextMenuItem>
                                <ContextMenuItem>Last commit</ContextMenuItem>
                                <ContextMenuItem>Choose commit...</ContextMenuItem>
                              </ContextMenuSubContent>
                            </ContextMenuSub>
                            {canStage && (
                              <ContextMenuItem onClick={() => toggleStage(file.id)}>
                                {isStaged ? "Unstage" : "Stage"}
                              </ContextMenuItem>
                            )}
                            <ContextMenuSeparator />
                            <ContextMenuItem>Rename</ContextMenuItem>
                            <ContextMenuItem>Duplicate</ContextMenuItem>
                            <ContextMenuItem>Create CR from selection</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem className="text-destructive">Move to Trash</ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === "column" && (
              <div className="flex h-full gap-px p-4">
                <div className="w-64 flex-shrink-0 space-y-1 border-r border-border pr-4">
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file)
                    return (
                      <button
                        key={file.id}
                        onClick={(e) => handleFileClick(file.id, e.metaKey || e.ctrlKey)}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          selectedFiles.has(file.id) ? "bg-accent" : "hover:bg-accent/50"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${file.type === "folder" ? "text-blue-500" : "text-muted-foreground"}`}
                        />
                        <span className="flex-1 truncate text-foreground">{file.name}</span>
                        {file.type === "folder" && <ChevronRightSmall className="h-4 w-4 text-muted-foreground" />}
                      </button>
                    )
                  })}
                </div>
                <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                  Select a folder to view its contents
                </div>
              </div>
            )}

            {viewMode === "gallery" && (
              <div className="flex h-full gap-4 p-4">
                <div className="flex-1">
                  <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                    <div className="text-center">
                      <File className="mx-auto mb-2 h-16 w-16 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Select a file to preview</p>
                    </div>
                  </div>
                </div>
                <div className="w-64 space-y-2 overflow-y-auto">
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file)
                    return (
                      <button
                        key={file.id}
                        onClick={(e) => handleFileClick(file.id, e.metaKey || e.ctrlKey)}
                        className={`flex w-full flex-col gap-2 rounded-lg border border-border p-2 transition-colors ${
                          selectedFiles.has(file.id) ? "bg-accent" : "hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex aspect-square items-center justify-center rounded bg-muted">
                          <Icon
                            className={`h-8 w-8 ${file.type === "folder" ? "text-blue-500" : "text-muted-foreground"}`}
                          />
                        </div>
                        <span className="truncate text-xs text-foreground">{file.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-card">
        <button
          onClick={() => setStagingDrawerOpen(!stagingDrawerOpen)}
          className="flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-accent/50"
        >
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Version Control</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-muted-foreground">
              {stagedFiles.length} staged, {unstagedFiles.length} unstaged
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${stagingDrawerOpen ? "rotate-180" : ""}`}
          />
        </button>

        {stagingDrawerOpen && (
          <div className="border-t border-border bg-muted/30">
            <div className="grid grid-cols-2 gap-4 p-4">
              {/* Unstaged Changes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Unstaged Changes</h4>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    Stage All
                  </Button>
                </div>
                <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-border bg-background p-2">
                  {unstagedFiles.length === 0 ? (
                    <p className="py-4 text-center text-xs text-muted-foreground">No unstaged changes</p>
                  ) : (
                    unstagedFiles.map((file) => {
                      const statusBadge = getStatusBadge(file.status)
                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between gap-2 rounded px-2 py-1 hover:bg-accent/50"
                        >
                          <div className="flex items-center gap-2">
                            {statusBadge && (
                              <span
                                className={`inline-flex h-4 w-4 items-center justify-center rounded text-[10px] font-medium ${statusBadge.color}`}
                              >
                                {statusBadge.label}
                              </span>
                            )}
                            <span className="truncate text-xs text-foreground">{file.name}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => toggleStage(file.id)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Staged Changes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Staged Changes</h4>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    Unstage All
                  </Button>
                </div>
                <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-border bg-background p-2">
                  {stagedFiles.length === 0 ? (
                    <p className="py-4 text-center text-xs text-muted-foreground">No staged changes</p>
                  ) : (
                    stagedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between gap-2 rounded px-2 py-1 hover:bg-accent/50"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-green-600/10 text-[10px] font-medium text-green-700">
                            ●
                          </span>
                          <span className="truncate text-xs text-foreground">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => toggleStage(file.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Commit Composer */}
            <div className="border-t border-border bg-card p-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Commit message (e.g., feat(doc): update solar fraud complaint)"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  className="min-h-[80px] resize-none text-sm"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled={stagedFiles.length === 0}>
                      Discard All
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled={stagedFiles.length === 0 || !commitMessage.trim()}>
                      Create CR
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={stagedFiles.length === 0 || !commitMessage.trim()}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Commit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
