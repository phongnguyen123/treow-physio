import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData.find((s) => s.slug === slug);

    if (!service) {
        return {
            title: "Dịch vụ không tồn tại",
        };
    }

    return {
        title: `${service.title} - TREOW Physiotherapy`,
        description: service.shortDescription,
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background-light">
            <Header />

            {/* Hero Section with Carousel */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background-light to-primary/5 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-6">
                                <span className="material-symbols-outlined text-lg">{service.icon}</span>
                                Dịch vụ chuyên khoa
                            </div>
                            <h1 className="text-4xl font-black text-text-main sm:text-5xl lg:text-6xl mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-text-sub leading-relaxed mb-8 max-w-2xl">
                                {service.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/dat-lich"
                                    className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-opacity-90 hover:-translate-y-0.5"
                                >
                                    Đặt lịch tư vấn
                                </Link>
                                <a
                                    href="tel:+447882843513"
                                    className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-4 text-base font-bold text-primary transition-all hover:bg-primary/5"
                                >
                                    <span className="material-symbols-outlined mr-2">call</span>
                                    +447882843513
                                </a>
                            </div>
                        </div>

                        {/* Image Carousel or Single Image */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                                {slug === 'tieu-hoa' ? (
                                    // Single image for Male Sexual Health service
                                    <img
                                        src="/images/services/sinh-ly-nam-hero.jpg"
                                        alt="Dr. Duy - Chuyên gia sinh lý nam"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    // Carousel for other services
                                    <HeroCarousel
                                        images={[
                                            "/images/team/dr-duy-treating-1.jpg",
                                            "/images/team/dr-duy-treating-2.jpg",
                                            "/images/team/dr-duy-treating-3.jpg"
                                        ]}
                                        className="h-full w-full"
                                    />
                                )}
                            </div>
                            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                            <div className="absolute -z-10 -top-8 -left-8 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                {/* Pain Points & Solutions */}
                <div className="grid gap-8 lg:grid-cols-2 mb-20">
                    {/* Pain Points */}
                    <div className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-t-4 border-red-500 hover:shadow-2xl transition-all duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30">
                                    <span className="material-symbols-outlined text-3xl">error</span>
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-black text-text-main">
                                    {service.painPoints.title}
                                </h2>
                            </div>
                            <ul className="space-y-4">
                                {service.painPoints.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50 transition-all duration-200 group/item">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center group-hover/item:bg-red-200 transition-colors">
                                            <span className="material-symbols-outlined text-red-600 text-xl">cancel</span>
                                        </div>
                                        <span className="text-text-main font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-t-4 border-primary hover:shadow-2xl transition-all duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#089191] text-white shadow-lg shadow-primary/30">
                                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-black text-text-main">
                                    {service.solutions.title}
                                </h2>
                            </div>
                            <ul className="space-y-4">
                                {service.solutions.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-200 group/item">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover/item:bg-primary/30 transition-colors">
                                            <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                        </div>
                                        <span className="text-text-main font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Hiệu quả điều trị</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-text-main mt-3 mb-4">
                            Lợi ích khi điều trị tại TREOW
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-[#089191] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {service.benefits.map((benefit, index) => (
                            <div key={index} className="group relative bg-gradient-to-br from-white to-primary/5 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary/10 overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#089191] text-white mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <span className="material-symbols-outlined text-3xl">check_circle</span>
                                    </div>
                                    <p className="font-bold text-lg text-text-main leading-relaxed">
                                        {benefit}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="mb-20 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl p-8 lg:p-12 border border-primary/10">
                    <div className="text-center mb-12">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Phản hồi từ bệnh nhân</span>
                        <h2 className="text-3xl font-black text-text-main mt-3">
                            Khách hàng nói gì về chúng tôi
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-yellow-400 fill-current">star</span>
                                ))}
                            </div>
                            <p className="text-text-sub italic mb-6 leading-relaxed">
                                "Bác sĩ rất tận tâm và chuyên nghiệp. Tôi đã giảm đau rõ rệt sau vài buổi điều trị. Rất cảm ơn đội ngũ TREOW!"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                </div>
                                <div>
                                    <p className="font-bold text-text-main">Nguyễn Thu Hà</p>
                                    <p className="text-sm text-text-sub">Bệnh nhân điều trị cổ vai gáy</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-yellow-400 fill-current">star</span>
                                ))}
                            </div>
                            <p className="text-text-sub italic mb-6 leading-relaxed">
                                "Phương pháp điều trị hiện đại, không gian sạch sẽ. Dr. Duy rất nhiệt tình và giải thích rõ ràng từng bước."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                </div>
                                <div>
                                    <p className="font-bold text-text-main">Trần Văn Minh</p>
                                    <p className="text-sm text-text-sub">Bệnh nhân điều trị đau lưng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section with Dr. Duy */}
                <div className="relative bg-gradient-to-br from-primary to-[#089191] rounded-3xl p-8 lg:p-12 overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-20">
                        <img src="/images/team/dr-duy-portrait.jpg" alt="Dr. Duy" className="h-full w-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                            Sẵn sàng cải thiện sức khỏe?
                        </h2>
                        <p className="text-lg text-white/90 mb-8 leading-relaxed">
                            Đặt lịch hẹn ngay hôm nay để nhận tư vấn miễn phí từ Dr. Duy. Chúng tôi luôn sẵn sàng lắng nghe và đưa ra giải pháp tốt nhất cho tình trạng của bạn.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/dat-lich"
                                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-primary shadow-lg transition-all hover:bg-gray-50 hover:-translate-y-0.5"
                            >
                                Đặt lịch ngay
                            </Link>
                            <a
                                href="tel:+447882843513"
                                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
                            >
                                <span className="material-symbols-outlined mr-2">call</span>
                                Gọi hotline
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
