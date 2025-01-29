import React, { useState } from "react";

const TravelersCounter = () => {
  const [isOpen, setIsOpen] = useState(false); // État pour afficher/masquer le menu déroulant
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  return (
    <div className="travelers-counter">
      {/* Résumé visible */}
      <div
        className="travelers-summary"
        onClick={() => setIsOpen(!isOpen)} // Toggle du menu déroulant
      >
        <span>
          <i className="icon-person"></i> {/* Icône de personne */}
          {adults} adulte{adults > 1 ? "s" : ""} · {children} enfant
          {children > 1 ? "s" : ""} · {rooms} chambre{rooms > 1 ? "s" : ""}
        </span>
        <button className="dropdown-toggle">▼</button>
      </div>

      {/* Menu déroulant */}
      {isOpen && (
        <div className="travelers-dropdown">
          <div className="counter-row">
            <span>Adultes</span>
            <div className="counter-controls">
              <button onClick={() => handleDecrement(setAdults, adults)}>-</button>
              <span>{adults}</span>
              <button onClick={() => handleIncrement(setAdults, adults)}>+</button>
            </div>
          </div>
          <div className="counter-row">
            <span>Enfants</span>
            <div className="counter-controls">
              <button onClick={() => handleDecrement(setChildren, children)}>-</button>
              <span>{children}</span>
              <button onClick={() => handleIncrement(setChildren, children)}>+</button>
            </div>
          </div>
          <div className="counter-row">
            <span>Chambres</span>
            <div className="counter-controls">
              <button onClick={() => handleDecrement(setRooms, rooms)}>-</button>
              <span>{rooms}</span>
              <button onClick={() => handleIncrement(setRooms, rooms)}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelersCounter;
