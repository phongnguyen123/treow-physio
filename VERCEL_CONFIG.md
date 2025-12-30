# ⚙️ Cấu hình Environment Variables trên Vercel

## 🚨 Vấn đề hiện tại
Website báo lỗi: *"Tính năng đặt lịch tạm thời không khả dụng..."*
Nguyên nhân: Vercel chưa có các biến môi trường để kết nối Database.

---

## ✅ Cách khắc phục

### Bước 1: Copy các giá trị sau

```ini
POSTGRES_URL="postgresql://neondb_owner:npg_VplOkqb3fWu9@ep-polished-shape-ahwl8tnc-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://neondb_owner:npg_VplOkqb3fWu9@ep-polished-shape-ahwl8tnc.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
POSTGRES_USER="neondb_owner"
POSTGRES_HOST="ep-polished-shape-ahwl8tnc-pooler.c-3.us-east-1.aws.neon.tech"
POSTGRES_PASSWORD="npg_VplOkqb3fWu9"
POSTGRES_DATABASE="neondb"
POSTGRES_URL_NO_SSL="postgresql://neondb_owner:npg_VplOkqb3fWu9@ep-polished-shape-ahwl8tnc-pooler.c-3.us-east-1.aws.neon.tech/neondb"
POSTGRES_PRISMA_URL="postgresql://neondb_owner:npg_VplOkqb3fWu9@ep-polished-shape-ahwl8tnc-pooler.c-3.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"
```

### Bước 2: Thêm vào Vercel

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn Project **physiocare-web**
3. Vào **Settings** -> **Environment Variables**
4. Copy và Paste từng biến ở trên vào.
   - **Cách nhanh**: Copy tất cả đoạn text ở Bước 1 -> Paste thẳng vào ô Key (Vercel sẽ tự tách Key/Value).

### Bước 3: Redeploy (QUAN TRỌNG)

Sau khi thêm xong, Vercel **KHÔNG** tự cập nhật cho lần deploy hiện tại. Bạn phải:

1. Vào tab **Deployments**
2. Chọn Deployment mới nhất (đang chạy)
3. Bấm nút **... (3 chấm)** ở góc phải -> chọn **Redeploy**
4. Chờ 1-2 phút.

---

## 🔍 Kiểm tra
Sau khi redeploy xong, hãy thử đặt lịch lại. Nếu thành công, dữ liệu sẽ được lưu vào Database Neon Postgres.
