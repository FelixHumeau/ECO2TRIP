import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../style/CarbonGauge.module.css";

const GaugeBar = ({ percentage, color }) => (
  <div className={styles.gaugeBar} style={{ backgroundColor: color, width: `${percentage}%` }} />
);

GaugeBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const PopupDetail = ({ transport, housing, activities, transport_max }) => (
  <div className={styles.popup} role="tooltip">
    {[
      { name: "Transport", value: transport, max: transport_max, color: "#7AA174" },
      { name: "Hôtel", value: housing, max: 5, color: "#7A8AA1" },
      { name: "Activités", value: activities, max: 3, color: "#A1748A" },
    ].map(({ name, value, max, color }) => (
      <div key={name} className={styles.popupItem}>
        <div className={styles.popupGauge}>
          <div style={{ backgroundColor: color, height: `${(value / max) * 100}%` }} />
        </div>
        <p>{name}: {value} / {max}</p>
      </div>
    ))}
  </div>
);

PopupDetail.propTypes = {
  transport: PropTypes.number.isRequired,
  housing: PropTypes.number.isRequired,
  activities: PropTypes.number.isRequired,
  transport_max: PropTypes.number.isRequired,
};

const CarbonGauge = ({ carbonFootprint, maxWidthGauge }) => {
  const { activities, housing, transport, transport_max } = carbonFootprint;
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={styles.container} onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
      {/* Jauge principale */}
      <div className={styles.gauge} style={{ maxWidth: `${maxWidthGauge}px` }}>
        <GaugeBar percentage={(transport / transport_max) * 100} color="#7AA174" />
        <GaugeBar percentage={(housing / 5) * 100} color="#7A8AA1" />
        <GaugeBar percentage={(activities / 3) * 100} color="#A1748A" />
      </div>

      {/* Popup d'infos */}
      {showPopup && <PopupDetail transport={transport} housing={housing} activities={activities} transport_max={transport_max} />}
    </div>
  );
};

CarbonGauge.propTypes = {
  carbonFootprint: PropTypes.shape({
    activities: PropTypes.number.isRequired,
    housing: PropTypes.number.isRequired,
    transport: PropTypes.number.isRequired,
    transport_max: PropTypes.number.isRequired,
  }).isRequired,
  maxWidthGauge: PropTypes.number,
};

CarbonGauge.defaultProps = {
  maxWidthGauge: 400,
};

export default CarbonGauge;
