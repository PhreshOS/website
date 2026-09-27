"use client"

import { useRouter } from "next/navigation"
import { useState, type CSSProperties, type ReactNode } from "react"
import { UIProvider, useAppearance, useBrowserPreferences, useThemedValue, type Theme } from "@phreshos/react-ui"
import Footer from "./footer"
import Navigation from "./navigation"

/** Page tokens come from the active Appearance so the site speaks the System's own colors. */
function usePalette(): CSSProperties {
  const colors = useThemedValue(useAppearance().colors)

  return {
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--peach": colors.primary,
    "--primary": colors.primary,
    "--root": colors.info,
    "--seed": colors.success
  } as CSSProperties
}

function Page({ theme, onTheme, children }: Readonly<{ theme: Theme, onTheme: () => void, children: ReactNode }>) {
  return <div className="page" style={usePalette()}>
    <Navigation theme={theme} onTheme={onTheme} />
    <main>{children}</main>
    <Footer />
  </div>
}

/**
 * Every page of the site renders inside the same React UI the System uses, so
 * the site looks like the desktop it describes. It opens light, because the
 * prerendered page cannot know the browser's theme and would otherwise flash
 * from light to dark; the visitor can switch. Links inside the site use
 * Next's router.
 */
export default function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter()
  const browser = useBrowserPreferences()
  const [theme, setTheme] = useState<Theme>("light")

  return <UIProvider preferences={{ ...browser, theme }} navigate={href => router.push(href)}>
    <Page theme={theme} onTheme={() => setTheme(theme === "dark" ? "light" : "dark")}>{children}</Page>
  </UIProvider>
}
