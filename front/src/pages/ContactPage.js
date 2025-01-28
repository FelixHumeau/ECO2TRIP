import React from "react";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Contactez-nous !</h1>
      <button onClick={() => navigate("/about")}>
        Aller à la page À propos
      </button>
    </div>
  );
};

export default ContactPage;
