/**
 * Calculate reading time for an article
 * @param content - HTML content of the article
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
    // Remove HTML tags
    const text = content.replace(/<[^>]*>/g, '');

    // Count words (Vietnamese and English)
    const words = text.trim().split(/\s+/).length;

    // Average reading speed: 200 words per minute
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);

    return minutes;
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string
 */
export function formatReadingTime(minutes: number): string {
    if (minutes === 1) {
        return '1 phút đọc';
    }
    return `${minutes} phút đọc`;
}
