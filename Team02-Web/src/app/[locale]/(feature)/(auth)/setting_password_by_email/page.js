'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

export default function SetPassword() {
    const { showPassword, togglePasswordVisibility } = useAuthStore();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const backHome = () => {
    router.push('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái, số và ký tự đặc biệt!');
      return;
    }

    setIsSubmitting(true);

    const mockApiCall = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    try {
      await mockApiCall;
      toast.success('Mật khẩu đã được thay đổi thành công!');

      setTimeout(() => {
        router.push('login');
      }, 1000); 

    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="container mx-auto px-4 flex justify-center mt-[150px]">
        <div className="max-w-[500px] w-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center">
            <i className="fas fa-arrow-left cursor-pointer text-[27px]" onClick={backHome}></i>
            <span className="text-2xl font-bold text-gray-800 mb-6 pt-[17px] pl-[100px]">Thiết lập mật khẩu</span>
          </div>
          <div>
            <span className='block text-center text-[20px] my-1 font-semibold'>Tạo mật khẩu mới cho:</span>
            <span className='block text-center text-[19px]'>example@gmail.com</span>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="my-5 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[18px] w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
              />
                              <i
                  className={`fas ${
                    showPassword ? 'fa-eye-slash' : 'fa-eye'
                  } absolute text-[25px] right-3 top-3.5 cursor-pointer`}
                  onClick={togglePasswordVisibility}
                ></i>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-500 text-white py-3 rounded-md font-medium hover:bg-red-600 transition disabled:opacity-50 my-1"
            >
              {isSubmitting ? 'Đang thay đổi...' : 'Xác nhận'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}