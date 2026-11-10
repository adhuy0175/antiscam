# Đưa StudentAntiScamAI lên GitHub Pages

## 1. Tạo repository
Vào https://github.com/new → đặt tên `antiscam` → chọn **Public** → **Create repository** (không tạo sẵn README).

## 2. Push code
Giải nén gói này. Mở PowerShell hoặc Git Bash ngay trong thư mục có `index.html` rồi chạy:

```bash
git init
git add .
git commit -m "Deploy StudentAntiScamAI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/antiscam.git
git push -u origin main
```

Thay `YOUR_USERNAME` bằng tên tài khoản GitHub của bạn.

## 3. Bật GitHub Pages
Repository → Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: **main** → Folder: **/(root)** → Save.

Địa chỉ truy cập: `https://YOUR_USERNAME.github.io/antiscam/`

## Ghi chú
- Không cần Node.js, npm hoặc bước build.
- Dữ liệu tiến độ bài học lưu trong `localStorage` của từng trình duyệt, không được đồng bộ lên GitHub.
- Video YouTube yêu cầu kết nối mạng.
- File HTML đơn lẻ dung lượng lớn trong bản gốc không được đưa vào gói này để tránh trùng nội dung.
