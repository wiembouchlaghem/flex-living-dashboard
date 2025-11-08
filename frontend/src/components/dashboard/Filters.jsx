import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ reviews, setFiltered }) => {
  const [category, setCategory] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [date, setDate] = useState("");

  const applyFilters = () => {
    let result = [...reviews];

    if (category)
      result = result.filter((r) =>
        r.categories.some((c) => c.category === category)
      );

    if (minRating)
      result = result.filter((r) => r.rating >= parseFloat(minRating));

    if (date)
      result = result.filter((r) => new Date(r.submittedAt) >= new Date(date));

    setFiltered(result);
  };

  const resetFilters = () => {
    setCategory("");
    setMinRating(0);
    setDate("");
    setFiltered(reviews);
  };

  return (
    <div className="filters-bar">
      <div className="filter-item">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="cleanliness">Cleanliness</option>
          <option value="communication">Communication</option>
          <option value="comfort">Comfort</option>
          <option value="location">Location</option>
        </select>
      </div>

      <div className="filter-item">
        <label>Min Rating</label>
        <input
          type="number"
          min="0"
          max="10"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
      </div>

      <div className="filter-item">
        <label>From Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button className="apply-btn" onClick={applyFilters}>
          Apply
        </button>
        <button className="reset-btn" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
