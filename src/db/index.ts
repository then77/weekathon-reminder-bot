import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const databaseUrl = process.env.NEONDB_URL;

if (!databaseUrl) {
    throw new Error("NEONDB_URL environment variable is required");
}

export const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });

export * from "./schema";
