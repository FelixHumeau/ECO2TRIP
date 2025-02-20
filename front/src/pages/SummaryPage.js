import { useLocation } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import CityCard from "../components/CityCard";
import ScrollableButtons from "../components/ScrollableButtons";
import activityImage from "../assets/activity_image.png";
import ActivityCard from "../components/ActivityCard";
import HousingCard from "../components/HousingCard";
import TransportCard from "../components/TransportCard";

const SummaryPage = () => {
  const location = useLocation();
  const { cityName, apiResponseCity } = location.state || {};

  const city = apiResponseCity

  // Transformer les données pour chaque section
  const travelData = {
    from: "Paris",
    to: cityName,
    carbonFootprint: {
      activities: city.score_activite || 0,
      housing: city.score_hotel || 0,
      transport: city.transport_options[0].carbonImpact || 0,
      transport_max: city.transport_options[1].carbonImpact || 300
    },
    days: 3,
    results: city.transport_options ? city.transport_options.map(transport => ({
      transport: transport.transport,
      distance: transport.distance,
      carbonImpact: transport.carbonImpact
    })) : []
  };

  const housingData = city.hotels ? city.hotels.map(hotel => ({
    price: hotel.price,
    name: hotel.name,
    eco_score: hotel.eco_score,
    link: hotel.link !== "Non disponible" ? hotel.link : null,
    image_url: hotel.image
  })) : [];

  const activityData = city.activities ? city.activities.map(activity => ({
    nom: activity.Nom_du_POI,
    description: activity.Description,
    adresse: activity.Adresse_postale,
    tags: activity.Tags,
    coordonnees: {
      latitude: parseFloat(activity.Latitude),
      longitude: parseFloat(activity.Longitude)
    }
  })) : [];

  const cityData = {
    cityName: cityName,
    tags: city.details.tags,
    coordinates: [city.details.latitude, city.details.longitude],
    images: city.details.images ? (() => {
      try {
        return JSON.parse(city.details.images);
      } catch (error) {
        console.error("Erreur de parsing des images :", city.details.images, error);
        return [];
      }
    })() : [],
    activities: activityData
  };

  const buttonLabels = ["Transport", "Hébergement", "Activité", "Restauration"];

  // Références des cartes
  const transportRef = useRef(null);
  const hebergementRef = useRef(null);
  const activiteRef = useRef(null);
  const restaurationRef = useRef(null);

  const cardRefs = {
    Transport: transportRef,
    Hébergement: hebergementRef,
    Activité: activiteRef,
    Restauration: restaurationRef,
  };

  const [updatedCityData, setUpdatedCityData] = useState(cityData);

  const activityDataUpdated = updatedCityData.activities ? updatedCityData.activities.map(activity => ({
    nom: activity.Nom_du_POI || activity.nom,
    description: activity.Description || activity.description,
    adresse: activity.Adresse_postale || activity.adresse,
    tags: activity.Tags ? JSON.parse(activity.Tags.replace(/\\u/g, "")) : [],
    coordonnees: {
      latitude: parseFloat(activity.Latitude) || (activity.coordonnees ? activity.coordonnees.latitude : null),
      longitude: parseFloat(activity.Longitude) || (activity.coordonnees ? activity.coordonnees.longitude : null)
    }
  })).filter(activity => activity.coordonnees.latitude && activity.coordonnees.longitude) : [];


  useEffect(() => {
    const updateCityActivities = async () => {
      let newCityData = { ...updatedCityData };
      let hasChanges = false; // Vérifier si on doit mettre à jour

      for (const city in newCityData) {
        if (newCityData && Array.isArray(newCityData.activities) && newCityData.activities.length < 4) {
          
          try {
            const additionalActivities = await fetchAdditionalActivities(newCityData.cityName);

            if (additionalActivities.length > 0) {
              newCityData.activities = [
                ...newCityData.activities,
                ...additionalActivities,
              ].slice(0, 4); // Garde un maximum de 4 activités
              hasChanges = true; // Indique qu'une mise à jour est nécessaire
            }
          } catch (error) {
            console.error(`❌ Erreur lors de la récupération des activités pour ${city} :`, error);
          }
        }
      }

      if (hasChanges) { // Évite de déclencher un re-render inutile
        setUpdatedCityData(newCityData);
      }
    };

    updateCityActivities();
  }, []); // 🔥 Supprime cityData des dépendances pour éviter les boucles infinies


  // 📌 Fonction pour récupérer des activités supplémentaires
  const fetchAdditionalActivities = async (city) => {
    try {
      const response = await fetch("http://localhost:5000/api/activites/add-activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: city }),
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.statusText}`);
      }

      const data = await response.json();
      return data.activities;
    } catch (error) {
      console.error(`❌ Erreur API pour ${city} :`, error);
      return [];
    }
  };

  if (!cityName || !apiResponseCity) {
    return <h2>Erreur : Aucune donnée de ville reçue</h2>;
  }

  return (
    <div style={{ textAlign: "center", paddingTop: "90px", background: 'linear-gradient(0deg, rgb(181 239 201), rgb(95 172 205))' }}>

      {/* Affichage des données */}
      <Carousel images={cityData.images} height="700px" width="90%" />
      <CityCard
        cityName={cityData.cityName}
        tags={cityData.tags}
        carbonFootprint={travelData.carbonFootprint}
        coordinates={cityData.coordinates}
        days={travelData.days}
      />

      <ScrollableButtons labels={buttonLabels} cardRefs={cardRefs} />

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "30px"
      }}>
        <TransportCard ref={transportRef} travelData={travelData} />
        <HousingCard ref={hebergementRef} housings={housingData} />
        <ActivityCard ref={activiteRef} activities={activityDataUpdated} activityImage={activityImage} />
      </div>
    </div>
  );
};

export default SummaryPage;