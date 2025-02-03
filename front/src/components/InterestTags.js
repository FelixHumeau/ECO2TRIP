import React, { useState } from "react";

const InterestTags = ({ selectedFilters, handleFilterClick, limit = 15 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const tags = [
    "lieu",
    "hébergement",
    "restauration",
    "fête et manifestation",
    "site sportif, récréatif et de loisirs",
    "produit",
    "hébergement locatif",
    "meublés de tourisme",
    "site culturel",
    "restaurant",
    "commerce de détail",
    "évènement culturel",
    "itinéraire touristique",
    "pratique",
    "boutique, commerce de proximité",
    "hôtellerie",
    "fournisseur de dégustation",
    "hôtel",
    "location",
    "itinéraire pédestre",
    "spectacle",
    "visite",
    "concert",
    "appartement",
    "évènement sports et loisirs",
    "site religieux",
    "service pratique",
    "producteur",
    "hôtel-restaurant",
    "location de salle",
    "festival",
    "brasserie ou taverne",
    "hôtellerie de plein air",
    "social event",
    "restauration rapide",
    "itinéraire cyclable",
    "marché",
    "park",
    "parc et jardin",
    "bistrot - bar à vin",
    "site naturel",
    "bâtiment civil remarquable",
    "prestataire de service",
    "musée",
    "maison",
    "cave de dégustation",
    "exposition",
    "hébergement collectif",
    "eglise",
    "bar, bar à thème",
    "camping",
    "library",
    "aire de pique-nique",
    "restaurant gastronomique",
    "animation locale",
    "patrimoine industriel, artisanal, rural, agricole et technique",
    "tourist information center",
    "théatre, salle de spectacle",
    "transport",
    "evènement jeune public",
    "pratique libre",
    "aire de camping-car",
    "ville et village",
    "location de matériel",
    "stage, atelier",
    "café ou salon de thé",
    "maison de pays, produits du terroir",
    "fête traditionnelle",
    "compétition sportive",
    "aire de jeux",
    "conférence",
    "foire ou salon",
    "piscine",
    "résidence de tourisme",
    "loueur de matériel",
    "cours",
    "accompagnement",
    "borne de charge véhicule électrique",
    "cinéma",
    "centre équestre",
    "parc de loisirs, parc à thème",
    "centre de congrès",
    "jeu, concours",
    "office de tourisme",
    "lieu de santé",
    "complexe de loisirs",
    "itinéraire équestre",
    "château",
    "plage",
    "maison remarquable",
    "bateau promenade",
    "chapelle",
    "randonnée, balade",
    "itinéraire routier",
    "lieu de mémoire",
    "spectacle de danse",
    "ice cream shop",
    "organisme réceptif",
    "stade",
    "halte et port fluvial",
    "complèxe ou terrain de tennis",
    "boulangerie",
    "discothèque",
    "site de défense",
    "port de plaisance",
    "terrain de golf",
    "transporteur",
    "boulodrome",
    "cave ou caveau",
    "gîte de groupe",
    "parking",
    "salle ou terrain de sport, gymnase",
    "base nautique / centre nautique",
    "spectacle de cirque",
    "professionnel de santé",
    "atelier de formation",
    "dégustation",
    "salle polyvalente, salle des fêtes",
    "site archéologique",
    "multiactivités",
    "réparateur de matériel",
    "centre de balnéothérapie",
    "centre de remise en forme - fitness",
    "stage de perfectionnement",
    "piste de roller ou de skate board",
    "restauration ambulante, food truck",
    "camping car",
    "cafétéria - self",
    "site industriel",
    "lecture",
    "chambre",
    "bowling",
    "baptême sportif",
    "cirque",
    "voyagiste",
    "parcours de santé",
    "ferme pédagogique",
    "point de vue",
    "compagnie de taxis",
    "quartier",
    "éleveur",
    "mini golf",
    "fontaine",
    "cathédrale",
    "forêt",
    "train station",
    "circuit automobile ou moto",
    "portes ouvertes",
    "vide-grenier",
    "ferme",
    "screening event",
    "rallye",
    "brasseur",
    "zoo - parc animalier",
    "lac",
    "antiquaire et brocanteur",
    "brocante",
    "club et village vacances",
    "calvaire et enclos paroissiaux",
    "ruines et vestiges",
    "négociant",
    "train touristique",
    "auberge de jeunesse et centre international de séjour",
    "centre et galerie commerciale",
    "club enfants",
    "congrès",
    "pont",
    "démonstration sportive",
    "étang",
    "opéra",
    "chalet",
    "coopérative",
    "lavoir",
    "abbaye",
    "halle, marché couvert",
    "cirque naturel",
    "salle de billard",
    "séminaire",
    "casino",
    "ferme et auberge de campagne",
    "cabaret",
    "patinoire",
    "toilettes publiques",
    "grand magasin",
    "carnaval",
    "cimetière militaire et mémorial",
    "ensemble fortifié",
    "château fort",
    "marais",
    "moulin",
    "centre de vacances et de loisirs",
    "pharmacy",
    "château et demeure de prestige",
    "tour",
    "via ferrata",
    "rivière ou fleuve",
    "hammam",
    "défilé cortège parade",
    "club de sport",
    "hippodrome",
    "groupement de producteurs",
    "guide professionnel",
    "itinéraire fluvial ou maritime",
    "pigeonnier",
    "cimetière civil",
    "culture",
    "cabane",
    "lieu de soins",
    "aire, station de taxis",
    "canal",
    "établissement thermal",
    "évènement religieux",
    "récital",
    "bus touristique",
    "compétition",
    "commémoration",
    "écluse",
    "aéroport",
    "basilique",
    "fort",
    "grande et moyenne surface",
    "salle de squash",
    "couvent",
    "palais",
    "pelouse calcaire",
    "cloître",
    "temple",
    "zone humide",
    "aérodrome",
    "domaine de ski nordique",
    "monastère, prieuré",
    "club de plage",
    "donjon",
    "voie romaine",
    "borne de service camping car",
    "yacht club",
    "collégiale",
    "auditorium",
    "mosquée",
    "itinéraire sous-marin",
    "cinémathèque",
    "consigne à bagages",
    "grotte",
    "montagne",
    "cabane dans les arbres",
    "terrain park",
    "ruisseau",
    "aquarium",
    "source",
    "arène",
    "aqueduc",
    "bocage",
    "curiosité naturelle",
    "pierre, rocher",
    "col",
    "centre de thalassothérapie" ];

  const filteredTags = searchTerm
    ? tags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div style={{ position: "relative", width: "100%", textAlign: "left", marginBottom: "10px" }}>
      {/* Barre de recherche des tags */}
      <input
        type="text"
        placeholder="Rechercher un tag..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(e.target.value.length > 0);
        }}
        onFocus={() => setShowDropdown(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        style={{
          width: "200px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "0.9rem",
          display: "block",
          margin: "0",
        }}
      />

      {/* Menu déroulant des tags */}
      {showDropdown && filteredTags.length > 0 && (
        <ul
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginTop: "5px",
            listStyle: "none",
            padding: "0",
            maxHeight: "120px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {filteredTags.map((tag) => (
            <li
              key={tag}
              onClick={() => {
                handleFilterClick(tag);
                setSearchTerm("");
                setShowDropdown(false);
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Liste des tags sélectionnables */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
        {tags.slice(0, limit).map((item) => (
          <span
            key={item}
            onClick={() => handleFilterClick(item)}
            style={{
              backgroundColor: selectedFilters.includes(item) ? "#8bc34a" : "white",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InterestTags;
