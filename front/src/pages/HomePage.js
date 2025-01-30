import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import TagList from "../components/TagList";

const HomePage = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  const categories = ["Ski", "Montagne", "Plage", "Ville", "Campagne", "Culture", "Sport", "Bien-être", "Gastronomie", "Shopping"];

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
        <div className="p-6">
          <TagList tags={categories} />
        </div>
        <SearchForm />
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
