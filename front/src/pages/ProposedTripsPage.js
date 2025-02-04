import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ExpandableMapCard from "../components/ExpandableCard";
import BarTrips from "../components/BarTrips";
import CloudBackground from "../components/Cloud";
import { SearchContext } from "../context/SearchContext";
import { useLocation } from "react-router-dom";

// Importer le JSON statique
import cityDataJson from "../test.json";

const ProposedTripsPage = () => {
  const location = useLocation();
  const { searchData } = useContext(SearchContext);
  const { ambiance, selectedFilters } = location.state || {};

  // Fonction pour extraire et formater le prix des hôtels
  const getHotelPriceRange = (hotels) => {
    if (!hotels || hotels.length === 0) return "Prix non disponible";

    // Si un seul hôtel, retourner son prix directement
    if (hotels.length === 1) {
      return hotels[0].price; // Retourne directement le prix (ex: "44 €")
    }

    // Si plusieurs hôtels, calculer la fourchette de prix
    const prices = hotels.map(hotel => {
      const priceString = hotel.price.replace(" €", "").trim();
      return parseFloat(priceString);
    });

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return `${minPrice}-${maxPrice} €`;
  };

  // Fonction pour extraire les tags de details.Top_Tags et limiter à 4 tags
  const getTagsFromDetails = (details) => {
    if (!details || !details.Top_Tags) return [];
    try {
      const tags = JSON.parse(details.Top_Tags); // Convertir la chaîne JSON en tableau
      return tags.slice(0, 4); // Limiter à 4 tags
    } catch (error) {
      console.error("Erreur lors de la conversion des tags :", error);
      return [];
    }
  };

  // Mapper les données du JSON pour créer les objets cityData
  const cityData = Object.keys(cityDataJson).map(cityName => {
    const cityInfo = cityDataJson[cityName];
    return {
      city: cityName,
      description: cityInfo.details?.description || "Description de la ville", // Utiliser la description de details si disponible
      imageSrc: "https://www.wonderbox.fr/blog/wp-content/uploads/sites/4/2020/02/Visiter-Marseille-en-10-lieux-marseille-scaled-1-1.jpeg", // Vous pouvez ajouter une image par défaut ou spécifique
      tags: getTagsFromDetails(cityInfo.details), // Utiliser les tags de details (limités à 4)
      carbonFootprint: {
        transport: parseFloat(cityInfo.score_transport),
        housing: parseFloat(cityInfo.score_hotel),
        activities: parseFloat(cityInfo.score_activite)
      },
      days: 5, // Vous pouvez ajuster cela en fonction de vos besoins
      price: getHotelPriceRange(cityInfo.hotels), // Utiliser la fonction pour obtenir le prix ou la fourchette de prix
      latitude: parseFloat(cityInfo.details?.latitude || cityInfo.activities[0]?.Latitude), // Utiliser la latitude de details si disponible
      longitude: parseFloat(cityInfo.details?.longitude || cityInfo.activities[0]?.Longitude) // Utiliser la longitude de details si disponible
    };
  });

  const totalTravelers = searchData.travelers.adults + searchData.travelers.children;
  const days = Math.ceil((searchData.endDate - searchData.startDate) / (1000 * 60 * 60 * 24));

  return (
    <div style={{background: 'linear-gradient(0deg, rgb(181 239 201), rgb(95 172 205))'}}>
      <h1 style={{ marginLeft: "20px", paddingTop: "90px", paddingLeft: "10px", zIndex: "1", fontFamily: "Georgia, sans-serif" }}>Destinations</h1>  
      <CloudBackground /> 

      <div>
      <BarTrips
        items={selectedFilters} // Utiliser les tags sélectionnés
        rightItems={[
          searchData.startDate ? searchData.startDate.toLocaleDateString() : "01/01/2026",
          `${totalTravelers} voyageurs`,
          ambiance, // Utiliser l'ambiance sélectionnée
        ]}
        rightItemImages={[
          "https://cdn-icons-png.flaticon.com/512/747/747310.png",  // Icône calendrier
        ]}
      />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {cityData.map((city, index) => (
          <ExpandableMapCard
            key={index}
            city={city.city}
            description={city.description}
            imageSrc={city.imageSrc}
            tags={city.tags}
            carbonFootprint={city.carbonFootprint}
            days={days}
            latitude={city.latitude}
            longitude={city.longitude}
            price={city.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProposedTripsPage;