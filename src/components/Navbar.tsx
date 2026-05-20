import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/images/LogoNEM.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // CART COUNT
  const [count, setCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const total = cart.reduce(
      (sum: number, item: any) => sum + (item.quantity || 0),
      0
    );

    setCount(total);
  };

  useEffect(() => {
    updateCartCount();

    const handler = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("cartUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm py-3">

      {/* LOGO */}
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          alt="logo"
          style={{ height: "40px" }}
        />
      </Link>

      {/* MENU */}
      <div className="collapse navbar-collapse">

        <ul className="navbar-nav mx-auto gap-4 align-items-center">

          {/* HOME */}
          <li className="nav-item">
            <Link to="/" className="nav-link fw-semibold">
              Trang chủ
            </Link>
          </li>

          {/* PRODUCT DROPDOWN */}
<li className="nav-item dropdown">

  <Link
    to="/products"
    className="nav-link dropdown-toggle fw-semibold"
    role="button"
    data-bs-toggle="dropdown"
  >
    Sản phẩm
  </Link>

  <ul className="dropdown-menu border-0 shadow rounded-4 p-2">

    {/* ALL PRODUCTS */}
    <li>
      <Link
        to="/products"
        className="dropdown-item py-2 rounded-3 fw-bold"
      >
         Tất cả sản phẩm
      </Link>
    </li>

    <li>
      <hr className="dropdown-divider" />
    </li>

    {/* ĐẦM */}
    <li>
      <Link
        to="/products/dam"
        className="dropdown-item py-2 rounded-3"
      >
         Đầm
      </Link>
    </li>

    {/* ÁO */}
    <li>
      <Link
        to="/products/ao"
        className="dropdown-item py-2 rounded-3"
      >
         Áo nữ
      </Link>
    </li>

    {/* CHÂN VÁY */}
    <li>
      <Link
        to="/products/chanvay"
        className="dropdown-item py-2 rounded-3"
      >
         Chân váy
      </Link>
    </li>

    {/* ÁO DÀI */}
    <li>
      <Link
        to="/products/aodai"
        className="dropdown-item py-2 rounded-3"
      >
         Áo dài
      </Link>
    </li>

  </ul>

</li>
          {/* COLLECTION */}
          <li className="nav-item">
            <Link to="/collection" className="nav-link fw-semibold">
              Bộ sưu tập
            </Link>
          </li>

          {/* SALE */}
          <li className="nav-item">
            <Link to="/sale" className="nav-link text-danger fw-bold">
              Sale
            </Link>
          </li>

        </ul>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-4">

          {/* ACCOUNT */}
          <div
            className="position-relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >

            {/* ICON */}
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-person-circle fs-4"></i>
              <span>Tài khoản</span>
            </div>

            {/* DROPDOWN */}
            {showDropdown && (
              <div
                className="position-absolute"
                style={{
                  top: "100%",
                  right: 0,
                  paddingTop: "10px",
                  zIndex: 999,
                }}
              >
                <div
                  className="bg-white shadow border rounded-4 overflow-hidden"
                  style={{
                    width: "180px",
                  }}
                >
                  <Link
                    to="/login"
                    className="dropdown-item py-3 px-4"
                  >
                    Đăng nhập
                  </Link>

                  <Link
                    to="/register"
                    className="dropdown-item py-3 px-4"
                  >
                    Đăng ký
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* ORDER */}
          <Link to="/orders" className="nav-link fw-semibold">
            📦 Đơn hàng
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="btn btn-outline-dark position-relative rounded-3 px-3"
          >
            🛒 Cart

            <span
              className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill"
            >
              {count}
            </span>
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;