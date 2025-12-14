import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./ChatLayout.css";

function ChatLayout({ messages, onSendMessage, loading, showInput = true }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="chat-layout">
      <div className="chat-messages">
        {loading && messages.length === 0 ? (
          <ChatMessage
            message={{ type: "bot", content: "Thinking..." }}
            loading
          />
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">
              Start a conversation to analyze Steam trends and get insights.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <ChatMessage
                message={{ type: "bot", content: "Thinking..." }}
                loading
              />
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      {showInput && onSendMessage && (
        <ChatInput onSendMessage={onSendMessage} disabled={loading} />
      )}
    </div>
  );
}

export default ChatLayout;
