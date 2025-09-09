// pages/api/db-check.ts
import pool from '@/lib/db';

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ time: result.rows[0], message: 'Sparks Database connection successful' });
  } catch (err) {
    console.error('DB query failed', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
}