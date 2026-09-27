import { site } from "@/components/site/links"
import { allPosts, blogRoute } from "@/lib/blog"

export const dynamic = "force-static"

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

/** An RSS feed of every post, for readers and for tools that follow new writing. */
export function GET() {
  const items = allPosts().map(post => `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${site.url}${post.url}</link>
      <guid>${site.url}${post.url}</guid>
      <description>${escape(post.data.description)}</description>
      <pubDate>${new Date(`${post.data.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`).join("\n")

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>PhreshOS Blog</title>
    <link>${site.url}${blogRoute}</link>
    <description>Writing about PhreshOS: what it is for, how it works, and how it compares.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`, { headers: { "content-type": "application/rss+xml; charset=utf-8" } })
}
