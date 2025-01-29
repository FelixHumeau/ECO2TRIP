import React from "react";

const PopupModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f0f8f0",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "800px",
          height: "80vh",
          maxHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px", // 🔹 Agrandir légèrement pour un meilleur centrage
            height: "40px",
            display: "flex", // 🔹 Active Flexbox
            justifyContent: "center", // 🔹 Centre horizontalement
            alignItems: "center", // 🔹 Centre verticalement
            fontSize: "20px", // 🔹 Taille de la croix
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Titre de la popup */}
        {title && <h2 style={{ textAlign: "center" }}>{title}</h2>}

        {/* Contenu dynamique */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
