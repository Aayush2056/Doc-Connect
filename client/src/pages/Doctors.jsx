import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.jsx";
import "../styles/Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/doctors"
        );

        console.log("DOCTORS:", response.data);

        setDoctors(response.data);
      } catch (error) {
        console.log("FETCH DOCTORS ERROR:", error);

        setError(
          error.response?.data?.message ||
          "Failed to fetch doctors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="doctors-status">
        <h2>Loading doctors...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctors-status">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <main className="doctors-page">

      <section className="doctors-header">
        <span>OUR DOCTORS</span>

        <h1>
          Find the right doctor
          <br />
          <strong>for your care.</strong>
        </h1>

        <p>
          Browse our experienced doctors and choose
          the right specialist for your healthcare needs.
        </p>
      </section>


      <section className="doctors-grid">

        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />
          ))
        ) : (
          <div className="no-doctors">
            <h2>No doctors found</h2>
          </div>
        )}

      </section>

    </main>
  );
};

export default Doctors;