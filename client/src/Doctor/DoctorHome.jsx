import { Link } from "react-router-dom";
import "../styles/DoctorHome.css";

const DoctorHome = () => {
  return (
    <main className="doctor-home">

      <section className="doctor-hero">

        <div className="doctor-hero-content">

          <span className="doctor-badge">
            ✦ Doctor Dashboard
          </span>

          <h1>
            Welcome,
            <br />
            <span>Doctor.</span>
          </h1>

          <p>
            Manage your appointments, check your
            schedule, and provide the best care to
            your patients.
          </p>

          <div className="doctor-hero-buttons">

            <Link
              to="/doctor/appointments"
              className="doctor-primary-btn"
            >
              View Appointments
              <span>→</span>
            </Link>

            <Link
              to="/doctor/about"
              className="doctor-secondary-btn"
            >
              About Doc-Connect
            </Link>

          </div>

        </div>

        <div className="doctor-hero-image">

          <div className="doctor-image-circle"></div>

          <div className="doctor-image-box">

            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80"
              alt="Doctor"
            />

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="doctor-features">

        <div className="doctor-section-heading">

          <span>DOCTOR PANEL</span>

          <h2>
            Everything you need
            <br />
            <strong>in one place.</strong>
          </h2>

        </div>

        <div className="doctor-feature-cards">

          {/* Appointments */}
          <Link
            to="/doctor/appointments"
            className="doctor-feature-card"
          >
            <div className="doctor-feature-icon">
              📅
            </div>

            <h3>Appointments</h3>

            <p>
              View and manage your upcoming
              patient appointments.
            </p>
          </Link>

          {/* Patient Care */}
          <Link
            to="/doctor/appointments"
            className="doctor-feature-card highlighted"
          >
            <div className="doctor-feature-icon">
              👨‍⚕️
            </div>

            <h3>Patient Care</h3>

            <p>
              Keep track of your patients and
              provide better healthcare.
            </p>
          </Link>

          {/* Availability */}
          <Link
            to="/doctor/appointments"
            className="doctor-feature-card"
          >
            <div className="doctor-feature-icon">
              🕐
            </div>

            <h3>Availability</h3>

            <p>
              Manage your available days and
              consultation time slots.
            </p>
          </Link>

        </div>

      </section>

    </main>
  );
};

export default DoctorHome;