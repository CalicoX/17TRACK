import { ApiVisual } from "@/components/api-visual"
import { OrderTrackingVisual } from "@/components/order-tracking-visual"
import { ReturnsHero } from "@/components/returns-hero"
import { SolutionPhone } from "@/components/solution-phone"

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
    tone: "solid" | "outline" | "returns" | "badge"
    badge?: { src: string; alt: string }
  }[]
}

// One ceiling for every solution artwork. Tall frames shrink to it and keep
// their ratio; the wide API diagram stays shorter because the column cannot
// fit it at this height. Wide desktops also give the figure this slot so the
// four rows line up.
const SOLUTION_VISUAL_MAX = "470px"

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
        tone: "solid",
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
        className="inline-flex shrink-0 no-underline"
      >
        <img
          src={badge.src}
          alt={badge.alt}
          width={154}
          height={44}
          className="block h-11 w-[154px] object-contain"
        />
      </a>
    )
  }

  const size =
    "inline-flex h-10 items-center justify-center rounded-full px-4 py-0 text-[16px] leading-5 font-medium no-underline"
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        tone === "returns"
          ? `${size} bg-[#15b497] text-white hover:bg-[#11927a]`
          : tone === "solid"
            ? `${size} bg-[#003a9b] text-white hover:bg-[#002f7d]`
            : `${size} border border-[#d2d6dd] bg-white text-[#212121] hover:bg-[#f6f6f6]`
      }
    >
      {label}
    </a>
  )
}

export function SolutionsSection() {
  return (
    <section
      className="w-full bg-white py-24 text-[#212121] antialiased"
      style={{ ["--solution-visual-max" as string]: SOLUTION_VISUAL_MAX }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6">
        <h2 className="track-solutions-title mb-12 text-center font-bold md:mb-16">
          Multiple package tracking solutions in one
        </h2>
      </div>
      <div>
          {SOLUTIONS.map((item, index) => {
            const flipped = index % 2 === 1
            const textCol = flipped ? "lg:order-1 lg:pr-14" : "lg:order-2 lg:pl-14"
            return (
              <article
                key={item.name}
                className="border-[#f0f2f5] max-lg:mb-16 max-lg:border-b-0 max-lg:last:mb-0 lg:border-b lg:last:border-b-0"
              >
              <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 px-6 lg:grid-cols-2">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] hidden w-px -translate-x-1/2 bg-[#f0f2f5] lg:block"
                />
                {index < SOLUTIONS.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-full left-1/2 z-10 hidden size-[6px] -mt-[2.5px] -ml-[3.5px] bg-[#f0f2f5] lg:block"
                  />
                ) : null}
                {/* contents below lg so the figure can sit between these two
                    blocks; one centered column from lg up. */}
                <div
                  className={`contents lg:flex lg:min-w-0 lg:flex-col lg:justify-center lg:py-14 ${textCol}`}
                >
                <div className="order-1 min-w-0 pt-8 lg:pt-0">
                  <div className="flex items-start gap-2.5 lg:flex-col lg:gap-4">
                  <img
                    src={item.icon}
                    alt=""
                    width={64}
                    height={64}
                    className={
                      item.name === "17RETURNS" || item.name === "Tracking API"
                        ? "mt-0.5 block size-8 shrink-0 overflow-hidden rounded-lg object-cover lg:mt-0 lg:size-[64px] lg:rounded-[14px]"
                        : "mt-0.5 block size-8 shrink-0 object-contain object-left lg:mt-0 lg:size-[64px]"
                    }
                  />
                  <h3 className="track-solution-title flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 font-bold">
                    {item.name}
                    {item.name === "Shopify Order Tracking" ||
                    item.name === "17RETURNS" ? (
                      <span className="badge-sheen inline-flex shrink-0 items-center gap-1 rounded-full bg-[#7c3aed] px-2.5 py-0.5 text-[13px] leading-[18px] font-medium tracking-normal text-white">
                        <svg
                          viewBox="0 0 16 16"
                          className="size-3.5"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M7.2.8 8.2 5l4.2 1-4.2 1-1 4.2-1-4.2-4.2-1 4.2-1Z" />
                          <path d="M12.6 9.2 13.1 11l1.8.5-1.8.5-.5 1.8-.5-1.8-1.8-.5 1.8-.5Z" />
                        </svg>
                        Powered by AI
                      </span>
                    ) : null}
                    {item.name === "17TRACK App" ? (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-[#ff8a00] px-2.5 py-0.5 text-[13px] leading-[18px] font-medium tracking-normal text-white">
                        Free
                      </span>
                    ) : null}
                    {item.badge ? (
                      <img
                        src={item.badge.src}
                        alt={item.badge.alt}
                        className="h-[25px] w-auto"
                      />
                    ) : null}
                  </h3>
                  </div>
                  <p className="mt-1 text-[16px] leading-6 text-[#5c6370]">
                    {item.description}
                  </p>
                </div>
                <div className="order-3 min-w-0 pb-8 lg:mt-5 lg:pb-0">
                  <ul className="flex flex-col gap-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[15px] leading-6 font-medium"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#212121]"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.actions.map((action) => (
                      <Action key={action.label} {...action} />
                    ))}
                  </div>
                </div>
                </div>
                <figure
                  aria-label={item.phone ? item.imageAlt : undefined}
                  role={item.phone ? "img" : undefined}
                  className={`relative order-2 my-0 flex min-w-0 items-center justify-center py-6 lg:px-12 lg:py-12 min-[1360px]:min-h-[calc(var(--solution-visual-max)+6rem)] ${item.phone ? "max-lg:overflow-x-clip" : "overflow-hidden"} ${flipped ? "lg:order-2" : "lg:order-1"}`}
                >
                  {item.phone ? (
                    <div
                      className="mx-auto w-full lg:translate-x-8"
                      style={{
                        maxWidth:
                          "min(100%, 560px, calc(var(--solution-visual-max) * 1237 / 1280))",
                      }}
                    >
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
                      className="block h-auto w-full object-contain"
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
