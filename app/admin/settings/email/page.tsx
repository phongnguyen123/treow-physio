'use client';

import { useState, useEffect } from 'react';
import { testSmtpConnection } from '@/lib/actions/email';
import { getSettings, addAdminEmail, removeAdminEmail } from '@/lib/actions/settings';
import Link from 'next/link';
import Image from 'next/image';

export default function SmtpSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);
    const [adminEmails, setAdminEmails] = useState<string[]>([]);
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        const settings = await getSettings();
        if (settings.email?.adminEmails) {
            setAdminEmails(settings.email.adminEmails);
        }

        // Fill SMTP fields if available
        const userInput = document.getElementById('smtpUser') as HTMLInputElement;
        const passInput = document.getElementById('smtpPass') as HTMLInputElement;
        if (userInput && settings.email?.smtpUser) userInput.value = settings.email.smtpUser;
        if (passInput && settings.email?.smtpPass) passInput.value = settings.email.smtpPass;
    }

    async function handleAddEmail() {
        if (!newEmail) return;
        setIsLoading(true);
        const res = await addAdminEmail(newEmail);
        if (res.success) {
            setNewEmail('');
            loadSettings();
            setResult({ success: true, message: 'Đã thêm email thành công' });
        } else {
            setResult({ success: false, error: res.error || 'Lỗi khi thêm email' });
        }
        setIsLoading(false);
    }

    async function handleRemoveEmail(email: string) {
        if (!confirm(`Bạn có chắc muốn xóa email ${email}?`)) return;
        setIsLoading(true);
        const res = await removeAdminEmail(email);
        if (res.success) {
            loadSettings();
            setResult({ success: true, message: 'Đã xóa email thành công' });
        } else {
            setResult({ success: false, error: res.error || 'Lỗi khi xóa email' });
        }
        setIsLoading(false);
    }

    async function handleSaveSettings(formData: FormData) {
        setIsLoading(true);
        setResult(null);

        const smtpUser = formData.get('smtpUser') as string;
        const smtpPass = formData.get('smtpPass') as string;

        try {
            const { updateSettings } = await import('@/lib/actions/settings');
            const res = await updateSettings({
                email: {
                    adminEmails,
                    smtpUser,
                    smtpPass
                }
            });

            if (res.success) {
                setResult({ success: true, message: 'Đã lưu cấu hình thành công' });
            } else {
                setResult({ success: false, error: 'Lỗi khi lưu cấu hình' });
            }
        } catch (e) {
            setResult({ success: false, error: 'Lỗi hệ thống' });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setResult(null);

        const smtpUser = formData.get('smtpUser') as string;
        const smtpPass = formData.get('smtpPass') as string;
        const toEmail = formData.get('toEmail') as string;

        try {
            const res = await testSmtpConnection({ smtpUser, smtpPass, toEmail });
            setResult(res);
        } catch (error) {
            setResult({ success: false, error: 'Đã xảy ra lỗi không xác định.' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Simple Admin Header for context if layout is missing or simple */}
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

            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Admin Email Management Section */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Email nhận thông báo
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>Danh sách các email sẽ nhận được thông báo khi có khách hàng đặt lịch mới.</p>
                            </div>

                            <div className="mt-5">
                                <form className="flex gap-2" action={() => { }}>
                                    <input
                                        type="email"
                                        placeholder="Nhập email admin..."
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="flex-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddEmail}
                                        disabled={!newEmail || isLoading}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                                    >
                                        Thêm
                                    </button>
                                </form>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {adminEmails.length === 0 ? (
                                        <p className="text-sm text-gray-400 italic">Chưa có email nào được cấu hình.</p>
                                    ) : (
                                        adminEmails.map((email) => (
                                            <div key={email} className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                                                {email}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveEmail(email)}
                                                    className="ml-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
                                                >
                                                    <span className="sr-only">Remove large option</span>
                                                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SMTP Configuration Section */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Cấu hình SMTP (Gmail)
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>Cấu hình tài khoản gửi mail. Bạn cần bật "2-Step Verification" và tạo "App Password".</p>
                            </div>

                            <form className="mt-5 space-y-6">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700">
                                            SMTP User (Gmail)
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                name="smtpUser"
                                                id="smtpUser"
                                                required
                                                placeholder="example@gmail.com"
                                                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="smtpPass" className="block text-sm font-medium text-gray-700">
                                            SMTP App Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="password"
                                                name="smtpPass"
                                                id="smtpPass"
                                                required
                                                placeholder="xxxx xxxx xxxx xxxx"
                                                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="toEmail" className="block text-sm font-medium text-gray-700">
                                            Gửi thử đến Email
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                name="toEmail"
                                                id="toEmail"
                                                placeholder="admin@example.com"
                                                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        formAction={handleSaveSettings}
                                        disabled={isLoading}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        {isLoading ? 'Đang lưu...' : 'Lưu cấu hình'}
                                    </button>
                                    <button
                                        formAction={handleSubmit}
                                        disabled={isLoading}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        {isLoading ? 'Đang kiểm tra...' : 'Test Kết nối'}
                                    </button>
                                </div>
                            </form>

                            {result && (
                                <div className={`mt-6 p-4 rounded-md ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <span className={`material-symbols-outlined ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                                                {result.success ? 'check_circle' : 'error'}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className={`text-sm font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                                                {result.success ? 'Thành công' : 'Thất bại'}
                                            </h3>
                                            <div className={`mt-2 text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                                                <p>{result.success ? result.message : result.error}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link href="/admin" className="text-primary hover:text-primary-dark hover:underline flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Quay lại Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
