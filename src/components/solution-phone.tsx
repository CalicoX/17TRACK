import { useEffect, useLayoutEffect, useRef, useState } from "react"

const POSTER_URL = "/solutions/iphone-app-poster.webp"
/** Design size of the phone + cards. The stage stays this size and scales as one unit. */
const DESIGN_WIDTH = 560
const DESIGN_HEIGHT = (DESIGN_WIDTH * 1280) / 1237

/**
 * Static poster first. three.js, GLTFLoader, and the glb stay unloaded until
 * this cell is about 200px from the viewport. Pose stays fixed after the swap.
 */
export function SolutionPhone() {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [near, setNear] = useState(false)
  const [live, setLive] = useState(false)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const apply = () => {
      const width = frame.clientWidth
      if (width > 0) setScale(width / DESIGN_WIDTH)
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    if (typeof IntersectionObserver === "undefined") {
      setNear(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setNear(true)
        observer.disconnect()
      },
      { rootMargin: "200px" },
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!near) return
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    let release = () => {}

    void import("./solution-phone-scene")
      .then(({ mountSolutionPhone }) => {
        if (cancelled) return
        release = mountSolutionPhone(canvas, () => {
          if (!cancelled) setLive(true)
        })
      })
      .catch((error) => {
        console.error("solution phone failed to load", error)
      })

    return () => {
      cancelled = true
      release()
    }
  }, [near])

  return (
    <div
      ref={frameRef}
      className="relative w-full"
      style={{ aspectRatio: "1237 / 1280" }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
      {live ? null : (
        <img
          src={POSTER_URL}
          alt=""
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        />
      )}
      {near ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1] block h-full w-full"
          aria-hidden
        />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 [perspective:1100px]"
      >
        <article className="absolute top-[16%] left-[2%] w-[286px] overflow-hidden rounded-[14px] border border-white/70 bg-white/62 px-3 py-2.5 text-[#212121] shadow-[0_14px_32px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.8)] [backdrop-filter:blur(18px)_saturate(1.4)] [transform:rotateY(-18deg)_rotateX(2deg)]">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[12px] leading-4 font-semibold tracking-[-0.03em]">
              9200190334103016355737
            </p>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/80 bg-white/55 px-1.5 py-0.5 text-[9px] font-medium text-[#212121]">
              <svg viewBox="0 0 16 16" className="size-2.5 text-[#0ea5e9]" fill="none" aria-hidden>
                <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M2.5 6.5h11" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              Info Received
              <span className="size-1 rounded-full bg-[#3b82f6]" />
            </span>
          </div>
          <p className="mt-0.5 text-[10px] leading-4 text-[#9aa0a8]">YunExpress</p>
          <p className="mt-2 text-[12px] leading-4 font-semibold">
            UPS has not received the package yet.
          </p>
          <p className="text-[10px] leading-4 text-[#9aa0a8]">
            Jul 29, 2023 15:04:34 · Shipped: 3 day(s)
          </p>
        </article>
        <article className="absolute bottom-[10%] -left-[2%] z-10 w-[304px] overflow-hidden rounded-[14px] border border-white/70 bg-white/62 px-3 py-2.5 text-[#212121] shadow-[0_16px_36px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] [backdrop-filter:blur(18px)_saturate(1.4)] [transform:rotateY(-18deg)_rotateX(2deg)]">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[13px] leading-4 font-semibold">This is a lipstick 💄</p>
            <svg viewBox="0 0 16 16" className="mt-0.5 size-3 shrink-0 text-[#9aa0a8]" fill="none" aria-hidden>
              <rect x="5.5" y="5.5" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3.5 10.5v-7a1.4 1.4 0 0 1 1.4-1.4h7" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </div>
          <p className="text-[10px] leading-4 text-[#9aa0a8]">9200190334103016355737</p>
          <p className="mt-2 text-[13px] leading-4 font-semibold">Arrived at port</p>
          <span className="mt-1 block h-1 w-full overflow-hidden rounded-full bg-[#e8eaee]/80">
            <span className="block h-full w-[78%] rounded-full bg-[#3b82f6]" />
          </span>
          <p className="mt-1.5 text-[10px] leading-[14px] text-[#212121]">
            Your package has shipped from the originating country and is en route to its destination.{" "}
            <span className="rounded bg-[#eef4ff]/80 px-1 py-0.5 text-[9px] font-medium text-[#3b82f6]">FAQS</span>
          </p>
          <p className="mt-1 text-[10px] leading-[14px] text-[#9aa0a8]">
            Estimated delivery time:{" "}
            <span className="font-semibold whitespace-nowrap text-[#212121]">Sep 23, 2023 ~ Sep 30, 2023</span>
          </p>
          <p className="mt-1 text-[10px] leading-[14px] text-[#b0b5bd]">
            This order number does not provide a map display.
          </p>
          <p className="mt-1.5 flex items-center justify-between border-t border-white/70 pt-1.5 text-[12px] font-semibold">
            <span>CHINA</span>
            <span className="text-[#c5cad1]" aria-hidden>→</span>
            <span>Cypurs</span>
          </p>
        </article>
      </div>
      </div>
    </div>
  )
}
