import React, { useState } from "react";
import ImageCard from "./ImageCard";
import PopupModal from "./PopupModal";
import MapComponent from "./MapComponent";

const ActivityBox = ({ image, title, titleLink, description, coordinates, address }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const maxLength = 100; // Nombre max de caractères avant troncature

  // Fonction pour afficher soit la version abrégée soit complète
  const getTruncatedText = () => {
    if (!description) return "";
    if (description.length <= maxLength || isExpanded) return description;
    return description.slice(0, maxLength) + "...";
  };

  return (
    <>
      <ImageCard
        image={image}
        title={title}
        titleLink={titleLink}
        description={
          <>
            {getTruncatedText()}
            {description.length > maxLength && !isExpanded && (
              <span
                onClick={() => setIsExpanded(true)}
                style={{
                  color: "#007BFF",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "5px"
                }}
              >
                (voir plus)
              </span>
            )}
            {isExpanded && (
              <span
                onClick={() => setIsExpanded(false)}
                style={{
                  color: "#007BFF",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "5px"
                }}
              >
                (voir moins)
              </span>
            )}
          </>
        }
        backgroundColor="#D4E9C2"
        extraContent={(
          <>
            <button
              onClick={() => setIsPopupOpen(true)}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Localisation
            </button>
          </>
        )}
      />

      {/* Popup de localisation */}
      <PopupModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title={title}>
        <MapComponent coordinates={coordinates} locationName={title} address={address} />
      </PopupModal>
    </>
  );
};

export default ActivityBox;
