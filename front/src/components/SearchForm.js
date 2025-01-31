import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext"; // Import du SearchContext
import { useNavigate } from "react-router-dom"; // Pour rediriger vers la page suivante
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import calender from "../assets/Calendrier.png";
import DepartureCitySelect from "./DepartureCitySelect";
import TravelersCounter from "./TravelersCounter";

function SearchForm() {
  const { searchData, setSearchData } = useSearch(); // Récupérer les données existantes
  const navigate = useNavigate(); 

  // Initialisation avec les valeurs du contexte si elles existent
  const [dateRange, setDateRange] = useState([
    searchData.startDate || null,
    searchData.endDate || null
  ]);
  const [departureCity, setDepartureCity] = useState(searchData.departureCity || "");
  const [travelers, setTravelers] = useState(searchData.travelers || { adults: 2, children: 0, rooms: 1 });
  const [error, setError] = useState(""); 

  // Mise à jour du contexte dès qu’un champ change
  useEffect(() => {
    setSearchData({ departureCity, startDate: dateRange[0], endDate: dateRange[1], travelers });
  }, [departureCity, dateRange, travelers, setSearchData]);

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="search-input"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "80%",
        color: "hsl(0, 0.00%, 0.00%)"
      }}
    >
      {value || "Dates de voyage"}
    </div>
  ));

  const handleSearch = () => {
    if (!departureCity) {
      setError("Veuillez sélectionner une ville de départ.");
      return;
    }
    if (!dateRange[0] || !dateRange[1]) {
      setError("Veuillez sélectionner des dates de voyage.");
      return;
    }

    navigate("/trips");
  };

  return (
    <div className="inputs-container">
      {/* Champ pour la ville de départ */}
      <div className="input-container">
        <DepartureCitySelect onChange={setDepartureCity} />
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
        <TravelersCounter onChange={setTravelers} />
      </div>

      {/* Message d'erreur */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
}

export default SearchForm;
