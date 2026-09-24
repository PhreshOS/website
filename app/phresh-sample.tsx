"use client";

import { defaultAppearance } from "@phreshos/core";
import { Flex, Surface, UIProvider, useBrowserPreferences } from "@phreshos/react-ui";
import type { CSSProperties, ReactNode } from "react";

const themeStyle = {
  "--site-background": defaultAppearance.colors.dark.background,
  "--site-foreground": defaultAppearance.colors.dark.foreground,
  "--site-primary": defaultAppearance.colors.dark.primary,
  "--site-secondary": defaultAppearance.colors.dark.secondary,
  "--site-success": defaultAppearance.colors.dark.success,
  "--site-radius": `${defaultAppearance.radius}px`,
} as CSSProperties;

const programs = [
  { name: "Flambo", role: "Browser", state: "running", color: "primary" },
  { name: "Notes", role: "Workspace", state: "ready", color: "secondary" },
  { name: "Terminal", role: "Tools", state: "idle", color: "success" },
] as const;

function Mark() {
  return <span className="mark" aria-hidden="true"><i /><i /></span>;
}

function Dot({ tone = "primary" }: Readonly<{ tone?: "primary" | "secondary" | "success" }>) {
  return <span className={`dot dot-${tone}`} aria-hidden="true" />;
}

function MaterialLink({ children, className, href }: Readonly<{ children: ReactNode; className?: string; href: string }>) {
  return <Surface as="a" className={className} href={href} material="extended" color="primary:base" radius="medium" shadow={false}>{children}</Surface>;
}

function ContinuityField() {
  return <div className="continuity-field" aria-label="One PhreshOS System continuing across three browsers">
    <span className="signal signal-left" aria-hidden="true" />
    <span className="signal signal-right" aria-hidden="true" />
    <div className="device-state device-state-left">
      <span className="device-outline device-laptop" aria-hidden="true"><i /></span>
      <div><small>Office browser</small><strong>Closed</strong></div>
    </div>
    <Surface className="system-node" material="full" color="background:base" radius="large">
      <span className="system-orbit orbit-one" aria-hidden="true" />
      <span className="system-orbit orbit-two" aria-hidden="true" />
      <Mark />
      <strong>System</strong>
      <span className="system-state"><Dot tone="success" /> stays online</span>
    </Surface>
    <div className="device-state device-state-right">
      <span className="device-outline device-tablet" aria-hidden="true"><i /></span>
      <div><small>Home browser</small><strong>Continue</strong></div>
    </div>
  </div>;
}

function ProgramStream() {
  return <div className="program-stream" aria-label="Programs running inside one PhreshOS System">
    <div className="stream-caption"><span>System / Programs</span><span>03 available</span></div>
    {programs.map((program, index) => <div className="program-row" key={program.name}>
      <span className="program-index">0{index + 1}</span>
      <Dot tone={program.color} />
      <strong>{program.name}</strong>
      <span>{program.role}</span>
      <small>{program.state}</small>
    </div>)}
  </div>;
}

export default function PhreshSample() {
  const browserPreferences = useBrowserPreferences();
  return <UIProvider appearance={defaultAppearance} preferences={{ ...browserPreferences, theme: "dark" }}>
    <main className="site" id="top" style={themeStyle}>
      <div className="site-glow" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="PhreshOS home"><Mark /><span>PhreshOS</span></a>
        <span className="topbar-state"><Dot tone="success" /> System available</span>
        <nav aria-label="Primary navigation">
          <a href="#continuity">Experience</a>
          <a href="#programs">Programs</a>
          <a href="#install">Install</a>
          <a href="https://docs.phreshos.com">Docs</a>
          <a href="https://github.com/PhreshOS">GitHub ↗</a>
        </nav>
      </header>

      <section className="opening" aria-labelledby="opening-title">
        <div className="opening-index" aria-hidden="true">01 / YOUR SYSTEM</div>
        <div className="opening-copy">
          <p className="kicker"><Dot /> PhreshOS is a place for software</p>
          <h1 id="opening-title">Your computer<br />can be<br /><em>somewhere else.</em></h1>
          <p className="opening-description">Your browser is a way in—not the place your work lives. PhreshOS keeps your Desktop and programs together on your own System, ready whenever you return.</p>
          <Flex className="opening-actions" gap="medium" wrap>
            <MaterialLink className="material-link material-link-primary" href="#install">Create your System <span>↘</span></MaterialLink>
            <a className="quiet-link" href="https://docs.phreshos.com/what-is-phreshos">Understand the idea <span>→</span></a>
          </Flex>
        </div>
        <ContinuityField />
        <div className="scroll-note"><span aria-hidden="true" /> Follow the session</div>
      </section>

      <section className="handoff" id="continuity" aria-labelledby="handoff-title">
        <div className="section-code">02 / CONTINUITY</div>
        <div className="handoff-heading">
          <p>Nothing to move. Nothing to rebuild.</p>
          <h2 id="handoff-title">Close here.<br /><span>Continue there.</span></h2>
        </div>
        <div className="session-route">
          <div className="route-device"><span className="route-time">09:42</span><span className="route-screen" aria-hidden="true"><i /><i /></span><strong>Leave the office</strong><small>The browser closes.</small></div>
          <div className="route-transit" aria-hidden="true"><span /><i>Session remains</i><span /></div>
          <Surface className="route-system" material="full" color="background:base" radius="large"><Mark /><span><strong>3 programs</strong><small>still running</small></span></Surface>
          <div className="route-transit" aria-hidden="true"><span /><i>Same state</i><span /></div>
          <div className="route-device"><span className="route-time">19:18</span><span className="route-screen route-screen-small" aria-hidden="true"><i /><i /></span><strong>Open at home</strong><small>The work is already there.</small></div>
        </div>
      </section>

      <section className="programs" id="programs" aria-labelledby="programs-title">
        <div className="section-code">03 / PROGRAMS</div>
        <div className="programs-copy">
          <p className="kicker"><Dot tone="secondary" /> Software with a real home</p>
          <h2 id="programs-title">Programs do more than fill a window.</h2>
          <p>Every Program has its own identity, processes, storage, and permissions. It can keep working on the System while its interface comes and goes.</p>
          <a className="quiet-link" href="https://docs.phreshos.com/programs">How Programs work <span>→</span></a>
        </div>
        <Surface className="programs-surface" material="full" color="background:base" radius="large">
          <ProgramStream />
          <div className="program-boundary"><span>One clear boundary</span><p>Interface</p><i /><p>Processes</p><i /><p>Storage</p><i /><p>Permissions</p></div>
        </Surface>
      </section>

      <section className="ownership" aria-labelledby="ownership-title">
        <div className="section-code">04 / OWNERSHIP</div>
        <p className="ownership-lead">The cloud should not own the room your software lives in.</p>
        <h2 id="ownership-title"><span>Your machine.</span><span>Your software.</span><span>Your rules.</span></h2>
        <div className="ownership-notes">
          <p><strong>Self-hosted</strong><span>The System runs where you choose.</span></p>
          <p><strong>Open source</strong><span>The contracts and implementation are visible.</span></p>
          <p><strong>Web-native</strong><span>Every modern browser becomes a way in.</span></p>
        </div>
      </section>

      <section className="install" id="install" aria-labelledby="install-title">
        <div className="install-heading"><span className="section-code">05 / BEGIN</span><h2 id="install-title">Make a place.</h2><p>Install PhreshOS on your machine, then open your System from the browser.</p></div>
        <div className="command-stack">
          <Surface className="command" material="extended" color="background:base" radius="medium"><header><span><i /><i /><i /></span>Linux and macOS</header><code>curl -fsSL https://install.phreshos.com/sh | bash</code></Surface>
          <Surface className="command" material="extended" color="background:base" radius="medium"><header><span><i /><i /><i /></span>Windows</header><code>{'powershell -c "irm https://install.phreshos.com/ps1 | iex"'}</code></Surface>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><Mark /><span>PhreshOS</span></a>
        <p>A place for software to belong.</p>
        <Flex gap="large"><a href="https://docs.phreshos.com">Documentation</a><a href="https://github.com/PhreshOS">Source</a></Flex>
      </footer>
    </main>
  </UIProvider>;
}
