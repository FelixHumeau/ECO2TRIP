import React from "react";

const ImageCard = ({ image, title, titleLink, description, extraContent, backgroundColor = "#C3E3B6" }) => {
  console.log(titleLink)
    return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start", // ✅ Alignement du texte à gauche
        backgroundColor: backgroundColor,
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "400px",
        minHeight: "120px",
        gap: "10px",
      }}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        style={{
          width: "190px",
          height: "160px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
      
      {/* Contenu texte */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
        <h2 style={{ margin: "0 0 5px 0", marginBottom: "10px"  }}>
          <a href={titleLink} style={{ textDecoration: "none", color: "black"}}>
            {title}
          </a>
        </h2>
        <p style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#555" }}>{description}</p>

        {/* ✅ Ajout du contenu supplémentaire */}
        {extraContent && <div style={{ marginTop: "10px" }}>{extraContent}</div>}
      </div>
    </div>
  );
};

export default ImageCard;
