import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cloudImage from "../assets/nuage.png";

const CloudBackground = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const generatedClouds = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startLeft: Math.random() > 0.5 ? "-200px" : "100vw", // Empêche d’être trop loin
      direction: Math.random() > 0.5 ? "left" : "right",
      top: Math.random() * 35 + "%", // Empêche d'être trop haut ou trop bas
      size: Math.random() * 100 + 100,
      duration: Math.random() * 10 + 15,
    }));
    console.log("Nuages générés :", generatedClouds);
    setClouds(generatedClouds);
  }, []);
  

  return (
    <div className="clouds-container">
      {clouds.map((cloud) => (
        <motion.img
          key={cloud.id}
          src={cloudImage}
          alt="Nuage"
          className="cloud"
          initial={{ x: cloud.startLeft }}
          animate={{ x: cloud.direction === "left" ? "110vw" : "-10vw" }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: cloud.top,
            width: cloud.size + "px",
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
};

export default CloudBackground;
