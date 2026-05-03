import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { parse } from "pg-connection-string";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Render/production: use only the platform env (Render dashboard / linked DB).
// Loading .env here can mask misconfiguration; dev uses .env via this or --env-file.
if (process.env.NODE_ENV !== "production") {
  config({ override: false });
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const parsed = parse(databaseUrl);
if (parsed.host === "base") {
  throw new Error(
    'DATABASE_URL parses to host "base" (invalid). Fix the URL on this Render **web** service (Environment → DATABASE_URL), or URL-encode special characters in the password (@ # : etc.). Copy External Database URL from the Postgres instance.',
  );
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle(pool, { schema });
