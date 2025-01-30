import React, { useRef } from "react";
import Carousel from "../components/Carousel";
import CityCard from "../components/CityCard";
import BasicCard from "../components/BasicCard";
import ScrollableButtons from "../components/ScrollableButtons"; // Import du nouveau composant
import activityImage from "../assets/activity_image.png";
import ActivityCard from "../components/ActivityCard";
import HousingCard from "../components/HousingCard";

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
      transport: 160,
    },
    coordinates: [43.002, 6.399],
    days: 5,
  };

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
        /*marginBottom: "1000px"*/
      }}>
        <BasicCard ref={transportRef} title="Transport" />
        <BasicCard ref={hebergementRef} title="Hébergement" >
          <HousingCard
            image="https://images.greengo.voyage/_/w_1440__q_75/plain/s3://greengobackend-production-media/pictures/hosting_establishment/ordered_images/coypel_4.jpeg"
            title="Hôtel Coypel By Magna Arbor"
            titleLink="https://www.greengo.voyage/hote/hotel-coypel-by-magna-arbor?checkIn=2025-03-17&checkOut=2025-03-18&numberOfAdults=2&numberOfChildren=0&numberOfBabies=0&numberOfPets=0"
            pricePerNight={159}
            rating={2}
          />
        </BasicCard>
        <BasicCard ref={activiteRef} title="Activité">
          <ActivityCard
            image={activityImage}
            title="Plongée sous-marine"
            price={80}
            description="Découvrez les fonds marins de Port-Cros."
            coordinates={[43.002, 6.399]}
            address="Port-Cros, 83400 Hyères, France"
          />
          <BasicCard ref={restaurationRef} title="Restauration" backgroundColor="#D4E9C2" />
        </BasicCard>
        <BasicCard ref={avisRef} title="Avis" />




      </div>
    </div>
  );
};

export default SummaryPage;
