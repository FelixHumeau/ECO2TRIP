import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import styles from "../style/ButtonGroup.module.css"; // Import du CSS Module

const ButtonGroup = ({ labels, onButtonClick, disabled }) => {
  const buttonRefs = useRef([]);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    if (buttonRefs.current.length > 0) {
      const largestWidth = Math.max(...buttonRefs.current.map(btn => btn?.offsetWidth || 0));
      if (largestWidth !== maxWidth) {
        setMaxWidth(largestWidth);
      }
    }
  }, [labels, maxWidth]);

  const handleButtonClick = useCallback(
    (label) => {
      if (!disabled) {
        console.log(`Bouton cliqué : ${label}`);
        onButtonClick(label);
      }
    },
    [onButtonClick, disabled]
  );

  return (
    <div className={styles.buttonGroup}>
      <div className={styles.buttonContainer}>
        {labels.map((label, index) => (
          <Button
            key={index}
            text={label}
            customClass={styles.summaryButton}
            ref={(el) => (buttonRefs.current[index] = el)}
            style={{ width: `${maxWidth}px` }}
            onClick={() => handleButtonClick(label)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

ButtonGroup.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  disabled: false,
};

export default React.memo(ButtonGroup);
