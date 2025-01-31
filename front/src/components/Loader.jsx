import { motion } from "framer-motion";
import orbitImage from '../assets/train.png';
import centerImage from '../assets/france.png'

const Loader = () => {
  return (
    <div className="loader-container">
      {/* Image centrale */}
      <motion.img 
        src={centerImage} 
        alt="Center"
        className="center-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Image qui tourne autour */}
      <motion.img 
        src={orbitImage} 
        alt="Orbit"
        className="orbit-image"
        animate={{
          rotate: [0, 360], // Rotation complète
        }}
        transition={{
          repeat: Infinity,
          duration: 1, // Vitesse de rotation
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Loader;