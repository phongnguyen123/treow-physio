import { sql } from '@vercel/postgres';

/**
 * Vercel Postgres Connection Module
 * 
 * This module provides a connection to Vercel Postgres database.
 * The connection is automatically configured using environment variables
 * set by Vercel (POSTGRES_URL).
 */

export { sql };

/**
 * Helper function to check database connection
 */
export async function checkConnection(): Promise<boolean> {
    try {
        await sql`SELECT 1`;
        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        return false;
    }
}

/**
 * Helper to execute queries with error handling
 */
export async function query<T = any>(
    queryText: string,
    params: any[] = []
): Promise<T[]> {
    try {
        const result = await sql.query(queryText, params);
        return result.rows as T[];
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
}
