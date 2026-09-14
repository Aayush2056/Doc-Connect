import { useState } from "react";
import axios from "axios";
import "../styles/Admin.css";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const [activePage, setActivePage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
 const {user} = useAuth();
  // =========================
  // ALL DOCTORS
  // =========================

  const handleDoctors = async () => {
      if (activePage === "doctors") {
    setActivePage("");
    return;
  }
    try {
      setActivePage("doctors");
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/admin/doctors",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setDoctors(response.data);
    } catch (error) {
      console.log("DOCTORS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch doctors"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ALL USERS
  // =========================

  const handleUsers = async () => {
      if (activePage === "users") {
    setActivePage("");
    return;
      }
    try {
      setActivePage("users");
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log("USERS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };
const handleDeleteUser = async (userId) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:3000/api/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    // UI se bhi user remove karo
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userId)
    );

    alert("User deleted successfully");

  } catch (error) {
    console.log("DELETE USER ERROR:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete user"
    );
  }
};
const handleDeleteDoctor = async (doctorId) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:3000/api/admin/doctors/${doctorId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setDoctors((prevDoctors) =>
      prevDoctors.filter(
        (doctor) => doctor._id !== doctorId
      )
    );

    alert("Doctor deleted successfully");

  } catch (error) {
    console.log("DELETE DOCTOR ERROR:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete doctor"
    );
  }
};
  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* HEADER */}

        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage doctors and users</p>
        </div>


        {/* BUTTONS */}

        <div className="admin-buttons">

          <button
            className={`admin-option ${
              activePage === "doctors"
                ? "active"
                : ""
            }`}
            onClick={handleDoctors}
          >
            <span className="admin-icon">
              👨‍⚕️
            </span>

            <div>
              <h3>All Doctors</h3>
              <p>View all registered doctors</p>
            </div>
          </button>


          <button
            className={`admin-option ${
              activePage === "users"
                ? "active"
                : ""
            }`}
            onClick={handleUsers}
          >
            <span className="admin-icon">
              👥
            </span>

            <div>
              <h3>All Users</h3>
              <p>View all registered users</p>
            </div>
          </button>

        </div>


        {/* CONTENT */}

        <div className="admin-content">

          {/* DEFAULT */}

          {activePage === "" && (
            <div className="admin-empty">
              <h2>Welcome, Admin</h2>

              <p>
                Select Doctors or Users to view
                their details.
              </p>
            </div>
          )}


          {/* LOADING */}

          {loading && (
            <div className="admin-empty">
              <h2>Loading...</h2>
            </div>
          )}


          {/* =========================
              DOCTORS
          ========================= */}

          {!loading &&
            activePage === "doctors" && (
              <div className="admin-list">

                <div className="list-header">
                  <h2>All Doctors</h2>

                  <span>
                    {doctors.length} Doctors
                  </span>
                </div>


                {doctors.length === 0 ? (
                  <p className="no-records">
                    No doctors found.
                  </p>
                ) : (
                  <div className="admin-records">

                    {doctors.map((doctor) => (
                      <div
                        className="admin-record"
                        key={doctor._id}
                      >

                        <div className="admin-avatar">
                          {doctor.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>


                        <div className="admin-record-info">

                          <h3>
                            Dr. {doctor.name}
                          </h3>

                          <p>
                            📧 {doctor.email}
                          </p>

                          <p>
                            🩺{" "}
                            {doctor.specialization}
                          </p>

                          <div className="doctor-extra">

                            <span>
                              Experience:{" "}
                              {doctor.experience || 0} years
                            </span>

                            <span>
                              Fees: ₹{doctor.fees}
                            </span>
                            <button
  className="delete-user-btn"
  onClick={() => handleDeleteDoctor(doctor._id)}
>
  Delete
</button>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>
                )}

              </div>
            )}


          {/* =========================
              USERS
          ========================= */}

          {!loading &&
            activePage === "users" && (
              <div className="admin-list">

                <div className="list-header">
                  <h2>All Users</h2>

                  <span>
                    {users.length} Users
                  </span>
                </div>


                {users.length === 0 ? (
                  <p className="no-records">
                    No users found.
                  </p>
                ) : (
                  <div className="admin-records">

                  {users.map((user) => (
  <div
    className="admin-record"
    key={user._id}
  >
    <div className="admin-avatar">
      {user.name
        ?.charAt(0)
        .toUpperCase()}
    </div>

    <div className="admin-record-info">
      <h3>{user.name}</h3>

      <p>
        📧 {user.email}
      </p>

      <p>
        Role:{" "}
        <span className="role">
          {user.role}
        </span>
      </p>
    </div>

    <button
      className="delete-user-btn"
      onClick={() => handleDeleteUser(user._id)}
    >
      Delete
    </button>
  </div>
))}

                  </div>
                )}

              </div>
            )}

        </div>

      </div>
    </main>
  );
};

export default Admin;