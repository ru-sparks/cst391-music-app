// pages/api/test-db.ts
import pool from '@/lib/db';

export default async function handler(req, res) {
  const result = await pool.query('SELECT NOW()');
  res.status(200).json({ time: result.rows[0] });
} 