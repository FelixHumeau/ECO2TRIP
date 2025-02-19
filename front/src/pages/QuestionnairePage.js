import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InterestTags from "../components/InterestTags";
import SearchForm from "../components/SearchForm";
import TagListBar from "../components/TagListBar";
import { useSearch } from "../context/SearchContext"; // Import du contexte global
import Loader from "../components/Loader"; // Assure-toi d'importer le Loader

const QuestionnairePage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { searchData } = useSearch(); // Récupération des données du contexteconst 
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAmbiance, setSelectedAmbiance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve data from HomePage
  useEffect(() => {
    if (location.state) {
      const { selectedTag } = location.state;

      // If a tag is passed, add it to the selected filters
      if (selectedTag) {
        setSelectedFilters([selectedTag]);
      }
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

  // Function to log selected data
  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/activites/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: searchData.departureCity, tags: selectedFilters, occupancyRate: searchData.travelers }),
      });

      const data = await response.json();
      console.log("✅ Réponse API:", data);

      // Envoi de toute la réponse à la page suivante
      navigate("/trips", { state: { apiResponse: data, ambiance: selectedAmbiance, selectedFilters: selectedFilters, } });

    } catch (error) {
      console.error("❌ Erreur lors de l'appel API:", error);
    }
  };

  // Vérification que tous les champs sont remplis avant d'activer le bouton
  const isFormValid =
    searchData.departureCity &&
    searchData.startDate &&
    searchData.endDate &&
    searchData.travelers.adults > 0 &&
    selectedFilters.length > 0 &&
    selectedAmbiance;

  return (
    <div style={{ fontFamily: "Georgia, sans-serif", background: 'linear-gradient(0deg, rgb(181 239 201), rgb(95 172 205))', height: "100vh", padding: "90px 40px 40px 40px" }}>
      {isLoading ? (
        <Loader /> // Affiche le loader pendant la requête
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Décrivez votre voyage de rêve</h2>
  
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "0px 200px 30px" }}>
            <SearchForm />
          </div>
  
          <div style={{ backgroundColor: "#dcedc8", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
            <h3 style={{ textAlign: "left", marginBottom: "10px", fontSize: "1.2rem" }}>Centres d’intérêts :</h3>
            <InterestTags selectedFilters={selectedFilters} handleFilterClick={handleFilterClick} />
            <TagListBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFilters={selectedFilters} handleRemoveFilter={handleRemoveFilter} />
          </div>
  
          <div style={{ backgroundColor: "#dcedc8", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
            <h3 style={{ textAlign: "left", marginBottom: "10px", fontSize: "1.2rem" }}>Ambiance :</h3>
            <div style={{ display: "flex", justifyContent: "space-between", overflowX: "auto", gap: "10px" }}>
              {["Familiale", "En amoureux", "Entre copains", "Avec les collègues", "En solo"].map((option) => (
                <label key={option} style={{ cursor: "pointer", fontSize: "1.1rem", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "Georgia, sans-serif" }}>
                <input
                  type="radio"
                  name="ambiance"
                  value={option}
                  checked={selectedAmbiance === option}
                  onChange={(e) => setSelectedAmbiance(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                {option}
              </label>
              ))}
            </div>
          </div>
  
          <button onClick={handleContinue} disabled={!isFormValid} style={{
            padding: "15px 30px",
            backgroundColor: isFormValid ? "#4CAF50" : "#A5D6A7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isFormValid ? "pointer" : "not-allowed",
            fontSize: "1.2rem",
          }}>
            Continuer
          </button>
        </div>
      )}
    </div>
  );
  
};

export default QuestionnairePage;