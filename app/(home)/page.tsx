import type { Metadata } from "next"
import Landing from "@/components/landing/landing"

export const metadata: Metadata = {
  title: { absolute: "PhreshOS · The operating system for web programs" },
  description:
    "PhreshOS is an open-source operating system for programs built with web technology. It runs their servers, signs you in, connects them, and lets you and your AI agents use them from one desktop in the browser.",
  alternates: { canonical: "/" }
}

export default function Home() {
  return <Landing />
}
