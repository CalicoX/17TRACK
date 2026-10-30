import { useEffect, useId, useState, type ReactNode } from "react"

const COLUMNS = [
  {
    title: "About",
    links: [
      ["About us", "https://www.17track.net/en/about"],
      ["Terms", "https://www.17track.net/en/about/licensing"],
      ["Privacy", "https://www.17track.net/en/about/privacy"],
      ["Copyright", "https://www.17track.net/en/about/copyright"],
      ["DPA", "https://www.17track.net/en/about/dpa"],
    ],
  },
  {
    title: "User Guide",
    links: [
      ["Instruction manual", "https://help.17track.net/hc/en-us/articles/228250808"],
      ["Package status", "https://help.17track.net/hc/en-us/articles/228084227"],
      ["Tracking status", "https://help.17track.net/hc/en-us/articles/228084247"],
      ["Shipping tips", "https://help.17track.net/hc/en-us/articles/228084367"],
      ["Tracking page", "https://www.17track.net/en/tracking"],
      ["Brands", "https://www.17track.net/en/brands"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Contact us", "https://www.17track.net/en/about/contactus"],
      ["Help center", "https://help.17track.net/hc/en-us"],
      ["Suggestion & Feedback", "https://help.17track.net/hc/en-us/articles/228084447"],
      ["Donate", "https://www.17track.net/en/donate"],
      ["Partners", "https://www.17track.net/en/links"],
      ["Blog", "https://www.17track.net/en/blog"],
    ],
  },
] as const

const LANGUAGES = [
  ["Help us translate", "https://help.17track.net/hc/en/articles/235533167"],
  ["English", "https://www.17track.net/en"],
  ["简体中文", "https://www.17track.net/zh-cn"],
  ["繁體中文", "https://www.17track.net/zh-hk"],
  ["Русский", "https://www.17track.net/ru"],
  ["Español", "https://www.17track.net/es"],
  ["Português", "https://www.17track.net/pt"],
  ["Français", "https://www.17track.net/fr"],
  ["Italiano", "https://www.17track.net/it"],
  ["Deutsch", "https://www.17track.net/de"],
  ["Türkçe", "https://www.17track.net/tr"],
  ["Čeština", "https://www.17track.net/cs"],
  ["日本語", "https://www.17track.net/ja"],
  ["한국어", "https://www.17track.net/ko"],
  ["Nederlands", "https://www.17track.net/nl"],
  ["Suomi", "https://www.17track.net/fi"],
  ["Polski", "https://www.17track.net/pl"],
  ["Українська", "https://www.17track.net/uk"],
  ["Magyar", "https://www.17track.net/hu"],
  ["Svenska", "https://www.17track.net/sv"],
  ["Қазақша", "https://www.17track.net/kk"],
  ["Ελληνικά", "https://www.17track.net/el"],
  ["ภาษาไทย", "https://www.17track.net/th"],
  ["Български", "https://www.17track.net/bg"],
  ["Slovenčina", "https://www.17track.net/sk"],
  ["Lietuvių", "https://www.17track.net/lt"],
  ["Română", "https://www.17track.net/ro"],
  ["Norsk", "https://www.17track.net/no"],
  ["Shqip", "https://www.17track.net/sq"],
  ["Slovenščina", "https://www.17track.net/sl"],
  ["Српски", "https://www.17track.net/sr"],
  ["Azərbaycan", "https://www.17track.net/az"],
  ["Dansk", "https://www.17track.net/da"],
  ["Македонски", "https://www.17track.net/mk"],
] as const

const linkClass =
  "mb-[18px] block text-sm leading-[1.35] text-white/66 no-underline transition-colors duration-150 hover:text-white"

function ExternalLink({
  href,
  className,
  children,
  rel = "noreferrer",
}: {
  href: string
  className?: string
  children: ReactNode
  rel?: string
}) {
  return (
    <a href={href} target="_blank" rel={rel} className={className}>
      {children}
    </a>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <ExternalLink
      href={href}
      className="inline-flex size-6 items-center justify-center opacity-90 transition-opacity hover:opacity-100"
    >
      <span className="sr-only">{label}</span>
      {children}
    </ExternalLink>
  )
}

function QrSocial({ label, icon, qr, color }: { label: string; icon: string; qr: string; color: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="group relative inline-flex size-6 items-center justify-center rounded-full opacity-90 transition-opacity hover:opacity-100"
      style={{ backgroundColor: color }}
    >
      <img src={icon} alt="" className="size-4" />
      <span className="pointer-events-none invisible absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-[140px] -translate-x-1/2 opacity-0 transition group-hover:visible group-focus-within:visible group-hover:opacity-100 group-focus-within:opacity-100">
        <img src={qr} alt="" width={140} height={140} className="block h-[140px] w-[140px] max-w-none bg-white shadow-[0_1px_3px_1px_rgba(0,0,0,0.2)]" />
      </span>
    </button>
  )
}

export function SiteFooter() {
  const menuId = useId()
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    if (!langOpen) return
    function onPointerDown(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!document.getElementById(menuId)?.parentElement?.contains(target)) setLangOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setLangOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [langOpen, menuId])

  return (
    <footer className="bg-black text-white shadow-[0_100vh_0_100vh_#000] tracking-normal">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-16 max-[640px]:px-5 max-[640px]:pt-12">
        <div className="grid grid-cols-[minmax(260px,1.2fr)_minmax(0,2fr)] gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <section className="min-w-0">
            <a href="https://www.17track.net/en" target="_blank" rel="noreferrer" aria-label="17TRACK" className="mb-7 inline-flex">
              <img src="/footer/logo-footer.svg" alt="17TRACK" width={150} height={24} className="block h-6 w-[150px] object-contain" />
            </a>
            <div>
              <h3 className="mb-3 text-base leading-tight font-bold text-white">Who We Are</h3>
              <p className="m-0 max-w-[440px] text-sm leading-[1.55] text-white/66">
                Track all your orders in one place. Sign up to get notifications at every step, and keep your orders organized and managed here.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-4" aria-label="17TRACK apps">
              <ExternalLink href="https://apps.apple.com/cn/app/17track-%E5%9B%BD%E9%99%85%E7%89%A9%E6%B5%81%E8%BD%A8%E8%BF%B9%E6%9F%A5%E8%AF%A2/id6761287858">
                <img src="/footer/badge-appstore.png" alt="Download on the App Store" width={154} height={44} className="block h-11 w-[154px] object-contain" />
              </ExternalLink>
              <ExternalLink href="https://play.google.com/store/apps/details?id=yqtrack.app">
                <img src="/footer/badge-googleplay.png" alt="Get it on Google Play" width={154} height={44} className="block h-11 w-[154px] object-contain" />
              </ExternalLink>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3" aria-label="Social links">
              <QrSocial label="WeChat" icon="/footer/wechat.svg" qr="/footer/wechat-qr.png" color="#2aae67" />
              <QrSocial label="Weibo" icon="/footer/weibo.svg" qr="/footer/weibo-qr.png" color="#e6162d" />
              <SocialLink href="https://www.facebook.com/17track" label="Facebook">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#365899]">
                  <img src="/footer/facebook.svg" alt="" className="size-4" />
                </span>
              </SocialLink>
              <SocialLink href="https://twitter.com/17track" label="Twitter">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#1da1f2]">
                  <img src="/footer/twitter.svg" alt="" className="size-4" />
                </span>
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/17track" label="LinkedIn">
                <img src="/footer/linkedin.svg" alt="" className="block size-6" />
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@17TRACKOFFICIAL" label="YouTube">
                <img src="/footer/youtube.svg" alt="" className="block h-[18px] w-auto" />
              </SocialLink>
            </div>
          </section>

          <nav aria-label="Footer" className="grid grid-cols-4 gap-8 max-[640px]:grid-cols-2 max-[640px]:gap-x-6 max-[640px]:gap-y-9">
            {COLUMNS.map((column) => (
              <div key={column.title} className="flex min-w-0 flex-col items-start">
                <h3 className="mb-3 text-base leading-tight font-bold text-white">{column.title}</h3>
                {column.links.map(([label, href]) => (
                  <ExternalLink key={label} href={href} className={linkClass}>
                    {label}
                  </ExternalLink>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-white/12">
          <div className="flex min-h-[72px] items-center justify-between gap-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:justify-center max-[640px]:gap-4 max-[640px]:py-5 max-[640px]:pb-6">
            <div className="flex items-center gap-8 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
              <div className="relative z-10">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 bg-transparent p-0 text-sm leading-none text-white"
                  aria-label="English"
                  aria-expanded={langOpen}
                  aria-controls={menuId}
                  onClick={() => setLangOpen((open) => !open)}
                >
                  English
                  <svg viewBox="0 0 12 12" aria-hidden="true" className={`size-3 transition-transform ${langOpen ? "rotate-180" : ""}`}>
                    <path d="M2.2 4.2 6 8l3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {langOpen && (
                  <div
                    id={menuId}
                    className="absolute bottom-[calc(100%+8px)] left-0 max-h-[min(360px,50vh)] w-52 overflow-auto rounded-lg bg-white py-1 text-sm text-[#0a0a0a] shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
                  >
                    {LANGUAGES.map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-current={label === "English" ? "true" : undefined}
                        className={`block px-3 py-1.5 no-underline hover:text-[#003a9b] ${label === "English" ? "font-medium text-[#003a9b]" : "text-[#0a0a0a]"}`}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-7">
                <ExternalLink href="https://www.17track.net/en/about/privacy" className="text-sm leading-[1.4] text-white/66 no-underline hover:text-white">
                  Privacy
                </ExternalLink>
                <ExternalLink href="https://www.17track.net/en/about/copyright" className="text-sm leading-[1.4] text-white/66 no-underline hover:text-white">
                  Copyright
                </ExternalLink>
                <ExternalLink href="https://www.17track.net/en/contact-us" className="text-sm leading-[1.4] text-white/66 no-underline hover:text-white">
                  Contact us
                </ExternalLink>
              </div>
            </div>
            <p className="m-0 text-right text-sm leading-[1.4] text-white/66 max-[640px]:text-left">
              © Copyright 2011-2026 17TRACK All Rights Reserved{" "}
              <ExternalLink href="https://beian.miit.gov.cn" rel="nofollow noreferrer" className="text-inherit no-underline hover:underline">
                粤ICP备11015089号
              </ExternalLink>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
