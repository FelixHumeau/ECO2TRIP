import React, { useState, useEffect } from "react";
import Select from "react-select/async";
import { useSearch } from "../context/SearchContext"; // Import du contexte
import cities from "../assets/communes_france_2025.json";

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

  const filterCities = (inputValue) => {
    if (!inputValue) return [];
    const regex = new RegExp(inputValue, "i");
    return cities
      .filter((city) => regex.test(city.name))
      .map((city) => ({
        value: city.name,
        label: `${city.name} (${city.region})`,
      }));
  };

  const loadOptions = (inputValue, callback) => {
    const filteredOptions = filterCities(inputValue);
    callback(filteredOptions);
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
        value={selectedCity} // Afficher la valeur sauvegardée
        onChange={(selectedOption) => {
          setSelectedCity(selectedOption);
          onChange(selectedOption ? selectedOption.label : ""); // Transmettre la sélection
        }}
      />
    </div>
  );
}

export default DepartureCitySelect;
