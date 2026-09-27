"use client"

import Image from "next/image"
import Link from "next/link"
import { Button, Flex, type Theme } from "@phreshos/react-ui"
import { BookOpen, Moon, Newspaper, Sun } from "@phreshos/react-ui/icons"
import { widerButton } from "./button-style"
import { GitHubIcon } from "./github-icon"
import { site } from "./links"
import logo from "./logo.png"

export default function Navigation({ theme, onTheme }: Readonly<{ theme: Theme, onTheme: () => void }>) {
  return <nav className="navigation" aria-label="Primary navigation">
    <Link className="brand" href="/">
      <Image src={logo} alt="" width={28} height={28} priority />
      <span>PhreshOS</span>
    </Link>
    <Flex align="center" gap="small">
      <Button size="small" color="background:base" shadow={false} style={widerButton} href={site.documentation}><BookOpen />Docs</Button>
      <Button size="small" color="background:base" shadow={false} style={widerButton} href={site.blog}><Newspaper />Blog</Button>
      <Button size="small" color="background:base" shadow={false} style={widerButton} href={site.source}><GitHubIcon />GitHub</Button>
      <Button size="small" color="background:base" shadow={false} aria-label="Switch theme" style={widerButton} onPress={onTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
    </Flex>
  </nav>
}
