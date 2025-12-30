import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-background-dark py-12 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="TREOW"
                                width={150}
                                height={50}
                                className="h-10 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm text-gray-400">
                            Phòng khám Vật lý trị liệu hàng đầu với trang thiết bị hiện đại và đội ngũ chuyên gia tận tâm.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#" aria-label="Facebook">
                                <span className="material-symbols-outlined">social_leaderboard</span>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#" aria-label="YouTube">
                                <span className="material-symbols-outlined">smart_display</span>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#" aria-label="Website">
                                <span className="material-symbols-outlined">language</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 text-lg font-bold text-primary">Liên kết nhanh</h4>
                        <ul className="flex flex-col gap-2 text-sm text-gray-400">
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/ve-chung-toi">
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/dich-vu">
                                    Dịch vụ
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/bang-gia">
                                    Bảng giá
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/tin-tuc">
                                    Tin tức
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/dat-lich">
                                    Đặt lịch hẹn
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-4 text-lg font-bold text-primary">Liên hệ</h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary mt-0.5 text-lg">location_on</span>
                                <span>Coming soon</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-lg">call</span>
                                <span>+447882843513</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                                <span>contact@treowclinic.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div>
                        <h4 className="mb-4 text-lg font-bold text-primary">Bản đồ</h4>
                        <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-800">
                            <img
                                alt="Bản đồ vị trí phòng khám Treow tại London"
                                className="h-full w-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                                src="/images/map.png"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-center">
                    <p className="text-sm text-gray-500 mb-3">© 2024 Phòng khám Vật lý trị liệu TREOW. All rights reserved.</p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <Link href="/chinh-sach-bao-mat" className="text-gray-400 hover:text-primary transition-colors">
                            Chính sách bảo mật
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link href="/dieu-khoan-dich-vu" className="text-gray-400 hover:text-primary transition-colors">
                            Điều khoản dịch vụ
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
