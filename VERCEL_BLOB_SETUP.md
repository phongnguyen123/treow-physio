# ☁️ Cấu hình Vercel Blob (Lưu trữ ảnh)

Để sửa lỗi upload ảnh, bạn cần kích hoạt tính năng **Vercel Blob**.

## 👉 Các bước thực hiện (3 phút)

1. **Truy cập Vercel Dashboard**:
   - Vào [https://vercel.com/dashboard/storage](https://vercel.com/dashboard/storage)

2. **Tạo Blob Store mới**:
   - Nhấn nút **Create Database** (hoặc **Create Store**).
   - Chọn loại là **Blob**.
   - Đặt tên (ví dụ: `treow-images`).
   - Nhấn **Create**.

3. **Kết nối với Project**:
   - Sau khi tạo xong, cuộn xuống phần **Connect to Project**.
   - Chọn project của bạn: `physiocare-web`.
   - Nhấn **Connect**.

✅ **XONG!** Vercel sẽ tự động thêm biến môi trường `BLOB_READ_WRITE_TOKEN` cho bạn.

---

## ⚡️ Bước cuối cùng: Redeploy

Sau khi kết nối Blob xong, bạn cần Redeploy một lần nữa để Code mới (tôi vừa cập nhật) nhận diện được token này.

1. Vào tab **Deployments**.
2. Chọn deployment mới nhất.
3. Bấm **Redeploy**.

Sau đó, hãy thử upload ảnh lại trong phần Admin. Nó sẽ hoạt động! 🚀
