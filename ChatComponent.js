import { useState } from "react";
import "./Chat.css";

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Server Error");

      const data = await res.json();
      setResponse(data.reply || "No response from AI.");
    } catch (error) {
      console.error("Chatbot Error:", error);
      setResponse("Error:Now Unable to connect to AI service.");
    }
  };

  return (
    <div className="chat-container">
      <h2>SkillConnect AI Chat</h2>
      <div className="chat-box">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <p className="chat-response">Response: {response}</p>
    </div>
  );
}

export default ChatComponent;





