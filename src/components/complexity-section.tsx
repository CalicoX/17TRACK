import { useEffect, useRef } from "react"
import { CoverageGlobe } from "@/components/coverage-globe"

const STATS = [
  { value: "3,500+", label: "Carriers Worldwide" },
  { value: "230+", label: "Countries and Regions" },
  { value: "33+", label: "Languages" },
  { value: "22M+", label: "Daily Tracking Requests" },
  { value: "16 years", label: "Industry Expertise" },
]

export function ComplexitySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stats = section?.querySelector(".track-coverage-stats")
    if (!section || !stats) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    stats.classList.add("is-armed")
    let observer: IntersectionObserver | null = null
    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          stats.classList.add("is-shown")
          observer?.disconnect()
        },
        { threshold: 0.35 },
      )
      observer.observe(section)
    })

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="track-coverage">
      <CoverageGlobe />
      <div className="track-coverage-inner">
        <h2 className="track-coverage-title font-bold">
          Built for Global Shipment Complexity
        </h2>
        <ul className="track-coverage-stats">
          {STATS.map((item) => (
            <li key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
