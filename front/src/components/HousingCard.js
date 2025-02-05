import React, { forwardRef } from "react";
import BasicCard from "./BasicCard";
import HousingBox from "./HousingBox";
import styles from "../style/HousingCard.module.css";

const HousingCard = forwardRef(({ housings }, ref) => {
  return (
    <BasicCard ref={ref} title="Hébergement">
      <div className={styles.housingGrid}>
        {housings.map((house, index) => (
          <div key={index} className={styles.housingItem}>
            <HousingBox
              image={house.image_url}
              title={house.name}
              titleLink={house.link}
              pricePerNight={house.price}
              rating={parseInt(house.eco_score)}
            />
          </div>
        ))}
      </div>
    </BasicCard>
  );
});

export default HousingCard;
