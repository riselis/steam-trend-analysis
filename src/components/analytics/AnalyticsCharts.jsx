import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Box,
  Paper,
  LinearProgress,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import "./AnalyticsCharts.css";

function AnalyticsCharts({ data }) {
  if (!data) {
    return <div className="analytics-loading">Loading analytics data...</div>;
  }

  const {
    topRevenueGames,
    topWishlistedGames,
    topSupportedLanguages,
    percentThatWentWithPublishers,
    linuxSupportPercentage,
    macSupportPercentage,
    medianPrice,
    averagePrice,
    partialControllerSupportPercentage,
    fullControllerSupportPercentage,
    coopSupportPercentage,
    multiplayerSupportPercentage,
    steamLeaderboardSupportPercentage,
    steamAchievementsSupportPercentage,
  } = data;

  // Format top revenue games for bar chart
  const topRevenueData = topRevenueGames
    .slice()
    .sort((a, b) => b.value - a.value)
    .map((game, index) => ({
      name:
        game.name.length > 20 ? game.name.substring(0, 20) + "..." : game.name,
      fullName: game.name,
      value: game.value,
      isTop3: index < 3,
    }));

  // Format top wishlisted games for bar chart
  const topWishlistedData = topWishlistedGames
    .slice()
    .sort((a, b) => b.value - a.value)
    .map((game) => ({
      name:
        game.name.length > 20 ? game.name.substring(0, 20) + "..." : game.name,
      fullName: game.name,
      value: game.value,
    }));

  const CustomTooltip = ({ active, payload, isRevenue = false }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const formattedValue = isRevenue
        ? `$${data.value.toLocaleString()}`
        : data.value.toLocaleString();
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{data.fullName || data.name}</p>
          <p className="tooltip-value">{formattedValue}</p>
        </div>
      );
    }
    return null;
  };

  const renderPercentageMetric = (label, value) => (
    <Box className="percentage-metric">
      <Box className="percentage-header">
        <Typography variant="body2" className="percentage-label">
          {label}
        </Typography>
        <Typography variant="body2" className="percentage-value">
          {value.toFixed(1)}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        className="percentage-progress"
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#5B7CFF",
          },
        }}
      />
    </Box>
  );

  const renderPriceCard = (label, value) => (
    <Paper className="price-card" elevation={0}>
      <Typography variant="caption" className="price-label">
        {label}
      </Typography>
      <Typography variant="h4" className="price-value">
        ${value.toFixed(2)}
      </Typography>
    </Paper>
  );

  return (
    <div className="analytics-charts">
      {/* Top Revenue Games */}
      <Paper className="analytics-section" elevation={0}>
        <Typography variant="h6" className="section-title">
          Top Revenue Games
        </Typography>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topRevenueData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.06)"
              />
              <XAxis
                type="number"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                width={120}
              />
              <Tooltip
                content={(props) => (
                  <CustomTooltip {...props} isRevenue={true} />
                )}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {topRevenueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isTop3 ? "#3DD598" : "#5B7CFF"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      {/* Top Wishlisted Games */}
      <Paper className="analytics-section" elevation={0}>
        <Typography variant="h6" className="section-title">
          Top Wishlisted Games
        </Typography>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topWishlistedData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.06)"
              />
              <XAxis
                type="number"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                width={120}
              />
              <Tooltip
                content={(props) => (
                  <CustomTooltip {...props} isRevenue={false} />
                )}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#7AA2FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      {/* Platform Support */}
      <Paper className="analytics-section" elevation={0}>
        <Typography variant="h6" className="section-title">
          Platform Support
        </Typography>
        <Box className="metrics-container">
          {renderPercentageMetric("Linux Support", linuxSupportPercentage)}
          {renderPercentageMetric("Mac Support", macSupportPercentage)}
          {renderPercentageMetric(
            "Went with Publishers",
            percentThatWentWithPublishers
          )}
        </Box>
      </Paper>

      {/* Controller & Features */}
      <Paper className="analytics-section" elevation={0}>
        <Typography variant="h6" className="section-title">
          Controller & Features
        </Typography>
        <Box className="metrics-container">
          {renderPercentageMetric(
            "Partial Controller Support",
            partialControllerSupportPercentage
          )}
          {renderPercentageMetric(
            "Full Controller Support",
            fullControllerSupportPercentage
          )}
          {renderPercentageMetric("Co-op Support", coopSupportPercentage)}
        </Box>
      </Paper>

      {/* Online / Social Features */}
      <Paper className="analytics-section" elevation={0}>
        <Typography variant="h6" className="section-title">
          Online / Social Features
        </Typography>
        <Box className="metrics-container">
          {renderPercentageMetric(
            "Multiplayer Support",
            multiplayerSupportPercentage
          )}
          {renderPercentageMetric(
            "Steam Leaderboards",
            steamLeaderboardSupportPercentage
          )}
          {renderPercentageMetric(
            "Steam Achievements",
            steamAchievementsSupportPercentage
          )}
        </Box>
      </Paper>

      {/* Pricing Insights */}
      <Paper className="analytics-section" elevation={0}>
        <Typography variant="h6" className="section-title">
          Pricing Insights
        </Typography>
        <Box className="pricing-container">
          {renderPriceCard("Median Price", medianPrice)}
          {renderPriceCard("Average Price", averagePrice)}
        </Box>
      </Paper>

      {/* Language Support */}
      <Paper className="analytics-section" elevation={0}>
        <Typography variant="h6" className="section-title">
          Top Supported Languages
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          className="languages-container"
        >
          {topSupportedLanguages.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              size="small"
              className="language-chip"
            />
          ))}
        </Stack>
      </Paper>
    </div>
  );
}

export default AnalyticsCharts;
