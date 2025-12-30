"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileServiceExpected, setMobileServiceExpected] = useState(false);

    // Import manually to avoid extra file reads if not needed for now, 
    // but better to just hardcode commonly used ones or fetch if dynamic.
    // For now I will hardcode the services list based on previous context to ensure speed and stability
    // or import it. Let's import it properly.

    const services = [
        { name: "Cơ xương khớp", href: "/dich-vu/co-xuong-khop" },
        { name: "Thai kỳ", href: "/dich-vu/thai-ky" },
        { name: "Vật lý trị liệu Nhi", href: "/dich-vu/vat-ly-tri-lieu-nhi" },
        { name: "Hô hấp", href: "/dich-vu/ho-hap" },
        { name: "Tăng cường sinh lý nam", href: "/dich-vu/tieu-hoa" },
        { name: "Đau mãn tính", href: "/dich-vu/dau-man-tinh" },
    ];

    const navLinks = [
        { href: "/", label: "Trang chủ" },
        { href: "/ve-chung-toi", label: "Về chúng tôi" },
        { href: "/dich-vu", label: "Dịch vụ", hasSubmenu: true },
        { href: "/bang-gia", label: "Bảng giá" },
        { href: "/tin-tuc", label: "Tin tức" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border-color bg-background-light/80 backdrop-blur-md dark:bg-background-dark/80">
            <div className="mx-auto flex h-32 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="TREOW - Rooted in Osteopathy, Growing in Health"
                        width={504}
                        height={168}
                        priority
                        className="h-28 w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        if (link.hasSubmenu) {
                            return (
                                <div key={link.href} className="relative group">
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname.startsWith(link.href)
                                            ? "text-primary"
                                            : "text-text-main hover:text-primary"
                                            }`}
                                    >
                                        {link.label}
                                        <span className="material-symbols-outlined text-lg">expand_more</span>
                                    </Link>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-64">
                                        <div className="bg-white dark:bg-background-dark rounded-xl shadow-xl border border-border-color overflow-hidden p-2">
                                            {services.map((service) => (
                                                <Link
                                                    key={service.href}
                                                    href={service.href}
                                                    className="block px-4 py-3 text-sm text-text-main hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                                                >
                                                    {service.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${pathname === link.href
                                    ? "text-primary"
                                    : "text-text-main hover:text-primary"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dat-lich"
                        className="hidden sm:flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-content transition-transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                    >
                        Đặt lịch hẹn
                    </Link>

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center justify-center text-text-main"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined">
                            {mobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border-color bg-background-light dark:bg-background-dark max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <nav className="flex flex-col px-4 py-4 space-y-1">
                        {navLinks.map((link) => {
                            if (link.hasSubmenu) {
                                return (
                                    <div key={link.href} className="flex flex-col">
                                        <div className="flex items-center justify-between py-2">
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`text-sm font-medium transition-colors ${pathname.startsWith(link.href)
                                                    ? "text-primary"
                                                    : "text-text-main"
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setMobileServiceExpected(!mobileServiceExpected);
                                                }}
                                                className="p-1"
                                            >
                                                <span className={`material-symbols-outlined transition-transform duration-200 ${mobileServiceExpected ? 'rotate-180' : ''}`}>
                                                    expand_more
                                                </span>
                                            </button>
                                        </div>

                                        {/* Mobile Submenu */}
                                        <div className={`pl-4 border-l-2 border-primary/20 space-y-1 overflow-hidden transition-all duration-300 ${mobileServiceExpected ? 'max-h-96 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}`}>
                                            {services.map((service) => (
                                                <Link
                                                    key={service.href}
                                                    href={service.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block py-2 text-sm text-text-sub hover:text-primary transition-colors"
                                                >
                                                    {service.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-sm font-medium transition-colors py-2 ${pathname === link.href
                                        ? "text-primary"
                                        : "text-text-main hover:text-primary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <div className="pt-4 mt-2 border-t border-border-color">
                            <Link
                                href="/dat-lich"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-content transition-transform active:scale-95"
                            >
                                Đặt lịch hẹn
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
