import React, { forwardRef } from "react";
import BasicCard from "./BasicCard";
import HousingBox from "./HousingBox";

const HousingCard = forwardRef(({ housings }, ref) => {
  return (
    <BasicCard ref={ref} title="Hébergement">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {housings.map((house, index) => (
          <div key={index} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <HousingBox
              key={index}
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
