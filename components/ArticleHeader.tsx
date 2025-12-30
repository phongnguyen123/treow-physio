import Link from "next/link";
import Image from "next/image";

interface ArticleHeaderProps {
    title: string;
    excerpt: string;
    category: string;
    author: {
        name: string;
        slug: string;
        avatar: string;
    };
    publishDate: string;
    updateDate: string;
    readingTime: string;
}

export default function ArticleHeader({
    title,
    excerpt,
    category,
    author,
    publishDate,
    updateDate,
    readingTime
}: ArticleHeaderProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <header className="mb-8">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-2 text-sm text-text-sub">
                <Link href="/" className="hover:text-primary transition-colors">
                    Trang chủ
                </Link>
                <span>/</span>
                <Link href="/tin-tuc" className="hover:text-primary transition-colors">
                    Tin tức
                </Link>
                <span>/</span>
                <span className="text-text-main">{title}</span>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
                    {category}
                </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-black leading-tight text-text-main md:text-5xl lg:text-6xl">
                {title}
            </h1>

            {/* Excerpt */}
            <p className="mb-6 text-xl leading-relaxed text-text-sub md:text-2xl">
                {excerpt}
            </p>

            {/* Author & Meta Info */}
            <div className="flex flex-wrap items-center gap-4 border-t border-b border-gray-200 py-4">
                {/* Author */}
                <Link
                    href={`/tac-gia/${author.slug}`}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                        <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-text-sub">Tác giả</p>
                        <p className="font-bold text-text-main">{author.name}</p>
                    </div>
                </Link>

                {/* Divider */}
                <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

                {/* Dates & Reading Time */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-sub">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                        <time dateTime={publishDate}>
                            {formatDate(publishDate)}
                        </time>
                    </div>

                    {updateDate !== publishDate && (
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">update</span>
                            <time dateTime={updateDate}>
                                Cập nhật: {formatDate(updateDate)}
                            </time>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span>{readingTime}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
