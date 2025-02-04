import React, { useEffect, useState } from "react";
import Select from "react-select/async";
import cities from "../assets/communes_france_2025.json";
import { useSearch } from "../context/SearchContext"; // Import du contexte

function DepartureCitySelect({ onChange }) {
  const { searchData } = useSearch(); // Récupération de la valeur du contexte
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (searchData.departureCity) {
      setSelectedCity({
        label: searchData.departureCity,
        value: searchData.departureCity
      });
    }
  }, [searchData.departureCity]);

  // Nouvelle fonction de filtrage : affiche uniquement les villes qui commencent par la saisie
  const filterCities = (inputValue) => {
    if (!inputValue) return [];
    return cities
      .filter((city) => city.name.toLowerCase().startsWith(inputValue.toLowerCase()))
      .map((city) => ({
        value: city.name,
        label: `${city.name} (${city.region})`,
      }));
  };

  const loadOptions = (inputValue, callback) => {
    const filteredOptions = filterCities(inputValue);
    callback(filteredOptions);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      minHeight: "38px",
      fontSize: "0.9rem",
    }),
    input: (provided) => ({
      ...provided,
      color: "#000",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000",

    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",

    }),
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      <Select
        placeholder="Ville de départ"
        loadOptions={loadOptions}
        isClearable
        isSearchable
        noOptionsMessage={() => "Aucune ville trouvée"}
        cacheOptions
        value={selectedCity}
        onChange={(selectedOption) => {
          setSelectedCity(selectedOption);
          onChange(selectedOption ? selectedOption.label : "");
        }}
        styles={customStyles}
      />
    </div>
  );
}

export default DepartureCitySelect;
