import React, { useRef } from "react";
import Carousel from "../components/Carousel";
import CityCard from "../components/CityCard";
import BasicCard from "../components/BasicCard";
import ScrollableButtons from "../components/ScrollableButtons";
import activityImage from "../assets/activity_image.png";
import ActivityCard from "../components/ActivityCard";
import HousingCard from "../components/HousingCard";
import TransportCard from "../components/TransportCard";

const SummaryPage = () => {
  const images = [
    "https://www.ot-lelavandou.fr/app/uploads/2023/07/port-cros-hyeres-a-tourisme-provence-mediterranee-julien-mauceri.webp",
    "https://www.espritparcnational.com/sites/default/files/2020-10/PNPC_006193Ori.jpg",
    "https://res.cloudinary.com/manawa/image/private/f_auto,c_limit,w_3840,q_auto/85247e2c250c6c1b9c94a3f96497131c",
    "https://www.rivieraloisirs.com/public/uploads/2020/06/iStock-536012111.jpg",
  ];

  const cityData = {
    cityName: "Île de Port Cros",
    rating: 4.6,
    tags: ["Mer", "Aquatique", "Parc naturel", "Plongée", "Randonnée"],
    carbonFootprint: {
      activities: 75,
      housing: 130,
      transport: 160
    },
    coordinates: [43.002, 6.399],
    days: 5
  };

  const travelData = {
    from: "Paris", to: "Lyon",
    results: [
      { transport: "Train (TGV)", distance: "419.49 km", carbonImpact: "0.965 kg CO₂" },
      { transport: "Avion", distance: "395.15 km", carbonImpact: "102.027 kg CO₂" },
      { transport: "Vélo", distance: "540.85 km", carbonImpact: "0.000 kg CO₂" },
      { transport: "Voiture électrique", distance: "466.10 km", carbonImpact: "9.229 kg CO₂" },
      { transport: "Voiture thermique", distance: "466.10 km", carbonImpact: "89.491 kg CO₂" },
      { transport: "Bus thermique", distance: "493.89 km", carbonImpact: "51.513 kg CO₂" }
    ]
  };

  const housingData = [
    {
      price: "592 €",
      name: "Hôtel du Jeu de Paume",
      eco_score: "3",
      link: "https://www.greengo.voyage/hote/hotel-du-jeu-de-paume",
      image_url: "https://images.greengo.voyage/_/w_1440__q_75/plain/s3://greengobackend-production-media/pictures/hosting_establishment/ordered_images/000000_jeu_de_paume_xqd2291bdf.jpg"
    },
    {
      name: "Appartement vue sur canal",
      image_url: "https://images.greengo.voyage/_/w_1440__q_75/plain/s3://greengobackend-production-media/pictures/accommmodation/ordered_images/vue_klrt30k.jpg",
      eco_score: "1",
      link: "https://www.greengo.voyage/hote/appartement-vue-sur-canal",
      price: "344 €"
    },
    {
      name: "Hôtel Villa Saxe Eiffel",
      image_url: "https://images.greengo.voyage/_/w_1440__q_75/plain/s3://greengobackend-production-media/pictures/hosting_establishment/ordered_images/hotel-villa-saxe-eiffel-bar-205675-1280-1200-portrait.jpg",
      eco_score: "2",
      link: "https://www.greengo.voyage/hote/hotel-villa-saxe-eiffel",
      price: "295 €"
    },
    {
      name: "Hôtel Baldi by Magna Arbor",
      image_url: "https://images.greengo.voyage/_/w_1440__q_75/plain/s3://greengobackend-production-media/pictures/hosting_establishment/ordered_images/baldi_dts2v6g.jpeg",
      eco_score: "2",
      link: "https://www.greengo.voyage/hote/hotel-baldi-by-magna-arbor?checkIn=2025-03-17&checkOut=2025-03-18&numberOfAdults=2&numberOfChildren=0&numberOfBabies=0&numberOfPets=0",
      price: "171 €"
    }
  ];

  const activityData = [
    {
      nom: "Court de tennis",
      description: "2 courts de tennis, réservation en ligne",
      adresse: "38 rue du Stade",
      tags: [
        "Site Sportif, Récréatif Et De Loisirs",
        "Lieu",
        "Complèxe Ou Terrain De Tennis",
        "Point Dintérêt"
      ],
      coordonnees: {
        "latitude": 45.459624,
        "longitude": -0.718708
      }
    },
    {
      nom: "Atelier d’initiation au neuro dessin",
      description: "",
      adresse: "8 Rue de l'Irlande Alré Bio",
      tags: [
        "Produit",
        "Stage, Atelier",
        "Point Dintérêt",
        "Pratique"
      ],
      coordonnees: {
        "latitude": 47.66503,
        "longitude": -3.0078
      }
    },
    {
      nom: "Cocktail Aventure",
      description: "",
      adresse: "RD 918 - Parking Noblia",
      tags: [
        "Tourisme Sportif",
        "Lieu",
        "Point Dintérêt",
        "Site Sportif, Récréatif Et De Loisirs",
        "Baptême Sportif",
        "Accompagnement",
        "Produit",
        "Pratique Libre",
        "Aventure",
        "Pratique"
      ],
      coordonnees: {
        "latitude": 43.269245,
        "longitude": -1.34587
      }
    }
  ];

  const buttonLabels = ["Transport", "Hébergement", "Activité", "Restauration", "Avis"];

  // Références des cartes
  const transportRef = useRef(null);
  const hebergementRef = useRef(null);
  const activiteRef = useRef(null);
  const restaurationRef = useRef(null);
  const avisRef = useRef(null);

  const cardRefs = {
    Transport: transportRef,
    Hébergement: hebergementRef,
    Activité: activiteRef,
    Restauration: restaurationRef,
    Avis: avisRef,
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Carousel images={images} height="700px" width="90%" />
      <CityCard
        cityName={cityData.cityName}
        rating={cityData.rating}
        tags={cityData.tags}
        carbonFootprint={cityData.carbonFootprint}
        coordinates={cityData.coordinates}
        days={cityData.days}
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
        <HousingCard housings={housingData} />
        <ActivityCard activities={activityData} activityImage={activityImage} />
        <BasicCard ref={avisRef} title="Avis" />
      </div>
    </div>
  );
};

export default SummaryPage;
