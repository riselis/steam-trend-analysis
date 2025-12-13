import { Link } from "react-router-dom";
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

    if (message.responseId) {
      return (
        <div>
          <p className="message-content">{message.content}</p>
          <Link
            to={`/analytics/full-report/${message.responseId}`}
            className="report-link"
          >
            View full report
          </Link>
        </div>
      );
    }

    return <p className="message-content">{message.content}</p>;
  };

  return (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      <div className={`message-bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>
        {renderContent()}
      </div>
    </div>
  );
}

export default ChatMessage;

