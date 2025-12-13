import { NavLink } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import UserFooter from "./UserFooter";
import "./Sidebar.css";

function Sidebar() {
  const navItems = [
    { path: "/chatbot", label: "ChatBot", icon: ChatIcon },
    { path: "/trend-analysis", label: "Trend Analysis", icon: TrendingUpIcon },
    { path: "/analytics", label: "Deep Data Analytics", icon: BarChartIcon },
  ];

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
      </nav>
      <UserFooter />
    </aside>
  );
}

export default Sidebar;
