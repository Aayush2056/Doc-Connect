import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/BookAppointment.css";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FETCH DOCTOR
  // =========================

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/doctor/${doctorId}`
        );

        console.log("DOCTOR:", response.data);

        setDoctor(response.data);
      } catch (error) {
        console.log("DOCTOR ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch doctor"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // =========================
  // GET DAY NAME
  // =========================

  const getDayName = (dateValue) => {
    const selectedDate = new Date(
      `${dateValue}T00:00:00`
    );

    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  // =========================
  // GENERATE EXACT TIME SLOTS
  // 30 MINUTES
  // =========================

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];

    let [startHour, startMinute] = startTime
      .split(":")
      .map(Number);

    const [endHour, endMinute] = endTime
      .split(":")
      .map(Number);

    while (
      startHour < endHour ||
      (startHour === endHour &&
        startMinute < endMinute)
    ) {
      const hour = String(startHour).padStart(2, "0");
      const minute = String(startMinute).padStart(2, "0");

      slots.push(`${hour}:${minute}`);

      // 30 minute interval
      startMinute += 15;

      if (startMinute >= 60) {
        startMinute = 0;
        startHour++;
      }
    }

    return slots;
  };

  // =========================
  // GET AVAILABLE SLOTS
  // =========================

  const getAvailableSlots = () => {
    if (!doctor || !date) {
      return [];
    }

    const dayName = getDayName(date);

    console.log("SELECTED DAY:", dayName);

    const availability = doctor.availability?.find(
      (item) => item.day === dayName
    );

    if (!availability) {
      return [];
    }

    let slots = [];

    availability.slots?.forEach((slot) => {
      const generatedSlots = generateTimeSlots(
        slot.startTime,
        slot.endTime
      );

      slots.push(...generatedSlots);
    });

    return slots;
  };

  const availableSlots = getAvailableSlots();

  // =========================
  // DATE CHANGE
  // =========================

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setSelectedTime("");
    setError("");
  };

  // =========================
  // BOOK APPOINTMENT
  // =========================

  const handleBookAppointment = async () => {
    // User login check
    if (!user) {
      navigate("/login");
      return;
    }

    if (!doctorId) {
      setError("Doctor ID missing");
      return;
    }

    if (!date) {
      setError("Please select a date");
      return;
    }

    if (!selectedTime) {
      setError("Please select an exact time");
      return;
    }

    const appointmentData = {
      doctorId: doctorId,
      date: date,
      time: selectedTime,
    };

    console.log(
      "APPOINTMENT DATA:",
      appointmentData
    );

    try {
      setBooking(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/appointment/book",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "APPOINTMENT CREATED:",
        response.data
      );

      alert(
        `Appointment booked successfully at ${selectedTime}`
      );

      navigate("/appointments");
    } catch (error) {
      console.log("BOOKING ERROR:", error);
      console.log(
        "BACKEND RESPONSE:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          "Failed to book appointment"
      );
    } finally {
      setBooking(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="booking-status">
        <h2>Loading...</h2>
      </div>
    );
  }

  // =========================
  // DOCTOR ERROR
  // =========================

  if (error && !doctor) {
    return (
      <div className="booking-status">
        <h2>{error}</h2>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="booking-page">
      <div className="booking-container">

        {/* ================= DOCTOR INFO ================= */}

        <section className="booking-doctor">

          <div className="booking-doctor-image">
            <img
              src={doctor.image}
              alt={doctor.name}
            />
          </div>

          <div className="booking-doctor-info">

            <span className="booking-label">
              BOOK APPOINTMENT
            </span>

            <h1>
              Dr. {doctor.name}
            </h1>

            <p className="booking-specialization">
              {doctor.specialization}
            </p>

            <p className="booking-experience">
              {doctor.experience} Years Experience
            </p>

            <p className="booking-fee">
              Consultation Fee:
              <strong> ₹{doctor.fees}</strong>
            </p>

          </div>

        </section>

        {/* ================= BOOKING FORM ================= */}

        <section className="booking-form">

          {/* DATE */}

          <h2>Select Date</h2>

          <input
            type="date"
            value={date}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleDateChange}
          />

          {/* TIME SLOTS */}

          {date && (
            <>
              <h2>Select Time</h2>

              {availableSlots.length > 0 ? (
                <div className="slots">

                  {availableSlots.map(
                    (time, index) => (
                      <button
                        key={index}
                        type="button"
                        className={
                          selectedTime === time
                            ? "slot selected"
                            : "slot"
                        }
                        onClick={() =>
                          setSelectedTime(time)
                        }
                      >
                        {time}
                      </button>
                    )
                  )}

                </div>
              ) : (
                <p className="no-slots">
                  Doctor is not available on this day.
                </p>
              )}
            </>
          )}

          {/* SELECTED TIME */}

          {selectedTime && (
            <div className="selected-appointment">

              <p>
                Selected Date:
                <strong> {date}</strong>
              </p>

              <p>
                Selected Time:
                <strong> {selectedTime}</strong>
              </p>

            </div>
          )}

          {/* ERROR */}

          {error && (
            <p className="booking-error">
              {error}
            </p>
          )}

          {/* BOOK BUTTON */}

          <button
            className="confirm-booking-btn"
            onClick={handleBookAppointment}
            disabled={
              booking ||
              !date ||
              !selectedTime
            }
          >
            {booking
              ? "Booking..."
              : `Book Appointment ₹${doctor.fees}`}
          </button>

        </section>

      </div>
    </main>
  );
};

export default BookAppointment;