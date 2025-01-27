import React from "react";
import { useNavigate } from "react-router-dom";

const ProposedTripsPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Voyages proposés</h1>
      <button onClick={() => navigate("/summary")}>
        Aller à la page récapitulative
      </button>
    </div>
  );
};

export default ProposedTripsPage;
