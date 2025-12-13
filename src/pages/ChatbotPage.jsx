import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WizardForm from "../components/chat/WizardForm";
import ChatLayout from "../components/chat/ChatLayout";
import { submitTrendInput } from "../api/mockApi";
import "./ChatbotPage.css";

function ChatbotPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(true);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseId, setResponseId] = useState(null);
  const [formData, setFormData] = useState(null);

  // Check if we're coming from wizard submit
  useEffect(() => {
    if (location.state?.formData) {
      setShowWizard(false);
      setFormData(location.state.formData);
      loadChatResponse(location.state.formData);
    }
  }, [location]);

  const loadChatResponse = async (data) => {
    setLoading(true);
    try {
      const result = await submitTrendInput(data);
      if (result.success) {
        setResponseId(result.responseId);
        const botMessage = {
          type: "bot",
          content: result.chatResponse,
          responseId: result.responseId,
        };
        setMessages([botMessage]);
      }
    } catch (error) {
      const errorMessage = {
        type: "bot",
        content: "Sorry, an error occurred. Please try again.",
      };
      setMessages([errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleWizardSubmit = (formData) => {
    // Immediately navigate to chat view
    navigate("/chatbot", { state: { formData }, replace: true });
  };

  return (
    <div className="chatbot-page">
      {showWizard ? (
        <WizardForm onSubmit={handleWizardSubmit} />
      ) : (
        <div className="chatbot-results">
          <ChatLayout
            messages={messages}
            onSendMessage={null}
            loading={loading}
            showInput={false}
          />
        </div>
      )}
    </div>
  );
}

export default ChatbotPage;
