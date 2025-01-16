import pkg from 'pg';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '../utils/config.js';
const { Pool } = pkg;

export const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
});

