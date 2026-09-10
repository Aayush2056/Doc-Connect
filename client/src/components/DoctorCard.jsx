import { useNavigate } from "react-router-dom";
import "../styles/DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="doctor-card"
      onClick={() => navigate(`/doctors/${doctor._id}`)}
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="doctor-card-image"
      />

      <div className="doctor-card-content">
        <h3>Dr. {doctor.name}</h3>

        <p>{doctor.specialization}</p>

        <div className="doctor-info">
          <span>{doctor.experience} Years</span>
          <span>₹{doctor.fees}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/doctors/${doctor._id}`);
          }}
        >
          View Profile →
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;