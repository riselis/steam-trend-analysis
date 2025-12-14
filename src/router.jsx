import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatbotPage from "./pages/ChatbotPage";
import ChatPage from "./pages/chats/ChatPage";
import TrendAnalysisPage from "./pages/TrendAnalysisPage";
import DataAnalyticsPage from "./pages/DataAnalyticsPage";
import FullReportPage from "./pages/FullReportPage";
import DashboardLayout from "./components/layout/DashboardLayout";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return !token ? children : <Navigate to="/chatbot" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/chatbot" replace />,
      },
      {
        path: "chatbot",
        element: <ChatbotPage />,
      },
      {
        path: "chats/:id",
        element: <ChatPage />,
      },
      {
        path: "trend-analysis",
        element: <TrendAnalysisPage />,
      },
      {
        path: "analytics",
        element: <DataAnalyticsPage />,
      },
      {
        path: "analytics/full-report/:responseId",
        element: <FullReportPage />,
      },
    ],
  },
]);
