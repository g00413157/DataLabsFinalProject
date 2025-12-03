import React from "react";

const KitFilterBar = ({ filters, onChange }) => {
  return (
    <div className="filter-bar">
      <select name="club" onChange={onChange}>
        <option value="">All Clubs</option>
        <option value="Arsenal">Arsenal</option>
        <option value="Real Madrid">Real Madrid</option>
        <option value="Liverpool">Liverpool</option>
        
      </select>

      <select name="brand" onChange={onChange}>
        <option value="">All Brands</option>
        <option value="Nike">Nike</option>
        <option value="Adidas">Adidas</option>
        <option value="Puma">Puma</option>
      </select>

      <select name="season" onChange={onChange}>
        <option value="">All Seasons</option>
        <option value="2023/24">2023/24</option>
        <option value="2022/23">2022/23</option>
        <option value="2010/11">2010/11</option>
      </select>
    </div>
  );
};

export default KitFilterBar;
