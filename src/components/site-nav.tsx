import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const GIFT_PATH =
  "M841.477 282.818H696.769a132.595 132.595 0 0 0 6.514-4.752c31.391-24.461 55.673-54.961 68.373-85.882 14.947-36.394 12.548-71.349-6.585-95.901-19.132-24.552-52.439-35.421-91.383-29.824-33.087 4.757-68.597 20.848-99.988 45.308-22.488 17.523-40.221 43.148-52.108 75.009-11.887-31.861-29.62-57.486-52.108-75.009-31.392-24.46-66.901-40.551-99.988-45.308-38.945-5.601-72.251 5.271-91.384 29.824-19.132 24.552-21.532 59.507-6.584 95.901 12.7 30.921 36.981 61.421 68.373 85.882a133.075 133.075 0 0 0 6.514 4.752H182.523c-29.751 0-54.093 24.343-54.093 54.093v167.197h338.083v-180.72h94.663v180.721H895.57V336.911c0-29.75-24.342-54.093-54.093-54.093zM613.038 162.25c22.416-17.467 47.842-29.292 69.758-32.443 15.118-2.177 27.304 0.052 31.793 5.813 4.488 5.76 3.67 18.117-2.134 32.249-8.412 20.481-26.094 42.246-48.51 59.713-25.255 19.681-64.219 21.664-92.171 19.325 4.567-27.697 16.016-64.983 41.264-84.657z m-282.309 5.619c-5.804-14.132-6.622-26.489-2.134-32.249 4.487-5.76 16.669-7.99 31.792-5.813 21.917 3.151 47.342 14.976 69.758 32.443 25.257 19.681 36.704 56.983 41.267 84.652-27.973 2.343-66.926 0.354-92.175-19.32-22.416-17.467-40.096-39.231-48.508-59.713zM561.176 958.983h243.419c29.751 0 54.093-24.343 54.093-54.093V560.66H561.176v398.323zM160.394 904.89c0 29.751 24.341 54.093 54.093 54.093h252.025V560.66H160.394v344.23z"

const RESOURCES = [
  ["Notifications", "Automated updates to keep customers informed", "https://www.17track.com/en/products/notifications"],
  ["Partnership & Integration", "Fast integration with e-commerce tools for efficiency", "https://www.17track.com/en/integration"],
  ["Tracking Widget", "One-click embed for real-time store tracking", "https://extcall.17track.net/en?utm_source=www.17track.com&utm_medium=menus&utm_campaign=header"],
  ["User Cases", "Case studies reveal how brands achieve success", "https://www.17track.com/en/user-case"],
  ["Reports", "Real logistics data and deep analysis to reveal cross-border market changes, risks, and emerging opportunities.", "https://www.17track.com/en/reports"],
  ["Blog & Insights", "Focused on global e-commerce and logistics trends, delivering actionable insights and growth ideas.", "https://www.17track.com/en/blog"],
] as const

function Gift({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1024 1024" aria-hidden="true">
      <path fill="currentColor" d={GIFT_PATH} />
    </svg>
  )
}

function MenuLink({
  href,
  title,
  desc,
  onNavigate,
}: {
  href: string
  title: string
  desc: string
  onNavigate: () => void
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={onNavigate}
      className="flex flex-col gap-1 rounded-lg px-4 py-3 text-[#0a0a0a] no-underline hover:bg-[#f7f8fa]"
    >
      <span className="text-sm leading-5 font-semibold">{title}</span>
      <span className="text-xs leading-4 font-normal text-[#5c6370]">{desc}</span>
    </a>
  )
}

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobile)
    return () => document.body.classList.remove("overflow-hidden")
  }, [mobile])

  function closeAll() {
    setOpen(null)
    setMobile(false)
  }

  function toggle(id: string) {
    setOpen((current) => (current === id ? null : id))
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6e8ec] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-6">
        <div className="flex min-w-0 items-center gap-10 max-[1200px]:gap-4">
          <a href="https://www.17track.com/en" target="_blank" rel="noopener" aria-label="17TRACK" className="shrink-0">
            <img src="/bfcm/logo-17track.svg" alt="17TRACK" className="h-5 w-auto" />
          </a>

          <nav
            aria-label="Primary"
            className={cn(
              "flex items-center gap-3",
              "max-[1200px]:fixed max-[1200px]:inset-x-0 max-[1200px]:top-16 max-[1200px]:bottom-0 max-[1200px]:z-40 max-[1200px]:flex-col max-[1200px]:items-stretch max-[1200px]:overflow-auto max-[1200px]:bg-white/95 max-[1200px]:px-5 max-[1200px]:py-3 max-[1200px]:backdrop-blur-xl",
              !mobile && "max-[1200px]:hidden",
            )}
          >
            <div className="flex items-center gap-2 max-[1200px]:flex-col max-[1200px]:items-stretch">
              <a className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-[#5c6370] no-underline hover:bg-[#eef2fb] hover:text-[#003a9b]" href="https://www.17track.com/en/products/tracking" target="_blank" rel="noopener">Tracking</a>
              <a className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-[#5c6370] no-underline hover:bg-[#eef2fb] hover:text-[#003a9b]" href="https://www.17track.com/en/products/returns" target="_blank" rel="noopener">17RETURNS</a>
              <a className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-[#5c6370] no-underline hover:bg-[#eef2fb] hover:text-[#003a9b]" href="https://www.17track.net/en/api?utm_source=www.17track.com&utm_medium=menus&utm_campaign=header" target="_blank" rel="noopener">API</a>
            </div>
            <span className="h-4 w-px bg-[#e6e8ec] max-[1200px]:hidden" aria-hidden />
            <div className="flex items-center gap-2 max-[1200px]:flex-col max-[1200px]:items-stretch">
              <div
                className="relative"
                onMouseEnter={() => { if (window.matchMedia("(min-width: 1201px)").matches) setOpen("carriers") }}
                onMouseLeave={() => { if (window.matchMedia("(min-width: 1201px)").matches) setOpen(null) }}
              >
                <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-[#5c6370] hover:bg-[#eef2fb] hover:text-[#003a9b] max-[1200px]:w-full max-[1200px]:justify-between" aria-expanded={open === "carriers"} onClick={() => toggle("carriers")}>
                  Carriers
                  <img src="/bfcm/icon-dropdown.svg" alt="" className="size-4 opacity-70" />
                </button>
                {open === "carriers" && (
                  <div className="absolute top-[calc(100%+8px)] left-0 z-30 w-80 rounded-xl border border-[#e6e8ec] bg-white p-2 shadow-[0_20px_50px_rgba(10,10,10,0.1)] max-[1200px]:static max-[1200px]:w-auto max-[1200px]:border-0 max-[1200px]:bg-transparent max-[1200px]:shadow-none">
                    <MenuLink href="https://www.17track.com/en/carriers" title="Carriers" desc="3,500+ carriers for seamless global shipping" onNavigate={closeAll} />
                  </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => { if (window.matchMedia("(min-width: 1201px)").matches) setOpen("resources") }}
                onMouseLeave={() => { if (window.matchMedia("(min-width: 1201px)").matches) setOpen(null) }}
              >
                <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-[#5c6370] hover:bg-[#eef2fb] hover:text-[#003a9b] max-[1200px]:w-full max-[1200px]:justify-between" aria-expanded={open === "resources"} onClick={() => toggle("resources")}>
                  Resources
                  <img src="/bfcm/icon-dropdown.svg" alt="" className="size-4 opacity-70" />
                </button>
                {open === "resources" && (
                  <div className="absolute top-[calc(100%+8px)] left-0 z-30 w-80 rounded-xl border border-[#e6e8ec] bg-white p-2 shadow-[0_20px_50px_rgba(10,10,10,0.1)] max-[1200px]:static max-[1200px]:w-auto max-[1200px]:border-0 max-[1200px]:bg-transparent max-[1200px]:shadow-none">
                    {RESOURCES.map(([title, desc, href]) => (
                      <MenuLink key={title} href={href} title={title} desc={desc} onNavigate={closeAll} />
                    ))}
                  </div>
                )}
              </div>
              <a className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-[#5c6370] no-underline hover:bg-[#eef2fb] hover:text-[#003a9b]" href="https://www.17track.com/en/pricing" target="_blank" rel="noopener">Pricing</a>
              <div
                className="relative"
                onMouseEnter={() => { if (window.matchMedia("(min-width: 1201px)").matches) setOpen("bfcm") }}
                onMouseLeave={() => { if (window.matchMedia("(min-width: 1201px)").matches) setOpen(null) }}
              >
                <button
                  type="button"
                  aria-expanded={open === "bfcm"}
                  onClick={() => toggle("bfcm")}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#3a3d44] pr-2.5 pl-3 text-[#f6d56b] hover:bg-[#2c2f35]"
                >
                  <Gift className="size-3.5 origin-[50%_80%] text-[#f6d56b] motion-safe:animate-[bfcm-gift-pop_2.4s_ease-in-out_infinite]" />
                  <span className="bg-[linear-gradient(105deg,#fff4c8_0%,#f6d56b_46%,#e2b34a_100%)] bg-clip-text text-sm font-medium text-transparent">BFCM 2026</span>
                  <span className="size-[7px] rounded-full bg-[#f6d56b] motion-safe:animate-[bfcm-pulse_1.6s_ease-out_infinite]" />
                </button>
                {open === "bfcm" && (
                  <div className="absolute top-[calc(100%+12px)] left-1/2 z-30 w-[480px] -translate-x-1/2 rounded-[20px] border border-slate-900/6 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.12)] max-[1200px]:static max-[1200px]:w-auto max-[1200px]:translate-x-0 max-[1200px]:border-0 max-[1200px]:bg-transparent max-[1200px]:p-0 max-[1200px]:shadow-none">
                    <ul className="m-0 flex list-none flex-col gap-1 p-0">
                      <li>
                        <a href="https://www.17track.com/en/products/tracking" target="_blank" rel="noopener" onClick={closeAll} className="grid grid-cols-[minmax(0,1fr)_128px] items-center gap-4 rounded-xl p-3 no-underline hover:bg-[#f7f8fa] max-[1200px]:grid-cols-1">
                          <span className="grid gap-1">
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#0a0a0a]">Shopify Tracking</span>
                              <span className="rounded-full bg-[linear-gradient(105deg,#fff4c8,#f6d56b_46%,#e2b34a)] px-2 py-0.5 text-[11px] leading-4 font-bold text-[#3a2a08]">Black Friday</span>
                            </span>
                            <span className="text-xs leading-4 text-[#5c6370]">Save up to 30% on yearly plans, plus 20% extra quota, November 3–30.</span>
                          </span>
                          <img src="/bfcm/hero-sneakers.jpg" alt="" className="h-[86px] w-32 rounded-[10px] object-cover" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.17track.com/en/products/returns" target="_blank" rel="noopener" onClick={closeAll} className="grid grid-cols-[minmax(0,1fr)_128px] items-center gap-4 rounded-xl p-3 no-underline hover:bg-[#f7f8fa] max-[1200px]:grid-cols-1">
                          <span className="grid gap-1">
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#0a0a0a]">17RETURNS</span>
                              <span className="rounded-full bg-[linear-gradient(105deg,#fff4c8,#f6d56b_46%,#e2b34a)] px-2 py-0.5 text-[11px] leading-4 font-bold text-[#3a2a08]">Black Friday</span>
                            </span>
                            <span className="text-xs leading-4 text-[#5c6370]">Black Friday pricing November 3–30. Bundle with Tracking for another 5% off.</span>
                          </span>
                          <img src="/bfcm/hero-returns.jpg" alt="" className="h-[86px] w-32 rounded-[10px] object-cover" />
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a className="inline-flex items-center gap-0.5 px-2 text-sm font-medium text-[#0007b7] no-underline max-[640px]:hidden" href="https://user.17track.net/login?lang=en" target="_blank" rel="noopener">
            Sign in
            <img src="/bfcm/icon-chevron.svg" alt="" className="size-4" />
          </a>
          <a className="inline-flex overflow-hidden rounded-full text-sm font-medium text-white no-underline hover:brightness-110" href="https://user.17track.net/register?lang=en" target="_blank" rel="noopener">
            <span className="bg-[#003a9b] py-2 pr-2 pl-4">Sign up</span>
            <span className="flex w-7 items-center bg-[#003a9b] pr-2"><img src="/bfcm/icon-caret.svg" alt="" className="size-4" /></span>
          </a>
          <a className="inline-flex overflow-hidden rounded-full text-sm font-medium text-white no-underline hover:brightness-110 max-[1200px]:hidden" href="https://apps.shopify.com/17track?utm_source=www.17track.com&utm_medium=menus&utm_campaign=header" target="_blank" rel="noopener">
            <span className="inline-flex items-center gap-1 bg-[#377e62] py-2 pr-2 pl-4">
              <img src="/bfcm/icon-bag.svg" alt="" className="size-4" />
              Shopify App
            </span>
            <span className="flex w-7 items-center bg-[#377e62] pr-2"><img src="/bfcm/icon-caret.svg" alt="" className="size-4" /></span>
          </a>
          <button
            type="button"
            className="hidden size-10 items-center justify-center gap-[5px] rounded-lg border border-[#e6e8ec] bg-transparent max-[1200px]:inline-flex max-[1200px]:flex-col"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((value) => !value)}
          >
            <span className={cn("block h-0.5 w-4 rounded-full bg-[#0a0a0a] transition", mobile && "translate-y-[7px] rotate-45")} />
            <span className={cn("block h-0.5 w-4 rounded-full bg-[#0a0a0a] transition", mobile && "opacity-0")} />
            <span className={cn("block h-0.5 w-4 rounded-full bg-[#0a0a0a] transition", mobile && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>
      </div>
    </header>
  )
}
