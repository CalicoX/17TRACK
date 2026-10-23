/**
 * Dotted hero globe from the API landing page (src/fx/modules/hero-globe.js).
 * Three.js points on a sphere, pale blue, slow spin. Decorative only.
 */
import { useEffect, useRef } from "react"
import * as THREE from "three"

const DOT = 0x7fb2e5
const RADIUS = 1
const ROWS = 46
const SPEED = 0.07

function buildDots() {
  const pos: number[] = []
  for (let i = 0; i < ROWS; i++) {
    const lat = ((i + 0.5) / ROWS) * Math.PI
    const r = Math.sin(lat)
    const y = Math.cos(lat)
    const cols = Math.max(6, Math.round(r * ROWS * 2))
    for (let j = 0; j < cols; j++) {
      const lon = (j / cols) * Math.PI * 2
      pos.push(
        RADIUS * r * Math.cos(lon),
        RADIUS * y,
        RADIUS * r * Math.sin(lon),
      )
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
  return geo
}

export function HeroGlobe() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch (err) {
      console.warn("[hero-globe]", err)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = "block"
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 10)
    camera.position.z = 3.1

    const geometry = buildDots()
    const material = new THREE.PointsMaterial({
      color: DOT,
      size: 0.016,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let width = 0
    let height = 0
    const resize = () => {
      const nextWidth = host.clientWidth
      const nextHeight = host.clientHeight
      if (nextWidth < 2 || nextHeight < 2) return
      if (nextWidth === width && nextHeight === height) return
      width = nextWidth
      height = nextHeight
      renderer.setSize(nextWidth, nextHeight)
      camera.aspect = nextWidth / nextHeight
      camera.updateProjectionMatrix()
    }

    let visible = true
    let raf = 0
    let last = 0
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const frame = (time: number) => {
      raf = 0
      if (!visible) return
      const dt = last ? Math.min((time - last) / 1000, 0.1) : 0
      last = time
      if (!reduceMotion) points.rotation.y += SPEED * dt
      renderer.render(scene, camera)
      if (!reduceMotion) raf = requestAnimationFrame(frame)
    }

    const wake = () => {
      last = 0
      if (!raf && visible && !reduceMotion) raf = requestAnimationFrame(frame)
    }

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              visible = entries.some((entry) => entry.isIntersecting)
              if (visible) wake()
              else if (raf) {
                cancelAnimationFrame(raf)
                raf = 0
              }
            },
            { rootMargin: "80px" },
          )
        : null
    io?.observe(host)

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize()
            if (reduceMotion || !raf) renderer.render(scene, camera)
          })
        : null
    ro?.observe(host)

    resize()
    renderer.render(scene, camera)
    wake()

    return () => {
      io?.disconnect()
      ro?.disconnect()
      if (raf) cancelAnimationFrame(raf)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} className="track-hero-globe" aria-hidden="true" />
}
