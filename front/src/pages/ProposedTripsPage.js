import React from "react";
import { useNavigate } from "react-router-dom";
import ExpandableMapCard from "../components/ExpandableCard";


const ProposedTripsPage = () => {
  const cityData = {
    city: "Marseille",
    description: "Une belle ville portuaire avec une riche histoire. Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
    imageSrc: "https://www.ot-lelavandou.fr/app/uploads/2023/07/port-cros-hyeres-a-tourisme-provence-mediterranee-julien-mauceri.webp",
    tags: ["Mer", "Soleil", "Culture"],
    carbonFootprint: {
      transport: 300,  // en kg CO₂
      housing: 30,    // en kg CO₂
      activities: 20, // en kg CO₂
    },
    days: 5, // Nombre de jours du séjour
  };

  /*      <button onClick={() => navigate("/summary")}>
        Aller à la page récapitulative
      </button>
      */

  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Destinations</h1>   
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}> {/* Ajoute un gap entre les cartes */}   
      <ExpandableMapCard
        city={cityData.city}
        description={cityData.description}
        imageSrc={cityData.imageSrc}
        tags={cityData.tags}
        carbonFootprint={cityData.carbonFootprint}
        days={cityData.days}
        price= "300-540€"
      />
            <ExpandableMapCard
        city={cityData.city}
        description={cityData.description}
        imageSrc={cityData.imageSrc}
        tags={cityData.tags}
        carbonFootprint={cityData.carbonFootprint}
        days={cityData.days}
        price= "300-540€"
      />
            <ExpandableMapCard
        city={cityData.city}
        description={cityData.description}
        imageSrc={cityData.imageSrc}
        tags={cityData.tags}
        carbonFootprint={cityData.carbonFootprint}
        days={cityData.days}
        price= "300-540€"
      />
    </div>

    </div>
  );
};

export default ProposedTripsPage;
