import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TagListBar from "../components/TagListBar";
import InterestTags from "../components/InterestTags";

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, rooms: 1 });

  // Récupérer les données passées depuis la HomePage
  useEffect(() => {
    if (location.state) {
      const { selectedTag, departureCity, startDate, travelers } = location.state;

      // Si un tag est passé, l'ajouter aux filtres sélectionnés
      if (selectedTag) {
        setSelectedFilters([selectedTag]);
      }

      // Si les données du formulaire sont passées, les utiliser
      if (departureCity) setDepartureCity(departureCity);
      if (startDate) {
        const formattedDate = new Date(startDate).toISOString().split("T")[0];
        setDepartureDate(formattedDate);
      }
      if (travelers) setTravelers(travelers);
    }
  }, [location.state]);

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
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
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
            value={travelers.adults + travelers.children}
            onChange={(e) => setTravelers({ ...travelers, adults: parseInt(e.target.value) || 0 })}
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

          {/* Recherche et sélection des tags */}
          <InterestTags selectedFilters={selectedFilters} handleFilterClick={handleFilterClick} />

          {/* Barre principale sous la recherche */}
          <TagListBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            selectedFilters={selectedFilters} 
            handleRemoveFilter={handleRemoveFilter} 
          />
        </div>

        {/* Ambiance */}
        <div style={{ backgroundColor: "#dcedc8", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
          <h3 style={{ textAlign: "left", marginBottom: "10px", fontSize: "1.2rem" }}>Ambiance :</h3>
          <div style={{ display: "flex", justifyContent: "space-between", overflowX: "auto", gap: "10px" }}>
            {["Familiale", "En amoureux", "Entre copains", "Avec les collègues", "En solo"].map((option) => (
              <label key={option} style={{ cursor: "pointer", fontSize: "1.1rem", whiteSpace: "nowrap", flexShrink: 0 }}>
                <input type="radio" name="ambiance" value={option} style={{ marginRight: "10px" }} />
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