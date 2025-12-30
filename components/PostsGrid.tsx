"use client";

import { useState } from "react";
import Link from "next/link";

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

interface PostsGridProps {
    posts: Post[];
}

export default function PostsGrid({ posts }: PostsGridProps) {
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");

    // Get unique categories
    const categories = ["Tất cả", ...Array.from(new Set(posts.map(p => p.category)))];

    // Filter posts based on selected category
    const filteredPosts = selectedCategory === "Tất cả"
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <>
            {/* Categories Filter */}
            <section className="py-8 bg-background-light">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${category === selectedCategory
                                        ? "bg-primary text-primary-content shadow-lg"
                                        : "bg-white text-text-main hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-text-sub text-lg">Không có bài viết nào trong chuyên mục này</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((article) => (
                                <article
                                    key={article.id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:border-primary"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                                            <Link
                                                href={`/tin-tuc/${article.slug}`}
                                                className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                                            >
                                                Đọc thêm
                                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
