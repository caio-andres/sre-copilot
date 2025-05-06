import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rows } = await pool.query(
    "SELECT id, name, value, calculated_at FROM metrics ORDER BY calculated_at DESC"
  );
  res.status(200).json(rows);
}
