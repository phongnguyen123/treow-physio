# 🏥 TREOW Physiotherapy Website

Website chuyên nghiệp cho phòng khám vật lý trị liệu TREOW, được xây dựng với Next.js 16 và TypeScript.

## ✨ Tính năng

### 🎯 Trang chính
- **Trang chủ**: Hero carousel, dịch vụ nổi bật, triết lý điều trị
- **Giới thiệu**: Thông tin về Dr. Duy và đội ngũ chuyên gia
- **Dịch vụ**: 6 dịch vụ chuyên khoa với trang chi tiết
- **Bảng giá**: Thông tin chi tiết về phí dịch vụ
- **Đặt lịch**: Form đặt lịch hẹn trực tuyến
- **Tin tức**: Hệ thống blog tối ưu cho Google Discover
- **Liên hệ**: Thông tin liên hệ và form

### 📰 Hệ thống Tin tức (Google Discover Ready)
- Trang bài viết với structured data (Article schema)
- Trang tác giả với EEAT signals (Person schema)
- Breadcrumb navigation
- Bộ lọc theo chuyên mục
- Related posts
- Newsletter subscription

### 🔧 Admin Panel
- Quản lý bài viết (CRUD)
- Quản lý tác giả
- Quản lý đặt lịch
- Quản lý newsletter subscribers
- **SEO Settings Dashboard**:
  - Thông tin website
  - Social media links
  - Analytics & verification codes
  - Robots.txt editor
  - Sitemap configuration
  - Custom code injection (header, body, footer, in-article ads)

### 🎨 UI/UX
- Responsive design (mobile-first)
- Modern gradient effects
- Smooth animations
- Accessible components
- Dark mode ready

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Material Symbols
- **Rich Text**: TipTap Editor
- **Email**: Nodemailer
- **Deployment**: Vercel

## 📦 Cài đặt

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/physiocare-web.git

# Di chuyển vào thư mục
cd physiocare-web

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## 🔐 Environment Variables

Tạo file `.env.local` với nội dung:

```env
# Base URL
NEXT_PUBLIC_BASE_URL=https://treowclinic.com

# SMTP Configuration (Gmail)
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=your-16-char-app-password
SMTP_FROM_NAME=TREOW Physiotherapy

# Revalidation Secret
REVALIDATE_SECRET=your-random-secret-key
```

## 🚀 Deployment

Xem hướng dẫn chi tiết trong file [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/physiocare-web)

## 📁 Cấu trúc thư mục

```
physiocare-web/
├── app/                      # Next.js App Router
│   ├── (pages)/             # Public pages
│   ├── admin/               # Admin panel
│   ├── api/                 # API routes
│   └── tin-tuc/            # News system
├── components/              # React components
│   ├── schemas/            # Structured data schemas
│   └── ...
├── data/                    # JSON data files
│   ├── posts.json
│   ├── authors.json
│   ├── seo-settings.json
│   └── ...
├── lib/                     # Utilities & actions
│   ├── actions/            # Server actions
│   └── utils/              # Helper functions
├── public/                  # Static assets
│   ├── images/
│   └── uploads/
└── types/                   # TypeScript types
```

## 🎯 Các trang chính

| Route | Mô tả |
|-------|-------|
| `/` | Trang chủ |
| `/ve-chung-toi` | Giới thiệu |
| `/dich-vu` | Danh sách dịch vụ |
| `/dich-vu/[slug]` | Chi tiết dịch vụ |
| `/bang-gia` | Bảng giá |
| `/dat-lich` | Đặt lịch hẹn |
| `/tin-tuc` | Danh sách bài viết |
| `/tin-tuc/[slug]` | Chi tiết bài viết |
| `/tac-gia/[slug]` | Trang tác giả |
| `/lien-he` | Liên hệ |
| `/admin` | Admin dashboard |

## 🔒 Admin Access

- URL: `/admin`
- Default credentials (⚠️ **ĐỔI NGAY SAU KHI DEPLOY**):
  - Username: `admin`
  - Password: `admin123`

## 📊 SEO Features

- ✅ Structured Data (JSON-LD)
- ✅ OpenGraph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Breadcrumbs
- ✅ Sitemap.xml
- ✅ News Sitemap
- ✅ Robots.txt
- ✅ Google Analytics ready
- ✅ Google Discover optimized

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

Private - All rights reserved © 2025 TREOW Physiotherapy

## 👨‍💻 Developer

Developed with ❤️ for TREOW Physiotherapy

---

**Production URL**: https://treowclinic.com

**Vercel URL**: https://physiocare-web.vercel.app
