export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function GET() {
  const { rows } = await pool.query(
    `SELECT incident_id, description, created_at, resolved_at, status
       FROM incidents
      ORDER BY created_at DESC
      LIMIT 20`
  );
  return NextResponse.json(rows);
}
