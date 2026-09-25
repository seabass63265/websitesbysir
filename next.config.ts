import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — there is an unrelated lockfile in a parent directory.
  turbopack: {
    root: import.meta.dirname,
    // threepipe's package.json "browser" field points at a UMD bundle that
    // Turbopack turns into an empty module; the ESM build is the one to use.
    resolveAlias: {
      threepipe: "./node_modules/threepipe/dist/index.mjs",
    },
  },
};

export default nextConfig;
