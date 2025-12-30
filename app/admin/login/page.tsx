"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log('Attempting login with:', formData.username);
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                console.log('Login successful, redirecting...');
                // Use window.location for hard redirect to ensure middleware runs
                window.location.href = "/admin";
            } else {
                console.error('Login failed:', data.error);
                setError(data.error || "Đăng nhập thất bại");
            }
        } catch (err) {
            console.error('Login error:', err);
            setError("Có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light">
            <div className="w-full max-w-md p-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/logo.png"
                            alt="TREDOV"
                            width={252}
                            height={84}
                            className="h-20 w-auto"
                        />
                    </div>

                    <h1 className="text-2xl font-black text-text-main text-center mb-2">
                        Đăng nhập Admin
                    </h1>
                    <p className="text-text-sub text-center mb-8">
                        Vui lòng đăng nhập để tiếp tục
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="admin"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-content py-3 rounded-lg font-bold transition-all hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm text-primary hover:underline"
                        >
                            ← Quay lại trang chủ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
