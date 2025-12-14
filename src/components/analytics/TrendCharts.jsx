import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./TrendCharts.css";

function TrendCharts({ data }) {
  if (!data) {
    return <div className="charts-loading">Loading chart data...</div>;
  }

  const {
    released_games,
    profitable_games,
    profitability_ratio,
    totalNumberOfReleasedGames,
    totalNumberOfProfitableGames,
  } = data;

  // Transform data for chart - merge by date
  const transformDataForChart = () => {
    const dateMap = new Map();

    // Add released games
    released_games.forEach((item) => {
      const dateKey = item.date;
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, {
          date: dateKey,
          released: item.y,
          profitable: 0,
          ratio: 0,
        });
      } else {
        dateMap.get(dateKey).released = item.y;
      }
    });

    // Add profitable games
    profitable_games.forEach((item) => {
      const dateKey = item.date;
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, {
          date: dateKey,
          released: 0,
          profitable: item.y,
          ratio: 0,
        });
      } else {
        dateMap.get(dateKey).profitable = item.y;
      }
    });

    // Add profitability ratio
    profitability_ratio.forEach((item) => {
      const dateKey = item.date;
      if (dateMap.has(dateKey)) {
        dateMap.get(dateKey).ratio = item.y;
      }
    });

    // Convert to array and sort by date
    return Array.from(dateMap.values())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item) => ({
        ...item,
        formattedDate: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }));
  };

  const chartData = transformDataForChart();
  const ratioData = chartData.map((item) => ({
    date: item.formattedDate,
    ratio: item.ratio,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => {
            const isRatio =
              entry.dataKey === "ratio" || entry.name === "Profitability Ratio";
            return (
              <p
                key={index}
                className="tooltip-value"
                style={{ color: entry.color }}
              >
                {entry.name}:{" "}
                {isRatio
                  ? entry.value.toFixed(1)
                  : entry.value.toLocaleString()}
                {isRatio ? "%" : ""}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="trend-charts">
      {/* Summary Metrics */}

      {/* Chart 1: Released vs Profitable Games */}
      <div className="chart-card">
        <h3>Released vs Profitable Games</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.06)"
              />
              <XAxis
                dataKey="formattedDate"
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6C78A0"
                tick={{ fill: "#6C78A0", fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
              <Line
                type="monotone"
                dataKey="released"
                name="Released Games"
                stroke="#5B7CFF"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="profitable"
                name="Profitable Games"
                stroke="#7AA2FF"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Profitability Ratio */}
      <div className="chart-card">
        <h3>Profitability Ratio Over Time</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratioData}>
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
                dataKey="ratio"
                name="Profitability Ratio"
                stroke="#3DD598"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-footer">
          <span className="chart-value">
            {profitability_ratio[profitability_ratio.length - 1]?.y.toFixed(
              1
            ) || 0}
            %
          </span>
          <span className="chart-label">Current Ratio</span>
        </div>
      </div>

      <div className="summary-card summary-card-released">
        <div className="summary-value">
          {totalNumberOfReleasedGames?.toLocaleString() || 0}
        </div>
        <div className="summary-label">Total Released Games</div>
      </div>
      <div className="summary-card summary-card-profitable">
        <div className="summary-value">
          {totalNumberOfProfitableGames?.toLocaleString() || 0}
        </div>
        <div className="summary-label">Total Profitable Games</div>
      </div>
    </div>
  );
}

export default TrendCharts;
