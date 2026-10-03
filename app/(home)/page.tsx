import type { Metadata } from "next"
import Landing from "@/components/landing/landing"
import { StructuredData, homeData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: { absolute: "PhreshOS · The self-hosted system for web apps" },
  description:
    "PhreshOS is an open-source, self-hosted system for apps built with web technology. It runs their servers, signs you in, connects them, and lets you and your AI agents use them from one desktop in the browser.",
  alternates: { canonical: "/" }
}

export default function Home() {
  return <><StructuredData data={homeData} /><Landing /></>
}
