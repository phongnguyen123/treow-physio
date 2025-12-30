import { getBookings } from "@/lib/actions/bookings";
import { getPosts, getAllPosts } from "@/lib/actions/posts";
import Link from "next/link";

export default async function AdminPage() {
    const [bookings, posts] = await Promise.all([
        getBookings(),
        getAllPosts()
    ]);

    const pendingBookings = bookings.filter(b => b.status === 'PENDING');
    const publishedPosts = posts.filter(p => p.published);

    return (
        <div className="min-h-screen bg-background-light p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-text-main">Admin Dashboard</h1>
                        <p className="mt-2 text-text-sub">Quản lý bài viết và lịch hẹn</p>
                    </div>
                    <form action="/api/auth/logout" method="POST">
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-text-main transition-colors hover:bg-gray-50"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            Đăng xuất
                        </button>
                    </form>
                </div>

                {/* Stats */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-sub">Lịch hẹn chờ</p>
                                <p className="text-3xl font-black text-primary">{pendingBookings.length}</p>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-primary">event</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-sub">Tổng lịch hẹn</p>
                                <p className="text-3xl font-black text-text-main">{bookings.length}</p>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-text-sub">calendar_month</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-sub">Bài viết đã xuất bản</p>
                                <p className="text-3xl font-black text-text-main">{publishedPosts.length}</p>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-text-sub">article</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-sub">Tổng bài viết</p>
                                <p className="text-3xl font-black text-text-main">{posts.length}</p>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-text-sub">description</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Link
                        href="/admin/bookings"
                        className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-primary-content">event_note</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Quản lý lịch hẹn</h3>
                                <p className="text-sm text-text-sub">Xem và cập nhật trạng thái lịch hẹn</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/posts"
                        className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-primary-content">edit_note</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Quản lý bài viết</h3>
                                <p className="text-sm text-text-sub">Tạo, sửa và xóa bài viết tin tức</p>
                            </div>
                        </div>
                    </Link>

                    {/* Newsletter Card */}
                    <Link
                        href="/admin/newsletter"
                        className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-primary-content">campaign</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Gửi Newsletter</h3>
                                <p className="text-sm text-text-sub">Soạn và gửi email đến người đăng ký</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/authors"
                        className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-primary-content">person</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Quản lý tác giả</h3>
                                <p className="text-sm text-text-sub">Tạo và chỉnh sửa thông tin tác giả</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/settings/email"
                        className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-primary-content">mail</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Cấu hình Email</h3>
                                <p className="text-sm text-text-sub">Thiết lập và kiểm tra gửi mail SMTP</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/seo"
                        className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-primary-content">search</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Cài đặt SEO</h3>
                                <p className="text-sm text-text-sub">Quản lý SEO, sitemap và metadata</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Recent Bookings */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-black text-text-main">Lịch hẹn gần đây</h2>
                        <Link href="/admin/bookings" className="text-sm font-bold text-primary hover:underline">
                            Xem tất cả
                        </Link>
                    </div>

                    {bookings.length === 0 ? (
                        <p className="text-center text-text-sub py-8">Chưa có lịch hẹn nào</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="pb-3 text-left text-sm font-bold text-text-main">Khách hàng</th>
                                        <th className="pb-3 text-left text-sm font-bold text-text-main">Dịch vụ</th>
                                        <th className="pb-3 text-left text-sm font-bold text-text-main">Ngày hẹn</th>
                                        <th className="pb-3 text-left text-sm font-bold text-text-main">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.slice(0, 5).map((booking) => (
                                        <tr key={booking.id} className="border-b border-gray-100">
                                            <td className="py-3 text-sm text-text-main">{booking.fullName}</td>
                                            <td className="py-3 text-sm text-text-sub">{booking.service}</td>
                                            <td className="py-3 text-sm text-text-sub">
                                                {new Date(booking.date).toLocaleDateString('vi-VN')} - {booking.time}
                                            </td>
                                            <td className="py-3">
                                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
