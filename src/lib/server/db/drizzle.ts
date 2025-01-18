import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Retrieve the DATABASE_URL from environment variables
const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined in the environment variables.');
}

// Initialize PostgreSQL connection pool
const pool = new Pool({
	connectionString: DATABASE_URL
});

// Connect to the database
await pool.connect();

// Initialize Drizzle ORM
const db = drizzle(pool);

export default db;
