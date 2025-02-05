import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Select from "react-select/async";
import debounce from "lodash.debounce";
import cities from "../assets/communes_france_2025.json";
import { useSearch } from "../context/SearchContext";
import styles from "../style/DepartureCitySelect.module.css";

function DepartureCitySelect({ onChange }) {
  const { searchData } = useSearch();
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (searchData.departureCity) {
      setSelectedCity({
        label: searchData.departureCity,
        value: searchData.departureCity,
      });
    }
  }, [searchData.departureCity]);

  const filterCities = useCallback(
    debounce((inputValue, callback) => {
      try {
        if (!inputValue) return callback([]);
        const filteredOptions = cities
          .filter((city) =>
            city.name.toLowerCase().startsWith(inputValue.toLowerCase())
          )
          .map((city) => ({
            value: city.name,
            label: `${city.name} (${city.region})`,
          }));
        callback(filteredOptions);
      } catch (error) {
        console.error("Erreur lors du filtrage des villes :", error);
        callback([]);
      }
    }, 300),
    []
  );

  return (
    <div className={styles.container}>
      <Select
        placeholder="Ville de départ"
        loadOptions={filterCities}
        isClearable
        isSearchable
        noOptionsMessage={() => "Aucune ville trouvée"}
        cacheOptions
        value={selectedCity}
        onChange={(selectedOption) => {
          setSelectedCity(selectedOption);
          onChange(selectedOption ? selectedOption.value : "");
        }}
        styles={{
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
        }}
        aria-label="Sélection de la ville de départ"
        aria-live="polite"
      />
    </div>
  );
}

DepartureCitySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DepartureCitySelect;
