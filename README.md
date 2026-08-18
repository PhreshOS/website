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

The production build is emitted to `out/` and can be served by any static host.
