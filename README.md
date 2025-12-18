HƯỚNG DẪN SETUP 

1. Cài đặt Node.js
```bash
node --version    # Nên >= v18.0.0
npm --version     # Nên >= 9.0.0
```
2. Cài đặt dependencies

```bash
npm install
```

3. Tạo file .env.local

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/demophongtro
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NODE_ENV=development
```

4. Chạy ứng dụng
```bash
npm run dev
```
5. Tạo dữ liệu mẫu (Mở Terminal mới và giữ server đang chạy)

Gọi API seed data
```bash
Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST
```

6. Đăng nhập với tài khoản mặc định

Account admin
- Email: admin@example.com
- Password: 123456

account chủ nhà
- Email: chunha@example.com
- Password: 123456
