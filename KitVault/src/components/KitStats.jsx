import React, { useEffect, useState } from "react";

const KitStats = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/kits")
      .then(res => res.json())
      .then(data => {
        setKits(data.kits);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stats...</p>;

  const total = kits.length;
  const totalValue = kits.reduce((sum, kit) => sum + Number(kit.value || 0), 0);
  const averageValue = total > 0 ? Math.round(totalValue / total) : 0;

  const brandCounts = kits.reduce((acc, kit) => {
    acc[kit.brand] = (acc[kit.brand] || 0) + 1;
    return acc;
  }, {});

  const clubCounts = kits.reduce((acc, kit) => {
    acc[kit.club] = (acc[kit.club] || 0) + 1;
    return acc;
  }, {});

  const seasonCounts = kits.reduce((acc, kit) => {
    acc[kit.season] = (acc[kit.season] || 0) + 1;
    return acc;
  }, {});

  const topKit = kits.reduce((max, kit) =>
    Number(kit.value || 0) > Number(max.value || 0) ? kit : max,
    kits[0]
  );

  const seasons = kits.map(k => k.season).sort();
  const oldestSeason = seasons[0];
  const newestSeason = seasons[seasons.length - 1];

  return (
    <div className="stats-panel">
      <h2>Collection Stats</h2>

      <div className="stats-section">
        <p><strong>Total Kits:</strong> {total}</p>
        <p><strong>Total Value:</strong> €{totalValue}</p>
        <p><strong>Average Value per Kit:</strong> €{averageValue}</p>
        <p><strong>Newest Season:</strong> {newestSeason}</p>
        <p><strong>Oldest Season:</strong> {oldestSeason}</p>
      </div>

      <div className="stats-divider"></div>

      <h3>Most Valuable Kit</h3>
      {topKit && (
        <div className="top-kit-block">
          {topKit.imageUrl && (
            <img src={topKit.imageUrl} alt="Top Kit" className="top-kit-img" />
          )}
          <p>
            {topKit.club} {topKit.season} — <strong>€{topKit.value}</strong>
          </p>
        </div>
      )}

      <div className="stats-divider"></div>

      <h3>Kits by Brand</h3>
      <div className="stats-list">
        {Object.entries(brandCounts).map(([brand, count]) => (
          <p key={brand}><strong>{brand}:</strong> {count}</p>
        ))}
      </div>

      <div className="stats-divider"></div>

      <h3>Kits by Club</h3>
      <div className="stats-list">
        {Object.entries(clubCounts).map(([club, count]) => (
          <p key={club}><strong>{club}:</strong> {count}</p>
        ))}
      </div>

      <div className="stats-divider"></div>

      <h3>Kits by Season</h3>
      <div className="stats-list">
        {Object.entries(seasonCounts).map(([season, count]) => (
          <p key={season}><strong>{season}:</strong> {count}</p>
        ))}
      </div>

    </div>
  );
};

export default KitStats;
