import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.NEONDB_URL;

if (!databaseUrl) {
    throw new Error("NEONDB_URL environment variable is required");
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: databaseUrl,
    },
});
