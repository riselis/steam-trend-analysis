import './ChatMessage.css';

function ChatMessage({ message, loading = false }) {
  const isUser = message.type === 'user';

  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        {loading ? (
          <div className="loading-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <p className="message-content">{message.content}</p>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;

