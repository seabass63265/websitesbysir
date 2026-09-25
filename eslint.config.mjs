import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone reference projects, not part of the site.
    "reference/**",
    "app/components/threepipe-device-mockup-codrops-master/**",
    "app/components/cinematic-scroll-animations-main/**",
  ]),
]);

export default eslintConfig;
