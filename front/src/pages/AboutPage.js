import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>À propos des développeurs</h1>
      <button onClick={() => navigate("/questionnaire")}>
        Aller à la page Questionnaire
      </button>
    </div>
  );
};

export default AboutPage;
