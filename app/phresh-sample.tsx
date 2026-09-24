"use client";

import { defaultAppearance } from "@phreshos/core";
import {
  Flex,
  Grid,
  Surface,
  UIProvider,
  useBrowserPreferences,
} from "@phreshos/react-ui";
import type { CSSProperties } from "react";

const benefits = [
  ["Always there", "Your programs keep running on your System, even after the browser closes."],
  ["Open anywhere", "Reach the same Desktop, software, and state from any modern browser."],
  ["Yours to shape", "Install independent Programs and choose how your environment looks and works."],
] as const;

const foundations = [
  ["One home for software", "Programs own their processes, storage, permissions, and identity."],
  ["A Desktop, not a container", "The browser presents your System; it does not keep it alive."],
  ["Clear boundaries", "Programs communicate through explicit capabilities instead of hidden shared state."],
] as const;

const themeStyle = {
  "--site-background": defaultAppearance.colors.light.background,
  "--site-foreground": defaultAppearance.colors.light.foreground,
  "--site-primary": defaultAppearance.colors.light.primary,
  "--site-radius": `${defaultAppearance.radius}px`,
  "--site-spacing": `${defaultAppearance.spacing}px`,
} as CSSProperties;

function DesktopPreview() {
  return (
    <div className="desktop-preview" aria-label="A PhreshOS Desktop with two open programs">
      <div className="preview-statusbar">
        <span className="preview-brand">
          <span className="preview-brand-mark" aria-hidden="true" />
          PhreshOS
        </span>
        <span className="preview-online">
          <span aria-hidden="true" /> System online
        </span>
      </div>

      <div className="preview-workspace">
        <article className="preview-window preview-window-main">
          <header className="preview-window-header">
            <span className="preview-app-icon preview-app-primary">N</span>
            <span>Notes</span>
            <span className="preview-window-actions" aria-hidden="true">— □ ×</span>
          </header>
          <div className="preview-note">
            <span>Today</span>
            <strong>Your work is right where you left it.</strong>
            <i className="preview-line preview-line-long" />
            <i className="preview-line" />
            <i className="preview-line preview-line-short" />
          </div>
        </article>

        <article className="preview-window preview-window-side">
          <header className="preview-window-header">
            <span className="preview-app-icon">F</span>
            <span>Files</span>
            <span className="preview-window-actions" aria-hidden="true">— □ ×</span>
          </header>
          <div className="preview-files">
            <div><span className="file-icon">▰</span><span>Projects</span><small>12 items</small></div>
            <div><span className="file-icon">▰</span><span>Documents</span><small>28 items</small></div>
            <div><span className="file-icon">▰</span><span>Shared</span><small>6 items</small></div>
          </div>
        </article>

        <div className="preview-message">
          <span className="preview-message-icon">✓</span>
          <span><strong>Everything is still here</strong><small>Synced with your System</small></span>
        </div>
      </div>

      <div className="preview-taskbar">
        <span className="preview-launcher" aria-hidden="true" />
        <span className="preview-task preview-task-active">N</span>
        <span className="preview-task">F</span>
        <span className="preview-task">T</span>
        <span className="preview-taskbar-copy">3 Programs running</span>
      </div>
    </div>
  );
}

export default function PhreshSample() {
  const browserPreferences = useBrowserPreferences();

  return (
    <UIProvider appearance={defaultAppearance} preferences={{ ...browserPreferences, theme: "light" }}>
      <main className="site" style={themeStyle}>
        <div className="ambient ambient-top" aria-hidden="true" />
        <div className="ambient ambient-middle" aria-hidden="true" />

        <nav className="navigation" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="PhreshOS home">
            <span className="wordmark-mark" aria-hidden="true" />
            PhreshOS
          </a>

          <Flex className="navigation-sections" align="center" gap="large">
            <a className="navigation-link" href="#experience">Experience</a>
            <a className="navigation-link" href="#system">How it works</a>
            <a className="navigation-link" href="#install">Install</a>
          </Flex>

          <Flex className="navigation-destinations" align="center" gap="large">
            <a className="navigation-link" href="https://docs.phreshos.com">Docs</a>
            <a className="navigation-link source-link" href="https://github.com/PhreshOS">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </Flex>
        </nav>

        <section id="top" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-light" aria-hidden="true" />
              Your system. In the browser.
            </p>
            <h1>Software, with a place to belong.</h1>
            <p className="introduction">
              PhreshOS gives your software one home on your own machine—then brings the same Desktop, programs, and state to any screen with a browser.
            </p>

            <Flex className="hero-actions" align="center" gap="medium" wrap>
              <a className="action action-primary" href="#install">
                Get PhreshOS <span aria-hidden="true">→</span>
              </a>
              <a className="action action-secondary" href="https://docs.phreshos.com">
                See how it works
              </a>
            </Flex>

            <div className="hero-details" aria-label="Product characteristics">
              <span>Open source</span>
              <span>Self-hosted</span>
              <span>Web-native</span>
            </div>
          </div>

          <div className="hero-preview">
            <DesktopPreview />
            <span className="preview-label preview-label-system">One System</span>
            <span className="preview-label preview-label-browser">Any browser</span>
          </div>
        </section>

        <section id="experience" className="section experience" aria-labelledby="experience-title">
          <div className="section-intro">
            <p className="section-label">A continuous environment</p>
            <h2 id="experience-title">Close the tab. Your world keeps running.</h2>
            <p>
              A browser window is only one view into PhreshOS. The System keeps your programs and their work alive, ready for the next screen you open.
            </p>
          </div>

          <Grid className="benefit-grid" gap="large">
            {benefits.map(([title, description], index) => (
              <article className="benefit" key={title}>
                <span className="benefit-number">0{index + 1}</span>
                <div className="benefit-mark" aria-hidden="true">
                  <span />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </Grid>
        </section>

        <section id="system" className="section system-section" aria-labelledby="system-title">
          <Surface className="system-surface" color="background:base">
            <div className="system-visual" aria-label="One PhreshOS System reached by a laptop, tablet, and phone">
              <span className="orbit orbit-outer" aria-hidden="true" />
              <span className="orbit orbit-inner" aria-hidden="true" />
              <div className="system-core">
                <span className="system-core-mark" aria-hidden="true" />
                <strong>Your System</strong>
                <small>always available</small>
              </div>
              <span className="device device-laptop">Laptop</span>
              <span className="device device-tablet">Tablet</span>
              <span className="device device-phone">Phone</span>
            </div>

            <div className="system-copy">
              <p className="section-label">One place, every screen</p>
              <h2 id="system-title">Your Desktop follows you.</h2>
              <p>
                Sign in from another browser and continue with the same environment. Your software runs in one place instead of being rebuilt around every device.
              </p>
              <a className="text-link" href="https://docs.phreshos.com/what-is-phreshos">
                Discover PhreshOS <span aria-hidden="true">→</span>
              </a>
            </div>
          </Surface>
        </section>

        <section className="section foundations" aria-labelledby="foundations-title">
          <div className="section-intro section-intro-compact">
            <p className="section-label">Made for better software</p>
            <h2 id="foundations-title">Independent programs. Shared foundations.</h2>
          </div>

          <div className="foundation-list">
            {foundations.map(([title, description], index) => (
              <article className="foundation" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <p className="developer-note">
            Building for PhreshOS? The SDKs give Client and Server code the same Program, Process, Endpoint, and Service model.
            <a href="https://docs.phreshos.com/sdks"> Explore the SDKs →</a>
          </p>
        </section>

        <section id="install" className="section install-section" aria-labelledby="install-title">
          <div className="install-copy">
            <p className="section-label">Start on your machine</p>
            <h2 id="install-title">A home for your software is one command away.</h2>
            <p>Install the System, open the Desktop address, and create the owner account. Everything else starts from there.</p>
          </div>

          <div className="installation-commands">
            <article className="installation-command">
              <header>
                <span className="terminal-controls" aria-hidden="true"><i /><i /><i /></span>
                Linux and macOS
              </header>
              <code>curl -fsSL https://install.phreshos.com/sh | bash</code>
            </article>

            <article className="installation-command">
              <header>
                <span className="terminal-controls" aria-hidden="true"><i /><i /><i /></span>
                Windows
              </header>
              <code>{'powershell -c "irm https://install.phreshos.com/ps1 | iex"'}</code>
            </article>
          </div>
        </section>

        <footer>
          <a className="wordmark" href="#top">
            <span className="wordmark-mark" aria-hidden="true" />
            PhreshOS
          </a>
          <p>Software should have a place to belong.</p>
          <Flex align="center" gap="large">
            <a href="https://docs.phreshos.com">Documentation</a>
            <a href="https://github.com/PhreshOS">Source</a>
          </Flex>
        </footer>
      </main>
    </UIProvider>
  );
}
