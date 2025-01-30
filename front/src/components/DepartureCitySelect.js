import React from "react";
import Select from "react-select/async";
import cities from "../assets/communes_france_2025.json"; // Import du fichier JSON

function DepartureCitySelect() {
  // Fonction pour filtrer les villes en fonction de la saisie utilisateur
  const filterCities = (inputValue) => {
    if (!inputValue) return []; // Retourner une liste vide si l'entrée est vide
    const regex = new RegExp(inputValue, "i"); // Crée une expression régulière pour une recherche insensible à la casse
    return cities
      .filter((city) => regex.test(city.name)) // Recherche dans le nom uniquement
      .map((city) => ({
        value: city.id,
        label: `${city.name} (${city.region})`, // Exemple : Marseille (Provence-Alpes-Côte d'Azur)
      }));
  };

  // Fonction asynchrone pour charger les options
  const loadOptions = (inputValue, callback) => {
    const filteredOptions = filterCities(inputValue);
    callback(filteredOptions); // Retourner les options filtrées via le callback
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      <Select
        placeholder="Ville de départ"
        loadOptions={loadOptions} // Charger les options dynamiquement
        isClearable // Permettre de vider la sélection
        isSearchable // Activer la recherche
        noOptionsMessage={() => "Aucune ville trouvée"} // Message si aucune ville ne correspond
        cacheOptions // Activer la mise en cache des options
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "solidrgba(255, 255, 255, 0)", // Exemple de modification
            border: "#f9f9f9", 
            borderRadius: "8px", // Coins arrondis
            padding: "0px", // Espacement interne
            boxShadow: "none", // Supprime l'ombre par défaut
          }),
        }}
      />
    </div>
  );
}

export default DepartureCitySelect;
