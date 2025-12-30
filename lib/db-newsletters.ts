import { sql } from '@vercel/postgres';

/**
 * Newsletter/Subscribers Database Functions
 * Using Vercel Postgres
 */

interface Newsletter {
    id: string;
    email: string;
    subscribedAt: string;
    status: 'ACTIVE' | 'UNSUBSCRIBED';
}

// Check if Postgres is available
const usePostgres = process.env.POSTGRES_URL !== undefined;

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const newslettersDb = {
    async getAll(): Promise<Newsletter[]> {
        if (!usePostgres) {
            // Fallback to JSON file
            try {
                const fs = await import('fs/promises');
                const path = await import('path');
                const filePath = path.join(process.cwd(), 'data', 'subscribers.json');
                const content = await fs.readFile(filePath, 'utf-8');
                return JSON.parse(content);
            } catch {
                return [];
            }
        }

        try {
            const result = await sql<Newsletter>`
                SELECT 
                    id,
                    email,
                    subscribed_at as "subscribedAt",
                    status
                FROM newsletters
                ORDER BY subscribed_at DESC
            `;
            return result.rows;
        } catch (error) {
            console.error('Error fetching newsletters:', error);
            return [];
        }
    },

    async getByEmail(email: string): Promise<Newsletter | null> {
        if (!usePostgres) {
            const all = await this.getAll();
            return all.find(n => n.email === email) || null;
        }

        try {
            const result = await sql<Newsletter>`
                SELECT 
                    id,
                    email,
                    subscribed_at as "subscribedAt",
                    status
                FROM newsletters
                WHERE email = ${email}
            `;
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error fetching newsletter by email:', error);
            return null;
        }
    },

    async create(newsletter: Newsletter): Promise<Newsletter> {
        if (!usePostgres) {
            throw new Error('Cannot write to filesystem on Vercel. Please configure Postgres.');
        }

        try {
            await sql`
                INSERT INTO newsletters (id, email, subscribed_at, status)
                VALUES (
                    ${newsletter.id},
                    ${newsletter.email},
                    ${newsletter.subscribedAt},
                    ${newsletter.status}
                )
            `;
            return newsletter;
        } catch (error) {
            console.error('Error creating newsletter:', error);
            throw error;
        }
    },

    async update(id: string, updates: Partial<Newsletter>): Promise<Newsletter | null> {
        if (!usePostgres) {
            throw new Error('Cannot write to filesystem on Vercel. Please configure Postgres.');
        }

        try {
            const current = await this.getByEmail(updates.email || '');
            if (!current) return null;

            const updated = { ...current, ...updates };

            await sql`
                UPDATE newsletters SET
                    email = ${updated.email},
                    status = ${updated.status}
                WHERE id = ${id}
            `;

            return updated;
        } catch (error) {
            console.error('Error updating newsletter:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        if (!usePostgres) {
            throw new Error('Cannot write to filesystem on Vercel. Please configure Postgres.');
        }

        try {
            const result = await sql`DELETE FROM newsletters WHERE id = ${id}`;
            return (result.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('Error deleting newsletter:', error);
            return false;
        }
    }
};

// Export helper functions for backward compatibility
export async function getAllSubscribers(): Promise<Newsletter[]> {
    return newslettersDb.getAll();
}

export async function addSubscriber(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        const existing = await newslettersDb.getByEmail(email);
        if (existing) {
            return { success: false, error: 'Email đã được đăng ký' };
        }

        const newsletter: Newsletter = {
            id: generateId(),
            email,
            subscribedAt: new Date().toISOString(),
            status: 'ACTIVE'
        };

        await newslettersDb.create(newsletter);
        return { success: true };
    } catch (error) {
        console.error('Error adding subscriber:', error);
        return { success: false, error: 'Không thể đăng ký. Vui lòng thử lại.' };
    }
}

export async function removeSubscriber(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        const existing = await newslettersDb.getByEmail(email);
        if (!existing) {
            return { success: false, error: 'Email không tồn tại' };
        }

        await newslettersDb.delete(existing.id);
        return { success: true };
    } catch (error) {
        console.error('Error removing subscriber:', error);
        return { success: false, error: 'Không thể hủy đăng ký. Vui lòng thử lại.' };
    }
}
