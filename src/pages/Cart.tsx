import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate(); // ✅ thêm navigate

  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart([...data]);
  };

  useEffect(() => {
    loadCart();

    const handler = () => loadCart();

    window.addEventListener("cartUpdated", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("cartUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const syncCart = (newCart: CartItem[]) => {
    setCart([...newCart]);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increase = (id: number) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    syncCart(newCart);
  };

  const decrease = (id: number) => {
    let newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );

    newCart = newCart.filter((item) => item.quantity > 0);
    syncCart(newCart);
  };

  const remove = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    syncCart(newCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <h2>🛒 Giỏ hàng</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center border p-3 mb-3"
            >
              <img
                src={item.image}
                width="80"
                height="80"
                style={{ objectFit: "cover" }}
              />

              <div className="ms-3 flex-grow-1">
                <h5>{item.name}</h5>
                <p>{item.price}.000đ</p>
              </div>

              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => decrease(item.id)}
                >
                  -
                </button>

                <span className="mx-2">{item.quantity}</span>

                <button
                  className="btn btn-secondary"
                  onClick={() => increase(item.id)}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-danger ms-3"
                onClick={() => remove(item.id)}
              >
                Xóa
              </button>
            </div>
          ))}

          {/* ✅ Tổng tiền + Thanh toán */}
          <div className="text-end">
            <h4>Tổng tiền: {total}.000đ</h4>

            <button
              className="btn btn-success mt-3"
              onClick={() => navigate("/checkout")}
            >
              💳 Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;