import React, { forwardRef } from "react";
import BasicCard from "./BasicCard";
import TransportBox from "./TransportBox";

const TransportCard = forwardRef(({ travelData }, ref) => {
  return (
    <BasicCard ref={ref} title="Transport">
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(550px, 1fr))",
        gap: "15px", // Espacement entre les lignes et colonnes
        alignItems: "stretch" , // Centre les éléments verticalement
        maxWidth: "100%",
      }}>
        {travelData.results.map((data, index) => (
          <TransportBox
            key={index}
            transport={data.transport}
            distance={data.distance}
            carbonImpact={data.carbonImpact}
          />
        ))}
      </div>
    </BasicCard>
  );
});

export default TransportCard;
