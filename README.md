# PhreshOS Website

The public presentation website for PhreshOS. It is a statically exported
Next.js application that uses the published `@phreshos/react-ui` package for
the same Theme, material, and layout language as PhreshOS Programs.

## Development

```sh
bun install
bun run dev
```

Verify the project before committing:

```sh
bun run lint
bun run types:check
bun run build
```

The production build is emitted to `out/` and deployed as assets by an
assets-only Cloudflare Worker:

```sh
bun run build
bun run deploy
```

Workers Builds uses `bun run build` as its build command and `bun run deploy`
as its deploy command. Set the build variable `BUN_VERSION` to `1.3.14`.
