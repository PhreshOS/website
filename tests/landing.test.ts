import { readFile } from "node:fs/promises"
import { expect, test } from "vitest"

// These read the static export, so `build` runs first (see `verify`).
const built = (path: string) => readFile(new URL(`../out/${path}`, import.meta.url), "utf8")

test("the home page is prerendered with its content, title, and canonical address", async () => {
  const html = await built("index.html")
  expect(html).toContain("<title>PhreshOS · The operating system for web programs</title>")
  expect(html).toContain('<link rel="canonical" href="https://phreshos.com"/>')
  expect(html).toContain("The soil for your software.")
  expect(html).toContain("How it compares.")
})

test("installation shows the supported commands and no one-line installer", async () => {
  const html = await built("index.html")
  expect(html).toContain("npm install --global @phreshos/cli")
  expect(html).toContain("phresh system install")
  expect(html).not.toMatch(/curl [^<]*\| *(ba)?sh/)
})

test("every destination is a link search engines can follow", async () => {
  const html = await built("index.html")
  const links = [...html.matchAll(/<a [^>]*href="([^"]+)"/g)].map(match => match[1])
  expect(links).toContain("/docs")
  expect(links).toContain("https://github.com/PhreshOS")
  expect(links).toContain("#install")
  expect(links).toContain("/docs/what-is-phreshos")
  expect(links).toContain("/docs/first-program")
  expect(links).toContain("/docs/installation")
})

test("search engines find the sitemap, with the documentation in it", async () => {
  expect(await built("robots.txt")).toContain("Sitemap: https://phreshos.com/sitemap.xml")
  const sitemap = await built("sitemap.xml")
  expect(sitemap).toContain("<loc>https://phreshos.com</loc>")
  expect(sitemap).toContain("<loc>https://phreshos.com/docs/system/security/permissions</loc>")
})

test("the home page loads no documentation styles", async () => {
  const home = await built("index.html")
  const docs = await built("docs.html")
  const sheets = (html: string) => [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(match => match[1])
  expect(sheets(docs).length).toBeGreaterThan(0)
  for (const sheet of sheets(docs)) expect(sheets(home)).not.toContain(sheet)
})
