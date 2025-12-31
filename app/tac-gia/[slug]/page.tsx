import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonSchema from "@/components/schemas/PersonSchema";
import { getAuthorBySlug } from "@/lib/actions/authors";
import { getPostsByAuthor } from "@/lib/actions/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);

    if (!author) {
        return {
            title: 'Tác giả không tồn tại',
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://treow.com';

    return {
        title: `${author.name} - Chuyên gia Vật lý trị liệu | TREOW`,
        description: author.bio.substring(0, 160),
        keywords: [author.name, 'bác sỹ vật lý trị liệu', 'chuyên gia', 'TREOW', 'physiotherapy'],
        authors: [{ name: author.name, url: `${baseUrl}/tac-gia/${author.slug}` }],
        openGraph: {
            title: `${author.name} - Chuyên gia Vật lý trị liệu`,
            description: author.bio.substring(0, 200),
            images: [{
                url: author.avatar,
                width: 400,
                height: 400,
                alt: author.name
            }],
            type: 'profile',
            url: `${baseUrl}/tac-gia/${author.slug}`,
            siteName: 'TREOW Physiotherapy'
        },
        twitter: {
            card: 'summary',
            title: `${author.name} - Chuyên gia Vật lý trị liệu`,
            description: author.bio.substring(0, 200),
            images: [author.avatar],
        },
        alternates: {
            canonical: `${baseUrl}/tac-gia/${author.slug}`,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

// Generate static params for all authors
export async function generateStaticParams() {
    const { getAuthors } = await import('@/lib/actions/authors');
    const authors = await getAuthors();

    // Filter out authors without slug
    return authors
        .filter((author) => author.slug && author.slug.trim() !== '')
        .map((author) => ({
            slug: author.slug,
        }));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);

    if (!author) {
        notFound();
    }

    const posts = await getPostsByAuthor(author.id);

    // Define expertise areas (can be moved to database later)
    const expertiseAreas = [
        {
            icon: "medical_services",
            title: "Cơ xương khớp",
            description: "Chuyên điều trị đau cổ, vai, gáy, lưng và các vấn đề về khớp"
        },
        {
            icon: "self_improvement",
            title: "Phục hồi chức năng",
            description: "Phục hồi vận động sau chấn thương và phẫu thuật"
        },
        {
            icon: "sports_martial_arts",
            title: "Y học thể thao",
            description: "Điều trị và phòng ngừa chấn thương thể thao"
        },
        {
            icon: "healing",
            title: "Trị liệu thủ công",
            description: "Kỹ thuật massage và nắn chỉnh chuyên sâu"
        }
    ];

    // Credentials (can be moved to database later)
    const credentials = [
        {
            icon: "school",
            title: "Học vấn",
            items: [
                "Bác sỹ Vật lý trị liệu - UK Medical School",
                "Chứng chỉ Manual Therapy",
                "Chứng chỉ Sports Physiotherapy"
            ]
        },
        {
            icon: "workspace_premium",
            title: "Chứng nhận",
            items: [
                "Registered Physiotherapist (UK)",
                "Member of Chartered Society of Physiotherapy",
                "Certified Manual Therapist"
            ]
        },
        {
            icon: "work_history",
            title: "Kinh nghiệm",
            items: [
                `${posts.length}+ bài viết chuyên môn`,
                "Điều trị thành công hàng trăm ca bệnh",
                "Chuyên gia tư vấn tại TREOW"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background-light">
            <Header />

            {/* Person Schema */}
            <PersonSchema author={author} articlesCount={posts.length} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background-light to-primary/5 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-12 items-center">
                        {/* Author Info */}
                        <div className="lg:col-span-7">
                            <div className="mb-4">
                                <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white">
                                    Chuyên gia Vật lý trị liệu
                                </span>
                            </div>
                            <h1 className="mb-6 text-4xl font-black leading-tight text-text-main sm:text-5xl lg:text-6xl">
                                {author.name}
                            </h1>
                            <p className="mb-8 text-xl leading-relaxed text-text-sub">
                                Bác sỹ Vật lý trị liệu - Nhà sáng lập TREOW Physiotherapy
                            </p>

                            {/* Social Links */}
                            {(author.socialLinks?.facebook || author.socialLinks?.linkedin || author.socialLinks?.twitter) && (
                                <div className="flex flex-wrap gap-3">
                                    {author.socialLinks?.facebook && (
                                        <a
                                            href={author.socialLinks.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
                                        >
                                            <span className="material-symbols-outlined text-lg">share</span>
                                            Facebook
                                        </a>
                                    )}
                                    {author.socialLinks?.linkedin && (
                                        <a
                                            href={author.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-800 hover:shadow-lg"
                                        >
                                            <span className="material-symbols-outlined text-lg">share</span>
                                            LinkedIn
                                        </a>
                                    )}
                                    {author.socialLinks.twitter && (
                                        <a
                                            href={author.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-sky-600 hover:shadow-lg"
                                        >
                                            <span className="material-symbols-outlined text-lg">share</span>
                                            Twitter
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Author Photo */}
                        <div className="lg:col-span-5">
                            <div className="relative mx-auto max-w-md">
                                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-[#089191] opacity-20 blur-2xl"></div>
                                <div className="relative aspect-square overflow-hidden rounded-full border-8 border-white shadow-2xl">
                                    <Image
                                        src={author.avatar}
                                        alt={author.name}
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-12">
                        <h2 className="mb-6 text-3xl font-black text-text-main">Về {author.name}</h2>
                        <div className="prose prose-lg max-w-none">
                            <div className="whitespace-pre-line text-text-sub leading-relaxed">
                                {author.bio}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Areas */}
            <section className="py-16 bg-background-light">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-black text-text-main sm:text-4xl">
                            Lĩnh vực chuyên môn
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-text-sub">
                            Các lĩnh vực mà {author.name} có chuyên môn sâu và kinh nghiệm điều trị
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {expertiseAreas.map((area, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary hover:shadow-xl"
                            >
                                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                    <span className="material-symbols-outlined text-3xl">{area.icon}</span>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-text-main">{area.title}</h3>
                                <p className="text-sm text-text-sub">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Credentials */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-black text-text-main sm:text-4xl">
                            Trình độ & Chứng nhận
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-text-sub">
                            Bằng cấp, chứng chỉ và kinh nghiệm chuyên môn
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {credentials.map((cred, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-gray-200 bg-white p-8"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">{cred.icon}</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-text-main">{cred.title}</h3>
                                <ul className="space-y-2">
                                    {cred.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-text-sub">
                                            <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Published Articles */}
            <section className="py-16 bg-background-light">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <h2 className="mb-2 text-3xl font-black text-text-main sm:text-4xl">
                                Bài viết của {author.name}
                            </h2>
                            <p className="text-lg text-text-sub">
                                {posts.length} bài viết chuyên môn đã xuất bản
                            </p>
                        </div>
                    </div>

                    {posts.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">article</span>
                            <p className="text-text-sub">Tác giả chưa có bài viết nào.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/tin-tuc/${post.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:border-primary"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-3 text-xs text-text-sub">
                                            <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                                                {post.category}
                                            </span>
                                            <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-text-main line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-text-sub line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-primary to-[#089191] py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
                        Cần tư vấn từ {author.name}?
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                        Đặt lịch hẹn ngay hôm nay để nhận tư vấn chuyên sâu về vấn đề sức khỏe của bạn.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/dat-lich"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-primary shadow-lg transition-all hover:bg-gray-50"
                        >
                            Đặt lịch tư vấn
                        </Link>
                        <a
                            href="tel:+447882843513"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
                        >
                            <span className="material-symbols-outlined mr-2">call</span>
                            +447882843513
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
