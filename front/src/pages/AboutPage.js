import React from "react";
import { useNavigate } from "react-router-dom";

// Importation des images

import image1 from "../assets/ContactPage/1.png";
import image2 from "../assets/ContactPage/2.png";
import image3 from "../assets/ContactPage/3.png";
import image4 from "../assets/ContactPage/4.png";
import image5 from "../assets/ContactPage/5.png";
import image6 from "../assets/ContactPage/6.png";
import image7 from "../assets/ContactPage/7.png";
import backgroundImage from "../assets/ContactPage/fond2.jpeg";

const AboutPage = () => {
  const navigate = useNavigate();

  const developers = [
    { id: 1, name: "Félix HUMEAU", description: "Chef de projet", image: image1 },
    { id: 2, name: "Nicolas D'AVIAU DE TERNAY ", description: "QA Engineer", image: image2 },
    { id: 3, name: "Tom BERNARD", description: "Développeur front-end/back-end", image: image3 },
    { id: 4, name: "Etienne JAN", description: "Architecte Logiciel", image: image4 },
    { id: 5, name: "Maxime LAFOUGERE", description: "Product Owner", image: image5 },
    { id: 6, name: "Stina HOUNGAVOU", description: "UX/UI Designer", image: image6 },
    { id: 7, name: "Barnabé BADRÉ", description: "Responsable Énergie et Impact Carbone", image: image7 },
  ];

  return (
    <div
      style={{
        padding: "100px 40px 40px 40px",
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px 40px",
          borderRadius: "20px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h1 style={{ fontSize: "48px", textAlign: "center", marginBottom: "30px" }}>
          À propos de nous
        </h1>
        <p style={{ fontSize: "20px", textAlign: "center", margin: "10px 0 40px" }}>
          Nous sommes une équipe de 7 étudiants derrière ce projet. Voici un aperçu de notre équipe :
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {developers.map((dev) => (
            <div
              key={dev.id}
              style={{
                textAlign: "center",
                width: "300px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={dev.image}
                alt={dev.name}
                style={{
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
              <h3 style={{ fontSize: "22px", margin: "15px 0", color: "#333" }}>{dev.name}</h3>
              <p style={{ fontSize: "18px", color: "#555" }}>{dev.description}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button
            onClick={() => navigate("/questionnaire")}
            style={{
              padding: "20px 40px",
              fontSize: "20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              marginBottom: "25px"
            }}
          >
            Aller à la page Questionnaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;