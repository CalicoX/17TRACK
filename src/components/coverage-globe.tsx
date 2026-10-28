/**
 * Coverage globe from the API landing page:
 * src/fx/modules/coverage-globe.js
 * Occluder, atmosphere rim, graticule, land dots (public/world.json),
 * and city arcs. Parameters match that file. Decorative only.
 * This is not the pale hero sphere in hero-globe.tsx.
 */
import { useEffect, useRef } from "react"
import * as THREE from "three"

const CITIES: Array<[string, number, number]> = [
  ["Tokyo", 139.69, 35.68],
  ["Seoul", 126.97, 37.56],
  ["Beijing", 116.4, 39.9],
  ["Shanghai", 121.47, 31.23],
  ["Hong Kong", 114.17, 22.32],
  ["Singapore", 103.82, 1.35],
  ["Mumbai", 72.83, 19.08],
  ["Delhi", 77.1, 28.7],
  ["Bangkok", 100.5, 13.75],
  ["Jakarta", 106.85, -6.21],
  ["Sydney", 151.21, -33.87],
  ["Auckland", 174.76, -36.85],
  ["Dubai", 55.27, 25.2],
  ["Istanbul", 28.98, 41.01],
  ["Moscow", 37.62, 55.75],
  ["Cairo", 31.24, 30.04],
  ["Nairobi", 36.82, -1.29],
  ["Lagos", 3.38, 6.52],
  ["Cape Town", 18.42, -33.92],
  ["Johannesburg", 28.04, -26.2],
  ["Berlin", 13.4, 52.52],
  ["Paris", 2.35, 48.86],
  ["London", -0.13, 51.51],
  ["Amsterdam", 4.9, 52.37],
  ["Madrid", -3.7, 40.42],
  ["Rome", 12.5, 41.9],
  ["Stockholm", 18.07, 59.33],
  ["Reykjavik", -21.94, 64.13],
  ["New York", -74.01, 40.71],
  ["Toronto", -79.38, 43.65],
  ["Chicago", -87.65, 41.88],
  ["Miami", -80.19, 25.76],
  ["Los Angeles", -118.24, 34.05],
  ["San Francisco", -122.42, 37.77],
  ["Seattle", -122.33, 47.61],
  ["Mexico City", -99.13, 19.43],
  ["Bogota", -74.08, 4.71],
  ["Lima", -77.04, -12.05],
  ["Sao Paulo", -46.63, -23.55],
  ["Rio", -43.17, -22.91],
  ["Buenos Aires", -58.38, -34.61],
  ["Santiago", -70.65, -33.45],
  ["Anchorage", -149.9, 61.22],
  ["Honolulu", -157.86, 21.31],
  ["Perth", 115.86, -31.95],
  ["Karachi", 67.01, 24.86],
  ["Tehran", 51.39, 35.69],
  ["Riyadh", 46.72, 24.71],
]

const ARC_SEGS = 64
const ARC_COUNT = 8
const ARC_COLOR = new THREE.Color("#e24dc0")
const AUTO_ROTATE = 0.0012

type Ring = number[][]
type WorldFeature = {
  geometry: {
    type: string
    coordinates: Ring[] | Ring[][]
  }
}

function latLonToVec3(lat: number, lon: number, radius: number) {
  const latR = (lat * Math.PI) / 180
  const lonR = (lon * Math.PI) / 180
  return new THREE.Vector3(
    radius * Math.cos(latR) * Math.sin(lonR),
    radius * Math.sin(latR),
    radius * Math.cos(latR) * Math.cos(lonR),
  )
}

function makeDotTexture() {
  const dotCanvas = document.createElement("canvas")
  dotCanvas.width = dotCanvas.height = 32
  const dctx = dotCanvas.getContext("2d")
  if (!dctx) return null
  const dg = dctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  dg.addColorStop(0, "rgba(255,255,255,1)")
  dg.addColorStop(0.35, "rgba(255,255,255,0.9)")
  dg.addColorStop(1, "rgba(255,255,255,0)")
  dctx.fillStyle = dg
  dctx.fillRect(0, 0, 32, 32)
  const dotTex = new THREE.CanvasTexture(dotCanvas)
  dotTex.needsUpdate = true
  return dotTex
}

export function CoverageGlobe({
  className = "track-coverage-globe",
}: {
  className?: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
    } catch (err) {
      console.warn("[coverage-globe]", err)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = "block"
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 2.55
    camera.position.y = 0.95

    const rootGroup = new THREE.Group()
    rootGroup.rotation.x = 0.3
    scene.add(rootGroup)

    const occluderGeo = new THREE.SphereGeometry(0.995, 64, 48)
    const occluderMat = new THREE.MeshBasicMaterial({ color: 0x060912 })
    rootGroup.add(new THREE.Mesh(occluderGeo, occluderMat))

    const atmosGeo = new THREE.SphereGeometry(1.18, 64, 64)
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader:
        "varying vec3 vNormal; void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader:
        "varying vec3 vNormal; void main(){ float d = dot(vNormal, vec3(0.0,0.0,1.0)); float i = pow(max(0.0, 0.7 - d), 3.0) * 0.65; gl_FragColor = vec4(0.05, 0.3, 0.9, 1.0) * i; }",
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
    scene.add(new THREE.Mesh(atmosGeo, atmosMat))

    const gratPos: number[] = []
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let i = 0; i < 180; i++) {
        const l1 = -180 + (360 * i) / 180
        const l2 = -180 + (360 * (i + 1)) / 180
        const a = latLonToVec3(lat, l1, 1.001)
        const b = latLonToVec3(lat, l2, 1.001)
        gratPos.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    for (let lon = -180; lon < 180; lon += 20) {
      for (let i = 0; i < 90; i++) {
        const la1 = -90 + (180 * i) / 90
        const la2 = -90 + (180 * (i + 1)) / 90
        const a = latLonToVec3(la1, lon, 1.001)
        const b = latLonToVec3(la2, lon, 1.001)
        gratPos.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    const gratGeo = new THREE.BufferGeometry()
    gratGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(gratPos, 3),
    )
    const gratMat = new THREE.LineBasicMaterial({
      color: 0x1a2a44,
      transparent: true,
      opacity: 0.18,
    })
    rootGroup.add(new THREE.LineSegments(gratGeo, gratMat))

    const dotsGroup = new THREE.Group()
    rootGroup.add(dotsGroup)
    const dotTex = makeDotTexture()

    const hubPos = new Float32Array(CITIES.length * 3)
    CITIES.forEach(([, lon, lat], i) => {
      const v = latLonToVec3(lat, lon, 1.012)
      hubPos[i * 3] = v.x
      hubPos[i * 3 + 1] = v.y
      hubPos[i * 3 + 2] = v.z
    })

    const cityArcGroup = new THREE.Group()
    rootGroup.add(cityArcGroup)

    const tAttr = new Float32Array(ARC_SEGS)
    for (let i = 0; i < ARC_SEGS; i++) tAttr[i] = i / (ARC_SEGS - 1)

    const buildArcPts = (ai: number, bi: number) => {
      const a = new THREE.Vector3(
        hubPos[ai * 3],
        hubPos[ai * 3 + 1],
        hubPos[ai * 3 + 2],
      )
      const b = new THREE.Vector3(
        hubPos[bi * 3],
        hubPos[bi * 3 + 1],
        hubPos[bi * 3 + 2],
      )
      const mid = a.clone().add(b).multiplyScalar(0.5)
      const dist = a.distanceTo(b)
      mid.normalize().multiplyScalar(1 + (40 / 100) * dist * 0.9)
      const out = new Float32Array(ARC_SEGS * 3)
      for (let i = 0; i < ARC_SEGS; i++) {
        const t = i / (ARC_SEGS - 1)
        const u = 1 - t
        out[i * 3] = u * u * a.x + 2 * u * t * mid.x + t * t * b.x
        out[i * 3 + 1] = u * u * a.y + 2 * u * t * mid.y + t * t * b.y
        out[i * 3 + 2] = u * u * a.z + 2 * u * t * mid.z + t * t * b.z
      }
      return out
    }

    type CityArc = {
      line: THREE.Line
      born: number
      life: number
    }

    const spawnCityArc = (): CityArc => {
      let ai = Math.floor(Math.random() * CITIES.length)
      let bi = Math.floor(Math.random() * CITIES.length)
      while (bi === ai) bi = Math.floor(Math.random() * CITIES.length)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(buildArcPts(ai, bi), 3),
      )
      geo.setAttribute("aT", new THREE.Float32BufferAttribute(tAttr.slice(), 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: ARC_COLOR.clone() },
          uHead: { value: 0 },
          uLife: { value: 0 },
        },
        vertexShader:
          "attribute float aT;varying float vT;void main(){vT=aT;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader:
          "uniform vec3 uColor;uniform float uHead,uLife;varying float vT;void main(){float base=smoothstep(0.,0.15,vT)*smoothstep(1.,0.85,vT);float d=abs(vT-uHead);float p=exp(-d*d*90.);float a=(base*0.55+p*1.3)*uLife;gl_FragColor=vec4(uColor+p*vec3(0.4,0.5,0.6),a);}",
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      return {
        line: new THREE.Line(geo, mat),
        born: performance.now() / 1000,
        life: 2.2 + Math.random() * 2.2,
      }
    }

    const cityArcs: CityArc[] = []
    while (cityArcs.length < ARC_COUNT) {
      const arc = spawnCityArc()
      cityArcs.push(arc)
      cityArcGroup.add(arc.line)
    }

    let dotsGeo: THREE.BufferGeometry | null = null
    let dotsMat: THREE.PointsMaterial | null = null
    let alive = true
    const ac = new AbortController()

    fetch("/world.json", { signal: ac.signal })
      .then((response) => response.json())
      .then((world: { features: WorldFeature[] }) => {
        if (!alive || !dotTex) return
        const MW = 1024
        const MH = 512
        const mc = document.createElement("canvas")
        mc.width = MW
        mc.height = MH
        const mctx = mc.getContext("2d")
        if (!mctx) return
        mctx.fillStyle = "#000"
        mctx.fillRect(0, 0, MW, MH)
        mctx.fillStyle = "#fff"
        const drawPoly = (coords: Ring[]) => {
          mctx.beginPath()
          for (const ring of coords) {
            for (let i = 0; i < ring.length; i++) {
              const x = ((ring[i][0] + 180) / 360) * MW
              const y = ((90 - ring[i][1]) / 180) * MH
              if (i === 0) mctx.moveTo(x, y)
              else mctx.lineTo(x, y)
            }
            mctx.closePath()
          }
          mctx.fill("evenodd")
        }
        for (const feature of world.features) {
          const geometry = feature.geometry
          if (geometry.type === "Polygon") drawPoly(geometry.coordinates as Ring[])
          else if (geometry.type === "MultiPolygon") {
            for (const polygon of geometry.coordinates as Ring[][]) drawPoly(polygon)
          }
        }
        const mask = mctx.getImageData(0, 0, MW, MH).data
        const latStep = 1.4
        const positions: number[] = []
        for (let lat = -85; lat <= 85; lat += latStep) {
          const cos = Math.cos((lat * Math.PI) / 180)
          const lonStep = latStep / Math.max(cos, 0.05)
          for (let lon = -180; lon < 180; lon += lonStep) {
            const px = Math.min(
              MW - 1,
              Math.max(0, Math.floor(((lon + 180) / 360) * MW)),
            )
            const py = Math.min(
              MH - 1,
              Math.max(0, Math.floor(((90 - lat) / 180) * MH)),
            )
            if (mask[(py * MW + px) * 4] > 128) {
              const v = latLonToVec3(lat, lon, 1.004)
              positions.push(v.x, v.y, v.z)
            }
          }
        }
        dotsGeo = new THREE.BufferGeometry()
        dotsGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3),
        )
        dotsMat = new THREE.PointsMaterial({
          size: 0.015,
          map: dotTex,
          color: 0xc9dcf4,
          transparent: true,
          depthWrite: false,
          sizeAttenuation: true,
          alphaTest: 0.05,
        })
        dotsGroup.add(new THREE.Points(dotsGeo, dotsMat))
        renderer.render(scene, camera)
      })
      .catch(() => {})

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
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const animate = (now: number) => {
      if (!visible) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(animate)
      if (!reduceMotion) rootGroup.rotation.y += AUTO_ROTATE
      const nowS = now / 1000
      if (!reduceMotion) {
        for (let k = 0; k < cityArcs.length; k++) {
          const ar = cityArcs[k]
          const age = nowS - ar.born
          const mat = ar.line.material as THREE.ShaderMaterial
          if (age > ar.life) {
            cityArcGroup.remove(ar.line)
            ar.line.geometry.dispose()
            mat.dispose()
            const nu = spawnCityArc()
            cityArcs[k] = nu
            cityArcGroup.add(nu.line)
            continue
          }
          const head = Math.min(1, age / (ar.life * 0.65))
          const lifeFade =
            age < 0.2 ? age / 0.2 : age > ar.life - 0.4 ? (ar.life - age) / 0.4 : 1
          mat.uniforms.uHead.value = head
          mat.uniforms.uLife.value = lifeFade
        }
      }
      renderer.render(scene, camera)
      if (reduceMotion) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(animate)
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
            { rootMargin: "120px", threshold: 0.01 },
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
      alive = false
      ac.abort()
      io?.disconnect()
      ro?.disconnect()
      if (raf) cancelAnimationFrame(raf)
      for (const arc of cityArcs) {
        arc.line.geometry.dispose()
        ;(arc.line.material as THREE.Material).dispose()
      }
      dotsGeo?.dispose()
      dotsMat?.dispose()
      dotTex?.dispose()
      gratGeo.dispose()
      gratMat.dispose()
      occluderGeo.dispose()
      occluderMat.dispose()
      atmosGeo.dispose()
      atmosMat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} className={className} aria-hidden="true" />
}
