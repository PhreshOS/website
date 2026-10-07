import Script from "next/script"

/**
 * Counts page views with Umami, served from stats.phreshos.com: no cookies and nothing that names a
 * visitor. It counts only on phreshos.com, so local and preview builds stay out of the numbers.
 */
export default function Analytics() {
  return <Script
    src="https://stats.phreshos.com/script.js"
    data-website-id="61db60d2-2176-4e28-a538-a3cd28390d50"
    data-domains="phreshos.com"
    strategy="afterInteractive"
  />
}
