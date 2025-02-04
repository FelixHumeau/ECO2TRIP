import React, { useRef, useState } from "react";
import Carousel from "../components/Carousel";
import CityCard from "../components/CityCard";
import BasicCard from "../components/BasicCard";
import ScrollableButtons from "../components/ScrollableButtons";
import activityImage from "../assets/activity_image.png";
import ActivityCard from "../components/ActivityCard";
import HousingCard from "../components/HousingCard";
import TransportCard from "../components/TransportCard";

const cityData2 = {
  "Metz": {
    "activities": [
      {
        "Tags": "[\"Tourisme Montagne\", \"Site Sportif, R\\u00e9cr\\u00e9atif Et De Loisirs\", \"Point Dint\\u00e9r\\u00eat\", \"Domaine De Ski Alpin\", \"Lieu\"]",
        "Contacts_du_POI": "#https://www.snowworld.com/amneville/fr",
        "URI_ID_du_POI": "https://data.datatourisme.fr/10/8277eb4e-0228-3f82-a401-cf2df0b547a7",
        "Adresse_postale": "La Cité des Loisirs Allée du snowhall",
        "Description": "L'unique domaine skiable indoor de France offre différentes zones de glisses tapissées de véritable poudreuse. Ouvert toute l'année, il permet à tous les amateurs et même aux professionnels, de s'adonner à la joie des sports d'hiver en toute saison. SnowWorld propose des pentes techniques de 15 à 18%, un snowpark qui évolue sans cesse, une piste de luge et une piste de ski débutants qui permettent un apprentissage idéal.",
        "Covid19_mesures_specifiques": "",
        "Communes_proches": "Metz, Thionville",
        "Latitude": "49.2487313509395",
        "Categories_de_POI": "https://www.datatourisme.fr/ontology/core#PlaceOfInterest|https://www.datatourisme.fr/ontology/core#PointOfInterest|https://www.datatourisme.fr/ontology/core#SportsAndLeisurePlace|https://www.datatourisme.fr/ontology/core#DownhillSkiResort",
        "Periodes_regroupees": "",
        "Date_de_mise_a_jour": "2024-07-18",
        "Longitude": "6.12807040469363",
        "Score_Moyen": "1.5",
        "Nom_du_POI": "SNOWWORLD",
        "Classements_du_POI": "Famille plus#Famille plus",
        "Code_postal_et_commune": "57360#Amnéville",
        "Createur_de_la_donnee": "DESTINATION AMNEVILLE",
        "SIT_diffuseur": "Système d’information touristique Lorrain"
      }
    ],
    "hotels": [
      {
        "name": "Le Grand Large",
        "eco_score": 2,
        "link": "https://www.greengo.voyage/hote/le-grand-large?checkIn=2025-03-17&checkOut=2025-03-18&numberOfAdults=2&numberOfChildren=0&numberOfBabies=0&numberOfPets=0",
        "image": "https://images.greengo.voyage/_/w_1440__q_75/plain/s3://greengobackend-production-media/pictures/accommmodation/ordered_images/9680e7bb-c13b-4ece-ac15-9e5f6b049394.webp",
        "price": "100 €"
      },
      {
        "name": "Le Grand Large",
        "eco_score": 2,
        "link": "https://www.greengo.voyage/hote/le-grand-large?checkIn=2025-03-17&checkOut=2025-03-18&numberOfAdults=2&numberOfChildren=0&numberOfBabies=0&numberOfPets=0",
        "image": "https://images.greengo.voyage/_/w_1440__q_75/plain/s3://greengobackend-production-media/pictures/accommmodation/ordered_images/9680e7bb-c13b-4ece-ac15-9e5f6b049394.webp",
        "price": "100 €"
      }
    ],
    "transport_options": [
      {
        "transport": "Train (TGV)",
        "distance": "299.28 km",
        "carbonImpact": "0.688 kg CO₂"
      },
      {
        "transport": "Avion",
        "distance": "281.38 km",
        "carbonImpact": "72.654 kg CO₂"
      },
      {
        "transport": "Vélo",
        "distance": "367.01 km",
        "carbonImpact": "0.000 kg CO₂"
      },
      {
        "transport": "Voiture électrique",
        "distance": "332.53 km",
        "carbonImpact": "6.584 kg CO₂"
      },
      {
        "transport": "Voiture thermique",
        "distance": "332.53 km",
        "carbonImpact": "63.846 kg CO₂"
      },
      {
        "transport": "Bus thermique",
        "distance": "339.64 km",
        "carbonImpact": "35.425 kg CO₂"
      }
    ],
    "score_activite": 1.5,
    "score_transport": 2,
    "score_hotel": 3,
    "score_total": 6.5,
    "distance": 332.531,
    "details": {
      "Code INSEE": "57463",
      "Commune": "Metz",
      "images": "[\"\", \"\", \"\", \"\"]",
      "Département": "Moselle",
      "latitude": "49.119308",
      "Top_Tags": "[\"Tourisme Culturel\", \"F\\u00eate Et Manifestation\", \"Event\", \"\\u00c9v\\u00e8nement Culturel\", \"Restauration\", \"Monument\", \"Restaurant\", \"Spectacles\", \"Spectacle\", \"Localbusiness\"]",
      "description": "Metz est une ville de Grand Est réputée pour Restauration et son charme authentique.",
      "longitude": "6.175716",
      "Région": "Grand Est"
    }
  },
};

const SummaryPage = () => {

  const city = cityData2["Metz"] || {};

  console.log(city.details.images)

  // Transformer les données pour chaque section
  const cityData = {
    cityName: "Metz",
    rating: 5,
    tags: city.activities ? city.activities.flatMap(act => {
      try {
        return JSON.parse(act.Tags);
      } catch (error) {
        console.error("Erreur de parsing des tags :", act.Tags, error);
        return [];
      }
    }) : [],
    coordinates: city.activities?.length
      ? [parseFloat(city.activities[0].Latitude), parseFloat(city.activities[0].Longitude)]
      : [0, 0],
    images: city.details.images ? (() => {
      try {
        return JSON.parse(city.details.images);
      } catch (error) {
        console.error("Erreur de parsing des images :", city.details.images, error);
        return [];
      }
    })() : []
  };


  const travelData = {
    from: "Paris",
    to: "Metz",
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

  return (
    <div style={{ textAlign: "center", paddingTop: "90px", background: 'linear-gradient(0deg, rgb(181 239 201), rgb(95 172 205))' }}>

      {/* Affichage des données */}
      <Carousel images={cityData.images} height="700px" width="90%" />
      <CityCard
        cityName={cityData.cityName}
        rating={cityData.rating}
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
        <ActivityCard ref={activiteRef} activities={activityData} activityImage={activityImage} />
      </div>
    </div>
  );
};

export default SummaryPage;