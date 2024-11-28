'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();  

  const backLogin = () => {
    router.push('login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email không hợp lệ!');
      return;
    }

    setIsSubmitting(true);

    const mockApiCall = new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingEmails = ['example@gmail.com', 'user@test.com'];
        if (existingEmails.includes(email)) {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });

    try {
      await mockApiCall;
      toast.success('Email đã được gửi hướng dẫn để đặt lại mật khẩu!');

      setTimeout(() => {
        router.push('setting_password_by_email'); 
      }, 3000); 
    } catch {
      toast.error('Không tìm thấy email này trong hệ thống!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="container mx-auto px-4 flex justify-center mt-[300px]">
        <div className="max-w-[500px] w-full bg-white rounded-lg shadow-lg p-8">
          <div className='flex items-center'>
            <i className="fas fa-arrow-left cursor-pointer text-[27px]" onClick={backLogin} ></i>
            <span className="text-2xl font-bold text-gray-800 mb-6 pt-[17px] pl-[114px]">Đặt lại mật khẩu</span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="my-5">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-500 text-white py-3 rounded-md font-medium hover:bg-red-600 transition disabled:opacity-50 my-1"
            >
              {isSubmitting ? 'Đang gửi...' : 'Tiếp Theo'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
