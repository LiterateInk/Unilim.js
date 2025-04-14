import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,

  dts: true,
  entry: [
    "src/biome/index.ts",
    "src/cas/index.ts",
    "src/iut/signatures/index.ts",
    "src/iut/info/edt/index.ts"
  ],

  format: ["cjs", "esm"],
  minify: "terser",

  outDir: "dist",
  sourcemap: true,
  splitting: false,
  treeshake: true
});
