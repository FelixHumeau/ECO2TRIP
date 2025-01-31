import React from "react";
import { useNavigate } from "react-router-dom";
import ExpandableMapCard from "../components/ExpandableCard";
import CloudBackground from "../components/Cloud";


const ProposedTripsPage = () => {
  const cityData = {
    city: "Ile de Port-Cros",
    description: "Une belle ville portuaire avec une riche histoire. Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
    imageSrc: "https://www.ot-lelavandou.fr/app/uploads/2023/07/port-cros-hyeres-a-tourisme-provence-mediterranee-julien-mauceri.webp",
    tags: ["Mer", "Soleil", "Culture"],
    carbonFootprint: {
      transport: 100,  // en kg CO₂
      housing: 50,    // en kg CO₂
      activities: 10, // en kg CO₂
    },
    days: 5, // Nombre de jours du séjour
  };
  const city2data = {
    city: "Aix-les-bains",
    description: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
    imageSrc: "https://www.espritparcnational.com/sites/default/files/2020-10/PNPC_006193Ori.jpg",
    tags: ["Mer", "Surf"],
    carbonFootprint: {
      transport: 300,  // en kg CO₂
      housing: 30,    // en kg CO₂
      activities: 20, // en kg CO₂
    },
    days: 5, // Nombre de jours du séjour
  };

  const navigate = useNavigate();

  return (
    <div style={{background: 'linear-gradient(0deg, rgb(181 239 201), rgb(95 172 205))'}}>
      <h1 style={{ marginLeft: "20px", paddingTop: "90px", paddingLeft: "10px", zIndex: "1", fontFamily: "Georgia, sans-serif" }}>Destinations</h1>  
      < CloudBackground /> 
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}> {/* Ajoute un gap entre les cartes */}   
      <ExpandableMapCard
        city={cityData.city}
        description={cityData.description}
        imageSrc={cityData.imageSrc}
        tags={cityData.tags}
        carbonFootprint={cityData.carbonFootprint}
        days={cityData.days}
        price= "340-610€"
      />
            <ExpandableMapCard
        city={city2data.city}
        description={city2data.description}
        imageSrc={city2data.imageSrc}
        tags={city2data.tags}
        carbonFootprint={city2data.carbonFootprint}
        days={city2data.days}
        price= "300-540€"
      />
    </div>

    </div>
  );
};

export default ProposedTripsPage;