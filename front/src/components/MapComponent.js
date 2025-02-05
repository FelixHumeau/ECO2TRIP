import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";
import styles from "../style/MapComponent.module.css";

// Définition d'une icône personnalisée pour Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapComponent = ({ coordinates, locationName, address = "", zoom = 13 }) => {
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={coordinates} zoom={zoom} className={styles.leafletContainer}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>{locationName}</Popup>
        </Marker>
      </MapContainer>

      {/* Affichage de l'adresse sous la carte si elle existe */}
      {address && <p className={styles.address}>📍 {address}</p>}
    </div>
  );
};

// 🔍 Ajout de PropTypes pour valider les types des props
MapComponent.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  locationName: PropTypes.string.isRequired,
  address: PropTypes.string,
  zoom: PropTypes.number,
};

// Valeurs par défaut
MapComponent.defaultProps = {
  address: "",
  zoom: 13,
};

export default MapComponent;
