import fs from 'fs/promises';
import path from 'path';
import { Post, Booking, Author } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const AUTHORS_FILE = path.join(DATA_DIR, 'authors.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Generic read function
async function readData<T>(filePath: string): Promise<T[]> {
    try {
        await ensureDataDir();
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

// Generic write function
async function writeData<T>(filePath: string, data: T[]): Promise<void> {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Posts database functions
export const postsDb = {
    async getAll(): Promise<Post[]> {
        return readData<Post>(POSTS_FILE);
    },

    async getById(id: string): Promise<Post | null> {
        const posts = await this.getAll();
        return posts.find(p => p.id === id) || null;
    },

    async getBySlug(slug: string): Promise<Post | null> {
        const posts = await this.getAll();
        return posts.find(p => p.slug === slug) || null;
    },

    async create(post: Post): Promise<Post> {
        const posts = await this.getAll();
        posts.push(post);
        await writeData(POSTS_FILE, posts);
        return post;
    },

    async update(id: string, updates: Partial<Post>): Promise<Post | null> {
        const posts = await this.getAll();
        const index = posts.findIndex(p => p.id === id);

        if (index === -1) return null;

        posts[index] = { ...posts[index], ...updates, updatedAt: new Date().toISOString() };
        await writeData(POSTS_FILE, posts);
        return posts[index];
    },

    async delete(id: string): Promise<boolean> {
        const posts = await this.getAll();
        const filtered = posts.filter(p => p.id !== id);

        if (filtered.length === posts.length) return false;

        await writeData(POSTS_FILE, filtered);
        return true;
    }
};

// Bookings database functions
export const bookingsDb = {
    async getAll(): Promise<Booking[]> {
        return readData<Booking>(BOOKINGS_FILE);
    },

    async getById(id: string): Promise<Booking | null> {
        const bookings = await this.getAll();
        return bookings.find(b => b.id === id) || null;
    },

    async create(booking: Booking): Promise<Booking> {
        const bookings = await this.getAll();
        bookings.push(booking);
        await writeData(BOOKINGS_FILE, bookings);
        return booking;
    },

    async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
        const bookings = await this.getAll();
        const index = bookings.findIndex(b => b.id === id);

        if (index === -1) return null;

        bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date().toISOString() };
        await writeData(BOOKINGS_FILE, bookings);
        return bookings[index];
    },

    async delete(id: string): Promise<boolean> {
        const bookings = await this.getAll();
        const filtered = bookings.filter(b => b.id !== id);

        if (filtered.length === bookings.length) return false;

        await writeData(BOOKINGS_FILE, filtered);
        return true;
    }
};

// Authors database functions
export const authorsDb = {
    async getAll(): Promise<Author[]> {
        return readData<Author>(AUTHORS_FILE);
    },

    async getById(id: string): Promise<Author | null> {
        const authors = await this.getAll();
        return authors.find(a => a.id === id) || null;
    },

    async getBySlug(slug: string): Promise<Author | null> {
        const authors = await this.getAll();
        return authors.find(a => a.slug === slug) || null;
    },

    async create(author: Author): Promise<Author> {
        const authors = await this.getAll();
        authors.push(author);
        await writeData(AUTHORS_FILE, authors);
        return author;
    },

    async update(id: string, updates: Partial<Author>): Promise<Author | null> {
        const authors = await this.getAll();
        const index = authors.findIndex(a => a.id === id);

        if (index === -1) return null;

        authors[index] = { ...authors[index], ...updates, updatedAt: new Date().toISOString() };
        await writeData(AUTHORS_FILE, authors);
        return authors[index];
    },

    async delete(id: string): Promise<boolean> {
        const authors = await this.getAll();
        const filtered = authors.filter(a => a.id !== id);

        if (filtered.length === authors.length) return false;

        await writeData(AUTHORS_FILE, filtered);
        return true;
    }
};
