'use client';

import { useState } from 'react';
import Link from 'next/link';
import TipTapEditor from '@/components/RichTextEditor';
import { sendNewsletter } from '@/lib/actions/newsletter';

export default function NewsletterPage() {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [result, setResult] = useState<{
        success?: boolean;
        sentCount?: number;
        totalCount?: number;
        message?: string
    } | null>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!confirm('Bạn có chắc chắn muốn gửi email này cho tất cả người đăng ký?')) return;

        setIsSending(true);
        setResult(null);

        try {
            const res = await sendNewsletter({ subject, content });

            if (res.success) {
                setResult({
                    success: true,
                    sentCount: res.sentCount,
                    totalCount: res.totalCount,
                    message: `Đã gửi thành công ${res.sentCount}/${res.totalCount} email.`
                });
                if (res.sentCount === res.totalCount) {
                    setSubject('');
                    setContent('');
                }
            } else {
                setResult({
                    success: false,
                    message: res.errors.join('\n') || 'Gửi thất bại.'
                });
            }
        } catch (error) {
            setResult({ success: false, message: 'Lỗi kết nối hoặc hệ thống.' });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/admin" className="font-bold text-xl text-primary">Admin Dashboard</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Soạn Newsletter</h1>
                    <Link href="/admin" className="text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Quay lại
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <form onSubmit={handleSend} className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Tiêu đề Email
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Nhập tiêu đề hấp dẫn..."
                                required
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-3 px-4 text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Nội dung (HTML)
                            </label>
                            <TipTapEditor
                                value={content}
                                onChange={setContent}
                                placeholder="Soạn nội dung email tại đây..."
                            />
                        </div>

                        {result && (
                            <div className={`p-4 rounded-lg text-sm font-medium whitespace-pre-line ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {result.message}
                            </div>
                        )}

                        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isSending || !subject || !content}
                                className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSending ? (
                                    <>
                                        <span className="animate-spin material-symbols-outlined">refresh</span>
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">send</span>
                                        Gửi cho tất cả người đăng ký
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
