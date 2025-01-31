import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import calender from "../assets/Calendrier.png";
import DepartureCitySelect from "./DepartureCitySelect"; // Import du composant
import TravelersCounter from "./TravelersCounter";

function SearchForm() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([null, null]); // Gérer les dates

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="search-input"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '80%', color: 'hsl(0, 0.00%, 0.00%)'}} // Ajoutez ces styles pour centrer le texte
    >
      {value || "Dates de voyage"} {/* Texte par défaut ou les dates sélectionnées */}
    </div>
  ));

  return (
    <div className="search-form">
      <div className="inputs-container">
        {/* Champ pour la ville de départ */}
        <div className="input-container">
          <DepartureCitySelect />
        </div>

        {/* Champ pour les dates */}
        <div className="input-container">
          <DatePicker
            selected={dateRange[0]}
            onChange={(update) => setDateRange(update)}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            selectsRange
            placeholderText="Dates de voyage"
            className="search-input"
            dateFormat="dd/MM/yyyy"
            isClearable
            customInput={<CustomDateInput />}
          />
          <div className="icon-container">
            <img src={calender} alt="calendar" className="icon" />
          </div>
        </div>

        {/* Compteur pour les voyageurs */}
        <div className="input-container">
          <TravelersCounter />
        </div>
      </div>

      {/* Bouton de recherche */}
      <button className="search-button" onClick={() => navigate("/questionnaire")}>
        Rechercher
      </button>
    </div>
  );
}

export default SearchForm;
