import { useEffect, useRef } from "react"
import {
  TrackerFeatureVisual,
  type TrackerVisualKind,
} from "@/components/best-tracker-animations"

type Feature = {
  title: string
  body: string
  visual?: TrackerVisualKind
}

const BADGES = [
  { src: "/credentials/soc2.webp", alt: "AICPA SOC 2" },
  { src: "/credentials/iso27001.webp", alt: "DNV ISO/IEC 27001" },
  { src: "/credentials/iso27701.webp", alt: "DNV ISO/IEC 27701" },
  { src: "/credentials/gdpr.webp", alt: "EU GDPR" },
]

const FEATURES: Feature[] = [
  {
    title: "Accurate package tracking",
    body: "Powered by intelligent carrier recognition, we achieve 99.9% tracking accuracy, auto-identifying 80%+ carriers to deliver real-time parcel updates and end-to-end delivery status.",
    visual: "accuracy",
  },
  {
    title: "Track on the go",
    body: "Track your shipments anytime with 17TRACK using the website, mobile app, WeChat Mini Program, or Shopify app. Enjoy the same accurate tracking results as the carrier's official site, with real-time updates at every step.",
    visual: "mobile",
  },
  {
    title: "Worldwide tracking",
    body: "17TRACK can pull tracking data from 3500+ global carriers, including USPS, DHL, FedEx, UPS, China Post, Cainiao, YunExpress, and more. This means you don't have to visit multiple carrier websites — one tracking number shows you all the latest updates in one place.",
    visual: "world",
  },
  {
    title: "99.9%+Uptime",
    body: "Our tracking system maintains an uptime of 99.9%, ensuring uninterrupted access whenever you need it. We deliver real-time updates across thousands of global carriers, keeping you informed every step of the fulfillment journey.",
    visual: "uptime",
  },
  {
    title: "24/7 Support",
    body: "Need help? Our professional support team is here around the clock for tracking issues, technical questions, or any unexpected problems, ensuring you get quick and accurate assistance.",
    visual: "support",
  },
  {
    title: "GDPR Compliance",
    body: "17TRACK is fully GDPR-compliant, keeping your personal data secure as you track your shipments in real time. Every shipment update is accurate and reliable, handled with the highest standards of privacy and security.",
  },
]

export function BestTrackerSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  // Cards play their visuals only while on screen. The class is purely a hook:
  // the mobile stylesheet turns hover-like brightness and playback on for it.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".track-best-card"),
    )
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((card) => card.classList.add("is-active"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting)
        })
      },
      { threshold: 0.35 },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="track-best-section w-full antialiased">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 pb-20">
        <h2 className="track-best-title text-center font-bold">
          Best package & order tracker
        </h2>
        <p className="track-best-lead m-0 text-center text-[16px] leading-[25px]">
          Track every shipment with ease — discover why 17TRACK is the most
          reliable package tracker for all your orders and packages worldwide.
        </p>
        <div className="track-best-grid" ref={gridRef}>
          {FEATURES.map((item, index) => (
            <article key={item.title} className="track-best-card">
              {index === 5 ? (
                <div className="track-best-media">
                  <div className="track-best-badges">
                    {BADGES.map((badge, badgeIndex) => (
                      <span
                        key={badge.src}
                        role="img"
                        aria-label={badge.alt}
                        className="track-best-badge"
                        style={{
                          zIndex: BADGES.length - badgeIndex,
                          backgroundImage: `url("${badge.src}")`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="track-best-media" aria-hidden="true">
                  {item.visual ? <TrackerFeatureVisual kind={item.visual} /> : null}
                </div>
              )}
              <div className="track-best-copy">
                <h3 className="track-best-card-title">{item.title}</h3>
                <p className="m-0 text-[16px] leading-6">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
