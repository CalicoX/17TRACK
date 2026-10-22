import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
} from "react"
import { Filter, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const CARRIERS = [
  "USPS",
  "DHL",
  "FedEx",
  "Canada Post",
  "Deutsche Post",
  "AliExpress",
  "eBay",
] as const

const CARRIER_LOGOS: Record<(typeof CARRIERS)[number], string> = {
  USPS: "/carriers/usps.svg",
  DHL: "/carriers/dhl.svg",
  FedEx: "/carriers/fedex.svg",
  "Canada Post": "/carriers/canada-post.svg",
  "Deutsche Post": "/carriers/deutsche-post.svg",
  AliExpress: "/carriers/aliexpress.png",
  eBay: "/carriers/ebay.svg",
}

function isCarrierName(name: string): name is (typeof CARRIERS)[number] {
  return (CARRIERS as readonly string[]).includes(name)
}

type TrackingLine = {
  id: string
  value: string
}

type HistoryItem = {
  id: string
  value: string
}

const still = "active:translate-y-0!"

const BLUR_STEPS = [
  { blur: 1, from: 0 },
  { blur: 2, from: 16 },
  { blur: 4, from: 32 },
  { blur: 8, from: 48 },
  { blur: 14, from: 64 },
] as const

const TOOLBAR_CLEARANCE = 84
const MAX_TRACKING_LINES = 40
const LINE_BREAK = /[\n\r\u2028\u2029]/

type PasteEventLike = {
  clipboardData: DataTransfer | null
  nativeEvent?: { clipboardData?: DataTransfer | null; __trackingHandled?: boolean }
  preventDefault: () => void
  stopPropagation: () => void
  __trackingHandled?: boolean
}

function readClipboard(
  data: DataTransfer | null | undefined,
  type: string,
): string {
  if (!data) return ""
  try {
    return data.getData(type) || ""
  } catch {
    return ""
  }
}

function clipboardSources(event: PasteEventLike): DataTransfer[] {
  const sources: DataTransfer[] = []
  const seen = new Set<DataTransfer>()
  for (const data of [event.clipboardData, event.nativeEvent?.clipboardData]) {
    if (!data || seen.has(data)) continue
    seen.add(data)
    sources.push(data)
  }
  return sources
}

function clipboardPlainText(event: PasteEventLike): string {
  for (const data of clipboardSources(event)) {
    const plain = readClipboard(data, "text/plain") || readClipboard(data, "text")
    if (plain) return plain
  }
  return ""
}

function htmlToPlain(html: string): string {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
  const doc = new DOMParser().parseFromString(withBreaks, "text/html")
  return doc.body.textContent ?? ""
}

function resolvePasteText(event: PasteEventLike): string {
  const plain = clipboardPlainText(event)
  if (LINE_BREAK.test(plain)) return plain
  let htmlPlain = ""
  for (const data of clipboardSources(event)) {
    const html = readClipboard(data, "text/html")
    if (!html) continue
    const converted = htmlToPlain(html)
    if (splitTrackingPaste(converted).length >= 2) return converted
    if (!htmlPlain) {
      htmlPlain = converted.replace(/[\r\n\u2028\u2029]+/g, "").trim()
    }
  }
  return plain || htmlPlain
}

function markPasteHandled(event: PasteEventLike) {
  event.__trackingHandled = true
  if (event.nativeEvent) event.nativeEvent.__trackingHandled = true
}

function inputFromPaste(event: PasteEventLike): HTMLInputElement | null {
  const candidate = event as PasteEventLike & {
    target?: EventTarget | null
    currentTarget?: EventTarget | null
  }
  if (candidate.target instanceof HTMLInputElement) return candidate.target
  if (candidate.currentTarget instanceof HTMLInputElement) return candidate.currentTarget
  return null
}

function splitTrackingPaste(text: string): string[] {
  return text
    .split(/\r\n|\n|\r|\u2028|\u2029/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

function flattenedPasteValues(text: string, first: string): Set<string> {
  const values = [
    text.replace(/[\r\n\u2028\u2029]+/g, ""),
    text.replace(/[\r\n\u2028\u2029]+/g, " ").replace(/[ \t]+/g, " ").trim(),
  ]
  return new Set(values.filter((value) => value.length > 0 && value !== first))
}

function ToolBlur() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
    >
      {BLUR_STEPS.map((step) => (
        <div
          key={step.blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${step.blur}px)`,
            WebkitBackdropFilter: `blur(${step.blur}px)`,
            maskImage: `linear-gradient(to bottom, transparent ${step.from}%, black ${step.from + 28}%, black 100%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${step.from}%, black ${step.from + 28}%, black 100%)`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/15 to-white/55" />
    </div>
  )
}

function createLine(value = ""): TrackingLine {
  return { id: crypto.randomUUID(), value }
}

function HoverTooltip({
  label,
  children,
}: {
  label: string
  children: ReactElement
}) {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip
      open={open}
      onOpenChange={(next) => {
        if (!next) setOpen(false)
      }}
    >
      <TooltipTrigger
        asChild
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}

export function TrackingHero() {
  const [lines, setLines] = useState<TrackingLine[]>(() => [createLine()])
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [carrier, setCarrier] = useState<string | null>(null)
  const [carrierOpen, setCarrierOpen] = useState(false)
  const [carrierQuery, setCarrierQuery] = useState("")
  const [pendingFocus, setPendingFocus] = useState<string | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const ignorePasteValues = useRef<Set<string> | null>(null)
  const ignorePasteToken = useRef(0)
  const suppressPasteInput = useRef<string | null>(null)
  const pasteLock = useRef(false)
  const pasteHandlerRef = useRef<(event: PasteEventLike, id: string) => void>(
    () => {},
  )
  const applyPasteRef = useRef<(id: string, text: string) => void>(() => {})
  const listRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const carrierButtonRef = useRef<HTMLButtonElement>(null)
  const showPlaceholder =
    lines.length === 1 && lines[0]?.value.length === 0

  const hasNumbers = lines.some((line) => line.value.trim().length > 0)
  const carrierQueryNormalized = carrierQuery.trim().toLowerCase()
  const filteredCarriers = CARRIERS.filter((name) =>
    name.toLowerCase().includes(carrierQueryNormalized),
  )

  useLayoutEffect(() => {
    if (!pendingFocus) return
    const input = inputRefs.current[pendingFocus]
    const scroller = listRef.current
    const line = input?.closest("[data-tracking-line]")
    if (input && scroller && line) {
      input.focus({ preventScroll: true })
      const scrollerRect = scroller.getBoundingClientRect()
      const lineRect = line.getBoundingClientRect()
      const limit = scrollerRect.bottom - TOOLBAR_CLEARANCE
      if (lineRect.bottom > limit) {
        scroller.scrollTop += lineRect.bottom - limit
      } else if (lineRect.top < scrollerRect.top) {
        scroller.scrollTop -= scrollerRect.top - lineRect.top
      }
    }
    setPendingFocus(null)
  }, [pendingFocus])

  function updateLine(id: string, value: string, inputType?: string) {
    if (
      inputType === "insertFromPaste" &&
      suppressPasteInput.current === id &&
      (value === "" || ignorePasteValues.current?.has(value))
    ) {
      return
    }
    if (ignorePasteValues.current?.has(value)) return
    if (LINE_BREAK.test(value)) {
      applyMultilinePaste(id, value)
      return
    }
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, value } : line)),
    )
  }

  function notePasteInput(id: string) {
    suppressPasteInput.current = id
    window.setTimeout(() => {
      if (suppressPasteInput.current === id) suppressPasteInput.current = null
    }, 50)
  }

  function schedulePlainPaste(event: PasteEventLike, id: string, text: string) {
    const input = inputFromPaste(event)
    if (!input || !text) return
    const before = input.value
    const start = input.selectionStart ?? before.length
    const end = input.selectionEnd ?? before.length
    const nextValue = before.slice(0, start) + text + before.slice(end)
    if (nextValue === before) return
    requestAnimationFrame(() => {
      const node = inputRefs.current[id] ?? input
      if (node.value !== before) return
      setLines((current) =>
        current.map((line) =>
          line.id === id ? { ...line, value: nextValue } : line,
        ),
      )
    })
  }

  function armPasteIgnore(values: Set<string>) {
    ignorePasteValues.current = values
    const token = ignorePasteToken.current + 1
    ignorePasteToken.current = token
    window.setTimeout(() => {
      if (ignorePasteToken.current === token) ignorePasteValues.current = null
    }, 400)
  }

  function applyMultilinePaste(id: string, text: string) {
    if (pasteLock.current) return
    const parts = splitTrackingPaste(text)
    if (parts.length === 0) return
    pasteLock.current = true
    queueMicrotask(() => {
      pasteLock.current = false
    })

    const first = parts[0]
    if (!first) return
    const extras = parts.slice(1).map((value) => createLine(value))
    const room = Math.max(0, MAX_TRACKING_LINES - lines.length + 1)
    const take = Math.min(parts.length, room)
    if (take === 0) return
    const inserted = extras.slice(0, take - 1)
    armPasteIgnore(flattenedPasteValues(text, first))
    notePasteInput(id)

    setLines((current) => {
      const index = current.findIndex((line) => line.id === id)
      if (index < 0) return current
      const currentRoom = Math.max(0, MAX_TRACKING_LINES - current.length + 1)
      const currentTake = Math.min(parts.length, currentRoom)
      if (currentTake === 0) return current
      const currentInserted = extras.slice(0, currentTake - 1)
      const next = current.slice()
      next[index] = { ...current[index], value: first }
      if (currentInserted.length > 0) {
        next.splice(index + 1, 0, ...currentInserted)
      }
      return next
    })
    setPendingFocus(inserted.at(-1)?.id ?? id)
  }

  function addLineAfter(index: number) {
    const line = createLine()
    setLines((current) => {
      const next = [...current]
      next.splice(index + 1, 0, line)
      return next
    })
    setPendingFocus(line.id)
  }

  function insertHistory(value: string) {
    setLines((current) => {
      if (current.some((line) => line.value.trim() === value)) return current
      const index = current.findIndex((line) => line.value.trim() === "")
      if (index !== -1) {
        return current.map((line, lineIndex) =>
          lineIndex === index ? { ...line, value } : line,
        )
      }
      return [...current, createLine(value)]
    })
  }

  function removeHistory(id: string) {
    setHistory((current) => current.filter((item) => item.id !== id))
  }

  function clearLines() {
    const line = createLine()
    setLines([line])
    setPendingFocus(line.id)
  }

  function removeLine(id: string) {
    const index = lines.findIndex((line) => line.id === id)
    if (index < 0) return

    if (lines.length === 1) {
      setLines((current) =>
        current.map((line) =>
          line.id === id ? { ...line, value: "" } : line,
        ),
      )
      setPendingFocus(id)
      return
    }

    const focusId = lines[index - 1]?.id ?? lines[index + 1]?.id ?? null
    setLines((current) => current.filter((line) => line.id !== id))
    setPendingFocus(focusId)
  }

  function onLineKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.nativeEvent.isComposing) return

    if (event.key === "Enter") {
      event.preventDefault()
      addLineAfter(index)
      return
    }

    if (
      event.key === "Backspace" &&
      lines[index]?.value === "" &&
      lines.length > 1
    ) {
      event.preventDefault()
      const previousId = lines[index - 1]?.id ?? lines[index + 1]?.id ?? null
      setLines((current) => current.filter((_, lineIndex) => lineIndex !== index))
      setPendingFocus(previousId)
    }
  }

  function onLineBeforeInput(event: FormEvent<HTMLInputElement>, id: string) {
    const native = event.nativeEvent
    if (!(native instanceof InputEvent)) return
    if (native.inputType !== "insertFromPaste" || !native.data) return
    if (!LINE_BREAK.test(native.data)) return
    if (splitTrackingPaste(native.data).length === 0) return
    event.preventDefault()
    applyMultilinePaste(id, native.data)
  }

  function onLinePaste(event: PasteEventLike, id: string) {
    if (event.__trackingHandled || event.nativeEvent?.__trackingHandled) return
    let text = ""
    try {
      text = resolvePasteText(event)
    } catch {
      return
    }
    if (!LINE_BREAK.test(text)) {
      if (!text) return
      markPasteHandled(event)
      schedulePlainPaste(event, id, text)
      return
    }
    if (splitTrackingPaste(text).length === 0) return
    markPasteHandled(event)
    event.preventDefault()
    event.stopPropagation()
    applyMultilinePaste(id, text)
  }

  pasteHandlerRef.current = onLinePaste
  applyPasteRef.current = applyMultilinePaste

  useEffect(() => {
    const root = listRef.current
    if (!root) return
    const lineIdFrom = (target: EventTarget | null) => {
      if (!(target instanceof HTMLInputElement)) return null
      return target.dataset.lineId ?? null
    }
    const onBeforeInput = (event: Event) => {
      if (!(event instanceof InputEvent)) return
      if (event.inputType !== "insertFromPaste" || !event.data) return
      if (!LINE_BREAK.test(event.data)) return
      const id = lineIdFrom(event.target)
      if (!id) return
      event.preventDefault()
      applyPasteRef.current(id, event.data)
    }
    const onPaste = (event: Event) => {
      if (!(event instanceof ClipboardEvent)) return
      const id = lineIdFrom(event.target)
      if (!id) return
      pasteHandlerRef.current(event, id)
    }
    root.addEventListener("beforeinput", onBeforeInput, true)
    root.addEventListener("paste", onPaste, true)
    return () => {
      root.removeEventListener("beforeinput", onBeforeInput, true)
      root.removeEventListener("paste", onPaste, true)
    }
  }, [])

  function selectCarrier(name: string | null) {
    setCarrier(name)
    setCarrierOpen(false)
    setCarrierQuery("")
    carrierButtonRef.current?.blur()
  }

  function onTrack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const numbers = lines
      .map((line) => line.value.trim())
      .filter((value) => value.length > 0)

    setHistory((current) => {
      const seen = new Set(current.map((item) => item.value))
      const additions = numbers.flatMap((value) => {
        if (seen.has(value)) return []
        seen.add(value)
        return [{ id: crypto.randomUUID(), value }]
      })
      return additions.length > 0 ? [...current, ...additions] : current
    })
  }

  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-16 text-[#212121] antialiased">
      <div className="flex w-full max-w-[728px] flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-[18px] text-center">
          <h1 className="w-full text-[32px] leading-[28.6px] font-bold tracking-[-0.66px] text-[#212121]">
            ALL IN ONE GLOBAL PACKAGE TRACKING
          </h1>
          <p className="w-full text-[16px] leading-6 font-normal tracking-[-0.24px] text-[#5c6370]">
            Track global packages, eCommerce orders, and air cargo from 3500+
            carriers and 190+ airlines, covering China and beyond with 17TRACK.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <form
            className="relative h-[262px] w-full overflow-hidden rounded-[24px] border border-[#e6e8ec] bg-white shadow-none focus-within:border-[#d5d8de] focus-within:shadow-[0px_1px_1.5px_rgba(0,0,0,0.025)]"
            onSubmit={onTrack}
          >
            <div
              ref={listRef}
              className="tracking-scroll h-full overflow-y-auto pt-2 pb-24"
              onPointerDown={(event) => {
                const target = event.target
                if (!(target instanceof HTMLElement)) return
                if (target.closest("input, button, a")) return
                const line =
                  lines.find((item) => item.value.length === 0) ?? lines[0]
                if (!line) return
                inputRefs.current[line.id]?.focus({ preventScroll: true })
              }}
            >
              {lines.map((line, index) => (
                <div
                  key={line.id}
                  data-tracking-line
                  className={cn(
                    "flex h-[30px] items-center px-[14px]",
                    index % 2 === 1 && "bg-[#f6f6f7]",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-[30px] w-6 shrink-0 text-[14px] leading-[30px] tracking-[-0.19px] tabular-nums",
                      showPlaceholder && index === 0
                        ? "text-[#a3a3a3]"
                        : "text-[#212121]",
                    )}
                  >
                    {index + 1}.
                  </span>
                  <div className="relative h-[30px] min-w-0 flex-1">
                    <Input
                      ref={(node) => {
                        inputRefs.current[line.id] = node
                      }}
                      value={line.value}
                      data-line-id={line.id}
                      aria-label={`Tracking number ${index + 1}`}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      onChange={(event) =>
                        updateLine(
                          line.id,
                          event.target.value,
                          event.nativeEvent instanceof InputEvent
                            ? event.nativeEvent.inputType
                            : undefined,
                        )
                      }
                      onKeyDown={(event) => onLineKeyDown(event, index)}
                      onBeforeInput={(event) =>
                        onLineBeforeInput(event, line.id)
                      }
                      onPaste={(event) => onLinePaste(event, line.id)}
                      className="h-[30px] rounded-none border-0 bg-transparent px-0 py-0 text-[14px] leading-[30px] tracking-[-0.19px] text-[#212121] shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-[14px]"
                    />
                    {showPlaceholder && index === 0 ? (
                      <div className="pointer-events-none absolute inset-0 text-[14px] leading-[30px] tracking-[-0.19px] text-[#a3a3a3]">
                        <p className="whitespace-nowrap">
                          Enter up to 40 tracking numbers, one per line
                        </p>
                        <p className="text-[13px] leading-[19.5px] whitespace-nowrap">
                          Supports airline cargo tracking (e.g. 123-12345678).
                        </p>
                      </div>
                    ) : null}
                  </div>
                  {line.value.trim() ? (
                    <button
                      type="button"
                      className="ml-2 inline-flex shrink-0 bg-transparent p-0"
                      aria-label={`Remove line ${index + 1}`}
                      onClick={() => removeLine(line.id)}
                    >
                      <img src="/figma/close.svg" alt="" />
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
              <ToolBlur />
              <div className="relative flex items-center justify-between px-3 pt-2 pb-3">
              <div className="pointer-events-auto flex items-center gap-2">
                {hasNumbers ? (
                  <>
                    <HoverTooltip label="Filter">
                        <Button
                          type="button"
                          variant="ghost"
                          aria-label="Filter"
                          className={cn(
                            still,
                            "h-12 w-12 rounded-full border border-[#f0f1f4] bg-white/40 p-0 text-[#212121] shadow-[inset_0_1px_3px_rgba(255,255,255,0.85),0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl hover:border-[#f0f1f4] hover:bg-white hover:text-[#212121] focus-visible:border-[#f0f1f4] focus-visible:bg-white focus-visible:text-[#212121] active:border-[#f0f1f4] active:bg-[#e8eaee] [&_svg]:size-5",
                          )}
                        >
                          <Filter />
                        </Button>
                    </HoverTooltip>
                    <HoverTooltip label="Clear">
                        <Button
                          type="button"
                          variant="ghost"
                          aria-label="Clear tracking numbers"
                          className={cn(
                            still,
                            "h-12 w-12 rounded-full border border-[#e5484d]/35 bg-[#e5484d]/20 p-0 text-[#e5484d] shadow-[inset_0_1px_3px_rgba(255,255,255,0.85),0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl hover:border-[#e5484d]/35 hover:bg-[#e5484d]/32 hover:text-[#e5484d] focus-visible:border-[#e5484d]/35 focus-visible:bg-[#e5484d]/32 focus-visible:text-[#e5484d] active:bg-[#e5484d]/40 [&_svg]:size-5",
                          )}
                          onClick={clearLines}
                        >
                          <Trash2 />
                        </Button>
                    </HoverTooltip>
                  </>
                ) : null}
              </div>

              <div className="pointer-events-auto flex items-center gap-3">
                <Popover
                  open={carrierOpen}
                  onOpenChange={(open) => {
                    setCarrierOpen(open)
                    if (open) setCarrierQuery("")
                  }}
                >
                  <HoverTooltip label="Select carrier">
                      <PopoverTrigger asChild>
                        <Button
                          ref={carrierButtonRef}
                          type="button"
                          variant="ghost"
                          className={cn(
                            still,
                            "h-12 gap-2.5 rounded-full border border-[#f0f1f4] bg-white/40 py-0 pr-3 pl-1 text-[14px] leading-5 font-medium tracking-[-0.21px] text-black shadow-[inset_0_1px_3px_rgba(255,255,255,0.85),0_4px_12px_rgba(0,0,0,0.03)] backdrop-blur-xl hover:border-[#f0f1f4] hover:bg-white hover:text-black focus-visible:border-[#f0f1f4] focus-visible:bg-white focus-visible:text-black aria-expanded:border-[#f0f1f4] aria-expanded:bg-white/40 aria-expanded:text-black",
                          )}
                        >
                          {carrier && isCarrierName(carrier) ? (
                            <img
                              src={CARRIER_LOGOS[carrier]}
                              alt=""
                              className="size-9 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8eaee]">
                              <img src="/figma/shipment-major.svg" alt="" />
                            </span>
                          )}
                          {carrier ?? "Select carrier"}
                        </Button>
                      </PopoverTrigger>
                  </HoverTooltip>
                  <PopoverContent
                    side="top"
                    align="end"
                    avoidCollisions={false}
                    className="w-56 gap-1 p-1.5"
                    onOpenAutoFocus={(event) => {
                      event.preventDefault()
                      searchRef.current?.focus()
                    }}
                    onCloseAutoFocus={(event) => {
                      event.preventDefault()
                      carrierButtonRef.current?.blur()
                    }}
                  >
                    <Input
                      ref={searchRef}
                      value={carrierQuery}
                      placeholder="Search carrier"
                      aria-label="Search carrier"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      className="focus-visible:border-input focus-visible:ring-0 focus-visible:shadow-none"
                      onChange={(event) => setCarrierQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter") return
                        event.preventDefault()
                        const match = filteredCarriers[0]
                        if (match) selectCarrier(match)
                      }}
                    />
                    <div className="max-h-60 overflow-y-auto">
                      {carrierQueryNormalized.length === 0 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          className={cn(
                            still,
                            "h-auto min-h-12 w-full items-center justify-start rounded-md p-2 text-[13px] font-normal active:bg-[#f2f2f2]",
                            carrier === null && "bg-muted",
                          )}
                          onClick={() => selectCarrier(null)}
                        >
                          Select carrier
                        </Button>
                      ) : null}
                      {filteredCarriers.map((name) => (
                        <Button
                          key={name}
                          type="button"
                          variant="ghost"
                          className={cn(
                            still,
                            "h-auto w-full items-center justify-start gap-2 rounded-md p-2 text-[13px] font-normal active:bg-[#f2f2f2]",
                            carrier === name && "bg-muted",
                          )}
                          onClick={() => selectCarrier(name)}
                        >
                          <img
                            src={CARRIER_LOGOS[name]}
                            alt=""
                            className="size-8 shrink-0 rounded-[4px] object-cover"
                          />
                          {name}
                        </Button>
                      ))}
                      {filteredCarriers.length === 0 ? (
                        <p className="px-2 py-2 text-[13px] text-[#5c6370]">
                          No carriers
                        </p>
                      ) : null}
                    </div>
                  </PopoverContent>
                </Popover>

                <HoverTooltip label="Track">
                    <Button
                      type="submit"
                      variant="ghost"
                      aria-label="Track"
                      className={cn(
                        still,
                        "h-12 items-center gap-1 rounded-full border-0 bg-[#FF9916] py-0 pr-4 pl-3 text-[14px] leading-5 font-bold tracking-[-0.21px] text-white shadow-[inset_0_1px_3px_rgba(255,255,255,0.85),0_4px_12px_rgba(255,153,22,0.28)] hover:bg-[#f08c0c] hover:text-white focus-visible:bg-[#f08c0c] focus-visible:text-white",
                      )}
                    >
                      <span className="inline-flex size-6 shrink-0 items-center justify-center">
                        <img src="/figma/tracking.svg" alt="" className="shrink-0" />
                      </span>
                      <span className="text-[14px] leading-5 font-bold text-white">
                        TRACK
                      </span>
                    </Button>
                </HoverTooltip>
              </div>
              </div>
            </div>
          </form>

          {history.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1">
              <p className="text-[12px] leading-4 font-medium tracking-[-0.19px] text-black">
                Track history:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {(historyExpanded ? history : history.slice(0, 3)).map((item) => (
                  <Badge
                    key={item.id}
                    variant="secondary"
                    className="h-5 gap-[3px] rounded-full border-0 bg-[#ececec] py-0 pr-1 pl-[6px] text-[13px] leading-4 font-normal tracking-[-0.19px] text-black hover:bg-[#e4e4e4]"
                  >
                    <button
                      type="button"
                      className="bg-transparent p-0 text-[13px] leading-4 tracking-[-0.19px] text-black"
                      onClick={() => insertHistory(item.value)}
                    >
                      {item.value}
                    </button>
                    <button
                      type="button"
                      className="inline-flex bg-transparent p-0"
                      aria-label={`Remove ${item.value}`}
                      onClick={() => removeHistory(item.id)}
                    >
                      <img src="/figma/close.svg" alt="" />
                    </button>
                  </Badge>
                ))}
                {history.length > 3 ? (
                  <button
                    type="button"
                    className="inline-flex h-5 items-center rounded-full border-0 bg-[#ececec] px-[6px] text-[13px] leading-4 font-normal tracking-[-0.19px] text-black hover:bg-[#e4e4e4]"
                    aria-expanded={historyExpanded}
                    onClick={() => setHistoryExpanded((open) => !open)}
                  >
                    more
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <img
          src="/figma/banner.png"
          alt="17RETURNS DTC 品牌退换货售后解决方案。挽回20%+收入，7×24h自动处理，降低80%客服工作量，18%+节省逆向物流费。"
          width={728}
          height={90}
          className="h-[90px] w-full object-cover"
        />
      </div>
    </section>
  )
}
