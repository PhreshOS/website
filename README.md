# PhreshOS Website

The public presentation website for PhreshOS.

[Website](https://phreshos.com) ·
[Documentation](https://docs.phreshos.com) ·
[Source](https://github.com/PhreshOS/website)

## Role

The website introduces PhreshOS and directs people to its documentation,
installation, and source repositories. It consumes published packages and does
not define product contracts, technical documentation, or runtime behavior.

## Development

```sh
bun install --frozen-lockfile
bun run lint
bun run check
bun run build
bun run dev
```

The static site is emitted to `out/`.

## Deployment

```sh
bun run deploy
```

Cloudflare Workers serves the static export produced by Next.js.

`check` performs static checks, `build` creates distributable output, and `test`
runs Vitest assertions from `tests/`. Run `build` before testing built artifacts.
`verify` runs `check`, `build`, and `test` in order. Operational tooling belongs
in `scripts/`; tests and their fixtures belong in `tests/`. Verification uses
the committed dependency graph without local package substitutions.

## Related repositories

- [PhreshOS Documentation](https://github.com/PhreshOS/docs) owns all technical
  documentation linked by the website.
- [PhreshOS Install](https://github.com/PhreshOS/install) owns the clean-machine
  installation endpoint presented by the website.
- [PhreshOS System](https://github.com/PhreshOS/system) owns the product runtime
  represented by the website.
- [`@phreshos/react-ui`](https://github.com/PhreshOS/react-ui) provides the
  published visual primitives used by the site.

## License

Licensed under the [MIT License](LICENSE). Copyright © 2026 Zohayr SLILEH.
