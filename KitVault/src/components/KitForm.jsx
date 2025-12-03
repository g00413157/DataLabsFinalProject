import React, { useState } from "react";

const KitForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    club: initialData.club || "",
    season: initialData.season || "",
    player: initialData.player || "",
    brand: initialData.brand || "",
    condition: initialData.condition || "",
    value: initialData.value || "",
    imageUrl: initialData.imageUrl || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="kit-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Kit" : "Add New Kit"}</h2>

      <input name="name" placeholder="Kit Name" value={form.name} onChange={handleChange} />

      <input name="club" placeholder="Club" value={form.club} onChange={handleChange} />

      <input name="season" placeholder="Season" value={form.season} onChange={handleChange} />

      <input name="player" placeholder="Player Name/Number" value={form.player} onChange={handleChange} />

      <input name="brand" placeholder="Brand (Nike, Adidas...)" value={form.brand} onChange={handleChange} />

      <input name="condition" placeholder="Condition" value={form.condition} onChange={handleChange} />

      <input name="value" placeholder="Estimated Value (€)" value={form.value} onChange={handleChange} />

      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />

      <button type="submit">Save Kit</button>
    </form>
  );
};

export default KitForm;
