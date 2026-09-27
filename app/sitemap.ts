import type { MetadataRoute } from "next"
import { site } from "@/components/site/links"
import { allPosts, blogRoute } from "@/lib/blog"
import { source } from "@/lib/source"

export const dynamic = "force-static"

/** The home page, every documentation page, the blog, and every post. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...source.getPages().map(page => ({
      url: `${site.url}${page.url}`,
      lastModified: page.data.lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
    { url: `${site.url}${blogRoute}`, changeFrequency: "weekly", priority: 0.8 },
    ...allPosts().map(post => ({
      url: `${site.url}${post.url}`,
      lastModified: post.data.date,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ]
}
