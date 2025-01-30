import React from "react";

// Dictionnaire des logos en fonction du transport
import busLogo from "../assets/logo_transport/busthermique.svg";
import carLogo from "../assets/logo_transport/voiturethermique.svg";
import trainLogo from "../assets/logo_transport/tgv.svg";
import planeLogo from "../assets/logo_transport/avion.svg";
import bikeLogo from "../assets/logo_transport/velo.svg";
import electricCarLogo from "../assets/logo_transport/voitureelectrique.svg";
import defaultLogo from "../assets/logo_transport/test.png";

const transportLogos = {
  "Bus thermique": busLogo,
  "Voiture thermique": carLogo,
  "Train (TGV)": trainLogo,
  "Vélo": bikeLogo,
  "Voiture électrique": electricCarLogo,
  "Avion": planeLogo,
  "Default": defaultLogo,
};

const TransportBox = ({ transport, distance, carbonImpact }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F0F8F0",
        borderRadius: "10px",
        padding: "7px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        width: "90%",
        minWidth: "550px",
        gap: "15px",
      }}
    >
      {/* Image du transport */}
      <img
        src={transportLogos[transport] || transportLogos["Default"]} // Par défaut, logo bus
        alt={transport}
        style={{ width: "50px", height: "50px", objectFit: "contain" }}
      />

      {/* Informations transport */}
      <div style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
        {/* Type de transport */}
        <h3 style={{ margin: "0", fontSize: "16px", flex: 1 }}>{transport}</h3>

        {/* Distance parcourue */}
        <p style={{ margin: "0", fontSize: "14px", color: "#555", flex: 1, textAlign: "center" }}>
          {distance}
        </p>

        {/* Empreinte carbone */}
        <p style={{ margin: "0", fontSize: "14px", fontWeight: "bold", color: "#555", flex: 1, textAlign: "center" }}>
          {carbonImpact}
        </p>

        {/* Comparaison */}
        <p style={{ margin: "0", fontSize: "14px", fontWeight: "bold", color: "#555", flex: 1, textAlign: "right" }}>
          Insert motivational text
        </p>
      </div>
    </div>
  );
};

export default TransportBox;
