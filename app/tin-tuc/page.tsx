import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPosts } from "@/lib/actions/posts";
import NewsletterForm from "@/components/NewsletterForm";
import PostsGrid from "@/components/PostsGrid";

export default async function TinTucPage() {
    const posts = await getPosts();

    // Get featured article (most recent)
    const featuredArticle = posts[0];

    // Get remaining articles
    const articles = posts.slice(1);

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-background-light to-primary/5 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-text-main sm:text-5xl lg:text-6xl">
                            Tin tức & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#089191] to-primary">Kiến thức</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-sub">
                            Cập nhật những thông tin mới nhất về vật lý trị liệu, sức khỏe và các mẹo hữu ích cho cuộc sống.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && (
                <section className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="relative h-64 lg:h-auto">
                                    <img
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-content">
                                        NỔI BẬT
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-8 lg:p-12">
                                    <div className="mb-4 flex items-center gap-4 text-sm text-text-sub">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                                            {featuredArticle.category}
                                        </span>
                                        <span>{new Date(featuredArticle.createdAt).toLocaleDateString('vi-VN')}</span>
                                        <span>•</span>
                                        <span>{featuredArticle.readTime}</span>
                                    </div>
                                    <h2 className="mb-4 text-3xl font-black text-text-main lg:text-4xl">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="mb-6 text-lg text-text-sub">{featuredArticle.excerpt}</p>
                                    <Link
                                        href={`/tin-tuc/${featuredArticle.slug}`}
                                        className="inline-flex w-fit items-center gap-2 text-primary font-bold hover:underline"
                                    >
                                        Đọc tiếp
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Posts Grid with Filter */}
            <PostsGrid posts={articles} />

            {/* Newsletter Section */}
            <NewsletterForm />

            <Footer />
        </div>
    );
}
