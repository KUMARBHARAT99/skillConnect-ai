import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");

  const applyFilter = () => {
    onFilter({ category, location, rating }); //send Filter for Parent Component 
  };

  return (
    <div className="filter-container">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="plumber">Plumber</option>
        <option value="carpenter">Carpenter</option>
        <option value="painter">Painter</option>
        <option value="electrician">Electrician</option>
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Rating</option>
        <option value="5">5 Star</option>
        <option value="4">4 Star & Above</option>
        <option value="3">3 Star & Above</option>
      </select>

      <button onClick={applyFilter}>Apply Filters</button>
    </div>
  );
};

export default Filter;
