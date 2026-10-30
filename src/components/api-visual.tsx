import "@fontsource-variable/geist/wght.css"

const W = 523
const H = 304

const SANS = '"SF Pro Text", "SF Pro", Inter, sans-serif'

const routeType = {
  fontFamily: "Inter, sans-serif",
  fontSize: 9.61,
  fontWeight: 450,
  lineHeight: "12.82px",
  color: "rgba(0,0,0,0.4)",
  whiteSpace: "nowrap",
} as const

const BARS = [
  { x: 287.6, y: 87.6, w: 3.9, h: 1.95, color: "#00ff1a" },
  { x: 287.6, y: 102.3, w: 14.6, h: 1.95, color: "#a6a7be" },
  { x: 305.1, y: 102.3, w: 5.6, h: 1.95, color: "#00c2ff" },
  { x: 432.7, y: 102.3, w: 1.95, h: 1.95, color: "#00ff1a" },
  { x: 287.6, y: 106.2, w: 14.6, h: 1.95, color: "#a6a7be" },
  { x: 432.7, y: 106.2, w: 1.95, h: 1.95, color: "#0c0d29" },
  { x: 287.6, y: 110.1, w: 14.6, h: 1.95, color: "#a6a7be" },
  { x: 305.1, y: 110.1, w: 5.6, h: 1.95, color: "#aaabc2" },
  { x: 432.7, y: 110.1, w: 1.95, h: 1.95, color: "#00ff1a" },
] as const

// Hub→carrier spokes from Figma node 281:1221 (exported SVGs, rotated into
// the 523×304 artboard). Endpoints sit on each logo's top-center.
const CURVES = [
  // FedEx
  "M361.99 114.94 C361.99 139.45 376.78 161.52 399.39 170.74 L443.79 188.86 C452.75 192.51 458.60 201.24 458.60 210.95",
  // UPS
  "M361.99 114.94 C361.99 122.14 365.64 128.83 371.67 132.69 L399.17 150.28 C407.55 155.64 412.63 164.95 412.63 174.95",
  // USPS (vertical)
  "M363.01 249.01 L363.01 115.00",
  // DHL (asset file is misnamed line-china-post.svg in public/)
  "M362.63 114.94 C362.63 122.13 359.01 128.83 353.02 132.73 L336.43 143.54 C321.81 153.06 312.98 169.40 312.98 186.93",
  // China Post (asset file is misnamed line-dhl.svg in public/)
  "M266.96 240.95 L266.96 219.53 C266.96 188.26 285.89 160.12 314.79 148.42 L349.57 134.35 C357.46 131.16 362.63 123.48 362.63 114.94",
] as const

// Half-disc caps: OrangeCap centers on (x+2.099, y); flat edge on logo top.
const CAPS = [
  { x: 456.501, y: 210.95 }, // FedEx
  { x: 410.531, y: 174.95 }, // UPS
  { x: 360.911, y: 249.01 }, // USPS
  { x: 310.881, y: 186.93 }, // DHL
  { x: 264.861, y: 240.95 }, // China Post
] as const

function OrangeCap({ x, y }: { x: number; y: number }) {
  return (
    <img
      src="/solutions/api-visual/line-dot.svg"
      alt=""
      width={2.099}
      height={4.198}
      className="absolute max-w-none"
      style={{ left: x, top: y - 2.099, width: 4.198, height: 2.099 }}
    />
  )
}

export function ApiVisual() {
  return (
    <div
      aria-hidden
      className="relative w-full"
      style={{
        aspectRatio: `${W} / ${H}`,
        containerType: "inline-size",
        borderRadius: "calc(8 / 523 * 100cqw)",
      }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: W,
          height: H,
          transformOrigin: "top left",
          transform: "scale(calc(100cqw / 523px))",
        }}
      >
        <div className="pointer-events-none absolute" style={{ left: -10, top: -98, width: 544, height: 544 }}>
          <img
            src="/solutions/api-visual/map.png"
            alt=""
            className="size-full max-w-none object-fill opacity-10"
          />
        </div>

        <div
          className="absolute border-white bg-[#ecf7ff]"
          style={{
            left: 18,
            top: 12,
            width: 206,
            height: 283,
            borderRadius: 12.3,
            borderWidth: 0.931,
            boxShadow: "0 24px 48px -16px rgba(30, 77, 133, 0.22), 0 8px 16px -8px rgba(30, 77, 133, 0.12)",
          }}
        />
        <div
          className="absolute bg-[#fdfeff]"
          style={{
            left: 25.7,
            top: 44.8,
            width: 190.8,
            height: 242.1,
            borderRadius: 6.16,
          }}
        />
        <img
          src="/solutions/api-visual/divider.svg"
          alt=""
          width={203.1}
          height={0.931464}
          className="absolute max-w-none"
          style={{ left: 19.6, top: 38.6, width: 203.1, height: 0.931464 }}
        />
        <img
          src="/solutions/api-visual/dots.svg"
          alt=""
          width={32.8}
          height={8.21}
          className="absolute max-w-none"
          style={{ left: 27.8, top: 21.2, width: 32.8, height: 8.21 }}
        />
        <div
          className="absolute flex items-center justify-center bg-[#e6eaff]"
          style={{
            left: 68.8,
            top: 17.7,
            width: 143.6,
            height: 16.2,
            borderRadius: 6.16,
            padding: "2.05px 6.16px",
          }}
        >
          <p
            className="m-0 whitespace-nowrap"
            style={{
              fontFamily: SANS,
              fontSize: 7.452,
              lineHeight: "10.246px",
              letterSpacing: -0.186,
              color: "#09006b",
            }}
          >
            api.17track.net
          </p>
        </div>
        <p
          className="absolute m-0 whitespace-pre"
          style={{
            left: 39.1,
            top: 55.1,
            width: 145,
            fontFamily: SANS,
            fontSize: 7.452,
            lineHeight: "10.246px",
            letterSpacing: -0.186,
            color: "#1e4d85",
          }}
        >
          <span style={{ color: "#49b77c" }}>curl </span>
          {"-X POST \\\n  --header '"}
          <span style={{ color: "#49b77c" }}>17token:YourKey</span>
          {"' \\\n  --header '"}
          <span style={{ color: "#49b77c" }}>Content-Type:application/json</span>
          {"' \\\n  --data '[\n"}
          <span style={{ color: "#252525" }}>
            {`            {\n              "number": "RR123456789CN"\n            },\n            {\n              "number: "21213123123230"\n            }\n          ]' \\\n  https://api.17track.net/track/v2.2/register`}
          </span>
        </p>

        <div
          className="absolute border-white"
          style={{
            left: -9,
            top: 166,
            width: 259.6,
            height: 86.5,
            borderRadius: 10.68,
            borderWidth: 0.5,
            backgroundImage: "linear-gradient(to bottom, rgba(234,236,255,0.55), rgba(255,255,255,0.4))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 28px 36px -18px rgba(0, 16, 164, 0.22)",
            zIndex: 3,
          }}
        />
        <p
          className="absolute m-0 whitespace-nowrap"
          style={{
            left: 3.9,
            top: 174.9,
            fontFamily: SANS,
            fontSize: 10.68,
            fontWeight: 510,
            lineHeight: "11.75px",
            letterSpacing: -0.21,
            color: "#000",
            zIndex: 3,
          }}
        >
          YQTRACK12345DEMO
        </p>
        <div
          className="absolute bg-[#0094ff]"
          style={{ left: 3.9, top: 199.4, width: 34.18, height: 34.18, borderRadius: 5.34, zIndex: 3 }}
        />
        <img
          src="/solutions/api-visual/plane.svg"
          alt=""
          width={25.63}
          height={25.63}
          className="absolute max-w-none"
          style={{ left: 8.2, top: 203.7, width: 25.63, height: 25.63, zIndex: 3 }}
        />
        <p
          className="absolute m-0 whitespace-nowrap"
          style={{
            left: 46.6,
            top: 199.4,
            fontFamily: SANS,
            fontSize: 14.95,
            fontWeight: 590,
            lineHeight: "18.2px",
            letterSpacing: -0.21,
            color: "#000",
            zIndex: 3,
          }}
        >
          In Transit
        </p>
        <div
          className="absolute flex items-center"
          style={{ left: 46.9, top: 222.5, gap: 3.2, zIndex: 3 }}
        >
          <div className="flex items-start" style={{ gap: 1.232 }}>
            <span style={routeType}>United States</span>
            <span style={{ ...routeType, color: "rgba(255,255,255,0.4)" }}>-</span>
            <span style={routeType}>USPS</span>
          </div>
          <img
            src="/solutions/api-visual/route-arrow.svg"
            alt=""
            width={18.16}
            height={4.01}
            className="max-w-none"
            style={{ width: 18.16, height: 4.01 }}
          />
          <span style={routeType}>United States..</span>
        </div>

        <svg
          className="pointer-events-none absolute top-0 left-0"
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          style={{ zIndex: 1 }}
        >
          {CURVES.map((d) => (
            <path key={d} d={d} stroke="#dacdff" strokeWidth={0.35} />
          ))}
        </svg>
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {CAPS.map((cap) => (
            <OrangeCap key={`${cap.x}-${cap.y}`} {...cap} />
          ))}
        </div>

        <div
          className="absolute overflow-hidden"
          style={{ left: 251.981, top: 241.315, width: 29.393, height: 29.366, borderRadius: 5.597, zIndex: 1 }}
        >
          <img
            src="/solutions/api-visual/china-post.png"
            alt=""
            className="absolute top-0 h-full max-w-none"
            style={{ left: "-2.45%", width: "308.7%" }}
          />
        </div>
        <div
          className="absolute overflow-hidden bg-[#3f1d79]"
          style={{ left: 443.818, top: 212.222, width: 29.393, height: 29.397, borderRadius: 5.597, zIndex: 1 }}
        >
          <img
            src="/solutions/api-visual/fedex.png"
            alt=""
            className="absolute max-w-none"
            style={{ left: 1.4, top: 11.195, width: 26.588, height: 7.445 }}
          />
        </div>
        <div
          className="absolute overflow-hidden bg-[#333366]"
          style={{ left: 348.58, top: 251.104, width: 29.393, height: 29.366, borderRadius: 5.597, zIndex: 1 }}
        >
          <img
            src="/solutions/api-visual/usps.svg"
            alt=""
            width={25.1883}
            height={15.5818}
            className="absolute max-w-none"
            style={{ left: 2.104, top: 6.997, width: 25.1883, height: 15.5818 }}
          />
        </div>
        <img
          src="/solutions/api-visual/dhl.png"
          alt=""
          className="absolute max-w-none object-cover"
          style={{ left: 298.005, top: 187.842, width: 29.393, height: 29.366, borderRadius: 5.597, zIndex: 1 }}
        />
        <div
          className="absolute overflow-hidden border-[#f5c142] bg-white"
          style={{
            left: 397.951,
            top: 177.141,
            width: 29.393,
            height: 29.397,
            borderRadius: 5.597,
            borderWidth: 0.7,
            zIndex: 1,
          }}
        >
          <img
            src="/solutions/api-visual/ups.png"
            alt=""
            className="absolute max-w-none"
            style={{ left: 6.297, top: 4.898, width: 16.792, height: 20.291 }}
          />
        </div>

        <img
          src="/solutions/api-visual/hub-dot.svg"
          alt=""
          width={6.29708}
          height={6.29708}
          className="absolute max-w-none"
          style={{ left: 359.45, top: 124.85, width: 6.29708, height: 6.29708 }}
        />

        <div
          className="absolute border-white bg-[#f5f6ff]"
          style={{
            left: 275,
            top: 6,
            width: 175,
            height: 117,
            borderRadius: 11.66,
            borderWidth: 0.7,
            boxShadow: "0 26px 52px -16px rgba(46, 13, 181, 0.3), 0 10px 22px -10px rgba(112, 0, 255, 0.18)",
          }}
        />
        <img
          src="/solutions/api-visual/logo-17track.svg"
          alt=""
          width={101.2}
          height={15.57}
          className="absolute max-w-none"
          style={{ left: 290.3, top: 31.1, width: 101.2, height: 15.57 }}
        />
        <p
          className="absolute m-0 text-center whitespace-nowrap"
          style={{
            left: 398.3,
            top: 27.1,
            fontFamily: '"Geist Variable", Inter, sans-serif',
            fontSize: 21.4,
            fontWeight: 900,
            lineHeight: "23.4px",
            letterSpacing: -0.16,
            color: "#2e0db5",
          }}
        >
          API
        </p>
        <div
          className="absolute border-white"
          style={{
            left: 285,
            top: 76.6,
            width: 155.8,
            height: 35.6,
            borderRadius: 4.87,
            borderWidth: 0.35,
            backgroundImage: "linear-gradient(to bottom, #e8edff, #fff)",
          }}
        />
        {BARS.map((bar) => (
          <span
            key={`${bar.x}-${bar.y}-${bar.color}`}
            className="absolute"
            style={{
              left: bar.x,
              top: bar.y,
              width: bar.w,
              height: bar.h,
              borderRadius: 0.7,
              background: bar.color,
            }}
          />
        ))}
        <p
          className="absolute m-0 -translate-x-1/2 text-center whitespace-nowrap"
          style={{
            left: 379.1,
            top: 103.2,
            fontFamily: "Inter, sans-serif",
            fontSize: 6.76,
            fontWeight: 500,
            lineHeight: "5.597px",
            letterSpacing: -0.14,
            color: "#e5e9ff",
          }}
        >
          Powered by 17TRACK
        </p>
      </div>
    </div>
  )
}
