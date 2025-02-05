import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Définition d'une icône personnalisée
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapComponent = ({ coordinates, locationName, address = "", zoom = 13}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
      <MapContainer
        center={coordinates}
        zoom={zoom}
        style={{
          width: "100%",
          flex: 1,
          minHeight: "300px",
          maxHeight: "100%",
          borderRadius: "8px",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>{locationName}</Popup>
        </Marker>
      </MapContainer>

      {/* Affichage de l'adresse sous la carte si elle existe */}
      {address && (
        <p style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333"
        }}>
          📍 {address}
        </p>
      )}
    </div>
  );
};

export default MapComponent;
