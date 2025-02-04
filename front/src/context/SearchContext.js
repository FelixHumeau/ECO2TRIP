import { createContext, useContext, useState } from "react";

<<<<<<< HEAD
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    departureCity: "",
    startDate: null,
    endDate: null,
    travelers: { adults: 2, children: 0, rooms: 1 },
    selectedFilters: [], // Pour stocker les tags sélectionnés
    ambiance: "", // Pour stocker l'ambiance sélectionnée
  });

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};
=======
// Création du contexte
const SearchContext = createContext();

// Fournisseur du contexte (provider)
export function SearchProvider({ children }) {
    const [searchData, setSearchData] = useState({});

    return (
        <SearchContext.Provider value={{ searchData, setSearchData }}>
            {children}
        </SearchContext.Provider>
    );
}
>>>>>>> dev

// Hook personnalisé pour utiliser le contexte
export function useSearch() {
    return useContext(SearchContext);
}
