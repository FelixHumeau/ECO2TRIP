import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import BasicCard from "./BasicCard";
import ActivityBox from "./ActivityBox";
import styles from "../style/ActivityCard.module.css";

const ActivityCard = forwardRef(({ activities, activityImage }, ref) => {
  return (
    <BasicCard ref={ref} title="Activités">
      <div className={styles.activityGrid}>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className={styles.activityItem}>
              <ActivityBox
                image={activityImage}
                title={activity.nom}
                description={activity.description || "Aucune description disponible"}
                coordinates={[
                  activity.coordonnees?.latitude || 0, // Gestion des valeurs nulles
                  activity.coordonnees?.longitude || 0,
                ]}
                address={activity.adresse || "Adresse non renseignée"}
              />
            </div>
          ))
        ) : (
          <p className={styles.noActivity}>Aucune activité disponible</p>
        )}
      </div>
    </BasicCard>
  );
});

ActivityCard.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      description: PropTypes.string,
      coordonnees: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
      adresse: PropTypes.string,
    })
  ),
  activityImage: PropTypes.string.isRequired,
};

ActivityCard.defaultProps = {
  activities: [],
};

export default React.memo(ActivityCard);
