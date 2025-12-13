import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFullReport } from "../api/mockApi";
import "./FullReportPage.css";

function FullReportPage() {
  const { responseId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      if (responseId) {
        setLoading(true);
        try {
          const result = await getFullReport(responseId);
          if (result.success) {
            setReport(result.content);
          }
        } catch (error) {
          console.error("Failed to load report:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadReport();
  }, [responseId]);

  return (
    <div className="full-report-page">
      <div className="report-header">
        <button
          className="back-button"
          onClick={() => navigate("/chatbot")}
        >
          ← Back to Chatbot
        </button>
        <h1>Full Analysis Report #{responseId}</h1>
      </div>

      {loading ? (
        <div className="loading-state">Loading report...</div>
      ) : (
        <div className="report-content">
          <pre className="report-text">{report}</pre>
        </div>
      )}
    </div>
  );
}

export default FullReportPage;

