// scripts/build.mjs
import { build } from "esbuild";
import { glob, rm } from "node:fs/promises";

const entries = [];

for await (const file of glob("functions/**/*.ts")) {
    entries.push(file);
}

await rm("api", { recursive: true, force: true });

await build({
    entryPoints: entries,
    outdir: "api",
    outbase: "functions",

    bundle: true,
    minify: true,
    sourcemap: true,

    platform: "node",
    format: "esm",
    target: "node22",

    tsconfig: "tsconfig.json",
    packages: "external",
});
