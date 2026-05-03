import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { parse } from "pg-connection-string";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;


const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is missing or empty on this process. On Render: open the **web service** (not only the DB) → Environment → add DATABASE_URL (paste External Database URL from the Postgres instance, or use Link Database). Runtime does not use your local .env file.",
  );
}

const parsed = parse(databaseUrl);
// pg-connection-string uses host "base" for empty/junk input; empty host is also invalid for TCP.
if (!parsed.host || parsed.host === "base") {
  throw new Error(
    "DATABASE_URL is not a valid Postgres connection URL (host missing or placeholder). Use the full `postgresql://user:pass@host:5432/db` from Render’s Postgres **Connect** tab. If the password contains @ # : encode it in the URL.",
  );
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle(pool, { schema });
