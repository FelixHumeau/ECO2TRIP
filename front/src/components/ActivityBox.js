import React, { useState, useCallback } from "react";
import ImageCard from "./ImageCard";
import PopupModal from "./PopupModal";
import MapComponent from "./MapComponent";
import styles from "../style/ActivityBox.module.css";

const ActivityBox = ({ image, title, titleLink, description, coordinates, address }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = useCallback(() => {
    setIsPopupOpen((prev) => !prev);
  }, []);

  return (
    <>
      <ImageCard
        image={image}
        title={title}
        titleLink={titleLink}
        description={<p>{description}</p>}
        backgroundColor="#D4E9C2"
        extraContent={
          <button 
            onClick={togglePopup} 
            className={styles.locationButton} 
            aria-label={`Voir la localisation de ${title}`}
          >
            Localisation
          </button>
        }
      />

      {/* Popup de localisation */}
      {isPopupOpen && (
        <PopupModal isOpen={isPopupOpen} onClose={togglePopup} title={title}>
          <MapComponent coordinates={coordinates} locationName={title} address={address} />
        </PopupModal>
      )}
    </>
  );
};

export default ActivityBox;
