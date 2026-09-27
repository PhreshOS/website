import type { MetadataRoute } from "next"
import { site } from "@/components/site/links"
import { source } from "@/lib/source"

export const dynamic = "force-static"

/** The home page and every documentation page. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...source.getPages().map(page => ({
      url: `${site.url}${page.url}`,
      lastModified: page.data.lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ]
}
