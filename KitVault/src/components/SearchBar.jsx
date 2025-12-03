import React from "react";

const SearchBar = ({ query, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search kits..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
