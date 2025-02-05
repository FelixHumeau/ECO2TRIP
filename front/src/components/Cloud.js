import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import cloudImage from "../assets/nuage.png";
import styles from "../style/Cloud.module.css";

const CloudBackground = ({ cloudCount }) => {
  const [clouds, setClouds] = useState([]);

  // 🔹 Génération des nuages avec `useMemo` pour éviter les recréations inutiles
  const generateClouds = useMemo(() => {
    return Array.from({ length: cloudCount }, (_, i) => ({
      id: i,
      startLeft: Math.random() > 0.5 ? "-200px" : "100vw",
      direction: Math.random() > 0.5 ? "left" : "right",
      top: Math.random() * 35 + "%",
      size: Math.random() * 100 + 100,
      duration: Math.random() * 10 + 15,
    }));
  }, [cloudCount]);

  useEffect(() => {
    setClouds(generateClouds);
  }, [generateClouds]);

  return (
    <div className={styles.cloudsContainer}>
      {clouds.map((cloud) => (
        <motion.img
          key={cloud.id}
          src={cloudImage}
          alt="Nuage"
          className={styles.cloud}
          initial={{ x: cloud.startLeft }}
          animate={{ x: cloud.direction === "left" ? "110vw" : "-10vw" }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: cloud.top,
            width: `${cloud.size}px`,
          }}
        />
      ))}
    </div>
  );
};

// 🔍 Ajout de PropTypes pour la validation des props
CloudBackground.propTypes = {
  cloudCount: PropTypes.number,
};

// 🏗️ Valeurs par défaut
CloudBackground.defaultProps = {
  cloudCount: 5,
};

export default CloudBackground;
