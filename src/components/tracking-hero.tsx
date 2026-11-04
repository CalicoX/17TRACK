import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactElement,
} from "react"
import { Filter, Trash2, X } from "lucide-react"
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
import { HeroGlobe } from "@/components/hero-globe"
import { cn } from "@/lib/utils"

type CarrierOption = {
  name: string
  country: string
  logo: string
  popular?: boolean
}

const CARRIER_OPTIONS: CarrierOption[] = [
  { name: "USPS", country: "United States", logo: "/carriers/menu/usps.webp", popular: true },
  { name: "UPS", country: "United States", logo: "/carriers/menu/ups.webp", popular: true },
  { name: "FedEx", country: "United States", logo: "/carriers/menu/fedex.webp", popular: true },
  { name: "DHL", country: "Germany", logo: "/carriers/menu/dhl.webp", popular: true },
  { name: "Cainiao", country: "China", logo: "/carriers/menu/cainiao.webp", popular: true },
  { name: "YunExpress", country: "China", logo: "/carriers/menu/yunexpress.webp", popular: true },
  { name: "GLS", country: "United Kingdom", logo: "/carriers/menu/gls.webp", popular: true },
  { name: "4PX", country: "China", logo: "/carriers/menu/4px.webp", popular: true },
  { name: "DPD", country: "Germany", logo: "/carriers/menu/dpd.webp", popular: true },
  { name: "UBI", country: "China", logo: "/carriers/menu/ubi.webp" },
  { name: "GOFO", country: "France", logo: "/carriers/menu/gofo.webp" },
  { name: "Canada Post", country: "Canada", logo: "/carriers/menu/canada-post.webp" },
  { name: "Deutsche Post", country: "Germany", logo: "/carriers/menu/deutsche-post.webp" },
  { name: "Royal Mail", country: "United Kingdom", logo: "/carriers/menu/royal-mail.webp" },
  { name: "AliExpress", country: "China", logo: "/carriers/aliexpress.webp" },
  { name: "eBay", country: "United States", logo: "/carriers/ebay.svg" },
]

function carrierByName(name: string) {
  return CARRIER_OPTIONS.find((item) => item.name === name)
}

function CarrierGroup({
  title,
  items,
  selected,
  onSelect,
  empty,
}: {
  title: string
  items: CarrierOption[]
  selected: string | null
  onSelect: (name: string) => void
  empty?: string
}) {
  if (items.length === 0 && !empty) return null
  return (
    <div className="mb-3 last:mb-0">
      <p className="mb-1.5 px-1 text-[13px] leading-5 font-semibold text-[#212121]">
        {title}
      </p>
      {items.length === 0 ? (
        <p className="px-1 text-[13px] leading-5 text-[#8a8f98]">{empty}</p>
      ) : null}
      <div className="grid grid-cols-3 gap-1">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            className={cn(
              still,
              "flex min-w-0 items-center gap-2 rounded-md p-1.5 text-left hover:bg-[#f2f2f2]",
              selected === item.name && "bg-[#f2f2f2]",
            )}
            onClick={() => onSelect(item.name)}
          >
            <img
              src={item.logo}
              alt=""
              className="size-8 shrink-0 rounded-[4px] bg-white object-contain"
            />
            <span className="min-w-0">
              <span className="block truncate text-[13px] leading-4 font-medium text-[#212121]">
                {item.name}
              </span>
              <span className="block truncate text-[11px] leading-4 text-[#8a8f98]">
                {item.country}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
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

const TOOLBAR_CLEARANCE = 84
const CARRIER_MENU_TOP_CLEARANCE = 64
const CARRIER_MENU_SIDE_OFFSET = 4
const CARRIER_MENU_FIXED_CHROME = 112
const CARRIER_LIST_MAX_HEIGHT = 360
const MAX_TRACKING_LINES = 40
const LINE_BREAK = /[\n\r\u2028\u2029]/
const DESKTOP_TRACK_QUERY = "(min-width: 48rem)"

function isDesktopTrack() {
  return window.matchMedia(DESKTOP_TRACK_QUERY).matches
}

function spaceAboveCarrierButton(button: HTMLElement) {
  return Math.floor(
    button.getBoundingClientRect().top -
      CARRIER_MENU_TOP_CLEARANCE -
      CARRIER_MENU_SIDE_OFFSET,
  )
}

function isCarrierMenuScroll(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("[data-slot=popover-content]"))
  )
}

function isQueryCardScroll(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(".track-shell"))
}

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
  return <div aria-hidden className="track-tool-blur" />
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
  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild onFocus={(event) => event.preventDefault()}>
        {children}
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export function TrackingHero() {
  const [lines, setLines] = useState<TrackingLine[]>(() => [createLine()])
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [carrier, setCarrier] = useState<string | null>(null)
  const [carrierOpen, setCarrierOpen] = useState(false)
  const [carrierMenuMaxHeight, setCarrierMenuMaxHeight] = useState<number | null>(null)
  const [carrierQuery, setCarrierQuery] = useState("")
  const [carrierHistory, setCarrierHistory] = useState<string[]>([])
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
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const [desktopLayout, setDesktopLayout] = useState(isDesktopTrack)
  const showPlaceholder =
    lines.length === 1 && lines[0]?.value.length === 0
  const mobileLine = lines[0]

  const hasNumbers = lines.some((line) => line.value.trim().length > 0)
  const carrierQueryNormalized = carrierQuery.trim().toLowerCase()
  const carrierMatches = (item: CarrierOption) =>
    carrierQueryNormalized.length === 0 ||
    `${item.name} ${item.country}`.toLowerCase().includes(carrierQueryNormalized)
  const historyCarriers = carrierHistory
    .map((name) => carrierByName(name))
    .filter((item): item is CarrierOption => item != null && carrierMatches(item))
  const popularCarriers = CARRIER_OPTIONS.filter(
    (item) => item.popular && carrierMatches(item),
  )
  const allCarriers = CARRIER_OPTIONS.filter(
    (item) => !item.popular && carrierMatches(item),
  )
  const carrierListMaxHeight =
    carrierMenuMaxHeight == null
      ? CARRIER_LIST_MAX_HEIGHT
      : Math.min(
          CARRIER_LIST_MAX_HEIGHT,
          Math.max(0, carrierMenuMaxHeight - CARRIER_MENU_FIXED_CHROME),
        )

  useLayoutEffect(() => {
    if (!pendingFocus) return
    if (!isDesktopTrack()) {
      mobileInputRef.current?.focus({ preventScroll: true })
      setPendingFocus(null)
      return
    }
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

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_TRACK_QUERY)
    const onChange = () => {
      const desktop = query.matches
      setDesktopLayout(desktop)
      if (!desktop) setCarrierOpen(false)
    }
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useLayoutEffect(() => {
    if (!carrierOpen) return
    const update = () => {
      const button = carrierButtonRef.current
      if (!button) return
      const next = spaceAboveCarrierButton(button)
      setCarrierMenuMaxHeight((current) => (current === next ? current : next))
    }
    const onScroll = (event: Event) => {
      if (isCarrierMenuScroll(event.target) || isQueryCardScroll(event.target)) return
      setCarrierOpen(false)
    }
    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", onScroll, true)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", onScroll, true)
    }
  }, [carrierOpen])

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
      const node = input.isConnected ? input : (inputRefs.current[id] ?? input)
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
    if (!isDesktopTrack()) {
      const first = splitTrackingPaste(text)[0] ?? ""
      if (!first) return
      pasteLock.current = true
      queueMicrotask(() => {
        pasteLock.current = false
      })
      armPasteIgnore(flattenedPasteValues(text, first))
      notePasteInput(id)
      setLines((current) =>
        current.map((line) =>
          line.id === id ? { ...line, value: first } : line,
        ),
      )
      return
    }
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
    if (!isDesktopTrack()) {
      setLines((current) => {
        const first = current[0]
        if (!first) return [createLine(value)]
        return current.map((line, index) =>
          index === 0 ? { ...line, value } : line,
        )
      })
      return
    }
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
      if (!isDesktopTrack()) return
      event.preventDefault()
      addLineAfter(index)
      return
    }

    if (!isDesktopTrack()) return

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
    if (!isDesktopTrack()) {
      event.preventDefault()
      return
    }
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
    if (!isDesktopTrack()) {
      const first = splitTrackingPaste(text)[0]
      if (!first) return
      markPasteHandled(event)
      event.preventDefault()
      event.stopPropagation()
      schedulePlainPaste(event, id, first)
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
    if (name) {
      setCarrierHistory((current) =>
        [name, ...current.filter((item) => item !== name)].slice(0, 9),
      )
    }
    setCarrierOpen(false)
    setCarrierQuery("")
    carrierButtonRef.current?.blur()
  }

  function focusTrackField() {
    if (!isDesktopTrack()) {
      mobileInputRef.current?.focus({ preventScroll: true })
      return
    }
    const line =
      lines.find((item) => item.value.length === 0) ??
      lines.at(-1) ??
      lines[0]
    if (!line) return
    inputRefs.current[line.id]?.focus({ preventScroll: true })
  }

  function onShellPointerDown(
    event: PointerEvent<HTMLFormElement> | MouseEvent<HTMLFormElement>,
  ) {
    if (event.button !== 0) return
    const target = event.target
    if (!(target instanceof Element)) return
    if (target.closest("input, textarea, select, button, a")) return
    event.preventDefault()
    focusTrackField()
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
    <section className="track-hero relative flex w-full flex-col items-center overflow-hidden px-6 pt-12 pb-8 text-[#212121] antialiased md:py-16">
      <HeroGlobe />
      <div className="relative z-[1] flex w-full max-w-[728px] flex-col items-center gap-6">
        <img
          src="/figma/banner.webp"
          alt="17RETURNS DTC 品牌退换货售后解决方案。挽回20%+收入，7×24h自动处理，降低80%客服工作量，18%+节省逆向物流费。"
          width={1310}
          height={160}
          className="block h-auto w-full object-contain md:hidden"
        />

        <div className="flex w-full flex-col items-center gap-[10px] text-center">
          <h1 className="track-hero-title w-full font-bold text-[#212121]">
            ALL-IN-ONE GLOBAL PACKAGE TRACKING
          </h1>
          <p className="w-full text-[14px] leading-[21px] font-medium tracking-[-0.21px] text-[#5c6370] md:text-[16px] md:leading-6 md:tracking-[-0.24px]">
            Track global packages, eCommerce orders, and air cargo from 3500+
            carriers and 190+ airlines, covering China and beyond with 17TRACK.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <form
            className="track-field relative h-[262px] w-full"
            onMouseDown={onShellPointerDown}
            onPointerDown={onShellPointerDown}
            onSubmit={onTrack}
          >
            <div className="track-shell absolute inset-0 overflow-hidden rounded-[24px] border border-[rgba(148,163,184,0.28)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-[0px_4px_16px_rgba(0,0,0,0.06)] focus-within:border-[#c8cdd6] focus-within:shadow-[0px_4px_16px_rgba(0,0,0,0.06)]">
            {mobileLine ? (
              <div
                className="track-mobile-field absolute top-0 left-0 z-[1] flex h-[56px] w-[calc(100%-62px)] items-center pl-4"
                inert={desktopLayout || undefined}
                aria-hidden={desktopLayout || undefined}
              >
                <Input
                  ref={mobileInputRef}
                  value={mobileLine.value}
                  placeholder="TRACK YOUR ORDER"
                  aria-label="Tracking number"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  onChange={(event) =>
                    updateLine(
                      mobileLine.id,
                      event.target.value,
                      event.nativeEvent instanceof InputEvent
                        ? event.nativeEvent.inputType
                        : undefined,
                    )
                  }
                  onKeyDown={(event) => onLineKeyDown(event, 0)}
                  onBeforeInput={(event) =>
                    onLineBeforeInput(event, mobileLine.id)
                  }
                  onPaste={(event) => onLinePaste(event, mobileLine.id)}
                  className="track-mobile-input"
                />
              </div>
            ) : null}
            <div
              ref={listRef}
              inert={!desktopLayout || undefined}
              aria-hidden={!desktopLayout || undefined}
              className="track-desktop-list tracking-scroll h-full overflow-y-auto pt-2 pb-3"
            >
              {lines.map((line, index) => (
                <div
                  key={line.id}
                  data-tracking-line
                  className={cn(
                    "flex h-[30px] items-center px-[14px]",
                    index % 2 === 1 && "bg-black/[0.035]",
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
            </div>
            <ToolBlur />

            <div className="track-toolbar pointer-events-none absolute z-10">
              <div className="track-toolbar-bar relative flex h-full w-full items-center justify-between px-3 pt-2 pb-3">
              <div className="track-toolbar-extra pointer-events-auto flex items-center gap-2">
                {hasNumbers ? (
                  <>
                    <HoverTooltip label="Filter">
                        <Button
                          type="button"
                          variant="ghost"
                          aria-label="Filter"
                          className={cn(
                            still,
                            "tool-sheen h-12 w-12 rounded-full border-0 bg-[linear-gradient(180deg,#fff_0%,#f3f4f6_100%)] p-0 text-[#212121] backdrop-blur-xl hover:bg-white! hover:bg-[linear-gradient(180deg,#fff_0%,#fff_100%)]! hover:text-[#212121]! focus-visible:bg-white! focus-visible:bg-[linear-gradient(180deg,#fff_0%,#fff_100%)]! focus-visible:text-[#212121]! active:bg-[#e8eaee] [&_svg]:size-5",
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
                            "h-12 w-12 rounded-full border border-[#e5484d]/35 bg-[#e5484d]/20 p-0 text-[#e5484d] shadow-[inset_0_1px_3px_rgba(255,255,255,0.85),0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl hover:border-[#e5484d]/35 hover:bg-[#e5484d]/10! hover:text-[#e5484d]! focus-visible:border-[#e5484d]/35 focus-visible:bg-[#e5484d]/10! focus-visible:text-[#e5484d]! active:bg-[#e5484d]/40 [&_svg]:size-5",
                          )}
                          onClick={clearLines}
                        >
                          <Trash2 />
                        </Button>
                    </HoverTooltip>
                  </>
                ) : null}
              </div>

              <div className="track-toolbar-end pointer-events-auto flex items-center gap-3">
                <div className="track-toolbar-extra">
                <Popover
                  open={carrierOpen}
                  onOpenChange={(open) => {
                    if (open && carrierButtonRef.current) {
                      setCarrierMenuMaxHeight(
                        spaceAboveCarrierButton(carrierButtonRef.current),
                      )
                      setCarrierQuery("")
                    }
                    setCarrierOpen(open)
                  }}
                >
                  <div className="relative flex shrink-0">
                    <HoverTooltip label="Select carrier">
                        <PopoverTrigger asChild>
                          <Button
                            ref={carrierButtonRef}
                            type="button"
                            variant="ghost"
                            className={cn(
                              still,
                              "tool-sheen h-12 gap-2.5 rounded-full border-0 bg-[linear-gradient(180deg,#fff_0%,#f3f4f6_100%)] py-0 pl-1 text-[14px] leading-5 font-medium tracking-[-0.21px] text-black backdrop-blur-xl hover:bg-white! hover:bg-[linear-gradient(180deg,#fff_0%,#fff_100%)]! hover:text-black! focus-visible:bg-white! focus-visible:bg-[linear-gradient(180deg,#fff_0%,#fff_100%)]! focus-visible:text-black! aria-expanded:bg-[linear-gradient(180deg,#fff_0%,#f3f4f6_100%)] aria-expanded:text-black",
                              carrier ? "pr-12" : "pr-3",
                            )}
                          >
                            {carrier && carrierByName(carrier) ? (
                              <img
                                src={carrierByName(carrier)?.logo}
                                alt=""
                                className="size-9 shrink-0 rounded-full object-cover"
                              />
                            ) : (
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8eaee]">
                                <img src="/figma/shipment-major.svg" alt="" />
                              </span>
                            )}
                            {carrier ?? "Auto detect"}
                          </Button>
                        </PopoverTrigger>
                    </HoverTooltip>
                    {carrier ? (
                      <HoverTooltip label="Reset to Auto detect">
                        <button
                          type="button"
                          aria-label="Clear selected carrier"
                          onClick={() => selectCarrier(null)}
                          className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[#5c6370] transition-colors hover:bg-black/[0.07] hover:text-[#212121] focus-visible:bg-black/[0.07] focus-visible:text-[#212121] focus-visible:outline-none active:bg-black/[0.12] [&_svg]:size-4"
                        >
                          <X />
                        </button>
                      </HoverTooltip>
                    ) : null}
                  </div>
                  <PopoverContent
                    side="top"
                    align="end"
                    sideOffset={CARRIER_MENU_SIDE_OFFSET}
                    collisionPadding={{ top: CARRIER_MENU_TOP_CLEARANCE }}
                    className="w-[560px] max-w-[calc(100vw-24px)] gap-3 overflow-hidden p-3 shadow-[0_16px_48px_rgba(15,23,42,0.16)] duration-200 ease-out fill-mode-forwards data-closed:slide-out-to-top-2"
                    style={
                      carrierMenuMaxHeight != null && carrierMenuMaxHeight > 0
                        ? {
                            maxHeight: `min(${carrierMenuMaxHeight}px, var(--radix-popover-content-available-height, ${carrierMenuMaxHeight}px))`,
                          }
                        : {
                            maxHeight:
                              "var(--radix-popover-content-available-height)",
                          }
                    }
                    onOpenAutoFocus={(event) => {
                      event.preventDefault()
                      searchRef.current?.focus({ preventScroll: true })
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
                        const match =
                          historyCarriers[0] ??
                          popularCarriers[0] ??
                          allCarriers[0]
                        if (match) selectCarrier(match.name)
                      }}
                    />
                    {carrier && carrierByName(carrier) ? (
                      <div
                        className={cn(
                          still,
                          "flex items-center gap-2 rounded-md px-3 py-1.5 text-left text-[13px] leading-5",
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="shrink-0 text-[#5c6370]">Current item :</span>
                          <img
                            src={carrierByName(carrier)?.logo}
                            alt=""
                            className="size-5 shrink-0 rounded-[4px] object-contain"
                          />
                          <span className="truncate font-medium text-[#212121]">{carrier}</span>
                        </span>
                        <button
                          type="button"
                          className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-1 font-medium text-[#212121] hover:bg-[#f2f2f2]"
                          onClick={() => selectCarrier(null)}
                        >
                          <span className="flex size-5 items-center justify-center rounded-full bg-[#e8eaee]">
                            <img src="/figma/shipment-major.svg" alt="" className="size-3.5" />
                          </span>
                          Auto detect
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={cn(
                          still,
                          "flex items-center gap-2 rounded-md bg-[#f2f2f2] px-3 py-1.5 text-left text-[13px] leading-5",
                        )}
                        onClick={() => selectCarrier(null)}
                      >
                        <span className="text-[#5c6370]">Current item :</span>
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#e8eaee]">
                          <img src="/figma/shipment-major.svg" alt="" className="size-3.5" />
                        </span>
                        <span className="font-medium text-[#212121]">Auto detect</span>
                      </button>
                    )}
                    <div
                      className="overflow-y-auto overscroll-contain"
                      style={{ maxHeight: carrierListMaxHeight }}
                    >
                      <CarrierGroup
                        title="Search history"
                        items={historyCarriers}
                        selected={carrier}
                        onSelect={selectCarrier}
                        empty={
                          carrierQueryNormalized.length === 0
                            ? "No recent carriers"
                            : undefined
                        }
                      />
                      <CarrierGroup
                        title="Popular Carriers"
                        items={popularCarriers}
                        selected={carrier}
                        onSelect={selectCarrier}
                      />
                      <CarrierGroup
                        title="All Carriers"
                        items={allCarriers}
                        selected={carrier}
                        onSelect={selectCarrier}
                      />
                      {historyCarriers.length + popularCarriers.length + allCarriers.length === 0 ? (
                        <p className="px-2 py-2 text-[13px] text-[#5c6370]">
                          No carriers
                        </p>
                      ) : null}
                    </div>
                  </PopoverContent>
                </Popover>
                </div>

                <HoverTooltip label="Track">
                    <Button
                      type="submit"
                      variant="ghost"
                      aria-label="Track"
                      className={cn(
                        still,
                        "track-submit h-12 items-center gap-1 rounded-full border-0 bg-[#FF9916] py-0 pr-4 pl-3 text-[14px] leading-5 font-bold tracking-[-0.21px] text-white shadow-[inset_0_1px_3px_rgba(255,255,255,0.85),0_4px_12px_rgba(255,153,22,0.28)] hover:bg-[#f08c0c] hover:text-white focus-visible:bg-[#f08c0c] focus-visible:text-white",
                      )}
                    >
                      <span className="inline-flex size-6 shrink-0 items-center justify-center">
                        <img src="/figma/tracking.svg" alt="" className="shrink-0" />
                      </span>
                      <span className="track-submit-label text-[14px] leading-5 font-bold text-white">
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
          src="/figma/banner.webp"
          alt="17RETURNS DTC 品牌退换货售后解决方案。挽回20%+收入，7×24h自动处理，降低80%客服工作量，18%+节省逆向物流费。"
          width={728}
          height={90}
          className="hidden h-[90px] w-full object-cover md:block"
        />
      </div>
    </section>
  )
}
