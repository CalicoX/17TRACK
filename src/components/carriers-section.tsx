import type { ReactNode } from "react"

type CarrierLogo = {
  name: string
  src: string
  href: string
}

const ROW_ONE: CarrierLogo[] = [
  {
    name: "YunExpress",
    src: "/carriers/yunexpress.svg",
    href: "https://www.17track.net/en/brand/yunexpress",
  },
  {
    name: "FLYTEXPRESS",
    src: "/carriers/flytexpress.svg",
    href: "https://www.17track.net/en/brand/flyt",
  },
  {
    name: "FOREST SHIPPING",
    src: "/carriers/forest-shipping.svg",
    href: "https://www.17track.net/en/brand/forest-shipping",
  },
]

const ROW_TWO: CarrierLogo[] = [
  {
    name: "CNE",
    src: "/carriers/cne.svg",
    href: "https://www.17track.net/en/brand/cne",
  },
  {
    name: "JDL",
    src: "/carriers/jdl.svg",
    href: "https://www.17track.net/en/brand/jingdong-logistics",
  },
  {
    name: "YDH",
    src: "/carriers/ydh.svg",
    href: "https://www.17track.net/en/brand/ydh",
  },
  {
    name: "1S EXPRESS",
    src: "/carriers/1s-express.svg",
    href: "https://www.17track.net/en/brand/js-express",
  },
]

const ROW_THREE: CarrierLogo[] = [
  {
    name: "WANB",
    src: "/carriers/wanb.svg",
    href: "https://www.17track.net/en/brand/wanb-express",
  },
  {
    name: "AYS Express",
    src: "/carriers/ays-express.svg",
    href: "https://www.17track.net/en/brand/ays-logistics",
  },
  {
    name: "China Post",
    src: "/carriers/china-post.svg",
    href: "https://www.17track.net/en/carriers/china-post",
  },
  {
    name: "DHL",
    src: "/carriers/dhl-express.png",
    href: "https://www.17track.net/en/carriers/dhl-express",
  },
  {
    name: "SF Express",
    src: "/carriers/sf-express.svg",
    href: "https://www.17track.net/en/carriers/sf-express",
  },
]

const carrierCardShape = "rounded-[20px] [corner-shape:squircle]"

function LogoCard({ name, src, href }: CarrierLogo) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-[120px] min-w-0 items-center justify-center overflow-hidden border border-[#e0e0e0] ${name === "DHL" ? "bg-[#f5cc42]" : "bg-white"} ${carrierCardShape}`}
    >
      <img src={src} alt={name} className="max-h-full max-w-full object-contain" />
    </a>
  )
}

function JoinCard() {
  return (
    <a
      href="mailto:davi@17track.net"
      className={`group flex h-[120px] min-w-0 flex-col items-center justify-center gap-[5px] border border-[#e0e0e0] bg-white ${carrierCardShape}`}
    >
      <img src="/carriers/mail.svg" alt="" className="h-8 w-8" />
      <span className="text-[14px] leading-none font-medium text-[#000075]">
        Join Now<span className="inline-block transition-transform duration-300 group-hover:translate-x-2">&gt;&gt;</span>
      </span>
    </a>
  )
}

function LogoRow({
  logos,
  className,
  trailing,
}: {
  logos: CarrierLogo[]
  className: string
  trailing?: ReactNode
}) {
  return (
    <div className={className}>
      {logos.map((logo) => (
        <LogoCard key={logo.name} {...logo} />
      ))}
      {trailing}
    </div>
  )
}

export function CarriersSection() {
  return (
    <section className="hidden w-full bg-[#f6f6f6] pt-[100px] pb-[100px] text-[#212121] antialiased md:block">
      <div className="mx-auto w-full max-w-[1320px] px-[15px]">
        <h2 className="track-carriers-title mb-[5px] text-center font-bold text-[#212121]">
          3500+ Carriers in one
        </h2>
        <p className="mx-auto mb-[30px] max-w-[728px] text-center text-[16px] leading-6 text-[#212121]">
          Stop jumping between carrier websites. Track shipments from 3500+
          carriers globally for real-time updates in one unified platform with
          17TRACK.
        </p>
        <div className="flex flex-col gap-[30px]">
          <LogoRow
            logos={ROW_ONE}
            className="grid grid-cols-1 gap-[30px] sm:grid-cols-3"
          />
          <LogoRow
            logos={ROW_TWO}
            className="grid grid-cols-2 gap-[30px] md:grid-cols-4"
          />
          <LogoRow
            logos={ROW_THREE}
            className="grid grid-cols-2 gap-[30px] sm:grid-cols-3 lg:grid-cols-6"
            trailing={<JoinCard />}
          />
        </div>
      </div>
      <a
        href="https://www.17track.net/en/carriers"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-[30px] block max-w-[360px] text-center text-[14px] leading-[34px] text-[#003a9b]"
      >
        View All Supported Carriers &gt;&gt;
      </a>
    </section>
  )
}
