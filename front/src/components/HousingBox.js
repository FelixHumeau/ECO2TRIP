import React from "react";
import ImageCard from "./ImageCard";

const HousingBox = ({ image, title, titleLink, pricePerNight, rating }) => {
  // Fonction pour afficher les étoiles
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#FFD700" : "#CCC", fontSize: "20px" }}>★</span>
    ));
  };

  return (
    <ImageCard
      image={image}
      title={title}
      titleLink = {titleLink}
      description={`Prix/nuit : ${pricePerNight}€`}
      backgroundColor="#D4E9C2"
      extraContent={<div>{renderStars(rating)}</div>}
    />
  );
};

export default HousingBox;
