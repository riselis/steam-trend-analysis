import { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about Steam trends..."
          disabled={disabled}
        />
        <button
          type="submit"
          className="send-button"
          disabled={disabled || !message.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default ChatInput;

