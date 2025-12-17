# Hệ thống quản lý phòng trọ
Hệ thống quản lý phòng trọ hiện đại và toàn diện được xây dựng với Next.js 15, TypeScript và MongoDB.

## 🚀 Tính năng chính

### 🏢 Quản lý tòa nhà
- CRUD thông tin tòa nhà
- Upload ảnh tòa nhà
- Quản lý tiện ích chung
- Xem danh sách phòng theo tòa nhà

### 🏠 Quản lý phòng
- CRUD thông tin phòng
- Upload ảnh phòng
- Lọc phòng theo trạng thái
- Xem lịch sử thuê phòng
- Quản lý tiện nghi phòng

### 👥 Quản lý khách thuê
- CRUD thông tin khách thuê
- Upload ảnh CCCD
- Lịch sử thuê phòng
- Lịch sử thanh toán

### 📄 Quản lý hợp đồng
- Tạo hợp đồng mới
- Upload file hợp đồng PDF
- Gia hạn hợp đồng
- Chấm dứt hợp đồng
- In hợp đồng

### ⚡ Quản lý chỉ số điện nước
- Ghi chỉ số hàng tháng
- Upload ảnh chỉ số
- Tự động tính tiêu thụ
- Lịch sử chỉ số

### 🧾 Quản lý hóa đơn
- Tạo hóa đơn tự động theo chu kỳ
- Tính toán tự động: tiền điện, nước, dịch vụ
- Gửi thông báo hóa đơn
- In hóa đơn
- Xuất báo cáo Excel

### 💰 Quản lý thanh toán
- Ghi nhận thanh toán
- Upload biên lai
- Lịch sử thanh toán
- Xuất phiếu thu

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4.1
- **State Management**: React Hooks, Context API
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: lucide-react

### Backend
- **API**: Next.js API Routes (App Router)
- **Authentication**: NextAuth.js (JWT + Session)
- **Database**: MongoDB với Mongoose ODM

---

## 🚀 HƯỚNG DẪN SETUP 

### Bước 1: Chuẩn bị môi trường
#### 1.1. Cài đặt Node.js
```bash
node --version    # Nên >= v18.0.0
npm --version     # Nên >= 9.0.0
```
### Bước 3: Cài đặt dependencies

```bash
# Cài đặt tất cả package cần thiết (có thể mất 2-5 phút)
npm install

```

### Bước 4: Cấu hình Environment Variables

#### 4.1. Tạo file .env.local

#### 4.2. Cấu hình MongoDB URI
```bash
## **Mở file `.env.local`** bằng editor và cập nhật các thông tin 
```
### Bước 5: Chạy ứng dụng
```bash
npm run dev
```
### Bước 6: Tạo dữ liệu mẫu (Optional)

#### Mở Terminal mới (giữ server đang chạy)

#### Gọi API seed data

```bash
# Windows PowerShell
Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST

##Đăng nhập với tài khoản mặc định

- **Email**: `admin@example.com`
- **Password**: `admin123`


## 📝 Checklist Setup

cài đặt Node.js 18+
clone repository
chạy `npm install` thành công
tạo file `.env.local`
cấu hình MONGODB_URI với **TÊN DATABASE**
tạo NEXTAUTH_SECRET
chạy `npm run dev` thành công
Truy cập http://localhost:3000 được
seed data và đăng nhập được



## 📊 Database Schema

Hệ thống sử dụng MongoDB với các collection chính:

- **NguoiDung**: Quản lý người dùng (admin, chủ nhà)
- **ToaNha**: Thông tin tòa nhà
- **Phong**: Thông tin phòng trọ
- **KhachThue**: Thông tin khách thuê
- **HopDong**: Hợp đồng thuê phòng
- **ChiSoDienNuoc**: Chỉ số điện nước hàng tháng
- **HoaDon**: Hóa đơn thanh toán
- **ThanhToan**: Giao dịch thanh toán


## 🔐 Authentication

Hệ thống sử dụng NextAuth.js với:
- JWT tokens
- Session management
- Role-based access control (admin, chủ nhà)
- Protected routes

## 📱 Responsive Design

- Mobile-first approach
- Sidebar collapse trên mobile
- Bảng responsive với horizontal scroll
- Form stack trên mobile


### Docker
```bash
docker build -t motel-management .
docker run -p 3000:3000 motel-management
```

## 📝 API Documentation

### Authentication
- `POST /api/auth/[...nextauth]` - Đăng nhập

### Tòa nhà
- `GET /api/toa-nha` - Lấy danh sách tòa nhà
- `POST /api/toa-nha` - Tạo tòa nhà mới
- `GET /api/toa-nha/[id]` - Lấy thông tin tòa nhà
- `PUT /api/toa-nha/[id]` - Cập nhật tòa nhà
- `DELETE /api/toa-nha/[id]` - Xóa tòa nhà

### Phòng
- `GET /api/phong` - Lấy danh sách phòng
- `POST /api/phong` - Tạo phòng mới
- `GET /api/phong/[id]` - Lấy thông tin phòng
- `PUT /api/phong/[id]` - Cập nhật phòng
- `DELETE /api/phong/[id]` - Xóa phòng

### Khách thuê
- `GET /api/khach-thue` - Lấy danh sách khách thuê
- `POST /api/khach-thue` - Tạo khách thuê mới
- `GET /api/khach-thue/[id]` - Lấy thông tin khách thuê
- `PUT /api/khach-thue/[id]` - Cập nhật khách thuê
- `DELETE /api/khach-thue/[id]` - Xóa khách thuê

### Hợp đồng
- `GET /api/hop-dong` - Lấy danh sách hợp đồng
- `POST /api/hop-dong` - Tạo hợp đồng mới
- `GET /api/hop-dong/[id]` - Lấy thông tin hợp đồng
- `PUT /api/hop-dong/[id]` - Cập nhật hợp đồng
- `DELETE /api/hop-dong/[id]` - Xóa hợp đồng

### Chỉ số điện nước
- `GET /api/chi-so-dien-nuoc` - Lấy danh sách chỉ số
- `POST /api/chi-so-dien-nuoc` - Ghi chỉ số mới

### Hóa đơn
- `GET /api/hoa-don` - Lấy danh sách hóa đơn
- `POST /api/hoa-don` - Tạo hóa đơn mới

### Thanh toán
- `GET /api/thanh-toan` - Lấy danh sách thanh toán
- `POST /api/thanh-toan` - Ghi nhận thanh toán

### Thông báo
- `GET /api/thong-bao` - Lấy danh sách thông báo
- `POST /api/thong-bao` - Gửi thông báo

### Dashboard
- `GET /api/dashboard/stats` - Lấy thống kê dashboard


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)