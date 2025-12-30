import Link from "next/link";
import Image from "next/image";

interface RelatedArticle {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image: string;
    createdAt: string;
    readTime: string;
}

interface RelatedArticlesProps {
    articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
    if (articles.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="mb-8 text-3xl font-black text-text-main">Bài viết liên quan</h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/tin-tuc/${article.slug}`}
                        className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:border-primary"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-6">
                            <div className="mb-3 flex items-center gap-3 text-xs text-text-sub">
                                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                                    {article.category}
                                </span>
                                <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-text-main line-clamp-2 group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <p className="mb-4 text-sm text-text-sub line-clamp-3">{article.excerpt}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-text-sub">{article.readTime}</span>
                                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                                    Đọc thêm
                                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
