import { PrismaClient } from '@prisma/client'
import * as fs from 'fs/promises'
import * as path from 'path'

const prisma = new PrismaClient()

interface JsonAuthor {
    id: string
    name: string
    role?: string
    bio: string
    avatar: string
    email?: string
    facebook?: string
    twitter?: string
    linkedin?: string
}

interface JsonPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    image: string
    readTime: string
    published: boolean
    authorId: string
    createdAt: string
    updatedAt: string
}

interface JsonBooking {
    id: string
    name: string
    email: string
    phone: string
    service: string
    date: string
    time: string
    message?: string
    status: string
    createdAt: string
}

interface JsonSubscriber {
    id: string
    email: string
    name?: string
    status: string
    createdAt: string
}

async function main() {
    console.log('🚀 Starting data migration...\n')

    try {
        // 1. Migrate Authors
        console.log('📝 Migrating authors...')
        const authorsData = await fs.readFile(
            path.join(process.cwd(), 'data', 'authors.json'),
            'utf-8'
        )
        const authors: JsonAuthor[] = JSON.parse(authorsData)

        for (const author of authors) {
            await prisma.author.upsert({
                where: { id: author.id },
                update: {},
                create: {
                    id: author.id,
                    name: author.name,
                    role: author.role || 'Bác sỹ Vật lý trị liệu',
                    bio: author.bio,
                    avatar: author.avatar,
                    email: author.email,
                    facebook: author.facebook,
                    twitter: author.twitter,
                    linkedin: author.linkedin,
                },
            })
        }
        console.log(`✅ Migrated ${authors.length} authors\n`)

        // 2. Migrate Categories (extract from posts)
        console.log('📝 Migrating categories...')
        const postsData = await fs.readFile(
            path.join(process.cwd(), 'data', 'posts.json'),
            'utf-8'
        )
        const posts: JsonPost[] = JSON.parse(postsData)

        const uniqueCategories = [...new Set(posts.map(p => p.category).filter(Boolean))]
        const categoryMap = new Map<string, string>()

        for (const categoryName of uniqueCategories) {
            const slug = categoryName.toLowerCase().replace(/\s+/g, '-')
            const category = await prisma.category.upsert({
                where: { slug },
                update: {},
                create: {
                    name: categoryName,
                    slug,
                },
            })
            categoryMap.set(categoryName, category.id)
        }
        console.log(`✅ Migrated ${uniqueCategories.length} categories\n`)

        // 3. Migrate Posts
        console.log('📝 Migrating posts...')
        for (const post of posts) {
            const categoryId = post.category ? categoryMap.get(post.category) : null

            await prisma.post.upsert({
                where: { id: post.id },
                update: {},
                create: {
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    image: post.image,
                    readTime: post.readTime,
                    published: post.published,
                    authorId: post.authorId,
                    categoryId: categoryId || undefined,
                    createdAt: new Date(post.createdAt),
                    updatedAt: new Date(post.updatedAt),
                    publishedAt: post.published ? new Date(post.createdAt) : null,
                },
            })
        }
        console.log(`✅ Migrated ${posts.length} posts\n`)

        // 4. Migrate Bookings
        console.log('📝 Migrating bookings...')
        try {
            const bookingsData = await fs.readFile(
                path.join(process.cwd(), 'data', 'bookings.json'),
                'utf-8'
            )
            const bookings: JsonBooking[] = JSON.parse(bookingsData)

            for (const booking of bookings) {
                await prisma.booking.upsert({
                    where: { id: booking.id },
                    update: {},
                    create: {
                        id: booking.id,
                        name: booking.name,
                        email: booking.email,
                        phone: booking.phone,
                        service: booking.service,
                        date: booking.date,
                        time: booking.time,
                        message: booking.message,
                        status: booking.status,
                        createdAt: new Date(booking.createdAt),
                    },
                })
            }
            console.log(`✅ Migrated ${bookings.length} bookings\n`)
        } catch (error) {
            console.log('⚠️  No bookings.json found, skipping...\n')
        }

        // 5. Migrate Subscribers
        console.log('📝 Migrating subscribers...')
        try {
            const subscribersData = await fs.readFile(
                path.join(process.cwd(), 'data', 'subscribers.json'),
                'utf-8'
            )
            const subscribers: JsonSubscriber[] = JSON.parse(subscribersData)

            for (const subscriber of subscribers) {
                await prisma.subscriber.upsert({
                    where: { id: subscriber.id },
                    update: {},
                    create: {
                        id: subscriber.id,
                        email: subscriber.email,
                        name: subscriber.name,
                        status: subscriber.status,
                        createdAt: new Date(subscriber.createdAt),
                    },
                })
            }
            console.log(`✅ Migrated ${subscribers.length} subscribers\n`)
        } catch (error) {
            console.log('⚠️  No subscribers.json found, skipping...\n')
        }

        // 6. Migrate SEO Settings
        console.log('📝 Migrating SEO settings...')
        try {
            const seoData = await fs.readFile(
                path.join(process.cwd(), 'data', 'seo-settings.json'),
                'utf-8'
            )
            const seoSettings = JSON.parse(seoData)

            await prisma.seoSettings.upsert({
                where: { id: 'default' },
                update: seoSettings,
                create: {
                    id: 'default',
                    ...seoSettings,
                },
            })
            console.log('✅ Migrated SEO settings\n')
        } catch (error) {
            console.log('⚠️  No seo-settings.json found, skipping...\n')
        }

        console.log('🎉 Migration completed successfully!')
    } catch (error) {
        console.error('❌ Migration failed:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
