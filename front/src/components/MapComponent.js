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

const MapComponent = ({ coordinates, locationName, zoom }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
      <MapContainer
        center={coordinates}
        zoom={zoom}
        style={{
          width: "100%",
          flex: 1, // Permet à la carte de grandir avec le popup
          minHeight: "300px", // Hauteur minimale pour éviter qu'elle soit trop petite
          maxHeight: "100%", // S'étend selon le contenu
          borderRadius: "8px",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>{locationName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
