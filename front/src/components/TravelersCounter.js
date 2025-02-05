import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext"; // Import du contexte

const TravelersCounter = ({ onChange }) => {
  const { searchData } = useSearch(); // Récupération des valeurs du contexte
  const [isOpen, setIsOpen] = useState(false);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, rooms: 1 });

  useEffect(() => {
    if (searchData.travelers) {
      setTravelers(searchData.travelers);
    }
  }, [searchData.travelers]);

  const updateTravelers = (newTravelers) => {
    setTravelers(newTravelers);
    onChange(newTravelers);
  };

  return (
    <div className="travelers-counter">
      <div className="travelers-summary" onClick={() => setIsOpen(!isOpen)}>
        <span>
          <i className="icon-person"></i>
          {travelers.adults} Adulte{travelers.adults > 1 ? "s" : ""} · {travelers.children} Enfant
          {travelers.children > 1 ? "s" : ""} · {travelers.rooms} Chambre{travelers.rooms > 1 ? "s" : ""}
        </span>
        <button className="dropdown-toggle">▼</button>
      </div>

      {isOpen && (
        <div className="travelers-dropdown">
          <div className="counter-row">
            <span>Adultes</span>
            <div className="counter-controls">
              <button onClick={() => updateTravelers({ ...travelers, adults: travelers.adults - 1 })} disabled={travelers.adults <= 1}>-</button>
              <span>{travelers.adults}</span>
              <button onClick={() => updateTravelers({ ...travelers, adults: travelers.adults + 1 })}>+</button>
            </div>
          </div>
          <div className="counter-row">
            <span>Enfants</span>
            <div className="counter-controls">
              <button onClick={() => updateTravelers({ ...travelers, children: travelers.children - 1 })} disabled={travelers.children <= 0}>-</button>
              <span>{travelers.children}</span>
              <button onClick={() => updateTravelers({ ...travelers, children: travelers.children + 1 })}>+</button>
            </div>
          </div>
          <div className="counter-row">
            <span>Chambres</span>
            <div className="counter-controls">
              <button onClick={() => updateTravelers({ ...travelers, rooms: travelers.rooms - 1 })} disabled={travelers.rooms <= 1}>-</button>
              <span>{travelers.rooms}</span>
              <button onClick={() => updateTravelers({ ...travelers, rooms: travelers.rooms + 1 })}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelersCounter;
