"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { usePreferences } from "@phreshos/react-ui"

/** Content surfaces from below as it enters view, the way a shoot breaks soil. */
export default function Reveal({ children, delay = 0, className }: Readonly<{
  children: ReactNode
  delay?: number
  className?: string
}>) {
  const { animations } = usePreferences()

  return <motion.div
    className={className}
    initial={animations ? { opacity: 0, y: 28 } : false}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-12% 0px" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >{children}</motion.div>
}
