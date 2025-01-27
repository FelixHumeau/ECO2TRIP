import React from "react";
import { useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Résumé de votre voyage</h1>
      <button onClick={() => navigate("/contact")}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default SummaryPage;
