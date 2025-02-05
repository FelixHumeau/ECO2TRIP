import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "../style/Button.module.css";

const Button = forwardRef(({ text, onClick, customClass, variant, size, disabled }, ref) => {
  return (
    <button
      ref={ref}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${customClass || ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={text}
      tabIndex={0}
    >
      {text}
    </button>
  );
});

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  customClass: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  variant: "primary",
  size: "medium",
  disabled: false,
};

export default React.memo(Button); // Optimisation des re-rendus inutiles
