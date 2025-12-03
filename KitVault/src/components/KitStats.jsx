import React from "react";

const KitStats = ({ kits }) => {
  const total = kits.length;
  const totalValue = kits.reduce((sum, kit) => sum + Number(kit.value || 0), 0);

  return (
    <div className="stats-panel">
      <h2>Collection Stats</h2>

      <p><strong>Total Kits:</strong> {total}</p>
      <p><strong>Total Value:</strong> €{totalValue}</p>

      {/* Add charts later if you want */}
    </div>
  );
};

export default KitStats;
