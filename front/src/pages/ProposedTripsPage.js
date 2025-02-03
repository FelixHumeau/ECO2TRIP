import React from "react";
import { useNavigate } from "react-router-dom";
import ExpandableMapCard from "../components/ExpandableCard";
import BarTrips from "../components/BarTrips";

const ProposedTripsPage = () => {
  const navigate = useNavigate();

  const cityData = [
    {
      city: "Marseille",
      description: "Située sur la côte méditerranéenne",
      imageSrc: "https://www.wonderbox.fr/blog/wp-content/uploads/sites/4/2020/02/Visiter-Marseille-en-10-lieux-marseille-scaled-1-1.jpeg",
      tags: ["Mer", "Soleil", "Culture", "Soirée"],
      carbonFootprint: { transport: 40, housing: 260, activities: 90 },
      days: 5,
      latitude: 43.299999,
      longitude: 5.4,
    },
    {
      city: "Île de Port Cros",
      description: "L’île de Port-Cros, située dans l’archipel",
      tags: ["Mer", "Aquatique", "Parc naturel", "Randonnée"],
      imageSrc: "https://www.ot-lelavandou.fr/app/uploads/2023/07/port-cros-hyeres-a-tourisme-provence-mediterranee-julien-mauceri.webp",
      carbonFootprint: { transport: 200, housing: 150, activities: 20 },
      days: 5,
      latitude: 43,
      longitude: 6.3833,
    },
    {
      city: "Biarritz",
      description: "Station balnéaire prisée de la côte basque",
      tags: ["Mer", "Aquatique", "Surf"],
      imageSrc: "https://www.tourisme64.com/wp-content/uploads/2024/02/biarritz-grande-plage-et-phare-001-copyedelweiss_loren-bedeli.jpg",
      carbonFootprint: { transport: 50, housing: 190, activities: 20 },
      days: 5,
      latitude: 43.4831519,
      longitude: -1.558626,
    },
  ];

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Destinations</h1>

      <div>
        <BarTrips
          items={["Option 1", "Option 2", "Option 3", "Option 4"]}
          rightItems={["01/01/2026","4 voyageurs", "Entre amis"]}
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
            days={city.days}
            latitude={city.latitude}
            longitude={city.longitude}
          />
        ))}
      </div>
    </div>
  );
};

export default ProposedTripsPage;
