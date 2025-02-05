import React, { useState } from "react";
import PropTypes from "prop-types";
import pieceOfMap from "../assets/piece_of_map.png";
import PopupModal from "./PopupModal";
import MapComponent from "./MapComponent";
import CarbonGauge from "./CarbonGauge";
import styles from "../style/CityCard.module.css";

// 🔹 Composant pour la localisation
const CityLocation = ({ cityName, coordinates, setIsPopupOpen }) => (
  <div className={styles.citySection}>
    <h2>Localisation de la ville</h2>
    <div className={styles.imageContainer}>
      <img src={pieceOfMap} alt={`Localisation de ${cityName}`} className={styles.mapImage} />
      <button onClick={() => setIsPopupOpen(true)} className={styles.locationButton}>
        Localisation
      </button>
    </div>
  </div>
);

CityLocation.propTypes = {
  cityName: PropTypes.string.isRequired,
  coordinates: PropTypes.array.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
};

// 🔹 Composant pour l'affichage des étoiles (avis)
const CityRating = ({ rating }) => (
  <div className={styles.citySection}>
    <h2>Avis</h2>
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  </div>
);

CityRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

// 🔹 Composant pour l'affichage des tags (points forts)
const CityTags = ({ tags }) => (
  <div className={styles.citySection}>
    <h2>Points forts</h2>
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>{tag}</span>
      ))}
    </div>
  </div>
);

CityTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// 🔹 Composant pour l'affichage de l'empreinte carbone
const CityCarbonFootprint = ({ carbonFootprint }) => (
  <div className={styles.citySection}>
    <h2>Empreinte carbone</h2>
    <CarbonGauge carbonFootprint={carbonFootprint} maxWidthGauge={500} />
  </div>
);

CityCarbonFootprint.propTypes = {
  carbonFootprint: PropTypes.object.isRequired,
};

// 🔹 Composant principal `CityCard`
const CityCard = ({ cityName, rating, tags, carbonFootprint, coordinates }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.cityCard}>
      <h1 className={styles.cityTitle}>{cityName}</h1>

      {/* Conteneur des blocs alignés horizontalement */}
      <div className={styles.cityDetails}>
        <CityLocation cityName={cityName} coordinates={coordinates} setIsPopupOpen={setIsPopupOpen} />
        <CityRating rating={rating} />
        <CityTags tags={tags} />
        <CityCarbonFootprint carbonFootprint={carbonFootprint} />
      </div>

      {/* Popup de localisation avec la carte */}
      <PopupModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title="Localisation">
        <MapComponent coordinates={coordinates} locationName={cityName} />
      </PopupModal>
    </div>
  );
};

CityCard.propTypes = {
  cityName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  carbonFootprint: PropTypes.shape({
    transport: PropTypes.number,
    housing: PropTypes.number,
    activities: PropTypes.number,
  }).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

CityCard.defaultProps = {
  tags: [],
};

export default CityCard;
