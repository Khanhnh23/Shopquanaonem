import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  material?: string;
  color?: string;
  size?: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5265/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi API");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  // ADD TO CART
  const addProductToCart = () => {
    if (!product) return;

    const cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // THÊM GIỎ
  const handleAddToCart = () => {
    addProductToCart();

    alert("Đã thêm vào giỏ hàng 🛒");
  };

  // MUA NGAY
  const handleBuyNow = () => {
    addProductToCart();

    navigate("/cart");
  };

  if (!product) {
    return (
      <h3 className="text-center mt-5">
        Đang tải sản phẩm...
      </h3>
    );
  }

  return (
    <div className="container py-5">

      <div className="row g-5 align-items-start">

        {/* IMAGE */}
        <div className="col-md-6">

          <div className="bg-white rounded shadow-sm p-3 text-center">

            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                width: "100%",
                maxHeight: "650px",
                objectFit: "cover"
              }}
            />

          </div>

        </div>

        {/* INFO */}
        <div className="col-md-6">

          <span className="text-muted text-uppercase">
            {product.category}
          </span>

          <h2 className="fw-bold mt-2">
            {product.name}
          </h2>

          <h3 className="text-danger fw-bold mt-3">
            {(product.price * 1000).toLocaleString("vi-VN")}đ
          </h3>

          <p className="text-secondary mt-4">
            {product.description}
          </p>

          {/* INFO BOX */}
          <div className="border rounded p-3 bg-light mt-4">

            <p className="mb-2">
              🚚 Miễn phí vận chuyển toàn quốc
            </p>

            <p className="mb-2">
              🔄 Đổi trả trong 7 ngày
            </p>

            <p className="mb-0">
              ⭐ Hàng chính hãng cao cấp
            </p>

          </div>

          {/* DETAILS */}
          <div className="mt-4">

            <p>
              <strong>Chất liệu:</strong>{" "}
              {product.material ?? "Cotton cao cấp"}
            </p>

            <p>
              <strong>Màu sắc:</strong>{" "}
              {product.color ?? "Đang cập nhật"}
            </p>

            <p>
              <strong>Kích thước:</strong>{" "}
              {product.size ?? "S / M / L / XL"}
            </p>

          </div>

          {/* QUANTITY */}
          <div className="mt-4">

            <p className="fw-semibold">
              Số lượng
            </p>

            <div className="d-flex align-items-center gap-3">

              <button
                className="btn btn-outline-dark"
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
              >
                -
              </button>

              <span className="fs-5 fw-bold">
                {quantity}
              </span>

              <button
                className="btn btn-outline-dark"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>

            </div>

          </div>

          {/* BUTTON */}
          <div className="d-flex gap-3 mt-5">

            <button
              className="btn btn-outline-dark w-50 py-3"
              onClick={handleAddToCart}
            >
              🛒 Thêm vào giỏ
            </button>

            <button
              className="btn btn-dark w-50 py-3"
              onClick={handleBuyNow}
            >
              ⚡ Mua ngay
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;