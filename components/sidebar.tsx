import { Home, Settings, BookOpen, MessageSquare } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-border bg-[var(--sidebar-bg)]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-foreground">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" className="stroke-background" />
          </svg>
        </div>
        <span className="text-lg font-semibold">Entity Workbench</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg bg-[var(--sidebar-hover)] px-3 py-2 text-sm font-medium text-foreground"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[var(--sidebar-hover)] hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>

        <div className="pt-6">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resources</p>
          <Link
            href="/docs"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[var(--sidebar-hover)] hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Documentation
          </Link>
          <Link
            href="/feedback"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[var(--sidebar-hover)] hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            Give Feedback
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="mb-3 rounded-lg bg-muted p-3">
          <p className="text-xs font-medium text-foreground">Free Credit Usage</p>
          <p className="text-sm text-muted-foreground">3/25 credits left</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            TO
          </div>
          <div className="flex-1 text-sm">
            <p className="font-medium">Tim Ottowitz</p>
            <p className="text-xs text-muted-foreground">admin@legal</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
