import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

   const [showDropdown, setShowDropdown] = useState(false);
   const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
   
  };

  return (
    <>
      <nav className="navbar">

        {/* Logo */}
        <Link to="/" className="logo">
          ✚ Doc-Connect
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/list">Doctors</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/about">About</Link>
        {user?.role==="admin" ? <Link to="/admin">Admin</Link> :    <Link to="/contact">Contact</Link>}
        </div>

        {/* Authentication */}
        <div className="nav-auth">

          {!isAuthenticated ? (
            <>
              <Link to="/register" className="signup-btn">
                Sign Up
              </Link>

              <Link to="/login" className="login-btn">
                Login
              </Link>
            </>
          ) : (
            <div className="profile-wrapper">

              {/* User Profile */}
              <button
                className="user-greeting"
                onClick={() => setShowDropdown(!showDropdown)}
              >

                <span className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>

                <span className="user-name">
                  Hi, {user?.name}
                </span>

                <span className="dropdown-arrow">
                  {showDropdown ? "▲" : "▼"}
                </span>

              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="profile-dropdown">

                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </nav>

      {/* Child Routes */}
      <Outlet />
    </>
  );
};

export default Navbar;