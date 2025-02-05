import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "../style/BasicCard.module.css";

const BasicCard = forwardRef(({ title, children, backgroundColor }, ref) => {
  return (
    <div
      ref={ref}
      className={styles.card}
      style={{ backgroundColor }}
      aria-labelledby="card-title"
    >
      <h1 id="card-title" className={styles.cardTitle}>
        {title}
      </h1>

      <div className={styles.cardContent}>{children}</div>
    </div>
  );
});

BasicCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
};

// 🏗️ Valeurs par défaut
BasicCard.defaultProps = {
  backgroundColor: "#C3E3B6",
};

export default React.memo(BasicCard);
