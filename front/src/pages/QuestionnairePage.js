import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionnairePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f1f8e9", height: "100vh", padding: "40px" }}>
      {/* Contenu principal */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{
          fontSize: "2rem",
          marginBottom: "30px",
        }}>Décrivez votre voyage de rêve</h2>

        {/* Champs principaux */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
        }}>
          <input
            type="text"
            placeholder="Ville de départ"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
            }}
          />
          <input
            type="text"
            placeholder="Dates"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
            }}
          />
          <input
            type="number"
            placeholder="Nombre de personnes"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
            }}
          />
          <button style={{
            padding: "10px 20px",
            backgroundColor: "#8bc34a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>🔍</button>
        </div>

        {/* Centres d’intérêts */}
        <div style={{
          backgroundColor: "#dcedc8",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}>
          <h3 style={{
            textAlign: "left",
            marginBottom: "10px",
          }}>Centres d’intérêts :</h3>
          <input
            type="text"
            placeholder="Recherche"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
              marginBottom: "10px",
            }}
          />
          <div style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}>
            {["Aventures", "Nature", "Activités aquatiques", "SPA & Bien être"].map((item) => (
              <span key={item} style={{
                backgroundColor: "white",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Ambiance */}
        <div style={{
          backgroundColor: "#dcedc8",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}>
          <h3 style={{ textAlign: "left", marginBottom: "10px" }}>Ambiance :</h3>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "600px",
            margin: "0 auto",
          }}>
            {["Familiale", "En amoureux", "Entre copains", "Avec les collègues", "En solo"].map((option) => (
              <label key={option} style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="ambiance"
                  value={option}
                  style={{
                    marginRight: "10px",
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Bouton continuer */}
        <button onClick={() => navigate("/trips")} style={{
          padding: "15px 30px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1.2rem",
        }}>
          Continuer
        </button>
      </div>
    </div>
  );
};

export default QuestionnairePage;