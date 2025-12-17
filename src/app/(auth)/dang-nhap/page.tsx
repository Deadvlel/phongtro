'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Mình lược bỏ Card vì trong layout chia đôi, form đứng độc lập sẽ đẹp hơn
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, Building2, Quote } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  matKhau: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: data.email,
        matKhau: data.matKhau,
        redirect: false,
      });

      if (result?.error) {
        setError('Email hoặc mật khẩu không đúng');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden">
      
      {/* CỘT TRÁI: Trang trí & Branding (Chỉ hiện trên Desktop) */}
      <div className="hidden lg:flex relative flex-col justify-between bg-zinc-900 p-10 text-white dark:border-r">
        {/* Background Overlay hoặc Gradient */}
        <div className="absolute inset-0 bg-blue-600 opacity-20" />
        
        {/* Logo */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Building2 className="mr-2 h-6 w-6" />
          Boarding House System
        </div>

        {/* Quote/Testimonial */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <div className="flex gap-2 text-blue-200">
               <Quote className="h-8 w-8 rotate-180" />
            </div>
            <p className="text-lg">
              &ldquo;Hệ thống giúp tôi tiết kiệm 50% thời gian quản lý và tránh thất thoát tiền điện nước hàng tháng. Một công cụ không thể thiếu cho chủ trọ.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400 mt-4">Admin Hệ Thống</footer>
          </blockquote>
        </div>
      </div>

      {/* CỘT PHẢI: Form Đăng Nhập */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 h-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          
          {/* Header Mobile (Logo chỉ hiện khi màn hình nhỏ) */}
          <div className="flex flex-col space-y-2 text-center">
            <div className="lg:hidden flex justify-center mb-2">
                 <div className="p-2 bg-blue-100 rounded-full">
                    <Building2 className="h-6 w-6 text-blue-600" />
                 </div>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Đăng nhập tài khoản
            </h1>
            <p className="text-sm text-muted-foreground text-gray-500">
              Nhập email và mật khẩu để truy cập trang quản trị
            </p>
          </div>

          {/* Form container */}
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                
                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <Label htmlFor="matKhau">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="matKhau"
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...register('matKhau')}
                      className={`pr-10 ${errors.matKhau ? 'border-red-500' : ''}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500 hover:text-gray-900"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.matKhau && (
                    <p className="text-xs text-red-500">{errors.matKhau.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button disabled={isLoading} className="w-full mt-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </div>
            </form>

            {/* Link quay về trang chủ */}
            <div className="text-center text-sm text-gray-500 mt-4">
               <Link href="/" className="hover:text-blue-600 underline underline-offset-4">
                  Quay lại trang chủ
               </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}