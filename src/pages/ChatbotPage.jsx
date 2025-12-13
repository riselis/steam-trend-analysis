import { useState } from "react";
import ChatLayout from "../components/chat/ChatLayout";
import { fetchChatResponse } from "../api/mockApi";
import "./ChatbotPage.css";

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content) => {
    const userMessage = { type: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const result = await fetchChatResponse(content);
      if (result.success) {
        const botMessage = { type: "bot", content: result.response };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage = {
        type: "bot",
        content: "Sorry, an error occurred. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-page">
      <ChatLayout
        messages={messages}
        onSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  );
}

export default ChatbotPage;
