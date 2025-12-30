interface ArticleSchemaProps {
    article: {
        title: string;
        excerpt: string;
        content: string;
        image: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        category: string;
    };
    author: {
        name: string;
        slug: string;
        avatar: string;
        bio: string;
    };
}

export default function ArticleSchema({ article, author }: ArticleSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://treow.com';

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "image": [
            `${baseUrl}${article.image}`,
            // Multiple sizes for different platforms
            `${baseUrl}${article.image}`,
            `${baseUrl}${article.image}`
        ],
        "datePublished": article.createdAt,
        "dateModified": article.updatedAt,
        "author": {
            "@type": "Person",
            "name": author.name,
            "url": `${baseUrl}/tac-gia/${author.slug}`,
            "image": `${baseUrl}${author.avatar}`,
            "description": author.bio,
            "jobTitle": "Bác sỹ Vật lý trị liệu",
            "worksFor": {
                "@type": "Organization",
                "name": "TREOW Physiotherapy",
                "url": baseUrl
            }
        },
        "publisher": {
            "@type": "Organization",
            "name": "TREOW",
            "url": baseUrl,
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`,
                "width": 600,
                "height": 60
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/tin-tuc/${article.slug}`
        },
        "articleSection": article.category,
        "inLanguage": "vi-VN"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
