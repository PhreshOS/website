"use client"

import type { CSSProperties, ReactNode } from "react"
import { Button, Flex, Grid, Link, Snippet, Surface, Tabs, Window } from "@phreshos/react-ui"
import {
  BookOpen,
  Bot,
  Check,
  Feather,
  HardDrive,
  KeyRound,
  Layers,
  Network,
  Palette,
  PenTool,
  PlugZap,
  Server,
  ShieldCheck,
  Terminal,
  User,
  Workflow,
  Wrench
} from "@phreshos/react-ui/icons"
import { site } from "../site/links"
import LivingDesktop from "./living-desktop"
import Reveal from "./reveal"
import Roots from "./roots"

function Hero() {
  return <header className="hero" id="top">
    <Reveal>
      <p className="eyebrow">An open-source, self-hosted system for web apps</p>
    </Reveal>
    <Reveal delay={0.08}>
      <h1>The soil for your software.<br /><em>You choose what grows.</em></h1>
    </Reveal>
    <Reveal delay={0.16}>
      <p className="lede">
        PhreshOS runs apps built with web technology on a machine you control. It runs their
        servers, signs you in, connects them to each other, and opens your machine to them only as
        far as you allow. You use them from a desktop in your browser; your agents use the very
        same apps.
      </p>
    </Reveal>
    <Reveal delay={0.24}>
      <Flex gap="small" justify="center" wrap>
        <Button size="large" color="primary:base" href="#install">
          Install PhreshOS
        </Button>
        <Button size="large" href={site.demo}>
          Try the demo
        </Button>
      </Flex>
      <p className="hero-more">
        <Link color="primary" href={`${site.documentation}/what-is-phreshos`}>How it works</Link>
      </p>
    </Reveal>

    <Reveal delay={0.36} className="hero-stage">
      <LivingDesktop />
      <p className="hint">Minimize a window and its app keeps running. Close it, and the app ends.</p>
    </Reveal>
    <Roots className="hero-roots" />
  </header>
}

/** The same Terminal window as on the hero desktop, so every terminal on the page looks alike. */
function TerminalWindow({ children, style }: Readonly<{ children: ReactNode, style?: CSSProperties }>) {
  return <Window material="frosted" style={style}>
    <Window.Header>
      <Window.Header.Identity title="Terminal" />
      <Window.Header.Center />
    </Window.Header>
    <Window.Content>
      <pre className="terminal-lines">{children}</pre>
    </Window.Content>
  </Window>
}

function Agents() {
  return <section className="section split">
    <Reveal className="split-text">
      <h2 className="section-title">Built for you<br /><em>and your agents.</em></h2>
      <p className="section-lede">
        PhreshOS was designed from its core to be used by AI. Your agent connects to your System
        with your authority and uses each app through what the app offers: its services, its
        questions, its notes for agents. The same apps, the same state. Nobody works on a copy.
      </p>
    </Reveal>
    <Reveal delay={0.1}>
      <Tabs defaultValue="you" className="together">
        <Tabs.List aria-label="Who is working">
          <Tabs.Tab id="you"><User />You</Tabs.Tab>
          <Tabs.Tab id="agent"><Bot />Your agent</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="you">
          <Window material="frosted" style={{ height: 250, marginTop: 14 }}>
            <Window.Header>
              <Window.Header.Identity title="Deploys" />
              <Window.Header.Center />
            </Window.Header>
            <Window.Content>
              <div className="board board-large">
                <Surface className="note" color="warning:soft" radius="small" style={{ rotate: "-2deg" }}>Backup<br /><small>nightly</small></Surface>
                <Surface className="note" color="primary:soft" radius="small" style={{ rotate: "1.5deg" }}>Renew certificates</Surface>
                <Surface className="note" color="success:soft" radius="small" style={{ rotate: "-1deg" }}>Disk check ✓</Surface>
              </div>
            </Window.Content>
          </Window>
        </Tabs.Panel>
        <Tabs.Panel id="agent">
          <TerminalWindow style={{ height: 250, marginTop: 14 }}>
            <span className="prompt">$ phresh service ask --name deploys --event tasks.list</span>{"\n"}
            {"backup · renew certificates · disk check\n"}
            <span className="comment"># the same tasks you see on the desktop</span>
          </TerminalWindow>
        </Tabs.Panel>
      </Tabs>
    </Reveal>
  </section>
}

/** Where each window stands on the plane of 5 × 5 views, as the Map shows it. */
const plane: readonly Readonly<{ view: number, icon: ReactNode, label: string, focused?: boolean }>[] = [
  { view: 12, icon: <PenTool />, label: "Trellis", focused: true },
  { view: 12, icon: <Terminal />, label: "Terminal" },
  { view: 13, icon: <HardDrive />, label: "Files" },
  { view: 7, icon: <Server />, label: "Deploys" },
  { view: 4, icon: <Bot />, label: "Your agent's work" }
]

function Plane() {
  return <Surface className="plane" radius="xlarge" material="frosted" role="img" aria-label="The Map: 25 views, the current one in the middle, windows in some of them">
    {Array.from({ length: 25 }, (_, view) => <div key={view} className={view === 12 ? "plane-view current" : "plane-view"}>
      {plane.filter(window => window.view === view).map(window => <span key={window.label} className={window.focused ? "plane-window focused" : "plane-window"} title={window.label}>{window.icon}</span>)}
    </div>)}
  </Surface>
}

function Room() {
  return <section className="section split reverse">
    <Reveal className="split-text">
      <h2 className="section-title">Room to spread out.</h2>
      <p className="section-lede">
        Windows live on a plane of 5 × 5 views. The Map in the taskbar shows every window where it
        is: drag the view anywhere, jump to a window, carry windows between views, or hold one at
        the edge of the screen to take it along. Keep each piece of work in its own place, and
        give your agent a view of its own.
      </p>
    </Reveal>
    <Reveal delay={0.1}>
      <Plane />
    </Reveal>
  </section>
}

function Shape() {
  return <section className="section split">
    <Reveal className="split-text">
      <h2 className="section-title">The desktop<br /><em>is grown too.</em></h2>
      <p className="section-lede">
        The taskbar, the start menu, and the wallpaper form a shell, and an app can take the
        shell’s place through the same System every other app uses. Appearances set the colors,
        materials, corners, and motion of the desktop and of its apps at once.
      </p>
    </Reveal>
    <Reveal delay={0.1}>
      <Grid columns="repeat(auto-fit, minmax(min(100%, 14rem), 1fr))" gap="medium" className="uses">
        {[
          [<Layers key="icon" />, "A shell of your own", "Replace the taskbar, the start menu, or the wallpaper with an app."],
          [<Palette key="icon" />, "Appearances", "One choice restyles the desktop and every app built with React UI."]
        ].map(([icon, title, body]) => <Surface key={title as string} className="use" radius="large">
          <span className="principle-icon">{icon}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </Surface>)}
      </Grid>
    </Reveal>
  </section>
}

type Nutrient = Readonly<{ icon: ReactNode, title: string, body: string }>

const soil: readonly Nutrient[] = [
  { icon: <Feather />, title: "Servers", body: "Each app's server runs as a process the System manages, often as a worker inside its own, so many apps share one small machine." },
  { icon: <KeyRound />, title: "Sign-in", body: "One owner, signed in once. Apps never handle passwords." },
  { icon: <Network />, title: "Communication", body: "Each window talks to its own server, and apps reach each other through named services." },
  { icon: <HardDrive />, title: "Storage", body: "Files, key-value data, and SQLite, reachable from an app's window directly." },
  { icon: <ShieldCheck />, title: "Permissions", body: "An app asks; you decide what it may reach in the System." },
  { icon: <PlugZap />, title: "Your machine", body: "Controlled access to the host underneath: its files, its network, its commands." }
]

function Soil() {
  return <section className="section">
    <Reveal>
      <h2 className="section-title">Every app gets<br /><em>the same soil.</em></h2>
      <p className="section-lede">
        A small web tool used to mean the same groundwork every time: sign-in, WebSockets, ports, a
        server to keep alive. The System does that groundwork once, the same way for every app, so
        an app brings only its own logic. Small enough to build with an agent in one sitting.
      </p>
    </Reveal>
    <Grid columns="repeat(auto-fit, minmax(min(100%, 18rem), 1fr))" gap="large" className="principles">
      {soil.map((nutrient, index) => <Reveal key={nutrient.title} delay={index * 0.05}>
        <Surface className="use" radius="large">
          <span className="principle-icon">{nutrient.icon}</span>
          <h3>{nutrient.title}</h3>
          <p>{nutrient.body}</p>
        </Surface>
      </Reveal>)}
    </Grid>
  </section>
}

function Growth() {
  return <section className="section split reverse">
    <Reveal className="split-text">
      <h2 className="section-title">What grows<br /><em>is up to you.</em></h2>
      <p className="section-lede">
        PhreshOS is neutral: the apps you install decide what your System becomes. Each of them can
        be used by your agents, and can use the others.
      </p>
      <p className="section-note">
        Servers run on your machine, not in a browser tab. Work that must carry on after you close
        the browser lives in an app’s server; the desktop is how you look in on it.
      </p>
    </Reveal>
    <Reveal delay={0.1}>
      <Grid columns="repeat(auto-fit, minmax(min(100%, 12rem), 1fr))" gap="medium" className="uses">
        {[
          [<Wrench key="icon" />, "Everyday tools", "The small tools you rent one subscription at a time, kept on your own machine."],
          [<Server key="icon" />, "Servers", "Sites, services, and databases, each run by an app of its own."],
          [<Workflow key="icon" />, "Automation", "Workflows on a schedule or an event, at work or around the house."],
          [<PlugZap key="icon" />, "Your own", "Anything a web app can do, with the System behind it."]
        ].map(([icon, title, body]) => <Surface key={title as string} className="use" radius="large">
          <span className="principle-icon">{icon}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </Surface>)}
      </Grid>
    </Reveal>
  </section>
}

type Mark = "yes" | "no" | "soon" | string

const products = ["PhreshOS", "Olares", "Puter", "Umbrel", "Sandstorm", "Vulos"] as const

// One mark per product, in the order of `products`.
type Marks = readonly [Mark, Mark, Mark, Mark, Mark, Mark]

// "no" means the feature was not found in the project's public documentation.
const comparison: readonly Readonly<{ feature: string, marks: Marks }>[] = [
  { feature: "A desktop with windows in the browser", marks: ["yes", "yes", "yes", "no", "no", "yes"] },
  { feature: "An app's interface and server start and stop on their own", marks: ["yes", "no", "no", "no", "yes", "yes"] },
  { feature: "Apps can replace the desktop itself: wallpaper, taskbar, shell", marks: ["yes", "no", "no", "no", "no", "no"] },
  { feature: "Apps reach the system itself: other apps, windows, sessions", marks: ["yes", "Other apps' declared APIs", "Files, launching and messaging apps", "no", "Other documents, when shared", "no"] },
  { feature: "A UI toolkit so apps look like part of the system", marks: ["yes", "no", "System dialogs", "no", "no", "no"] },
  { feature: "AI agents use each app's own features", marks: ["yes", "Manage apps", "Files and hosting", "Manage apps", "no", "no"] },
  { feature: "Build and install apps from inside the system", marks: ["yes", "Through Studio", "Web apps", "no", "no", "no"] },
  { feature: "The owner grants each app's permissions", marks: ["yes", "Declared in the manifest", "yes", "Folder access", "yes", "Declared in the manifest"] },
  { feature: "Apps run isolated", marks: ["Optional sandbox", "Per container", "Own folder and storage", "Per container", "Per document", "Per namespace"] },
  { feature: "Installs without administrator access", marks: ["yes", "no", "yes", "Full OS", "With -u", "Full OS"] },
  { feature: "The system shares GPUs between apps", marks: ["no", "yes", "no", "Passed through to apps", "no", "For app streaming"] },
  { feature: "Several machines as one system", marks: ["no", "yes", "no", "no", "no", "no"] },
  { feature: "Several user accounts", marks: ["One owner", "yes", "yes", "Since umbrelOS 2.0", "yes", "yes"] },
  { feature: "An app store", marks: ["soon", "yes", "yes", "yes", "yes", "yes"] },
  { feature: "Source license", marks: ["MIT", "AGPL-3.0", "AGPL-3.0", "PolyForm Noncommercial", "Apache-2.0", "MIT or Apache-2.0"] }
]

function MarkCell({ mark }: Readonly<{ mark: Mark }>) {
  if (mark === "yes") return <td className="mark-yes"><Check aria-label="Yes" /></td>
  if (mark === "no") return <td className="mark-no" aria-label="No">—</td>
  if (mark === "soon") return <td className="mark-soon">Coming soon</td>
  return <td className="mark-note">{mark}</td>
}

function Comparison() {
  return <section className="section">
    <Reveal>
      <h2 className="section-title">How it compares.</h2>
      <p className="section-lede">PhreshOS is about the system underneath: how apps run, reach each other, and shape the desktop. An honest map, not a scoreboard; some of these projects do things PhreshOS does not set out to do.</p>
    </Reveal>
    <Reveal delay={0.1}>
      <Surface className="comparison" radius="xlarge" material="frosted">
        <div className="comparison-scroll">
        <table>
          <thead>
            <tr><th scope="col"><span className="visually-hidden">Feature</span></th>{products.map(product => <th key={product} scope="col">{product}</th>)}</tr>
          </thead>
          <tbody>
            {comparison.map(row => <tr key={row.feature}>
              <th scope="row">{row.feature}</th>
              {row.marks.map((mark, index) => <MarkCell key={products[index]} mark={mark} />)}
            </tr>)}
          </tbody>
        </table>
        </div>
      </Surface>
      <p className="footnote">Compared from each project’s public documentation, September 2026. A dash means we found no such feature documented.</p>
    </Reveal>
  </section>
}

function Developers() {
  return <section className="section split">
    <Reveal className="split-text">
      <h2 className="section-title">Grow your own.</h2>
      <p className="section-lede">
        An app is a web project with a window and a server. Build it with the tools you already
        know; the SDKs connect it to the System, and React UI gives it the look of the desktop.
      </p>
      <Flex gap="small" wrap className="split-actions">
        <Button href={site.documentation}><BookOpen />Your first app</Button>
      </Flex>
    </Reveal>
    <Reveal delay={0.1}>
      <TerminalWindow>
        <span className="prompt">$ phresh create my-app</span>{"\n"}
        <span className="comment"># a window and a server, ready to run</span>{"\n"}
        <span className="prompt">$ phresh dev</span>{"\n"}
        <span className="comment"># runs it in your System while you edit</span>{"\n\n"}
        {"import { context } from \"@phreshos/client\"\n\n"}
        {"const tasks = await context.server.ask(\"tasks.list\")\n"}
      </TerminalWindow>
    </Reveal>
  </section>
}

function Store() {
  return <section className="section store">
    <Reveal>
      <p className="eyebrow"><span className="pulse" /> Coming soon</p>
      <h2 className="section-title">A garden of apps,<br /><em>on its way.</em></h2>
      <p className="section-lede">A store of official apps, each installed in one step.</p>
    </Reveal>
  </section>
}

const managers = {
  npm: "npm install --global @phreshos/cli",
  pnpm: "pnpm add --global @phreshos/cli",
  bun: "bun add --global @phreshos/cli",
  yarn: "yarn global add @phreshos/cli"
} as const

function Install() {
  return <section className="section install" id="install">
    <Roots seed={23} className="install-roots" />
    <Reveal>
      <h2 className="section-title">Plant it.</h2>
      <p className="section-lede">Install the <code>phresh</code> command, then the System. You need Node.js 24.15 or newer.</p>
    </Reveal>
    <Reveal delay={0.1}>
      <Surface className="install-card" material="frosted" radius="xlarge">
        <ol className="steps">
          <li>
            <span>Install the command</span>
            <Tabs defaultValue="npm" size="small">
              <Tabs.List aria-label="Package manager">
                {(Object.keys(managers) as (keyof typeof managers)[]).map(key => <Tabs.Tab key={key} id={key}>{key}</Tabs.Tab>)}
              </Tabs.List>
              {(Object.keys(managers) as (keyof typeof managers)[]).map(key => <Tabs.Panel key={key} id={key}>
                <Snippet code copyLabel="Copy command" className="command">{managers[key]}</Snippet>
              </Tabs.Panel>)}
            </Tabs>
          </li>
          <li>
            <span>Install and start the System</span>
            <Snippet code copyLabel="Copy command" className="command">phresh system install</Snippet>
          </li>
          <li>
            <span>Open the desktop address it prints, usually <code>http://localhost:4300</code>, and create the owner account.</span>
          </li>
        </ol>
      </Surface>
    </Reveal>
    <Reveal delay={0.2}>
      <Flex justify="center" gap="small" wrap>
        <Button href={`${site.documentation}/installation`}><BookOpen />Installation guide</Button>
      </Flex>
    </Reveal>
  </section>
}

/** The home page: what PhreshOS is, how it compares, and how to install it. */
export default function Landing() {
  return <>
    <Hero />
    <Soil />
    <Agents />
    <Room />
    <Shape />
    <Growth />
    <Comparison />
    <Developers />
    <Store />
    <Install />
  </>
}
