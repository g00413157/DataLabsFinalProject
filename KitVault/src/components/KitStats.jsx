import React, { useEffect, useState } from "react";

const KitStats = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/kits")
      .then((res) => res.json())
      .then((data) => {
        setKits(data.kits || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading stats…</p>;
  }

  if (kits.length === 0) {
    return (
      <div className="stats-panel">
        <h2>Collection Stats</h2>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No kits added yet. Add some kits to see stats 📊
        </p>
      </div>
    );
  }

  const countBy = (key) =>
    kits.reduce((acc, kit) => {
      const value = kit[key];
      if (!value) return acc;
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

  const total = kits.length;

  const totalValue = kits.reduce(
    (sum, kit) => sum + Number(kit.value || 0),
    0
  );

  const averageValue = Math.round(totalValue / total);

  const brandCounts = countBy("brand");
  const clubCounts = countBy("club");
  const seasonCounts = countBy("season");

  const topKit = kits.reduce((max, kit) =>
    Number(kit.value || 0) > Number(max.value || 0) ? kit : max
  );

  const mostCommonBrand = Object.entries(brandCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const seasonsSorted = Object.keys(seasonCounts).sort();
  const oldestSeason = seasonsSorted[0];
  const newestSeason = seasonsSorted[seasonsSorted.length - 1];

  const maxSeasonCount = Math.max(...Object.values(seasonCounts));

  const clubEntries = Object.entries(clubCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const clubColors = [
    "#9CE7F7",
    "#2E3440",
    "#D64E36",
    "#7dd3e5",
    "#0aa6a6",
    "#f59e0b",
    "#8b5cf6"
  ];

  let cumulative = 0;

  const donutSegments = clubEntries.map(([club, count], index) => {
    const percentage = (count / total) * 100;
    const start = cumulative;
    cumulative += percentage;

    return {
      club,
      count,
      start,
      end: cumulative,
      color: clubColors[index % clubColors.length]
    };
  });

  const donutGradient = `conic-gradient(
    ${donutSegments
      .map(
        (seg) => `${seg.color} ${seg.start}% ${seg.end}%`
      )
      .join(", ")}
  )`;

  return (
    <div className="stats-panel">
      <h2>Collection Stats</h2>

      <div className="stats-grid">

        <div className="stats-card overview-card">
          <h3>Overview</h3>
          <div className="overview-metrics">
            <div className="metric">
              <span>Total Kits</span>
              <strong>{total}</strong>
            </div>
            <div className="metric">
              <span>Total Value</span>
              <strong>€{totalValue}</strong>
            </div>
            <div className="metric">
              <span>Average Value</span>
              <strong>€{averageValue}</strong>
            </div>
            <div className="metric">
              <span>Newest Season</span>
              <strong>{newestSeason}</strong>
            </div>
            <div className="metric">
              <span>Oldest Season</span>
              <strong>{oldestSeason}</strong>
            </div>
          </div>
        </div>

        <div className="stats-card donut-card">
          <h3>Club Distribution</h3>

          <div className="donut" style={{ background: donutGradient }}>
            <div className="donut-inner">
              <span>{total}</span>
              <small>Kits</small>
            </div>
          </div>

          <div className="donut-legend">
            {donutSegments.map((seg) => (
              <span key={seg.club}>
                <i
                  className="club-dot"
                  style={{ background: seg.color }}
                />
                {seg.club} ({seg.count})
              </span>
            ))}
          </div>

          <p className="chart-subtitle">
            Distribution of kits by club
          </p>
        </div>

        <div className="stats-card featured-card">
          <h3>Most Valuable Kit</h3>
          <div className="featured-kit">
            {topKit.imageUrl && (
              <img src={topKit.imageUrl} alt="Most valuable kit" />
            )}
            <p className="kit-name">
              {topKit.club} · {topKit.season}
            </p>
            <span className="kit-price">€{topKit.value}</span>
          </div>
        </div>

        {mostCommonBrand && (
          <div className="stats-card highlight-card">
            <h3>Top Brand</h3>
            <div className="highlight-value">
              {mostCommonBrand[0]}
            </div>
            <p className="highlight-sub">
              {mostCommonBrand[1]} kits in collection
            </p>
          </div>
        )}

        <div className="stats-card mini-bar-card">
          <h3>Top Brands</h3>
          <div className="mini-bars">
            {Object.entries(brandCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)
              .map(([brand, count]) => (
                <div className="mini-bar-row" key={brand}>
                  <span>{brand}</span>
                  <div className="mini-track">
                    <div
                      className="mini-fill"
                      style={{
                        width: `${(count / total) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="stats-card list-card">
          <h3>Clubs</h3>
          <div className="list">
            {Object.entries(clubCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([club, count]) => (
                <div className="list-row" key={club}>
                  <span>{club}</span>
                  <span className="pill">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="stats-card seasons-card">
          <h3>Seasons</h3>
          <div className="season-bars">
            {Object.entries(seasonCounts)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([season, count]) => (
                <div className="season-bar" key={season}>
                  <div className="season-label">
                    <span>{season}</span>
                    <span className="season-value">{count}</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(count / maxSeasonCount) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default KitStats;
