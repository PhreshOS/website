"use client";

import { standardTheme } from "@phreshos/core";
import { Flex, Grid, Surface, ThemeProvider } from "@phreshos/react-ui";
import type { CSSProperties } from "react";

const principles = [
  ["Programs", "Complete Server and Client projects with identities of their own."],
  ["Boundaries", "Nothing crosses an endpoint unless the Program explicitly asks for it."],
  ["Desktop", "One coherent visual system without collapsing independent software."],
] as const;

const themeStyle = {
  "--site-background": standardTheme.background,
  "--site-foreground": standardTheme.foreground,
  "--site-accent": standardTheme.accent,
  "--site-radius": `${standardTheme.radius}px`,
  "--site-spacing": `${standardTheme.spacing}px`,
} as CSSProperties;

export default function PhreshSample() {
  return (
    <ThemeProvider theme={standardTheme}>
      <main className="site" style={themeStyle}>
        <div className="light light-one" />
        <div className="light light-two" />

        <nav className="navigation" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="PhreshOS home">
            <span className="wordmark-mark" aria-hidden="true" />
            PhreshOS
          </a>

          <Flex align="center" gap="large">
            <a className="navigation-link" href="https://github.com/PhreshOS/docs">
              Docs
            </a>
            <a className="navigation-link" href="https://github.com/PhreshOS">
              GitHub
            </a>
          </Flex>
        </nav>

        <section id="top" className="hero">
          <Surface className="hero-surface">
            <Flex direction="column" gap="large">
              <p className="eyebrow">A web-native operating system</p>
              <h1>Software, with a place to belong.</h1>
              <p className="introduction">
                PhreshOS gives independent Programs a coherent desktop, a local runtime,
                and explicit boundaries that remain quiet until software asks to cross them.
              </p>

              <Flex className="actions" align="center" gap="medium" wrap>
                <a className="action action-primary" href="https://github.com/PhreshOS/docs">
                  Read the docs
                </a>
                <a className="action action-secondary" href="https://github.com/PhreshOS">
                  Explore the source
                </a>
              </Flex>

              <section className="installation" aria-labelledby="installation-title">
                <div className="installation-heading">
                  <h2 id="installation-title">Start from a clean machine.</h2>
                  <p>One native command installs the runtime, CLI, and PhreshOS.</p>
                </div>

                <div className="installation-commands">
                  <article className="installation-command">
                    <span>Linux and macOS</span>
                    <code>curl -fsSL https://install.phreshos.com/sh | bash</code>
                  </article>

                  <article className="installation-command">
                    <span>Windows</span>
                    <code>{'powershell -c "irm https://install.phreshos.com/ps1 | iex"'}</code>
                  </article>
                </div>
              </section>

              <Grid className="principles" gap="medium">
                {principles.map(([title, description]) => (
                  <section className="principle" key={title}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </section>
                ))}
              </Grid>
            </Flex>
          </Surface>
        </section>

        <footer>
          <span>Built in public.</span>
          <span>PhreshOS</span>
        </footer>
      </main>
    </ThemeProvider>
  );
}
