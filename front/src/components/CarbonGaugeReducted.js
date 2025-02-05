import React from "react";
import PropTypes from "prop-types";
import styles from "../style/CarbonGaugeReducted.module.css";

const GaugeSegment = ({ percentage, color, zIndex }) => (
  <div
    className={styles.gaugeSegment}
    style={{
      width: `${percentage}%`,
      backgroundColor: color,
      zIndex,
    }}
  />
);

GaugeSegment.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired,
};

const CarbonGaugeReducted = ({ carbonFootprint, days, maxWidthGauge }) => {
  const maxCarbon = 150 * days; // Total max basé sur le nombre de jours
  const totalEmissions = carbonFootprint.transport + carbonFootprint.housing + carbonFootprint.activities;

  const transportPercentage = Math.min((carbonFootprint.transport / maxCarbon) * 100, 100);
  const housingPercentage = Math.min((carbonFootprint.housing / maxCarbon) * 100, 100) + 3;
  const activitiesPercentage = Math.min((carbonFootprint.activities / maxCarbon) * 100, 100) + 3;

  return (
    <div className={styles.container}>
      {/* Titre et valeur totale */}
      <div className={styles.title}>
        Empreinte Carbone <span className={styles.total}>({totalEmissions.toFixed(1)} kg CO₂)</span>
      </div>

      {/* Jauge principale */}
      <div className={styles.gauge} style={{ maxWidth: `${maxWidthGauge}px` }}>
        <GaugeSegment percentage={transportPercentage} color="#A8C4A1" zIndex={3} />
        <GaugeSegment percentage={housingPercentage} color="#A1AEC4" zIndex={2} />
        <GaugeSegment percentage={activitiesPercentage} color="#C4A1B8" zIndex={1} />
      </div>
    </div>
  );
};

CarbonGaugeReducted.propTypes = {
  carbonFootprint: PropTypes.shape({
    activities: PropTypes.number.isRequired,
    housing: PropTypes.number.isRequired,
    transport: PropTypes.number.isRequired,
  }).isRequired,
  days: PropTypes.number.isRequired,
  maxWidthGauge: PropTypes.number,
};

CarbonGaugeReducted.defaultProps = {
  maxWidthGauge: 300,
};

export default CarbonGaugeReducted;
