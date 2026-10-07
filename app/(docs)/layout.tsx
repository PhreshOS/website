import { Geist, JetBrains_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { Provider } from '@/components/provider';
import Analytics from '@/components/site/analytics';
import { site } from '@/components/site/links';
import './global.css';

// The documentation's own root: Fumadocs and Tailwind styles load here and
// never reach the landing page, which has a separate root layout.

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'PhreshOS Documentation',
    template: '%s · PhreshOS',
  },
  description:
    'PhreshOS is an open-source, self-hosted system that runs and manages programs built with web technology on your own machine, with one desktop in the browser and native agent access through the same APIs.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
