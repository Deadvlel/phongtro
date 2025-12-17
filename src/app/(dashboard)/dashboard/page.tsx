'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Building2, 
  DoorOpen, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Clock,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { DashboardStats } from '@/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard Quản lý';
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setStats(result.data);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  // Tính toán phần trăm cho thanh hiển thị trạng thái phòng
  const percentRented = Math.round((stats.phongDangThue / stats.tongSoPhong) * 100) || 0;
  const percentEmpty = Math.round((stats.phongTrong / stats.tongSoPhong) * 100) || 0;
  const percentMaintenance = Math.round((stats.phongBaoTri / stats.tongSoPhong) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Tổng quan hệ thống quản lý phòng trọ</p>
      </div>

      {/* Stats Cards - Hàng 1: Các chỉ số chính */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="p-4 shadow-sm border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Tổng phòng</p>
              <p className="text-2xl font-bold mt-1">{stats.tongSoPhong}</p>
              <p className="text-xs text-gray-500 mt-1">
                Quy mô hệ thống
              </p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Phòng trống</p>
              <p className="text-2xl font-bold mt-1 text-green-600">{stats.phongTrong}</p>
              <p className="text-xs text-gray-500 mt-1">
                {percentEmpty}% tổng số phòng
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
                <DoorOpen className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Doanh thu tháng</p>
              <p className="text-2xl font-bold mt-1 text-indigo-700">{formatCurrency(stats.doanhThuThang)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Thực thu tháng này
              </p>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Sự cố</p>
              <p className="text-xs text-gray-500 mt-1">
                Đang chờ xử lý
              </p>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Stats - Hàng 2: Các công việc cần chú ý */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
               <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div>
               <p className="text-sm font-medium text-gray-600">Hóa đơn sắp đến hạn</p>
               <p className="text-2xl font-bold text-gray-900">{stats.hoaDonSapDenHan}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
           <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
               <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
               <p className="text-sm font-medium text-gray-600">Hợp đồng sắp hết hạn</p>
               <p className="text-2xl font-bold text-gray-900">{stats.hopDongSapHetHan}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
           <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-full">
               <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
            <div>
               <p className="text-sm font-medium text-gray-600">Tổng doanh thu năm</p>
               <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.doanhThuNam)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Section: Thay thế Activity bằng Room Overview Visual */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-gray-50/50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-lg">Tình trạng lấp đầy phòng</CardTitle>
                <CardDescription>Biểu đồ phân bố trạng thái phòng hiện tại</CardDescription>
            </div>
            <div className="text-2xl font-bold text-blue-600">
                {percentRented}% <span className="text-sm font-normal text-gray-500">đã thuê</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
            {/* Visual Progress Bar */}
            <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden flex mb-6">
                <div style={{ width: `${percentRented}%` }} className="bg-blue-500 h-full transition-all duration-500 hover:bg-blue-600" title={`Đang thuê: ${stats.phongDangThue}`}></div>
                <div style={{ width: `${percentEmpty}%` }} className="bg-green-500 h-full transition-all duration-500 hover:bg-green-600" title={`Phòng trống: ${stats.phongTrong}`}></div>
                <div style={{ width: `${percentMaintenance}%` }} className="bg-orange-400 h-full transition-all duration-500 hover:bg-orange-500" title={`Bảo trì: ${stats.phongBaoTri}`}></div>
            </div>

            {/* Legend / Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Đang thuê</p>
                        <p className="text-lg font-bold">{stats.phongDangThue}</p>
                    </div>
                    <Building2 className="text-blue-200 h-8 w-8" />
                </div>

                <div className="flex items-center p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Còn trống</p>
                        <p className="text-lg font-bold">{stats.phongTrong}</p>
                    </div>
                    <CheckCircle2 className="text-green-200 h-8 w-8" />
                </div>

                <div className="flex items-center p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-orange-400 mr-3"></div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Đang bảo trì</p>
                        <p className="text-lg font-bold">{stats.phongBaoTri}</p>
                    </div>
                    <Wrench className="text-orange-200 h-8 w-8" />
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}