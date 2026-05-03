import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Keep false so Render/CI DATABASE_URL is not replaced by a local .env file.
config({ override: false });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
