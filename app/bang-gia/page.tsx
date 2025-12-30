import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function BangGiaPage() {
    const services = [
        {
            name: "Khám cơ xương khớp lần đầu",
            duration: "1 tiếng",
            price: "Liên hệ",
            icon: "medical_services",
            features: [
                "Thăm khám toàn diện",
                "Đánh giá tình trạng chi tiết",
                "Tư vấn phương pháp điều trị",
                "Xây dựng phác đồ cá nhân hóa"
            ]
        },
        {
            name: "Tái khám điều trị",
            duration: "45 phút",
            price: "Liên hệ",
            icon: "autorenew",
            features: [
                "Theo dõi tiến triển",
                "Điều chỉnh liệu trình",
                "Trị liệu chuyên sâu",
                "Đánh giá hiệu quả"
            ]
        },
        {
            name: "Châm cứu giác hơi",
            duration: "45 phút",
            price: "Liên hệ",
            icon: "spa",
            features: [
                "Y học cổ truyền",
                "Giảm đau tự nhiên",
                "Thư giãn toàn thân",
                "Kích thích tuần hoàn"
            ]
        },
        {
            name: "Trị liệu xung kích",
            duration: "30 phút",
            price: "Liên hệ",
            icon: "bolt",
            features: [
                "Công nghệ hiện đại",
                "Kích thích tái tạo mô",
                "Giảm viêm nhanh chóng",
                "Phục hồi chức năng"
            ]
        },
        {
            name: "Trị liệu xung kích yếu sinh lý nam",
            duration: "20 phút",
            price: "Liên hệ",
            icon: "favorite",
            highlight: true,
            features: [
                "Kích thích tuần hoàn",
                "Tái tạo mạch máu",
                "Bảo mật tuyệt đối",
                "Hiệu quả bền vững"
            ]
        },
        {
            name: "Massage trị liệu",
            duration: "45 phút",
            price: "Liên hệ",
            icon: "self_improvement",
            features: [
                "Kỹ thuật chuyên sâu",
                "Giảm căng cơ",
                "Thư giãn sâu",
                "Cải thiện tuần hoàn"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background-light">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-white overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        {/* Content */}
                        <div className="order-2 lg:order-1">
                            <h1 className="text-4xl font-black text-text-main sm:text-5xl lg:text-6xl mb-6">
                                Bảng giá dịch vụ
                            </h1>
                            <p className="text-xl text-text-sub mb-8 leading-relaxed">
                                Chúng tôi cung cấp các gói dịch vụ vật lý trị liệu chuyên nghiệp với mức giá hợp lý.
                                Mỗi liệu trình được thiết kế riêng biệt để đáp ứng nhu cầu cụ thể của bạn.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/dat-lich"
                                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
                                >
                                    <span className="material-symbols-outlined">event</span>
                                    Đặt lịch ngay
                                </Link>
                                <Link
                                    href="/lien-he"
                                    className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-8 py-4 font-bold text-primary transition-all hover:bg-primary hover:text-white"
                                >
                                    <span className="material-symbols-outlined">call</span>
                                    Liên hệ tư vấn
                                </Link>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
                                <Image
                                    src="/dr-duy-pricing.png"
                                    alt="Dr. Duy - Chuyên gia Vật lý trị liệu"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                                {/* Gradient overlay to fade bottom */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0.98) 35%, rgba(255, 255, 255, 0.95) 45%, rgba(255, 255, 255, 0.9) 55%, rgba(255, 255, 255, 0.8) 65%, rgba(255, 255, 255, 0.6) 75%, rgba(255, 255, 255, 0.35) 85%, rgba(255, 255, 255, 0.15) 95%, transparent 100%)'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gradient Transition */}
            <div
                className="h-32"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 10%, rgba(250, 253, 253, 0.9) 20%, rgba(245, 252, 252, 0.85) 30%, rgba(242, 251, 251, 0.75) 40%, rgba(240, 250, 250, 0.65) 50%, rgba(238, 249, 249, 0.55) 60%, rgba(236, 248, 248, 0.45) 70%, rgba(234, 247, 247, 0.35) 80%, rgba(232, 246, 246, 0.25) 90%, rgba(230, 245, 245, 0.15) 100%)'
                }}
            ></div>

            {/* Pricing Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background-light to-primary/5 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-text-main sm:text-5xl lg:text-6xl">
                            Bảng giá <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#089191] to-primary">Dịch vụ</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-sub">
                            Minh bạch, rõ ràng và cam kết chất lượng điều trị tốt nhất cho cộng đồng người Việt tại London.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 ${service.highlight ? 'border-2 border-primary' : 'border border-gray-200'
                                }`}
                        >
                            {service.highlight && (
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                                        Chuyên biệt
                                    </span>
                                </div>
                            )}
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                                        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-main mb-2">{service.name}</h3>
                                    <p className="text-sm text-text-sub flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">schedule</span>
                                        {service.duration}
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <p className="text-4xl font-black text-primary">{service.price}</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                                            <span className="text-text-sub">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/dat-lich" className="block w-full rounded-lg bg-primary py-3 text-center font-bold text-white transition-all hover:bg-opacity-90">
                                    Đặt lịch ngay
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Note Section */}
                <div className="mt-12 rounded-2xl bg-primary/5 p-8 border border-primary/10">
                    <div className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-primary text-3xl">info</span>
                        <div>
                            <h3 className="font-bold text-text-main mb-2">Lưu ý quan trọng</h3>
                            <ul className="space-y-2 text-text-sub">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-sm mt-1">arrow_right</span>
                                    <span>Giá có thể thay đổi tùy theo tình trạng và liệu trình điều trị</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-sm mt-1">arrow_right</span>
                                    <span>Vui lòng liên hệ để được tư vấn chi tiết về giá và gói dịch vụ phù hợp</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-sm mt-1">arrow_right</span>
                                    <span>Chúng tôi chấp nhận thanh toán tiền mặt và chuyển khoản</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-text-main mb-4">Câu hỏi thường gặp</h2>
                        <p className="text-text-sub">Những thắc mắc phổ biến về dịch vụ của chúng tôi</p>
                    </div>
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-gray-200 p-6 hover:border-primary transition-colors">
                            <h3 className="font-bold text-text-main mb-2">Tôi cần đặt lịch trước không?</h3>
                            <p className="text-text-sub">Có, chúng tôi khuyến khích bạn đặt lịch trước để đảm bảo có thời gian phù hợp. Bạn có thể đặt lịch qua website hoặc gọi hotline.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 hover:border-primary transition-colors">
                            <h3 className="font-bold text-text-main mb-2">Tôi có thể thanh toán bằng thẻ không?</h3>
                            <p className="text-text-sub">Hiện tại chúng tôi chấp nhận thanh toán bằng tiền mặt và chuyển khoản ngân hàng. Chúng tôi đang chuẩn bị hỗ trợ thanh toán thẻ trong thời gian tới.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-16 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-20">
                    <img src="/images/team/dr-duy-portrait.jpg" alt="Dr. Duy" className="h-full w-full object-cover" />
                </div>
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
                    <h2 className="mb-4 text-3xl font-black text-primary-content sm:text-4xl">Sẵn sàng bắt đầu?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg font-medium text-primary-content/80">
                        Đặt lịch hẹn ngay hôm nay để nhận tư vấn miễn phí từ Dr. Duy.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/dat-lich"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-primary shadow-lg transition-all hover:bg-gray-50"
                        >
                            Đặt lịch ngay
                        </Link>
                        <a
                            href="tel:+447882843513"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
                        >
                            <span className="material-symbols-outlined mr-2">call</span>
                            +447882843513
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
