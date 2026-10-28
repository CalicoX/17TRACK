type Solution = {
  name: string
  description: string
  points: string[]
  image: string
  imageAlt: string
  badge?: { src: string; alt: string }
  actions: { label: string; href: string; tone: "solid" | "outline" }[]
}

const SOLUTIONS: Solution[] = [
  {
    name: "Shopify Order Tracking",
    description:
      "Centralize all shipment data in a single dashboard, keep customers informed at every stage with automated email notifications, and streamline returns — all within one 17TRACK Shopify app.",
    points: [
      "Every shipment in one dashboard",
      "Automated email updates at each stage",
      "Returns handled in the same app",
    ],
    image: "/solutions/shopify.webp",
    imageAlt: "Shopify order tracking list and a package timeline",
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
    description:
      "AI-powered returns that run around the clock, recover revenue, and take the repeat work off your support team.",
    points: [
      "Recover 20%+ of revenue",
      "Cut reverse logistics cost by 18%+",
      "Automate returns 24/7 and reduce support work by 80%",
    ],
    image: "/solutions/returns.webp",
    imageAlt: "17RETURNS product",
    actions: [
      {
        label: "Start free trial",
        href: "https://www.17returns.com?utm_source=www.17track.com&utm_medium=products&utm_campaign=button",
        tone: "solid",
      },
    ],
  },
  {
    name: "Tracking API",
    description:
      "Built for logistics providers, eCommerce platforms, SaaS companies, and payment platforms. One tracking API covers 3,500+ carriers and sends reliable, real-time updates to your users.",
    points: [
      "One integration for 3,500+ carriers",
      "Real-time updates for end users",
      "Made for logistics, eCommerce, SaaS, and payments",
    ],
    image: "/solutions/api.webp",
    imageAlt: "17TRACK Tracking API illustration",
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
    description:
      "Join 15+ million people who use the free app to auto-detect carriers, follow packages, and get delivery alerts as they happen.",
    points: [
      "Carrier detected from the tracking number",
      "Real-time delivery notifications",
      "Free on iOS and Android",
    ],
    image: "/solutions/app.webp",
    imageAlt: "17TRACK mobile app",
    actions: [
      {
        label: "App Store",
        href: "https://itunes.apple.com/app/id1004956012",
        tone: "solid",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=yqtrack.app",
        tone: "outline",
      },
    ],
  },
]

function Action({
  label,
  href,
  tone,
}: Solution["actions"][number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        tone === "solid"
          ? "inline-flex h-12 items-center rounded-full bg-[#003a9b] px-5 text-[14px] leading-5 font-medium text-white no-underline hover:bg-[#002f7d]"
          : "inline-flex h-12 items-center rounded-full border border-[#d2d6dd] bg-white px-5 text-[14px] leading-5 font-medium text-[#212121] no-underline hover:bg-[#f6f6f6]"
      }
    >
      {label}
    </a>
  )
}

export function SolutionsSection() {
  return (
    <section className="w-full bg-white py-24 text-[#212121] antialiased">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 px-6">
        <h2 className="track-solutions-title text-center font-bold">
          Multiple package tracking solutions in one
        </h2>
        {SOLUTIONS.map((item, index) => {
          const flipped = index % 2 === 1
          return (
            <article
              key={item.name}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <figure
                className={
                  flipped
                    ? "order-1 m-0 md:order-2"
                    : "order-1 m-0"
                }
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-auto w-full rounded-[24px] bg-[#f6f6f6] object-contain"
                />
              </figure>
              <div className={flipped ? "order-2 md:order-1" : "order-2"}>
                <h3 className="track-solution-title flex flex-wrap items-center gap-x-3 gap-y-2 font-bold">
                  {item.name}
                  {item.badge ? (
                    <img
                      src={item.badge.src}
                      alt={item.badge.alt}
                      className="h-[25px] w-auto"
                    />
                  ) : null}
                </h3>
                <p className="mt-1 text-[16px] leading-6 text-[#5c6370]">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
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
            </article>
          )
        })}
      </div>
    </section>
  )
}
