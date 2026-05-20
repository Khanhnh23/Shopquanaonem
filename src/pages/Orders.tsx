import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: any[];
  total: number;
  date: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data);
  }, []);

  return (
    <div className="container py-5">
      <h2>📦 Danh sách đơn hàng</h2>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-3 mb-3">
            <h5>🆔 Mã đơn: {order.id}</h5>
            <p>👤 Khách: {order.customer.name}</p>
            <p>📞 SĐT: {order.customer.phone}</p>
            <p>📍 Địa chỉ: {order.customer.address}</p>
            <p>📅 Ngày: {order.date}</p>

            <hr />

            {order.items.map((item, index) => (
              <div key={index}>
                {item.name} - {item.quantity} x {item.price}.000đ
              </div>
            ))}

            <h5 className="text-end mt-2">
              💰 Tổng: {order.total}.000đ
            </h5>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;