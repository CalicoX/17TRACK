import { useEffect, useRef, useState } from "react"
import styles from "@/components/solutions-section.module.scss"
import type { CSSProperties, ReactNode } from "react"

const FRAME = { width: 620, height: 540 }

const GLASS: CSSProperties = {
  backdropFilter: "blur(20px) saturate(1.35)",
  WebkitBackdropFilter: "blur(20px) saturate(1.35)",
  backgroundColor: "rgba(255, 255, 255, 0.55)",
  border: "1px solid rgba(255, 255, 255, 0.9)",
  boxShadow:
    "inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 12px 32px -16px rgba(15, 23, 42, 0.18)",
  animation: "none",
  transition: "none",
}

const ITEMS = [
  {
    name: "Olive Green Sports Set",
    meta: ["Olive | xxl", "$80.00", "x2"],
    src: "/solutions/returns-set.jpg",
  },
  {
    name: "Athletic Zip-Up Jacket",
    meta: ["White | xxl", "$60.00", "x1"],
    src: "/solutions/returns-jacket.jpg",
  },
  {
    name: "Beige Athletic Sneakers",
    meta: ["US 9.5", "$90.00", "x1"],
    src: "/solutions/returns-sneaker.jpg",
  },
] as const

const REASONS = [
  "Arrive too late",
  "Poor quality/faulty",
  "Parcel damaged on arrival",
  "Doesn't suit me",
  "Looks different to image on site",
] as const

function Glass({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <div
      data-returns-glass=""
      className={`rounded-[18px] px-4 pt-4 pb-3.5 ${className ?? ""}`}
      style={{ ...GLASS, ...style }}
    >
      {children}
    </div>
  )
}

function ItemMark({ on }: { on?: boolean }) {
  if (on) {
    return (
      <span
        aria-hidden
        className="size-3.5 shrink-0 justify-self-end rounded-full bg-[#0d9488] shadow-[inset_0_0_0_3px_#fff]"
      />
    )
  }
  return (
    <span
      aria-hidden
      className="size-3.5 shrink-0 justify-self-end rounded-full border border-[#d4d4d8]"
    />
  )
}

function ReasonMark({ on }: { on?: boolean }) {
  if (on) {
    return (
      <span
        aria-hidden
        className="grid size-4 shrink-0 place-items-center rounded-full bg-[#14b8a6] text-white"
      >
        <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
          <path
            d="M2.4 6.2 4.8 8.6 9.6 3.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  }
  return (
    <span
      aria-hidden
      className="size-4 shrink-0 rounded-full border border-[#d4d4d8]"
    />
  )
}

function Meta({ parts }: { parts: readonly string[] }) {
  return (
    <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[10.5px] leading-[14px] tracking-[-0.01em] text-[#737373]">
      {parts.map((part, index) => (
        <span key={part} className="inline-flex items-center gap-1.5">
          {index > 0 ? (
            <span className="size-[3px] rounded-full bg-current opacity-45" />
          ) : null}
          <span
            className={
              part.startsWith("$") ? "font-semibold text-[#171717]" : undefined
            }
          >
            {part}
          </span>
        </span>
      ))}
    </p>
  )
}

function ExchangeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" aria-hidden>
      <path
        d="M6.5 4.5H4.2A1.2 1.2 0 0 0 3 5.7v8.6A1.2 1.2 0 0 0 4.2 15.5h7.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13.5 15.5h2.3A1.2 1.2 0 0 0 17 14.3V5.7A1.2 1.2 0 0 0 15.8 4.5H8.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8.2 7.2 6.2 5.2 8.2 3.2M11.8 12.8l2 2 2-2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" aria-hidden>
      <path
        d="M3.5 7.2 10 4l6.5 3.2v8.1L10 18.4 3.5 15.3V7.2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 4v14.4M3.5 7.2 10 10.5l6.5-3.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" aria-hidden>
      <rect
        x="4.2"
        y="3.4"
        width="11.6"
        height="13.2"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7.2 10h5.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

const METHODS = [
  { label: "Exchanges", icon: ExchangeIcon },
  { label: "Return and Refund", icon: BoxIcon },
  { label: "Green Return", icon: DocIcon },
] as const

export function ReturnsHero({ className }: { className?: string }) {
  const [selectedItem, setSelectedItem] = useState<string>(ITEMS[1].name)
  const [selectedReason, setSelectedReason] = useState<string>(REASONS[0])
  const [selectedMethod, setSelectedMethod] = useState<string>(METHODS[2].label)
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME.width)
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`relative flex w-full items-center justify-center ${className ?? ""}`}
    >
      {/* Below lg the frame is short of the cell so the -4% / -24px cards
          land on the cell edges. lg keeps the 90% cap. */}
      <div
        ref={frameRef}
        className={styles.returns}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: FRAME.width,
            height: FRAME.height,
            transform: `scale(${scale})`,
          }}
        >
        <img
          src="/solutions/returns-court.jpg"
          alt=""
          width={864}
          height={1152}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full scale-[0.88] rounded-[22px] bg-[#f4f1ec] object-cover shadow-[0_24px_48px_-28px_rgba(15,23,42,0.18)]"
          style={{ objectPosition: "68% 36%" }}
        />

        <div className="absolute -left-[4%] top-[3%] z-10 flex w-[50%] max-w-[300px] flex-col">
          <Glass>
            <p className="mb-3 text-[13px] leading-5 font-medium tracking-[-0.02em] text-[#111827]">
              What would you like to return?
            </p>
            <div className="flex flex-col gap-2">
              {ITEMS.map((item) => {
                const isSelected = item.name === selectedItem
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedItem(item.name)}
                    className={
                      isSelected
                        ? "grid w-full cursor-pointer grid-cols-[40px_minmax(0,1fr)_14px] items-center gap-2.5 rounded-xl bg-white px-2 py-1.5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                        : "grid w-full cursor-pointer grid-cols-[40px_minmax(0,1fr)_14px] items-center gap-2.5 rounded-xl px-2 py-1.5 text-left hover:bg-white/50"
                    }
                  >
                    <img
                      src={item.src}
                      alt=""
                      width={40}
                      height={40}
                      draggable={false}
                      className="size-10 rounded-[10px] object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] leading-[1.25] font-semibold tracking-[-0.02em] text-[#111827]">
                        {item.name}
                      </span>
                      <Meta parts={item.meta} />
                    </span>
                    <ItemMark on={isSelected} />
                  </button>
                )
              })}
            </div>
          </Glass>

          <span
            aria-hidden
            className="z-[1] -my-1 flex h-9 flex-col items-center self-center"
          >
            <span className="size-2 shrink-0 rounded-full bg-[#14b8a6] shadow-[0_0_0_3px_rgba(20,184,166,0.2)]" />
            <span className="my-0.5 w-0 flex-1 border-l border-dashed border-[#5eead4]" />
            <span className="size-2 shrink-0 rounded-full bg-[#14b8a6] shadow-[0_0_0_3px_rgba(20,184,166,0.2)]" />
          </span>

          <Glass>
            <p className="mb-3 text-[13px] leading-5 font-medium tracking-[-0.02em] text-[#111827]">
              Select return reason
            </p>
            <div className="flex flex-col gap-2">
              {REASONS.map((reason) => {
                const isSelected = reason === selectedReason
                return (
                  <button
                    key={reason}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedReason(reason)}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg py-0.5 text-left"
                  >
                    <ReasonMark on={isSelected} />
                    <span
                      className={
                        isSelected
                          ? "text-[12.5px] leading-[18px] font-semibold tracking-[-0.015em] text-[#111827]"
                          : "text-[12.5px] leading-[18px] font-normal tracking-[-0.015em] text-[#52525b]"
                      }
                    >
                      {reason}
                    </span>
                  </button>
                )
              })}
            </div>
          </Glass>
        </div>

        <Glass
          className="absolute right-[-24px] bottom-[4%] z-10 w-[40%] max-w-[248px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.45)" }}
        >
          <p className="mb-3 text-[13px] leading-5 font-medium tracking-[-0.02em] text-[#111827]">
            Select return method
          </p>
          <div className="flex flex-col gap-2">
            {METHODS.map((method) => {
              const Icon = method.icon
              const isSelected = method.label === selectedMethod
              return (
                <div key={method.label} className="relative">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedMethod(method.label)}
                    className={
                      isSelected
                        ? "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-[#14b8a6] bg-white px-3 text-left text-[12.5px] leading-none font-semibold tracking-[-0.02em] text-[#111]"
                        : "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white px-3 text-left text-[12.5px] leading-none font-semibold tracking-[-0.02em] text-[#111] hover:border-[rgba(15,23,42,0.16)]"
                    }
                  >
                    <span className="text-[#0f766e]">
                      <Icon />
                    </span>
                    {method.label}
                  </button>
                </div>
              )
            })}
          </div>
        </Glass>
        </div>
      </div>
    </div>
  )
}
