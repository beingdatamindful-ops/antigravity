import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">PulseIntel</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background/50 backdrop-blur-sm">
          <Dashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
