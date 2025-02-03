import React, { useEffect, useState } from "react";
import DynamicText from "../components/DynamicText";
import SearchForm from "../components/SearchForm";
import TagList from "../components/TagList";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext"; // Import du contexte

const HomePage = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const categories = ["domaine de ski alpin", "Montagne", "Plage", "cave de dégustation", "château", "site culturel", "festival", "restaurant", "lac", "forêt"];
  const endings = [
    "exxplorez la France sans polluer",
    "deécouvrez des merveilles cachées dans des endroits insolites",
    "paartez à l'aventure sans prendre la voiture",
    "vooyagez léger, explorez responsable !",
    "mooins d’empreinte, plus d’émotions.",
  ];
  const navigate = useNavigate();
  const { searchData } = useSearch(); // Récupérer les données du contexte

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = window.innerHeight;
      const opacity = Math.max(1 - scrollTop / maxScroll, 0);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction pour gérer le clic sur un tag
  const handleTagClick = (tag) => {
    navigate("/questionnaire", { state: { selectedTag: tag } }); // Passer uniquement le tag
  };

  // Fonction pour gérer le clic sur "C'est parti !"
  const handleSearchClick = () => {
    navigate("/questionnaire", { state: { ...searchData } }); // Passer uniquement les données du formulaire
  };

  return (
    <div className="homepage">
      {/* Section avec l'image de fond et le formulaire au centre */}
      <section
        className="hero-section" 
        style={{ opacity: scrollOpacity }}
      >
        <div className="app-container">
          {/*<DynamicText prefix="Avec nous," endings={endings} interval={4000} />*/}
        </div>
        

        <div className="p-6">
          <TagList tags={categories} onTagClick={handleTagClick} />
        </div>
        <div className="search-form">
          <SearchForm />
          <button className="search-button" onClick={handleSearchClick}>
            C'est parti !
          </button>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="content-section">
        <h2>Découvrez nos services</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
          metus in metus venenatis consequat.
        </p>
      </section>
    </div>
  );
};

export default HomePage;