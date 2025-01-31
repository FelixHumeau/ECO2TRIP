import { createContext, useContext, useState } from "react";

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

// Hook personnalisé pour utiliser le contexte
export function useSearch() {
    return useContext(SearchContext);
}
