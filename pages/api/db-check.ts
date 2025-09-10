// // pages/api/db-check.ts
// import pool from '@/lib/db';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.status(200).json({ time: result.rows[0], message: 'Sparks Database connection successful' });
//   } catch (err) {
//     console.error('DB query failed', err);
//     res.status(500).json({ error: 'Database connection failed' });
//   }
// }

// pages/api/db-check.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPool } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = getPool();
    const { rows } = await db.query('select now() as now');
    res.status(200).json({ time: rows[0], message: 'Sparks Database connection successful' });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
