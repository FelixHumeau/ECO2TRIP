import React from "react";

const CarbonGaugeReducted = ({ carbonFootprint, days, maxWidthGauge = 300 }) => {
  const maxCarbon = 150 * days; // Total max basé sur le nombre de jours
  const totalEmissions = carbonFootprint.transport + carbonFootprint.housing + carbonFootprint.activities;

  // Calcul des pourcentages pour chaque catégorie
  const transportPercentage = Math.min((carbonFootprint.transport / maxCarbon) * 100, 100);
  const housingPercentage = Math.min((carbonFootprint.housing / maxCarbon) * 100, 100) + 3;
  const activitiesPercentage = Math.min((carbonFootprint.activities / maxCarbon) * 100, 100) + 3;

  return (
    <div style={{ width: "100%" }}>
      {/* Titre "Empreinte Carbone" */}
      <div style={{ fontWeight: "normal", fontSize: "16px", marginBottom: "10px" }}>
        Empreinte Carbone
      </div>

      <div
        style={{
          width: "100%",               // Utilise toute la largeur disponible
          maxWidth: `${maxWidthGauge}px`, // Limite la largeur maximale
          minWidth: "200px",             // Taille minimale pour la jauge
          height: "20px",                // Hauteur de la jauge
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          display: "flex",               // Flex pour distribuer l'espace horizontalement
        }}
      >
        {/* Transport */}
        <div
          style={{
            width: `${transportPercentage}%`,
            height: "100%",
            backgroundColor: "#A8C4A1", //  Couleur Transport
            transition: "width 0.5s ease-in-out",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            zIndex: 3,
          }}
        />
        {/* Hébergement */}
        <div
          style={{
            width: `${housingPercentage}%`,
            height: "100%",
            backgroundColor: "#A1AEC4", //  Couleur Hébergement
            transition: "width 0.5s ease-in-out",
            marginLeft: "-3%",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            zIndex: 2,
          }}
        />
        {/* Activités */}
        <div
          style={{
            width: `${activitiesPercentage}%`,
            height: "100%",
            backgroundColor: "#C4A1B8", //  Couleur Activités
            transition: "width 0.5s ease-in-out",
            marginLeft: "-3%",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            zIndex: 1,
          }}
        />
      </div>

      
    </div>
  );
};


export default CarbonGaugeReducted;
