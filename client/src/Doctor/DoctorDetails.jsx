import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/DoctorDetails.css";

const DoctorDetails = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/doctor/${doctorId}`
        );

        console.log("DOCTOR:", response.data);

        setDoctor(response.data);
      } catch (error) {
        console.log("FETCH DOCTOR ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch doctor details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="doctor-details-status">
        <h2>Loading doctor details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctor-details-status">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="doctor-details-status">
        <h2>Doctor not found</h2>
      </div>
    );
  }

  return (
    <main className="doctor-details-page">

      {/* Doctor Profile */}
      <section className="doctor-profile">

        <div className="doctor-profile-image">
          <img
            src={doctor.image}
            alt={doctor.name}
          />
        </div>

        <div className="doctor-profile-info">

          <span className="doctor-profile-label">
            DOCTOR PROFILE
          </span>

          <h1>Dr. {doctor.name}</h1>

          <p className="doctor-profile-specialization">
            {doctor.specialization}
          </p>

          <div className="doctor-info-list">

            <div>
              <span>Experience</span>
              <strong>
                {doctor.experience} Years
              </strong>
            </div>

            <div>
              <span>Consultation Fee</span>
              <strong>
                ₹{doctor.fees}
              </strong>
            </div>

            <div>
              <span>Email</span>
              <strong>
                {doctor.email}
              </strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>
                {doctor.phone}
              </strong>
            </div>

          </div>

          <button
            className="book-appointment-btn"
            onClick={() =>
              navigate(`/doctors/${doctor._id}/book`)
            }
          >
            Book Appointment →
          </button>

        </div>

      </section>


      {/* Availability */}
      <section className="doctor-availability">

        <div className="availability-heading">
          <span>AVAILABILITY</span>

          <h2>
            Doctor's available
            <strong> schedule.</strong>
          </h2>
        </div>


        <div className="availability-list">

          {doctor.availability?.length > 0 ? (
            doctor.availability.map((day, index) => (

              <div
                className="availability-card"
                key={index}
              >

                <h3>{day.day}</h3>

                <div className="time-slots">

                  {day.slots?.map((slot, slotIndex) => (
                    <span key={slotIndex}>
                      {slot.startTime} - {slot.endTime}
                    </span>
                  ))}

                </div>

              </div>

            ))
          ) : (
            <p>No availability information available.</p>
          )}

        </div>

      </section>

    </main>
  );
};

export default DoctorDetails;