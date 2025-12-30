interface PersonSchemaProps {
    author: {
        name: string;
        slug: string;
        avatar: string;
        bio: string;
        socialLinks: {
            facebook?: string;
            linkedin?: string;
            twitter?: string;
        };
    };
    articlesCount?: number;
}

export default function PersonSchema({ author, articlesCount = 0 }: PersonSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://treow.com';

    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": author.name,
        "url": `${baseUrl}/tac-gia/${author.slug}`,
        "image": {
            "@type": "ImageObject",
            "url": `${baseUrl}${author.avatar}`,
            "width": 400,
            "height": 400
        },
        "description": author.bio,
        "jobTitle": "Bác sỹ Vật lý trị liệu",
        "worksFor": {
            "@type": "Organization",
            "name": "TREOW Physiotherapy",
            "url": baseUrl,
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
            }
        },
        "knowsAbout": [
            "Vật lý trị liệu",
            "Cơ xương khớp",
            "Phục hồi chức năng",
            "Điều trị đau",
            "Y học thể thao"
        ],
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "UK Medical School"
        },
        "sameAs": [
            author.socialLinks.facebook,
            author.socialLinks.linkedin,
            author.socialLinks.twitter
        ].filter(Boolean),
        "mainEntityOfPage": {
            "@type": "ProfilePage",
            "@id": `${baseUrl}/tac-gia/${author.slug}`
        },
        "numberOfArticles": articlesCount
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
