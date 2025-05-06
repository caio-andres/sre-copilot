import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rows } = await pool.query(`
    SELECT id, incident_id, suggestion, generated_at
      FROM recommendations
     ORDER BY generated_at DESC
     LIMIT 20
  `);
  res.status(200).json(rows);
}
