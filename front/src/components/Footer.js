import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; // Importation des icônes
import logo from "../assets/logo1.png"; // Chemin vers ton logo
import "../index.css"; // Assure-toi que les styles sont dans ton fichier CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Section des réseaux sociaux */}
        <div className="footer-section">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Section du logo */}
        <div className="footer-section logo-section">
          <img src={logo} alt="Logo ECO2TRIP" className="footer-logo" />
        </div>

        {/* Section des contacts */}
        <div className="footer-section">
          <h4>Contacts</h4>
          <ul>
            <li><a href="/about">À propos</a></li>
            <li><a href="/contact">Nous contacter</a></li>
          </ul>
        </div>
      </div>    
    </footer>
  );
}

export default Footer;
