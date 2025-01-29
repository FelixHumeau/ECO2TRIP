import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Style par défaut du datepicker

import { useNavigate } from "react-router-dom";
import calender from "../assets/Calendrier.png";
import map from "../assets/Carte.png";
import TravelersCounter from "./TravelersCounter"; // Import du composant TravelersCounter

function SearchForm() {
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState([null, null]); // Tableau contenant [startDate, endDate]
  const [startDate, endDate] = dateRange; // Déstructure la plage en startDate et endDate

  // Composant personnalisé pour rendre le champ "lecture seule"
  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div onClick={onClick} ref={ref} className="search-input">
      {value || "Dates de voyage"} {/* Texte par défaut ou les dates sélectionnées */}
      <div className="icon-container">
        <img src={calender} alt="calendar" className="icon" />
      </div>
    </div>
  ));

  return (
    <div className="search-form">
      <div className="inputs-container">
        {/* Champ pour la destination */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Où allez-vous?"
            className="search-input"
          />
          <div className="icon-container">
            <img src={map} alt={"map"} className="icon" />
          </div>
        </div>

        {/* Champ pour la plage de dates */}
        <div className="input-container">
          <DatePicker
            selected={startDate}
            onChange={(update) => setDateRange(update)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Dates de voyage"
            customInput={<CustomDateInput />} // Utilisation de l'input personnalisé
            dateFormat="dd/MM/yyyy"
            isClearable
          />
        </div>

        {/* Remplacement du champ pour les voyageurs */}
        <div className="input-container">
          <TravelersCounter /> {/* Intégration du composant TravelersCounter */}
        </div>
      </div>

      {/* Bouton de recherche */}
      <button className="search-button" onClick={() => navigate("/about")}>
        Rechercher
      </button>
    </div>
  );
}

export default SearchForm;
