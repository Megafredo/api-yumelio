//~ Import Debug
import debug from 'debug';
const logger = debug('Pool');

//~ Import pg
import { Pool } from 'pg';
// Deployement
// const client = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }
// });
const client = new Pool();

client
  .connect()
  .then(() => logger('\x1b[1;32m DB connected\x1b[0m'))
  .catch((err) => logger('\x1b[1;31m DB connection failed\x1b[0m', err));

export default client;
