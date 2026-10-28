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
    if (!section) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const items = [...section.querySelectorAll("ul.track-coverage-stats > li")]
    if (!items.length) return

    let observer: IntersectionObserver | null = null
    const revealFrames: number[] = []

    const arm = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            observer?.unobserve(entry.target)
            const frame = requestAnimationFrame(() => {
              entry.target.classList.add("is-shown")
            })
            revealFrames.push(frame)
          }
        },
        { threshold: 0.5 },
      )
      items.forEach((item) => observer?.observe(item))
    })

    return () => {
      cancelAnimationFrame(arm)
      revealFrames.forEach((frame) => cancelAnimationFrame(frame))
      observer?.disconnect()
      items.forEach((item) => item.classList.remove("is-shown"))
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
