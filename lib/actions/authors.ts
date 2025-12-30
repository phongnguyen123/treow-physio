'use server';

import { authorsDb } from '@/lib/db';
import { Author, CreateAuthorInput, UpdateAuthorInput } from '@/types';
import { revalidatePath } from 'next/cache';

// Helper function to generate Vietnamese slug
function generateSlug(text: string): string {
    const vietnameseMap: { [key: string]: string } = {
        'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
        'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
        'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
        'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
        'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
        'đ': 'd',
        'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
        'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
        'Đ': 'D'
    };

    let slug = text;
    Object.keys(vietnameseMap).forEach(key => {
        slug = slug.replace(new RegExp(key, 'g'), vietnameseMap[key]);
    });

    return slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Get all authors
export async function getAuthors() {
    try {
        const authors = await authorsDb.getAll();
        return authors.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
        console.error('Error fetching authors:', error);
        return [];
    }
}

// Get author by ID
export async function getAuthorById(id: string) {
    try {
        return await authorsDb.getById(id);
    } catch (error) {
        console.error('Error fetching author:', error);
        return null;
    }
}

// Get author by slug
export async function getAuthorBySlug(slug: string) {
    try {
        return await authorsDb.getBySlug(slug);
    } catch (error) {
        console.error('Error fetching author:', error);
        return null;
    }
}

// Create new author
export async function createAuthor(input: CreateAuthorInput) {
    try {
        // Generate slug from name
        let slug = generateSlug(input.name);

        // Check for duplicate slug
        const existing = await authorsDb.getBySlug(slug);
        if (existing) {
            const timestamp = Date.now();
            slug = `${slug}-${timestamp}`;
        }

        const author: Author = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
            name: input.name,
            slug,
            avatar: input.avatar,
            bio: input.bio,
            socialLinks: input.socialLinks || {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await authorsDb.create(author);
        revalidatePath('/admin/authors');
        revalidatePath('/admin/posts');

        return { success: true, author };
    } catch (error) {
        console.error('Error creating author:', error);
        return { success: false, error: 'Không thể tạo tác giả' };
    }
}

// Update author
export async function updateAuthor(input: UpdateAuthorInput) {
    try {
        const { id, ...updates } = input;
        const updatesWithSlug: Partial<Author> = { ...updates };

        // If name is being updated, regenerate slug
        if (updates.name) {
            let slug = generateSlug(updates.name);

            // Check for duplicate slug (excluding current author)
            const existing = await authorsDb.getBySlug(slug);
            if (existing && existing.id !== id) {
                const timestamp = Date.now();
                slug = `${slug}-${timestamp}`;
            }

            updatesWithSlug.slug = slug;
        }

        const updated = await authorsDb.update(id, updatesWithSlug);

        if (!updated) {
            return { success: false, error: 'Không tìm thấy tác giả' };
        }

        revalidatePath('/admin/authors');
        revalidatePath('/admin/posts');
        revalidatePath('/tin-tuc');

        return { success: true, author: updated };
    } catch (error) {
        console.error('Error updating author:', error);
        return { success: false, error: 'Không thể cập nhật tác giả' };
    }
}

// Delete author
export async function deleteAuthor(id: string) {
    try {
        const deleted = await authorsDb.delete(id);

        if (!deleted) {
            return { success: false, error: 'Không tìm thấy tác giả' };
        }

        revalidatePath('/admin/authors');
        revalidatePath('/admin/posts');

        return { success: true };
    } catch (error) {
        console.error('Error deleting author:', error);
        return { success: false, error: 'Không thể xóa tác giả' };
    }
}
