import { useState, useEffect } from "react";
import "./TrendFilters.css";

function TrendFilters({ onFilterChange }) {
  const getDefaultStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 730);
    return date.toISOString().split("T")[0];
  };

  const getDefaultEndDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [filters, setFilters] = useState({
    startdate: getDefaultStartDate(),
    enddate: getDefaultEndDate(),
    profitabilityType: "wishlists",
    minNumberForProfitability: 0,
  });

  useEffect(() => {
    onFilterChange(filters);
  }, []);

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="trend-filters">
      <div className="filter-group">
        <label htmlFor="startdate">Start Date</label>
        <input
          type="date"
          id="startdate"
          value={filters.startdate}
          onChange={(e) => handleChange("startdate", e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="enddate">End Date</label>
        <input
          type="date"
          id="enddate"
          value={filters.enddate}
          onChange={(e) => handleChange("enddate", e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="profitabilityType">Profitability Type</label>
        <select
          id="profitabilityType"
          value={filters.profitabilityType}
          onChange={(e) => handleChange("profitabilityType", e.target.value)}
        >
          <option value="wishlists">Wishlists</option>
          <option value="revenue">Revenue</option>
          <option value="reviews">Reviews</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="minNumberForProfitability">
          Min Number for Profitability
        </label>
        <input
          type="number"
          id="minNumberForProfitability"
          value={filters.minNumberForProfitability}
          onChange={(e) =>
            handleChange(
              "minNumberForProfitability",
              parseInt(e.target.value) || 0
            )
          }
          min="0"
          className="filter-input"
        />
      </div>
    </div>
  );
}

export default TrendFilters;
