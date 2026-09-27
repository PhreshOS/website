# PhreshOS Website

The PhreshOS website: the home page and the documentation, in one Next.js
static export.

[Website](https://phreshos.com) ·
[Documentation](https://phreshos.com/docs) ·
[Source](https://github.com/PhreshOS)

## Structure

The site grows by path, not by subdomain. Each part has its own root layout,
so one part's styles never reach another:

- `app/(home)/` is the home page, and later the blog at `/blog`. It is built
  with `@phreshos/react-ui`, so the site looks like the desktop it describes.
  The shell (navigation, footer, provider) lives in `components/site/`, the
  page sections in `components/landing/`.
- `app/(docs)/` is the documentation at `/docs`, built with Fumadocs. Pages are
  MDX in `content/docs/`; component showcases live in `components/showcase/`.
- `app/llms.txt`, `app/llms-full.txt`, and `app/llms.mdx/` serve the
  documentation to agents; `app/og/` renders page images; `app/sitemap.ts`
  lists the home page and every documentation page.

## Development

```sh
bun install --frozen-lockfile
bun run dev
bun run verify
```

`check` performs static checks, `build` emits the static site to `out/`, and
`test` runs Vitest assertions from `tests/`, some of which read the built
output. `verify` runs `check`, `build`, and `test` in order.

## Deployment

```sh
bun run deploy
```

Cloudflare Workers serves the static export.

## License

Licensed under the [MIT License](LICENSE). Copyright © 2026 Zohayr SLILEH.
