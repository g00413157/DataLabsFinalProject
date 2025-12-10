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

  const [imageFile, setImageFile] = useState(null);
  const [imageMode, setImageMode] = useState("upload");

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:3000/api/kits/${id}`)
        .then(res => res.json())
        .then(data => {
          setForm(data);
          if (data.imageUrl?.startsWith("http")) {
            setImageMode("url");
          }
        });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key !== "imageUrl") {
        formData.append(key, value);
      }
    });

    if (imageMode === "upload" && imageFile) {
      formData.append("image", imageFile);
    }

    if (imageMode === "url") {
      formData.append("imageUrl", form.imageUrl);
    }

    const url = isEditing
      ? `http://localhost:3000/api/kits/${id}`
      : `http://localhost:3000/api/kits`;

    const method = isEditing ? "PUT" : "POST";

    await fetch(url, { method, body: formData });

    navigate("/collection");
  };

  return (
    <div className="add-kit-page">
      <form className="kit-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit Kit" : "Add New Kit"}</h2>

        <div className="kit-form-grid">
          <div className="form-group">
            <label>Kit Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Club</label>
            <input name="club" value={form.club} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Season</label>
            <input name="season" value={form.season} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Player</label>
            <input name="player" value={form.player} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Brand</label>
            <input name="brand" value={form.brand} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Condition</label>
            <input name="condition" value={form.condition} onChange={handleChange} />
          </div>

          <div className="form-group value">
            <label>Value (€)</label>
            <input
              type="number"
              name="value"
              value={form.value}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="image-section">
          <h4>Kit Image</h4>

          <div className="image-toggle">
            <button
              type="button"
              className={imageMode === "upload" ? "active" : ""}
              onClick={() => setImageMode("upload")}
            >
              Upload Image
            </button>
            <button
              type="button"
              className={imageMode === "url" ? "active" : ""}
              onClick={() => setImageMode("url")}
            >
              Image URL
            </button>
          </div>

          {imageMode === "upload" && (
            <>
              <label className="file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                <span className="file-btn">Choose Image</span>
                <span className="file-name">
                  {imageFile ? imageFile.name : "No file chosen"}
                </span>
              </label>

              {imageFile && (
                <img src={URL.createObjectURL(imageFile)} alt="Preview" />
              )}
            </>
          )}

          {imageMode === "url" && (
            <>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" />
              )}
            </>
          )}
        </div>

        <button type="submit">
          {isEditing ? "Save Changes" : "Add Kit"}
        </button>
      </form>
    </div>
  );
};

export default KitForm;
