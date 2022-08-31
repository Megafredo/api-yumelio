import debug from 'debug';
const logger = debug('Pool');
import pg from 'pg';
const client = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
client.connect()
    .then(() => logger('DB connected'))
    .catch((err) => logger('DB connection failed', err));
export default client;
//# sourceMappingURL=database.js.map