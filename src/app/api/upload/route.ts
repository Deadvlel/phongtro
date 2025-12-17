import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { message: 'Không có file được chọn' },
        { status: 400 }
      );
    }

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Chỉ được upload file ảnh' },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file (tối đa 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'Kích thước file không được vượt quá 10MB' },
        { status: 400 }
      );
    }

    // Đọc file thành buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo tên file unique (timestamp + tên gốc)
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Xóa ký tự đặc biệt
    const fileName = `${timestamp}-${originalName}`;

    // Đường dẫn lưu file (trong thư mục public/uploads)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Tạo thư mục uploads nếu chưa có
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Đường dẫn đầy đủ của file
    const filePath = path.join(uploadsDir, fileName);

    // Lưu file vào server
    await writeFile(filePath, buffer);

    // URL để truy cập file (đường dẫn public)
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      data: {
        fileName: fileName,
        url: fileUrl,
        fullUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${fileUrl}`,
        size: file.size,
        type: file.type,
      },
      message: 'Upload ảnh thành công',
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi upload file' },
      { status: 500 }
    );
  }
}

// API để xóa ảnh
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { message: 'Tên file là bắt buộc' },
        { status: 400 }
      );
    }

    // Đường dẫn file cần xóa
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    // Kiểm tra file có tồn tại không
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { message: 'File không tồn tại' },
        { status: 404 }
      );
    }

    // Xóa file
    const { unlink } = await import('fs/promises');
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: 'Xóa ảnh thành công',
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi xóa file' },
      { status: 500 }
    );
  }
}