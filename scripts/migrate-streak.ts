import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Applying streak schema migration...");

  await sql`ALTER TABLE user_progress DROP COLUMN IF EXISTS hearts`;
  console.log("✓ Dropped hearts column");

  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS streak integer NOT NULL DEFAULT 0`;
  console.log("✓ Added streak column");

  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS last_activity_date date`;
  console.log("✓ Added last_activity_date column");

  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS streak_freezes integer NOT NULL DEFAULT 0`;
  console.log("✓ Added streak_freezes column");

  console.log("Migration complete.");
}

migrate().catch(console.error);
