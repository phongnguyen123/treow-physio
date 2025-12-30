interface Heading {
    id: string;
    text: string;
    level: number;
}

/**
 * Extract H2 and H3 headings from HTML content for table of contents
 * @param htmlContent - HTML content string
 * @returns Array of heading objects
 */
export function extractHeadings(htmlContent: string): Heading[] {
    const headings: Heading[] = [];

    // Match H2 and H3 tags
    const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
    let match;

    while ((match = headingRegex.exec(htmlContent)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2].replace(/<[^>]*>/g, '').trim(); // Remove any nested tags

        // Create ID from text (slug format)
        const id = text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();

        headings.push({ id, text, level });
    }

    return headings;
}

/**
 * Add IDs to headings in HTML content
 * @param htmlContent - Original HTML content
 * @param headings - Array of heading objects with IDs
 * @returns HTML content with IDs added to headings
 */
export function addHeadingIds(htmlContent: string, headings: Heading[]): string {
    let content = htmlContent;

    headings.forEach(heading => {
        const regex = new RegExp(`<h${heading.level}[^>]*>${heading.text}</h${heading.level}>`, 'i');
        content = content.replace(regex, `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`);
    });

    return content;
}
