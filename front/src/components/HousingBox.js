import React from "react";
import ImageCard from "./ImageCard";
import styles from "../style/HousingBox.module.css";

const HousingBox = ({ image, title, titleLink, pricePerNight, rating }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`${styles.star} ${i < rating ? "" : styles.empty}`}
      >
        ★
      </span>
    ));
  };

  return (
    <ImageCard
      image={image}
      title={title}
      titleLink={titleLink}
      description={`Prix/nuit : ${pricePerNight}€`}
      backgroundColor="#D4E9C2"
      extraContent={<div className={styles.stars}>{renderStars(rating)}</div>}
    />
  );
};

export default HousingBox;
