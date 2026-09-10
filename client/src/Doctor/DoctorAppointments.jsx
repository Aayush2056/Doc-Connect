import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DoctorAppointments.css";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/appointment/doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data);
    } catch (error) {
      console.log("DOCTOR APPOINTMENTS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Change appointment status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/appointment/${id}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI immediately
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id
            ? {
                ...appointment,
                status: status,
              }
            : appointment
        )
      );
    } catch (error) {
      console.log("UPDATE STATUS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update appointment status"
      );
    }
  };

  if (loading) {
    return (
      <div className="doctor-appointments-status">
        <h2>Loading appointments...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctor-appointments-status">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <main className="doctor-appointments-page">
      <div className="doctor-appointments-container">

        {/* HEADER */}
        <div className="appointments-header">
          <div>
            <h1>My Appointments</h1>
            <p>Manage your patient appointments</p>
          </div>

          <div className="appointment-count">
            {appointments.length} Appointments
          </div>
        </div>

        {/* NO APPOINTMENTS */}
        {appointments.length === 0 ? (
          <div className="no-appointments">
            <h2>No Appointments</h2>
            <p>
              You don't have any appointments yet.
            </p>
          </div>
        ) : (

          /* APPOINTMENTS LIST */
          <div className="appointments-list">

            {appointments.map((appointment) => (
              <div
                className="doctor-appointment-card"
                key={appointment._id}
              >

                {/* PATIENT AVATAR */}
                <div className="patient-avatar">
                  {appointment.user?.name
                    ?.charAt(0)
                    .toUpperCase() || "P"}
                </div>

                {/* PATIENT DETAILS */}
                <div className="doctor-appointment-details">

                  <h2>
                    {appointment.user?.name ||
                      "Unknown Patient"}
                  </h2>

                  <p className="patient-email">
                    {appointment.user?.email ||
                      "No email"}
                  </p>

                  {/* APPOINTMENT INFO */}
                  <div className="appointment-info">

                    {/* DATE */}
                    <div className="appointment-info-item">
                      <span>Date</span>

                      <strong>
                        {new Date(
                          appointment.date
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </strong>
                    </div>

                    {/* TIME */}
                    <div className="appointment-info-item">
                      <span>Time</span>

                      <strong>
                        {appointment.time}
                      </strong>
                    </div>

                    {/* PAYMENT */}
                    <div className="appointment-info-item">
                      <span>Payment</span>

                      <strong
                        className={`payment-text ${appointment.paymentStatus}`}
                      >
                        {appointment.paymentStatus}
                      </strong>
                    </div>

                  </div>
                </div>

                {/* STATUS ACTIONS */}
                <div className="doctor-appointment-actions">

                  <label className="status-label">
                    Appointment Status
                  </label>

                  {/* 
                    PENDING
                    Doctor can Confirm or Cancel
                  */}
                  {appointment.status === "pending" && (
                    <select
                      className={`status-select ${appointment.status}`}
                      value={appointment.status}
                      onChange={(e) =>
                        updateStatus(
                          appointment._id,
                          e.target.value
                        )
                      }
                    >
                      <option
                        value="pending"
                        disabled
                      >
                        Pending
                      </option>

                      <option value="confirmed">
                        Confirm
                      </option>

                      <option value="cancelled">
                        Cancel
                      </option>
                    </select>
                  )}

                  {/* 
                    CONFIRMED + PAYMENT PENDING
                    Doctor can Complete or Cancel
                  */}
                  {appointment.status === "confirmed" &&
                    appointment.paymentStatus !== "paid" && (
                      <select
                        className={`status-select ${appointment.status}`}
                        value={appointment.status}
                        onChange={(e) =>
                          updateStatus(
                            appointment._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="completed">
                          Completed
                        </option>

                        <option value="cancelled">
                          Cancel
                        </option>
                      </select>
                  )}

                  {/* 
                    CONFIRMED + PAYMENT PAID
                    Cancel option removed
                  */}
                  {appointment.status === "confirmed" &&
                    appointment.paymentStatus === "paid" && (
                      <select
                        className={`status-select ${appointment.status}`}
                        value={appointment.status}
                        onChange={(e) =>
                          updateStatus(
                            appointment._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="completed">
                          Completed
                        </option>
                      </select>
                  )}

                  {/* CANCELLED */}
                  {appointment.status === "cancelled" && (
                    <span className="status-final cancelled">
                      Cancelled
                    </span>
                  )}

                  {/* COMPLETED */}
                  {appointment.status === "completed" && (
                    <span className="status-final completed">
                      Completed
                    </span>
                  )}

                  {/* PAYMENT STATUS */}
                  <span
                    className={`doctor-payment ${appointment.paymentStatus}`}
                  >
                    Payment: {appointment.paymentStatus}
                  </span>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default DoctorAppointments;