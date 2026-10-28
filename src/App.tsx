import { BestTrackerSection } from "@/components/best-tracker-section"
import { CarriersSection } from "@/components/carriers-section"
import { ComplexitySection } from "@/components/complexity-section"
import { SiteNav } from "@/components/site-nav"
import { SolutionsSection } from "@/components/solutions-section"
import { TrackingHero } from "@/components/tracking-hero"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function App() {
  return (
    <TooltipProvider>
      <SiteNav />
      <main className="min-h-svh bg-white">
        <TrackingHero />
        <CarriersSection />
        <SolutionsSection />
        <BestTrackerSection />
        <ComplexitySection />
      </main>
    </TooltipProvider>
  )
}
