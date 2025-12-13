import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./TrendCharts.css";

function TrendCharts({ data }) {
  if (!data) {
    return <div className="charts-loading">Loading chart data...</div>;
  }

  const { playerCount, engagement } = data;

  // Format data for recharts
  const playerCountData = playerCount.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: item.value,
  }));

  const engagementData = engagement.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: item.value,
    isPercentage: true,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            {payload[0].value.toLocaleString()}
            {payload[0].payload?.isPercentage ? "%" : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="trend-charts">
      <div className="chart-card">
        <h3>Player Count Over Time</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={playerCountData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.06)"
              />
              <XAxis
                dataKey="date"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#5B7CFF"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-footer">
          <span className="chart-value">
            {playerCount[playerCount.length - 1]?.value.toLocaleString()}
          </span>
          <span className="chart-label">Current Players</span>
        </div>
      </div>

      <div className="chart-card">
        <h3>Engagement Trend</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={engagementData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.06)"
              />
              <XAxis
                dataKey="date"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                name="engagement"
                stroke="#7AA2FF"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-footer">
          <span className="chart-value">
            {engagement[engagement.length - 1]?.value}%
          </span>
          <span className="chart-label">Engagement Rate</span>
        </div>
      </div>
    </div>
  );
}

export default TrendCharts;

