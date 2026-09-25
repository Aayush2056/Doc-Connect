import { useState } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import "../styles/AIChat.css";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = message) => {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);
    setDoctors([]);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/ai/chat",
        {
          message: userMessage,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.response,
        },
      ]);

      if (data.doctors?.length > 0) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error("AI ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="ai-page">
      <div className="ai-container">

        {/* Header */}
        <div className="ai-page-header">
          <h1>AI Health Assistant</h1>
          <p>
            Get general health guidance and find suitable doctors.
          </p>
        </div>

        {/* Chat Box */}
        <div className="ai-chat-box">

          {/* Chat Header */}
          <div className="ai-chat-header">
            <div className="ai-avatar">
              🤖
            </div>

            <div>
              <h2>Doc-Connect AI</h2>
              <p>● Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="ai-messages">

            {/* Welcome */}
            {messages.length === 0 && (
              <div className="ai-welcome">

                <div className="welcome-icon">
                  🩺
                </div>

                <h2>How can I help you?</h2>

                <p>
                  Describe your symptoms or ask a general health question.
                  I can also help you find a suitable doctor.
                </p>

                {/* Suggestions */}
                <div className="suggestion-buttons">

                  <button
                    onClick={() =>
                      sendMessage(
                        "I have skin problems. Which doctor should I consult?"
                      )
                    }
                  >
                    Skin problems
                  </button>

                  <button
                    onClick={() =>
                      sendMessage(
                        "I have frequent headaches. Which doctor should I consult?"
                      )
                    }
                  >
                    Frequent headaches
                  </button>

                  <button
                    onClick={() =>
                      sendMessage(
                        "I have joint pain. Which doctor should I consult?"
                      )
                    }
                  >
                    Joint pain
                  </button>

                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-row ${
                  msg.role === "user"
                    ? "user-message-row"
                    : "ai-message-row"
                }`}
              >
                <div
                  className={`message ${
                    msg.role === "user"
                      ? "user-message"
                      : "ai-message"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="message-row ai-message-row">
                <div className="loading-message">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

          </div>

          {/* Doctors */}
          {doctors.length > 0 && (
            <div className="recommended-doctors">

              <h3>Recommended Doctors</h3>

              <div className="doctor-results">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor._id}
                    doctor={doctor}
                  />
                ))}
              </div>

            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="ai-input-form"
          >
            <div className="ai-input-wrapper">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your symptoms..."
              />

              <button
                type="submit"
                disabled={!message.trim() || loading}
              >
                {loading ? "..." : "Send"}
              </button>

            </div>

            <p className="ai-disclaimer">
              AI provides general health information and does not replace
              a medical professional.
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AIChat;