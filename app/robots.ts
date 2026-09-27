import type { MetadataRoute } from "next"
import { site } from "@/components/site/links"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` }
}
