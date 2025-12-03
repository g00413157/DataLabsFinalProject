import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const KitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kit, setKit] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/kits/${id}`)
      .then((res) => res.json())
      .then((data) => setKit(data))
      .catch((err) => console.error("Error loading kit:", err));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this kit?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/api/kits/${id}`, {
      method: "DELETE",
    });

    navigate("/collection");
  };

  if (!kit) return <p>Loading...</p>;

  return (
    <div className="kit-details-wrapper">

    
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="kit-details">
        <img src={kit.imageUrl} alt={kit.name} className="details-image" />
        <h2>{kit.name}</h2>

        <p><strong>Club:</strong> {kit.club}</p>
        <p><strong>Season:</strong> {kit.season}</p>
        <p><strong>Brand:</strong> {kit.brand}</p>
        <p><strong>Player:</strong> {kit.player}</p>
        <p><strong>Condition:</strong> {kit.condition}</p>
        <p><strong>Value:</strong> €{kit.value}</p>

        <div className="details-buttons">
          <Link to={`/edit/${kit._id}`} className="edit-btn">
            Edit
          </Link>

          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default KitDetails;
