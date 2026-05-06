import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Adding new challenge type enum values...");

  await sql`ALTER TYPE "type" ADD VALUE IF NOT EXISTS 'TRUE_FALSE'`;
  console.log("✓ Added TRUE_FALSE");

  await sql`ALTER TYPE "type" ADD VALUE IF NOT EXISTS 'FILL_BLANK'`;
  console.log("✓ Added FILL_BLANK");

  console.log("Migration complete.");
}

migrate().catch(console.error);
