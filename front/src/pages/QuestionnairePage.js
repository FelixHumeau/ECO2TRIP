import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionnairePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Questionnaire de voyage</h1>
      <button onClick={() => navigate("/trips")}>
        Voir les voyages proposés
      </button>
    </div>
  );
};

export default QuestionnairePage;
