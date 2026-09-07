import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Auth.css"
const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );

    console.log("LOGIN RESPONSE:", response.data);

    login(response.data);

if (response.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Login failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>Login to your Doc-Connect account</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

        <p>
          Are you a doctor?
          <Link to="/doctor-register"> Doctor Registration</Link>
        </p>

      </div>

    </div>
  );
};

export default Login;