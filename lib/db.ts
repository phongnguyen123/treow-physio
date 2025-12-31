import { prisma } from './prisma'
import { Post, Booking, Author } from '@/types'

// Posts database functions using Prisma
export const postsDb = {
    async getAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return posts.map(post => ({ ...post, category: post.category?.name || '' })) as any[]
    },

    async getById(id: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                category: true,
            },
        })
        if (!post) return null
        return { ...post, category: post.category?.name || '' } as any
    },

    async getBySlug(slug: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                author: true,
                category: true,
            },
        })
        if (!post) return null
        return { ...post, category: post.category?.name || '' } as any
    },

    async create(post: Post): Promise<Post> {
        const created = await prisma.post.create({
            data: {
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                image: post.image,
                readTime: post.readTime,
                published: post.published,
                authorId: post.authorId,
                categoryId: post.category ? undefined : null, // Will handle category separately if needed
                createdAt: new Date(post.createdAt),
                updatedAt: new Date(post.updatedAt),
            },
            include: {
                author: true,
                category: true,
            },
        })
        return created as any
    },

    async update(id: string, updates: Partial<Post>): Promise<Post | null> {
        try {
            // Remove fields that don't exist in Prisma schema or are populated relations
            const { category, author, ...prismaUpdates } = updates as any;

            const updated = await prisma.post.update({
                where: { id },
                data: {
                    ...prismaUpdates,
                    updatedAt: new Date(),
                },
                include: {
                    author: true,
                    category: true,
                },
            })
            return updated as any
        } catch (error) {
            return null
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.post.delete({
                where: { id },
            })
            return true
        } catch (error) {
            return false
        }
    },
}

// Bookings database functions using Prisma
export const bookingsDb = {
    async getAll(): Promise<Booking[]> {
        const bookings = await prisma.booking.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        // Map Prisma 'name' field to TypeScript 'fullName'
        return bookings.map(b => ({ ...b, fullName: b.name })) as any[]
    },

    async getById(id: string): Promise<Booking | null> {
        const booking = await prisma.booking.findUnique({
            where: { id },
        })
        if (!booking) return null
        // Map Prisma 'name' field to TypeScript 'fullName'
        return { ...booking, fullName: booking.name } as any
    },

    async create(booking: Booking): Promise<Booking> {
        const created = await prisma.booking.create({
            data: {
                id: booking.id,
                name: booking.fullName,
                email: booking.email || '',
                phone: booking.phone,
                service: booking.service,
                date: booking.date,
                time: booking.time,
                message: booking.message,
                status: booking.status,
                createdAt: new Date(booking.createdAt),
            },
        })
        return created as any
    },

    async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
        try {
            const updated = await prisma.booking.update({
                where: { id },
                data: {
                    ...updates,
                    updatedAt: new Date(),
                },
            })
            return updated as any
        } catch (error) {
            return null
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.booking.delete({
                where: { id },
            })
            return true
        } catch (error) {
            return false
        }
    },
}

// Authors database functions using Prisma
export const authorsDb = {
    async getAll(): Promise<Author[]> {
        const authors = await prisma.author.findMany({
            orderBy: {
                name: 'asc',
            },
        })
        return authors as any[]
    },

    async getById(id: string): Promise<Author | null> {
        const author = await prisma.author.findUnique({
            where: { id },
        })
        return author as any
    },

    async getBySlug(slug: string): Promise<Author | null> {
        try {
            // Fallback to raw query to bypass outdated Prisma Client schema validation
            // if the dev server hasn't picked up the new schema changes yet
            const authors = await prisma.$queryRaw<Author[]>`SELECT * FROM "authors" WHERE "slug" = ${slug} LIMIT 1`
            if (Array.isArray(authors) && authors.length > 0) {
                return authors[0]
            }
            return null
        } catch (error) {
            console.error('Error fetching author by slug:', error)
            return null
        }
    },

    async create(author: Author): Promise<Author> {
        const created = await prisma.author.create({
            data: {
                id: author.id,
                name: author.name,
                role: author.role,
                bio: author.bio,
                avatar: author.avatar,
                email: author.email,
                facebook: author.facebook,
                twitter: author.twitter,
                linkedin: author.linkedin,
            },
        })
        return created as any
    },

    async update(id: string, updates: Partial<Author>): Promise<Author | null> {
        try {
            const updated = await prisma.author.update({
                where: { id },
                data: {
                    ...updates,
                    updatedAt: new Date(),
                },
            })
            return updated as any
        } catch (error) {
            return null
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.author.delete({
                where: { id },
            })
            return true
        } catch (error) {
            return false
        }
    },
}
