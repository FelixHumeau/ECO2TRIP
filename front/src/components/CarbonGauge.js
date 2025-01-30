import React from "react";

const CarbonGauge = ({ carbonFootprint, days, maxWidthGauge }) => {
  const maxCarbon = 150 * days; // Total max basé sur le nombre de jours
  const totalEmissions = carbonFootprint.transport + carbonFootprint.housing + carbonFootprint.activities;

  // Calcul des pourcentages pour chaque catégorie
  const transportPercentage = Math.min((carbonFootprint.transport / maxCarbon) * 100, 100);
  const housingPercentage = Math.min((carbonFootprint.housing / maxCarbon) * 100, 100)+3;
  const activitiesPercentage = Math.min((carbonFootprint.activities / maxCarbon) * 100, 100)+3;

  return (
    <div style={{ textAlign: "center", width: "90%" }}>
      <div style={{
        width: "90%", 
        maxWidth: `${maxWidthGauge}px`,
        minWidth: "100px",
        height: "20px",
        backgroundColor: "#e0e0e0",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        margin: "auto",
        display: "flex"
      }}>
        {/* Transport */}
        <div style={{
          width: `${transportPercentage}%`,
          height: "100%",
          backgroundColor: "#A8C4A1", //  Couleur Transport
          transition: "width 0.5s ease-in-out",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          zIndex: 3,
        }} />
        {/* Hébergement */}
        <div style={{
          width: `${housingPercentage}%`,
          height: "100%",
          backgroundColor: "#A1AEC4", //  Couleur Hébergement
          transition: "width 0.5s ease-in-out",
          marginLeft: "-3%",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          zIndex: 2
        }} />
        {/* Activités */}
        <div style={{
          width: `${activitiesPercentage}%`,
          height: "100%",
          backgroundColor: "#C4A1B8", //  Couleur Activités
          transition: "width 0.5s ease-in-out",
          marginLeft: "-3%",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          zIndex: 1
        }} />
      </div>

      {/* Légende des émissions */}
      <p style={{ fontSize: "14px", fontWeight: "bold", marginTop: "5px" }}>
        {totalEmissions} kg CO₂ / {maxCarbon} kg CO₂
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "5px" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "12px", height: "12px", backgroundColor: "#A8C4A1", marginRight: "5px", borderRadius: "3px" }}></div>
          Transport
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "12px", height: "12px", backgroundColor: "#A1AEC4", marginRight: "5px", borderRadius: "3px" }}></div>
          Hébergement
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "12px", height: "12px", backgroundColor: "#C4A1B8", marginRight: "5px", borderRadius: "3px" }}></div>
          Activités
        </span>
      </div>
    </div>
  );
};

export default CarbonGauge;
