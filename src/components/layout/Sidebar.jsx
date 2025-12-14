import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import FolderIcon from "@mui/icons-material/Folder";
import UserFooter from "./UserFooter";
import { chatStore } from "../../store/chatStore";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = () => {
      const allChats = chatStore.getAllChats();
      setChats(allChats);
    };

    loadChats();
    // Refresh chat list periodically
    const interval = setInterval(loadChats, 2000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: "/chatbot", label: "AI Analysis", icon: ChatIcon },
    { path: "/trend-analysis", label: "Trend Analysis", icon: TrendingUpIcon },
    { path: "/analytics", label: "Deep Data Analytics", icon: BarChartIcon },
  ];

  const isChatPage = location.pathname.startsWith("/chats/");
  const activeChatId = isChatPage
    ? location.pathname.split("/chats/")[1]
    : null;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">
                <IconComponent />
              </span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}

        {chats.length > 0 && (
          <>
            <div className="nav-section-divider" />
            <div className="nav-section-header">
              <FolderIcon className="nav-section-icon" />
              <span className="nav-section-label">Reports analysis</span>
            </div>
            {chats.map((chat) => (
              <NavLink
                key={chat.responseId}
                to={`/chats/${chat.responseId}`}
                className={() =>
                  `nav-item nav-chat-item ${
                    activeChatId === String(chat.responseId) ? "active" : ""
                  }`
                }
              >
                <span className="nav-chat-name">{chat.chatName}</span>
              </NavLink>
            ))}
          </>
        )}
      </nav>
      <UserFooter />
    </aside>
  );
}

export default Sidebar;
