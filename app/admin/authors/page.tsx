"use client";

import { useState, useEffect } from "react";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "@/lib/actions/authors";
import { Author, CreateAuthorInput } from "@/types";
import Link from "next/link";

export default function AuthorsManagementPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
    const [formData, setFormData] = useState<CreateAuthorInput>({
        name: "",
        role: "Bác sỹ Vật lý trị liệu",
        avatar: "",
        bio: "",
        socialLinks: {
            facebook: "",
            linkedin: "",
            twitter: ""
        }
    });
    const [imageTab, setImageTab] = useState<'upload' | 'url'>('url');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadAuthors();
    }, []);

    const loadAuthors = async () => {
        setLoading(true);
        const data = await getAuthors();
        setAuthors(data);
        setLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload,
            });

            const data = await response.json();

            if (response.ok) {
                setFormData(prev => ({ ...prev, avatar: data.url }));
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

        if (editingAuthor) {
            const result = await updateAuthor({ id: editingAuthor.id, ...formData });
            if (result.success) {
                await loadAuthors();
                resetForm();
                alert('Cập nhật tác giả thành công!');
            } else {
                alert(result.error || 'Không thể cập nhật tác giả');
            }
        } else {
            const result = await createAuthor(formData);
            if (result.success) {
                await loadAuthors();
                resetForm();
                alert('Tạo tác giả thành công!');
            } else {
                alert(result.error || 'Không thể tạo tác giả');
            }
        }
    };

    const handleEdit = (author: Author) => {
        setEditingAuthor(author);
        setFormData({
            name: author.name,
            role: author.role,
            avatar: author.avatar,
            bio: author.bio,
            socialLinks: author.socialLinks
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa tác giả này?')) return;

        const result = await deleteAuthor(id);
        if (result.success) {
            await loadAuthors();
            alert('Xóa tác giả thành công!');
        } else {
            alert(result.error || 'Không thể xóa tác giả');
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            role: "Bác sỹ Vật lý trị liệu",
            avatar: "",
            bio: "",
            socialLinks: {
                facebook: "",
                linkedin: "",
                twitter: ""
            }
        });
        setEditingAuthor(null);
        setShowForm(false);
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
                        <h1 className="text-4xl font-black text-text-main">Quản lý tác giả</h1>
                        <p className="mt-2 text-text-sub">Tạo, sửa và xóa tác giả bài viết</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-content transition-transform hover:scale-105"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Tạo tác giả mới
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8">
                        <h2 className="mb-6 text-2xl font-black text-text-main">
                            {editingAuthor ? 'Chỉnh sửa tác giả' : 'Tạo tác giả mới'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-text-main">
                                        Tên tác giả <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Tên tác giả"
                                    />
                                </div>
                            </div>

                            {/* Avatar Upload/URL */}
                            <div>
                                <label className="mb-2 block text-sm font-bold text-text-main">
                                    Ảnh đại diện <span className="text-red-500">*</span>
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
                                        value={formData.avatar}
                                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="https://example.com/avatar.jpg"
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

                                {/* Avatar Preview */}
                                {formData.avatar && (
                                    <div className="mt-3 flex items-center gap-3">
                                        <p className="text-sm font-medium text-text-sub">Preview:</p>
                                        <img
                                            src={formData.avatar}
                                            alt="Avatar preview"
                                            className="h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-text-main">
                                    Tiểu sử <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Giới thiệu ngắn gọn về tác giả"
                                />
                            </div>

                            {/* Social Links */}
                            <div>
                                <label className="mb-3 block text-sm font-bold text-text-main">
                                    Liên kết mạng xã hội
                                </label>
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-xs text-text-sub">Facebook</label>
                                        <input
                                            type="url"
                                            value={formData.socialLinks?.facebook || ""}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                                            })}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="https://facebook.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs text-text-sub">LinkedIn</label>
                                        <input
                                            type="url"
                                            value={formData.socialLinks?.linkedin || ""}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                                            })}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs text-text-sub">Twitter</label>
                                        <input
                                            type="url"
                                            value={formData.socialLinks?.twitter || ""}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                                            })}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="https://twitter.com/..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-content transition-all hover:bg-opacity-90"
                                >
                                    {editingAuthor ? 'Cập nhật' : 'Tạo tác giả'}
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

                {/* Authors List */}
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-text-sub">Đang tải...</div>
                    ) : authors.length === 0 ? (
                        <div className="p-12 text-center text-text-sub">Chưa có tác giả nào</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {authors.map((author) => (
                                <div key={author.id} className="p-6 hover:bg-background-light/50 transition-colors">
                                    <div className="flex gap-6">
                                        <img
                                            src={author.avatar}
                                            alt={author.name}
                                            className="h-20 w-20 rounded-full object-cover border-2 border-primary/20"
                                        />
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-text-main">{author.name}</h3>
                                                    <p className="mt-1 text-sm text-text-sub line-clamp-2">{author.bio}</p>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        {author.socialLinks?.facebook && (
                                                            <a href={author.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                                                Facebook
                                                            </a>
                                                        )}
                                                        {author.socialLinks?.linkedin && (
                                                            <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                                                LinkedIn
                                                            </a>
                                                        )}
                                                        {author.socialLinks?.twitter && (
                                                            <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                                                Twitter
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(author)}
                                                        className="text-primary hover:text-primary/80 transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(author.id)}
                                                        className="text-red-600 hover:text-red-800 transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-6 rounded-lg bg-white p-6 border border-gray-200">
                    <p className="text-sm text-text-sub">Tổng số tác giả</p>
                    <p className="text-3xl font-black text-text-main">{authors.length}</p>
                </div>
            </div>
        </div>
    );
}
