'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import useAuthStore from '@/store/useAuthStore';
import { register } from '../services/authServices';
import { sentEmail } from '@/services/authServices';

export default function Register() {
  const { showPassword, showConfirmPassword, togglePasswordVisibility, toggleConfirmPasswordVisibility } = useAuthStore();

  const [formData, setFormData] = useState({
    name:'',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });

  const [isSendingCode, setIsSendingCode] = useState(false);  
  const [buttonDisabled, setButtonDisabled] = useState(false);  


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

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp.');
      return false;
    }

    if (!formData.verificationCode) {
      toast.error('Mã xác minh không được để trống.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await register(formData.name, formData.username, formData.email, formData.password , formData.verificationCode)
      console.log("res >>>",res)
    }
    else{
      toast.error('Đăng Ký thất bại')
    }
  };

  const handleSendCode = async () => {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Email không hợp lệ.');
      return;
    }

    toast.success('Mã xác minh đã được gửi về email của bạn!');

    setIsSendingCode(true);
    setButtonDisabled(true);

    setTimeout(() => {
      setIsSendingCode(false);
      setButtonDisabled(false);
    }, 5000); 

    const res = await sentEmail(formData.email)
    console.log("res >>>",res)
  };

  return (
    <div className="bg-orange-600 min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <ToastContainer />
        <div
          className="grid grid-cols-1 lg:grid-cols-5 bg-cover bg-center py-12 lg:py-32 lg:pr-10"
        >
            <div className='w-[450px] h-[500px] ml-[140px]'>
              <img src='/logo/LogoBig.svg'></img>
            </div>
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded-lg bg-white p-10 shadow-lg" noValidate onSubmit={handleSubmit}>
              <div className="text-2xl font-semibold text-gray-800 mb-6">Đăng ký</div>
              <div className="mt-8 relative">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pr-[50px] p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
                />
              </div>
              <div className="mt-4 relative">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pr-[50px] p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
                />
              </div>
              <div className="relative mt-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pr-[90px] p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={buttonDisabled}
                  className={`absolute right-2 top-[7px] bg-blue-500 px-3 py-2 text-sm text-white rounded-md hover:bg-blue-600 transition ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSendingCode ? 'Đang gửi...' : 'Gửi mã'}
                </button>
              </div>

              <div className="mt-4 relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="on"
                  className="pr-[60px] w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
                />
                <i
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute text-[25px] right-3 top-3.5 cursor-pointer`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>

              <div className="mt-4 relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="on"
                  className="pr-[60px] w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
                />
                <i
                  className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} absolute text-[25px] right-3 top-3.5 cursor-pointer`}
                  onClick={toggleConfirmPasswordVisibility}
                ></i>
              </div>

              <div className="mt-4">
                <input
                  name="verificationCode"
                  type="text"
                  placeholder="Mã xác minh"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="pr-[60px] w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300 outline-none"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-red-500 px-4 py-3 text-white font-medium uppercase hover:bg-red-600 transition"
                >
                  Đăng ký
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center text-sm text-gray-500">
                <span>Bạn đã có tài khoản?</span>
                <Link href="login" className="ml-1 text-red-500 font-medium hover:underline">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
