import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const KitForm = () => {
  const { id } = useParams();          
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    club: "",
    season: "",
    player: "",
    brand: "",
    condition: "",
    value: "",
    imageUrl: ""
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      
      fetch(`http://localhost:3000/api/kits/${id}`)
        .then(res => res.json())
        .then(data => setForm(data));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:3000/api/kits/${id}`
      : `http://localhost:3000/api/kits`;

    const method = isEditing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/collection");
  };

  return (
    <form className="kit-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Kit" : "Add New Kit"}</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Kit Name" />
      <input name="club" value={form.club} onChange={handleChange} placeholder="Club" />
      <input name="season" value={form.season} onChange={handleChange} placeholder="Season" />
      <input name="player" value={form.player} onChange={handleChange} placeholder="Player" />
      <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
      <input name="condition" value={form.condition} onChange={handleChange} placeholder="Condition" />
      <input name="value" value={form.value} onChange={handleChange} placeholder="Value" />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" />

      <button type="submit">
        {isEditing ? "Save Changes" : "Add Kit"}
      </button>
    </form>
  );
};

export default KitForm;
