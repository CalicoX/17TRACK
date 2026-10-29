import type { ReactNode } from "react"
import "./best-tracker-animations.css"
import { WORLD_HUBS, WORLD_LAND_DOTS } from "./best-tracker-world"

export type TrackerVisualKind =
  | "accuracy"
  | "mobile"
  | "world"
  | "uptime"
  | "support"

function Frame({
  kind,
  children,
}: {
  kind: TrackerVisualKind
  children: ReactNode
}) {
  const grid = `best-${kind}-grid`
  const glow = `best-${kind}-glow`
  return (
    <svg
      className="best-visual-svg"
      viewBox="0 0 560 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={grid} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" className="best-grid-line" />
          <circle cx="0" cy="0" r=".4" fill="#fff" opacity=".16" />
        </pattern>
        <radialGradient id={glow}>
          <stop stopColor="#fff" stopOpacity=".07" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="560" height="315" fill={`url(#${grid})`} opacity=".26" />
      <ellipse cx="280" cy="152" rx="230" ry="150" fill={`url(#${glow})`} />
      {children}
    </svg>
  )
}

function AccuracyVisual() {
  return (
    <Frame kind="accuracy">
      <g transform="translate(44 38)">
        <rect width="158" height="38" rx="10" className="best-pill" />
        <circle cx="20" cy="19" r="3" className="best-dot" />
        <circle cx="20" cy="19" r="7" className="best-status-ring" />
        <text x="34" y="23" className="best-svg-label">99.9% ACCURACY</text>
      </g>
      <g transform="translate(359 38)">
        <rect width="157" height="38" rx="10" className="best-pill" />
        <path d="M14 14v10M19 14v10M24 14v10M12 19h14" className="best-micro-icon" />
        <text x="36" y="23" className="best-svg-micro">AUTO CARRIER MATCH</text>
      </g>

      <path d="M72 247h67M408 247h93M72 253h42M456 253h45" className="best-detail-rule" />
      <path
        d="M102 218C153 204 126 137 197 143S271 212 328 176 377 100 452 89"
        className="best-route-ghost"
      />
      <path
        d="M102 218C153 204 126 137 197 143S271 212 328 176 377 100 452 89"
        className="best-route-live"
        pathLength="100"
      />

      <path d="M102 232v14M197 158v16M328 190v15M452 105v13" className="best-node-leader" />
      <text x="102" y="257" textAnchor="middle" className="best-map-caption">ORDER INFO</text>
      <text x="197" y="184" textAnchor="middle" className="best-map-caption">IN TRANSIT</text>
      <text x="328" y="216" textAnchor="middle" className="best-map-caption">PICK UP</text>
      <text x="452" y="130" textAnchor="middle" className="best-map-caption">DELIVERY</text>

      <g transform="translate(102 218)">
        <circle r="12" className="best-node-pulse" />
        <circle r="6" className="best-node-outline" />
        <circle r="2" className="best-node" />
      </g>
      <g transform="translate(197 143)">
        <circle r="11" className="best-node-pulse best-delay-1" />
        <circle r="5.5" className="best-node-outline" />
        <circle r="2" className="best-node" />
      </g>
      <g transform="translate(328 176)">
        <circle r="11" className="best-node-pulse best-delay-2" />
        <circle r="5.5" className="best-node-outline" />
        <circle r="2" className="best-node" />
      </g>
      <g transform="translate(452 89)">
        <circle r="22" className="best-target-ring" />
        <circle r="16" className="best-target-inner" />
        <circle r="11" className="best-target-fill" />
        <path d="m-4 .5 2.5 2.5L4-3" className="best-check" />
        <path d="M-27 0h3M24 0h3M0-27v3M0 24v3" className="best-target-ticks" />
      </g>

      <g className="best-package">
        <rect x="-40" y="-40" width="80" height="80" fill="none" />
        <path d="m-12-6 12-5 12 5v13L0 12l-12-5Z" className="best-package-shell" />
        <path d="m-12-6 12 5 12-6M0-1v13M-6-8.5l12 5v6" className="best-package-lines" />
        <g className="best-scanner">
          <path d="M0-34v60" className="best-scan-line" />
          <path d="M-16-20v-8h8M8-28h8v8M16 10v8H8M-8 18h-8v-8" className="best-scan-corners" />
        </g>
      </g>
      <text x="72" y="286" className="best-svg-micro">END-TO-END VISIBILITY</text>
      <text x="488" y="286" textAnchor="end" className="best-svg-micro">UPDATED JUST NOW</text>
    </Frame>
  )
}

function MobileVisual() {
  return (
    <Frame kind="mobile">
      <g className="best-phone">
        <rect x="211" y="25" width="140" height="265" rx="25" className="best-phone-shell" />
        <rect x="219" y="34" width="124" height="247" rx="18" className="best-phone-screen" />
        <path d="M260 44h42" className="best-speaker" />
        <text x="233" y="68" className="best-phone-title">17TRACK</text>
        <text x="233" y="88" className="best-svg-micro">YQTRACK123456</text>
        <rect x="233" y="99" width="64" height="17" rx="8.5" className="best-status-pill" />
        <text x="242" y="111" className="best-status-text">IN TRANSIT</text>
        <path d="M239 137v100" className="best-phone-track" />
        <circle cx="239" cy="138" r="3" className="best-node" />
        <circle cx="239" cy="170" r="3" className="best-node" />
        <circle cx="239" cy="202" r="3" className="best-node-dim" />
        <circle cx="239" cy="234" r="3" className="best-node-dim" />
        <text x="250" y="140" className="best-phone-event">Shipment picked up</text>
        <text x="250" y="172" className="best-phone-event">Arrived at facility</text>
        <text x="250" y="204" className="best-phone-event-dim">Out for delivery</text>
        <text x="250" y="236" className="best-phone-event-dim">Delivered</text>
        <path d="M254 261h54" className="best-phone-home" />
      </g>

      <g className="best-float-a">
        <rect x="61" y="84" width="157" height="68" rx="13" className="best-panel" />
        <circle cx="81" cy="104" r="8" className="best-notification-icon" />
        <path d="m77.5 104 2.5 2.5 4.5-5" className="best-check" />
        <text x="97" y="107" className="best-card-heading">Package delivered</text>
        <text x="78" y="131" className="best-card-caption">Today, 14:32</text>
        <path d="M174 130h25" className="best-card-link" />
      </g>
      <g className="best-float-b">
        <rect x="344" y="171" width="153" height="66" rx="13" className="best-panel" />
        <path d="M359 190h14v9h-14zM373 193h6l3.5 3.5v2.5h-9.5z" className="best-micro-icon" />
        <text x="390" y="197" className="best-card-heading">In transit</text>
        <text x="360" y="220" className="best-card-caption">Arriving today</text>
        <circle cx="477" cy="217" r="2.5" className="best-dot" />
      </g>
      <path d="M189 176c-28-6-38-14-40-24M371 149c29-6 40-17 44-32" className="best-signal" />
      <circle cx="149" cy="152" r="2.5" className="best-dot" />
      <circle cx="415" cy="117" r="2.5" className="best-dot" />
      <text x="280" y="307" textAnchor="middle" className="best-svg-micro">WEB · APP · MINI PROGRAM</text>
    </Frame>
  )
}

const [laX, laY] = WORLD_HUBS.losAngeles
const [londonX, londonY] = WORLD_HUBS.london
const [shanghaiX, shanghaiY] = WORLD_HUBS.shanghai
const [saoPauloX, saoPauloY] = WORLD_HUBS.saoPaulo
const [sydneyX, sydneyY] = WORLD_HUBS.sydney

function WorldVisual() {
  return (
    <Frame kind="world">
      <defs>
        <clipPath id="best-world-map-clip">
          <rect x="40" y="46" width="480" height="224" rx="14" />
        </clipPath>
        <filter id="best-glass-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g clipPath="url(#best-world-map-clip)">
        {WORLD_LAND_DOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" className="best-land-dot" />
        ))}

        <path d={`M${laX} ${laY}Q192 48 ${londonX} ${londonY}`} className="best-world-arc" pathLength="100" />
        <path d={`M${londonX} ${londonY}Q354 52 ${shanghaiX} ${shanghaiY}`} className="best-world-arc best-world-arc-2" pathLength="100" />
        <path d={`M${laX} ${laY}Q152 199 ${saoPauloX} ${saoPauloY}`} className="best-world-arc best-world-arc-3" pathLength="100" />
        <path d={`M${shanghaiX} ${shanghaiY}Q474 166 ${sydneyX} ${sydneyY}`} className="best-world-arc best-world-arc-2" pathLength="100" />

        {Object.values(WORLD_HUBS).map(([x, y], index) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            {index === 1 || index === 2 ? <circle r="9" className="best-map-pulse" /> : null}
            <circle r="4.5" className="best-map-node-ring" />
            <circle r="1.5" className="best-node" />
          </g>
        ))}
        <g className="best-orbit-dot">
          <circle r="5" className="best-dot-halo" />
          <circle r="2" className="best-dot" />
        </g>
      </g>
      <g transform="translate(372 24)">
        <rect width="144" height="34" rx="10" fill="#0a0a0a" filter="url(#best-glass-blur)" />
        <rect width="144" height="34" rx="10" className="best-glass-pill" />
        <text x="72" y="22" textAnchor="middle" className="best-svg-label">3500+ CARRIERS</text>
      </g>
      <text x="506" y="294" textAnchor="end" className="best-svg-label">190+ COUNTRIES & REGIONS</text>
    </Frame>
  )
}

function UptimeVisual() {
  return (
    <Frame kind="uptime">
      <defs>
        <clipPath id="best-uptime-plot">
          <rect x="20" y="58" width="230" height="102" rx="2" />
        </clipPath>
      </defs>
      <g className="best-server">
        {["API", "EDGE", "CORE"].map((label, index) => (
          <g key={label} transform={`translate(76 ${91 + index * 53})`}>
            <rect width="108" height="43" rx="8" className="best-panel" />
            <g className="best-server-vents" transform="translate(12 13)">
              <rect width="5" height="3" rx="1" />
              <rect y="6" width="5" height="3" rx="1" />
              <rect y="12" width="5" height="3" rx="1" />
              <rect x="8" width="5" height="3" rx="1" />
              <rect x="8" y="6" width="5" height="3" rx="1" />
              <rect x="8" y="12" width="5" height="3" rx="1" />
            </g>
            <text x="46" y="25" className="best-server-label">{label}</text>
            <circle cx="93" cy="21.5" r="2.5" className="best-server-light" />
          </g>
        ))}
      </g>
      <path d="M184 112h29M184 165h29M184 218h29" className="best-server-link" />

      <g transform="translate(213 66)">
        <rect width="270" height="185" rx="16" className="best-panel" />
        <text x="20" y="35" className="best-svg-number">99.9%</text>
        <text x="176" y="32" className="best-svg-micro">UPTIME</text>
        <circle cx="239" cy="28" r="2.5" className="best-dot" />
        <path d="M20 58h230M20 92h230M20 126h230M20 160h230M66 58v102M112 58v102M158 58v102M204 58v102" className="best-chart-grid" />
        <g clipPath="url(#best-uptime-plot)">
          <path
            d="M20 142C62 140 78 132 104 124C134 114 150 108 176 92C206 74 222 66 250 52"
            className="best-chart-line"
            pathLength="100"
          />
          <g className="best-chart-point-group">
            <circle r="4" className="best-chart-point" />
            <circle r="9" className="best-chart-point-ring" />
          </g>
        </g>
        <path d="M20 160h230" className="best-chart-base" />
        <text x="20" y="177" className="best-chart-time">00:00</text>
        <text x="250" y="177" textAnchor="end" className="best-chart-time">NOW</text>
      </g>
      <g transform="translate(365 272)">
        <circle r="3" className="best-dot" />
        <circle r="7" className="best-status-ring" />
        <text x="13" y="4" className="best-svg-micro">ALL SYSTEMS OPERATIONAL</text>
      </g>
    </Frame>
  )
}

function SupportVisual() {
  return (
    <Frame kind="support">
      <g transform="translate(280 153)">
        <circle r="91" className="best-clock-ring" />
        <circle r="76" className="best-clock-inner" />
        {Array.from({ length: 60 }, (_, index) => (
          <path
            key={index}
            d={index % 5 === 0 ? "M0-87v6" : "M0-87v2.5"}
            className={index % 5 === 0 ? "best-clock-major" : "best-clock-minor"}
            transform={`rotate(${index * 6})`}
          />
        ))}
        <g className="best-clock-hand">
          <path d="M0 7V-56" className="best-hand" />
        </g>
        <g className="best-clock-hand-slow">
          <path d="M-4 2 37 23" className="best-hand-dim" />
        </g>
        <circle r="4" className="best-node" />
      </g>

      <g className="best-headset">
        <path d="M246 155v-12a34 34 0 0 1 68 0v12" className="best-headset-band" />
        <rect x="239" y="149" width="15" height="33" rx="7" className="best-panel-solid" />
        <rect x="306" y="149" width="15" height="33" rx="7" className="best-panel-solid" />
        <path d="M313.5 182c0 17-11 24-28 24" className="best-headset-band" />
        <rect x="276" y="201" width="15" height="8" rx="4" className="best-panel-solid" />
      </g>

      <g className="best-float-a">
        <path d="M65 82h132a12 12 0 0 1 12 12v43a12 12 0 0 1-12 12h-76l-22 17 3-17H65a12 12 0 0 1-12-12V94a12 12 0 0 1 12-12Z" className="best-panel" />
        <text x="70" y="108" className="best-card-heading">How can we help?</text>
        <text x="70" y="129" className="best-card-caption">Support is online now</text>
        <circle cx="70" cy="140" r="2" className="best-dot" />
      </g>
      <g className="best-float-b">
        <path d="M374 180h112a12 12 0 0 1 12 12v37a12 12 0 0 1-12 12h-13l3 17-22-17h-80a12 12 0 0 1-12-12v-37a12 12 0 0 1 12-12Z" className="best-panel" />
        <text x="380" y="207" className="best-card-heading">Issue resolved</text>
        <text x="380" y="227" className="best-card-caption">Average reply &lt; 2 min</text>
      </g>
      <g transform="translate(57 266)">
        <rect width="108" height="32" rx="10" className="best-pill" />
        <g className="best-micro-icon" transform="translate(16 9)">
          <circle cx="7" cy="7" r="6" />
          <path d="M7 4.5V7.5L9 9" />
        </g>
        <text x="36" y="22" className="best-svg-number-small">24/7</text>
      </g>
    </Frame>
  )
}

export function TrackerFeatureVisual({ kind }: { kind: TrackerVisualKind }) {
  return (
    <div className={`best-visual best-visual-${kind}`}>
      {kind === "accuracy" ? <AccuracyVisual /> : null}
      {kind === "mobile" ? <MobileVisual /> : null}
      {kind === "world" ? <WorldVisual /> : null}
      {kind === "uptime" ? <UptimeVisual /> : null}
      {kind === "support" ? <SupportVisual /> : null}
    </div>
  )
}
