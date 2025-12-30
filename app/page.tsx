import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-[#089191] mx-auto lg:mx-0 mb-6">
                <span className="material-symbols-outlined text-base">verified</span>
                Chăm sóc sức khỏe toàn diện
              </div>
              <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-text-main sm:text-5xl lg:text-6xl">
                Phục hồi sức khỏe <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#089191] to-primary">Tận hưởng cuộc sống</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-text-sub max-w-2xl mx-auto lg:mx-0">
                Chuyên khoa Vật lý trị liệu Cơ xương khớp, Thai kỳ, Nhi và Đau mãn tính. Đội ngũ bác sĩ tận tâm, phương pháp khoa học giúp bạn lấy lại niềm vui vận động.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/dat-lich" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-primary-content transition-all hover:bg-opacity-90 hover:shadow-lg hover:shadow-primary/30">
                  Tư vấn miễn phí
                </Link>
                <button className="inline-flex items-center justify-center rounded-lg border border-border-color bg-white px-8 py-4 text-base font-bold text-text-main transition-all hover:bg-gray-50">
                  <span className="material-symbols-outlined mr-2">play_circle</span>
                  Xem video giới thiệu
                </button>
              </div>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-text-sub">
                <div className="flex -space-x-3">
                  <img alt="Bệnh nhân 1" className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/images/avatars/avatar-1.jpg" />
                  <img alt="Bệnh nhân 2" className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/images/avatars/avatar-2.jpg" />
                  <img alt="Bệnh nhân 3" className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/images/avatars/avatar-3.jpg" />
                  <img alt="Bệnh nhân 4" className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/images/avatars/avatar-4.jpg" />
                </div>
                <p>Được tin tưởng bởi <span className="font-bold text-text-main">2,000+</span> bệnh nhân</p>
              </div>
            </div>
            {/* Image Content */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <HeroCarousel
                  images={[
                    "/images/team/dr-duy-treating-1.jpg",
                    "/images/team/dr-duy-treating-2.jpg",
                    "/images/team/dr-duy-treating-3.jpg"
                  ]}
                  className="h-full w-full"
                />
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-8 -left-8 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
              <div className="absolute -top-8 -right-8 -z-10 h-64 w-64 rounded-full bg-[#089191]/10 blur-3xl"></div>
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 rounded-xl bg-white p-4 shadow-xl border border-primary/10 animate-bounce duration-[3000ms]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Kết quả điều trị</p>
                  <p className="text-sm font-bold text-gray-900">98% Hài lòng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20 dark:bg-gray-900" id="dich-vu">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-text-main sm:text-4xl">Dịch vụ chuyên khoa</h2>
            <p className="mt-4 text-lg text-text-sub">Chúng tôi cung cấp các liệu trình điều trị chuyên sâu, được cá nhân hóa phù hợp với thể trạng của từng đối tượng.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <Link href="/dich-vu/co-xuong-khop" className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-background-light p-8 transition-all hover:border-primary hover:bg-white hover:shadow-xl dark:bg-background-dark dark:border-gray-800">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary-dark group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <span className="material-symbols-outlined text-3xl">accessibility_new</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-main">Cơ xương khớp</h3>
              <p className="text-text-sub">Điều trị đau lưng, cổ vai gáy, thoát vị đĩa đệm và phục hồi chức năng sau chấn thương thể thao.</p>
            </Link>
            {/* Card 2 */}
            <Link href="/dich-vu/thai-ky" className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-background-light p-8 transition-all hover:border-primary hover:bg-white hover:shadow-xl dark:bg-background-dark dark:border-gray-800">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary-dark group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <span className="material-symbols-outlined text-3xl">pregnant_woman</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-main">Thai kỳ</h3>
              <p className="text-text-sub">Giảm đau lưng, phù nề, cải thiện tư thế và các bài tập chuẩn bị cho cuộc vượt cạn an toàn.</p>
            </Link>
            {/* Card 3 */}
            <Link href="/dich-vu/vat-ly-tri-lieu-nhi" className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-background-light p-8 transition-all hover:border-primary hover:bg-white hover:shadow-xl dark:bg-background-dark dark:border-gray-800">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary-dark group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <span className="material-symbols-outlined text-3xl">child_care</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-main">Vật lý trị liệu Nhi</h3>
              <p className="text-text-sub">Can thiệp sớm vẹo cổ, bàn chân bẹt, chậm phát triển vận động giúp trẻ phát triển toàn diện.</p>
            </Link>
            {/* Card 4 */}
            <Link href="/dich-vu/ho-hap" className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-background-light p-8 transition-all hover:border-primary hover:bg-white hover:shadow-xl dark:bg-background-dark dark:border-gray-800">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary-dark group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <span className="material-symbols-outlined text-3xl">pulmonology</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-main">Hô hấp</h3>
              <p className="text-text-sub">Phục hồi chức năng hô hấp sau viêm phổi, hen suyễn, tăng cường dung tích phổi.</p>
            </Link>
            {/* Card 5 */}
            <Link href="/dich-vu/tieu-hoa" className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-background-light p-8 transition-all hover:border-primary hover:bg-white hover:shadow-xl dark:bg-background-dark dark:border-gray-800">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary-dark group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <span className="material-symbols-outlined text-3xl">sentiment_satisfied</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-main">Tăng cường sinh lý nam</h3>
              <p className="text-text-sub">Cải thiện sức khỏe sinh lý nam giới một cách tự nhiên thông qua vật lý trị liệu, phục hồi chức năng sàn chậu.</p>
            </Link>
            {/* Card 6 */}
            <Link href="/dich-vu/dau-man-tinh" className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-background-light p-8 transition-all hover:border-primary hover:bg-white hover:shadow-xl dark:bg-background-dark dark:border-gray-800">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary-dark group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <span className="material-symbols-outlined text-3xl">healing</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-main">Đau mãn tính</h3>
              <p className="text-text-sub">Kiểm soát và giảm đau không dùng thuốc, nâng cao chất lượng cuộc sống cho người bệnh.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* About / Philosophy Section */}
      <section className="bg-background-light py-20 dark:bg-background-dark" id="ve-chung-toi">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-1/2 relative">
              <div className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-xl">
                <img alt="Dr. Duy - TREOW Founder" className="h-full w-full object-cover" src="/images/team/dr-duy-treating-2.jpg" />
              </div>
              <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-primary/10 -z-10"></div>
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-[#089191]/10 -z-10"></div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <h2 className="text-3xl font-black text-text-main sm:text-4xl mb-6">Triết lý điều trị</h2>
              <div className="space-y-6 text-lg text-text-sub">
                <p>
                  Tại TREOW, chúng tôi tin rằng mỗi bệnh nhân xứng đáng được lắng nghe và thấu hiểu. Với nền tảng đào tạo bài bản từ các chương trình vật lý trị liệu hàng đầu, Dr. Duy mang đến phương pháp điều trị dựa trên bằng chứng khoa học mới nhất.
                </p>
                <p>
                  Chúng tôi không chỉ điều trị triệu chứng, mà đi sâu vào nguyên nhân gốc rễ của vấn đề. Sự tận tâm, nhiệt huyết và cam kết học hỏi không ngừng là những gì chúng tôi mang đến cho từng bệnh nhân.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-primary">100%</span>
                    <span className="text-sm">Tận tâm</span>
                  </div>
                  <div className="h-10 w-px bg-gray-300"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-primary">Chuẩn UK</span>
                    <span className="text-sm">Chuyên môn bài bản</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Link href="/ve-chung-toi" className="flex items-center gap-2 text-[#089191] font-bold hover:underline">
                    Xem đội ngũ bác sĩ
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-20 dark:bg-gray-900 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-black text-text-main sm:text-4xl">Khách hàng nói gì về chúng tôi</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Review 1 */}
            <div className="flex flex-col gap-4 rounded-xl border border-border-color bg-background-light p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9I82O8v0gVNURowjYx2RkpEvc_AGTjf-X8BIqmB_sCBugbRfEhw5u44UQsngNJWEB0cP9b6NQ9MAnz_mtdsGTPb9YbuvmRT2EChqZjOMjlaKSpeHhXBaBZlDjjfT9sdgi_6TrbZFxgZLJaniJXC5VEUCvlrTS85THDXtVkE5WsUugQYucm0xm4SlUQgspjDG0sVjvbybg95tL4zq5AQuP25ANQB8roG9_Vq5uGFmFcwzsWbbxLaJT2NT8ALJMtyyfD9WwwA5bjjGI")' }}></div>
                <div>
                  <p className="font-bold text-text-main">Nguyễn Thu Hà</p>
                  <p className="text-xs text-text-sub">2 ngày trước</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
              </div>
              <p className="text-sm leading-relaxed text-text-sub">
                &quot;Bác sĩ rất tận tâm, không gian phòng khám sạch sẽ và ấm cúng. Tôi đã giảm đau lưng rõ rệt sau 3 buổi. Rất cảm ơn đội ngũ.&quot;
              </p>
            </div>
            {/* Review 2 */}
            <div className="flex flex-col gap-4 rounded-xl border border-border-color bg-background-light p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVnFss6fPspcQ2Jvw-mZgDH_vAQMZ2vY-8uAB63TS4Krm41foRNP4Tt_GBMoteC7DaYeJaPp1Rpa1Jxiv-vN7FAoAji9MlCAlS-DXulmtkc6xvSp1Y0zRBOpzRdL3SB6XmTXsuTLt3K4pEXVbd3Bzed4vWIXhUn6S2H7v1p5yhiRFRhdvXnsa0jPu9WnSHKgAWp-XPBQ2M90ZUkd6cuvImn2I9Ju_0dS1pLm0BpInK4RE0RkYa0ppRrwMgVSJWniAD9Do32w-e7ptL")' }}></div>
                <div>
                  <p className="font-bold text-text-main">Trần Văn Minh</p>
                  <p className="text-xs text-text-sub">1 tuần trước</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
              </div>
              <p className="text-sm leading-relaxed text-text-sub">
                &quot;Dịch vụ tập cho bé rất tốt, bé nhà mình hợp tác và tiến bộ nhanh. Cảm ơn các cô kỹ thuật viên đã kiên nhẫn với bé.&quot;
              </p>
            </div>
            {/* Review 3 */}
            <div className="flex flex-col gap-4 rounded-xl border border-border-color bg-background-light p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_3t-ZkfxnfPd8cuxNTMF_In4H6xqMwSo59TN-fhmJWJVuxiSOQ4fkIxombNi56_7vhytTdepIax-LdSuTLebi0qYXGvKfUYyfdxNX6Ij3HvLoayaDCgWpxFOAmtkOSfkLKOm4XaekrPYnUSE4e3vmoEzIVClPqxwl3mnGnvBj53NdXomQg107U3l1dwXX66EuNCJ3Reobub3Q9MTPmSc8m4G0_9YpwuPtiX3hbzkH2R5AmRqGPfq9rH9SHup4O1kYc5L_kDm8v0_O")' }}></div>
                <div>
                  <p className="font-bold text-text-main">Lê Thị Mai</p>
                  <p className="text-xs text-text-sub">3 tuần trước</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
              </div>
              <p className="text-sm leading-relaxed text-text-sub">
                &quot;Mình đi tập thai kỳ ở đây thấy rất thoải mái, giảm hẳn đau mỏi người. Rất khuyến khích các mẹ bầu tham gia để khỏe hơn.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 dark:bg-[#089191]">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-black text-primary-content sm:text-4xl">Sẵn sàng cải thiện sức khỏe?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-medium text-primary-content/80">
            Hãy để chúng tôi đồng hành cùng bạn trên hành trình phục hồi. Đặt lịch hẹn ngay hôm nay để nhận tư vấn miễn phí.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dat-lich" className="min-w-[200px] rounded-lg bg-white px-8 py-4 text-base font-bold text-text-main shadow-lg transition-transform hover:scale-105 hover:bg-gray-50">
              Đặt lịch ngay
            </Link>
            <button className="min-w-[200px] rounded-lg border-2 border-primary-content px-8 py-4 text-base font-bold text-primary-content transition-colors hover:bg-primary-content hover:text-white">
              Gọi hotline: +447882843513
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
