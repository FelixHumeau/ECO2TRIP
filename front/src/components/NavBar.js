import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png"; // Logo actuel
import headerImage from "../assets/Logo_Texte1.png";
import { FaEnvelope } from "react-icons/fa";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Active la classe navbar-scrolled après 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <Link to="/contact" className="question-icon">
          <FaEnvelope color="green" size={20} />
        </Link>
      </div>
      {/* Contenu principal de la navbar */}
      <div className="navbar-center">
        <Link to="/" className="navbar-logo-link">
          {/* Ajout de l'image avant le logo */}
          <img src={headerImage} alt="Header Icon" className="header-image" />
          <span className="navbar-logo-text">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </span>
        </Link>
      </div>
      {/* Point d'interrogation à droite */}
      <div className="navbar-right">
        <Link to="/about" className="question-icon">
          ?
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
