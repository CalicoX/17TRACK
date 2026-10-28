import { useEffect, useRef, useState } from "react"

const POSTER_URL = "/solutions/iphone-app-poster.webp"

/**
 * Static poster first. three.js, GLTFLoader, and the glb stay unloaded until
 * this cell is about 200px from the viewport. Pose stays fixed after the swap.
 */
export function SolutionPhone() {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [near, setNear] = useState(false)
  const [live, setLive] = useState(false)

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
    <div ref={frameRef} className="absolute inset-0">
      {live ? null : (
        <img
          src={POSTER_URL}
          alt=""
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
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
        <article className="absolute top-[20%] left-[18%] w-[min(210px,38%)] rounded-2xl border border-white/15 bg-[#14161a]/55 px-3.5 py-3 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] [backdrop-filter:blur(16px)_saturate(1.35)] [transform:rotateY(14deg)_rotateX(6deg)]">
          <p className="text-[11px] font-medium tracking-wide text-white/70">In transit</p>
          <p className="mt-1 text-[13px] leading-5 font-semibold">YQTRACK123456</p>
          <p className="text-[11px] leading-4 text-white/65">China Post · Tirana</p>
        </article>
        <article className="absolute bottom-[18%] left-[14%] z-10 w-[min(228px,40%)] rounded-2xl border border-white/18 bg-[#14161a]/62 px-3.5 py-3 text-white shadow-[0_22px_48px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.2)] [backdrop-filter:blur(18px)_saturate(1.4)] [transform:rotateY(12deg)_rotateX(5deg)_translateZ(28px)]">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Available for pick-up
          </p>
          <p className="mt-1 text-[13px] leading-5 font-semibold">München retail outlet</p>
          <p className="text-[11px] leading-4 text-white/65">In transit 17 days</p>
        </article>
      </div>
    </div>
  )
}
