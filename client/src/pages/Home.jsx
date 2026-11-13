import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            Healthcare made simple
          </div>

          <h1>
            Your Health,
            <br />
            <span>Our Priority.</span>
          </h1>

          <p>
            Connect with trusted doctors, book appointments,
            and manage your healthcare — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/list" className="primary-btn">
              Find a Doctor
              <span>→</span>
            </Link>

            <Link to="/ai" className="secondary-btn">
              AI Health Assistant
            </Link>
          </div>

          {/* Small Stats */}
          <div className="hero-stats">

            <div className="stat">
              <h3>500+</h3>
              <p>Doctors</p>
            </div>

            <div className="stat">
              <h3>10K+</h3>
              <p>Patients</p>
            </div>

            <div className="stat">
              <h3>24/7</h3>
              <p>Support</p>
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image">

          <div className="image-circle"></div>

          <div className="doctor-image">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80"
              alt="Doctor"
            />
          </div>

          <div className="appointment-card">
            <div className="card-icon">✓</div>

            <div>
              <strong>Easy Appointment</strong>
              <p>Book in just a few clicks</p>
            </div>
          </div>

          <div className="rating-card">
            <span>★</span>
            <div>
              <strong>4.9/5</strong>
              <p>Patient Rating</p>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="services">

        <div className="section-heading">
          <span>OUR SERVICES</span>

          <h2>
            Healthcare at your
            <br />
            <strong>fingertips.</strong>
          </h2>
        </div>

        <div className="service-cards">

          {/* Find Doctor */}
          <Link to="/list" className="service-card">
            <div className="service-icon">⚕</div>
            <h3>Find a Doctor</h3>
            <p>
              Find the right specialist according to
              your healthcare needs.
            </p>
          </Link>

          {/* Book Appointment */}
          <Link to="/appointments" className="service-card highlighted">
            <div className="service-icon">📅</div>
            <h3>Book Appointment</h3>
            <p>
              Choose your preferred doctor, date and
              available time slot.
            </p>
          </Link>

          {/* Contact Us */}
          <Link to="/contact" className="service-card">
            <div className="service-icon">📞</div>
            <h3>Contact Us</h3>
            <p>
              Have questions or need assistance?
              Get in touch with our support team.
            </p>
          </Link>

        </div>
      </section>

    </main>
  );
};

export default Home;