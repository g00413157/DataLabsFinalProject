import React from "react";
import { Link } from "react-router-dom";

const getImageSrc = (imageUrl) => {
  if (!imageUrl) return null;

  const cleanUrl = imageUrl.trim();

 
  if (cleanUrl.startsWith("data:image")) {
    return cleanUrl;
  }

  
  if (
    cleanUrl.startsWith("http://") ||
    cleanUrl.startsWith("https://")
  ) {
    return cleanUrl;
  }

  
  if (cleanUrl.startsWith("/uploads")) {
    return `http://localhost:3000${cleanUrl}`;
  }


  return `https://${cleanUrl}`;
};


const KitCard = ({ kit }) => {
  const imageSrc = getImageSrc(kit.imageUrl);

  return (
    <Link to={`/kits/${kit._id}`} className="kit-card">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={kit.name}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      <p>{kit.club} • {kit.season}</p>
      <p>Brand: {kit.brand}</p>
    </Link>
  );
};

export default KitCard;
