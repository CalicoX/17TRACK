import { ApiVisual } from "@/components/api-visual"
import { OrderTrackingVisual } from "@/components/order-tracking-visual"
import { ReturnsHero } from "@/components/returns-hero"
import { SolutionPhone } from "@/components/solution-phone"
import styles from "@/components/solutions-section.module.scss"

type Solution = {
  name: string
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
    name: "Shopify Order Tracking",
    icon: "/solutions/shopify-logo.svg",
    description:
      "Centralize all shipment data in a single dashboard, keep customers informed at every stage with automated email notifications, and streamline returns — all within one 17TRACK Shopify app.",
    points: [
      "Every shipment in one dashboard",
      "Automated email updates at each stage",
      "Returns handled in the same app",
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
        label: "Get started free",
        href: "https://www.17track.com/en?utm_source=www.17track.net&utm_medium=home_page&utm_campaign=Get-started-free",
        tone: "solid",
      },
    ],
  },
  {
    name: "17RETURNS",
    icon: "/solutions/returns-icon.png",
    description:
      "AI-powered returns that run around the clock, recover revenue, and take the repeat work off your support team.",
    points: [
      "Recover 20%+ of revenue",
      "Cut reverse logistics cost by 18%+",
      "Automate returns 24/7 and reduce support work by 80%",
    ],
    image: "/solutions/returns-hero.webp",
    imageAlt: "17RETURNS hero with the return flow",
    // Matches the live ReturnsHero frame, so the cell follows it proportionally.
    imageRatio: "620 / 540",
    actions: [
      {
        label: "Start free trial",
        href: "https://www.17returns.com?utm_source=www.17track.com&utm_medium=products&utm_campaign=button",
        tone: "returns",
      },
    ],
  },
  {
    name: "Tracking API",
    icon: "/solutions/api-logo.png",
    description:
      "One tracking API covers 3,500+ carriers and sends reliable, real-time updates to your users.",
    points: [
      "One integration for 3,500+ carriers",
      "Real-time updates for end users",
      "Made for logistics, eCommerce, SaaS, and payments",
    ],
    image: "/solutions/api.webp",
    imageAlt: "17TRACK Tracking API illustration",
    imageRatio: "1440 / 1120",
    actions: [
      {
        label: "Try for free",
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
    image: "/solutions/app-screen.png",
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
          src: "/footer/badge-appstore.png",
          alt: "Download on the App Store",
        },
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=yqtrack.app",
        tone: "badge",
        badge: {
          src: "/footer/badge-googleplay.png",
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
            item.name === "17RETURNS" || item.name === "Tracking API"
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
                        width={64}
                        height={64}
                        className={`${styles.icon} ${coveredIcon ? styles.iconCover : ""}`}
                      />
                      <h3 className={`track-solution-title ${styles.title}`}>
                        {item.name}
                        {item.name === "Shopify Order Tracking" ||
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
                      </h3>
                    </div>
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
                  ) : item.name === "Shopify Order Tracking" ? (
                    <OrderTrackingVisual />
                  ) : item.name === "17RETURNS" ? (
                    <ReturnsHero />
                  ) : item.name === "Tracking API" ? (
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
