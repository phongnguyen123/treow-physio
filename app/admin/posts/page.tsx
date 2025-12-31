"use client";

import { useState, useEffect } from "react";
import { getAllPosts, createPost, updatePost, deletePost } from "@/lib/actions/posts";
import { getAuthors } from "@/lib/actions/authors";
import { Post, CreatePostInput, Author } from "@/types";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

export default function PostsManagementPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [formData, setFormData] = useState<CreatePostInput>({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: "",
        readTime: "",
        published: true,
        authorId: "default-author"
    });

    const [imageTab, setImageTab] = useState<'upload' | 'url'>('url');
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        loadPosts();
        loadAuthors();
    }, []);

    useEffect(() => {
        // Extract unique categories from posts
        const uniqueCategories = Array.from(new Set(posts.map(p => p.category)));
        setCategories(uniqueCategories);
    }, [posts]);

    const loadPosts = async () => {
        setLoading(true);
        const data = await getAllPosts();
        setPosts(data);
        setLoading(false);
    };

    const loadAuthors = async () => {
        const data = await getAuthors();
        setAuthors(data);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setFormData(prev => ({ ...prev, image: data.url }));
                alert('Upload ảnh thành công!');
            } else {
                alert(data.error || 'Upload thất bại');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi upload ảnh');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPost) {
            const result = await updatePost({ id: editingPost.id, ...formData });
            if (result.success) {
                await loadPosts();
                resetForm();
                alert('Cập nhật bài viết thành công!');
            } else {
                alert(result.error || 'Không thể cập nhật bài viết');
            }
        } else {
            const result = await createPost(formData);
            if (result.success) {
                await loadPosts();
                resetForm();
                alert('Tạo bài viết thành công!');
            } else {
                alert(result.error || 'Không thể tạo bài viết');
            }
        }
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            image: post.image,
            readTime: post.readTime,
            published: post.published,
            authorId: post.authorId
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;

        const result = await deletePost(id);
        if (result.success) {
            await loadPosts();
            alert('Xóa bài viết thành công!');
        } else {
            alert(result.error || 'Không thể xóa bài viết');
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            excerpt: "",
            content: "",
            category: "",
            image: "",
            readTime: "",
            published: true,
            authorId: "default-author"
        });
        setEditingPost(null);
        setShowForm(false);
        setShowNewCategory(false);
        setNewCategory("");
    };

    const handleCategorySelect = (value: string) => {
        if (value === '__new__') {
            setShowNewCategory(true);
            setFormData({ ...formData, category: "" });
        } else {
            setShowNewCategory(false);
            setFormData({ ...formData, category: value });
        }
    };

    const handleAddNewCategory = () => {
        if (newCategory.trim()) {
            const trimmedCategory = newCategory.trim();
            // Add new category to the categories list if it doesn't exist
            if (!categories.includes(trimmedCategory)) {
                setCategories([...categories, trimmedCategory]);
            }
            setFormData({ ...formData, category: trimmedCategory });
            setShowNewCategory(false);
            setNewCategory("");
        }
    };

    return (
        <div className="min-h-screen bg-background-light p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/admin" className="mb-2 inline-flex items-center text-sm text-primary hover:underline">
                            <span className="material-symbols-outlined text-lg mr-1">arrow_back</span>
                            Quay lại Dashboard
                        </Link>
                        <h1 className="text-4xl font-black text-text-main">Quản lý bài viết</h1>
                        <p className="mt-2 text-text-sub">Tạo, sửa và xóa bài viết tin tức</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-content transition-transform hover:scale-105"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Tạo bài viết mới
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8">
                        <h2 className="mb-6 text-2xl font-black text-text-main">
                            {editingPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-text-main">
                                        Tiêu đề <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Tiêu đề bài viết"
                                    />
                                </div>

                                {/* Category Selector */}
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-text-main">
                                        Danh mục <span className="text-red-500">*</span>
                                    </label>
                                    {!showNewCategory ? (
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => handleCategorySelect(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                            <option value="__new__">+ Tạo danh mục mới</option>
                                        </select>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                placeholder="Tên danh mục mới"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddNewCategory}
                                                className="rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-content"
                                            >
                                                Thêm
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowNewCategory(false);
                                                    setNewCategory("");
                                                }}
                                                className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-bold text-text-main"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Author Selector */}
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-text-main">
                                        Tác giả
                                    </label>
                                    <select
                                        value={formData.authorId || ""}
                                        onChange={(e) => setFormData({ ...formData, authorId: e.target.value || "default-author" })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="">Không chọn tác giả</option>
                                        {authors.map((author) => (
                                            <option key={author.id} value={author.id}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-text-main">
                                    Mô tả ngắn <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Mô tả ngắn gọn về bài viết"
                                />
                            </div>

                            {/* Rich Text Editor */}
                            <div>
                                <label className="mb-2 block text-sm font-bold text-text-main">
                                    Nội dung <span className="text-red-500">*</span>
                                </label>
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={(value) => setFormData({ ...formData, content: value })}
                                    placeholder="Nội dung đầy đủ của bài viết..."
                                />
                            </div>

                            {/* Image Upload/URL */}
                            <div>
                                <label className="mb-2 block text-sm font-bold text-text-main">
                                    Hình ảnh <span className="text-red-500">*</span>
                                </label>

                                {/* Tabs */}
                                <div className="mb-3 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setImageTab('url')}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${imageTab === 'url'
                                            ? 'bg-primary text-primary-content'
                                            : 'bg-gray-100 text-text-main hover:bg-gray-200'
                                            }`}
                                    >
                                        URL hình ảnh
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageTab('upload')}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${imageTab === 'upload'
                                            ? 'bg-primary text-primary-content'
                                            : 'bg-gray-100 text-text-main hover:bg-gray-200'
                                            }`}
                                    >
                                        Tải lên
                                    </button>
                                </div>

                                {imageTab === 'url' ? (
                                    <input
                                        type="url"
                                        required
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                ) : (
                                    <div className="space-y-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                        {uploading && <p className="text-sm text-text-sub">Đang upload...</p>}
                                    </div>
                                )}

                                {/* Image Preview */}
                                {formData.image && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-sm font-medium text-text-sub">Preview:</p>
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-text-main">
                                    Thời gian đọc <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="5 phút đọc"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="published" className="text-sm font-medium text-text-main">
                                    Xuất bản ngay
                                </label>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-content transition-all hover:bg-opacity-90"
                                >
                                    {editingPost ? 'Cập nhật' : 'Tạo bài viết'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-bold text-text-main transition-all hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Posts List */}
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-text-sub">Đang tải...</div>
                    ) : posts.length === 0 ? (
                        <div className="p-12 text-center text-text-sub">Chưa có bài viết nào</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <div key={post.id} className="p-6 hover:bg-background-light/50 transition-colors">
                                    <div className="flex gap-6">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-24 w-32 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-text-main">{post.title}</h3>
                                                    <div className="mt-1 flex items-center gap-3 text-xs text-text-sub">
                                                        <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                                                            {post.category}
                                                        </span>
                                                        <span>{post.readTime}</span>
                                                        <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                                                        <span className={`font-bold ${post.published ? 'text-green-600' : 'text-gray-500'}`}>
                                                            {post.published ? 'Đã xuất bản' : 'Nháp'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(post)}
                                                        className="text-primary hover:text-primary/80 transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="text-red-600 hover:text-red-800 transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-text-sub line-clamp-2">{post.excerpt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 border border-gray-200">
                        <p className="text-sm text-text-sub">Tổng số bài viết</p>
                        <p className="text-2xl font-black text-text-main">{posts.length}</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                        <p className="text-sm text-green-800">Đã xuất bản</p>
                        <p className="text-2xl font-black text-green-800">
                            {posts.filter(p => p.published).length}
                        </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                        <p className="text-sm text-gray-800">Bản nháp</p>
                        <p className="text-2xl font-black text-gray-800">
                            {posts.filter(p => !p.published).length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
