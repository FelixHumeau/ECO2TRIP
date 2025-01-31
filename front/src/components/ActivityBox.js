import React, { useState } from "react";
import ImageCard from "./ImageCard";
import PopupModal from "./PopupModal";
import MapComponent from "./MapComponent";

const ActivityBox = ({ image, title, titleLink, description, coordinates, address }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <ImageCard
        image={image}
        title={title}
        titleLink = {titleLink}
        description={
            <>
              {/*Prix : {price}€ <br />*/}
              {description}
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
        <MapComponent coordinates={coordinates} locationName={title} address={address}/>
      </PopupModal>
    </>
  );
};

export default ActivityBox;
