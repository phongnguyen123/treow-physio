import { sql } from '@vercel/postgres';
import fs from 'fs/promises';
import path from 'path';

/**
 * Data Migration Script
 * 
 * Migrates existing data from JSON files to Vercel Postgres.
 * Run this after init-db.ts to populate the database with existing data.
 * 
 * Usage:
 *   npx tsx scripts/migrate-data.ts
 */

interface JsonData {
    bookings?: any[];
    newsletters?: any[];
    authors?: any[];
    posts?: any[];
}

async function readJsonFile(filename: string): Promise<any[]> {
    try {
        const filePath = path.join(process.cwd(), 'data', filename);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.log(`⚠️  Could not read ${filename}, skipping...`);
        return [];
    }
}

async function migrateData() {
    console.log('🚀 Starting data migration...\n');

    try {
        // Test connection
        console.log('📡 Testing database connection...');
        await sql`SELECT 1`;
        console.log('✅ Database connection successful!\n');

        // Migrate Authors first (posts depend on authors)
        console.log('✍️  Migrating authors...');
        const authors = await readJsonFile('authors.json');
        let authorCount = 0;

        for (const author of authors) {
            try {
                await sql`
                    INSERT INTO authors (id, name, slug, title, bio, avatar, email, social_links, created_at, updated_at)
                    VALUES (
                        ${author.id},
                        ${author.name},
                        ${author.slug},
                        ${author.title || null},
                        ${author.bio || null},
                        ${author.avatar || null},
                        ${author.email || null},
                        ${JSON.stringify(author.socialLinks || {})},
                        ${author.createdAt || new Date().toISOString()},
                        ${author.updatedAt || new Date().toISOString()}
                    )
                    ON CONFLICT (id) DO UPDATE SET
                        name = EXCLUDED.name,
                        slug = EXCLUDED.slug,
                        title = EXCLUDED.title,
                        bio = EXCLUDED.bio,
                        avatar = EXCLUDED.avatar,
                        email = EXCLUDED.email,
                        social_links = EXCLUDED.social_links,
                        updated_at = EXCLUDED.updated_at
                `;
                authorCount++;
            } catch (error) {
                console.error(`   ❌ Error migrating author ${author.id}:`, error);
            }
        }
        console.log(`✅ Migrated ${authorCount} authors\n`);

        // Migrate Posts
        console.log('📝 Migrating posts...');
        const posts = await readJsonFile('posts.json');
        let postCount = 0;

        for (const post of posts) {
            try {
                await sql`
                    INSERT INTO posts (id, title, slug, excerpt, content, image, category, author_id, read_time, published, created_at, updated_at)
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
                        ${post.createdAt || new Date().toISOString()},
                        ${post.updatedAt || new Date().toISOString()}
                    )
                    ON CONFLICT (id) DO UPDATE SET
                        title = EXCLUDED.title,
                        slug = EXCLUDED.slug,
                        excerpt = EXCLUDED.excerpt,
                        content = EXCLUDED.content,
                        image = EXCLUDED.image,
                        category = EXCLUDED.category,
                        author_id = EXCLUDED.author_id,
                        read_time = EXCLUDED.read_time,
                        published = EXCLUDED.published,
                        updated_at = EXCLUDED.updated_at
                `;
                postCount++;
            } catch (error) {
                console.error(`   ❌ Error migrating post ${post.id}:`, error);
            }
        }
        console.log(`✅ Migrated ${postCount} posts\n`);

        // Migrate Bookings
        console.log('📋 Migrating bookings...');
        const bookings = await readJsonFile('bookings.json');
        let bookingCount = 0;

        for (const booking of bookings) {
            try {
                await sql`
                    INSERT INTO bookings (id, full_name, phone, email, service, date, time, notes, status, created_at, updated_at)
                    VALUES (
                        ${booking.id},
                        ${booking.fullName},
                        ${booking.phone},
                        ${booking.email || null},
                        ${booking.service},
                        ${booking.date},
                        ${booking.time},
                        ${booking.notes || null},
                        ${booking.status || 'PENDING'},
                        ${booking.createdAt || new Date().toISOString()},
                        ${booking.updatedAt || new Date().toISOString()}
                    )
                    ON CONFLICT (id) DO UPDATE SET
                        full_name = EXCLUDED.full_name,
                        phone = EXCLUDED.phone,
                        email = EXCLUDED.email,
                        service = EXCLUDED.service,
                        date = EXCLUDED.date,
                        time = EXCLUDED.time,
                        notes = EXCLUDED.notes,
                        status = EXCLUDED.status,
                        updated_at = EXCLUDED.updated_at
                `;
                bookingCount++;
            } catch (error) {
                console.error(`   ❌ Error migrating booking ${booking.id}:`, error);
            }
        }
        console.log(`✅ Migrated ${bookingCount} bookings\n`);

        // Migrate Newsletters
        console.log('📧 Migrating newsletters...');
        const newsletters = await readJsonFile('subscribers.json');
        let newsletterCount = 0;

        for (const newsletter of newsletters) {
            try {
                await sql`
                    INSERT INTO newsletters (id, email, subscribed_at, status)
                    VALUES (
                        ${newsletter.id},
                        ${newsletter.email},
                        ${newsletter.subscribedAt || new Date().toISOString()},
                        ${newsletter.status || 'ACTIVE'}
                    )
                    ON CONFLICT (id) DO UPDATE SET
                        email = EXCLUDED.email,
                        subscribed_at = EXCLUDED.subscribed_at,
                        status = EXCLUDED.status
                `;
                newsletterCount++;
            } catch (error) {
                console.error(`   ❌ Error migrating newsletter ${newsletter.id}:`, error);
            }
        }
        console.log(`✅ Migrated ${newsletterCount} newsletters\n`);

        console.log('🎉 Data migration completed successfully!');
        console.log('\n📊 Migration Summary:');
        console.log(`   - Authors: ${authorCount}`);
        console.log(`   - Posts: ${postCount}`);
        console.log(`   - Bookings: ${bookingCount}`);
        console.log(`   - Newsletters: ${newsletterCount}`);
        console.log('\n✨ Your data is now in Vercel Postgres!');

    } catch (error) {
        console.error('❌ Error during migration:', error);
        throw error;
    }
}

// Run the migration
migrateData()
    .then(() => {
        console.log('\n✅ Migration script completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Migration script failed:', error);
        process.exit(1);
    });
