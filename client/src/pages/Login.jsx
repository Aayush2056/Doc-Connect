import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginType, setLoginType] = useState("user");

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

    if (loginType === "doctor") {
      console.log("1. DOCTOR LOGIN START");
      console.log("FORM DATA:", formData);

      const response = await axios.post(
        "http://localhost:3000/api/auth/doc/login",
        formData
      );
       console.log(response.data);
      login(response.data);

      navigate("/doctor");
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );

    console.log("USER RESPONSE:", response.data);

    login(response.data);
    navigate("/");
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    console.log("ERROR RESPONSE:", error.response?.data);
    console.log("ERROR STATUS:", error.response?.status);

    alert(
      error.response?.data?.message ||
        error.message ||
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

        <p>
          Login to your Doc-Connect account
        </p>

        {/* LOGIN TYPE */}

        <div className="login-type">

          <button
            type="button"
            className={
              loginType === "user"
                ? "login-type-btn active"
                : "login-type-btn"
            }
            onClick={() => setLoginType("user")}
          >
            Patient / Admin
          </button>

          <button
            type="button"
            className={
              loginType === "doctor"
                ? "login-type-btn active"
                : "login-type-btn"
            }
            onClick={() => setLoginType("doctor")}
          >
            Doctor
          </button>

        </div>

        {/* LOGIN FORM */}

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

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : loginType === "doctor"
              ? "Login as Doctor"
              : "Login"}
          </button>

        </form>

        {/* FOOTER */}

        {loginType === "user" ? (
          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        ) : (
          <p className="auth-footer">
            Don't have a doctor account?{" "}
            <Link to="/doctor-register">
              Register as Doctor
            </Link>
          </p>
        )}

      </div>

    </div>
  );
};

export default Login;