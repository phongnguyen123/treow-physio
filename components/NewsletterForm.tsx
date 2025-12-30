"use client";

import { useState } from "react";
import Link from "next/link";
import { subscribeToNewsletter } from "@/lib/actions/subscribers";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setStatus(null);

        const result = await subscribeToNewsletter(email);

        if (result.success) {
            setStatus({ success: true, message: "Đăng ký thành công! Cảm ơn bạn." });
            setEmail("");
        } else {
            setStatus({ success: false, message: result.error || "Có lỗi xảy ra." });
        }

        setIsLoading(false);
    };

    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1A4D2E] px-6 py-16 shadow-2xl sm:px-12 lg:px-20">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#4caf50] opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-[#089191] opacity-20 blur-3xl"></div>

                    <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="text-center lg:text-left">
                            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[#4caf50] backdrop-blur-sm">
                                Newsletter
                            </span>
                            <h2 className="mb-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                                Đăng ký nhận tin tức
                            </h2>
                            <p className="text-lg text-gray-300">
                                Nhận những bài viết mới nhất về sức khỏe và vật lý trị liệu qua email của bạn. Không spam, hủy đăng ký bất cứ lúc nào.
                            </p>
                        </div>

                        <div className="lg:w-full lg:max-w-md lg:ml-auto">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl bg-white/5 p-2 backdrop-blur-sm sm:flex-row sm:bg-white/10 sm:p-2.5">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email của bạn..."
                                    required
                                    disabled={isLoading}
                                    className="flex-1 rounded-xl bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none ring-0 focus:bg-white/5 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="shrink-0 rounded-xl bg-[#4caf50] px-8 py-3.5 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#43a047] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Đang xử lý..." : "Đăng ký"}
                                </button>
                            </form>

                            {status && (
                                <div className={`mt-4 p-3 rounded-lg text-sm text-center font-medium ${status.success ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                                    {status.message}
                                </div>
                            )}

                            <p className="mt-4 text-center text-xs text-gray-400 lg:text-left">
                                Bằng cách đăng ký, bạn đồng ý với <Link href="#" className="underline hover:text-white">Điều khoản</Link> & <Link href="#" className="underline hover:text-white">Chính sách</Link> của chúng tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
