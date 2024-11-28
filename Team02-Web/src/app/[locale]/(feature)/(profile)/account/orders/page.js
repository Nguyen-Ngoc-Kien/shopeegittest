import React from "react";
import orders from "./dataOrders/order";
import OrderItem from "./orderItems/OrderItem";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          {["Tất cả", "Chờ thanh toán", "Vận chuyển", "Chờ giao hàng", "Hoàn thành", "Đã hủy", "Trả hàng/Hoàn tiền"].map(
            (tab) => (
              <button
                key={tab}
                className="text-gray-700 hover:text-orange-500 border-orange-500 pb-2 px-3 font-semibold"
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
          />
        </div>

        {/* Order List */}
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
