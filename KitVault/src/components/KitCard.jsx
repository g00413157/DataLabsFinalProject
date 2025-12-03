import React from "react";
import { Link } from "react-router-dom";

const KitCard = ({ kit }) => {
  return (
    <Link to={`/kits/${kit._id}`} className="kit-card">
      <img src={kit.imageUrl} alt={kit.name} className="kit-image" />
      <p>{kit.club} • {kit.season}</p>
      <p>Brand: {kit.brand}</p>
    </Link>
  );
};

export default KitCard;
