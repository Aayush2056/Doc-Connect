import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const DoctorRegister = () => {
  const navigate = useNavigate();
const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    phone: "",
    fees: "",
  });

  const [availability, setAvailability] = useState([
    {
      day: "Monday",
      slots: [{ startTime: "10:00", endTime: "17:00" }],
    },
    {
      day: "Tuesday",
      slots: [{ startTime: "10:00", endTime: "17:00" }],
    },
    {
      day: "Wednesday",
      slots: [{ startTime: "10:00", endTime: "17:00" }],
    },
    {
      day: "Thursday",
      slots: [{ startTime: "10:00", endTime: "17:00" }],
    },
    {
      day: "Friday",
      slots: [{ startTime: "10:00", endTime: "17:00" }],
    },
    {
      day: "Saturday",
      slots: [{ startTime: "10:00", endTime: "17:00" }],
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvailabilityChange = (dayIndex, field, value) => {
    setAvailability((prev) => {
      const updated = [...prev];

      updated[dayIndex] = {
        ...updated[dayIndex],
        slots: [
          {
            ...updated[dayIndex].slots[0],
            [field]: value,
          },
        ],
      };

      return updated;
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const dataToSend = new FormData();

    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    dataToSend.append("specialization", formData.specialization);
    dataToSend.append("experience", formData.experience);
    dataToSend.append("phone", formData.phone);
    dataToSend.append("fees", formData.fees);

    dataToSend.append(
      "availability",
      JSON.stringify(availability)
    );

    dataToSend.append("image", image);

    const response = await axios.post(
      "http://localhost:3000/api/auth/doc/register",
      dataToSend
    );

    console.log("Doctor Registration:", response.data);

    alert("Doctor registered successfully!");

    navigate("/login");

  } catch (error) {
    console.log("Doctor Registration Error:", error);

    alert(
      error.response?.data?.message ||
      "Doctor registration failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">

      <div className="auth-card doctor-card">

        <h1>Doctor Registration</h1>

        <p>Create your doctor account</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g. Cardiologist)"
            value={formData.specialization}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={handleChange}
            min="0"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="number"
            name="fees"
            placeholder="Consultation Fees"
            value={formData.fees}
            onChange={handleChange}
            min="0"
            required
          />

      <label className="file-input">
  <span>Doctor Image</span>

  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    required
  />
</label>

          {/* Availability */}

          <div className="availability-section">

            <h3>Availability</h3>

            {availability.map((item, index) => (
              <div
                className="availability-row"
                key={item.day}
              >

                <div className="day-name">
                  {item.day}
                </div>

                <input
                  type="time"
                  value={item.slots[0].startTime}
                  onChange={(e) =>
                    handleAvailabilityChange(
                      index,
                      "startTime",
                      e.target.value
                    )
                  }
                />

                <span>to</span>

                <input
                  type="time"
                  value={item.slots[0].endTime}
                  onChange={(e) =>
                    handleAvailabilityChange(
                      index,
                      "endTime",
                      e.target.value
                    )
                  }
                />

              </div>
            ))}

          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register as Doctor"}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
};

export default DoctorRegister;