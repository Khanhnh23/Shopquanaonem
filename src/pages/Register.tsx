import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5265/api/auth/register", {
        email,
        password
      });

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data || "Lỗi server");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4 fw-bold">ĐĂNG KÝ</h3>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark w-100 mb-3">
          Đăng ký
        </button>
      </form>

      <p className="text-center">
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default Register;