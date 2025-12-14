import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getFullReport } from "../../api/mockApi";
import FullReportView from "./FullReportView";
import "./ReportPanel.css";

function ReportPanel({ responseId }) {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReport = async () => {
      if (!responseId) return;

      setLoading(true);
      setError(null);

      try {
        const result = await getFullReport(responseId);
        if (result.success) {
          try {
            const parsed = JSON.parse(result.content);
            setReportData(parsed);
          } catch (parseError) {
            // Fallback to text if not JSON
            setReportData({ content: result.content });
          }
        } else {
          setError("Failed to load report");
        }
      } catch (err) {
        console.error("Failed to load report:", err);
        setError("An error occurred while loading the report");
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [responseId]);

  return (
    <div className="report-panel">
      <div className="report-panel-header">
        <Typography variant="h6">Full Analysis Report</Typography>
      </div>

      <div className="report-panel-content">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
            }}
          >
            <CircularProgress size={40} />
            <Typography variant="body2" color="text.secondary">
              Loading report...
            </Typography>
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
              padding: 4,
            }}
          >
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        ) : reportData && reportData.summary ? (
          <FullReportView data={reportData} />
        ) : reportData?.content ? (
          <pre className="report-content">{reportData.content}</pre>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
              padding: 4,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No report available
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}

export default ReportPanel;
