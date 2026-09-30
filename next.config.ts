import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A second server (a preview, a test build) sets NEXT_DIST_DIR to keep its files apart from
  // the ones `npm run dev` is using in .next; two servers sharing one folder break each other.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
