import { ApiVisual } from "@/components/api-visual"
import { OrderTrackingVisual } from "@/components/order-tracking-visual"
import { ReturnsHero } from "@/components/returns-hero"
import { SolutionPhone } from "@/components/solution-phone"
import styles from "@/components/solutions-section.module.scss"

type Solution = {
  name: string
  /** Large solution headline shown under the product name. */
  headline?: string
  /** Official product mark, shown in a 64px square above the title. */
  icon: string
  description: string
  points: string[]
  image: string
  imageAlt: string
  /** Width / height of the artwork. Drives the cell height below lg, where it scales with the column. */
  imageRatio: string
  phone?: boolean
  badge?: { src: string; alt: string }
  actions: {
    label: string
    href: string
    tone: "solid" | "outline" | "returns" | "api" | "badge"
    badge?: { src: string; alt: string }
  }[]
}

const APP_DOWNLOAD = {
  label: "Download now",
  href: "https://www.17track.net/en/app",
} as const

const SOLUTIONS: Solution[] = [
  {
    name: "17TRACK Order Tracking",
    headline: "Order Tracking Solution for DTC Brands",
    icon: "/solutions/shopify-logo.svg",
    description:
      "Improve the post-purchase journey with branded order tracking, proactive delivery updates, and customer experience management to boost satisfaction and drive repeat purchases.",
    points: [
      "95% Lower WISMO",
      "16% Higher repurchase rate",
      "70%+ open rate for branded shipping emails",
    ],
    image: "/solutions/shopify.webp",
    imageAlt: "Shopper checking a branded tracking page on her phone",
    imageRatio: "488 / 456",
    badge: {
      src: "/solutions/built-for-shopify.svg",
      alt: "Built for Shopify",
    },
    actions: [
      {
        label: "Try for Free",
        href: "https://www.17track.com/en?utm_source=www.17track.net&utm_medium=home_page&utm_campaign=Get-started-free",
        tone: "solid",
      },
    ],
  },
  {
    name: "17RETURNS",
    headline: "Returns & Exchanges Solution",
    icon: "/solutions/returns-icon.webp",
    description:
      "AI-powered automation helps DTC brands manage returns and exchanges more efficiently, recover revenue, and reduce reverse logistics costs to drive continued growth.",
    points: [
      "↓ 80% Support Workload",
      "20%+ Recover Revenue",
      "18%+ Reduce Reverse Logistics Costs",
    ],
    image: "/solutions/returns-hero.webp",
    imageAlt: "17RETURNS hero with the return flow",
    // Matches the live ReturnsHero frame, so the cell follows it proportionally.
    imageRatio: "620 / 540",
    actions: [
      {
        label: "Try for Free",
        href: "https://www.17returns.com?utm_source=www.17track.com&utm_medium=products&utm_campaign=button",
        tone: "returns",
      },
    ],
  },
  {
    name: "17TRACK API",
    headline: "Global Shipment Tracking Solution",
    icon: "/solutions/api-logo.webp",
    description:
      "Access reliable, accurate global shipment data and actionable insights through a scalable API to improve service quality and operation efficiency. Built for marketplace, SaaS providers, financial services, and DTC brands.",
    points: [
      "3,500+ carriers worldwide",
      "99.9% tracking accuracy",
      "95%+ carrier auto-detection rate",
    ],
    image: "/solutions/api.webp",
    imageAlt: "17TRACK API illustration",
    imageRatio: "1440 / 1120",
    actions: [
      {
        label: "Try for Free",
        href: "https://www.17track.net/en/api",
        tone: "api",
      },
    ],
  },
  {
    name: "17TRACK App",
    icon: "/solutions/app-icon.svg",
    description:
      "Join 15+ million people who use the free app to auto-detect carriers, follow packages, and get delivery alerts as they happen.",
    points: [
      "Carrier detected from the tracking number",
      "Real-time delivery notifications",
      "Free on iOS and Android",
    ],
    image: "/solutions/app-screen.webp",
    imageAlt: "17TRACK mobile app",
    // Phone poster ratio, so the cell and the 3D frame stay uncropped.
    imageRatio: "1237 / 1280",
    phone: true,
    actions: [
      {
        label: "App Store",
        href: "https://itunes.apple.com/app/id1004956012",
        tone: "badge",
        badge: {
          src: "/footer/badge-appstore.webp",
          alt: "Download on the App Store",
        },
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=yqtrack.app",
        tone: "badge",
        badge: {
          src: "/footer/badge-googleplay.webp",
          alt: "Get it on Google Play",
        },
      },
    ],
  },
]

function Action({
  label,
  href,
  tone,
  badge,
}: Solution["actions"][number]) {
  if (tone === "badge" && badge) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.storeLink}
      >
        <img
          src={badge.src}
          alt={badge.alt}
          width={154}
          height={44}
          className={styles.storeBadge}
        />
      </a>
    )
  }

  const toneClass =
    tone === "returns"
      ? styles.buttonReturns
      : tone === "api"
        ? styles.buttonApi
        : tone === "solid"
          ? styles.buttonSolid
          : styles.buttonOutline
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${toneClass}`}
    >
      {label}
    </a>
  )
}

export function SolutionsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.headingWrap}>
        <h2 className={`track-solutions-title ${styles.heading}`}>
          Multiple package tracking solutions in one
        </h2>
      </div>
      <div>
        {SOLUTIONS.map((item, index) => {
          const flipped = index % 2 === 1
          const coveredIcon =
            item.name === "17RETURNS" || item.name === "17TRACK API"
          // Each product exposes exactly one H2: the solution headline where
          // one exists, otherwise the product name itself.
          const ProductName = item.headline ? "p" : "h2"
          return (
            <article key={item.name} className={styles.article}>
              <div className={styles.row}>
                <span aria-hidden className={styles.rule} />
                {index < SOLUTIONS.length - 1 ? (
                  <span aria-hidden className={styles.joint} />
                ) : null}
                <div
                  className={`${styles.copy} ${flipped ? styles.copyStart : styles.copyEnd}`}
                >
                  <div className={styles.intro}>
                    <div className={styles.titleRow}>
                      <img
                        src={item.icon}
                        alt=""
                        width={48}
                        height={48}
                        className={`${styles.icon} ${coveredIcon ? styles.iconCover : ""}`}
                      />
                      <ProductName className={styles.title}>
                        {item.name}
                        {item.name === "17TRACK Order Tracking" ||
                        item.name === "17RETURNS" ? (
                          <span className={`badge-sheen ${styles.pill} ${styles.pillAi}`}>
                            <svg viewBox="0 0 16 16" className={styles.spark} aria-hidden>
                              <path d="M7.2.8 8.2 5l4.2 1-4.2 1-1 4.2-1-4.2-4.2-1 4.2-1Z" />
                              <path d="M12.6 9.2 13.1 11l1.8.5-1.8.5-.5 1.8-.5-1.8-1.8-.5 1.8-.5Z" />
                            </svg>
                            Powered by AI
                          </span>
                        ) : null}
                        {item.name === "17TRACK App" ? (
                          <span className={`${styles.pill} ${styles.pillFree}`}>Free</span>
                        ) : null}
                        {item.badge ? (
                          <img
                            src={item.badge.src}
                            alt={item.badge.alt}
                            className={styles.builtFor}
                          />
                        ) : null}
                      </ProductName>
                    </div>
                    {item.headline ? (
                      <h2 className={styles.headline}>{item.headline}</h2>
                    ) : null}
                    <p className={styles.description}>{item.description}</p>
                  </div>
                  <div className={styles.details}>
                    <ul className={styles.points}>
                      {item.points.map((point) => (
                        <li key={point} className={styles.point}>
                          <span aria-hidden className={styles.dot} />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.actions}>
                      {item.actions.map((action) => (
                        <Action key={action.label} {...action} />
                      ))}
                    </div>
                    {item.phone ? (
                      <a
                        href={APP_DOWNLOAD.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.button} ${styles.buttonSolid} ${styles.downloadNow}`}
                      >
                        {APP_DOWNLOAD.label}
                      </a>
                    ) : null}
                  </div>
                </div>
                <figure
                  aria-label={item.phone ? item.imageAlt : undefined}
                  role={item.phone ? "img" : undefined}
                  className={`${styles.figure} ${item.phone ? styles.figurePhone : styles.figureClip} ${flipped ? styles.figureEnd : styles.figureStart}`}
                >
                  {item.phone ? (
                    <div className={styles.phone}>
                      <SolutionPhone />
                    </div>
) : item.name === "17TRACK Order Tracking" ? (
                      <OrderTrackingVisual />
                    ) : item.name === "17RETURNS" ? (
                      <ReturnsHero />
                    ) : item.name === "17TRACK API" ? (
                      <ApiVisual />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className={styles.fallback}
                      draggable={false}
                    />
                  )}
                </figure>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
