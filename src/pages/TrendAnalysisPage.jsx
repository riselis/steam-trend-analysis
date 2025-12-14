import { useState, useEffect } from "react";
import TrendFilters from "../components/analytics/TrendFilters";
import TrendCharts from "../components/analytics/TrendCharts";
import { fetchGenresTrendData } from "../api/mockApi";
import "./TrendAnalysisPage.css";

function TrendAnalysisPage() {
  const [filters, setFilters] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filters) {
      loadTrendData();
    }
  }, [filters]);

  const loadTrendData = async () => {
    if (!filters) return;

    setLoading(true);
    try {
      const result = await fetchGenresTrendData({
        startdate: filters.startdate,
        enddate: filters.enddate,
        profitabilityType: filters.profitabilityType,
        minNumberForProfitability: filters.minNumberForProfitability,
      });
      if (result.success) {
        setChartData(result.data);
      }
    } catch (error) {
      // Error handling without console.log
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trend-analysis-page">
      <h1>Trend Analysis</h1>
      <TrendFilters onFilterChange={setFilters} />
      {loading ? (
        <div className="loading-state">Loading trend data...</div>
      ) : (
        <TrendCharts data={chartData} />
      )}
    </div>
  );
}

export default TrendAnalysisPage;
