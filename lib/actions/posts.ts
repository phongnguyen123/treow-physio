'use server';

import { postsDb, authorsDb } from '@/lib/db';
import { Post, CreatePostInput, UpdatePostInput } from '@/types';
import { revalidatePath } from 'next/cache';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to populate author data
async function populateAuthor(post: Post): Promise<Post> {
    if (post.authorId) {
        const author = await authorsDb.getById(post.authorId);
        if (author) {
            return { ...post, author };
        }
    }
    return post;
}

export async function getPosts(): Promise<Post[]> {
    try {
        const posts = await postsDb.getAll();
        const published = posts.filter(p => p.published).sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return await Promise.all(published.map(populateAuthor));
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getAllPosts(): Promise<Post[]> {
    try {
        const posts = await postsDb.getAll();
        const sorted = posts.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return await Promise.all(sorted.map(populateAuthor));
    } catch (error) {
        console.error('Error fetching all posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const post = await postsDb.getBySlug(slug);
        return post ? await populateAuthor(post) : null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function getPostById(id: string): Promise<Post | null> {
    try {
        const post = await postsDb.getById(id);
        return post ? await populateAuthor(post) : null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
    try {
        const posts = await postsDb.getAll();
        const authorPosts = posts
            .filter(p => p.authorId === authorId && p.published)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return await Promise.all(authorPosts.map(populateAuthor));
    } catch (error) {
        console.error('Error fetching posts by author:', error);
        return [];
    }
}

export async function createPost(input: CreatePostInput): Promise<{ success: boolean; post?: Post; error?: string }> {
    try {
        const slug = generateSlug(input.title);

        // Check if slug already exists
        const existing = await postsDb.getBySlug(slug);
        if (existing) {
            return { success: false, error: 'Bài viết với tiêu đề này đã tồn tại' };
        }

        const post: Post = {
            id: generateId(),
            ...input,
            slug,
            published: input.published ?? true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await postsDb.create(post);
        revalidatePath('/tin-tuc');
        revalidatePath('/admin/posts');

        return { success: true, post };
    } catch (error) {
        console.error('Error creating post:', error);
        return { success: false, error: 'Không thể tạo bài viết' };
    }
}

export async function updatePost(input: UpdatePostInput): Promise<{ success: boolean; post?: Post; error?: string }> {
    try {
        const { id, ...updates } = input;

        // If title is being updated, regenerate slug
        if (updates.title) {
            const newSlug = generateSlug(updates.title);
            const existing = await postsDb.getBySlug(newSlug);

            if (existing && existing.id !== id) {
                return { success: false, error: 'Tiêu đề này đã được sử dụng' };
            }

            (updates as any).slug = newSlug;
        }

        const post = await postsDb.update(id, updates);

        if (!post) {
            return { success: false, error: 'Không tìm thấy bài viết' };
        }

        revalidatePath('/tin-tuc');
        revalidatePath('/admin/posts');

        return { success: true, post };
    } catch (error) {
        console.error('Error updating post:', error);
        return { success: false, error: 'Không thể cập nhật bài viết' };
    }
}

export async function deletePost(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const deleted = await postsDb.delete(id);

        if (!deleted) {
            return { success: false, error: 'Không tìm thấy bài viết' };
        }

        revalidatePath('/tin-tuc');
        revalidatePath('/admin/posts');

        return { success: true };
    } catch (error) {
        console.error('Error deleting post:', error);
        return { success: false, error: 'Không thể xóa bài viết' };
    }
}
