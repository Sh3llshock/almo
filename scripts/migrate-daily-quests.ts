import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Applying daily quests schema migration...");

  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS daily_quest_date date`;
  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS daily_xp_earned integer NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS daily_quizzes_completed integer NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS daily_xp_quest_claimed boolean NOT NULL DEFAULT false`;
  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS daily_quiz_quest_claimed boolean NOT NULL DEFAULT false`;

  console.log("✓ Daily quest columns added");
  console.log("Migration complete.");
}

migrate().catch(console.error);
