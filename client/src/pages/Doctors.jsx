import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.jsx";
import "../styles/Doctors.css";
import {useAuth} from "../context/AuthContext.jsx"
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
    const {user} = useAuth();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
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
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [user]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.specialization
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h2 className="doctors-loading">Loading...</h2>;
  }

  return (
    <main className="doctors-page">

      <div className="doctors-top">
        <h1>Find a Doctor</h1>

        <div className="doctor-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />
          ))
        ) : (
          <p className="no-doctors">
            No doctors found
          </p>
        )}
      </div>

    </main>
  );
};

export default Doctors;