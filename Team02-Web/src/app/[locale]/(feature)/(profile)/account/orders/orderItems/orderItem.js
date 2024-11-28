import React from "react";

export default function OrderItem({ order }) {
  return (
    <div className="border rounded-lg mb-6 bg-white shadow">
      {/* Shop Info */}
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <div className="font-semibold text-gray-800">{order.shopName}</div>
        <div className="space-x-2">
          <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600">
            Chat
          </button>
          <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
            Xem Shop
          </button>
        </div>
      </div>

      {/* Order Items */}
      {order.items.map((item) => (
        <div key={item.id} className="p-4 flex items-start">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">x{item.quantity}</div>
            <div className="mt-2">
              <span className="font-bold text-orange-500">
                {item.price.toLocaleString()}₫
              </span>
              {item.originalPrice && (
                <span className="line-through text-gray-500 text-sm ml-2">
                  {item.originalPrice.toLocaleString()}₫
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Order Footer */}
      <div className="flex justify-between items-center px-4 py-2 border-t">
        <div className="text-sm text-gray-500">{order.status}</div>
        <div className="flex space-x-2">
          <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600">
            Mua lại
          </button>
          <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
            Xem Thông Tin Hoàn Tiền
          </button>
        </div>
      </div>
    </div>
  );
}
