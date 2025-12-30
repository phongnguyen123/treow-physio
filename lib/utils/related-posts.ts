interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image: string;
    createdAt: string;
    readTime: string;
}

/**
 * Find related articles based on category and exclude current article
 * @param currentPostId - ID of the current article
 * @param currentCategory - Category of the current article
 * @param allPosts - All available posts
 * @param limit - Maximum number of related posts to return
 * @returns Array of related posts
 */
export function getRelatedPosts(
    currentPostId: string,
    currentCategory: string,
    allPosts: Post[],
    limit: number = 3
): Post[] {
    // Filter posts by same category and exclude current post
    const relatedPosts = allPosts.filter(
        post => post.id !== currentPostId && post.category === currentCategory
    );

    // Sort by date (newest first)
    relatedPosts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Return limited number of posts
    return relatedPosts.slice(0, limit);
}
