import "../styles/Home.css";

const Home = () => {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">

        {/* Left Content */}
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
            <a href="/doctors" className="primary-btn">
              Find a Doctor
              <span>→</span>
            </a>

            <a href="/about" className="secondary-btn">
              Learn More
            </a>
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

          {/* Floating Card */}
          <div className="appointment-card">
            <div className="card-icon">✓</div>

            <div>
              <strong>Easy Appointment</strong>
              <p>Book in just a few clicks</p>
            </div>
          </div>

          {/* Rating */}
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

          <div className="service-card">
            <div className="service-icon">⚕</div>
            <h3>Find a Doctor</h3>
            <p>
              Find the right specialist according to
              your healthcare needs.
            </p>
          </div>

          <div className="service-card highlighted">
            <div className="service-icon">📅</div>
            <h3>Book Appointment</h3>
            <p>
              Choose your preferred doctor, date and
              available time slot.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">💬</div>
            <h3>Consultation</h3>
            <p>
              Get professional healthcare guidance
              from experienced doctors.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
};

export default Home;