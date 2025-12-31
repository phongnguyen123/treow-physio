// TypeScript type definitions for the application

export interface Author {
    id: string
    name: string
    slug: string  // Required for author profile pages
    role: string
    bio: string
    avatar: string
    email?: string
    facebook?: string
    twitter?: string
    linkedin?: string
    socialLinks?: {
        facebook?: string
        twitter?: string
        linkedin?: string
    }
    createdAt: string
    updatedAt: string
}

export interface CreateAuthorInput {
    name: string
    role: string
    bio: string
    avatar: string
    email?: string
    facebook?: string
    twitter?: string
    linkedin?: string
    socialLinks?: {
        facebook?: string
        twitter?: string
        linkedin?: string
    }
}

export interface UpdateAuthorInput {
    id: string
    name?: string
    role?: string
    bio?: string
    avatar?: string
    email?: string
    facebook?: string
    twitter?: string
    linkedin?: string
    socialLinks?: {
        facebook?: string
        twitter?: string
        linkedin?: string
    }
}

export interface Post {
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
    author?: Author
    createdAt: string
    updatedAt: string
    views?: number
}

export interface CreatePostInput {
    title: string
    excerpt: string
    content: string
    category: string
    image: string
    readTime: string
    published?: boolean
    authorId: string
}

export interface UpdatePostInput {
    id: string
    title?: string
    excerpt?: string
    content?: string
    category?: string
    image?: string
    readTime?: string
    published?: boolean
    authorId?: string
}

export interface Booking {
    id: string
    fullName: string
    email?: string
    phone: string
    service: string
    date: string
    time: string
    message?: string
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
    createdAt: string
    updatedAt?: string
}

export interface CreateBookingInput {
    fullName: string
    email?: string
    phone: string
    service: string
    date: string
    time: string
    message?: string
}

export interface UpdateBookingInput {
    id: string
    fullName?: string
    email?: string
    phone?: string
    service?: string
    date?: string
    time?: string
    message?: string
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
}

export interface Subscriber {
    id: string
    email: string
    name?: string
    status: string
    createdAt: string
}

export interface Category {
    id: string
    name: string
    slug: string
    createdAt: string
}

export interface Tag {
    id: string
    name: string
    slug: string
    createdAt: string
}
