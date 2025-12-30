// Type definitions for the application

// Author types
export interface SocialLinks {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
}

export interface Author {
    id: string;
    name: string;
    slug: string;
    avatar: string;
    bio: string;
    socialLinks: SocialLinks;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAuthorInput {
    name: string;
    avatar: string;
    bio: string;
    socialLinks?: SocialLinks;
}

export interface UpdateAuthorInput extends Partial<CreateAuthorInput> {
    id: string;
}

// Post types
export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    readTime: string;
    published: boolean;
    authorId?: string;
    author?: Author;
    createdAt: string;
    updatedAt: string;
}

export interface Booking {
    id: string;
    fullName: string;
    phone: string;
    email?: string;
    service: string;
    date: string;
    time: string;
    message?: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    createdAt: string;
    updatedAt: string;
}

export type BookingStatus = Booking['status'];

export interface CreatePostInput {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    readTime: string;
    published?: boolean;
    authorId?: string;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
    id: string;
}

export interface CreateBookingInput {
    fullName: string;
    phone: string;
    email?: string;
    service: string;
    date: string;
    time: string;
    message?: string;
}

export interface UpdateBookingInput {
    id: string;
    status?: BookingStatus;
    date?: string;
    time?: string;
}
