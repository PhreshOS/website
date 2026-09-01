# PhreshOS Website

The public presentation website for PhreshOS.

The site introduces PhreshOS and directs people to the product,
documentation, source repositories, and installation paths. It uses the
published React UI package so its visual language remains aligned with PhreshOS
without importing another repository's source.

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

Verify the source and production export:

```sh
bun run lint
bun run types:check
bun run build
```

The static site is emitted to `out/`.

## Deployment

```sh
bun run deploy
```

Cloudflare Workers serves the static export produced by Next.js.

## Repository boundary

This repository owns the public presentation website and its deployment. The
documentation repository owns technical documentation, while product contracts
and runtime behavior remain in their respective repositories.

## License

Licensed under the [MIT License](LICENSE). Copyright © 2026 Zohayr SLILEH.
