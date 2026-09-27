import type { Metadata, Viewport } from "next"
import { Fraunces, Geist, Geist_Mono } from "next/font/google"
import SiteShell from "@/components/site/site-shell"
import { site } from "@/components/site/links"
import { phreshosDescription as description } from "@/components/structured-data"
import "./site.css"

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] })
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] })
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"]
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "PhreshOS", template: "%s · PhreshOS" },
  description,
  applicationName: "PhreshOS",
  openGraph: { type: "website", siteName: "PhreshOS", url: "/", title: "PhreshOS", description },
  twitter: { card: "summary", title: "PhreshOS", description }
}

// The site opens light whatever the browser prefers; the visitor can switch.
export const viewport: Viewport = { themeColor: "#fbf8f4" }

/**
 * The landing page's own root, and later the blog's. It shares one navigation,
 * footer, and look built with React UI; Fumadocs and Tailwind styles belong to
 * the documentation's separate root and never load here.
 */
export default function HomeLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
    <body>
      <SiteShell>{children}</SiteShell>
    </body>
  </html>
}
