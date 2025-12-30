"use client";

import { useState, useEffect } from "react";
import { getBookings, updateBooking, deleteBooking } from "@/lib/actions/bookings";
import { Booking } from "@/types";
import Link from "next/link";

export default function BookingsManagementPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("ALL");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        setLoading(true);
        const data = await getBookings();
        setBookings(data);
        setLoading(false);
    };

    const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
        const result = await updateBooking({ id, status: newStatus });
        if (result.success) {
            await loadBookings();
        } else {
            alert(result.error || 'Không thể cập nhật trạng thái');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa lịch hẹn này?')) return;

        const result = await deleteBooking(id);
        if (result.success) {
            await loadBookings();
        } else {
            alert(result.error || 'Không thể xóa lịch hẹn');
        }
    };

    const filteredBookings = filter === "ALL"
        ? bookings
        : bookings.filter(b => b.status === filter);

    const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        CONFIRMED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        COMPLETED: 'bg-blue-100 text-blue-800'
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
                        <h1 className="text-4xl font-black text-text-main">Quản lý lịch hẹn</h1>
                        <p className="mt-2 text-text-sub">Xem và cập nhật trạng thái lịch hẹn</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex gap-3">
                    {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${filter === status
                                    ? 'bg-primary text-primary-content'
                                    : 'bg-white text-text-main hover:bg-primary/10'
                                }`}
                        >
                            {status === 'ALL' ? 'Tất cả' : status}
                        </button>
                    ))}
                </div>

                {/* Bookings Table */}
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-text-sub">Đang tải...</div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="p-12 text-center text-text-sub">Không có lịch hẹn nào</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-background-light">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-text-main">Khách hàng</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-text-main">Liên hệ</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-text-main">Dịch vụ</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-text-main">Ngày & Giờ</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-text-main">Trạng thái</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-text-main">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="border-t border-gray-100 hover:bg-background-light/50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-text-main">{booking.fullName}</p>
                                                    {booking.message && (
                                                        <p className="text-xs text-text-sub mt-1">{booking.message}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="text-text-main">{booking.phone}</p>
                                                    {booking.email && (
                                                        <p className="text-text-sub">{booking.email}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-text-sub">{booking.service}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="text-text-main">{new Date(booking.date).toLocaleDateString('vi-VN')}</p>
                                                    <p className="text-text-sub">{booking.time}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                                                    className={`rounded-full px-3 py-1 text-xs font-bold border-0 cursor-pointer ${statusColors[booking.status]}`}
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="CONFIRMED">CONFIRMED</option>
                                                    <option value="CANCELLED">CANCELLED</option>
                                                    <option value="COMPLETED">COMPLETED</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                    title="Xóa"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 border border-gray-200">
                        <p className="text-sm text-text-sub">Tổng số</p>
                        <p className="text-2xl font-black text-text-main">{bookings.length}</p>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                        <p className="text-sm text-yellow-800">Chờ xác nhận</p>
                        <p className="text-2xl font-black text-yellow-800">
                            {bookings.filter(b => b.status === 'PENDING').length}
                        </p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                        <p className="text-sm text-green-800">Đã xác nhận</p>
                        <p className="text-2xl font-black text-green-800">
                            {bookings.filter(b => b.status === 'CONFIRMED').length}
                        </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                        <p className="text-sm text-blue-800">Hoàn thành</p>
                        <p className="text-2xl font-black text-blue-800">
                            {bookings.filter(b => b.status === 'COMPLETED').length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
