export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function GET() {
  const { rows } = await pool.query(
    `SELECT id, incident_id, suggestion, generated_at
       FROM recommendations
      ORDER BY generated_at DESC
      LIMIT 20`
  );
  return NextResponse.json(rows);
}
