import type { Options } from "tsup";
import { defineConfig } from "tsup";

/**
 * Node.js Build Configuration
 *
 * This configuration generates ESM and CJS formats suitable for Node.js environments
 * and bundlers. It produces both formats from a single configuration which
 * simplifies maintenance and ensures consistency across outputs.
 */
export default defineConfig((options: Options) => {
  const isWatch = !!options.watch;

  const commonConfig = {
    clean: true, // Remove previous build files before each build
    dts: true, // Generate TypeScript declaration files (.d.ts)
    format: ["esm", "cjs"], // Generates both ESM and CJS formats simultaneously
    minify: !isWatch, // Minifies the output to reduce bundle size
    platform: "neutral", // Important: ensures compatibility with Node.js and browser
    sourcemap: true, // Generate source maps to make debugging easier
    treeshake: true, // Enables tree shaking to remove unused code and reduce bundle size
  } satisfies Options;

  return [
    {
      ...commonConfig,
      entry: ["src/browser.ts"],
      outDir: "./dist/browser",
    },
    {
      ...commonConfig,
      entry: ["src/terminal.ts"],
      outDir: "./dist/terminal",
    },
  ];
});
