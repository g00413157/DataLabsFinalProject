import React from "react";
import KitCard from "./KitCard";

const KitList = ({ kits, onSelect }) => {
  return (
    <div className="kit-list">
      {kits.map((kit) => (
        <KitCard key={kit._id} kit={kit} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default KitList;
