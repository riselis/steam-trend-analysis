import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import "./FullReportView.css";

function FullReportView({ data }) {
  if (!data || !data.summary || !data.top_niches) {
    return null;
  }

  const { summary, top_niches } = data;

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

  const getTrendIcon = (direction) => {
    switch (direction) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  return (
    <Box className="full-report-view">
      {/* Executive Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Executive Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Recommended Niche
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {summary.recommended_niche}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                <Chip label={`Theme: ${summary.core_theme}`} size="small" />
                <Chip label={`Mode: ${summary.game_mode}`} size="small" />
                <Chip
                  label={`Release: ${summary.recommended_release_window}`}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Target Audience
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                <Chip
                  label={`Age: ${summary.target_audience?.age_range?.min}-${summary.target_audience?.age_range?.max}`}
                  size="small"
                />
                <Chip
                  label={summary.target_audience?.player_type}
                  size="small"
                />
              </Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Success Probability
              </Typography>
              <LinearProgress
                variant="determinate"
                value={summary.risk_success?.success_probability || 0}
                sx={{
                  height: 10,
                  borderRadius: 1,
                  mb: 1,
                }}
              />
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="body2">
                  {summary.risk_success?.success_probability || 0}%
                </Typography>
                <Chip
                  label={summary.risk_success?.risk_level}
                  size="small"
                  color={getRiskColor(summary.risk_success?.risk_level)}
                />
              </Box>
            </Grid>
          </Grid>
          {summary.risk_success?.ai_summary && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {summary.risk_success.ai_summary}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Top Niches Comparison */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Top Niches Comparison
      </Typography>
      {top_niches.map((niche, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">{niche.niche_title}</Typography>
              <Chip
                label={`${getTrendIcon(niche.trend_direction)} ${
                  niche.trend_direction
                }`}
                size="small"
                color={
                  niche.trend_direction === "up"
                    ? "success"
                    : niche.trend_direction === "down"
                    ? "error"
                    : "default"
                }
              />
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Success Probability
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={niche.success_probability}
                  sx={{ height: 8, mt: 0.5, mb: 0.5 }}
                />
                <Typography variant="body2">
                  {niche.success_probability}%
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Risk Score
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={niche.risk_score}
                  sx={{ height: 8, mt: 0.5, mb: 0.5 }}
                />
                <Typography variant="body2">{niche.risk_score}%</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Market Saturation
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={niche.market_saturation}
                  sx={{ height: 8, mt: 0.5, mb: 0.5 }}
                />
                <Typography variant="body2">
                  {niche.market_saturation}%
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Team Fit Score
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={niche.team_fit_score}
                  color="success"
                  sx={{ height: 8, mt: 0.5, mb: 0.5 }}
                />
                <Typography variant="body2" color="success.main">
                  {niche.team_fit_score}%
                </Typography>
              </Grid>
            </Grid>

            {/* Release Timing */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Release Timing
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Recommended Window
                </Typography>
                <Typography variant="body2">
                  {niche.release_timing?.recommended_window}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Best Months
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}
                >
                  {niche.release_timing?.best_months?.map((month) => (
                    <Chip key={month} label={month} size="small" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Visibility Score
                </Typography>
                <Typography variant="body2">
                  {niche.release_timing?.visibility_score}%
                </Typography>
              </Grid>
            </Grid>

            {/* Financial Projections */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Financial Projections
            </Typography>
            <Grid container spacing={2}>
              {["month_1", "month_6", "month_12"].map((month) => {
                const data = niche.financial_projections?.[month];
                if (!data) return null;
                return (
                  <Grid item xs={12} md={4} key={month}>
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: "background.paper",
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {month.replace("_", " ").toUpperCase()}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" display="block">
                          Low: ${data.low?.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Mid: ${data.mid?.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          High: ${data.high?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>

            {/* Product Direction */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Product Direction
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Game Mode
                </Typography>
                <Typography variant="body2">
                  {niche.product_direction?.game_mode}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Core Theme
                </Typography>
                <Typography variant="body2">
                  {niche.product_direction?.core_theme}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Recommended Scope
                </Typography>
                <Typography variant="body2">
                  {niche.product_direction?.recommended_scope}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Core Mechanics
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}
                >
                  {niche.product_direction?.core_mechanics?.map((mech) => (
                    <Chip key={mech} label={mech} size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>

            {/* Publisher Fit */}
            {niche.publisher_fit && niche.publisher_fit.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Publisher Fit
                </Typography>
                {niche.publisher_fit.map((pub, pubIndex) => (
                  <Box key={pubIndex} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {pub.publisher}
                      </Typography>
                      <Typography variant="body2">
                        Match: {pub.match_score}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pub.match_score}
                      sx={{ height: 6, mb: 0.5 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Examples: {pub.example_games?.join(", ")}
                    </Typography>
                  </Box>
                ))}
              </>
            )}

            {/* Marketing Plan */}
            {niche.marketing_plan && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Marketing Plan
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary">
                      Pre-Launch
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {niche.marketing_plan.pre_launch}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary">
                      Launch
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {niche.marketing_plan.launch}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary">
                      Post-Launch
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {niche.marketing_plan.post_launch}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Primary Channels
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        flexWrap: "wrap",
                        mt: 0.5,
                      }}
                    >
                      {niche.marketing_plan.primary_channels?.map((channel) => (
                        <Chip key={channel} label={channel} size="small" />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Community Strategy
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {niche.marketing_plan.community_strategy}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Risks
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {niche.marketing_plan.risks}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}

            {/* Explainability */}
            {niche.explainability && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Explainability
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" color="text.secondary">
                      Top Success Factors
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      {niche.explainability.top_success_factors?.map(
                        (factor) => (
                          <Chip
                            key={factor}
                            label={factor}
                            size="small"
                            color="success"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        )
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" color="text.secondary">
                      Top Risk Factors
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      {niche.explainability.top_risk_factors?.map((factor) => (
                        <Chip
                          key={factor}
                          label={factor}
                          size="small"
                          color="error"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Model Confidence
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={niche.explainability.model_confidence}
                      sx={{ height: 8, mt: 0.5 }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {niche.explainability.model_confidence}%
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FullReportView;
