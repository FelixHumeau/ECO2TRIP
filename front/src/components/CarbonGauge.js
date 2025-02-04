import React, { useState } from "react";

const CarbonGauge = ({ carbonFootprint, maxWidthGauge }) => {
  const { activities, housing, transport, transport_max } = carbonFootprint;

  // Calcul des pourcentages dynamiques
  const transportPercentage = (transport / transport_max) * 100;
  const housingPercentage = ((5 - housing) / 5) * 100; // Inversion du score
  const activitiesPercentage = (activities / 3) * 100;

  // Pourcentages fixes demandés
  const fixedPercentages = {
    transport: 69,
    housing: 14,
    activities: 17,
  };

  // État pour gérer l'affichage du popup et la jauge animée au hover
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const handleMouseEnter = (segment, percentage) => {
    setHoveredSegment(segment);
    setAnimatedPercentage(0);

    // Animation progressive du remplissage vertical
    const interval = setInterval(() => {
      setAnimatedPercentage((prev) => (prev < percentage ? prev + 5 : percentage));
    }, 20);

    setTimeout(() => clearInterval(interval), 400);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
    setAnimatedPercentage(0);
  };

  const getPopupContent = () => {
    switch (hoveredSegment) {
      case "transport":
        return {
          label: `Transport (${fixedPercentages.transport}%)`,
          value: `${transport} kg CO₂ / ${transport_max} kg CO₂`,
          color: "#7AA174",
          percentage: transportPercentage,
        };
      case "housing":
        return {
          label: `Hôtel (${fixedPercentages.housing}%)`,
          value: `${housing} / 5`,
          color: "#7A8AA1",
          percentage: housingPercentage,
        };
      case "activities":
        return {
          label: `Activités (${fixedPercentages.activities}%)`,
          value: `${activities} / 3`,
          color: "#A1748A",
          percentage: activitiesPercentage,
        };
      default:
        return null;
    }
  };

  const popupContent = getPopupContent();

  return (
    <div style={{ textAlign: "center", width: "90%", position: "relative" }}>
      {/* Jauge principale */}
      <div
        style={{
          width: "90%",
          maxWidth: `${maxWidthGauge}px`,
          minWidth: "100px",
          height: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          margin: "auto",
          display: "flex",
          cursor: "pointer",
        }}
      >
        {/* Transport */}
        <div
          style={{ flex: 69, backgroundColor: "#A8C4A1", position: "relative" }}
          onMouseEnter={() => handleMouseEnter("transport", transportPercentage)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              width: `${transportPercentage}%`,
              height: "100%",
              backgroundColor: "#7AA174",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#333",
              backgroundColor: "#A8C4A1",
              padding: "2px 5px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
            }}
          >
            Transport ({fixedPercentages.transport}%)
          </span>
        </div>

        <div style={{ flex: 2 }} />

        {/* Hébergement */}
        <div
          style={{ flex: 14, backgroundColor: "#A1AEC4", position: "relative" }}
          onMouseEnter={() => handleMouseEnter("housing", housingPercentage)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              width: `${housingPercentage}%`,
              height: "100%",
              backgroundColor: "#7A8AA1",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#333",
              backgroundColor: "#A1AEC4",
              padding: "2px 5px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
            }}
          >
            Hôtel ({fixedPercentages.housing}%)
          </span>
        </div>

        <div style={{ flex: 2 }} />

        {/* Activités */}
        <div
          style={{ flex: 17, backgroundColor: "#C4A1B8", position: "relative" }}
          onMouseEnter={() => handleMouseEnter("activities", activitiesPercentage)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              width: `${activitiesPercentage}%`,
              height: "100%",
              backgroundColor: "#A1748A",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#333",
              backgroundColor: "#C4A1B8",
              padding: "2px 5px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
            }}
          >
            Activités ({fixedPercentages.activities}%)
          </span>
        </div>
      </div>

      {/* Popup au survol avec jauge animée */}
      {hoveredSegment && popupContent && (
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 8px 18px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(10px)",
            zIndex: 20,
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            {popupContent.label}
          </div>

          {/* Jauge verticale animée */}
          <div
            style={{
              width: "30px",
              height: "120px",
              backgroundColor: "#e0e0e0",
              borderRadius: "15px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${animatedPercentage}%`,
                backgroundColor: popupContent.color,
                transition: "height 0.4s ease-in-out",
              }}
            />
          </div>

          <p style={{ fontSize: "12px", color: "#555", margin: "5px 0" }}>
            {popupContent.value}
          </p>
        </div>
      )}
    </div>
  );
};

export default CarbonGauge;