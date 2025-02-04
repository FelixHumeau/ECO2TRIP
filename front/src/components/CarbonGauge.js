import React, { useState } from "react";

const CarbonGauge = ({ carbonFootprint, maxWidthGauge }) => {
  const { activities, housing, transport, transport_max } = carbonFootprint;

  // Calcul des pourcentages de remplissage pour chaque catégorie
  const transportPercentage = (transport / transport_max) * 100;
  const housingPercentage = (housing / 5) * 100; // Score sur 5
  const activitiesPercentage = (activities / 3) * 100; // Score sur 3

  // État pour gérer l'affichage du popup
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={{ textAlign: "center", width: "90%", position: "relative" }}>
      {/* Jauge principale */}
      <div
        style={{
          width: "90%",
          maxWidth: `${maxWidthGauge}px`,
          minWidth: "100px",
          height: "20px",
          backgroundColor: "transparent",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          margin: "auto",
          display: "flex",
          cursor: "pointer", // Pour indiquer que la jauge est interactive
        }}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        {/* Partie Transport */}
        <div
          style={{
            width: "69%",
            height: "100%",
            backgroundColor: "#A8C4A1", // Couleur Transport
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${transportPercentage}%`,
              height: "100%",
              backgroundColor: "#7AA174", // Couleur de remplissage
            }}
          />
        </div>

        {/* Espace entre Transport et Hébergement */}
        <div style={{ width: "2%", backgroundColor: "transparent" }} />

        {/* Partie Hébergement */}
        <div
          style={{
            width: "14%",
            height: "100%",
            backgroundColor: "#A1AEC4", // Couleur Hébergement
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${housingPercentage}%`,
              height: "100%",
              backgroundColor: "#7A8AA1", // Couleur de remplissage
            }}
          />
        </div>

        {/* Espace entre Hébergement et Activités */}
        <div style={{ width: "2%", backgroundColor: "transparent" }} />

        {/* Partie Activités */}
        <div
          style={{
            width: "17%",
            height: "100%",
            backgroundColor: "#C4A1B8", // Couleur Activités
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${activitiesPercentage}%`,
              height: "100%",
              backgroundColor: "#A1748A", // Couleur de remplissage
            }}
          />
        </div>
      </div>

      {/* Indications avec accolades */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: `${maxWidthGauge}px`,
          margin: "auto",
          position: "relative",
          marginTop: "5px",
        }}
      >
        {/* Accolade pour Transport */}
        <div
          style={{
            position: "absolute",
            left: "0%",
            top: "0",
            width: "65%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "10px",
              borderLeft: "2px solid #000",
              borderRight: "2px solid #000",
              borderBottom: "2px solid #000",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          />
          <span style={{ fontSize: "12px", display: "block", marginTop: "5px" }}>Transport: 69%</span>
        </div>

        {/* Accolade pour Hébergement */}
        <div
          style={{
            position: "absolute",
            left: "68%",
            top: "0",
            width: "12%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "10px",
              borderLeft: "2px solid #000",
              borderRight: "2px solid #000",
              borderBottom: "2px solid #000",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          />
          <span style={{ fontSize: "12px", display: "block", marginTop: "5px" }}>Hôtel: 14%</span>
        </div>

        {/* Accolade pour Activités */}
        <div
          style={{
            position: "absolute",
            left: "84%",
            top: "0",
            width: "15%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "10px",
              borderLeft: "2px solid #000",
              borderRight: "2px solid #000",
              borderBottom: "2px solid #000",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          />
          <span style={{ fontSize: "12px", display: "block", marginTop: "5px" }}>Activités: 17%</span>
        </div>
      </div>

      {/* Popup au survol */}
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 10,
            display: "flex",
            gap: "20px",
          }}
        >
          {/* Jauge Transport */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "20px",
                height: "100px",
                backgroundColor: "#e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${transportPercentage}%`,
                  backgroundColor: "#7AA174",
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </div>
            <p style={{ fontSize: "12px", marginTop: "5px" }}>
              Transport: {transport} kg CO₂ / {transport_max} kg CO₂
            </p>
          </div>

          {/* Jauge Hébergement */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "20px",
                height: "100px",
                backgroundColor: "#e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${housingPercentage}%`,
                  backgroundColor: "#7A8AA1",
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </div>
            <p style={{ fontSize: "12px", marginTop: "5px" }}>Hôtel: {housing}/5</p>
          </div>

          {/* Jauge Activités */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "20px",
                height: "100px",
                backgroundColor: "#e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${activitiesPercentage}%`,
                  backgroundColor: "#A1748A",
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </div>
            <p style={{ fontSize: "12px", marginTop: "5px" }}>Activités: {activities}/3</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbonGauge;