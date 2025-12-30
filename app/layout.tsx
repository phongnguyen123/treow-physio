import type { Metadata } from "next";
import { Lexend, Noto_Sans } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phòng khám Vật lý trị liệu - Phục hồi sức khỏe",
  description: "Chuyên khoa Vật lý trị liệu Cơ xương khớp, Thai kỳ, Nhi và Đau mãn tính.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${lexend.variable} ${notoSans.variable} antialiased bg-background-light dark:bg-background-dark text-text-main`}
      >
        {children}
      </body>
    </html>
  );
}
