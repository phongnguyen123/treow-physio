import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";

export const metadata: Metadata = {
    title: "Về chúng tôi - Phòng khám Vật lý trị liệu Treow",
    description: "Treow - Phòng khám vật lý trị liệu của người Việt tại London. Chăm sóc sức khỏe toàn diện với đội ngũ chuyên gia tận tâm.",
};

export default function AboutPage() {

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h1 className="text-4xl lg:text-5xl font-black text-text-main leading-tight mb-6">
                                Phòng khám Vật lý trị liệu Treow: <br />
                                <span className="text-primary">Chăm sóc sức khỏe Việt Nam tại London</span>
                            </h1>
                            <p className="text-lg text-text-sub mb-8 leading-relaxed">
                                Chúng tôi là đội ngũ bác sĩ vật lý trị liệu người Việt, chuyên môn cao, tận tâm, mang đến dịch vụ chăm sóc sức khỏe toàn diện cho cộng đồng tại London. Sự thấu hiểu văn hóa và ngôn ngữ là cầu nối giúp chúng tôi điều trị hiệu quả nhất cho bạn.
                            </p>
                            <Link href="/dat-lich" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-opacity-90 hover:-translate-y-0.5">
                                Đặt lịch tư vấn ngay
                            </Link>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500">
                                <HeroCarousel
                                    images={[
                                        "/images/team/dr-duy-treating-1.jpg",
                                        "/images/team/dr-duy-treating-2.jpg",
                                        "/images/team/dr-duy-treating-3.jpg"
                                    ]}
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-primary/10 rounded-3xl transform rotate-3"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 lg:py-24 bg-primary/5">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Tầm nhìn của chúng tôi</span>
                    <h2 className="text-3xl lg:text-4xl font-black text-text-main mb-8">Sứ mệnh mang sức khỏe về nhà</h2>
                    <p className="text-xl text-text-sub leading-relaxed mb-6">
                        Tại Treow, sứ mệnh của chúng tôi là xóa bỏ rào cản ngôn ngữ và văn hóa trong chăm sóc y tế tại London. Chúng tôi khao khát xây dựng một điểm tựa sức khỏe tin cậy, nơi người Việt được chăm sóc bằng chuyên môn chuẩn quốc tế và sự ân cần như người nhà.
                    </p>
                    <p className="text-lg text-text-sub leading-relaxed">
                        Chúng tôi không chỉ chữa trị triệu chứng, mà còn đồng hành cùng bạn trên hành trình kiến tạo lối sống khỏe mạnh bền vững.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-text-main mb-4">Giá trị cốt lõi</h2>
                        <p className="text-text-sub max-w-2xl mx-auto">Kim chỉ nam cho mọi hoạt động điều trị và chăm sóc tại Treow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Value 1 */}
                        <div className="group p-8 rounded-2xl bg-background-light border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">school</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Chuyên môn</h3>
                            <p className="text-text-sub">Đội ngũ bác sĩ đào tạo bài bản, liên tục cập nhật các phương pháp trị liệu tiên tiến nhất.</p>
                        </div>
                        {/* Value 2 */}
                        <div className="group p-8 rounded-2xl bg-background-light border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">favorite</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Tận tâm</h3>
                            <p className="text-text-sub">Chăm sóc bệnh nhân như người thân, lắng nghe và thấu hiểu từng nỗi đau thể xác lẫn tinh thần.</p>
                        </div>
                        {/* Value 3 */}
                        <div className="group p-8 rounded-2xl bg-background-light border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">diversity_3</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Hiểu biết văn hóa</h3>
                            <p className="text-text-sub">Xóa nhòa khoảng cách, mang lại cảm giác gần gũi và an tâm tuyệt đối cho cộng đồng người Việt.</p>
                        </div>
                        {/* Value 4 */}
                        <div className="group p-8 rounded-2xl bg-background-light border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">lightbulb</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Đổi mới</h3>
                            <p className="text-text-sub">Tiên phong ứng dụng công nghệ và liệu pháp mới để tối ưu hóa hiệu quả phục hồi.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-background-light dark:bg-background-dark overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-primary font-bold uppercase text-sm mb-2 block">Dr. Duy - Founder</span>
                            <h2 className="text-3xl lg:text-4xl font-black text-text-main">Chuyên gia vật lý trị liệu</h2>
                            <p className="mt-4 text-text-sub">Đào tạo bài bản tại Anh Quốc, tận tâm với từng bệnh nhân</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Portrait - Professional */}
                        <div className="group block">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                                <Image
                                    src="/images/team/dr-duy-portrait.jpg"
                                    alt="Dr. Duy - Chân dung chuyên nghiệp"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="text-xs font-medium bg-primary px-2 py-1 rounded w-fit mb-2">Founder</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">Dr. Duy</h3>
                            <p className="text-sm text-text-sub line-clamp-2 mt-1">Bác sĩ Vật lý trị liệu</p>
                        </div>

                        {/* Treating 1 - Neck/Shoulder Specialist */}
                        <div className="group block">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                                <Image
                                    src="/images/team/dr-duy-treating-1.jpg"
                                    alt="Dr. Duy - Chuyên gia cổ vai gáy"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="text-xs font-medium bg-primary px-2 py-1 rounded w-fit mb-2">Chuyên khoa</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">Cổ vai gáy</h3>
                            <p className="text-sm text-text-sub line-clamp-2 mt-1">Điều trị đau cổ, vai, gáy hiệu quả</p>
                        </div>

                        {/* Treating 2 - Manual Therapy */}
                        <div className="group block">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                                <Image
                                    src="/images/team/dr-duy-treating-2.jpg"
                                    alt="Dr. Duy - Trị liệu bằng tay"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="text-xs font-medium bg-primary px-2 py-1 rounded w-fit mb-2">Kỹ thuật</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">Trị liệu bằng tay</h3>
                            <p className="text-sm text-text-sub line-clamp-2 mt-1">Manual Therapy chuyên sâu</p>
                        </div>

                        {/* Treating 3 - Back/Spine Specialist */}
                        <div className="group block">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                                <Image
                                    src="/images/team/dr-duy-treating-3.jpg"
                                    alt="Dr. Duy - Chuyên gia cột sống"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="text-xs font-medium bg-primary px-2 py-1 rounded w-fit mb-2">Chuyên khoa</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">Cột sống & Lưng</h3>
                            <p className="text-sm text-text-sub line-clamp-2 mt-1">Điều trị đau lưng, thoát vị đĩa đệm</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black text-text-main mb-4">Không gian chữa lành của bạn</h2>
                        <p className="text-lg text-text-sub max-w-3xl mx-auto">
                            Chúng tôi đầu tư vào cơ sở vật chất hiện đại, không gian thoáng đãng và trang thiết bị tân tiến nhất để hỗ trợ quá trình phục hồi của bạn diễn ra nhanh chóng và thoải mái.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                        <div className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="/images/about/healing-1.jpg"
                                alt="Phòng tập phục hồi chức năng"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-white font-bold text-xl">Phòng tập phục hồi chức năng</h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg group">
                                <Image
                                    src="/images/about/healing-2.jpg"
                                    alt="Thiết bị trị liệu"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg group">
                                <Image
                                    src="/images/about/healing-3.jpg"
                                    alt="Không gian thư giãn"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/3">
                            <div className="aspect-square relative rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                                <Image
                                    src="/images/team/dr-duy-portrait.jpg"
                                    alt="Dr. Duy - Founder of TREOW"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl lg:text-4xl font-black mb-6">Câu chuyện của Treow</h2>
                            <div className="space-y-4 text-lg text-white/90 leading-relaxed font-light">
                                <p>
                                    Treow được thành lập từ nỗi trăn trở của những người con xa xứ. Chúng tôi, những bác sĩ vật lý trị liệu làm việc tại các bệnh viện lớn ở London, chứng kiến nhiều đồng hương gặp khó khăn khi tiếp cận dịch vụ y tế do rào cản ngôn ngữ.
                                </p>
                                <p>
                                    Cái tên "Treow" mang ý nghĩa của sự chữa lành và niềm tin. Chúng tôi muốn tạo ra một không gian nơi người Việt không chỉ đến để chữa bệnh, mà còn để tìm thấy sự đồng cảm, sự sẻ chia trong từng liệu trình điều trị.
                                </p>
                                <div className="pt-6">
                                    <p className="font-bold text-xl font-handwriting">"Vì sức khỏe của cộng đồng Việt tại Anh Quốc"</p>
                                    <p className="mt-2 text-sm opacity-80">- Đội ngũ sáng lập Treow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
