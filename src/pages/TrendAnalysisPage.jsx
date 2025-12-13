import { useState, useEffect } from 'react';
import TrendFilters from '../components/analytics/TrendFilters';
import TrendCharts from '../components/analytics/TrendCharts';
import { fetchTrendData } from '../api/mockApi';
import './TrendAnalysisPage.css';

function TrendAnalysisPage() {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    platform: 'all',
    genre: 'all'
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendData();
  }, [filters]);

  const loadTrendData = async () => {
    setLoading(true);
    try {
      const result = await fetchTrendData(filters);
      if (result.success) {
        setChartData(result.data);
      }
    } catch (error) {
      console.error('Failed to load trend data:', error);
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

