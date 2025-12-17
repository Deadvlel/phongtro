import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import NguoiDung from '@/models/NguoiDung';
import ToaNha from '@/models/ToaNha';
import Phong from '@/models/Phong';
import KhachThue from '@/models/KhachThue';
import HopDong from '@/models/HopDong';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // 1. Xóa sạch dữ liệu cũ
    await Promise.all([
      NguoiDung.deleteMany({}),
      ToaNha.deleteMany({}),
      Phong.deleteMany({}),
      KhachThue.deleteMany({}),
      HopDong.deleteMany({})
    ]);

    // 2. Tạo Admin & Chủ nhà
    const admin = await NguoiDung.create({
      ten: 'Admin Hệ Thống',
      email: 'admin@example.com',
      matKhau: '123456',
      soDienThoai: '0326132124',
      vaiTro: 'admin',
      trangThai: 'hoatDong',
      name: 'Admin System',
      password: '123456',
      phone: '0326132124',
      role: 'admin',
      isActive: true,
    });

    const chuNha = await NguoiDung.create({
      ten: 'Nguyễn Văn Chủ',
      email: 'chunha@example.com',
      matKhau: '123456',
      soDienThoai: '0987654321',
      vaiTro: 'chuNha',
      trangThai: 'hoatDong',
      name: 'Nguyen Van Chu',
      password: '123456',
      phone: '0987654321',
      role: 'chuNha',
      isActive: true,
    });

    // 3. Tạo 3 Tòa nhà (Dựa trên enum của ToaNhaSchema bạn đã gửi)
    const danhSachToaNha = [];
    const tienNghiToaNha: any[] = ['wifi', 'camera', 'giuXe', 'baoVe'];

    for (let i = 1; i <= 3; i++) {
      const tn = await ToaNha.create({
        tenToaNha: `Toa Nha Landmark 0${i}`,
        diaChi: {
          soNha: `${i * 5}`,
          duong: 'Le Duan',
          phuong: 'Phuong Lien',
          quan: 'Dong Da',
          thanhPho: 'Ha Noi',
        },
        moTa: `Toà nhà cao cấp số ${i}`,
        tienNghiChung: tienNghiToaNha,
        chuSoHuu: chuNha._id
      });
      danhSachToaNha.push(tn);
    }

    // 4. Tạo 3 Phòng mỗi tòa nhà (Sử dụng mảng tiện nghi rỗng để tránh lỗi Enum)
    const danhSachPhong = [];
    for (const tn of danhSachToaNha) {
      // Lấy ký tự cuối của tên tòa nhà để làm mã phòng phân biệt
      const suffix = tn.tenToaNha.slice(-1); 
      for (let tang = 1; tang <= 3; tang++) {
        const p = await Phong.create({
          maPhong: `P${tang}01T${suffix}`, 
          toaNha: tn._id,
          tang: tang,
          dienTich: 25,
          giaThue: 3000000 + (tang * 100000),
          tienCoc: 3000000,
          moTa: `Phòng sạch đẹp tầng ${tang}`,
          soNguoiToiDa: 2,
          trangThai: 'trong',
          // ĐỂ TRỐNG TIỆN NGHI PHÒNG ĐỂ TRÁNH LỖI VALIDATION ENUM
          tienNghi: [], 
        });
        danhSachPhong.push(p);
      }
    }

    // 5. Tạo 5 Khách thuê
    const khachData = [
      { hoTen: 'Nguyễn Văn A', sdt: '0912345001', cccd: '001203000001' },
      { hoTen: 'Trần Thị B', sdt: '0912345002', cccd: '001203000002' },
      { hoTen: 'Lê Văn C', sdt: '0912345003', cccd: '001203000003' },
      { hoTen: 'Phạm Thị D', sdt: '0912345004', cccd: '001203000004' },
      { hoTen: 'Hoàng Văn E', sdt: '0912345005', cccd: '001203000005' },
    ];

    for (const k of khachData) {
      await KhachThue.create({
        hoTen: k.hoTen,
        soDienThoai: k.sdt,
        email: `${k.sdt}@gmail.com`,
        cccd: k.cccd,
        ngaySinh: new Date('1998-05-20'),
        gioiTinh: 'nam',
        queQuan: 'Hà Nội',
        trangThai: 'chuaThue'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Seed dữ liệu thành công!',
      summary: {
        admin: admin.email,
        buildings: danhSachToaNha.length,
        rooms: danhSachPhong.length,
        tenants: khachData.length
      }
    });

  } catch (error: any) {
    console.error('Lỗi khi seed data:', error);
    return NextResponse.json(
      { 
        message: 'Lỗi khởi tạo dữ liệu', 
        error: error.message,
        path: error.stack?.split('\n')[1] // Trả về dòng lỗi để dễ tìm
      },
      { status: 500 }
    );
  }
}