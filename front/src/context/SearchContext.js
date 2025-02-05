import { createContext, useContext, useState } from "react";

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

  return(
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export function useSearch() {
    return useContext(SearchContext);
}
