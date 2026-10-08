import { site } from "@/components/site/links"

/** What PhreshOS is, in the words every page and profile uses for it. */
export const phreshosDescription =
  "An open-source, self-hosted system for apps built with web technology, used by you and your AI agents from one desktop in the browser."

const website = { "@type": "WebSite", "@id": `${site.url}/#website`, name: "PhreshOS", url: site.url }

/** The home page describes the software itself: what it is, where it runs, and that it is free and MIT licensed. */
export const homeData = {
  "@context": "https://schema.org",
  "@graph": [
    website,
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#software`,
      name: "PhreshOS",
      description: phreshosDescription,
      url: site.url,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS, Linux",
      softwareRequirements: "Node.js 24.15.0 or newer",
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      sameAs: [site.source]
    }
  ]
}

/** A documentation page is a technical article about PhreshOS. */
export function docsPageData(page: Readonly<{ title: string, description?: string, url: string, lastModified?: Date }>) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    url: `${site.url}${page.url}`,
    dateModified: page.lastModified?.toISOString(),
    about: { "@id": `${site.url}/#software` },
    isPartOf: website
  }
}

/** A blog post is an article about PhreshOS, by its author. */
export function blogPostData(post: Readonly<{ title: string, description: string, url: string, date: string, author: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${site.url}${post.url}`,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    about: { "@id": `${site.url}/#software` },
    isPartOf: website
  }
}

/** JSON-LD in the page itself, read by search engines and AI crawlers without running any script. */
export function StructuredData({ data }: Readonly<{ data: object }>) {
  // `<` is escaped so no value can close the script element.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
}
