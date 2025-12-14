import { useState, useEffect } from "react";
import AnalyticsCharts from "../components/analytics/AnalyticsCharts";
import DeepDataFilters from "../components/analytics/DeepDataFilters";
import { fetchDeepDataAnalytics } from "../api/mockApi";
import "./DataAnalyticsPage.css";

function DataAnalyticsPage() {
  const [filters, setFilters] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filters) {
      loadAnalyticsData();
    }
  }, [filters]);

  const loadAnalyticsData = async () => {
    if (!filters) return;

    setLoading(true);
    try {
      const result = await fetchDeepDataAnalytics(filters);
      if (result.success) {
        setAnalyticsData(result.data);
      }
    } catch (error) {
      // Error handling without console.log
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-analytics-page">
      <h1>Deep Data Analytics</h1>
      <DeepDataFilters onFilterChange={setFilters} />
      {loading ? (
        <div className="loading-state">Loading analytics data...</div>
      ) : (
        <AnalyticsCharts data={analyticsData} />
      )}
    </div>
  );
}

export default DataAnalyticsPage;
