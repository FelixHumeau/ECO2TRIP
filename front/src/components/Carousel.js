import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../style/Carousel.module.css";

// 🔹 Composant Flèche
const ArrowButton = ({ direction, onClick }) => (
  <button
    className={`${styles.arrow} ${direction === "left" ? styles.left : styles.right}`}
    onClick={onClick}
  >
    {direction === "left" ? "❮" : "❯"}
  </button>
);

ArrowButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
};

// 🔹 Composant Miniature
const Thumbnail = ({ image, isActive, onClick }) => (
  <img
    src={image}
    alt="Miniature"
    className={`${styles.thumbnail} ${isActive ? styles.activeThumbnail : ""}`}
    onClick={onClick}
    onError={(e) => (e.target.src = "/placeholder.jpg")} // Image fallback si erreur
  />
);

Thumbnail.propTypes = {
  image: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// 🔹 Composant Principal
const Carousel = ({ images, height, width, autoScroll }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % totalImages);
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));

  // 🔄 Défilement automatique
  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [autoScroll, currentIndex]);

  return (
    <div className={styles.carousel} style={{ width }}>
      {/* Image principale */}
      <div className={styles.imageContainer} style={{ height }}>
        <img src={images[currentIndex]} alt="Affichage" className={styles.image} />
        <ArrowButton direction="left" onClick={goToPrevious} />
        <ArrowButton direction="right" onClick={goToNext} />
      </div>

      {/* Miniatures */}
      <div className={styles.thumbnailsContainer}>
        {images.map((image, index) => (
          <Thumbnail key={index} image={image} isActive={currentIndex === index} onClick={() => setCurrentIndex(index)} />
        ))}
      </div>
    </div>
  );
};

// 🔍 Ajout de PropTypes pour valider les types des props
Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  autoScroll: PropTypes.bool,
};

// 🏗️ Valeurs par défaut
Carousel.defaultProps = {
  height: "700px",
  width: "90%",
  autoScroll: true,
};

export default Carousel;
