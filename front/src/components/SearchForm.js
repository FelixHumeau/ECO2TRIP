import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calender from "../assets/Calendrier.png";
import { useSearch } from "../context/SearchContext"; // Contexte global
import DepartureCitySelect from "./DepartureCitySelect";
import TravelersCounter from "./TravelersCounter";

function SearchForm() {
  const { searchData, setSearchData } = useSearch(); // Accès au contexte global

  // États locaux (initialisés avec les données du contexte)
  const [dateRange, setDateRange] = useState([
    searchData.startDate || null,
    searchData.endDate || null,
  ]);
  const [departureCity, setDepartureCity] = useState(searchData.departureCity || "");
  const [travelers, setTravelers] = useState(searchData.travelers || { adults: 2, children: 0, rooms: 1 });

  // Met à jour le contexte global dès qu’un champ change
  useEffect(() => {
    setSearchData({
      departureCity,
      startDate: dateRange[0],
      endDate: dateRange[1],
      travelers,
    });
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

  return (
    <div className="inputs-container">
      {/* Champ pour la ville de départ */}
      <div className="input-container">
        <DepartureCitySelect onChange={(value) => setDepartureCity(value)} />
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
    </div>
  );
}

export default SearchForm;
