import React, { useState, forwardRef } from "react";
import Button from "./Button";
import MapComponent from "./MapComponent";
import CarbonGaugeReducted from "./CarbonGaugeReducted";
import BoxInfo from "./BoxInfo";
import maison from "../assets/logement_logo.png";
import hiking from "../assets/activite_logo.png";
import { useNavigate } from "react-router-dom";



const ExpandableMapCard = forwardRef(

  ({ city, description, imageSrc, tags = [], carbonFootprint, days, backgroundColor = "#C3E3B6", price }, ref) => {
    const [isMapVisible, setIsMapVisible] = useState(false);
    const toggleMapVisibility = () => {
      setIsMapVisible(!isMapVisible);
    };
    const navigate = useNavigate();

    const [isNewButtonVisible, setIsNewButtonVisible] = useState(false);
    const showNewButton = () => {
      setIsNewButtonVisible(true);
    };

    return (
      <div
        ref={ref}
        style={{
          width: "90%",
          minHeight: isMapVisible ? "550px" : "200px", // Augmenter la hauteur pour éviter le chevauchement
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "15px",
          paddingBottom: isMapVisible ? "30px" : "0px", // Ajouter un espace pour les boutons
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: backgroundColor,
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          position: "relative",
          margin: "10px auto",
          alignItems: "flex-start",
          transition: "min-height 0.3s ease-in-out",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", width: "100%", marginTop: "10px" }}>
          {/* Image */}
          <img
            src={imageSrc}
            alt={city}
            style={{
              width: "200px",
              height: "160px",
              borderRadius: "10px",
              objectFit: "cover",
              marginRight: "20px",
            }}
          />
          {/* Ville + Tags + Description + Carbon Gauge */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "22px", fontWeight: "bold" }}>{city}</span>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#e0e0e0",
                      padding: "6px 12px",
                      borderRadius: "15px",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <p style={{ fontSize: "14px", color: "#333", marginTop: "5px", maxWidth: "50%", wordWrap: "break-word" }}>
                {description}
              </p>
              <div style={{ gap: "10px", marginTop: "0px", display: "flex", alignItems: "flex-start" }}>
                <CarbonGaugeReducted carbonFootprint={carbonFootprint} days={days} style={{ marginLeft: "-20px", flex: 1 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Prix en haut à droite */}
        <div style={{
          position: "absolute",
          top: "25px",
          right: "15px", 
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
        }}>
          {price}
        </div>

        {/* Boutons en bas */}
        <div style={{ position: "absolute", bottom: "15px", right: "15px", display: "flex", gap: "10px" }}>
          <Button
            text={isMapVisible ? "Fermer" : "Détail"}
            onClick={() => {
              toggleMapVisibility();
              showNewButton();
            }}
            style={{
              fontSize: "16px",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              color: "#333",
              textDecoration: "underline",
            }}
          />

          <Button 
            text="Choisir ce voyage"
            onClick={() => navigate("/summary")}
            style={{
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "16px",
              backgroundColor: "#56B46C"
            }}
          />
        </div>

        {/* Carte visible quand isMapVisible est activé */}
        {isMapVisible && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
              width: "100%",
              maxHeight: "300px",
              overflow: "hidden",
            }}
          >
            {/* Texte + Image à gauche */}
            <div style={{ flex: 1, paddingRight: "10px", textAlign: "center" }}>
              <img 
                src={maison}
                alt="Icone gauche" 
                style={{ width: "70px", height: "70px", marginBottom: "10px" }} 
              />
              <div>
                <BoxInfo texts={["Train 1", "XXX C02", "XXX €"]} />
                <BoxInfo texts={["Train 2", "XXX C02", "XXX €"]} />
                <BoxInfo texts={["Voiture", "XXX C02", "XXX €"]} />
              </div>
            </div>

            {/* Texte + Image au centre */}
            <div style={{ flex: 1, textAlign: "center" }}>
              <img 
                src={hiking}
                alt="Icone centre" 
                style={{ width: "70px", height: "70px", marginBottom: "10px" }} 
              />
              <div>
                <BoxInfo texts={["Surf", "XXX C02", "XXX €"]} />
                <BoxInfo texts={["Randonnée", "XXX C02", "XXX €"]} />
                <BoxInfo texts={["Beach Volley", "XXX C02", "XXX €"]} />
              </div>            </div>
            <div style={{ flex: 1, paddingLeft: "10px" }}>
              <MapComponent
                coordinates={[43.2965, 5.3698]}
                locationName={city}
                zoom={5}

                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ExpandableMapCard;
