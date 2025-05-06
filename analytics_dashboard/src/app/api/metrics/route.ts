export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function GET() {
  const { rows } = await pool.query(
    "SELECT id, name, value, calculated_at FROM metrics ORDER BY calculated_at DESC"
  );
  return NextResponse.json(rows);
}
