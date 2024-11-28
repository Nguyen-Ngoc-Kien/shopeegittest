'use client';

import React, { useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
  const { showPassword, togglePasswordVisibility } = useAuthStore();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.email) {
      toast.error('Email không được để trống.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Email không hợp lệ.');
      return false;
    }

    if (!formData.password) {
      toast.error('Mật khẩu không được để trống.');
      return false;
    } else if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Đăng nhập thành công!');
    }
  };

  return (
<div className="bg-orange-600 min-h-screen flex items-center justify-center">
  <div className="container mx-auto px-4">
    <div
      className="grid grid-cols-1 lg:grid-cols-5 bg-cover bg-center py-12 lg:py-32 lg:pr-10"
    >
    <div className='w-[450px] h-[500px] ml-[140px]'>
     <img src='/logo/LogoBig.svg'></img>
    </div>
      <div className="lg:col-span-2 lg:col-start-4">
        <form
          className="rounded-lg bg-white p-6 sm:p-8 lg:p-10 shadow-lg"
          onSubmit={handleSubmit}
          noValidate
        >
          <ToastContainer />
          <div className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Đăng nhập
          </div>

          <div className="mb-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-base sm:text-lg pr-[55px] pl-3 py-3 w-full border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
            />
          </div>

          <div className="mb-4 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="text-base sm:text-lg pr-[55px] pl-3 py-3 w-full border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
            />
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } absolute text-[20px] sm:text-[25px] right-3 top-3 cursor-pointer`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="w-full rounded-md bg-red-500 px-4 py-3 text-white font-medium uppercase text-sm sm:text-base hover:bg-red-600 transition"
            >
              Đăng nhập
            </button>
          </div>

            <Link
              href="forgot_password"
              className="text-sm sm:text-base text-blue-600 hover:underline mb-5 flex justify-center"
            >
              Quên mật khẩu?
            </Link>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="flex items-center justify-center gap-[15px]">
              <div className="h-[1px] bg-gray-300 w-full"></div>
              <div className="relative text-center text-sm sm:text-base text-gray-400 uppercase bg-white px-4">
                hoặc
              </div>
              <div className="h-[1px] bg-gray-300 w-full"></div>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="flex w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-3 text-white font-medium text-sm sm:text-base hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition">
              <i className="fab fa-google text-lg sm:text-xl"></i>
              <span>Google</span>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center text-sm sm:text-base text-gray-500">
            <span>Bạn chưa có tài khoản?</span>
            <Link
              href="register"
              className="ml-1 text-red-500 font-medium hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
}
