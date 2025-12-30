import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";

export const metadata = {
    title: "Dịch vụ - TREOW Physiotherapy",
    description: "Các dịch vụ vật lý trị liệu chuyên khoa tại TREOW - Cơ xương khớp, Thai kỳ, Nhi khoa, Hô hấp, Sinh lý nam, Đau mãn tính",
};

export default function DichVuPage() {
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
                                Dịch vụ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#089191] to-primary">Chuyên khoa</span>
                            </h1>
                            <p className="text-xl text-text-sub mb-8 leading-relaxed">
                                Chúng tôi cung cấp các dịch vụ vật lý trị liệu chuyên sâu, được thiết kế riêng cho từng nhu cầu sức khỏe của bạn.
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
                                    href="/bang-gia"
                                    className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-8 py-4 font-bold text-primary transition-all hover:bg-primary hover:text-white"
                                >
                                    <span className="material-symbols-outlined">payments</span>
                                    Xem bảng giá
                                </Link>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
                                <Image
                                    src="/dr-duy-services.png"
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

            {/* Services Grid */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {servicesData.map((service) => (
                            <Link
                                key={service.id}
                                href={`/dich-vu/${service.slug}`}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white mb-2">
                                            <span className="material-symbols-outlined text-lg">{service.icon}</span>
                                            Chuyên khoa
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-text-sub line-clamp-2 mb-4">
                                        {service.shortDescription}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span>Tìm hiểu thêm</span>
                                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-primary to-[#089191] py-16 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-20">
                    <img src="/images/team/dr-duy-portrait.jpg" alt="Dr. Duy" className="h-full w-full object-cover" />
                </div>
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
                    <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
                        Không chắc dịch vụ nào phù hợp?
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                        Đặt lịch tư vấn miễn phí với Dr. Duy để được đánh giá và tư vấn phương pháp điều trị phù hợp nhất.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/dat-lich"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-primary shadow-lg transition-all hover:bg-gray-50"
                        >
                            Đặt lịch tư vấn
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
