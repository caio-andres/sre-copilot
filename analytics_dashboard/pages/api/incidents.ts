import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rows } = await pool.query(`
    SELECT incident_id, description, created_at, resolved_at, status
      FROM incidents
     ORDER BY created_at DESC
     LIMIT 20
  `);
  res.status(200).json(rows);
}
