import type { ReactNode } from "react"
import "./best-tracker-animations.css"
import "./best-tracker-channels.css"
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
      </defs>
      <rect width="560" height="315" fill={`url(#${grid})`} opacity=".12" />
      {children}
    </svg>
  )
}

function AccuracyVisual() {
  const steps = [
    { label: "ORDER", x: 92 },
    { label: "IN TRANSIT", x: 224 },
    { label: "PICK UP", x: 356 },
    { label: "DELIVERED", x: 488 },
  ]

  return (
    <Frame kind="accuracy">
      <g transform="translate(44 38)">
        <rect width="190" height="38" rx="10" className="best-pill" />
        <circle cx="20" cy="19" r="3" className="best-dot" />
        <text x="34" y="23" className="best-svg-label">99.9% ACCURACY</text>
      </g>

      <path d="M92 170H488" className="best-route-ghost" />
      <path d="M92 170H488" className="best-route-live" pathLength="100" />

      {steps.map((step, index) => (
        <g key={step.label} transform={`translate(${step.x} 170)`}>
          <circle r="7" className="best-step-base" />
          {index < steps.length - 1 ? (
            <circle
              r="7"
              className="best-step-on"
              style={{ animationDelay: `${index * 1.8}s` }}
            />
          ) : (
            <g
              className="best-delivered"
              style={{ animationDelay: `${index * 1.8}s` }}
            >
              <circle r="14" className="best-target-ring" />
              <circle r="10" className="best-target-fill" />
              <path d="m-4 .5 2.5 2.5L4-3" className="best-check" />
            </g>
          )}
          <text y="34" textAnchor="middle" className="best-map-caption">
            {step.label}
          </text>
        </g>
      ))}

      <g className="best-package">
        <g transform="translate(0 -26)">
          <path d="m-12-6 12-5 12 5v13L0 12l-12-5Z" className="best-package-shell" />
          <path d="m-12-6 12 5 12-6M0-1v13M-6-8.5l12 5v6" className="best-package-lines" />
        </g>
      </g>
      <g transform="translate(488 258)">
        <rect x="-190" width="190" height="28" rx="14" className="best-pill" />
        <text x="-95" y="18" textAnchor="middle" className="best-svg-micro">AUTO CARRIER MATCH</text>
      </g>
    </Frame>
  )
}

function MobileVisual() {
  const channels = [
    { label: "Web Tracking", y: 72 },
    { label: "Mobile App", y: 121 },
    { label: "WeChat Mini Program", y: 170 },
    { label: "Shopify App", y: 219 },
  ]

  return (
    <Frame kind="mobile">
      <g transform="translate(40 72)">
        <rect width="222" height="176" rx="14" className="best-panel" />
        <text x="16" y="26" className="best-svg-micro">LIVE TRACKING</text>
        <text x="16" y="56" className="best-svg-label">YQTRACK123456</text>
        <path d="M16 92H206" className="best-route-ghost" />
        <path d="M16 92H143" className="best-mini-progress" />
        <circle cx="16" cy="92" r="3.5" className="best-node" />
        <circle cx="79" cy="92" r="3.5" className="best-node" />
        <circle cx="143" cy="92" r="3.5" className="best-node" />
        <circle cx="206" cy="92" r="3.5" className="best-node-dim" />
        <text x="16" y="122" className="best-svg-micro">München → Tirana</text>
        <rect x="16" y="134" width="116" height="24" rx="12" className="best-status-pill" />
        <text x="28" y="150" className="best-status-text">IN TRANSIT</text>
      </g>

      <circle cx="262" cy="160" r="4" className="best-sync-hub" />
      <circle cx="262" cy="160" r="9" className="best-sync-hub-ring" />

      {channels.map((channel, index) => {
        const cy = channel.y + 21
        return (
          <g key={channel.label}>
            <path
              d={`M262 160Q295 160 328 ${cy}`}
              className="best-sync-link"
            />
            <g transform={`translate(328 ${channel.y})`}>
              <rect width="200" height="42" rx="12" className="best-channel" />
              <g transform="translate(16 12)" className="best-channel-glyph">
                {index === 0 ? (
                  <>
                    <circle cx="9" cy="9" r="7" />
                    <path d="M2 9h14M9 2c3.5 4 3.5 10 0 14M9 2c-3.5 4-3.5 10 0 14" />
                  </>
                ) : index === 1 ? (
                  <>
                    <rect x="2" y="2" width="14" height="14" rx="4" />
                    <circle cx="9" cy="9" r="2.2" fill="#f5f5f5" stroke="none" />
                  </>
                ) : index === 2 ? (
                  <path d="M3 3h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                ) : (
                  <>
                    <path d="M4 5h10l1 9H3Z" />
                    <path d="M6.5 5V3.5a2.5 2.5 0 0 1 5 0V5" />
                  </>
                )}
              </g>
              <text x="44" y="26" className="best-channel-label">
                {channel.label}
              </text>
              <circle cx="184" cy="21" r="2.5" className="best-dot" />
              <circle
                cx="184"
                cy="21"
                r="7"
                className="best-channel-pulse"
                style={{ animationDelay: `${index * 0.45}s` }}
              />
            </g>
          </g>
        )
      })}
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
      </defs>
      <g clipPath="url(#best-world-map-clip)">
        {WORLD_LAND_DOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" className="best-land-dot" />
        ))}

        <path d={`M${laX} ${laY}Q192 48 ${londonX} ${londonY}`} className="best-world-arc" pathLength="100" />
        <path d={`M${londonX} ${londonY}Q354 52 ${shanghaiX} ${shanghaiY}`} className="best-world-arc best-world-arc-2" pathLength="100" />
        <path d={`M${laX} ${laY}Q152 199 ${saoPauloX} ${saoPauloY}`} className="best-world-arc best-world-arc-3" pathLength="100" />
        <path d={`M${shanghaiX} ${shanghaiY}Q474 166 ${sydneyX} ${sydneyY}`} className="best-world-arc best-world-arc-2" pathLength="100" />

        <g className="best-plane">
          <g transform="scale(.95)">
            <circle r="13" className="best-plane-halo" />
            <path
              d="M10 0 3.6-1.7H.9L-3-6.9h-2.4l1.6 5.2h-2.6l-1.6-1.5h-1.4l.6 3.2-.6 3.2h1.4l1.6-1.5h2.6l-1.6 5.2H-3l3.9-5.2h2.7L10 0Z"
              className="best-plane-body"
            />
          </g>
        </g>

        {Object.values(WORLD_HUBS).map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <circle r="4.5" className="best-map-node-ring" />
            <circle r="1.5" className="best-node" />
          </g>
        ))}
        <g className="best-orbit-dot">
          <circle r="2" className="best-dot" />
        </g>
      </g>
      <g transform="translate(372 24)">
        <rect width="144" height="34" rx="10" className="best-glass-pill" />
        <text x="72" y="22" textAnchor="middle" className="best-svg-label">3500+ CARRIERS</text>
      </g>
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
          </g>
        </g>
        <path d="M20 160h230" className="best-chart-base" />
        <text x="20" y="177" className="best-chart-time">00:00</text>
        <text x="250" y="177" textAnchor="end" className="best-chart-time">NOW</text>
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
        <text x="70" y="129" className="best-card-caption">Support online now</text>
        <circle cx="70" cy="140" r="2" className="best-dot" />
      </g>
      <g className="best-float-b">
        <path d="M374 180h112a12 12 0 0 1 12 12v37a12 12 0 0 1-12 12h-13l3 17-22-17h-80a12 12 0 0 1-12-12v-37a12 12 0 0 1 12-12Z" className="best-panel" />
        <text x="380" y="207" className="best-card-heading">Issue resolved</text>
        <text x="380" y="227" className="best-card-caption">Reply &lt; 2 min</text>
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
