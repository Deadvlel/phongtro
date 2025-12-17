import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, LogIn, Building2 } from "lucide-react"; // Thêm icon Building2 cho sinh động

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
      {/* Container chính */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* CỘT TRÁI: Nội dung chính & Nút bấm */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1">
            
            {/* Logo/Badge nhỏ phía trên */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Smart Management</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hệ thống quản lý <br className="hidden lg:block" />
                <span className="text-blue-600">Phòng Trọ</span> Tiện Lợi
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Giải pháp toàn diện giúp bạn vận hành, quản lý cư dân và tài chính một cách hiệu quả, minh bạch và tự động hóa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/dang-nhap" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <LogIn className="h-5 w-5 mr-2" />
                  Đăng nhập ngay
                </Button>
              </Link>
            </div>
          
          </div>

          {/* CỘT PHẢI: Card thông tin (Giao diện thẻ nổi) */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Hiệu ứng trang trí nền (Blur blob) - giữ màu nhẹ nhàng */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <HomeIcon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Thông tin hệ thống</h2>
                  <p className="text-sm text-gray-500">Phân quyền truy cập</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="group p-4 bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl border border-blue-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-blue-900 mb-1">Quản trị viên (Admin)</h3>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        Kiểm soát toàn bộ hệ thống, quản lý người dùng và cấu hình.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 bg-green-50 hover:bg-green-100 transition-colors rounded-xl border border-green-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-green-900 mb-1">Chủ nhà (Landlord)</h3>
                      <p className="text-sm text-green-700 leading-relaxed">
                        Quản lý phòng, hợp đồng, điện nước và hóa đơn cư dân.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400 italic">
                  Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}