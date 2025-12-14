import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import ChatIcon from "@mui/icons-material/Chat";
import DescriptionIcon from "@mui/icons-material/Description";
import ChatPanel from "../../components/chat/ChatPanel";
import ReportPanel from "../../components/chat/ReportPanel";
import { chatStore } from "../../store/chatStore";
import "./ChatPage.css";

const VIEW_MODE_KEY = "chat_view_mode_";

function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [viewMode, setViewMode] = useState("split");

  useEffect(() => {
    // Load saved view mode for this chat
    const savedMode = localStorage.getItem(`${VIEW_MODE_KEY}${id}`);
    if (savedMode && ["split", "chat", "report"].includes(savedMode)) {
      setViewMode(savedMode);
    }

    const chatData = chatStore.getChatWithMessages(id);
    if (chatData) {
      setChat(chatData);
    } else {
      navigate("/chatbot");
    }
  }, [id, navigate]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem(`${VIEW_MODE_KEY}${id}`, mode);
  };

  if (!chat) {
    return <div className="chat-loading">Loading chat...</div>;
  }

  const showChat = viewMode === "split" || viewMode === "chat";
  const showReport = viewMode === "split" || viewMode === "report";

  return (
    <div className="chat-page">
      <div className="chat-page-header">
        <Box sx={{ flex: 1 }} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Split View">
            <IconButton
              onClick={() => handleViewModeChange("split")}
              color={viewMode === "split" ? "primary" : "default"}
              size="small"
            >
              <ViewSidebarIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chat Only">
            <IconButton
              onClick={() => handleViewModeChange("chat")}
              color={viewMode === "chat" ? "primary" : "default"}
              size="small"
            >
              <ChatIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Report Only">
            <IconButton
              onClick={() => handleViewModeChange("report")}
              color={viewMode === "report" ? "primary" : "default"}
              size="small"
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </div>

      <div className="chat-page-content">
        {showChat && (
          <div
            className={`chat-panel-container ${viewMode === "chat" ? "fullscreen" : ""}`}
          >
            <ChatPanel chatId={id} chat={chat} setChat={setChat} />
          </div>
        )}
        {showReport && (
          <div
            className={`report-panel-container ${viewMode === "report" ? "fullscreen" : ""}`}
          >
            <ReportPanel responseId={id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
