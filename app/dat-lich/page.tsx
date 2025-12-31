"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createBooking } from "@/lib/actions/bookings";
import { CreateBookingInput } from "@/types";
import { servicesData } from "@/data/services";

// Generate days for the current month (simplified for demo)
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const timeSlots = [
    "08:00", "08:30", "09:00",
    "09:30", "10:00", "10:30",
    "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30"
];

export default function BookingPage() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[0].id);
    const [selectedDate, setSelectedDate] = useState<number>(today.getDate());
    const [selectedTime, setSelectedTime] = useState<string>("09:00");
    const [formData, setFormData] = useState<CreateBookingInput>({
        fullName: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const selectedService = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];

    // Calendar Logic
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const weeks = [];
    let week = Array(startOffset).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }
    if (week.length > 0) weeks.push(week);

    const handleBooking = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            if (!formData.fullName || !formData.phone) {
                setSubmitStatus({ success: false, message: "Vui lòng nhập họ tên và số điện thoại" });
                setIsSubmitting(false);
                return;
            }

            const bookingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);

            // Validate date
            if (bookingDate < new Date(today.setHours(0, 0, 0, 0))) {
                setSubmitStatus({ success: false, message: "Vui lòng chọn ngày trong tương lai" });
                setIsSubmitting(false);
                return;
            }

            const submissionData: CreateBookingInput = {
                ...formData,
                service: selectedService.title,
                date: bookingDate.toISOString(),
                time: selectedTime,
                message: formData.message || "Không có ghi chú"
            };

            const result = await createBooking(submissionData);

            if (result.success) {
                setSubmitStatus({ success: true, message: "Đặt lịch thành công! Chúng tôi sẽ liên hệ sớm." });
                setFormData({
                    fullName: "",
                    phone: "",
                    email: "",
                    service: "",
                    date: "",
                    time: "",
                    message: ""
                });
            } else {
                setSubmitStatus({ success: false, message: result.error || "Có lỗi xảy ra" });
            }
        } catch (error) {
            setSubmitStatus({ success: false, message: "Lỗi kết nối máy chủ" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20 pt-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-text-sub mb-8">
                    <ul className="flex gap-2">
                        <li><Link href="/" className="hover:text-primary">Trang chủ</Link></li>
                        <li>/</li>
                        <li><Link href="/dich-vu" className="hover:text-primary">Dịch vụ</Link></li>
                        <li>/</li>
                        <li className="text-text-main font-semibold">Đặt lịch hẹn</li>
                    </ul>
                </nav>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-text-main mb-4">Đặt lịch hẹn tư vấn & trị liệu</h1>
                    <p className="text-text-sub max-w-3xl text-lg">
                        Chuyên khoa Cơ xương khớp, Thai kỳ, Nhi khoa và Đau mãn tính. Đội ngũ chuyên gia giàu kinh nghiệm sẵn sàng hỗ trợ bạn. Chúng tôi sẽ liên hệ tư vấn và xác nhận lịch hẹn bằng điện thoại trước.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Booking Steps */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Step 1: Services */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                                    1
                                </div>
                                <h2 className="text-2xl font-bold text-text-main">Chọn loại dịch vụ</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Existing Services */}
                                {servicesData.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => setSelectedServiceId(service.id)}
                                        className={`relative group flex gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedServiceId === service.id
                                            ? "border-primary bg-primary/5"
                                            : "border-gray-100 bg-white hover:border-primary/50"
                                            }`}
                                    >
                                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main group-hover:text-primary transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-text-sub mt-1 line-clamp-2">
                                                {service.shortDescription}
                                            </p>
                                        </div>
                                        {/* Checkmark */}
                                        {selectedServiceId === service.id && (
                                            <div className="absolute top-4 right-4 text-primary">
                                                <span className="material-symbols-outlined filled">check_circle</span>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        </section>

                        {/* Step 2: Date & Time */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                                    2
                                </div>
                                <h2 className="text-2xl font-bold text-text-main">Chọn ngày & giờ</h2>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Calendar View */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-lg text-text-main capitalize">
                                                Tháng {currentDate.getMonth() + 1}/{currentDate.getFullYear()}
                                            </h3>
                                            <div className="flex gap-2">
                                                <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 mb-2 text-center text-xs font-semibold text-text-sub uppercase tracking-wider">
                                            <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {/* Weeks mapping logic simplified */}
                                            {weeks.map((week, wIndex) => (
                                                week.map((day: any, dIndex: any) => (
                                                    <div key={`${wIndex}-${dIndex}`} className="aspect-square flex items-center justify-center">
                                                        {day && (
                                                            <button
                                                                onClick={() => setSelectedDate(day)}
                                                                className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${selectedDate === day
                                                                    ? "bg-primary text-white shadow-md shadow-primary/30"
                                                                    : "text-text-main hover:bg-gray-100"
                                                                    }`}
                                                            >
                                                                {day}
                                                            </button>
                                                        )}
                                                    </div>
                                                ))
                                            ))}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-lg text-text-main">
                                                Giờ trống: {selectedDate}/{currentDate.getMonth() + 1}/{currentDate.getFullYear()}
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {timeSlots.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${selectedTime === time
                                                        ? "border-primary bg-primary text-white shadow-md shadow-primary/30"
                                                        : "border-gray-200 text-text-main hover:border-primary hover:text-primary bg-white"
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-start gap-3 bg-primary/5 p-4 rounded-xl">
                                    <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                                    <p className="text-sm text-text-main font-medium">
                                        Vui lòng đến trước 15 phút để làm thủ tục check-in.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Step 3: User Info */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                                    3
                                </div>
                                <h2 className="text-2xl font-bold text-text-main">Thông tin cá nhân</h2>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">Họ và tên</label>
                                        <input
                                            type="text"
                                            placeholder="Nguyễn Văn A"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full rounded-xl border-gray-200 px-4 py-3 text-text-main placeholder-gray-400 focus:border-primary focus:ring-primary outline-none border"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-text-main mb-2">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            placeholder="+447882843513"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full rounded-xl border-gray-200 px-4 py-3 text-text-main placeholder-gray-400 focus:border-primary focus:ring-primary outline-none border"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-text-main mb-2">Email (Không bắt buộc)</label>
                                        <input
                                            type="email"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full rounded-xl border-gray-200 px-4 py-3 text-text-main placeholder-gray-400 focus:border-primary focus:ring-primary outline-none border"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-text-main mb-2">Ghi chú triệu chứng (Không bắt buộc)</label>
                                    <textarea
                                        placeholder="Mô tả ngắn gọn tình trạng đau nhức của bạn..."
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 text-text-main placeholder-gray-400 focus:border-primary focus:ring-primary outline-none border"
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="relative">
                        <div className="sticky top-40 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <h3 className="flex items-center gap-2 text-xl font-bold text-text-main mb-6">
                                <span className="material-symbols-outlined text-primary">receipt_long</span>
                                Thông tin đặt hẹn
                            </h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-green-50 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">medical_services</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1">DỊCH VỤ</p>
                                        <p className="font-bold text-text-main">{selectedService.title}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-green-50 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1">NGÀY</p>
                                        <p className="font-bold text-text-main">
                                            Ngày {selectedDate}/{currentDate.getMonth() + 1}/{currentDate.getFullYear()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-green-50 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1">GIỜ</p>
                                        <p className="font-bold text-text-main">{selectedTime}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-6">
                                <span className="text-text-sub font-medium">Phí tư vấn sơ bộ</span>
                                <span className="text-lg font-black text-text-main">Miễn phí</span>
                            </div>

                            {submitStatus && (
                                <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <button
                                onClick={handleBooking}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform active:scale-95 hover:bg-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
                                {!isSubmitting && <span className="material-symbols-outlined">arrow_forward</span>}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-text-sub font-medium">
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">verified_user</span>
                                    Bảo mật
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">support_agent</span>
                                    Hỗ trợ 24/7
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
