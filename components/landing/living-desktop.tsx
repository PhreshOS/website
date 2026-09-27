"use client"

import { useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bot, PenTool, Terminal } from "@phreshos/react-ui/icons"
import { Button, Flex, Surface, Window, usePreferences } from "@phreshos/react-ui"

type ProgramId = "terminal" | "tilo" | "lemo"

const programs: Readonly<Record<ProgramId, Readonly<{ title: string, icon: ReactNode }>>> = {
  terminal: { title: "Terminal", icon: <Terminal size={16} /> },
  tilo: { title: "Tilo", icon: <PenTool size={16} /> },
  lemo: { title: "Lemo", icon: <Bot size={16} /> }
}

const order: readonly ProgramId[] = ["tilo", "terminal", "lemo"]

const terminalLines = [
  "$ phresh program list",
  "tilo       running   1 process",
  "lemo       running   1 process",
  "terminal   running   1 process",
  "$ phresh system status",
  "System running · up 41 days"
]

function TerminalContent() {
  const { animations } = usePreferences()
  const [visible, setVisible] = useState(animations ? 1 : terminalLines.length)

  useEffect(() => {
    if (!animations) return
    const timer = setInterval(() => setVisible(count => count >= terminalLines.length + 3 ? 1 : count + 1), 900)
    return () => clearInterval(timer)
  }, [animations])

  return <pre className="terminal-lines">
    {terminalLines.slice(0, Math.min(visible, terminalLines.length)).map((line, index) =>
      <span key={index} className={line.startsWith("$") ? "prompt" : undefined}>{line}{"\n"}</span>
    )}
    <span className="caret" />
  </pre>
}

function TiloContent() {
  return <div className="board">
    <Surface className="note" color="warning:soft" radius="small" style={{ rotate: "-3deg" }}>Launch<br /><small>Friday</small></Surface>
    <Surface className="note" color="primary:soft" radius="small" style={{ rotate: "2deg" }}>Ask Lemo to draft the notes</Surface>
    <Surface className="note" color="success:soft" radius="small" style={{ rotate: "-1deg" }}>Garden photos ✓</Surface>
    <svg className="board-ink" viewBox="0 0 200 80" aria-hidden="true">
      <path d="M8 60 C 50 10, 90 90, 140 30 S 190 40, 196 20" />
    </svg>
  </div>
}

function LemoContent() {
  return <Flex direction="column" gap="small" className="chat">
    <Surface className="bubble mine" color="primary:base" radius="large">What changed on the board today?</Surface>
    <Surface className="bubble" color="background:strong" radius="large">Three new notes on Tilo. I grouped them under <b>Launch</b> and left you a summary.</Surface>
  </Flex>
}

const contents: Readonly<Record<ProgramId, () => ReactNode>> = {
  terminal: TerminalContent,
  tilo: TiloContent,
  lemo: LemoContent
}

/**
 * A miniature Desktop built from React UI Windows, behaving as the standard
 * window manager does: minimizing hides a window while its Program keeps
 * running, and closing a window ends that Program until it is opened again.
 */
export default function LivingDesktop() {
  const [running, setRunning] = useState<readonly ProgramId[]>(order)
  const [open, setOpen] = useState<readonly ProgramId[]>(order)
  const [focused, setFocused] = useState<ProgramId>("lemo")
  const [notice, setNotice] = useState<Readonly<{ id: ProgramId, closed: boolean }> | null>(null)

  useEffect(() => {
    if (notice === null) return
    const timer = setTimeout(() => setNotice(null), 3200)
    return () => clearTimeout(timer)
  }, [notice])

  function minimize(id: ProgramId) {
    setOpen(current => current.filter(item => item !== id))
    setNotice({ id, closed: false })
  }

  function close(id: ProgramId) {
    setOpen(current => current.filter(item => item !== id))
    setRunning(current => current.filter(item => item !== id))
    setNotice({ id, closed: true })
  }

  function show(id: ProgramId) {
    setRunning(current => current.includes(id) ? current : [...current, id])
    setOpen(current => current.includes(id) ? current : [...current, id])
    setFocused(id)
    setNotice(null)
  }

  return <Surface className="desktop" radius="xlarge" material="none" color="background:soft">
    <div className="wallpaper" aria-hidden="true" />

    <AnimatePresence>
      {order.filter(id => open.includes(id)).map(id => {
        const Content = contents[id]
        return <motion.div
          key={id}
          className={`desktop-window desktop-window-${id}`}
          style={{ zIndex: focused === id ? 3 : 1 }}
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onPointerDown={() => setFocused(id)}
        >
          <Window style={{ width: "100%", height: "100%" }} material="full">
            <Window.Header active={focused === id}>
              <Window.Header.Identity title={programs[id].title} />
              <Window.Header.Center />
              <Window.Header.Actions>
                <Window.Header.Minimize onPress={() => minimize(id)} />
                <Window.Header.Close onPress={() => close(id)} />
              </Window.Header.Actions>
            </Window.Header>
            <Window.Content>
              <Content />
            </Window.Content>
          </Window>
        </motion.div>
      })}
    </AnimatePresence>

    <AnimatePresence>
      {notice && <motion.div
        key={`${notice.id}-${notice.closed}`}
        className="desktop-notice"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
      >
        <Surface material="full" radius="large">
          {notice.closed
            ? <>{programs[notice.id].title} was closed. Open it again from the taskbar.</>
            : <><span className="pulse" /> {programs[notice.id].title} is minimized and still running.</>}
        </Surface>
      </motion.div>}
    </AnimatePresence>

    <Surface className="taskbar" material="full" radius="full" style={{ position: "absolute" }}>
      {order.map(id => <Button
        key={id}
        size="small"
        radius="full"
        aria-label={running.includes(id) ? `Show ${programs[id].title}` : `Open ${programs[id].title}`}
        color={running.includes(id) ? "default:base" : "background:base"}
        onPress={() => show(id)}
      >{programs[id].icon}</Button>)}
    </Surface>
  </Surface>
}
