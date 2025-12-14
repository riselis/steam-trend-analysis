import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WizardForm from "../components/chat/WizardForm";
import ChatList from "../components/chat/ChatList";
import { submitTrendInput } from "../api/mockApi";
import { chatStore } from "../store/chatStore";
import "./ChatbotPage.css";

function ChatbotPage() {
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(true);

  const handleWizardSubmit = async (formData) => {
    try {
      const result = await submitTrendInput(formData);
      if (result.success) {
        // Create chat entry
        const botMessage = {
          type: "bot",
          content: result.chatResponse,
          responseId: result.responseId,
        };
        chatStore.createChat(result.responseId, botMessage);

        // Navigate to chat page
        navigate(`/chats/${result.responseId}`);
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const handleNewChat = () => {
    setShowWizard(true);
  };

  const handleChatSelect = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  return (
    <div className="chatbot-page">
      {showWizard ? (
        <WizardForm onSubmit={handleWizardSubmit} />
      ) : (
        <ChatList onNewChat={handleNewChat} onChatSelect={handleChatSelect} />
      )}
    </div>
  );
}

export default ChatbotPage;
