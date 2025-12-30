import { sql } from '@vercel/postgres';
import { Post, Booking, Author } from '@/types';

// Check if running on Vercel or if Postgres is available
const usePostgres = process.env.POSTGRES_URL !== undefined;

/**
 * New Postgres-based database layer
 * Falls back to JSON files if Postgres is not available (local dev)
 */

// Import old JSON-based db as fallback
import * as jsonDb from './db-json';

// Helper to generate IDs
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Posts database functions
export const postsDb = {
    async getAll(): Promise<Post[]> {
        if (!usePostgres) return jsonDb.postsDb.getAll();

        try {
            const result = await sql<Post>`
                SELECT 
                    id,
                    title,
                    slug,
                    excerpt,
                    content,
                    image,
                    category,
                    author_id as "authorId",
                    read_time as "readTime",
                    published,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM posts
                ORDER BY created_at DESC
            `;
            return result.rows;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    },

    async getById(id: string): Promise<Post | null> {
        if (!usePostgres) return jsonDb.postsDb.getById(id);

        try {
            const result = await sql<Post>`
                SELECT 
                    id,
                    title,
                    slug,
                    excerpt,
                    content,
                    image,
                    category,
                    author_id as "authorId",
                    read_time as "readTime",
                    published,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM posts
                WHERE id = ${id}
            `;
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    },

    async getBySlug(slug: string): Promise<Post | null> {
        if (!usePostgres) return jsonDb.postsDb.getBySlug(slug);

        try {
            const result = await sql<Post>`
                SELECT 
                    id,
                    title,
                    slug,
                    excerpt,
                    content,
                    image,
                    category,
                    author_id as "authorId",
                    read_time as "readTime",
                    published,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM posts
                WHERE slug = ${slug}
            `;
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error fetching post by slug:', error);
            return null;
        }
    },

    async create(post: Post): Promise<Post> {
        if (!usePostgres) return jsonDb.postsDb.create(post);

        try {
            await sql`
                INSERT INTO posts (
                    id, title, slug, excerpt, content, image, category, 
                    author_id, read_time, published, created_at, updated_at
                )
                VALUES (
                    ${post.id},
                    ${post.title},
                    ${post.slug},
                    ${post.excerpt || null},
                    ${post.content},
                    ${post.image || null},
                    ${post.category || null},
                    ${post.authorId || null},
                    ${post.readTime || null},
                    ${post.published !== false},
                    ${post.createdAt},
                    ${post.updatedAt}
                )
            `;
            return post;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    async update(id: string, updates: Partial<Post>): Promise<Post | null> {
        if (!usePostgres) return jsonDb.postsDb.update(id, updates);

        try {
            const current = await this.getById(id);
            if (!current) return null;

            const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };

            await sql`
                UPDATE posts SET
                    title = ${updated.title},
                    slug = ${updated.slug},
                    excerpt = ${updated.excerpt || null},
                    content = ${updated.content},
                    image = ${updated.image || null},
                    category = ${updated.category || null},
                    author_id = ${updated.authorId || null},
                    read_time = ${updated.readTime || null},
                    published = ${updated.published !== false},
                    updated_at = ${updated.updatedAt}
                WHERE id = ${id}
            `;

            return updated;
        } catch (error) {
            console.error('Error updating post:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        if (!usePostgres) return jsonDb.postsDb.delete(id);

        try {
            const result = await sql`DELETE FROM posts WHERE id = ${id}`;
            return (result.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('Error deleting post:', error);
            return false;
        }
    }
};

// Bookings database functions
export const bookingsDb = {
    async getAll(): Promise<Booking[]> {
        if (!usePostgres) return jsonDb.bookingsDb.getAll();

        try {
            const result = await sql<Booking>`
                SELECT 
                    id,
                    full_name as "fullName",
                    phone,
                    email,
                    service,
                    date,
                    time,
                    notes,
                    status,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM bookings
                ORDER BY created_at DESC
            `;
            return result.rows;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            return [];
        }
    },

    async getById(id: string): Promise<Booking | null> {
        if (!usePostgres) return jsonDb.bookingsDb.getById(id);

        try {
            const result = await sql<Booking>`
                SELECT 
                    id,
                    full_name as "fullName",
                    phone,
                    email,
                    service,
                    date,
                    time,
                    notes,
                    status,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM bookings
                WHERE id = ${id}
            `;
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error fetching booking:', error);
            return null;
        }
    },

    async create(booking: Booking): Promise<Booking> {
        if (!usePostgres) return jsonDb.bookingsDb.create(booking);

        try {
            await sql`
                INSERT INTO bookings (
                    id, full_name, phone, email, service, date, time, 
                    notes, status, created_at, updated_at
                )
                VALUES (
                    ${booking.id},
                    ${booking.fullName},
                    ${booking.phone},
                    ${booking.email || null},
                    ${booking.service},
                    ${booking.date},
                    ${booking.time},
                    ${booking.notes || null},
                    ${booking.status},
                    ${booking.createdAt},
                    ${booking.updatedAt}
                )
            `;
            return booking;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    },

    async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
        if (!usePostgres) return jsonDb.bookingsDb.update(id, updates);

        try {
            const current = await this.getById(id);
            if (!current) return null;

            const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };

            await sql`
                UPDATE bookings SET
                    full_name = ${updated.fullName},
                    phone = ${updated.phone},
                    email = ${updated.email || null},
                    service = ${updated.service},
                    date = ${updated.date},
                    time = ${updated.time},
                    notes = ${updated.notes || null},
                    status = ${updated.status},
                    updated_at = ${updated.updatedAt}
                WHERE id = ${id}
            `;

            return updated;
        } catch (error) {
            console.error('Error updating booking:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        if (!usePostgres) return jsonDb.bookingsDb.delete(id);

        try {
            const result = await sql`DELETE FROM bookings WHERE id = ${id}`;
            return (result.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('Error deleting booking:', error);
            return false;
        }
    }
};

// Authors database functions
export const authorsDb = {
    async getAll(): Promise<Author[]> {
        if (!usePostgres) return jsonDb.authorsDb.getAll();

        try {
            const result = await sql<Author>`
                SELECT 
                    id,
                    name,
                    slug,
                    title,
                    bio,
                    avatar,
                    email,
                    social_links as "socialLinks",
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM authors
                ORDER BY created_at DESC
            `;
            return result.rows;
        } catch (error) {
            console.error('Error fetching authors:', error);
            return [];
        }
    },

    async getById(id: string): Promise<Author | null> {
        if (!usePostgres) return jsonDb.authorsDb.getById(id);

        try {
            const result = await sql<Author>`
                SELECT 
                    id,
                    name,
                    slug,
                    title,
                    bio,
                    avatar,
                    email,
                    social_links as "socialLinks",
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM authors
                WHERE id = ${id}
            `;
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error fetching author:', error);
            return null;
        }
    },

    async getBySlug(slug: string): Promise<Author | null> {
        if (!usePostgres) return jsonDb.authorsDb.getBySlug(slug);

        try {
            const result = await sql<Author>`
                SELECT 
                    id,
                    name,
                    slug,
                    title,
                    bio,
                    avatar,
                    email,
                    social_links as "socialLinks",
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM authors
                WHERE slug = ${slug}
            `;
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error fetching author by slug:', error);
            return null;
        }
    },

    async create(author: Author): Promise<Author> {
        if (!usePostgres) return jsonDb.authorsDb.create(author);

        try {
            await sql`
                INSERT INTO authors (
                    id, name, slug, title, bio, avatar, email, 
                    social_links, created_at, updated_at
                )
                VALUES (
                    ${author.id},
                    ${author.name},
                    ${author.slug},
                    ${author.title || null},
                    ${author.bio || null},
                    ${author.avatar || null},
                    ${author.email || null},
                    ${JSON.stringify(author.socialLinks || {})},
                    ${author.createdAt},
                    ${author.updatedAt}
                )
            `;
            return author;
        } catch (error) {
            console.error('Error creating author:', error);
            throw error;
        }
    },

    async update(id: string, updates: Partial<Author>): Promise<Author | null> {
        if (!usePostgres) return jsonDb.authorsDb.update(id, updates);

        try {
            const current = await this.getById(id);
            if (!current) return null;

            const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };

            await sql`
                UPDATE authors SET
                    name = ${updated.name},
                    slug = ${updated.slug},
                    title = ${updated.title || null},
                    bio = ${updated.bio || null},
                    avatar = ${updated.avatar || null},
                    email = ${updated.email || null},
                    social_links = ${JSON.stringify(updated.socialLinks || {})},
                    updated_at = ${updated.updatedAt}
                WHERE id = ${id}
            `;

            return updated;
        } catch (error) {
            console.error('Error updating author:', error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        if (!usePostgres) return jsonDb.authorsDb.delete(id);

        try {
            const result = await sql`DELETE FROM authors WHERE id = ${id}`;
            return (result.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('Error deleting author:', error);
            return false;
        }
    }
};
