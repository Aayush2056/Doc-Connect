import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Appointments.css";

const Appointments = () => {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);
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

  // ---------------- PAYMENT ----------------

  const handlePayment = async (appointment) => {
    try {
      setPayingId(appointment._id);

      const token = localStorage.getItem("token");

      // 1. Create Razorpay order
      const response = await axios.post(
        "http://localhost:3000/api/payment/createOrder",
        {
          appointmentId: appointment._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const order = response.data.order;

      console.log("RAZORPAY ORDER:", order);

      // 2. Razorpay options
      const options = {
        key: "rzp_test_TUlKPTRCAzCsh3",

        amount: order.amount,

        currency: order.currency,

        name: "Doc-Connect",

        description: "Doctor Appointment Payment",

        order_id: order.id,

        handler: async function (response) {
          console.log("RAZORPAY RESPONSE:", response);

          try {
            const token = localStorage.getItem("token");

            const verifyResponse = await axios.post(
              "http://localhost:3000/api/payment/verifyOrder",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                appointmentId: appointment._id,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );

            console.log(
              "VERIFY RESPONSE:",
              verifyResponse.data
            );

            setAppointments((prev) =>
              prev.map((item) =>
                item._id === appointment._id
                  ? {
                      ...item,
                      paymentStatus: "paid",
                    }
                  : item
              )
            );

            alert("Payment successful!");
          } catch (error) {
            console.log(
              "PAYMENT VERIFY ERROR:",
              error
            );

            console.log(
              "VERIFY RESPONSE:",
              error.response?.data
            );
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: {
          color: "#5b3cc4",
        },
      };

      // 5. Open Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.open();

      razorpay.on(
        "payment.failed",
        function (response) {
          console.log(
            "PAYMENT FAILED:",
            response.error
          );

          alert("Payment failed");
        }
      );
    } catch (error) {
      console.log(
        "CREATE PAYMENT ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to start payment"
      );
    } finally {
      setPayingId(null);
    }
  };

  // ---------------- CANCEL APPOINTMENT ----------------

 const handleCancel = async (appointmentId) => {
  try {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    await axios.delete(
      `http://localhost:3000/api/appointment/${appointmentId}/cancel`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setAppointments((prev) =>
      prev.filter(
        (appointment) =>
          appointment._id !== appointmentId
      )
    );

    alert("Appointment cancelled successfully");
  } catch (error) {
    console.log("CANCEL ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    alert(
      error.response?.data?.message ||
        "Failed to cancel appointment"
    );
  }
};
  // ---------------- LOADING ----------------

  if (loading) {
    return (
      <div className="appointments-status">
        <h2>Loading appointments...</h2>
      </div>
    );
  }

  // ---------------- ERROR ----------------

  if (error) {
    return (
      <div className="appointments-status">
        <h2>{error}</h2>
      </div>
    );
  }

  // ---------------- UI ----------------

  return (
    <main className="appointments-page">
      <div className="appointments-container">

        <h1>My Appointments</h1>

        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              className="appointment-card"
              key={appointment._id}
            >

              <img
                src={appointment.doctor?.image}
                alt={appointment.doctor?.name}
                className="doctor-image"
              />

              <h2>
                Dr. {appointment.doctor?.name}
              </h2>

              <p>
                Specialization:{" "}
                {appointment.doctor?.specialization}
              </p>

              <p>
                Date:{" "}
                {new Date(
                  appointment.date
                ).toLocaleDateString("en-IN")}
              </p>

              <p>
                Time: {appointment.time}
              </p>

              <p>
                Fee: ₹{appointment.doctor?.fees}
              </p>

              <p>
                Status:{" "}
                <strong>
                  {appointment.status}
                </strong>
              </p>

              <p>
                Payment Status:{" "}
                <strong>
                  {appointment.paymentStatus}
                </strong>
              </p>

              {/* PAYMENT BUTTON */}

              {appointment.status === "confirmed" &&
                appointment.paymentStatus === "pending" && (
                  <button
                    className="payment-btn"
                    onClick={() =>
                      handlePayment(appointment)
                    }
                    disabled={
                      payingId === appointment._id
                    }
                  >
                    {payingId === appointment._id
                      ? "Processing..."
                      : `Pay ₹${appointment.doctor?.fees}`}
                  </button>
                )}

              {/* PAID */}

              {appointment.paymentStatus === "paid" && (
                <p className="payment-success">
                  ✓ Payment Completed
                </p>
              )}

              {/* CANCEL BUTTON */}

              {appointment.paymentStatus === "pending" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    handleCancel(appointment._id)
                  }
                >
                  Cancel Appointment
                </button>
              )}

              <hr />

            </div>
          ))
        )}

      </div>
    </main>
  );
};

export default Appointments;