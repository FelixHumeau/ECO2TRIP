import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleFilterClick = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleRemoveFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f1f8e9", height: "100vh", padding: "40px" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Décrivez votre voyage de rêve</h2>

        {/* Champs principaux */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Ville de départ"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
              fontSize: "1rem",
            }}
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
              fontSize: "1rem",
            }}
          />
          <input
            type="number"
            placeholder="Nombre de personnes"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
              fontSize: "1rem",
            }}
          />
          <button
            style={{
              padding: "12px 20px",
              backgroundColor: "#8bc34a",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            🔍
          </button>
        </div>

        {/* Centres d’intérêts */}
        <div style={{ backgroundColor: "#dcedc8", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
          <h3 style={{ textAlign: "left", marginBottom: "10px", fontSize: "1.2rem" }}>Centres d’intérêts :</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
          >
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                onClick={() => handleRemoveFilter(filter)}
                style={{
                  backgroundColor: "#8bc34a",
                  padding: "5px 10px",
                  margin: "2px",
                  borderRadius: "5px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.9rem",
                }}
              >
                {filter}
                <span style={{ marginLeft: "5px", fontSize: "0.8rem" }}>×</span>
              </span>
            ))}
            <input
              type="text"
              placeholder={selectedFilters.length > 0 ? "" : "Recherche"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "5px",
                border: "none",
                outline: "none",
                minWidth: "100px",
                fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["Aventures", "Nature", "Activités aquatiques", "SPA & Bien être"].map((item) => (
              <span
                key={item}
                onClick={() => handleFilterClick(item)}
                style={{
                  backgroundColor: selectedFilters.includes(item) ? "#8bc34a" : "white",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: selectedFilters.includes(item) ? "white" : "black",
                  fontSize: "1rem",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Ambiance */}
        <div style={{ backgroundColor: "#dcedc8", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
  <h3 style={{ textAlign: "left", marginBottom: "10px", fontSize: "1.2rem" }}>Ambiance :</h3>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between", // Répartit les options uniformément
      overflowX: "auto", // Permet le défilement horizontal si nécessaire
      gap: "10px", // Espacement entre les options
    }}
  >
    {["Familiale", "En amoureux", "Entre copains", "Avec les collègues", "En solo"].map((option) => (
      <label
        key={option}
        style={{
          cursor: "pointer",
          fontSize: "1.1rem",
          whiteSpace: "nowrap", // Empêche le texte de passer à la ligne
          flexShrink: 0, // Empêche le rétrécissement des options
        }}
      >
        <input
          type="radio"
          name="ambiance"
          value={option}
          style={{ marginRight: "10px" }}
        />
        {option}
      </label>
    ))}
  </div>
</div>

        {/* Bouton continuer */}
        <button
          onClick={() => navigate("/trips")}
          style={{
            padding: "15px 30px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default QuestionnairePage;