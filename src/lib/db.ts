import { Pool } from 'pg';

// Optional: Validate the env var exists
const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error('POSTGRES_URL is not defined in environment variables');
}

const pool = new Pool({ connectionString });

pool.connect()
  .then(() => console.log('DB connection success'))
  .catch((err) => console.error('DB connection failure', err));

  export default pool;
