import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  // A static export has no image server; images ship as they are.
  images: { unoptimized: true },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default withMDX(config);
