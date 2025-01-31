import React, { useEffect, useState } from "react";

const DynamicText = ({ prefix, endings, interval = 5000, typingSpeed = 100 }) => {
  const [currentEnding, setCurrentEnding] = useState("");
  const [endingIndex, setEndingIndex] = useState(0);

  useEffect(() => {
    if (!endings || endings.length === 0) return;
    
    let index = 0;
    let typingInterval;

    const typeText = () => {
      if (index < endings[endingIndex].length) {
        setCurrentEnding((prev) => prev + endings[endingIndex].charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentEnding("");
          setEndingIndex((prevIndex) => (prevIndex + 1) % endings.length);
        }, interval);
      }
    };

    setCurrentEnding(""); // Reset before typing starts
    setTimeout(() => {
      index = 0; // Ensure index starts at 0
      typingInterval = setInterval(typeText, typingSpeed);
    }, 200); // Petit délai pour éviter les coupures

    return () => clearInterval(typingInterval);
  }, [endingIndex, endings, typingSpeed, interval]);

  return (
    <h2 className="dynamic-text">
      {prefix} <span className="dynamic-ending">{currentEnding}</span>
    </h2>
  );
};

export default DynamicText;
