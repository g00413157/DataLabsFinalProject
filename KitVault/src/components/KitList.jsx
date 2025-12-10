import React, { useEffect, useState } from "react";
import KitCard from "./KitCard";
import KitFilterBar from "./KitFilterBar";
import { Link } from "react-router-dom";

const KitList = () => {
  const [kits, setKits] = useState([]);
  const [filteredKits, setFilteredKits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    club: "",
    brand: "",
    season: "",
  });

  const [clubs, setClubs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/kits")
      .then((res) => res.json())
      .then((data) => {
        const kitData = data.kits || [];

        setKits(kitData);
        setFilteredKits(kitData);

        setClubs([...new Set(kitData.map(k => k.club).filter(Boolean))]);
        setBrands([...new Set(kitData.map(k => k.brand).filter(Boolean))]);
        setSeasons([...new Set(kitData.map(k => k.season).filter(Boolean))]);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching kits:", err);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    let filtered = kits;

    if (newFilters.club) {
      filtered = filtered.filter(k => k.club === newFilters.club);
    }
    if (newFilters.brand) {
      filtered = filtered.filter(k => k.brand === newFilters.brand);
    }
    if (newFilters.season) {
      filtered = filtered.filter(k => k.season === newFilters.season);
    }

    setFilteredKits(filtered);
  };

  if (loading) {
    return <p style={{ padding: "1rem" }}>Loading kits…</p>;
  }

  return (
    <div className="kit-list-page">
      <div className="filter-bar">
        <KitFilterBar
          filters={filters}
          onChange={handleFilterChange}
          clubs={clubs}
          brands={brands}
          seasons={seasons}
        />

        <div className="spacer" />

        
      </div>

      <div className="kit-list">
        {filteredKits.length > 0 ? (
          filteredKits.map((kit) => (
            <KitCard key={kit._id} kit={kit} />
          ))
        ) : (
          <p style={{ padding: "1rem" }}>
            No kits match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default KitList;
