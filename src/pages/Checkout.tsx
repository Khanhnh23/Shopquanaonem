import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([]);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: form,
      paymentMethod,
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Đặt hàng thành công 🎉");

    navigate("/orders");
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <div
        className="container-fluid py-5"
        style={{
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <div className="container">

          <div className="row g-4">

            {/* LEFT */}
            <div className="col-lg-7">

              <div className="card border-0 shadow-lg rounded-4 p-4">

                <h2 className="fw-bold mb-4">
                  💳 Thanh toán đơn hàng
                </h2>

                {/* FORM */}
                <input
                  name="name"
                  placeholder="Họ và tên"
                  className="form-control form-control-lg mb-3"
                  onChange={handleChange}
                />

                <input
                  name="phone"
                  placeholder="Số điện thoại"
                  className="form-control form-control-lg mb-3"
                  onChange={handleChange}
                />

                <input
                  name="address"
                  placeholder="Địa chỉ nhận hàng"
                  className="form-control form-control-lg mb-4"
                  onChange={handleChange}
                />

                {/* PAYMENT */}
                <h5 className="fw-bold mb-3">
                  Phương thức thanh toán
                </h5>

                {/* COD */}
                <div className="card border mb-3 p-3">

                  <div className="form-check d-flex align-items-center">

                    <input
                      className="form-check-input me-2"
                      type="radio"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <label className="form-check-label fw-semibold">
                      💵 Thanh toán khi nhận hàng (COD)
                    </label>

                  </div>

                </div>

                {/* BANK */}
                <div className="card border mb-4 p-3">

                  <div className="form-check d-flex align-items-center">

                    <input
                      className="form-check-input me-2"
                      type="radio"
                      value="BANK"
                      checked={paymentMethod === "BANK"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <label className="form-check-label fw-semibold">
                      🏦 Chuyển khoản ngân hàng
                    </label>

                  </div>

                </div>

                {/* COD INFO */}
                {paymentMethod === "COD" && (
                  <div className="alert alert-success rounded-3">

                    <h6 className="fw-bold">
                      🚚 Thanh toán khi nhận hàng
                    </h6>

                    <p className="mb-0">
                      Bạn sẽ thanh toán trực tiếp cho nhân viên giao hàng.
                    </p>

                  </div>
                )}

                {/* BANK INFO */}
                {paymentMethod === "BANK" && (
                  <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">

                    <h5 className="fw-bold text-center mb-3">
                      🏦 Quét mã QR để thanh toán
                    </h5>

                    <img
                      src="https://img.vietqr.io/image/VCB-123456789-compact2.png"
                      alt="QR"
                      className="img-fluid mx-auto d-block"
                      style={{
                        maxWidth: "260px",
                      }}
                    />

                    <div className="mt-4">

                      <div className="mb-2">
                        <strong>Ngân hàng:</strong> Vietcombank
                      </div>

                      <div className="mb-2">
                        <strong>Số tài khoản:</strong> 123456789
                      </div>

                      <div className="mb-2">
                        <strong>Chủ tài khoản:</strong> NGUYEN HUY KHANH
                      </div>

                      <div className="alert alert-warning mt-3 mb-0">
                        ⚠️ Nội dung chuyển khoản:
                        <br />
                        <strong>
                          THANHTOAN_{Date.now()}
                        </strong>
                      </div>

                    </div>

                  </div>
                )}

                {/* BUTTON */}
                <button
                  className="btn btn-dark btn-lg w-100 rounded-3"
                  onClick={handleSubmit}
                >
                  XÁC NHẬN THANH TOÁN
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="col-lg-5">

              <div className="card border-0 shadow-lg rounded-4 p-4">

                <h4 className="fw-bold mb-4">
                  🛒 Đơn hàng của bạn
                </h4>

                {cart.length === 0 ? (
                  <p>Không có sản phẩm</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center border-bottom pb-3 mb-3"
                    >

                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "90px",
                          height: "110px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          marginRight: "15px",
                        }}
                      />

                      {/* INFO */}
                      <div className="flex-grow-1">

                        <h6 className="fw-bold mb-1">
                          {item.name}
                        </h6>

                        <small className="text-muted d-block">
                          Số lượng: {item.quantity}
                        </small>

                        <small className="text-muted">
                          Giá: {item.price.toLocaleString()}đ
                        </small>

                      </div>

                      {/* PRICE */}
                      <strong className="text-danger">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </strong>

                    </div>
                  ))
                )}

                {/* TOTAL */}
                <div className="d-flex justify-content-between align-items-center mt-4">

                  <h5 className="fw-bold">
                    Tổng tiền:
                  </h5>

                  <h3 className="text-danger fw-bold">
                    {total.toLocaleString()}đ
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Checkout;