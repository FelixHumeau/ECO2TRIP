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
      return tags.slice(0, 3); // Limiter à 4 tags
    } catch (error) {
      console.error("Erreur lors de la conversion des tags :", error);
      return [];
    }
  };

  

  // Mapper les données du JSON pour créer les objets cityData
  const cityData = Object.keys(cityDataJson).map(cityName => {
    const cityInfo = cityDataJson[cityName];
    const images = cityInfo.details?.images ? JSON.parse(cityInfo.details.images) : [];

        // Extraire les transports spécifiques (indices 0, 3, 5)
    const selectedTransports = [
      cityInfo.transport_options[0],
      cityInfo.transport_options[3],
      cityInfo.transport_options[5]
    ];

    // Extraire les 3 premières activités
    const selectedActivities = cityInfo.activities.slice(0, 3);

    return {
      city: cityName,
      description: cityInfo.details?.description || "Description de la ville", // Utiliser la description de details si disponible
      imageSrc: images[0],
      tags: getTagsFromDetails(cityInfo.details), // Utiliser les tags de details (limités à 4)
      carbonFootprint: {
        activities: parseFloat(cityInfo.score_activite),
        housing: parseFloat(cityInfo.score_hotel),
        transport: parseFloat(cityInfo.transport_options[0].carbonImpact),
        transport_max: parseFloat(cityInfo.transport_options[1].carbonImpact),
      },
      price: getHotelPriceRange(cityInfo.hotels), // Utiliser la fonction pour obtenir le prix ou la fourchette de prix
      latitude: parseFloat(cityInfo.details?.latitude || cityInfo.activities[0]?.Latitude), // Utiliser la latitude de details si disponible
      longitude: parseFloat(cityInfo.details?.longitude || cityInfo.activities[0]?.Longitude), // Utiliser la longitude de details si disponible
      selectedTransports,
      selectedActivities
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
            selectedTransports={city.selectedTransports} // Pass selectedTransports
            selectedActivities={city.selectedActivities} // Pass selectedActivities
          />
        ))}
      </div>
    </div>
  );
};

export default ProposedTripsPage;

