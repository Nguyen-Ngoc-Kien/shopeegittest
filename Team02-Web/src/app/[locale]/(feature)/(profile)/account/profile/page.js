'use client';

import React, { useEffect, useState } from 'react';
import { getUserProfile } from './services/authServices';

export default function UserProfile() {
  const [formData, setFormData] = useState({
    username: 'user123', // Không thay đổi được
    name: '',
    email: 'user@example.com', // Không thay đổi được
    gender: '',
    dob: { day: '', month: '', year: '' },
    avatar: null,
    avatarPreview: '',
  });

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userProfile = await getUserProfile();
//         console.log('User Profile:', userProfile);
        
//         // Cập nhật formData với dữ liệu trả về từ API
//         setFormData({
//           username: userProfile.username || 'user123', // Cập nhật nếu có
//           name: userProfile.name || '',
//           email: userProfile.email || 'user@example.com',
//           gender: userProfile.gender || '',
//           dob: userProfile.dob || { day: '', month: '', year: '' },
//           avatarPreview: userProfile.avatar || '', // Ví dụ: lấy đường dẫn avatar từ API
//         });
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      dob: { ...prev.dob, [field]: value },
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', formData);
    alert('Hồ sơ đã được cập nhật thành công!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quản lý hồ sơ</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Information */}
          <div className="lg:col-span-2">
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                disabled
                className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên"
                className="w-full p-3 border rounded-md focus:ring focus:ring-orange-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-orange-300"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Ngày sinh</label>
              <div className="flex gap-2">
                <select
                  value={formData.dob.day}
                  onChange={(e) => handleDateChange('day', e.target.value)}
                  className="w-1/3 p-3 border rounded-md focus:ring focus:ring-orange-300"
                >
                  <option value="">Ngày</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.dob.month}
                  onChange={(e) => handleDateChange('month', e.target.value)}
                  className="w-1/3 p-3 border rounded-md focus:ring focus:ring-orange-300"
                >
                  <option value="">Tháng</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.dob.year}
                  onChange={(e) => handleDateChange('year', e.target.value)}
                  className="w-1/3 p-3 border rounded-md focus:ring focus:ring-orange-300"
                >
                  <option value="">Năm</option>
                  {[...Array(100)].map((_, i) => (
                    <option key={i} value={2023 - i}>
                      {2023 - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Avatar */}
          <div className="flex flex-col items-center justify-center">
            {/* Avatar Preview */}
            <div className="mb-4">
              <img
                src={formData.avatarPreview || 'https://via.placeholder.com/150'}
                alt="Avatar Preview"
                className="w-32 h-32 rounded-full object-cover border"
              />
            </div>

            {/* Avatar Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full text-sm text-gray-500 border rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition"
        >
          Cập nhật hồ sơ
        </button>
      </form>
    </div>
  );
}
