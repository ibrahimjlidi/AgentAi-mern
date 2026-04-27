import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

/**
 * Chatbot Component
 * A floating chatbot to help users with eco-questions.
 */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Bonjour ! Je suis l'assistant GreenLife. Comment puis-je vous aider ?", isAi: true },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { text: userMsg, isAi: false }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chat", { message: userMsg });
      setMessages((prev) => [...prev, { text: response.data.response, isAi: true }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Désolé, je rencontre un problème technique.", isAi: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Assistant GreenLife 🌱</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.isAi ? "ai" : "user"}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="chatbot-message ai">...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Posez votre question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )}

      <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          font-family: inherit;
        }

        .chatbot-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
        }

        .chatbot-toggle:hover {
          transform: scale(1.1);
        }

        .chatbot-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 450px;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #eee;
        }

        .chatbot-header {
          background: var(--color-primary);
          color: white;
          padding: 1rem;
          text-align: center;
        }

        .chatbot-header h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .chatbot-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: #f9f9f9;
        }

        .chatbot-message {
          max-width: 80%;
          padding: 0.8rem;
          border-radius: 1rem;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .chatbot-message.user {
          align-self: flex-end;
          background: #e1f5fe;
          color: #01579b;
          border-bottom-right-radius: 0.2rem;
        }

        .chatbot-message.ai {
          align-self: flex-start;
          background: white;
          color: #333;
          border: 1px solid #eee;
          border-bottom-left-radius: 0.2rem;
        }

        .chatbot-input {
          display: flex;
          padding: 1rem;
          border-top: 1px solid #eee;
          gap: 0.5rem;
        }

        .chatbot-input input {
          flex: 1;
          padding: 0.6rem;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          outline: none;
        }

        .chatbot-input button {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
