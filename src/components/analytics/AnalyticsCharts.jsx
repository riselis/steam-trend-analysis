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
import "./AnalyticsCharts.css";

function AnalyticsCharts({ data }) {
  if (!data) {
    return <div className="analytics-loading">Loading analytics data...</div>;
  }

  const { retention, sessionLength, activeUsers, topGames } = data;

  // Format retention data for bar chart
  const retentionData = [
    { name: "Day 1", value: retention.day1 },
    { name: "Day 7", value: retention.day7 },
    { name: "Day 30", value: retention.day30 },
  ];

  // Format top games data for bar chart
  const topGamesData = topGames.map((game) => ({
    name: game.name,
    players: game.players,
    growth: game.growth,
  }));

  // Using hex colors directly for recharts compatibility
  const colors = ["#5B7CFF", "#7AA2FF", "#5B7CFF"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.name}</p>
          <p className="tooltip-value">
            {payload[0].value.toLocaleString()}
            {payload[0].dataKey === "value" ? "%" : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderMetricCard = (label, value, unit = '', trend = null) => (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value.toLocaleString()}
        {unit && <span className="metric-unit">{unit}</span>}
      </div>
      {trend && (
        <div className={`metric-trend ${trend > 0 ? 'positive' : 'negative'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );

  return (
    <div className="analytics-charts">
      <div className="analytics-section">
        <h3>Retention Metrics</h3>
        <div className="retention-charts">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={retentionData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.06)"
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {retentionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-section">
        <h3>Session Length</h3>
        <div className="session-metrics">
          {renderMetricCard('Average', sessionLength.average, 'min')}
          {renderMetricCard('Median', sessionLength.median, 'min')}
          {renderMetricCard('95th Percentile', sessionLength.p95, 'min')}
        </div>
      </div>

      <div className="analytics-section">
        <h3>Active Users</h3>
        <div className="user-metrics">
          {renderMetricCard('Daily Active Users', activeUsers.daily, '', 5.2)}
          {renderMetricCard('Weekly Active Users', activeUsers.weekly, '', 3.8)}
          {renderMetricCard('Monthly Active Users', activeUsers.monthly, '', 7.1)}
        </div>
      </div>

      <div className="analytics-section">
        <h3>Top Games</h3>
        <div className="top-games-chart">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topGamesData} layout="vertical">
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
                width={80}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const game = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p className="tooltip-label">{game.name}</p>
                        <p className="tooltip-value">
                          {game.players.toLocaleString()} players
                        </p>
                        <p
                          className={`tooltip-growth ${
                            game.growth > 0 ? "positive" : "negative"
                          }`}
                        >
                          {game.growth > 0 ? "↑" : "↓"} {Math.abs(game.growth)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="players" radius={[0, 4, 4, 0]}>
                {topGamesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.growth > 0 ? "#3DD598" : "#5B7CFF"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;

