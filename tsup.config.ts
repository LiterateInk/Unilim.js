import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/biome/index.ts",
    "src/cas/index.ts",
    "src/iut/signatures/index.ts",
    "src/iut/info/edt/index.ts"
  ],

  outDir: "dist",
  format: ["cjs", "esm"],

  treeshake: true,
  splitting: false,

  sourcemap: true,
  minify: "terser",
  clean: true,
  dts: true
});
