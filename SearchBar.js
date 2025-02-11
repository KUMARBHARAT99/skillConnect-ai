import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  
  const handleSearch = () => {
    onSearch(query); // Parent Component for send Search Query 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search workers, skills..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
