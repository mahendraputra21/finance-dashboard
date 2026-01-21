import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schema/index';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
}

// Create postgres connection
const queryClient = postgres(process.env.DATABASE_URL);

// Create drizzle instance
export const db = drizzle(queryClient, { schema });

export type DbClient = typeof db;
