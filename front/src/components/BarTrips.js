import React from "react";
import PropTypes from "prop-types";

const BarTrips = ({ items, rightItems, rightItemImages }) => {
  const barStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#d0d0d0",
    borderRadius: "10px",
    padding: "20px",
    width: "87%",
    margin: "15px auto",
  };

  const itemStyle = {
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    padding: "8px 12px",
    margin: "5px",
    textAlign: "center",
    minWidth: "80px",
    fontSize: "14px",
    color: "#333",
  };

  const rightItemStyle = {
    backgroundColor: "#909090",
    borderRadius: "10px",
    padding: "8px 12px",
    margin: "5px",
    textAlign: "center",
    minWidth: "80px",
    fontSize: "14px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "8px", // Espacement entre l'image et le texte
  };

  const imageStyle = {
    width: "20px", // Taille de l'image
    height: "20px",
  };

  return (
    <div style={barStyle}>
      {/* Items principaux */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((item, index) => (
          <div key={index} style={itemStyle}>
            {item}
          </div>
        ))}
      </div>

      {/* Items à droite */}
      <div style={{ display: "flex", marginLeft: "auto" }}>
        {rightItems.map((item, index) => (
          <div key={`right-${index}`} style={rightItemStyle}>
            {rightItemImages && rightItemImages[index] && (
              <img src={rightItemImages[index]} alt="" style={imageStyle} />
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

BarTrips.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  rightItems: PropTypes.arrayOf(PropTypes.string),
  rightItemImages: PropTypes.arrayOf(PropTypes.string), // Images associées aux rightItems
};

BarTrips.defaultProps = {
  rightItems: [],
  rightItemImages: [],
};

export default BarTrips;
