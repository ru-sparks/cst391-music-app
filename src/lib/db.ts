import { Pool } from 'pg';

// Persist across hot reloads in dev and across warm serverless invocations
let pool: Pool | undefined;

export function getPool(): Pool {
  if (!pool) {
    const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
    if (!url) throw new Error('POSTGRES_URL (or DATABASE_URL) not set');

    pool = new Pool({
      connectionString: url,
      // TLS is required by many hosted PGs; harmless locally when undefined
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      max: 5, // small pool suits serverless
    });
  }
  return pool;
}
