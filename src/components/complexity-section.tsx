import { useEffect, useRef, useState } from "react"
import { CoverageGlobe } from "@/components/coverage-globe"

const STATS = [
  { value: "3,500+", label: "Carriers Worldwide" },
  { value: "230+", label: "Countries and Regions" },
  { value: "33+", label: "Languages" },
  { value: "22M+", label: "Daily Tracking Requests" },
  { value: "16 years", label: "Industry Expertise" },
]

function rollValue(value: string, progress: number) {
  return value.replace(/\d+/g, (digits) =>
    Math.round(Number(digits) * progress).toLocaleString("en-US"),
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  const itemRef = useRef<HTMLLIElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let revealFrame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        revealFrame = requestAnimationFrame(() => item.classList.add("is-shown"))
        const started = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - started) / 1200)
          setDisplay(rollValue(value, 1 - (1 - progress) ** 3))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(item)

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(revealFrame)
      observer.disconnect()
      item.classList.remove("is-shown")
    }
  }, [value])

  return (
    <li ref={itemRef}>
      <strong>{display}</strong>
      <span>{label}</span>
    </li>
  )
}

export function ComplexitySection() {
  return (
    <section className="track-coverage">
      <CoverageGlobe />
      <div className="track-coverage-inner">
        <h2 className="track-coverage-title font-bold">
          Built for Global Shipment Complexity
        </h2>
        <ul className="track-coverage-stats">
          {STATS.map((item) => (
            <Stat key={item.label} {...item} />
          ))}
        </ul>
      </div>
    </section>
  )
}
