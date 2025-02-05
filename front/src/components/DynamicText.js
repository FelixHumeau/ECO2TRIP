import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../style/DynamicText.module.css";

const DynamicText = ({ prefix, endings, interval = 5000, typingSpeed = 100 }) => {
  const [currentEnding, setCurrentEnding] = useState("");
  const [endingIndex, setEndingIndex] = useState(0);
  const isTyping = useRef(false); // Pour éviter les conflits de rendu

  useEffect(() => {
    if (!endings || endings.length === 0 || isTyping.current) return;
    
    let index = 0;
    let typingInterval;

    const typeText = () => {
      if (index < endings[endingIndex].length) {
        setCurrentEnding((prev) => prev + endings[endingIndex].charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        isTyping.current = false;
        setTimeout(() => {
          setCurrentEnding("");
          setEndingIndex((prevIndex) => (prevIndex + 1) % endings.length);
        }, interval);
      }
    };

    setCurrentEnding(""); // Reset avant de taper
    isTyping.current = true;
    setTimeout(() => {
      index = 0; // S'assurer que l'index démarre bien
      typingInterval = setInterval(typeText, typingSpeed);
    }, 200);

    return () => {
      clearInterval(typingInterval);
      isTyping.current = false;
    };
  }, [endingIndex, endings, typingSpeed, interval]);

  return (
    <h2 className={styles.dynamicText}>
      {prefix} <span className={styles.dynamicEnding}>{currentEnding}</span>
    </h2>
  );
};

DynamicText.propTypes = {
  prefix: PropTypes.string.isRequired,
  endings: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
  typingSpeed: PropTypes.number,
};

export default DynamicText;
