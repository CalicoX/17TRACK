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
  { x: 309.97, y: 86.08, w: 2.799, h: 1.399, color: "#00ff1a" },
  { x: 309.97, y: 96.57, w: 10.495, h: 1.399, color: "#a6a7be" },
  { x: 322.56, y: 96.57, w: 4.023, h: 1.399, color: "#00c2ff" },
  { x: 414.22, y: 96.57, w: 1.399, h: 1.399, color: "#00ff1a" },
  { x: 309.97, y: 99.37, w: 10.495, h: 1.399, color: "#a6a7be" },
  { x: 414.22, y: 99.37, w: 1.399, h: 1.399, color: "#0c0d29" },
  { x: 309.97, y: 102.17, w: 10.495, h: 1.399, color: "#a6a7be" },
  { x: 322.56, y: 102.17, w: 4.023, h: 1.399, color: "#aaabc2" },
  { x: 414.22, y: 102.17, w: 1.399, h: 1.399, color: "#00ff1a" },
] as const

// Hub→carrier spokes: Figma node 281:1221 SVG insets + rotate(90deg).
// Repo filenames for dhl/china-post SVGs are swapped vs carrier logos.
const HUB_LINES = [
  {
    src: "/solutions/api-visual/line-fedex.svg",
    inset: { top: "37.81%", right: "12.28%", bottom: "30.61%", left: "69.18%" },
  },
  {
    src: "/solutions/api-visual/line-ups.svg",
    inset: { top: "37.81%", right: "21.07%", bottom: "42.45%", left: "69.18%" },
  },
  {
    src: "/solutions/api-visual/line-usps.svg",
    inset: { top: "37.83%", right: "30.59%", bottom: "18.09%", left: "69.41%" },
    zeroHeight: true,
  },
  {
    src: "/solutions/api-visual/line-china-post.svg", // Vector8 → DHL tip
    inset: { top: "37.81%", right: "30.63%", bottom: "38.51%", left: "59.81%" },
    flipX: true,
  },
  {
    src: "/solutions/api-visual/line-dhl.svg", // Vector9 → China Post tip
    inset: { top: "37.81%", right: "30.63%", bottom: "20.74%", left: "51.01%" },
    flipX: true,
  },
] as const

// Half-disc caps at Figma ellipse insets (box top-left; tip = top-center of logo).
const CAPS = [
  { x: 456.501, y: 210.95 }, // FedEx
  { x: 410.531, y: 174.95 }, // UPS
  { x: 360.911, y: 249.01 }, // USPS
  { x: 310.881, y: 186.93 }, // DHL
  { x: 264.861, y: 240.95 }, // China Post
] as const

function HubLine({
  src,
  inset,
  flipX = false,
  zeroHeight = false,
}: {
  src: string
  inset: { top: string; right: string; bottom: string; left: string }
  flipX?: boolean
  zeroHeight?: boolean
}) {
  return (
    <div
      className="pointer-events-none absolute flex items-center justify-center"
      style={{ ...inset, containerType: "size", zIndex: 1 }}
    >
      <div
        className="relative"
        style={{
          flex: "none",
          height: zeroHeight ? 0 : "100cqw",
          width: "100cqh",
          transform: flipX ? "scaleX(-1) rotate(90deg)" : "rotate(90deg)",
        }}
      >
        <div
          className="absolute"
          style={{ inset: zeroHeight ? "-0.175px 0" : "-0.18% 0" }}
        >
          <img alt="" className="block size-full max-w-none" src={src} />
        </div>
      </div>
    </div>
  )
}

function OrangeCap({ x, y }: { x: number; y: number }) {
  // x = tip center − 2.099; y = tip (logo top). Matches Figma ellipse + rotate(90deg).
  return (
    <div
      className="pointer-events-none absolute flex items-center justify-center"
      style={{ left: x, top: y, width: 4.198, height: 2.099, containerType: "size" }}
    >
      <div
        className="relative"
        style={{
          flex: "none",
          width: "100cqh",
          height: "100cqw",
          transform: "rotate(90deg)",
        }}
      >
        <img
          src="/solutions/api-visual/line-dot.svg"
          alt=""
          width={2.099}
          height={4.198}
          className="absolute inset-0 size-full max-w-none"
        />
      </div>
    </div>
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

        {HUB_LINES.map((line) => (
          <HubLine key={line.src} {...line} />
        ))}
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
          style={{ left: 359.47, top: 111.59, width: 6.29708, height: 6.29708, zIndex: 2 }}
        />

        <div
          className="absolute border-white bg-[#f5f6ff]"
          style={{
            left: 300,
            top: 34.99,
            width: 125.942,
            height: 78.37,
            borderRadius: 8.396,
            borderWidth: 0.7,
            boxShadow:
              "0 0 10.495px rgba(112, 0, 255, 0.08), 0 0 27.987px rgba(153, 128, 255, 0.03)",
            zIndex: 2,
          }}
        />
        <div
          className="absolute flex items-center justify-center"
          style={{ left: 310.845, top: 48.99, width: 104.951, height: 16.792, gap: 4.898, zIndex: 2 }}
        >
          <img
            src="/solutions/api-visual/logo-17track.svg"
            alt=""
            width={72.766}
            height={11.195}
            className="max-w-none"
            style={{ width: 72.766, height: 11.195 }}
          />
          <p
            className="m-0 text-center whitespace-nowrap"
            style={{
              fontFamily: '"Geist Variable", Inter, sans-serif',
              fontSize: 15.393,
              fontWeight: 900,
              lineHeight: "16.792px",
              letterSpacing: -0.14,
              color: "#2e0db5",
            }}
          >
            API
          </p>
        </div>
        <div
          className="absolute border-white"
          style={{
            left: 307.176,
            top: 82.58,
            width: 111.948,
            height: 23.789,
            borderRadius: 3.498,
            borderWidth: 0.35,
            backgroundImage: "linear-gradient(to bottom, #e8edff, #fff)",
            zIndex: 2,
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
              zIndex: 2,
            }}
          />
        ))}
        <p
          className="absolute m-0 -translate-x-1/2 text-center whitespace-nowrap"
          style={{
            left: 375.75,
            top: 97.27,
            fontFamily: "Inter, sans-serif",
            fontSize: 5.597,
            fontWeight: 500,
            lineHeight: "5.597px",
            letterSpacing: -0.14,
            color: "#e5e9ff",
            zIndex: 2,
          }}
        >
          Powered by 17TRACK
        </p>
      </div>
    </div>
  )
}
