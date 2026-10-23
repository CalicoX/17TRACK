import { CarriersSection } from "@/components/carriers-section"
import { SiteNav } from "@/components/site-nav"
import { TrackingHero } from "@/components/tracking-hero"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function App() {
  return (
    <TooltipProvider>
      <SiteNav />
      <main className="min-h-svh bg-white">
        <TrackingHero />
        <CarriersSection />
      </main>
    </TooltipProvider>
  )
}
