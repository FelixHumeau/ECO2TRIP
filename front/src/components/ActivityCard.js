import React, { forwardRef } from "react";
import BasicCard from "./BasicCard";
import ActivityBox from "./ActivityBox";

const ActivityCard = forwardRef(({ activities, activityImage }, ref) => {
  return (
    <BasicCard ref={ref} title="Activité">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {activities.map((activity, index) => (
          <div key={index} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <ActivityBox
              key={index}
              image={activityImage}
              title={activity.nom}
              description={activity.description || "Aucune description disponible"}
              coordinates={[activity.coordonnees.latitude, activity.coordonnees.longitude]}
              address={activity.adresse}
            />
          </div>
        ))}
      </div>
    </BasicCard>
  );
});

export default ActivityCard;
