import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/images/slide1.png";
import slide2 from "../assets/images/slide2.png";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

  const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
useEffect(() => {
  fetch("http://localhost:5265/api/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
    })
    .catch((err) => console.log(err));
}, []);
  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((x: Product) => x.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Đã thêm vào giỏ hàng 🛒");
  };

  return (
    <>
<div
  id="heroCarousel"
  className="carousel slide"
  data-bs-ride="carousel"
>

  {/* Indicators */}
  <div className="carousel-indicators">

    <button
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide-to="0"
      className="active"
    ></button>

    <button
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide-to="1"
    ></button>

  </div>

  {/* Slides */}
  <div className="carousel-inner">

    <div className="carousel-item active">
      <img
        src={slide1}
        className="d-block w-100 hero-img"
        alt="slide1"
        style={{height: "750px",objectFit: "cover",objectPosition: "top"
}}
      />
    </div>

    <div className="carousel-item">
      <img
        src={slide2}
        className="d-block w-100 hero-img"
        alt="slide2"
        style={{ height: "750px", objectFit: "cover",objectPosition: "top" }}
      />
    </div>

  </div>

  {/* PREV */}
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#heroCarousel"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon"></span>
  </button>

  {/* NEXT */}
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#heroCarousel"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon"></span>
  </button>

</div>

      {/* ================= CATEGORY ================= */}
      {/* <div className="container text-center my-4">

        {["Tất cả", "Đầm", "Áo", "Chân váy", "Áo dài"].map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm mx-1 ${
              selectedCategory === cat ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}

      </div> */}

      {/* ================= PRODUCTS ================= */}
      <div className="container py-4">

        <h3 className="text-center mb-4 fw-bold">
          SẢN PHẨM NỔI BẬT
        </h3>

        <div className="row g-4">

          {products.map((p) => (
            <div className="col-6 col-md-3" key={p.id}>

              <div className="card shadow-sm border-0">

                <img
                  src={p.image}
                  className="card-img-top"
                  style={{ height: "460px", objectFit: "cover" }}
                />

                <div className="card-body text-center">

                  <small>{p.category}</small>
                  <h6>{p.name}</h6>
                  <p className="text-danger">{p.price}.000đ</p>

                  <button
                    className="btn btn-outline-dark w-100 mb-2"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    Xem chi tiết
                  </button>

                  <button
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(p)}
                  >
                    Thêm vào giỏ 🛒
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default Home;