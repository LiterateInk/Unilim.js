import { defineConfig } from "bunup";

export default defineConfig({
  clean: true,
  dts: {
    inferTypes: true
  },
  entry: [
    "src/biome/index.ts",
    "src/cas/index.ts",
    "src/iut/cs/timetable/index.ts",
    "src/iut/signatures/index.ts"
  ],
  format: ["cjs", "esm"],
  minify: true,
  outDir: "dist",
  splitting: false,
  target: "browser"
});
