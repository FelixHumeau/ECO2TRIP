import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InterestTags from "../components/InterestTags";
import SearchForm from "../components/SearchForm";
import TagListBar from "../components/TagListBar";
import { useSearch } from "../context/SearchContext"; // Import SearchContext

const QuestionnairePage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { searchData } = useSearch(); // Get departure city from context
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ambiance, setAmbiance] = useState("");

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
    try {
        const response = await fetch("http://localhost:5000/api/activites/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({from: searchData.departureCity, tags: selectedFilters, occupancyRate: searchData.travelers}),
        });

        const data = await response.json();
        console.log("✅ Réponse API:", data);

        // Envoi de toute la réponse à la page suivante
        navigate("/trips", { state: { apiResponse: data } });

    } catch (error) {
        console.error("❌ Erreur lors de l'appel API:", error);
    }
};


  return (
    <div style={{ fontFamily: "Georgia, sans-serif", background: 'linear-gradient(0deg, rgb(181 239 201), rgb(95 172 205))', height: "100vh", padding: "90px 40px 40px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Décrivez votre voyage de rêve</h2>

        {/* Main Fields */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "0px 200px 30px" }}>
          < SearchForm />
        </div>

        {/* Interest Tags */}
        <div style={{ backgroundColor: "#dcedc8", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
          <h3 style={{ textAlign: "left", marginBottom: "10px", fontSize: "1.2rem" }}>Centres d’intérêts :</h3>

          {/* Search and Tag Selection */}
          <InterestTags selectedFilters={selectedFilters} handleFilterClick={handleFilterClick} />

          {/* Tag List Bar */}
          <TagListBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilters={selectedFilters}
            handleRemoveFilter={handleRemoveFilter}
          />
        </div>

        {/* Atmosphere */}
        <div style={{ backgroundColor: "#dcedc8", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
          <h3 style={{ textAlign: "left", marginBottom: "10px", fontSize: "1.2rem", fontFamily: "Georgia, sans-serif" }}>Ambiance :</h3>
          <div style={{ display: "flex", justifyContent: "space-between", overflowX: "auto", gap: "10px" }}>
            {["Familiale", "En amoureux", "Entre copains", "Avec les collègues", "En solo"].map((option) => (
              <label
                key={option}
                style={{
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  fontFamily: "Georgia, sans-serif"
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

        {/* Continue Button */}
        <button
          onClick={handleContinue} // Log data on button click
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