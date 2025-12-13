import { useState, useEffect } from 'react';
import AnalyticsCharts from '../components/analytics/AnalyticsCharts';
import { fetchAnalyticsData } from '../api/mockApi';
import './DataAnalyticsPage.css';

function DataAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const result = await fetchAnalyticsData();
      if (result.success) {
        setAnalyticsData(result.data);
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-analytics-page">
      <h1>Deep Data Analytics</h1>
      {loading ? (
        <div className="loading-state">Loading analytics data...</div>
      ) : (
        <AnalyticsCharts data={analyticsData} />
      )}
    </div>
  );
}

export default DataAnalyticsPage;

