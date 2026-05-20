  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";

  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    slug?: string;
  }

  const Products = () => {
    const navigate = useNavigate();
    const { category } = useParams();

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch("http://localhost:5265/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }, []);

    // SLUGIFY
    const slugify = (text: string) => {
      return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/\s+/g, "");
    };

    // FILTER CATEGORY
    const filteredProducts = products.filter((p) => {
      if (!category) return true;

      // Nếu có slug từ BE thì dùng slug
      if (p.slug) {
        return p.slug === category;
      }

      // fallback nếu chưa có slug
      return slugify(p.category) === category;
    });

    return (
      <div className="container py-5">

        {/* TITLE */}
        <h2 className="text-center fw-bold mb-5">
          {category
            ? `DANH MỤC: ${category.toUpperCase()}`
            : "TẤT CẢ SẢN PHẨM"}
        </h2>

        {/* PRODUCTS */}
        <div className="row g-4">

          {filteredProducts.map((p) => (
            <div className="col-6 col-md-3" key={p.id}>

              <div className="card border-0 h-100 shadow-sm">

                {/* IMAGE */}
                <div className="overflow-hidden rounded">

                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img-top"
                    style={{
                      height: "420px",
                      objectFit: "cover",
                      transition: "0.4s"
                    }}
                  />

                </div>

                {/* BODY */}
                <div className="card-body text-center">

                  <small className="text-muted text-uppercase">
                    {p.category}
                  </small>

                  <h6 className="mt-2 fw-semibold">
                    {p.name}
                  </h6>

                  <p className="text-danger fw-bold">
                    {(p.price * 1000).toLocaleString("vi-VN")}đ
                  </p>

                  <button
                    className="btn btn-dark w-100"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    Xem chi tiết
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* EMPTY */}
        {filteredProducts.length === 0 && (
          <div className="text-center mt-5">
            <h5>Không có sản phẩm</h5>
          </div>
        )}

      </div>
    );
  };

  export default Products;