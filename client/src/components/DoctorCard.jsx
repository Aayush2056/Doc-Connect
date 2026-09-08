import { useNavigate } from "react-router-dom";
import "../styles/DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/doctors/${doctor._id}`);
  };
    console.log(doctor.image);
  return (
    <div
    
      className="doctor-card"
      onClick={handleClick}
    >
      {/* Doctor Image */}
      <div className="doctor-card-image">
        <img
          src={doctor.image}
          alt={doctor.name}
             onLoad={() => console.log("IMAGE LOADED")}
  onError={(e) => console.log("IMAGE ERROR:", e)}
        />
      </div>

      {/* Doctor Details */}
      <div className="doctor-card-content">

        <h3>Dr. {doctor.name}</h3>

        <p className="doctor-specialization">
          {doctor.specialization}
        </p>

        <div className="doctor-card-info">
          <span>
            {doctor.experience} Years Experience
          </span>

          <span>
            ₹{doctor.fees}
          </span>
        </div>

        <button
          className="doctor-profile-btn"
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