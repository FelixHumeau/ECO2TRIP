import React, { useEffect, useState } from "react";
import DynamicText from "../components/DynamicText";
import SearchForm from "../components/SearchForm";
import TagList from "../components/TagList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const categories = ["Ski", "Montagne", "Plage", "Ville", "Campagne", "Culture", "Sport", "Bien-être", "Gastronomie", "Shopping"];
  const endings = [
    "exxplorez la France sans polluer",
    "deécouvrez des merveilles cachées dans des endroits insolites",
    "paartez à l'aventure sans prendre la voiture",
    "vooyagez léger, explorez responsable !",
    "mooins d’empreinte, plus d’émotions.",
  ];
  const navigate = useNavigate();

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

  return (
    <div className="homepage">
      {/* Section avec l'image de fond et le formulaire au centre */}
      <section
        className="hero-section" 
        style={{ opacity: scrollOpacity }}
      >
        <div className="app-container">
          <DynamicText prefix="Avec nous," endings={endings} interval={4000} />
        </div>
        

        <div className="p-6">
          <TagList tags={categories} />
        </div>
        <div className="search-form">
          <SearchForm />
          <button className="search-button" onClick={() => navigate("/questionnaire")}>
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
