import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CapabilitiesSection } from "@/components/capabilities-section"
import { RecentPipelines } from "@/components/recent-pipelines"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 lg:p-8">
            <CapabilitiesSection />
            <RecentPipelines />
          </div>
        </main>
      </div>
    </div>
  )
}
