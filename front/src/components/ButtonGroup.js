import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const ButtonGroup = ({ labels, onButtonClick }) => {
  const buttonRefs = useRef([]);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    if (buttonRefs.current.length > 0) {
      const largestWidth = Math.max(...buttonRefs.current.map(btn => btn?.offsetWidth || 0));
      setMaxWidth(largestWidth);
    }
  }, [labels]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="summary-buttons-container">
        {labels.map((label, index) => (
          <Button
            key={index}
            text={label}
            customClass="summary-button"
            ref={el => (buttonRefs.current[index] = el)}
            style={{ width: `${maxWidth}px` }}
            onClick={() => {
              console.log(`Bouton cliqué : ${label}`);
              onButtonClick(label);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
