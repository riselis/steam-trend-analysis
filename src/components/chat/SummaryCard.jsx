import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Grid,
} from "@mui/material";
import "./SummaryCard.css";

function SummaryCard({ summary }) {
  if (!summary) return null;

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case "low":
        return "success";
      case "moderate":
        return "warning";
      case "high":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card className="summary-card">
      <CardContent>
        {/* Header Card */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {summary.recommended_niche}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            <Chip
              label={`Theme: ${summary.core_theme}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`Mode: ${summary.game_mode}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`Release: ${summary.recommended_release_window}`}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Target Audience */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
            Target Audience
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={`Age: ${summary.target_audience?.age_range?.min}-${summary.target_audience?.age_range?.max}`}
              size="small"
            />
            <Chip label={summary.target_audience?.player_type} size="small" />
          </Box>
        </Box>

        {/* Risk & Success */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
            Success Probability
          </Typography>
          <Box sx={{ mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={summary.risk_success?.success_probability || 0}
              sx={{
                height: 8,
                borderRadius: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#3DD598",
                },
              }}
            />
            <Typography variant="caption" sx={{ mt: 0.5, display: "block" }}>
              {summary.risk_success?.success_probability || 0}%
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Risk Level:
            </Typography>
            <Chip
              label={summary.risk_success?.risk_level}
              size="small"
              color={getRiskColor(summary.risk_success?.risk_level)}
            />
          </Box>
          {summary.risk_success?.ai_summary && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {summary.risk_success.ai_summary}
            </Typography>
          )}
        </Box>

        {/* Revenue Snapshot */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
            Revenue Snapshot
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box className="revenue-block">
                <Typography variant="caption" color="text.secondary">
                  Month 1
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Typography variant="caption" display="block">
                    Low: $
                    {summary.revenue_snapshot?.month_1?.low?.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Mid: $
                    {summary.revenue_snapshot?.month_1?.mid?.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" display="block">
                    High: $
                    {summary.revenue_snapshot?.month_1?.high?.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="revenue-block">
                <Typography variant="caption" color="text.secondary">
                  Month 3
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Typography variant="caption" display="block">
                    Low: $
                    {summary.revenue_snapshot?.month_3?.low?.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Mid: $
                    {summary.revenue_snapshot?.month_3?.mid?.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" display="block">
                    High: $
                    {summary.revenue_snapshot?.month_3?.high?.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
