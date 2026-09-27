"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { useAppearance, usePreferences, useThemedValue } from "@phreshos/react-ui"
import { seeded } from "./seeded"

type RootNode = { x: number, y: number, parent: number, born: number, width: number }

type Route = Readonly<{ points: readonly (readonly [number, number])[], total: number }>

type Network = Readonly<{
  nodes: readonly RootNode[]
  /** The growth step of the youngest node. */
  last: number
  seeds: readonly number[]
  routes: readonly Route[]
}>

const growthDuration = 4200
const sapSpeed = 90

/**
 * Grows a root network by space colonization: scattered points in the soil
 * attract the nearest root tip until a root reaches them. Roots therefore
 * spread to fill the soil and never cross. The same seed and size always yield
 * the same shape.
 */
function grow(seed: number, width: number, height: number): Network {
  const random = seeded(seed)
  const origin = [width / 2, 0] as const
  const step = 7
  const influence = 110
  const reached = 14

  type Attractor = { x: number, y: number, closest: number, distance: number }
  let attractors: Attractor[] = []
  // Density follows the area, with a floor so narrow screens still get a network.
  const count = Math.min(900, Math.max(180, Math.round((width * height) / 1500)))
  while (attractors.length < count) {
    // A fan below the origin, denser near it.
    const angle = Math.PI * (0.03 + 0.94 * random())
    const reach = Math.pow(random(), 0.8)
    const x = origin[0] + Math.cos(angle) * reach * width * 0.55
    const y = 10 + Math.sin(angle) * reach * height * 0.95
    if (x >= 0 && x <= width) attractors.push({ x, y, closest: -1, distance: Infinity })
  }

  const grown: RootNode[] = [{ x: origin[0], y: origin[1], parent: -1, born: 0, width: 0 }]
  let fresh = [0]
  let born = 0

  while (attractors.length > 0 && born < 400) {
    for (const attractor of attractors) {
      for (const index of fresh) {
        const node = grown[index]!
        const distance = Math.hypot(attractor.x - node.x, attractor.y - node.y)
        if (distance < attractor.distance) {
          attractor.distance = distance
          attractor.closest = index
        }
      }
    }
    attractors = attractors.filter(attractor => attractor.distance > reached)
    if (attractors.length === 0) break

    // Tips grow toward the points within reach, or toward all remaining points
    // when none are, so the far soil is still found.
    const near = attractors.filter(attractor => attractor.distance < influence)
    const pulls = new Map<number, [number, number]>()
    for (const attractor of near.length > 0 ? near : attractors) {
      const node = grown[attractor.closest]!
      const pull = pulls.get(attractor.closest) ?? [0, 0]
      pull[0] += (attractor.x - node.x) / attractor.distance
      pull[1] += (attractor.y - node.y) / attractor.distance
      pulls.set(attractor.closest, pull)
    }

    born++
    fresh = []
    for (const [index, [px, py]] of pulls) {
      const node = grown[index]!
      const length = Math.hypot(px, py) || 1
      // Roots lean downward, like a tendency rather than a rule, and wander a little.
      const angle = Math.atan2(py / length + 0.25, px / length) + (random() - 0.5) * 0.4
      fresh.push(grown.length)
      grown.push({ x: node.x + Math.cos(angle) * step, y: node.y + Math.sin(angle) * step, parent: index, born, width: 0 })
    }
  }

  const nodes = prune(grown, 6)

  // Children always come after their parent, so one backward pass counts the
  // tips each node feeds. A root is as thick as the tips it feeds.
  const tips = new Array<number>(nodes.length).fill(0)
  const onlyChild = new Array<number>(nodes.length).fill(-1)
  const childCount = new Array<number>(nodes.length).fill(0)
  for (let index = nodes.length - 1; index > 0; index--) {
    const parent = nodes[index]!.parent
    if (tips[index] === 0) tips[index] = 1
    tips[parent]! += tips[index]!
    childCount[parent]!++
    onlyChild[parent] = index
  }
  for (let index = 0; index < nodes.length; index++) {
    nodes[index]!.width = Math.min(4.5, 0.55 + 0.32 * Math.pow(tips[index]!, 0.45))
  }

  // Straight steps become gentle curves.
  for (let pass = 0; pass < 2; pass++) {
    for (let index = 1; index < nodes.length; index++) {
      if (childCount[index] !== 1) continue
      const node = nodes[index]!
      const parent = nodes[node.parent]!
      const child = nodes[onlyChild[index]!]!
      node.x = (parent.x + 2 * node.x + child.x) / 4
      node.y = (parent.y + 2 * node.y + child.y) / 4
    }
  }

  // Seeds sit on well-spaced tips in the deeper soil; sap flows to each of them.
  const leaves = nodes.flatMap((node, index) => childCount[index] === 0 && node.y > height * 0.3 ? [index] : [])
  for (let index = leaves.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1))
    ;[leaves[index], leaves[other]] = [leaves[other]!, leaves[index]!]
  }
  const seeds: number[] = []
  for (const leaf of leaves) {
    if (seeds.length === 7) break
    const node = nodes[leaf]!
    if (seeds.every(other => Math.hypot(nodes[other]!.x - node.x, nodes[other]!.y - node.y) > 120)) seeds.push(leaf)
  }

  const routes = seeds.slice(0, 5).map(leaf => {
    const points: [number, number][] = []
    for (let index = leaf; index >= 0; index = nodes[index]!.parent) points.unshift([nodes[index]!.x, nodes[index]!.y])
    let total = 0
    for (let index = 1; index < points.length; index++) {
      total += Math.hypot(points[index]![0] - points[index - 1]![0], points[index]![1] - points[index - 1]![1])
    }
    return { points, total }
  })

  return { nodes, last: born, seeds, routes }
}

/**
 * Removes side shoots shorter than the given number of steps. A point in the
 * soil close to a root makes it sprout a stub that reads as a tick, not a root.
 */
function prune(nodes: readonly RootNode[], shortest: number): RootNode[] {
  const childCount = new Array<number>(nodes.length).fill(0)
  for (let index = 1; index < nodes.length; index++) childCount[nodes[index]!.parent]!++

  const removed = new Array<boolean>(nodes.length).fill(false)
  for (let leaf = 1; leaf < nodes.length; leaf++) {
    if (childCount[leaf] !== 0) continue
    const shoot: number[] = []
    let index = leaf
    while (index > 0 && childCount[index]! <= 1 && shoot.length < shortest) {
      shoot.push(index)
      index = nodes[index]!.parent
    }
    if (shoot.length < shortest && index > 0) for (const part of shoot) removed[part] = true
  }

  const kept: RootNode[] = []
  const moved = new Array<number>(nodes.length).fill(-1)
  nodes.forEach((node, index) => {
    if (removed[index]) return
    moved[index] = kept.length
    kept.push({ ...node, parent: node.parent < 0 ? -1 : moved[node.parent]! })
  })
  return kept
}

/** The point a given distance along a route. */
function along(route: Route, distance: number): readonly [number, number] {
  let remaining = distance
  for (let index = 1; index < route.points.length; index++) {
    const [ax, ay] = route.points[index - 1]!
    const [bx, by] = route.points[index]!
    const length = Math.hypot(bx - ax, by - ay)
    if (remaining <= length) {
      const fraction = length === 0 ? 0 : remaining / length
      return [ax + (bx - ax) * fraction, ay + (by - ay) * fraction]
    }
    remaining -= length
  }
  return route.points[route.points.length - 1]!
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

export type RootsProps = Readonly<{
  seed?: number
  className?: string
  style?: CSSProperties
}>

/** The System drawn as a living root network beneath everything it keeps alive. */
export default function Roots({ seed = 7, className, style }: RootsProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { animations } = usePreferences()
  const colors = useThemedValue(useAppearance().colors)
  const palette = useRef({ root: colors.info, seed: colors.success })
  const repaint = useRef(() => {})

  useEffect(() => {
    palette.current = { root: colors.info, seed: colors.success }
    repaint.current()
  }, [colors.info, colors.success])

  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext("2d")
    if (!element || !context) return

    // Strokes are drawn once into a layer at full opacity, then composited, so
    // overlapping joints never darken. The composited result is kept as the base.
    const layer = document.createElement("canvas")
    const base = document.createElement("canvas")
    const layerContext = layer.getContext("2d")!
    const baseContext = base.getContext("2d")!
    const blurs = "filter" in CanvasRenderingContext2D.prototype

    let network: Network | null = null
    let width = 0
    let height = 0
    let ratio = 1
    let started: number | null = animations ? null : -Infinity
    let grown: number | null = animations ? null : -Infinity
    let baseReady = false
    let visible = false
    let frame = 0

    function paintBase(limit: number) {
      const { nodes } = network!
      layerContext.setTransform(ratio, 0, 0, ratio, 0, 0)
      layerContext.clearRect(0, 0, width, height)
      layerContext.strokeStyle = palette.current.root
      layerContext.lineCap = "round"
      layerContext.lineJoin = "round"

      const strokes = new Map<number, Path2D>()
      for (let index = 1; index < nodes.length; index++) {
        const node = nodes[index]!
        const fraction = clamp(limit - (node.born - 1))
        if (fraction === 0) continue
        const parent = nodes[node.parent]!
        const key = Math.round(node.width * 4) / 4
        const path = strokes.get(key) ?? new Path2D()
        path.moveTo(parent.x, parent.y)
        path.lineTo(parent.x + (node.x - parent.x) * fraction, parent.y + (node.y - parent.y) * fraction)
        strokes.set(key, path)
      }
      for (const [lineWidth, path] of strokes) {
        layerContext.lineWidth = lineWidth
        layerContext.stroke(path)
      }

      baseContext.setTransform(1, 0, 0, 1, 0, 0)
      baseContext.clearRect(0, 0, base.width, base.height)
      if (blurs) {
        baseContext.filter = `blur(${3 * ratio}px)`
        baseContext.globalAlpha = 0.55
        baseContext.drawImage(layer, 0, 0)
        baseContext.filter = "none"
      }
      baseContext.globalAlpha = 0.75
      baseContext.drawImage(layer, 0, 0)
      baseContext.globalAlpha = 1
    }

    function draw(now: number) {
      if (!network) return
      const progress = started === null ? 0 : clamp((now - started) / growthDuration)
      if (progress < 1 || !baseReady) {
        paintBase((1 - (1 - progress) ** 2) * network.last)
        baseReady = progress === 1
        if (progress === 1 && grown === null) grown = now
      }

      context!.setTransform(1, 0, 0, 1, 0, 0)
      context!.clearRect(0, 0, element!.width, element!.height)
      context!.drawImage(base, 0, 0)
      context!.setTransform(ratio, 0, 0, ratio, 0, 0)
      if (grown === null) return

      const time = animations ? (now - grown) / 1000 : Infinity
      context!.fillStyle = palette.current.seed
      network.seeds.forEach((leaf, index) => {
        const bloom = animations ? clamp((time - index * 0.15) / 1.2) : 1
        if (bloom === 0) return
        const node = network!.nodes[leaf]!
        context!.globalAlpha = animations ? bloom * (0.725 + 0.275 * Math.cos((2 * Math.PI * Math.max(0, time - 1.2)) / 3.6)) : 1
        context!.beginPath()
        context!.arc(node.x, node.y, 3.5 * (1 - (1 - bloom) ** 2), 0, Math.PI * 2)
        context!.fill()
      })
      context!.globalAlpha = 1
      if (!animations) return

      context!.shadowColor = palette.current.root
      context!.shadowBlur = 10
      network.routes.forEach((route, index) => {
        const travel = route.total / sapSpeed
        const local = (time - 1 - index * 0.9) % (travel + 2.5)
        if (local < 0 || local > travel) return
        const distance = local * sapSpeed
        const [x, y] = along(route, distance)
        context!.globalAlpha = clamp(Math.min(distance, route.total - distance) / 40)
        context!.fillStyle = palette.current.root
        context!.beginPath()
        context!.arc(x, y, 2.4, 0, Math.PI * 2)
        context!.fill()
      })
      context!.shadowBlur = 0
      context!.globalAlpha = 1
    }

    function tick(now: number) {
      draw(now)
      frame = visible ? requestAnimationFrame(tick) : 0
    }

    function refresh() {
      if (frame === 0) draw(performance.now())
    }

    repaint.current = () => {
      baseReady = false
      refresh()
    }

    const resizing = new ResizeObserver(() => {
      const nextWidth = element.clientWidth
      const nextHeight = element.clientHeight
      const nextRatio = Math.min(2, window.devicePixelRatio || 1)
      if (nextWidth === width && nextHeight === height && nextRatio === ratio) return
      width = nextWidth
      height = nextHeight
      ratio = nextRatio
      for (const target of [element, layer, base]) {
        target.width = Math.round(width * ratio)
        target.height = Math.round(height * ratio)
      }
      network = width > 0 && height > 0 ? grow(seed, width, height) : null
      baseReady = false
      refresh()
    })
    resizing.observe(element)

    const watching = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false
      if (visible && started === null) started = performance.now()
      if (visible && animations && frame === 0) frame = requestAnimationFrame(tick)
    })
    watching.observe(element)

    return () => {
      resizing.disconnect()
      watching.disconnect()
      cancelAnimationFrame(frame)
      repaint.current = () => {}
    }
  }, [seed, animations])

  return <canvas ref={canvas} className={["roots", className].filter(Boolean).join(" ")} style={style} aria-hidden="true" />
}
