import React from "react";
import { useNavigate } from "react-router-dom";
import ExpandableMapCard from "../components/ExpandableCard";
import CloudBackground from "../components/Cloud";


const ProposedTripsPage = () => {
  const cityData = {
    city: "Marseille",
    description: "Située sur la côte méditerranéenne, Marseille est la plus ancienne ville de France et un important port maritime. Elle est connue pour son Vieux-Port, où les bateaux de pêche vendent encore leurs prises du jour, ainsi que pour la Basilique Notre-Dame de la Garde, qui offre une vue panoramique sur la ville et la mer. Le quartier du Panier, avec ses ruelles pittoresques et son ambiance authentique, attire de nombreux visiteurs. Les Calanques de Marseille, entre falaises et criques turquoise, sont un paradis pour les randonneurs et amateurs de baignade.",
    imageSrc: "https://www.wonderbox.fr/blog/wp-content/uploads/sites/4/2020/02/Visiter-Marseille-en-10-lieux-marseille-scaled-1-1.jpeg",
    tags: ["Mer", "Soleil", "Culture", "Soirée"],
    carbonFootprint: {
      transport: 40,  // en kg CO₂
      housing: 260,    // en kg CO₂
      activities: 90, // en kg CO₂
    },
    days: 5, // Nombre de jours du séjour
  };

  const cityData_2 = {
    city: "Île de Port Cros",
    description: "L’île de Port-Cros, située dans l’archipel des îles d’Hyères, est un véritable joyau naturel et le premier parc national marin d’Europe. Cette île préservée offre des sentiers de randonnée exceptionnels au milieu d’une nature luxuriante et une faune sous-marine riche, parfaite pour la plongée et le snorkeling. L’accès aux véhicules motorisés est interdit, ce qui renforce son caractère sauvage et authentique. Ses plages et criques secrètes en font une destination idéale pour les amoureux de la nature et du calme.",
    tags: ["Mer", "Aquatique", "Parc naturel", "Randonnée"],
    imageSrc: "https://www.ot-lelavandou.fr/app/uploads/2023/07/port-cros-hyeres-a-tourisme-provence-mediterranee-julien-mauceri.webp",
    carbonFootprint: {
      transport: 200,  // en kg CO₂
      housing: 150,    // en kg CO₂
      activities: 20, // en kg CO₂
    },
    days: 5,
  };

  const cityData_3 = {
    city: "Biarritz",
    description: "Station balnéaire prisée de la côte basque, Biarritz est réputée pour ses plages magnifiques, son ambiance élégante et son histoire liée au surf. Autrefois un repaire de la noblesse européenne, la ville mêle aujourd’hui raffinement et culture surf. Le Rocher de la Vierge, emblème de la ville, offre une vue imprenable sur l’Atlantique. Le Casino Barrière, les halles animées et le musée de la mer sont autant d’attractions à découvrir. Avec ses vagues de renommée mondiale, c’est une destination incontournable pour les amateurs de surf et de sports nautiques.",
    tags: ["Mer", "Aquatique", "Surf"],
    imageSrc: "https://www.tourisme64.com/wp-content/uploads/2024/02/biarritz-grande-plage-et-phare-001-copyedelweiss_loren-bedeli.jpg",
    carbonFootprint: {
      transport: 50,  // en kg CO₂
      housing: 190,    // en kg CO₂
      activities: 20, // en kg CO₂
    },
    days: 5,
  };

  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(0deg, rgb(181 239 201), rgb(95 172 205))' }}>
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
          price="300-540€"
        />
        <ExpandableMapCard
          city={cityData_2.city}
          description={cityData_2.description}
          imageSrc={cityData_2.imageSrc}
          tags={cityData_2.tags}
          carbonFootprint={cityData_2.carbonFootprint}
          days={cityData_2.days}
          price="400-680€"
        />
        <ExpandableMapCard
          city={cityData_3.city}
          description={cityData_3.description}
          imageSrc={cityData_3.imageSrc}
          tags={cityData_3.tags}
          carbonFootprint={cityData_3.carbonFootprint}
          days={cityData_3.days}
          price="600-40€"
        />
      </div>

    </div>
  );
};

export default ProposedTripsPage;