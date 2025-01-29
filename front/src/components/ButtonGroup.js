import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const ButtonGroup = ({ labels }) => {
  const buttonRefs = useRef([]);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    if (buttonRefs.current.length > 0) {
      // Trouver la largeur du bouton le plus large
      const largestWidth = Math.max(...buttonRefs.current.map(btn => btn?.offsetWidth || 0));
      setMaxWidth(largestWidth);
    }
  }, [labels]); // Se recalculera si `labels` change

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="summary-buttons-container">
        {labels.map((label, index) => (
          <Button
            key={index}
            text={label}
            customClass="summary-button"
            ref={el => (buttonRefs.current[index] = el)}
            style={{ width: `${maxWidth}px` }} // Applique la largeur max trouvée
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
