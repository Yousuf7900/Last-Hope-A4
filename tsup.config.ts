import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/server.ts"],
    format: ["esm"],
    target: "node20",
    outDir: "dist",
    clean: true,
    splitting: false,
    sourcemap: true,
    dts: false,
    treeshake: false,
    platform: "node",
    external: [
        "@prisma/client"
    ]
});