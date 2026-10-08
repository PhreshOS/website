import { readFile } from "node:fs/promises"
import { expect, test } from "vitest"

// These read the static export, so `build` runs first (see `verify`).
const built = (path: string) => readFile(new URL(`../out/${path}`, import.meta.url), "utf8")

test("the home page is prerendered with its content, title, and canonical address", async () => {
  const html = await built("index.html")
  expect(html).toContain("<title>PhreshOS · The self-hosted system for web apps</title>")
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
  expect(links).toContain("https://demo.phreshos.com")
  expect(links).toContain("https://github.com/PhreshOS")
  expect(links).toContain("#install")
  expect(links).toContain("/docs/what-is-phreshos")
})

test("search engines find the sitemap, with the documentation in it", async () => {
  expect(await built("robots.txt")).toContain("Sitemap: https://phreshos.com/sitemap.xml")
  const sitemap = await built("sitemap.xml")
  expect(sitemap).toContain("<loc>https://phreshos.com</loc>")
  expect(sitemap).toContain("<loc>https://phreshos.com/docs/system/permissions</loc>")
})

test("the home page loads no documentation styles", async () => {
  const home = await built("index.html")
  const docs = await built("docs.html")
  const sheets = (html: string) => [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(match => match[1])
  expect(sheets(docs).length).toBeGreaterThan(0)
  for (const sheet of sheets(docs)) expect(sheets(home)).not.toContain(sheet)
})

test("the home page describes PhreshOS as structured data", async () => {
  const html = await built("index.html")
  const script = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1]
  const graph = JSON.parse(script ?? "{}")["@graph"] as { "@type": string }[]
  const software = graph.find(node => node["@type"] === "SoftwareApplication") as Record<string, unknown>
  expect(software.name).toBe("PhreshOS")
  expect(software.license).toBe("https://opensource.org/licenses/MIT")
  expect(software.operatingSystem).toBe("macOS, Linux")
})

test("a documentation page is a technical article about PhreshOS", async () => {
  const html = await built("docs/what-is-phreshos.html")
  const script = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1]
  const article = JSON.parse(script ?? "{}")
  expect(article["@type"]).toBe("TechArticle")
  expect(article.about["@id"]).toBe("https://phreshos.com/#software")
})

test("the blog has a feed and lists it for readers", async () => {
  const feed = await built("blog/feed.xml")
  expect(feed).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>\n<rss version="2.0">/)
  expect(feed).toContain("<link>https://phreshos.com/blog</link>")
  const index = await built("blog.html")
  expect(index).toContain('type="application/rss+xml"')
})

test("every post describes itself as an article about PhreshOS", async () => {
  const feed = await built("blog/feed.xml")
  const posts = [...feed.matchAll(/<link>https:\/\/phreshos\.com\/blog\/(.+?)<\/link>/g)].map(match => match[1])
  for (const post of posts) {
    const html = await built(`blog/${post}.html`)
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1] ?? "{}")
    expect(data["@type"]).toBe("BlogPosting")
    expect(data.about["@id"]).toBe("https://phreshos.com/#software")
  }
})
