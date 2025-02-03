import React, { useState } from "react";

const InterestTags = ({ selectedFilters, handleFilterClick, limit = 15 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const tags = [
    "lieu", "tourisme culturel", "restauration", "fête et manifestation", 
    "site sportif, récréatif et de loisirs", "monument", "site culturel", 
    "commerce de détail", "restaurant", "évènement culturel", "vie nocturne", 
    "produit", "tourisme sportif", "fournisseur de dégustation", "itinéraire", 
    "itinéraire touristique", "vin", "boutique, commerce de proximité", 
    "randonnée", "itinéraire pédestre", "spectacles", "spectacle", "pratique", 
    "nature", "concert", "site religieux", "location", "tourisme gastronomique", 
    "sale event", "mer", "producteur", "évènement sports et loisirs", 
    "service pratique", "visite", "theater event", "restauration rapide", 
    "brasserie ou taverne", "festival", "park", "parc et jardin", 
    "bâtiment civil remarquable", "site naturel", "landform", "bistrot - bar à vin", 
    "itinéraire cyclable", "historique", "cave de dégustation", "marché", 
    "social event", "musée", "prestataire de service", "exhibition event", 
    "exposition", "library", "bar, bar à thème", "eglise", "location de salle", 
    "tourisme rural", "tourist information center", "aire de pique-nique", 
    "patrimoine industriel, artisanal, rural, agricole et technique", 
    "restaurant gastronomique", "animation locale", "transport", "sport équestre", 
    "aventure", "ville et village", "café ou salon de thé", "maison de pays, produits du terroir", 
    "théatre, salle de spectacle", "sport extrême", "evènement jeune public", 
    "conférence", "aire de jeux", "pratique libre", "compétition sportive", 
    "fête traditionnelle", "piscine", "borne de charge véhicule électrique", "foire ou salon", 
    "architecture", "centre équestre", "cinéma", "office de tourisme", "lieu de santé", 
    "parc de loisirs, parc à thème", "plage", "maison remarquable", "location de matériel", 
    "complexe de loisirs (loisirs regroupés)", "château", "stage, atelier", "chapelle", 
    "cours", "loueur de matériel", "bateau promenade", "bien être", "itinéraire équestre", 
    "lieu de mémoire", "organisme réceptif", "jeu, concours", "stade", "animalier", 
    "spectacle de danse", "accompagnement", "complèxe ou terrain de tennis", 
    "ice cream shop", "transporteur", "randonnée, balade", "site de défense", "boulangerie", 
    "halte et port fluvial", "discothèque", "itinéraire routier", "centre de congrès", 
    "boulodrome", "terrain de golf", "professionnel de santé", "port de plaisance", "parking", 
    "base nautique / centre nautique", "salle ou terrain de sport, gymnase", "cave ou caveau", 
    "site archéologique", "centre de remise en forme - fitness", "réparateur de matériel", 
    "cafétéria - self", "piste de roller ou de skate board", "restauration ambulante, food truck", 
    "voyagiste", "site industriel", "lecture", "plongée", "atelier de formation", "point de vue", 
    "parcours de santé", "fontaine", "centre de balnéothérapie", "bowling", "éleveur", 
    "compagnie de taxis", "cathédrale", "spectacle de cirque", "quartier", 
    "salle polyvalente, salle des fêtes", "dégustation", "ferme pédagogique", "train station", 
    "mini golf", "forêt", "vide-grenier", "brasseur", "rallye", "lac", "multiactivités", 
    "calvaire et enclos paroissiaux", "zoo - parc animalier", "ferme", "circuit automobile ou moto", 
    "portes ouvertes", "surf", "ruines et vestiges", "screening event", "antiquaire et brocanteur", 
    "négociant", "pont", "club enfants", "train touristique", "brocante", "démonstration sportive", 
    "etang", "lavoir", "stage de perfectionnement", "halle, marché couvert", "centre et galerie commerciale", 
    "cirque", "abbaye", "opéra", "toilettes publiques", "congrès", "coopérative", "baptême sportif", 
    "salle de billard", "pharmacy", "cimetière militaire et mémorial", "carnaval", "casino", 
    "ferme et auberge de campagne", "marais", "château fort", "moulin", "cabaret", "ensemble fortifié", 
    "séminaire", "rivière ou fleuve", "tour", "patinoire", "guide professionnel", "pigeonnier", 
    "tourisme montagne", "défilé cortège parade", "cimetière civil", "aire, station de taxis", 
    "lieu de soins", "culture", "hippodrome", "etablissement thermal", "hammam", "club de sport", 
    "grand magasin", "groupement de producteurs", "ecluse", "canal", "grande et moyenne surface", 
    "récital", "commémoration", "fort", "via ferrata", "basilique", "itinéraire fluvial ou maritime", 
    "pelouse calcaire", "cloître", "bus touristique", "salle de squash", "temple", "aéroport", 
    "palais", "couvent", "zone humide", "maison", "aérodrôme", "club de plage", "donjon", "monastère, prieuré", 
    "auditorium", "hôte bénévole, greeter", "collégiale", "cirque naturel", "consigne à bagages", 
    "évènement religieux", "montagne", "compétition", "terrain park", "grotte, gouffre, aven, caverne, carrière", 
    "vivarium - aquarium", "yacht club", "ruisseau", "voie romaine", "source", "mosquée", "arène", 
    "aqueduc", "cinémathèque", "curiosité naturelle", "barrage, digue", "col", "bocage", "pierre, rocher", 
    "fronton, mur de frappe", "mine", "centre de thalassothérapie", "cascade", "jetée", "verger conservatoire", 
    "phare", "sommet", "synagogue", "comité départemental du tourisme", "domaine de ski nordique", "plateau", 
    "tourbière", "cybercafé", "tremplin", "mégalithes, menhirs et dolmens", "citadelle", "prairie", 
    "maison du tourisme", "embarcadère", "distributeur automatique de billets, dab", "côteau", "landes", 
    "falaise", "bus stop", "itinéraire sous-marin", "port maritime", "vélodrome", "bateau-restaurant", 
    "chartreuse", "haras", "téléphérique touristique", "dune", "piste de ski alpin", "commanderie", 
    "temple bouddhique", "pèlerinage et procession", "vendange, récolte", "domaine de ski alpin", "arc de triomphe", 
    "téléphérique", "piste de luge / bobsleigh", "gare routière", "vélorail", "piste de ski de fond", 
    "glacier de montagne", "hotspot wifi", "parc naturel", "gorge", "comité régional du tourisme", 
    "aire de covoiturage", "borne ou station de réparation - gonflage", "plaine", "vallée", "palais des sports", 
    "evéché", "canyon", "station ou dépôt de vélo", "côte, littoral", "causse", "bastide", "bâteau habitable", 
    "cabane", "camping car"
  ];

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
