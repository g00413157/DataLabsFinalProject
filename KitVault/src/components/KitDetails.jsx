import React from "react";

const KitDetails = ({ kit, onDelete }) => {
  if (!kit) return <p>Loading...</p>;

  return (
    <div className="kit-details">
      <img src={kit.imageUrl} alt={kit.name} className="details-image" />
      <h2>{kit.name}</h2>
      <p><strong>Club:</strong> {kit.club}</p>
      <p><strong>Season:</strong> {kit.season}</p>
      <p><strong>Brand:</strong> {kit.brand}</p>
      <p><strong>Player:</strong> {kit.player}</p>
      <p><strong>Condition:</strong> {kit.condition}</p>
      <p><strong>Value:</strong> €{kit.value}</p>

      <button onClick={() => onDelete(kit._id)} className="delete-btn">Delete</button>
    </div>
  );
};

export default KitDetails;
