import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleHeader from "@/components/ArticleHeader";
import RelatedArticles from "@/components/RelatedArticles";
import TableOfContents from "@/components/TableOfContents";
import ArticleSchema from "@/components/schemas/ArticleSchema";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";
import { getPostBySlug, getPosts } from "@/lib/actions/posts";
import { calculateReadingTime, formatReadingTime } from "@/lib/utils/reading-time";
import { getRelatedPosts } from "@/lib/utils/related-posts";
import { extractHeadings, addHeadingIds } from "@/lib/utils/extract-headings";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Bài viết không tồn tại',
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://treow.com';

    return {
        title: `${post.title} | TREOW`,
        description: post.excerpt,
        keywords: [post.category, 'vật lý trị liệu', 'sức khỏe', 'TREOW', post.title],
        authors: post.author ? [{ name: post.author.name, url: `${baseUrl}/tac-gia/${post.author.slug}` }] : [{ name: 'TREOW' }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [{
                url: post.image,
                width: 1200,
                height: 675,
                alt: post.title
            }],
            type: 'article',
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: post.author ? [post.author.name] : ['TREOW'],
            tags: [post.category],
            locale: 'vi_VN',
            siteName: 'TREOW Physiotherapy'
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            creator: post.author ? `@${post.author.slug}` : '@treow'
        },
        alternates: {
            canonical: `${baseUrl}/tin-tuc/${post.slug}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            }
        }
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Get all posts for related articles
    const allPosts = await getPosts();
    const relatedPosts = getRelatedPosts(post.id, post.category, allPosts, 3);

    // Calculate reading time
    const readingMinutes = calculateReadingTime(post.content);
    const readingTime = formatReadingTime(readingMinutes);

    // Extract headings for table of contents
    const headings = extractHeadings(post.content);
    const contentWithIds = addHeadingIds(post.content, headings);

    // Breadcrumb items
    const breadcrumbItems = [
        { name: 'Trang chủ', url: '/' },
        { name: 'Tin tức', url: '/tin-tuc' },
        { name: post.title, url: `/tin-tuc/${post.slug}` }
    ];

    return (
        <div className="min-h-screen bg-background-light">
            <Header />

            {/* Structured Data */}
            {post.author && (
                <ArticleSchema article={post} author={post.author} />
            )}
            <BreadcrumbSchema items={breadcrumbItems} />

            {/* Article Content */}
            <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Article Header */}
                        {post.author && (
                            <ArticleHeader
                                title={post.title}
                                excerpt={post.excerpt}
                                category={post.category}
                                author={{
                                    name: post.author.name,
                                    slug: post.author.slug,
                                    avatar: post.author.avatar
                                }}
                                publishDate={post.createdAt}
                                updateDate={post.updatedAt}
                                readingTime={readingTime}
                            />
                        )}

                        {/* Featured Image */}
                        <figure className="mb-12 overflow-hidden rounded-2xl">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                />
                            </div>
                            <figcaption className="mt-3 text-center text-sm text-text-sub italic">
                                {post.title}
                            </figcaption>
                        </figure>

                        {/* Article Body */}
                        <div
                            className="prose prose-xl max-w-none
                                prose-headings:font-black prose-headings:text-text-main prose-headings:leading-tight
                                prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:mb-6 prose-h1:mt-10
                                prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mb-5 prose-h2:mt-8 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
                                prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mb-4 prose-h3:mt-6
                                prose-h4:text-xl prose-h4:md:text-2xl prose-h4:mb-3 prose-h4:mt-5
                                prose-p:text-text-main prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                                prose-strong:text-text-main prose-strong:font-bold
                                prose-em:text-text-sub prose-em:italic
                                prose-ul:my-6 prose-ul:text-text-main
                                prose-ol:my-6 prose-ol:text-text-main
                                prose-li:my-2 prose-li:text-lg prose-li:leading-relaxed
                                prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8 prose-img:mx-auto prose-img:max-w-full
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-6
                                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:my-6"
                            dangerouslySetInnerHTML={{ __html: contentWithIds }}
                        />

                        {/* Medical Disclaimer */}
                        <div className="mt-12 rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 p-6">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-yellow-600 text-2xl">warning</span>
                                <div>
                                    <h3 className="font-bold text-text-main mb-2">Lưu ý y khoa</h3>
                                    <p className="text-sm text-text-sub leading-relaxed">
                                        Thông tin trong bài viết chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ hoặc chuyên gia y tế trước khi áp dụng bất kỳ phương pháp điều trị nào.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Share Section */}
                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <h3 className="mb-4 text-lg font-bold text-text-main">Chia sẻ bài viết</h3>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                                    <span className="material-symbols-outlined text-lg">share</span>
                                    Facebook
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 transition-colors">
                                    <span className="material-symbols-outlined text-lg">share</span>
                                    Twitter
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-text-main hover:bg-gray-300 transition-colors">
                                    <span className="material-symbols-outlined text-lg">link</span>
                                    Copy link
                                </button>
                            </div>
                        </div>

                        {/* Author Box */}
                        {post.author && (
                            <div className="mt-12 border-t border-gray-200 pt-8">
                                <h3 className="mb-6 text-lg font-bold text-text-main">Về tác giả</h3>
                                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <Link href={`/tac-gia/${post.author.slug}`} className="shrink-0">
                                            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20">
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover transition-transform hover:scale-105"
                                                />
                                            </div>
                                        </Link>
                                        <div className="flex-1">
                                            <Link
                                                href={`/tac-gia/${post.author.slug}`}
                                                className="text-xl font-bold text-text-main hover:text-primary transition-colors inline-block mb-2"
                                            >
                                                {post.author.name}
                                            </Link>
                                            <p className="text-text-sub leading-relaxed mb-4">
                                                {post.author.bio.substring(0, 100)}...
                                            </p>
                                            <Link
                                                href={`/tac-gia/${post.author.slug}`}
                                                className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1"
                                            >
                                                Xem thêm về tác giả
                                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                                            </Link>
                                            <div className="flex gap-3 mt-4">
                                                {post.author.socialLinks.facebook && (
                                                    <a
                                                        href={post.author.socialLinks.facebook}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline text-sm"
                                                    >
                                                        Facebook
                                                    </a>
                                                )}
                                                {post.author.socialLinks.linkedin && (
                                                    <a
                                                        href={post.author.socialLinks.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline text-sm"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Related Articles */}
                        <RelatedArticles articles={relatedPosts} />
                    </div>

                    {/* Sidebar - Table of Contents */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <TableOfContents headings={headings} />
                    </aside>
                </div>
            </article>

            <Footer />
        </div>
    );
}
