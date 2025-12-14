import SummaryCard from "./SummaryCard";
import "./ChatMessage.css";

function ChatMessage({ message, loading = false }) {
  const isUser = message.type === "user";

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
    }

    // Check if message contains structured data
    if (!isUser && message.content) {
      try {
        const parsed = JSON.parse(message.content);
        if (parsed.summary) {
          return <SummaryCard summary={parsed.summary} />;
        }
      } catch (e) {
        // Not JSON, render as text
      }
    }

    return <p className="message-content">{message.content}</p>;
  };

  return (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      <div
        className={`message-bubble ${isUser ? "user-bubble" : "bot-bubble"}`}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default ChatMessage;
