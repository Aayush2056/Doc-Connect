import "../styles/About.css";

const About = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">ABOUT DOC-CONNECT</span>

          <h1>
            Healthcare made <span>simple & accessible.</span>
          </h1>

          <p>
            Doc-Connect is a modern doctor appointment platform that makes
            finding doctors, booking appointments, and managing healthcare
            visits easier for everyone.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>What is Doc-Connect?</h2>

            <p>
              Doc-Connect connects patients with doctors through a simple and
              convenient online platform. Patients can explore doctors,
              check their specialization and fees, choose an available slot,
              and book an appointment without unnecessary hassle.
            </p>

            <p>
              Doctors can manage their appointments, view patient details,
              and update appointment status from their dedicated dashboard.
            </p>
          </div>

          <div className="about-highlight">
            <div className="highlight-icon">✚</div>

            <h3>Healthcare at your fingertips</h3>

            <p>
              Everything you need to manage your doctor appointments in one
              place.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <span>WHY DOC-CONNECT</span>
          <h2>Designed for better healthcare experiences</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Find Doctors</h3>
            <p>
              Explore doctors based on their specialization and choose the
              right healthcare professional for your needs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>
              Select a convenient date and time slot and book your appointment
              quickly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payments</h3>
            <p>
              Make appointment payments securely through our integrated online
              payment system.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🩺</div>
            <h3>Doctor Dashboard</h3>
            <p>
              Doctors can manage appointments and keep track of their
              patients from a dedicated dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-content">
          <span>OUR MISSION</span>

          <h2>
            Making healthcare <strong>more convenient</strong> for everyone.
          </h2>

          <p>
            Our goal is to reduce the complexity of booking medical
            appointments and create a smooth connection between patients and
            healthcare professionals.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;