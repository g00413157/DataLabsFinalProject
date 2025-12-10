import React from "react";
import { Link } from "react-router-dom";

const KitFilterBar = ({ filters, onChange, clubs, brands, seasons }) => {
  return (
    <div className="filter-bar">
      <select name="club" value={filters.club} onChange={onChange}>
        <option value="">All Clubs</option>
        {clubs.map((club) => (
          <option key={club} value={club}>
            {club}
          </option>
        ))}
      </select>

      <select name="brand" value={filters.brand} onChange={onChange}>
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select name="season" value={filters.season} onChange={onChange}>
        <option value="">All Seasons</option>
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </select>

      {/* pushes button to the right */}
      <div className="filter-spacer" />

      <Link to="/add" className="add-kit-btn">
        Add New Kit
      </Link>
    </div>
  );
};

export default KitFilterBar;
