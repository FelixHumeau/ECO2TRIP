import React, { useState } from "react";
import pieceOfMap from "../assets/piece_of_map.png";
import PopupModal from "./PopupModal";
import MapComponent from "./MapComponent";

const CityCard = ({ cityName, rating, tags, carbonFootprint, coordinates }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fonction pour afficher les étoiles
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= rating ? "#2C7332" : "#CCC",
            fontSize: "20px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      style={{
        width: "90%",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#C3E3B6",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        position: "relative",
        marginTop: "30px",
        marginBottom: "30px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h1 style={{ position: "absolute", top: "10px", left: "15px", margin: 0 }}>
        {cityName}
      </h1>

      {/* Conteneur des blocs alignés horizontalement */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: "30px",
          gap: "5px",
        }}
      >
        {/* Bloc 1 : Localisation */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2 style={{ marginBottom: "0px", minHeight: "40px" }}>Localisation de la ville</h2>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={pieceOfMap}
              alt="Localisation de la ville"
              style={{
                width: "150px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={() => setIsPopupOpen(true)}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "5px 10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontSize: "12px",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              Localisation
            </button>
          </div>
        </div>

        {/* Bloc 2 : Avis */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2 style={{ marginBottom: "10px", minHeight: "40px" }}>Avis</h2>
          <div>{renderStars(rating)}</div>
        </div>

        {/* Bloc 3 : Points forts */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2 style={{ marginBottom: "10px", minHeight: "40px" }}>Points forts</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#FEFEFE",
                  border: "1px transparent",
                  borderRadius: "5px",
                  fontSize: "12px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bloc 4 : Empreinte carbone */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2 style={{ marginBottom: "10px", minHeight: "40px" }}>Empreinte carbone</h2>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#FF5722" }}>
            {carbonFootprint} kg/CO2
          </div>
        </div>

      </div>

      {/* Popup de localisation avec la carte */}
      <PopupModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title="Localisation">
        <MapComponent coordinates={coordinates} locationName={cityName} />
      </PopupModal>
    </div>
  );
};

export default CityCard;

