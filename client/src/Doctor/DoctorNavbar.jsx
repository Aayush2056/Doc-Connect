import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/DoctorNavbar.css";

const DoctorNavbar = () => {
  const { user, logout } = useAuth();
   const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login")
  };
console.log("DOCTOR NAV USER:", user);
  return (
    <>
      <nav className="doctor-navbar">

        {/* Logo */}

        <Link to="/doctor" className="doctor-logo">
          ✚ Doc-Connect
        </Link>

        {/* Navigation */}

        <div className="doctor-nav-links">

          <Link to="/doctor">
            Home
          </Link>

          <Link to="/doctor/appointments">
            Appointments
          </Link>

          <Link to="/doctor/about">
            About
          </Link>

        </div>

        {/* Profile */}

        <div className="doctor-nav-auth">

          <div className="doctor-profile-wrapper">

            <button
              className="doctor-user-greeting"
              onClick={() =>
                setShowDropdown(!showDropdown)
              }
            >

              <span className="doctor-avatar">
                {user?.name
                  ?.charAt(0)
                  .toUpperCase()}
              </span>

              <span className="doctor-user-name">
                Hi, {user?.name}
              </span>

              <span className="doctor-arrow">
                {showDropdown ? "▲" : "▼"}
              </span>

            </button>

            {showDropdown && (
              <div className="doctor-profile-dropdown">

                <button
                  onClick={handleLogout}
                  className="doctor-logout-btn"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </nav>

      <Outlet />
    </>
  );
};

export default DoctorNavbar;