import { useState } from "react";
import ChatLayout from "./ChatLayout";
import { fetchChatResponse } from "../../api/mockApi";
import { chatStore } from "../../store/chatStore";
import "./ChatPanel.css";

function ChatPanel({ chatId, chat, setChat }) {
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content) => {
    if (!chat) return;

    const userMessage = { type: "user", content };
    const updatedChat = chatStore.addMessage(chatId, userMessage);
    if (updatedChat) {
      setChat(updatedChat);
    }
    setLoading(true);

    try {
      const result = await fetchChatResponse(content);
      if (result.success) {
        const botMessage = { type: "bot", content: result.response };
        const finalChat = chatStore.addMessage(chatId, botMessage);
        if (finalChat) {
          setChat(finalChat);
        }
      }
    } catch (error) {
      const errorMessage = {
        type: "bot",
        content: "Sorry, an error occurred. Please try again.",
      };
      const finalChat = chatStore.addMessage(chatId, errorMessage);
      if (finalChat) {
        setChat(finalChat);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <ChatLayout
        messages={chat.messages}
        onSendMessage={handleSendMessage}
        loading={loading}
        showInput={true}
      />
    </div>
  );
}

export default ChatPanel;

