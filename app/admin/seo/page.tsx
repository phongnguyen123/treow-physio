"use client";

import { useState, useEffect } from "react";
import { SeoSettings } from "@/lib/actions/seo-settings";

export default function SeoSettingsPage() {
    const [settings, setSettings] = useState<SeoSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'general' | 'social' | 'analytics' | 'scripts' | 'technical'>('general');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/admin/seo-settings');
            const data = await response.json();
            setSettings(data);
        } catch (error) {
            console.error('Error fetching SEO settings:', error);
            setMessage({ type: 'error', text: 'Không thể tải cài đặt SEO' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const response = await fetch('/api/admin/seo-settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Đã lưu cài đặt SEO thành công!' });
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            console.error('Error saving SEO settings:', error);
            setMessage({ type: 'error', text: 'Không thể lưu cài đặt SEO' });
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: keyof SeoSettings, value: any) => {
        if (settings) {
            setSettings({ ...settings, [field]: value });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-text-sub">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">Không thể tải cài đặt SEO</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-text-main mb-2">Cài đặt SEO</h1>
                    <p className="text-text-sub">Quản lý tất cả các thông số SEO, sitemap và metadata của website</p>
                </div>

                {/* Message */}
                {message && (
                    <div className={`mb-6 rounded-lg p-4 ${message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">
                                {message.type === 'success' ? 'check_circle' : 'error'}
                            </span>
                            <p>{message.text}</p>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="flex gap-8">
                        {[
                            { id: 'general', label: 'Thông tin chung', icon: 'info' },
                            { id: 'social', label: 'Mạng xã hội', icon: 'share' },
                            { id: 'analytics', label: 'Analytics & Xác thực', icon: 'analytics' },
                            { id: 'scripts', label: 'Scripts & Quảng cáo', icon: 'code' },
                            { id: 'technical', label: 'Kỹ thuật SEO', icon: 'settings' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-primary text-primary font-bold'
                                    : 'border-transparent text-text-sub hover:text-text-main'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Thông tin Website</h2>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Tên Website *
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.siteName}
                                            onChange={(e) => updateField('siteName', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            URL Website *
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.siteUrl}
                                            onChange={(e) => updateField('siteUrl', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="https://treowclinic.com"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Mô tả Website *
                                        </label>
                                        <textarea
                                            value={settings.siteDescription}
                                            onChange={(e) => updateField('siteDescription', e.target.value)}
                                            rows={3}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="Mô tả ngắn gọn về website (150-160 ký tự)"
                                            required
                                        />
                                        <p className="mt-1 text-xs text-text-sub">
                                            {settings.siteDescription.length}/160 ký tự
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Từ khóa chính
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.siteKeywords}
                                            onChange={(e) => updateField('siteKeywords', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="vật lý trị liệu, physiotherapy, cơ xương khớp"
                                        />
                                        <p className="mt-1 text-xs text-text-sub">
                                            Phân cách bằng dấu phẩy
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Ngôn ngữ mặc định
                                        </label>
                                        <select
                                            value={settings.defaultLanguage}
                                            onChange={(e) => updateField('defaultLanguage', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                        >
                                            <option value="vi-VN">Tiếng Việt (vi-VN)</option>
                                            <option value="en-US">English (en-US)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Thông tin Liên hệ</h2>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Email liên hệ
                                        </label>
                                        <input
                                            type="email"
                                            value={settings.contactEmail}
                                            onChange={(e) => updateField('contactEmail', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="contact@treowclinic.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            value={settings.contactPhone}
                                            onChange={(e) => updateField('contactPhone', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="+447882843513"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.address}
                                            onChange={(e) => updateField('address', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="123 Main Street, London, UK"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Hình ảnh & Branding</h2>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Logo (đường dẫn)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.logo}
                                            onChange={(e) => updateField('logo', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="/logo.png"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Favicon (đường dẫn)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.favicon}
                                            onChange={(e) => updateField('favicon', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="/favicon.ico"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            OG Image mặc định (1200x630px)
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.ogImage}
                                            onChange={(e) => updateField('ogImage', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="/og-image.jpg"
                                        />
                                        <p className="mt-1 text-xs text-text-sub">
                                            Hình ảnh này sẽ hiển thị khi chia sẻ website lên mạng xã hội
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Tab */}
                    {activeTab === 'social' && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-text-main mb-6">Mạng Xã Hội</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-text-main mb-2">
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-500">share</span>
                                            Twitter Handle
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.twitterHandle}
                                        onChange={(e) => updateField('twitterHandle', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                        placeholder="@treow"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-text-main mb-2">
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-600">share</span>
                                            Facebook Page URL
                                        </span>
                                    </label>
                                    <input
                                        type="url"
                                        value={settings.facebookPage}
                                        onChange={(e) => updateField('facebookPage', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                        placeholder="https://facebook.com/treow"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-text-main mb-2">
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-700">share</span>
                                            LinkedIn Page URL
                                        </span>
                                    </label>
                                    <input
                                        type="url"
                                        value={settings.linkedinPage}
                                        onChange={(e) => updateField('linkedinPage', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                        placeholder="https://linkedin.com/company/treow"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Google Analytics & Tag Manager</h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Google Analytics ID
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.googleAnalyticsId}
                                            onChange={(e) => updateField('googleAnalyticsId', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono"
                                            placeholder="G-XXXXXXXXXX"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Google Tag Manager ID
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.googleTagManagerId}
                                            onChange={(e) => updateField('googleTagManagerId', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono"
                                            placeholder="GTM-XXXXXXX"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Mã Xác Thực (Verification)</h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Google Site Verification
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.googleSiteVerification}
                                            onChange={(e) => updateField('googleSiteVerification', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono"
                                            placeholder="google-site-verification=..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Bing Webmaster Verification
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.bingWebmasterVerification}
                                            onChange={(e) => updateField('bingWebmasterVerification', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono"
                                            placeholder="msvalidate.01=..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Facebook Domain Verification
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.facebookDomainVerification}
                                            onChange={(e) => updateField('facebookDomainVerification', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono"
                                            placeholder="facebook-domain-verification=..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Scripts & Ads Tab */}
                    {activeTab === 'scripts' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Custom Scripts</h2>
                                <p className="text-sm text-text-sub mb-6">
                                    Thêm custom code vào các vị trí khác nhau trên website. Hỗ trợ HTML, JavaScript, CSS.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">code</span>
                                                Header Code (trước &lt;/head&gt;)
                                            </span>
                                        </label>
                                        <p className="text-xs text-text-sub mb-2">
                                            Code sẽ được chèn vào cuối thẻ &lt;head&gt;. Thích hợp cho: meta tags, CSS, fonts, analytics.
                                        </p>
                                        <textarea
                                            value={settings.customHeaderCode}
                                            onChange={(e) => updateField('customHeaderCode', e.target.value)}
                                            rows={8}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono text-sm"
                                            placeholder="<!-- Google Analytics, Facebook Pixel, etc. -->"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">code</span>
                                                Body Code (sau &lt;body&gt;)
                                            </span>
                                        </label>
                                        <p className="text-xs text-text-sub mb-2">
                                            Code sẽ được chèn ngay sau thẻ &lt;body&gt;. Thích hợp cho: Google Tag Manager (noscript).
                                        </p>
                                        <textarea
                                            value={settings.customBodyCode}
                                            onChange={(e) => updateField('customBodyCode', e.target.value)}
                                            rows={8}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono text-sm"
                                            placeholder="<!-- GTM noscript, etc. -->"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">code</span>
                                                Footer Code (trước &lt;/body&gt;)
                                            </span>
                                        </label>
                                        <p className="text-xs text-text-sub mb-2">
                                            Code sẽ được chèn trước thẻ &lt;/body&gt;. Thích hợp cho: scripts, chat widgets, analytics.
                                        </p>
                                        <textarea
                                            value={settings.customFooterCode}
                                            onChange={(e) => updateField('customFooterCode', e.target.value)}
                                            rows={8}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono text-sm"
                                            placeholder="<!-- Chat widgets, additional scripts, etc. -->"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Quảng cáo trong bài viết</h2>
                                <p className="text-sm text-text-sub mb-6">
                                    Chèn code quảng cáo (Google AdSense, banner, etc.) vào giữa các bài viết tin tức.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-yellow-600">ads_click</span>
                                                In-Article Ad Code
                                            </span>
                                        </label>
                                        <p className="text-xs text-text-sub mb-2">
                                            Code quảng cáo sẽ được tự động chèn vào vị trí đã chọn trong bài viết.
                                        </p>
                                        <textarea
                                            value={settings.inArticleAdCode}
                                            onChange={(e) => updateField('inArticleAdCode', e.target.value)}
                                            rows={10}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono text-sm"
                                            placeholder="<!-- Google AdSense code, banner code, etc. -->"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Vị trí hiển thị quảng cáo
                                        </label>
                                        <select
                                            value={settings.inArticleAdPosition}
                                            onChange={(e) => updateField('inArticleAdPosition', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                        >
                                            <option value="top">Đầu bài viết (sau tiêu đề)</option>
                                            <option value="middle">Giữa bài viết (50% nội dung)</option>
                                            <option value="bottom">Cuối bài viết (trước author box)</option>
                                        </select>
                                        <p className="mt-2 text-xs text-text-sub">
                                            Chọn vị trí hiển thị quảng cáo trong bài viết. Vị trí "Giữa bài viết" thường có CTR tốt nhất.
                                        </p>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-yellow-600 text-xl">info</span>
                                            <div className="text-sm">
                                                <p className="font-bold text-yellow-900 mb-1">Lưu ý quan trọng</p>
                                                <ul className="text-yellow-800 space-y-1 list-disc list-inside">
                                                    <li>Quá nhiều quảng cáo có thể ảnh hưởng đến trải nghiệm người dùng</li>
                                                    <li>Google Discover ưu tiên nội dung ít quảng cáo</li>
                                                    <li>Đảm bảo quảng cáo không ảnh hưởng đến Core Web Vitals (CLS)</li>
                                                    <li>Tuân thủ chính sách của Google AdSense nếu sử dụng</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Technical Tab */}
                    {activeTab === 'technical' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Robots.txt</h2>

                                <div>
                                    <label className="block text-sm font-bold text-text-main mb-2">
                                        Nội dung robots.txt
                                    </label>
                                    <textarea
                                        value={settings.robotsTxt}
                                        onChange={(e) => updateField('robotsTxt', e.target.value)}
                                        rows={8}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Sitemap</h2>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-text-main">Bật Sitemap</p>
                                            <p className="text-sm text-text-sub">Tạo sitemap.xml tự động</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.sitemapEnabled}
                                                onChange={(e) => updateField('sitemapEnabled', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-text-main">Bật News Sitemap</p>
                                            <p className="text-sm text-text-sub">Tạo news-sitemap.xml cho Google News</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.newsSitemapEnabled}
                                                onChange={(e) => updateField('newsSitemapEnabled', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Tần suất cập nhật Sitemap
                                        </label>
                                        <select
                                            value={settings.sitemapUpdateFrequency}
                                            onChange={(e) => updateField('sitemapUpdateFrequency', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                        >
                                            <option value="always">Always</option>
                                            <option value="hourly">Hourly</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Số lượng URL tối đa trong Sitemap
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.maxSitemapEntries}
                                            onChange={(e) => updateField('maxSitemapEntries', parseInt(e.target.value))}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            min="100"
                                            max="50000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Tính năng SEO</h2>

                                <div className="space-y-4">
                                    {[
                                        { key: 'enableStructuredData', label: 'Structured Data (JSON-LD)', desc: 'Bật schema markup cho Article, Person, Organization' },
                                        { key: 'enableOpenGraph', label: 'OpenGraph Tags', desc: 'Bật meta tags cho Facebook, LinkedIn' },
                                        { key: 'enableTwitterCards', label: 'Twitter Cards', desc: 'Bật meta tags cho Twitter' },
                                        { key: 'enableCanonicalUrls', label: 'Canonical URLs', desc: 'Tự động thêm canonical URL cho mọi trang' },
                                        { key: 'enableBreadcrumbs', label: 'Breadcrumbs Schema', desc: 'Bật breadcrumb structured data' }
                                    ].map(feature => (
                                        <div key={feature.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                            <div>
                                                <p className="font-bold text-text-main">{feature.label}</p>
                                                <p className="text-sm text-text-sub">{feature.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings[feature.key as keyof SeoSettings] as boolean}
                                                    onChange={(e) => updateField(feature.key as keyof SeoSettings, e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-text-main mb-6">Mặc định & Khác</h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Tác giả mặc định
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.defaultAuthor}
                                            onChange={(e) => updateField('defaultAuthor', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="TREOW"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Copyright Text
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.copyrightText}
                                            onChange={(e) => updateField('copyrightText', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="© 2025 TREOW Physiotherapy. All rights reserved."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Privacy Policy URL
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.privacyPolicyUrl}
                                            onChange={(e) => updateField('privacyPolicyUrl', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="/chinh-sach-bao-mat"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">
                                            Terms of Service URL
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.termsOfServiceUrl}
                                            onChange={(e) => updateField('termsOfServiceUrl', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                                            placeholder="/dieu-khoan-dich-vu"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="text-sm text-text-sub">
                            Cập nhật lần cuối: {new Date(settings.updatedAt).toLocaleString('vi-VN')}
                        </div>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">save</span>
                                    Lưu cài đặt
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
