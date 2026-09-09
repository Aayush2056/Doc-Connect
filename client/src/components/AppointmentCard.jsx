import "../styles/AppointmentCard.css";

const AppointmentCard = ({ appointment }) => {

  console.log(
    "CARD RENDER:",
    appointment._id,
    appointment.time
  );

  return (
    <div className="appointment-card">
      {/* existing code */}
    </div>
  );
};

export default AppointmentCard;