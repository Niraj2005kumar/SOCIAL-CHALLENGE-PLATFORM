import { useState, useRef, useEffect } from "react";
import axios from "axios";

const AI_SERVICE_URL = "http://localhost:8000";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! Main aapki madad karne ke liye yahan hoon. Aap apni problem batao." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildHistory = () => {
    const recentMessages = messages.slice(-6); // sirf last 6 messages bhejo, purani history na badhe
    return recentMessages
      .map((m) => `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`)
      .join("\n");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const history = buildHistory();
      const response = await axios.post(`${AI_SERVICE_URL}/chatbot`, {
        message: userMessage,
        history: history,
      });

      setMessages((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, kuch problem ho gayi. Thodi der baad try karo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <span style={styles.headerText}>Help Assistant</span>
            <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div style={styles.messagesArea}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.messageBubble,
                  ...(msg.sender === "user" ? styles.userBubble : styles.botBubble),
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ ...styles.messageBubble, ...styles.botBubble }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Apni baat likho..."
              style={styles.input}
            />
            <button style={styles.sendBtn} onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}

      <button style={styles.fab} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 1000,
    fontFamily: "sans-serif",
  },
  fab: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "#2563EB",
    color: "white",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  chatWindow: {
    width: "340px",
    height: "440px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#2563EB",
    color: "white",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "500",
    fontSize: "15px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  messagesArea: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "#F9FAFB",
  },
  messageBubble: {
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    maxWidth: "80%",
    lineHeight: "1.4",
  },
  userBubble: {
    backgroundColor: "#2563EB",
    color: "white",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#E5E7EB",
    color: "#111827",
    alignSelf: "flex-start",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #E5E7EB",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    outline: "none",
  },
  sendBtn: {
    backgroundColor: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Chatbot;