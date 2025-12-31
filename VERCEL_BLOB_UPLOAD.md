# Vercel Blob Upload API - Hướng dẫn sử dụng

## ✅ Đã hoàn thành

API upload đã được tạo tại `/api/upload/route.ts` với các tính năng:

### Tính năng
- ✅ Upload ảnh lên **Vercel Blob** (cloud storage)
- ✅ Validate file type (chỉ cho phép: jpg, jpeg, png, gif, webp)
- ✅ Validate file size (tối đa 5MB)
- ✅ Tự động tạo tên file unique
- ✅ Trả về URL public của ảnh

### Cách sử dụng trong Admin Panel

Khi admin upload ảnh (ví dụ: avatar cho author, ảnh cho post):

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
// data.url = "https://xxx.public.blob.vercel-storage.com/timestamp-random.jpg"
```

### Response Format

**Success:**
```json
{
  "success": true,
  "url": "https://xxx.public.blob.vercel-storage.com/1735618800000-abc123def.jpg",
  "filename": "1735618800000-abc123def.jpg"
}
```

**Error:**
```json
{
  "error": "File too large. Maximum size is 5MB."
}
```

## 🔧 Cấu hình

### Environment Variables
Đã có sẵn trong `.env`:
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_4Vx1sb5rnKsKkDK2_z9DcryiCVwbO1XXQRavmXatluwwRXK
```

### File Limits
- **Max size:** 5MB
- **Allowed types:** JPEG, JPG, PNG, GIF, WebP

## 📝 Lưu ý

1. **Ảnh cũ trong `/public/uploads/`:**
   - Vẫn hoạt động bình thường
   - Không cần migrate (trừ khi muốn)

2. **Ảnh mới:**
   - Tự động upload lên Vercel Blob
   - URL dạng: `https://xxx.public.blob.vercel-storage.com/...`

3. **Production:**
   - Khi deploy lên Vercel, tất cả ảnh sẽ lưu trên Blob
   - Không lưu vào filesystem (serverless không có persistent storage)

## ✅ Kết quả

- ✅ Admin có thể upload ảnh
- ✅ Ảnh lưu trên Vercel Blob (cloud)
- ✅ URL public, truy cập nhanh
- ✅ Không giới hạn storage (theo plan Vercel)
