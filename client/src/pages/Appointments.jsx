import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AppointmentCard from "../components/AppointmentCard.jsx";
import "../styles/Appointments.css"
import "../styles/Appointments.css"
const Appointments = () => {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/api/appointment/my",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log("MY APPOINTMENTS:", response.data);
        console.log("COUNT:", response.data.length);

        setAppointments(response.data);
        

      } catch (error) {
        console.log("APPOINTMENTS ERROR:", error);

        setError(
          error.response?.data?.message ||
          "Failed to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="appointments-status">
        <h2>Loading appointments...</h2>
      </div>
    );
  }

return (
  <main className="appointments-page">
    <div className="appointments-container">

      {appointments.map((appointment) => (
        <div key={appointment._id}>

          <img
            src={appointment.doctor?.image}
            alt={appointment.doctor?.name}
            className="doctor-image"
          />

          <h2>
            Dr. {appointment.doctor?.name}
          </h2>

          <p>
            Specialization: {appointment.doctor?.specialization}
          </p>

          <p>
            Date: {new Date(appointment.date).toLocaleDateString("en-IN")}
          </p>

          <p>
            Time: {appointment.time}
          </p>

          <p>
            Fee: ₹{appointment.doctor?.fees}
          </p>

          <p>
            Status: {appointment.status}
          </p>

        {appointment.status === "completed" &&
 appointment.paymentStatus === "pending" && (
  <button className="payment-btn">
    Pay Now
  </button>
)}

          <hr />

        </div>
      ))}

    </div>
  </main>
);
};

export default Appointments;