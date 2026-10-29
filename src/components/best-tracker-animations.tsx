import type { ReactNode } from "react"
import "./best-tracker-animations.css"
import { WORLD_HUBS, WORLD_MAP_PATH } from "./best-tracker-world"

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
        <circle cx="20" cy="19" r="4" className="best-dot" />
        <circle cx="20" cy="19" r="8" className="best-status-ring" />
        <text x="36" y="23" className="best-svg-label">99.9% ACCURACY</text>
      </g>
      <g transform="translate(359 38)">
        <rect width="157" height="38" rx="10" className="best-pill" />
        <path d="M18 13v12M12 19h12M14.5 15.5l7 7M21.5 15.5l-7 7" className="best-micro-icon" />
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
      <text x="102" y="257" textAnchor="middle" className="best-map-caption">LABEL CREATED</text>
      <text x="197" y="184" textAnchor="middle" className="best-map-caption">IN TRANSIT</text>
      <text x="328" y="216" textAnchor="middle" className="best-map-caption">CUSTOMS</text>
      <text x="452" y="130" textAnchor="middle" className="best-map-caption">DELIVERED</text>

      <g transform="translate(102 218)">
        <circle r="13" className="best-node-pulse" />
        <circle r="7" className="best-node-outline" />
        <circle r="2.5" className="best-node" />
      </g>
      <g transform="translate(197 143)">
        <circle r="12" className="best-node-pulse best-delay-1" />
        <circle r="6" className="best-node-outline" />
        <circle r="2.5" className="best-node" />
      </g>
      <g transform="translate(328 176)">
        <circle r="12" className="best-node-pulse best-delay-2" />
        <circle r="6" className="best-node-outline" />
        <circle r="2.5" className="best-node" />
      </g>
      <g transform="translate(452 89)">
        <circle r="23" className="best-target-ring" />
        <circle r="17" className="best-target-inner" />
        <circle r="13" className="best-target-fill" />
        <path d="m-5 0 3.5 3.5L5-4" className="best-check" />
        <path d="M-29 0h4M25 0h4M0-29v4M0 25v4" className="best-target-ticks" />
      </g>

      <g className="best-package">
        <path d="m-14-7 14-6 14 6v16L0 15l-14-6Z" className="best-package-shell" />
        <path d="m-14-7 14 6 14-6M0-1v16M-7-10l14 6v7" className="best-package-lines" />
      </g>
      <g className="best-scanner">
        <path d="M0 0v42" className="best-scan-line" />
        <path d="M-9 10v-5h5M4 5h5v5M9 31v5H4M-4 36h-5v-5" className="best-scan-corners" />
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
        <rect x="218" y="33" width="126" height="249" rx="19" className="best-phone-screen" />
        <path d="M259 44h44" className="best-speaker" />
        <text x="232" y="68" className="best-phone-title">17TRACK</text>
        <text x="232" y="89" className="best-svg-micro">YQTRACK123456</text>
        <rect x="232" y="101" width="68" height="19" rx="9.5" className="best-status-pill" />
        <text x="242" y="114" className="best-status-text">IN TRANSIT</text>
        <path d="M238 139v98" className="best-phone-track" />
        <circle cx="238" cy="140" r="4" className="best-node" />
        <circle cx="238" cy="172" r="4" className="best-node" />
        <circle cx="238" cy="204" r="4" className="best-node-dim" />
        <circle cx="238" cy="236" r="4" className="best-node-dim" />
        <text x="251" y="142" className="best-phone-event">Shipment picked up</text>
        <text x="251" y="174" className="best-phone-event">Arrived at facility</text>
        <text x="251" y="206" className="best-phone-event-dim">Out for delivery</text>
        <text x="251" y="238" className="best-phone-event-dim">Delivered</text>
        <path d="M252 261h58" className="best-phone-home" />
      </g>

      <g className="best-float-a">
        <rect x="61" y="84" width="157" height="68" rx="13" className="best-panel" />
        <circle cx="82" cy="105" r="9" className="best-notification-icon" />
        <path d="m78 105 3 3 5-6" className="best-check" />
        <text x="99" y="108" className="best-card-heading">Package delivered</text>
        <text x="78" y="132" className="best-card-caption">Today, 14:32</text>
        <path d="M174 130h25" className="best-card-link" />
      </g>
      <g className="best-float-b">
        <rect x="344" y="171" width="153" height="66" rx="13" className="best-panel" />
        <path d="M359 192h15v10h-15zM374 195h7l4 4v3h-11z" className="best-micro-icon" />
        <text x="392" y="198" className="best-card-heading">In transit</text>
        <text x="360" y="221" className="best-card-caption">Arriving today</text>
        <circle cx="477" cy="218" r="3" className="best-dot" />
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
        <pattern id="best-world-land-dots" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".55" fill="#fff" fillOpacity=".2" />
        </pattern>
      </defs>
      <rect x="40" y="46" width="480" height="224" rx="14" className="best-map-frame" />
      <g clipPath="url(#best-world-map-clip)">
        <path d="M40 92h480M40 138h480M40 184h480M40 230h480M116 46v224M192 46v224M268 46v224M344 46v224M420 46v224M496 46v224" className="best-map-graticule" />
        <path d={WORLD_MAP_PATH} className="best-world-land" />
        <path d={WORLD_MAP_PATH} fill="url(#best-world-land-dots)" />

        <path d={`M${laX} ${laY}Q192 48 ${londonX} ${londonY}`} className="best-world-arc" pathLength="100" />
        <path d={`M${londonX} ${londonY}Q354 52 ${shanghaiX} ${shanghaiY}`} className="best-world-arc best-world-arc-2" pathLength="100" />
        <path d={`M${laX} ${laY}Q152 199 ${saoPauloX} ${saoPauloY}`} className="best-world-arc best-world-arc-3" pathLength="100" />
        <path d={`M${shanghaiX} ${shanghaiY}Q474 166 ${sydneyX} ${sydneyY}`} className="best-world-arc best-world-arc-2" pathLength="100" />

        {Object.values(WORLD_HUBS).map(([x, y], index) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            {index === 1 || index === 2 ? <circle r="10" className="best-map-pulse" /> : null}
            <circle r="5" className="best-map-node-ring" />
            <circle r="2" className="best-node" />
          </g>
        ))}
        <g className="best-orbit-dot">
          <circle r="6" className="best-dot-halo" />
          <circle r="2.5" className="best-dot" />
        </g>
      </g>
      <g transform="translate(390 24)">
        <rect width="126" height="34" rx="10" className="best-pill" />
        <text x="16" y="22" className="best-svg-label">3500+ CARRIERS</text>
      </g>
      <circle cx="54" cy="290" r="3" className="best-dot" />
      <text x="65" y="294" className="best-svg-micro">LIVE ROUTES</text>
      <text x="506" y="294" textAnchor="end" className="best-svg-micro">190+ COUNTRIES & REGIONS</text>
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
            <path d="M12 13h17M12 20h26M12 27h12" className="best-server-vents" />
            <text x="48" y="25" className="best-server-label">{label}</text>
            <circle cx="94" cy="21.5" r="3" className="best-server-light" />
          </g>
        ))}
      </g>
      <path d="M184 112h29M184 165h29M184 218h29" className="best-server-link" />

      <g transform="translate(213 66)">
        <rect width="270" height="185" rx="16" className="best-panel" />
        <text x="20" y="35" className="best-svg-number">99.9%</text>
        <text x="176" y="32" className="best-svg-micro">UPTIME</text>
        <circle cx="239" cy="28" r="3" className="best-dot" />
        <path d="M20 58h230M20 92h230M20 126h230M20 160h230M66 58v102M112 58v102M158 58v102M204 58v102" className="best-chart-grid" />
        <g clipPath="url(#best-uptime-plot)">
          <path
            d="M20 130h27l14-10 16 7 19-45 15 60 17-25 15 8 18-51 15 63 18-11 16 4 20-32 20 7"
            className="best-chart-line"
            pathLength="100"
          />
          <circle cx="161" cy="74" r="5" className="best-chart-point" />
          <circle cx="161" cy="74" r="10" className="best-chart-point-ring" />
        </g>
        <path d="M20 160h230" className="best-chart-base" />
        <text x="20" y="177" className="best-chart-time">00:00</text>
        <text x="250" y="177" textAnchor="end" className="best-chart-time">NOW</text>
      </g>
      <g transform="translate(365 272)">
        <circle r="4" className="best-dot" />
        <circle r="8" className="best-status-ring" />
        <text x="14" y="4" className="best-svg-micro">ALL SYSTEMS OPERATIONAL</text>
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
            d={index % 5 === 0 ? "M0-88v7" : "M0-88v3"}
            className={index % 5 === 0 ? "best-clock-major" : "best-clock-minor"}
            transform={`rotate(${index * 6})`}
          />
        ))}
        <g className="best-clock-hand">
          <path d="M0 8V-57" className="best-hand" />
        </g>
        <g className="best-clock-hand-slow">
          <path d="M-5 3 38 24" className="best-hand-dim" />
        </g>
        <circle r="5" className="best-node" />
      </g>

      <g className="best-headset">
        <path d="M245 156v-13a35 35 0 0 1 70 0v13" className="best-headset-band" />
        <rect x="237" y="149" width="18" height="35" rx="8" className="best-panel-solid" />
        <rect x="305" y="149" width="18" height="35" rx="8" className="best-panel-solid" />
        <path d="M314 184c0 19-12 26-30 26" className="best-headset-band" />
        <rect x="274" y="204" width="17" height="10" rx="5" className="best-panel-solid" />
      </g>

      <g className="best-float-a">
        <path d="M65 82h132a12 12 0 0 1 12 12v43a12 12 0 0 1-12 12h-76l-22 17 3-17H65a12 12 0 0 1-12-12V94a12 12 0 0 1 12-12Z" className="best-panel" />
        <text x="70" y="108" className="best-card-heading">How can we help?</text>
        <text x="70" y="129" className="best-card-caption">Support is online now</text>
        <circle cx="70" cy="140" r="2.5" className="best-dot" />
      </g>
      <g className="best-float-b">
        <path d="M374 180h112a12 12 0 0 1 12 12v37a12 12 0 0 1-12 12h-13l3 17-22-17h-80a12 12 0 0 1-12-12v-37a12 12 0 0 1 12-12Z" className="best-panel" />
        <text x="380" y="207" className="best-card-heading">Issue resolved</text>
        <text x="380" y="227" className="best-card-caption">Average reply &lt; 2 min</text>
      </g>
      <g transform="translate(57 266)">
        <rect width="88" height="32" rx="10" className="best-pill" />
        <text x="23" y="22" className="best-svg-number-small">24/7</text>
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
