import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png"; // Assure-toi que le chemin est correct

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
      {/* Logo complet cliquable */}
      <div className="navbar-center">
        <Link to="/" className="navbar-logo-link">
          <span className="navbar-logo-text">
            <span className="text-green">E</span>
            <span className="text-black">C</span>
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span className="text-black">2</span>
            <span className="text-green">TRIP</span>
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
