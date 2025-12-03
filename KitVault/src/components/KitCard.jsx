import React from "react";

const KitCard = ({ kit, onSelect }) => {
  return (
    <div className="kit-card" onClick={() => onSelect(kit._id)}>
      <img src={kit.imageUrl} alt={kit.name} className="kit-image" />
      <p>{kit.club} • {kit.season}</p>
      <p>Brand: {kit.brand}</p>
    </div>
  );
};

export default KitCard;
