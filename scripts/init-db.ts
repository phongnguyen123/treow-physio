import { sql } from '@vercel/postgres';

/**
 * Database Initialization Script
 * 
 * This script creates all necessary tables for the application.
 * Run this once after setting up Vercel Postgres.
 * 
 * Usage:
 *   npx tsx scripts/init-db.ts
 */

async function initDatabase() {
    console.log('🚀 Starting database initialization...\n');

    try {
        // Test connection
        console.log('📡 Testing database connection...');
        await sql`SELECT 1`;
        console.log('✅ Database connection successful!\n');

        // Create bookings table
        console.log('📋 Creating bookings table...');
        await sql`
            CREATE TABLE IF NOT EXISTS bookings (
                id VARCHAR(255) PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                email VARCHAR(255),
                service VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                time VARCHAR(50) NOT NULL,
                notes TEXT,
                status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )
        `;
        console.log('✅ Bookings table created\n');

        // Create newsletters table
        console.log('📧 Creating newsletters table...');
        await sql`
            CREATE TABLE IF NOT EXISTS newsletters (
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                subscribed_at TIMESTAMP NOT NULL DEFAULT NOW(),
                status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE'
            )
        `;
        console.log('✅ Newsletters table created\n');

        // Create authors table
        console.log('✍️ Creating authors table...');
        await sql`
            CREATE TABLE IF NOT EXISTS authors (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(500) NOT NULL UNIQUE,
                title VARCHAR(255),
                bio TEXT,
                avatar VARCHAR(500),
                email VARCHAR(255),
                social_links JSONB,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )
        `;
        console.log('✅ Authors table created\n');

        // Create posts table
        console.log('📝 Creating posts table...');
        await sql`
            CREATE TABLE IF NOT EXISTS posts (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(500) NOT NULL,
                slug VARCHAR(500) NOT NULL UNIQUE,
                excerpt TEXT,
                content TEXT NOT NULL,
                image VARCHAR(500),
                category VARCHAR(255),
                author_id VARCHAR(255),
                read_time VARCHAR(50),
                published BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL
            )
        `;
        console.log('✅ Posts table created\n');

        // Create indexes for better performance
        console.log('🔍 Creating indexes...');

        await sql`CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC)`;

        await sql`CREATE INDEX IF NOT EXISTS idx_newsletters_email ON newsletters(email)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_newsletters_status ON newsletters(status)`;

        await sql`CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC)`;

        await sql`CREATE INDEX IF NOT EXISTS idx_authors_slug ON authors(slug)`;

        console.log('✅ Indexes created\n');

        console.log('🎉 Database initialization completed successfully!');
        console.log('\n📊 Tables created:');
        console.log('   - bookings');
        console.log('   - newsletters');
        console.log('   - authors');
        console.log('   - posts');
        console.log('\n✨ Your database is ready to use!');

    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    }
}

// Run the initialization
initDatabase()
    .then(() => {
        console.log('\n✅ Script completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Script failed:', error);
        process.exit(1);
    });
