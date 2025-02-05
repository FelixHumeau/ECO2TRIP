import React, { useState, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import MapComponent from "./MapComponent";
import CarbonGaugeReducted from "./CarbonGaugeReducted";
import BoxInfo from "./BoxInfo";
import maison from "../assets/logement_logo.png";
import hiking from "../assets/activite_logo.png";
import styles from "../style/ExpandableMapCard.module.css"; // Importation des styles

const ExpandableMapCard = forwardRef(
  ({ city, description, imageSrc, tags = [], carbonFootprint, days, backgroundColor = "#C3E3B6", price }, ref) => {
    const [isMapVisible, setIsMapVisible] = useState(false);
    const navigate = useNavigate();

    const toggleMapVisibility = useCallback(() => {
      setIsMapVisible((prev) => !prev);
    }, []);

    return (
      <div ref={ref} className={styles.cardContainer} style={{ backgroundColor, minHeight: isMapVisible ? "550px" : "200px" }}>
        <div className={styles.header}>
          {/* Image */}
          <img src={imageSrc} alt={city} className={styles.image} />

          {/* Infos ville */}
          <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
              <span className={styles.title}>{city}</span>
              <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
            <p className={styles.description}>{description}</p>
            <CarbonGaugeReducted carbonFootprint={carbonFootprint} days={days} />
          </div>
        </div>

        {/* Prix */}
        <div className={styles.price}>{price}</div>

        {/* Boutons */}
        <div className={styles.buttonContainer}>
          <Button text={isMapVisible ? "Fermer" : "Détail"} onClick={toggleMapVisibility} className={styles.button} />
          <button onClick={() => navigate("/summary")} className={styles.continueButton}>
            En route !
          </button>
        </div>

        {/* Carte */}
        {isMapVisible && (
          <div className={styles.mapContainer}>
            {/* Transports */}
            <div className={styles.transportContainer}>
              <img src={maison} alt="Logement" className={styles.icon} />
              <BoxInfo texts={["Train 1", "XXX C02", "XXX €"]} />
              <BoxInfo texts={["Train 2", "XXX C02", "XXX €"]} />
              <BoxInfo texts={["Voiture", "XXX C02", "XXX €"]} />
            </div>

            {/* Activités */}
            <div className={styles.transportContainer}>
              <img src={hiking} alt="Activités" className={styles.icon} />
              <BoxInfo texts={["Surf", "XXX C02", "XXX €"]} />
              <BoxInfo texts={["Randonnée", "XXX C02", "XXX €"]} />
              <BoxInfo texts={["Beach Volley", "XXX C02", "XXX €"]} />
            </div>

            {/* Carte */}
            <div style={{ flex: 1 }}>
              <MapComponent coordinates={[43.2965, 5.3698]} locationName={city} zoom={5} />
            </div>
          </div>
        )}
      </div>
    );
  }
);

ExpandableMapCard.propTypes = {
  city: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  carbonFootprint: PropTypes.object.isRequired,
  days: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  price: PropTypes.string,
};

export default ExpandableMapCard;
