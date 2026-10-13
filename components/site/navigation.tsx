"use client"

import Image from "next/image"
import Link from "next/link"
import { Button, DropdownMenu, Flex, Menu, type Theme } from "@phreshos/react-ui"
import { BookOpen, Menu as MenuIcon, Moon, Newspaper, Sun } from "@phreshos/react-ui/icons"
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
      {/* Side by side where there is room; in a narrow screen they wait in a menu, beside the theme. */}
      <Flex align="center" gap="small" className="navigation-links">
        <Button size="small" color="background:base" shadow={false} href={site.documentation}><BookOpen />Docs</Button>
        <Button size="small" color="background:base" shadow={false} href={site.blog}><Newspaper />Blog</Button>
        <Button size="small" color="background:base" shadow={false} href={site.source}><GitHubIcon />GitHub</Button>
      </Flex>
      <Button size="small" color="background:base" shadow={false} iconOnly aria-label="Switch theme" onPress={onTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
      <div className="navigation-menu">
        <DropdownMenu>
          <DropdownMenu.Trigger size="small" color="background:base" shadow={false} iconOnly aria-label="Menu"><MenuIcon /></DropdownMenu.Trigger>
          <DropdownMenu.Content placement="bottom end">
            <Menu aria-label="Pages">
              <Menu.Item id="docs" href={site.documentation} textValue="Docs"><BookOpen />Docs</Menu.Item>
              <Menu.Item id="blog" href={site.blog} textValue="Blog"><Newspaper />Blog</Menu.Item>
              <Menu.Item id="github" href={site.source} textValue="GitHub"><GitHubIcon />GitHub</Menu.Item>
            </Menu>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </Flex>
  </nav>
}
