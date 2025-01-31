import React from "react";

const BoxInfo = ({ texts }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 5px",
        backgroundColor: "#d4e9c2", // Couleur de fond douce
        borderRadius: "15px", // Bords arrondis
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Ombre légère
        maxWidth: "600px", // Largeur max
        margin: "20px auto", // Centrage horizontal
      }}
    >
<div
        style={{
          flex: 1,
          textAlign: "left",
          fontSize: "16px",
          fontWeight: "500",
          color: "#333",
          paddingLeft: "10px", // Ajout de padding sur les côtés
        }}
      >
        {texts[0]}
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "500",
          color: "#333",
        }}
      >
        {texts[1]}
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "right",
          fontSize: "16px",
          fontWeight: "500",
          color: "#333",
          paddingRight: "10px", // Ajout de padding sur les côtés
        }}
      >
        {texts[2]}
      </div>
    </div>
  );
};

export default BoxInfo;
