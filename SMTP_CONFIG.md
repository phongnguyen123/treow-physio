# ⚙️ Cấu hình SMTP trên Vercel

## 🚨 Quan trọng

Trên Vercel, filesystem là **read-only**, nên bạn **KHÔNG THỂ** lưu cấu hình SMTP qua Admin Panel.

Thay vào đó, bạn phải cấu hình SMTP thông qua **Environment Variables** trên Vercel Dashboard.

---

## 📋 Các bước cấu hình

### Bước 1: Tạo Gmail App Password

1. Đăng nhập vào tài khoản Gmail của bạn
2. Vào **Google Account** → **Security**
3. Bật **2-Step Verification** (nếu chưa có)
4. Trong **2-Step Verification**, tìm **App passwords**
5. Click **App passwords**
6. Chọn:
   - **Select app**: Mail
   - **Select device**: Other (Custom name)
   - Nhập tên: "TREOW Website"
7. Click **Generate**
8. **Copy** password 16 ký tự (dạng: `xxxx xxxx xxxx xxxx`)

> ⚠️ **Lưu ý**: Bỏ khoảng trắng khi copy password

---

### Bước 2: Thêm Environment Variables trên Vercel

1. Đăng nhập vào https://vercel.com
2. Chọn project **physiocare-web**
3. Vào **Settings** → **Environment Variables**
4. Thêm các biến sau:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `SMTP_USER` | `your-email@gmail.com` | Production, Preview, Development |
| `SMTP_APP_PASSWORD` | `xxxxyyyyzzzzwwww` (16 ký tự, không có khoảng trắng) | Production, Preview, Development |
| `SMTP_FROM_NAME` | `TREOW Physiotherapy` | Production, Preview, Development |

### Bước 3: Redeploy

Sau khi thêm environment variables:

1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click nút **...** (3 chấm)
4. Chọn **Redeploy**
5. Đợi vài phút để deploy hoàn tất

---

## ✅ Kiểm tra cấu hình

Sau khi redeploy:

1. Vào Admin Panel → Settings (hoặc trang test email)
2. SMTP credentials sẽ tự động được load từ Environment Variables
3. Gửi email test để kiểm tra

---

## 🔍 Troubleshooting

### ❌ Lỗi: "Cannot save settings on Vercel"

**Nguyên nhân**: Đang cố lưu SMTP qua Admin Panel trên Vercel

**Giải pháp**: Sử dụng Environment Variables như hướng dẫn trên

### ❌ Email không gửi được

**Kiểm tra**:
1. SMTP_USER có đúng email không?
2. SMTP_APP_PASSWORD có đúng 16 ký tự không? (không có khoảng trắng)
3. Đã bật 2-Step Verification cho Gmail chưa?
4. Đã redeploy sau khi thêm env vars chưa?

### ❌ Lỗi: "Invalid login"

**Nguyên nhân**: App Password sai hoặc có khoảng trắng

**Giải pháp**:
1. Tạo lại App Password
2. Copy chính xác 16 ký tự (bỏ khoảng trắng)
3. Update lại SMTP_APP_PASSWORD trên Vercel
4. Redeploy

---

## 📊 Cấu hình cho Development (Local)

Khi chạy local (`npm run dev`), bạn có 2 cách:

### Cách 1: File `.env.local` (Khuyến nghị)

Tạo file `.env.local` trong thư mục project:

```env
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=xxxxyyyyzzzzwwww
SMTP_FROM_NAME=TREOW Physiotherapy
```

### Cách 2: Lưu vào file JSON

Vào Admin Panel → Settings → Email Configuration

Nhập SMTP credentials và Save. Sẽ được lưu vào `data/settings.json`

> ⚠️ **Lưu ý**: Không commit file này lên Git nếu có chứa credentials thật!

---

## 🔐 Bảo mật

- ✅ **KHÔNG BAO GIỜ** commit SMTP credentials vào Git
- ✅ File `.env.local` đã được thêm vào `.gitignore`
- ✅ Trên Vercel, credentials được lưu an toàn trong Environment Variables
- ✅ Chỉ admin có quyền truy cập Vercel Dashboard

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- Vercel deployment logs
- Browser console (F12)
- Server logs trên Vercel

---

**Cập nhật lần cuối**: 30/12/2024
