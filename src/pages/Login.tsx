import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5265/api/auth/login", {
        email,
        password,
      });

      // 🔐 lưu token
      localStorage.setItem("token", res.data.token);

      // 👤 lưu user (nếu backend trả)
      localStorage.setItem("user", JSON.stringify({
        id: res.data.id,
        email: res.data.email
      }));

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err: any) {
      console.log(err);

      if (err.response?.data) {
        alert(err.response.data);
      } else {
        alert("Lỗi server!");
      }
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4 fw-bold">ĐĂNG NHẬP</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark w-100 mb-3">
          Đăng nhập
        </button>
      </form>

      <p className="text-center">
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
};

export default Login;