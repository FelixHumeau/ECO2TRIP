import React, { useState } from "react";

const CarbonRoutePage = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    transportId: "1",
    passengers: 1,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengers" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const { from, to, transportId, passengers } = formData;

    // Calcul des IDs pour le covoiturage si nécessaire
    let finalTransportId = transportId;
    if (transportId === "covoiturage-thermique") {
      if (passengers >= 1 && passengers <= 4) {
        finalTransportId = 21 + passengers; // IDs : 22 à 25 pour covoiturage thermique
      } else {
        setError(
          "Le nombre de passagers pour le covoiturage thermique doit être entre 1 et 4."
        );
        return;
      }
    } else if (transportId === "covoiturage-electrique") {
      if (passengers >= 1 && passengers <= 4) {
        finalTransportId = 25 + passengers; // IDs : 26 à 29 pour covoiturage électrique
      } else {
        setError(
          "Le nombre de passagers pour le covoiturage électrique doit être entre 1 et 4."
        );
        return;
      }
    }

    try {
      // Appel à l'API
      const response = await fetch("http://localhost:5000/api/carbon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          mode: "driving-car",
          transportId: finalTransportId,
          occupencyRate: passengers,
        }),
      });


      if (!response.ok) {
        throw new Error("Erreur lors du calcul.");
      }

      const data = await response.json();

      // Affichage des résultats
      setResult({
        from: data.from,
        to: data.to,
        transportName: data.carbonData.name,
        distance: data.distance.toFixed(2),
        carbonValue: data.carbonData.value.toFixed(3),
      });
    } catch (err) {
      console.error(err);
      setError("Impossible de calculer l'empreinte carbone.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calculateur d'Empreinte Carbone</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="from">Point de départ :</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="Paris"
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="to">Point d'arrivée :</label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="Lyon"
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="transportId">Type de transport :</label>
          <select
            id="transportId"
            name="transportId"
            value={formData.transportId}
            onChange={handleChange}
            required
          >
            <option value="1">Avion</option>
            <option value="2">TGV</option>
            <option value="4">Voiture thermique</option>
            <option value="5">Voiture électrique</option>
            <option value="6">Autocar thermique</option>
            <option value="covoiturage-thermique">Covoiturage thermique</option>
            <option value="covoiturage-electrique">Covoiturage électrique</option>
          </select>
        </div>
        <br />

        <div>
          <label htmlFor="passengers">Nombre de passagers :</label>
          <input
            type="number"
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            min="1"
            max="4"
            required
          />
        </div>
        <br />

        <button type="submit">Calculer</button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          <strong>{error}</strong>
        </p>
      )}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Résultat :</h2>
          <p>
            <strong>Point de départ :</strong> {result.from}
          </p>
          <p>
            <strong>Point d'arrivée :</strong> {result.to}
          </p>
          <p>
            <strong>Type de transport :</strong> {result.transportName}
          </p>
          <p>
            <strong>Distance :</strong> {result.distance} km
          </p>
          <p>
            <strong>Empreinte carbone totale :</strong> {result.carbonValue} kg
            CO₂
          </p>
        </div>
      )}
    </div>
  );
};

export default CarbonRoutePage;
