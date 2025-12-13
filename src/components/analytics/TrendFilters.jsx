import { useState } from 'react';
import './TrendFilters.css';

function TrendFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    platform: 'all',
    genre: 'all'
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="trend-filters">
      <div className="filter-group">
        <label htmlFor="dateRange">Date Range</label>
        <select
          id="dateRange"
          value={filters.dateRange}
          onChange={(e) => handleChange('dateRange', e.target.value)}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="platform">Platform</label>
        <select
          id="platform"
          value={filters.platform}
          onChange={(e) => handleChange('platform', e.target.value)}
        >
          <option value="all">All Platforms</option>
          <option value="steam">Steam</option>
          <option value="epic">Epic Games</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          value={filters.genre}
          onChange={(e) => handleChange('genre', e.target.value)}
        >
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="rpg">RPG</option>
          <option value="strategy">Strategy</option>
          <option value="sports">Sports</option>
        </select>
      </div>
    </div>
  );
}

export default TrendFilters;

