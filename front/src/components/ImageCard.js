import React from "react";
import styles from "../style/ImageCard.module.css";

const ImageCard = ({ image, title, titleLink, description, extraContent, backgroundColor = "#C3E3B6" }) => {
  console.log(titleLink);
  
  return (
    <div className={styles.imageCard} style={{ "--card-bg-color": backgroundColor }}>
      {/* Image */}
      <img src={image} alt={title} />

      {/* Contenu texte */}
      <div className={styles.textContainer}>
        <h2>
          <a href={titleLink}>{title}</a>
        </h2>
        <p>{description}</p>

        {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
      </div>
    </div>
  );
};

export default ImageCard;
