import "../styles/Contact.css";

const Contact = () => {
  return (
    <main className="contact-page">

      <div className="contact-container">

        {/* Header */}
        <div className="contact-header">
          <h1>Contact Me</h1>
          <p>
            Have a question or want to know more about Doc-Connect?
            Feel free to connect with me.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-grid">

          {/* Email */}
          <div className="contact-card">
            <div className="contact-icon">
              ✉️
            </div>

            <div>
              <h3>Email</h3>
              <p>
                ayushmshra9999@gmail.com
              </p>

               <a  href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushmshra9999@gmail.com"
                 target="_blank"
                  rel="noopener noreferrer">
                Send Email →
              </a>
            </div>
          </div>


          {/* LinkedIn */}
          <div className="contact-card">
            <div className="contact-icon">
              💼
            </div>

            <div>
              <h3>LinkedIn</h3>
              <p>
                Connect with me professionally
              </p>

              <a
                href="https://www.linkedin.com/in/aayush-mishra-27249b270/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit LinkedIn →
              </a>
            </div>
          </div>


          {/* GitHub */}
          <div className="contact-card">
            <div className="contact-icon">
              💻
            </div>

            <div>
              <h3>GitHub</h3>
              <p>
                Check out my projects and code
              </p>

              <a
                href="https://github.com/Aayush2056"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit GitHub →
              </a>
            </div>
          </div>


          {/* Project */}
          <div className="contact-card">
            <div className="contact-icon">
              🏥
            </div>

            <div>
              <h3>Doc-Connect</h3>
              <p>
                Doctor appointment booking platform
              </p>

              <span className="project-tech">
                MERN Stack
              </span>
            </div>
          </div>

        </div>


        {/* About Developer */}
        <div className="developer-section">

          <h2>About the Developer</h2>

          <p>
            Hi, I'm <strong>Aayush Mishra</strong>, a software
            development enthusiast interested in building
            full-stack web applications using modern technologies.
          </p>

          <p>
            Doc-Connect is a doctor appointment platform built
            using the MERN stack with features such as doctor
            registration, appointment booking, authentication
            and online payments.
          </p>

        </div>

      </div>

    </main>
  );
};

export default Contact;