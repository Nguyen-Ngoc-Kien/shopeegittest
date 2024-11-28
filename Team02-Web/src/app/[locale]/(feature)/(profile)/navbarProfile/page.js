'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function UserProfileWithNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái mở menu
  const router = useRouter(); // Router để điều hướng
  const pathname = usePathname(); // Lấy URL hiện tại để quyết định tab đang chọn

  const tabs = {
    profile: 'Hồ Sơ',
    changePassword: 'Đổi mật khẩu',
    orders: 'Đơn mua',
    notifications: 'Thông báo',
  };

  // Xác định tab đang hoạt động dựa vào URL
  const activeTab = Object.keys(tabs).find((tab) => pathname.includes(tab)) || 'profile';

  const handleTabChange = (tab) => {
    router.push(`${tab}`); // Điều hướng URL tới tab tương ứng
    setIsMenuOpen(false); // Đóng menu sau khi chọn tab
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
      {/* Sidebar / Navbar */}
      <div className="sm:w-64 bg-white shadow-md h-auto sm:h-screen">
        <div className="p-4 sm:p-6 border-b flex items-center justify-between sm:block">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Avatar"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-4"
            />
            <div className="text-base sm:text-lg font-semibold text-gray-800 hidden sm:block">
              User123
            </div>
          </div>
          {/* Nút menu (hiện chỉ khi màn hình nhỏ) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu collapse */}
        <nav
          className={`p-4 sm:p-6 transition-all duration-300 ${
            isMenuOpen ? 'block' : 'hidden'
          } sm:block`}
        >
          <ul className="space-y-3 sm:space-y-4">
            <li>
              <button
                onClick={() => handleTabChange('profile')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'profile' || activeTab === 'changePassword'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tài khoản của tôi
              </button>
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => handleTabChange('profile')}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'profile'
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Hồ Sơ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange('changePassword')}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'changePassword'
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Đổi mật khẩu
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('orders')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'orders' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Đơn mua
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('notifications')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'notifications' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Thông báo
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
